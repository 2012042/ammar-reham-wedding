/** @type {import('next').NextConfig} */
// GitHub Pages serves project sites from /<repo>, so the base path is injected
// at build time. Leave NEXT_PUBLIC_BASE_PATH empty for Vercel or a custom domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
};
export default nextConfig;
