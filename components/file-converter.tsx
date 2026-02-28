'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import {
  Upload,
  Download,
  X,
  FileText,
  Image,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  ZoomIn,
} from 'lucide-react'

export type ConversionType =
  | 'pdf-to-jpg'
  | 'pdf-to-png'
  | 'jpg-to-pdf'
  | 'png-to-pdf'
  | 'jpg-to-png'
  | 'png-to-jpg'

interface ConvertedFile {
  name: string
  url: string
  size: number
  type: string
}

interface FileConverterProps {
  conversionType: ConversionType
  fromFormat: string
  toFormat: string
  acceptedTypes: string
  color: 'pdf' | 'jpg' | 'png'
}

const colorStyles = {
  pdf: {
    icon: 'text-red-600',
    bg: 'bg-red-50 dark:bg-red-950/20',
    border: 'border-red-200 dark:border-red-900/40',
    button: 'bg-red-600 hover:bg-red-700 text-white',
    badge: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  },
  jpg: {
    icon: 'text-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-950/20',
    border: 'border-emerald-200 dark:border-emerald-900/40',
    button: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  },
  png: {
    icon: 'text-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    border: 'border-blue-200 dark:border-blue-900/40',
    button: 'bg-blue-600 hover:bg-blue-700 text-white',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  },
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

// Convert image file to a different image format using Canvas
async function convertImageFormat(
  file: File,
  targetFormat: 'image/jpeg' | 'image/png',
  quality = 0.92
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')!
      if (targetFormat === 'image/jpeg') {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
      ctx.drawImage(img, 0, 0)
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url)
          if (blob) resolve(blob)
          else reject(new Error('Canvas conversion failed'))
        },
        targetFormat,
        quality
      )
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load image'))
    }
    img.src = url
  })
}

// Convert images array to a simple PDF using PDF blob
async function imagesToPdf(files: File[]): Promise<Blob> {
  // Dynamically import jspdf if available, otherwise use canvas+blob method
  // We'll create a minimal valid PDF manually using canvas for first image
  // For production this uses a well-known approach with data URLs

  const canvases: { w: number; h: number; dataUrl: string }[] = []

  for (const file of files) {
    const dataUrl = await new Promise<{ w: number; h: number; dataUrl: string }>((resolve, reject) => {
      const img = new window.Image()
      img.crossOrigin = 'anonymous'
      const url = URL.createObjectURL(file)
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d')!
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
        resolve({ w: img.naturalWidth, h: img.naturalHeight, dataUrl: canvas.toDataURL('image/jpeg', 0.9) })
        URL.revokeObjectURL(url)
      }
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load image')) }
      img.src = url
    })
    canvases.push(dataUrl)
  }

  // Build a simple multi-page PDF using raw PDF syntax
  const encoder = new TextEncoder()
  let pdf = '%PDF-1.4\n'
  const offsets: number[] = []

  const pages: { xObj: string; width: number; height: number }[] = []

  // Embed each image as XObject
  for (let i = 0; i < canvases.length; i++) {
    const { w, h, dataUrl } = canvases[i]
    const base64 = dataUrl.split(',')[1]
    const imgBytes = atob(base64)
    const imgLength = imgBytes.length

    // XObject for image
    offsets.push(encoder.encode(pdf).length)
    const xObjNum = 4 + i * 2
    pdf += `${xObjNum} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${w} /Height ${h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imgLength} >>\nstream\n`
    pdf += imgBytes
    pdf += '\nendstream\nendobj\n'
    pages.push({ xObj: `X${i}`, width: w, height: h })
  }

  const pageNums: number[] = []
  for (let i = 0; i < pages.length; i++) {
    const { xObj, width, height } = pages[i]
    const xObjNum = 4 + i * 2
    const contentNum = xObjNum + 1
    const pageNum = 10 + i * 3

    // Content stream
    const content = `q ${width} 0 0 ${height} 0 0 cm /${xObj} Do Q`
    const contentBytes = encoder.encode(content).length

    offsets.push(encoder.encode(pdf).length)
    pdf += `${contentNum} 0 obj\n<< /Length ${contentBytes} >>\nstream\n${content}\nendstream\nendobj\n`

    // Page object
    offsets.push(encoder.encode(pdf).length)
    pdf += `${pageNum} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Contents ${contentNum} 0 R /Resources << /XObject << /${xObj} ${xObjNum} 0 R >> >> >>\nendobj\n`
    pageNums.push(pageNum)
  }

  // Catalog & Pages
  const catalogOffset = encoder.encode(pdf).length
  pdf += `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`

  const pagesOffset = encoder.encode(pdf).length
  pdf += `2 0 obj\n<< /Type /Pages /Kids [${pageNums.map((n) => `${n} 0 R`).join(' ')}] /Count ${pageNums.length} >>\nendobj\n`

  const infoOffset = encoder.encode(pdf).length
  pdf += `3 0 obj\n<< /Title (Converted by TooAI24) /Creator (TooAI24.com) >>\nendobj\n`

  const xrefOffset = encoder.encode(pdf).length
  const totalObjects = 3 + pages.length * 4 + 1
  pdf += `xref\n0 ${totalObjects}\n0000000000 65535 f \n`
  pdf += `${String(catalogOffset).padStart(10, '0')} 00000 n \n`
  pdf += `${String(pagesOffset).padStart(10, '0')} 00000 n \n`
  pdf += `${String(infoOffset).padStart(10, '0')} 00000 n \n`

  pdf += `trailer\n<< /Size ${totalObjects} /Root 1 0 R /Info 3 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`

  return new Blob([encoder.encode(pdf)], { type: 'application/pdf' })
}

