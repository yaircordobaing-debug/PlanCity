/**
 * Sincroniza los archivos estáticos del MVP (index.html, app.html, css, js, assets, data)
 * hacia la carpeta public/ para que Next.js y Vercel los sirvan directamente en producción.
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, 'public');

const FILES_TO_COPY = ['index.html', 'app.html'];
const DIRS_TO_COPY = ['css', 'js', 'assets', 'data'];

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

for (const file of FILES_TO_COPY) {
  const src = path.join(ROOT, file);
  const dest = path.join(PUBLIC_DIR, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

for (const dir of DIRS_TO_COPY) {
  const srcDir = path.join(ROOT, dir);
  const destDir = path.join(PUBLIC_DIR, dir);
  if (fs.existsSync(srcDir)) {
    fs.cpSync(srcDir, destDir, { recursive: true, force: true });
  }
}

console.log('✅ Archivos estáticos sincronizados en public/ para Vercel.');

