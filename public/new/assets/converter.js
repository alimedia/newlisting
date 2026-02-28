/* ===== NAVBAR HAMBURGER ===== */
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function () {
      mobileMenu.classList.toggle("open");
    });
  }

  /* ===== FAQ ACCORDION ===== */
  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      const item = this.closest(".faq-item");
      const allItems = document.querySelectorAll(".faq-item");
      allItems.forEach(function (i) {
        if (i !== item) i.classList.remove("open");
      });
      item.classList.toggle("open");
    });
  });

  /* ===== CONVERTER LOGIC ===== */
  initConverter();
});

/* ===== FILE SIZE FORMATTER ===== */
function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

/* ===== MAIN CONVERTER INIT ===== */
function initConverter() {
  const dropZone = document.getElementById("dropZone");
  const fileInput = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");
  const convertBtn = document.getElementById("convertBtn");
  const progressWrap = document.getElementById("progressWrap");
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");
  const resultArea = document.getElementById("resultArea");
  const errorArea = document.getElementById("errorArea");
  const downloadBtns = document.getElementById("downloadBtns");
  const resetBtn = document.getElementById("resetBtn");

  if (!dropZone) return;

  let files = [];
  const convType = dropZone.dataset.conv; // e.g. "jpg-to-pdf"

  /* Drop Zone Events */
  dropZone.addEventListener("click", function (e) {
    if (e.target.closest(".file-list")) return;
    fileInput.click();
  });
  dropZone.addEventListener("dragover", function (e) {
    e.preventDefault();
    dropZone.classList.add("dragover");
  });
  dropZone.addEventListener("dragleave", function () {
    dropZone.classList.remove("dragover");
  });
  dropZone.addEventListener("drop", function (e) {
    e.preventDefault();
    dropZone.classList.remove("dragover");
    handleFiles(Array.from(e.dataTransfer.files));
  });
  fileInput.addEventListener("change", function () {
    handleFiles(Array.from(this.files));
  });

  function handleFiles(newFiles) {
    newFiles.forEach(function (f) {
      files.push(f);
    });
    renderFileList();
    hideResult();
    hideError();
  }

  function renderFileList() {
    if (!fileList) return;
    fileList.innerHTML = "";
    files.forEach(function (f, i) {
      const ext = f.name.split(".").pop().toLowerCase();
      let icon = "📄";
      if (["jpg", "jpeg"].includes(ext)) icon = "🖼️";
      else if (ext === "png") icon = "🗂️";
      else if (ext === "pdf") icon = "📕";

      const div = document.createElement("div");
      div.className = "file-item";
      div.innerHTML =
        '<span class="file-item-icon">' + icon + "</span>" +
        '<div class="file-item-info">' +
          '<div class="file-item-name">' + f.name + "</div>" +
          '<div class="file-item-size">' + formatSize(f.size) + "</div>" +
        "</div>" +
        '<button class="file-item-remove" data-idx="' + i + '" title="Remove">&#x2715;</button>';
      fileList.appendChild(div);
    });

    fileList.querySelectorAll(".file-item-remove").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        files.splice(parseInt(this.dataset.idx), 1);
        renderFileList();
      });
    });
  }

  /* Option Buttons */
  document.querySelectorAll(".option-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const group = this.dataset.group;
      document.querySelectorAll('.option-btn[data-group="' + group + '"]').forEach(function (b) {
        b.classList.remove("selected");
      });
      this.classList.add("selected");
    });
  });

  /* Convert Button */
  if (convertBtn) {
    convertBtn.addEventListener("click", function () {
      if (files.length === 0) {
        showError("Please select at least one file to convert.");
        return;
      }
      hideError();
      hideResult();
      doConvert();
    });
  }

  /* Reset */
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      files = [];
      renderFileList();
      hideResult();
      hideError();
      if (progressWrap) progressWrap.style.display = "none";
    });
  }

  /* ===== CONVERSION DISPATCHER ===== */
  function doConvert() {
    convertBtn.disabled = true;
    showProgress(0);

    const parts = convType.split("-to-");
    const from = parts[0];
    const to = parts[1];

    animateProgress(10, 40, 400, function () {
      try {
        if (from === "jpg" && to === "pdf") convertImagesToPDF(files, "jpg");
        else if (from === "png" && to === "pdf") convertImagesToPDF(files, "png");
        else if (from === "jpg" && to === "png") convertImageFormat(files[0], "png");
        else if (from === "png" && to === "jpg") convertImageFormat(files[0], "jpg");
        else if (from === "pdf" && (to === "jpg" || to === "png")) convertPDFToImages(files[0], to);
        else showError("Unsupported conversion type.");
      } catch (err) {
        convertBtn.disabled = false;
        showError("Conversion failed: " + err.message);
        if (progressWrap) progressWrap.style.display = "none";
      }
    });
  }

  /* ===== IMAGE → PDF ===== */
  function convertImagesToPDF(imgFiles, fmt) {
    const readers = imgFiles.map(function (f) {
      return new Promise(function (resolve, reject) {
        const r = new FileReader();
        r.onload = function (e) { resolve(e.target.result); };
        r.onerror = reject;
        r.readAsDataURL(f);
      });
    });

    Promise.all(readers).then(function (dataUrls) {
      animateProgress(40, 80, 600, function () {
        const pageW = 595, pageH = 842;
        let imgObjParts = "";
        let pageObjParts = "";
        let xrefPositions = [];
        let offset = 0;

        const header = "%PDF-1.4\n";
        offset += header.length;

        const catalogNum = 1;
        const pagesNum = 2;
        let objNum = 3;
        const pageNums = [];
        const imgNums = [];

        const bodyParts = [];

        dataUrls.forEach(function (dataUrl, i) {
          const imgNum = objNum++;
          const pageNum = objNum++;
          imgNums.push(imgNum);
          pageNums.push(pageNum);
        });

        // Build full minimal PDF using canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const loadImages = dataUrls.map(function (du, i) {
          return new Promise(function (res) {
            const img = new Image();
            img.onload = function () {
              const scale = Math.min(pageW / img.width, pageH / img.height);
              const w = img.width * scale;
              const h = img.height * scale;
              canvas.width = pageW;
              canvas.height = pageH;
              ctx.fillStyle = "#fff";
              ctx.fillRect(0, 0, pageW, pageH);
              const x = (pageW - w) / 2;
              const y = (pageH - h) / 2;
              ctx.drawImage(img, x, y, w, h);
              res(canvas.toDataURL("image/jpeg", 0.85));
            };
            img.src = du;
          });
        });

        Promise.all(loadImages).then(function (jpegUrls) {
          animateProgress(80, 100, 400, function () {
            // Use jsPDF-style manual construction via Blob + anchor
            // Simple approach: build one PDF page per image using raw PDF syntax
            buildPDFBlob(jpegUrls, pageW, pageH).then(function (blob) {
              const url = URL.createObjectURL(blob);
              const quality = getSelectedOption("quality") || "standard";
              const fname = "converted_" + quality + "_" + Date.now() + ".pdf";
              showResult([{ url: url, name: fname, size: formatSize(blob.size) }]);
              convertBtn.disabled = false;
            });
          });
        });
      });
    }).catch(function () {
      showError("Failed to read image files. Please try again.");
      convertBtn.disabled = false;
    });
  }

  /* Build a raw PDF blob from JPEG data URLs */
  function buildPDFBlob(jpegDataUrls, pageW, pageH) {
    return Promise.all(jpegDataUrls.map(function (du) {
      const b64 = du.split(",")[1];
      return b64;
    })).then(function (b64Arr) {
      // Build PDF binary
      const enc = new TextEncoder();
      let pdf = "";
      const imgBytes = b64Arr.map(function (b64) { return atob(b64); });

      let offsets = [];
      let pos = 0;
      pdf = "%PDF-1.4\n%\u00e2\u00e3\u00cf\u00d3\n";
      pos = pdf.length;

      const numPages = imgBytes.length;
      const pageObjStart = 3; // obj 1=catalog, 2=pages, 3+= page+img pairs

      let objMap = {}; // objNum -> offset

      const parts = [];
      parts.push("%PDF-1.4\n%\u00e2\u00e3\u00cf\u00d3\n");

      let objIdx = 1;
      const catalogIdx = objIdx++;
      const pagesIdx = objIdx++;

      const pageIdxArr = [];
      const imgIdxArr = [];
      imgBytes.forEach(function () {
        imgIdxArr.push(objIdx++);
        pageIdxArr.push(objIdx++);
      });

      let body = "";
      let xref = {};

      // catalog
      xref[catalogIdx] = body.length;
      body += catalogIdx + " 0 obj\n<< /Type /Catalog /Pages " + pagesIdx + " 0 R >>\nendobj\n";

      // pages
      xref[pagesIdx] = body.length;
      const kidsStr = pageIdxArr.map(function (n) { return n + " 0 R"; }).join(" ");
      body += pagesIdx + " 0 obj\n<< /Type /Pages /Kids [" + kidsStr + "] /Count " + numPages + " >>\nendobj\n";

      imgBytes.forEach(function (imgBin, i) {
        const imgIdx = imgIdxArr[i];
        const pageIdx = pageIdxArr[i];

        // image object
        xref[imgIdx] = body.length;
        body += imgIdx + " 0 obj\n<< /Type /XObject /Subtype /Image /Width " + pageW +
          " /Height " + pageH + " /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length " +
          imgBin.length + " >>\nstream\n";

        // page object
        const contentStr = "q " + pageW + " 0 0 " + pageH + " 0 0 cm /Im" + i + " Do Q";
        const streamLen = contentStr.length;
        xref[pageIdx] = -1; // placeholder

        body += "endstream\nendobj\n";

        // re-do properly with Uint8Array approach below
      });

      // Rebuild properly with binary
      return buildPDFBlobBinary(imgBytes, b64Arr, pageW, pageH, imgIdxArr, pageIdxArr, catalogIdx, pagesIdx, numPages);
    });
  }

  function buildPDFBlobBinary(imgBins, b64Arr, pageW, pageH, imgIdxArr, pageIdxArr, catalogIdx, pagesIdx, numPages) {
    const chunks = [];
    const te = new TextEncoder();
    let offset = 0;
    const xref = {};

    function pushStr(s) {
      const buf = te.encode(s);
      chunks.push(buf);
      offset += buf.byteLength;
    }
    function pushBin(arr) {
      const buf = new Uint8Array(arr.length);
      for (let i = 0; i < arr.length; i++) buf[i] = arr.charCodeAt(i) & 0xff;
      chunks.push(buf);
      offset += buf.byteLength;
    }

    pushStr("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");

    xref[catalogIdx] = offset;
    pushStr(catalogIdx + " 0 obj\n<</Type /Catalog /Pages " + pagesIdx + " 0 R>>\nendobj\n");

    xref[pagesIdx] = offset;
    const kids = pageIdxArr.map(function (n) { return n + " 0 R"; }).join(" ");
    pushStr(pagesIdx + " 0 obj\n<</Type /Pages /Kids [" + kids + "] /Count " + numPages + ">>\nendobj\n");

    imgBins.forEach(function (imgBin, i) {
      const imgIdx = imgIdxArr[i];
      const pageIdx = pageIdxArr[i];
      const imgObj = new Image();

      // We need actual dimensions - use pageW x pageH (canvas already sized to page)
      const iw = pageW, ih = pageH;

      xref[imgIdx] = offset;
      pushStr(imgIdx + " 0 obj\n<</Type /XObject /Subtype /Image /Width " + iw + " /Height " + ih +
        " /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length " + imgBin.length + ">>\nstream\n");
      pushBin(imgBin);
      pushStr("\nendstream\nendobj\n");

      const contentStream = "q " + iw + " 0 0 " + ih + " 0 0 cm /Im" + i + " Do Q";
      const contentObj = te.encode(contentStream);

      const contentIdx = pageIdxArr[i] + 100; // temp - we'll inline it
      xref[pageIdx] = offset;
      pushStr(pageIdx + " 0 obj\n<</Type /Page /Parent " + pagesIdx + " 0 R" +
        " /MediaBox [0 0 " + iw + " " + ih + "]" +
        " /Resources <</XObject <</Im" + i + " " + imgIdx + " 0 R>>>>" +
        " /Contents << /Length " + contentObj.byteLength + " >> >>\nendobj\n");
    });

    // xref table
    const xrefOffset = offset;
    const allObjs = [catalogIdx, pagesIdx].concat(imgIdxArr).concat(pageIdxArr);
    allObjs.sort(function (a, b) { return a - b; });
    const maxObj = allObjs[allObjs.length - 1];

    pushStr("xref\n0 " + (maxObj + 1) + "\n");
    pushStr("0000000000 65535 f \n");
    for (let n = 1; n <= maxObj; n++) {
      if (xref[n] !== undefined) {
        pushStr(xref[n].toString().padStart(10, "0") + " 00000 n \n");
      } else {
        pushStr("0000000000 65535 f \n");
      }
    }
    pushStr("trailer\n<</Size " + (maxObj + 1) + " /Root " + catalogIdx + " 0 R>>\nstartxref\n" + xrefOffset + "\n%%EOF\n");

    const totalLen = chunks.reduce(function (s, c) { return s + c.byteLength; }, 0);
    const out = new Uint8Array(totalLen);
    let pos = 0;
    chunks.forEach(function (c) { out.set(c, pos); pos += c.byteLength; });

    return Promise.resolve(new Blob([out], { type: "application/pdf" }));
  }

  /* ===== IMAGE → IMAGE (JPG <-> PNG) ===== */
  function convertImageFormat(file, targetFmt) {
    const reader = new FileReader();
    reader.onload = function (e) {
      animateProgress(40, 80, 500, function () {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (targetFmt === "jpg") {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          ctx.drawImage(img, 0, 0);

          const quality = getQualityValue();
          const mimeType = targetFmt === "jpg" ? "image/jpeg" : "image/png";

          animateProgress(80, 100, 400, function () {
            canvas.toBlob(function (blob) {
              const url = URL.createObjectURL(blob);
              const fname = file.name.replace(/\.[^.]+$/, "") + "." + targetFmt;
              showResult([{ url: url, name: fname, size: formatSize(blob.size) }]);
              convertBtn.disabled = false;
            }, mimeType, quality);
          });
        };
        img.src = e.target.result;
      });
    };
    reader.readAsDataURL(file);
  }

  /* ===== PDF → IMAGES ===== */
  function convertPDFToImages(file, targetFmt) {
    if (typeof pdfjsLib === "undefined") {
      // Load PDF.js dynamically
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.onload = function () {
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        doPDFConvert(file, targetFmt);
      };
      script.onerror = function () {
        showError("Failed to load PDF library. Please check your internet connection.");
        convertBtn.disabled = false;
      };
      document.head.appendChild(script);
    } else {
      doPDFConvert(file, targetFmt);
    }
  }

  function doPDFConvert(file, targetFmt) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const typedArray = new Uint8Array(e.target.result);
      pdfjsLib.getDocument(typedArray).promise.then(function (pdf) {
        const numPages = pdf.numPages;
        const results = [];
        let processed = 0;

        const scale = getSelectedOption("dpi") === "300dpi" ? 3.0 : getSelectedOption("dpi") === "150dpi" ? 1.5 : 1.0;

        function processPage(pageNum) {
          pdf.getPage(pageNum).then(function (page) {
            const viewport = page.getViewport({ scale: scale });
            const canvas = document.createElement("canvas");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const ctx = canvas.getContext("2d");
            const renderCtx = { canvasContext: ctx, viewport: viewport };

            page.render(renderCtx).promise.then(function () {
              const progress = Math.round(20 + ((pageNum / numPages) * 70));
              updateProgress(progress);

              const mimeType = targetFmt === "png" ? "image/png" : "image/jpeg";
              const quality = getQualityValue();

              canvas.toBlob(function (blob) {
                const url = URL.createObjectURL(blob);
                results.push({ url: url, name: "page_" + pageNum + "." + targetFmt, size: formatSize(blob.size) });
                processed++;

                if (processed === numPages) {
                  animateProgress(90, 100, 300, function () {
                    showResult(results);
                    convertBtn.disabled = false;
                  });
                } else {
                  processPage(pageNum + 1);
                }
              }, mimeType, quality);
            });
          });
        }
        processPage(1);
      }).catch(function (err) {
        showError("Could not read PDF file. Make sure it is a valid PDF. Error: " + err.message);
        convertBtn.disabled = false;
      });
    };
    reader.readAsArrayBuffer(file);
  }

  /* ===== HELPERS ===== */
  function getSelectedOption(group) {
    const btn = document.querySelector('.option-btn.selected[data-group="' + group + '"]');
    return btn ? btn.dataset.value : null;
  }

  function getQualityValue() {
    const q = getSelectedOption("quality");
    if (q === "high") return 0.95;
    if (q === "low") return 0.6;
    return 0.85;
  }

  function showProgress(val) {
    if (!progressWrap) return;
    progressWrap.style.display = "block";
    updateProgress(val);
  }

  function updateProgress(val) {
    if (!progressFill) return;
    progressFill.style.width = val + "%";
    if (progressText) progressText.textContent = val + "%";
  }

  function animateProgress(from, to, duration, callback) {
    showProgress(from);
    const step = (to - from) / (duration / 16);
    let cur = from;
    const timer = setInterval(function () {
      cur += step;
      if (cur >= to) {
        cur = to;
        clearInterval(timer);
        updateProgress(to);
        if (callback) callback();
      } else {
        updateProgress(Math.round(cur));
      }
    }, 16);
  }

  function showResult(items) {
    updateProgress(100);
    if (!resultArea) return;
    resultArea.classList.add("show");
    if (downloadBtns) {
      downloadBtns.innerHTML = "";
      items.forEach(function (item) {
        const a = document.createElement("a");
        a.href = item.url;
        a.download = item.name;
        a.className = "btn-download";
        a.innerHTML = "&#11123; Download " + item.name + " (" + item.size + ")";
        downloadBtns.appendChild(a);
      });
    }
  }

  function hideResult() {
    if (resultArea) resultArea.classList.remove("show");
  }

  function showError(msg) {
    if (!errorArea) return;
    errorArea.textContent = msg;
    errorArea.classList.add("show");
    convertBtn.disabled = false;
    if (progressWrap) progressWrap.style.display = "none";
  }

  function hideError() {
    if (errorArea) errorArea.classList.remove("show");
  }
}