// Convert a PDF page to an image using canvas (requires PDF.js or similar)
// We'll use a simpler approach: render PDF page via an iframe approach and capture
// Since PDF.js CDN is heavy, we'll use a reliable approach that creates an image from the PDF
async function pdfToImages(file: File, outputFormat: 'image/jpeg' | 'image/png'): Promise<Blob[]> {
  // Load PDF.js from CDN
  if (typeof window === 'undefined') return []

  await new Promise<void>((resolve, reject) => {
    if ((window as unknown as Record<string, unknown>)['pdfjsLib']) { resolve(); return }
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load PDF.js'))
    document.head.appendChild(script)
  })

  const pdfjsLib = (window as unknown as Record<string, { GlobalWorkerOptions: { workerSrc: string }; getDocument: (args: unknown) => { promise: Promise<unknown> } }>)['pdfjsLib']
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'

  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise as {
    numPages: number
    getPage: (n: number) => Promise<{
      getViewport: (args: { scale: number }) => { width: number; height: number }
      render: (args: { canvasContext: CanvasRenderingContext2D; viewport: unknown }) => { promise: Promise<void> }
    }>
  }

  const blobs: Blob[] = []
  const scale = 2.0 // Higher scale = better quality

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const viewport = page.getViewport({ scale })
    const canvas = document.createElement('canvas')
    canvas.width = viewport.width
    canvas.height = viewport.height
    const ctx = canvas.getContext('2d')!

    if (outputFormat === 'image/jpeg') {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    await page.render({ canvasContext: ctx, viewport }).promise

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error('toBlob failed'))),
        outputFormat,
        0.92
      )
    })
    blobs.push(blob)
  }

  return blobs
}

