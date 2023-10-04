import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx, defineManifest } from '@crxjs/vite-plugin'

const manifest = defineManifest({
  manifest_version: 3,
  name: "PYTV - Post YouTube Video",
  description: "Extension to post YouTube video to X (formerly Twitter)",
  version: "1.0.0",
  permissions: ["activeTab"],
  action: {
    default_popup: "index.html",
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
