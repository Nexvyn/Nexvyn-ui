import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  devIndicators: false,
  experimental: {
    optimizePackageImports: [
      "motion",
      "@paper-design/shaders-react",
      "lucide-react",
      "react-icons/fa6"
    ],
  },
};

export default withMDX(config);