export default function FileConverter({
  conversionType,
  fromFormat,
  toFormat,
  acceptedTypes,
  color,
}: FileConverterProps) {
  const [files, setFiles] = useState<File[]>([])
  const [converting, setConverting] = useState(false)
  const [results, setResults] = useState<ConvertedFile[]>([])
  const [error, setError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [progress, setProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const c = colorStyles[color]

  const isMultipleAllowed = ['jpg-to-pdf', 'png-to-pdf'].includes(conversionType)
  const isPdfInput = ['pdf-to-jpg', 'pdf-to-png'].includes(conversionType)

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return
      const arr = Array.from(newFiles)
      if (isMultipleAllowed) {
        setFiles((prev) => [...prev, ...arr])
      } else {
        setFiles([arr[0]])
      }
      setResults([])
      setError(null)
    },
    [isMultipleAllowed]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles]
  )

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setResults([])
  }

  const convert = async () => {
    if (!files.length) return
    setConverting(true)
    setError(null)
    setProgress(10)

    try {
      const newResults: ConvertedFile[] = []

      if (conversionType === 'jpg-to-png') {
        setProgress(40)
        for (const file of files) {
          const blob = await convertImageFormat(file, 'image/png')
          newResults.push({
            name: file.name.replace(/\.(jpg|jpeg)$/i, '.png'),
            url: URL.createObjectURL(blob),
            size: blob.size,
            type: 'image/png',
          })
        }
      } else if (conversionType === 'png-to-jpg') {
        setProgress(40)
        for (const file of files) {
          const blob = await convertImageFormat(file, 'image/jpeg')
          newResults.push({
            name: file.name.replace(/\.png$/i, '.jpg'),
            url: URL.createObjectURL(blob),
            size: blob.size,
            type: 'image/jpeg',
          })
        }
      } else if (conversionType === 'jpg-to-pdf' || conversionType === 'png-to-pdf') {
        setProgress(50)
        const blob = await imagesToPdf(files)
        newResults.push({
          name: files[0].name.replace(/\.(jpg|jpeg|png)$/i, '') + '.pdf',
          url: URL.createObjectURL(blob),
          size: blob.size,
          type: 'application/pdf',
        })
      } else if (conversionType === 'pdf-to-jpg') {
        setProgress(30)
        const blobs = await pdfToImages(files[0], 'image/jpeg')
        setProgress(80)
        blobs.forEach((blob, i) => {
          const baseName = files[0].name.replace(/\.pdf$/i, '')
          newResults.push({
            name: `${baseName}_page${i + 1}.jpg`,
            url: URL.createObjectURL(blob),
            size: blob.size,
            type: 'image/jpeg',
          })
        })
      } else if (conversionType === 'pdf-to-png') {
        setProgress(30)
        const blobs = await pdfToImages(files[0], 'image/png')
        setProgress(80)
        blobs.forEach((blob, i) => {
          const baseName = files[0].name.replace(/\.pdf$/i, '')
          newResults.push({
            name: `${baseName}_page${i + 1}.png`,
            url: URL.createObjectURL(blob),
            size: blob.size,
            type: 'image/png',
          })
        })
      }

      setProgress(100)
      setResults(newResults)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Conversion failed. Please try again.')
    } finally {
      setConverting(false)
      setTimeout(() => setProgress(0), 600)
    }
  }

  const reset = () => {
    results.forEach((r) => URL.revokeObjectURL(r.url))
    setFiles([])
    setResults([])
    setError(null)
    setProgress(0)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      results.forEach((r) => URL.revokeObjectURL(r.url))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Dropzone */}
      {files.length === 0 && results.length === 0 && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
            dragOver
              ? `${c.border} ${c.bg}`
              : 'border-border hover:border-primary/50 hover:bg-primary/3'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept={acceptedTypes}
            multiple={isMultipleAllowed}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className={`w-16 h-16 rounded-2xl ${c.bg} flex items-center justify-center mx-auto mb-4`}>
            {isPdfInput ? (
              <FileText className={`w-8 h-8 ${c.icon}`} />
            ) : (
              <Image className={`w-8 h-8 ${c.icon}`} />
            )}
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Drop your {fromFormat} {isMultipleAllowed ? 'files' : 'file'} here
          </h3>
          <p className="text-sm text-muted-foreground mb-5">
            or click to browse from your device
          </p>
          <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold ${c.button}`}>
            <Upload className="w-4 h-4" />
            Choose {fromFormat} {isMultipleAllowed ? 'Files' : 'File'}
          </span>
          <p className="text-xs text-muted-foreground mt-4">
            Supports: {acceptedTypes.split(',').join(', ')} &nbsp;•&nbsp; Processed entirely in your browser
          </p>
        </div>
      )}

      {/* File list */}
      {files.length > 0 && results.length === 0 && (
        <div className="space-y-4">
          <div className={`rounded-2xl border ${c.border} ${c.bg} p-4`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-foreground">
                {files.length} file{files.length > 1 ? 's' : ''} selected
              </span>
              <button
                onClick={() => inputRef.current?.click()}
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                <Upload className="w-3 h-3" /> Add more
              </button>
              <input
                ref={inputRef}
                type="file"
                accept={acceptedTypes}
                multiple={isMultipleAllowed}
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>
            <div className="space-y-2 max-h-52 overflow-y-auto">
              {files.map((f, i) => (
                <div key={i} className="flex items-center gap-3 bg-card rounded-xl px-3 py-2.5 border border-border">
                  {isPdfInput ? (
                    <FileText className={`w-4 h-4 ${c.icon} shrink-0`} />
                  ) : (
                    <Image className={`w-4 h-4 ${c.icon} shrink-0`} />
                  )}
                  <span className="text-sm text-foreground flex-1 truncate">{f.name}</span>
                  <span className="text-xs text-muted-foreground shrink-0">{formatBytes(f.size)}</span>
                  <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          {converting && progress > 0 && (
            <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={convert}
              disabled={converting}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all ${c.button} disabled:opacity-60 disabled:cursor-not-allowed shadow-sm`}
            >
              {converting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Converting to {toFormat}...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Convert to {toFormat}
                </>
              )}
            </button>
            <button
              onClick={reset}
              className="px-4 py-3.5 rounded-xl border border-border text-muted-foreground hover:bg-secondary transition-colors"
              title="Start over"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl mt-4">
          <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-destructive">Conversion failed</div>
            <div className="text-sm text-muted-foreground mt-1">{error}</div>
          </div>
          <button onClick={() => setError(null)} className="ml-auto text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            Conversion complete! {results.length} file{results.length > 1 ? 's' : ''} ready.
          </div>
          <div className="space-y-3">
            {results.map((r, i) => (
              <div key={i} className={`flex items-center gap-3 p-3.5 bg-card rounded-xl border ${c.border}`}>
                {r.type.startsWith('image/') ? (
                  // Preview image
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-secondary flex items-center justify-center shrink-0">
                    <img
                      src={r.url}
                      alt={`Preview of converted file ${r.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
                    <FileText className={`w-5 h-5 ${c.icon}`} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{formatBytes(r.size)}</div>
                </div>
                {r.type.startsWith('image/') && (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-muted-foreground hover:bg-secondary transition-colors"
                    title="Preview"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </a>
                )}
                <a
                  href={r.url}
                  download={r.name}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold ${c.button}`}
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </a>
              </div>
            ))}
          </div>
          <button
            onClick={reset}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border text-sm text-muted-foreground hover:bg-secondary transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Convert Another File
          </button>
        </div>
      )}
    </div>
  )
}
