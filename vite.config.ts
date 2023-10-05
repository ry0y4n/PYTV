import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx, defineManifest } from '@crxjs/vite-plugin'

const manifest = defineManifest({
  manifest_version: 3,
  name: "PYTV - Post YouTube Video",
  description: "Extension to post YouTube video to X (formerly Twitter)",
  icons: {
    128: "icons/icon-128px.png",
    48: "icons/icon-48px.png",
    16: "icons/icon-16px.png",
  },
  version: "1.0.0",
  permissions: ["activeTab"],
  action: {
    default_popup: "index.html",
    default_icon: "icons/icon-128px.png"
  },
  background: {
    service_worker: "src//background/index.ts",
    type: "module",
  },
});

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],
})
