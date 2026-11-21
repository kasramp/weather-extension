import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const { version } = JSON.parse(readFileSync('package.json', 'utf8'))
const manifest = JSON.parse(readFileSync('manifest.json', 'utf8'))

// Emit the manifest template with the version taken from package.json.
const emitManifest = {
  name: 'emit-manifest',
  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'manifest.json',
      source: JSON.stringify({ ...manifest, version }, null, 2),
    })
  },
}

export default defineConfig({
  plugins: [vue(), emitManifest],
  publicDir: 'public',
  base: '',
  build: {
    rollupOptions: { input: 'src/popup/index.html' },
  },
  test: { environment: 'jsdom' },
})
