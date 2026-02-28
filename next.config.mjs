/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",        // Generates a static /out folder
  trailingSlash: true,     // Makes URLs like /tools/pdf-to-jpg/ work on Apache
  basePath: "/new",        // CHANGE THIS: matches your SiteGround subfolder public_html/new/
  assetPrefix: "/new/",    // CHANGE THIS: ensures _next/ assets load from /new/_next/
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,     // Required for static export
  },
}

export default nextConfig
