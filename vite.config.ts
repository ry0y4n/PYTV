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
  version: "1.1.1",
  permissions: [
    "activeTab",
    "storage"
  ],
  action: {
    default_popup: "index.html",
    default_icon: "icons/icon-128px.png"
  },
  background: {
    service_worker: "src//background/index.ts",
    type: "module",
  },
  web_accessible_resources: [
    {
      resources: ["auth_callback.html"],
      matches: ["https://api.twitter.com/*"]
    }
  ]
});

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],
  build: {
    rollupOptions: {
      input: {
        index: "index.html",
        auth_callback: "auth_callback.html",
      }
    }
  }
})
