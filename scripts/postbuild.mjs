import rss from './rss.mjs'
import fs from 'fs'
import path from 'path'

// ── Inject Tina admin service worker ────────────────────────────────────────
// The Tina admin sidebar loads image previews using Tina CDN URLs
// (assets.tina.io/{clientId}/...) which 404 because our images live in git,
// not on Tina's CDN.  We inject a service worker that intercepts those CDN
// requests and transparently serves the corresponding local file instead.
function injectAdminServiceWorker() {
  const adminDir = path.join(process.cwd(), 'public', 'admin')
  const indexPath = path.join(adminDir, 'index.html')
  const swPath = path.join(adminDir, 'tina-sw.js')

  if (!fs.existsSync(indexPath)) {
    console.log('[postbuild] public/admin/index.html not found — skipping SW injection')
    return
  }

  // Write service worker
  const swContent = `
// Tina CDN image proxy service worker
// Intercepts requests to assets.tina.io and serves the equivalent
// local static file from this Vercel deployment instead.

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(clients.claim()));

self.addEventListener('fetch', event => {
  const match = event.request.url.match(
    /^https:\\/\\/assets\\.tina\\.io\\/[a-f0-9-]+(\\/.*\\.(?:png|jpg|jpeg|gif|webp|svg|avif|ico))$/i
  );
  if (!match) return;

  const localPath = match[1]; // e.g. /static/images/foo.png
  const localUrl  = self.location.origin + localPath;

  event.respondWith(
    fetch(localUrl).catch(() => fetch(event.request))
  );
});
`.trimStart()

  fs.writeFileSync(swPath, swContent, 'utf-8')
  console.log('[postbuild] wrote public/admin/tina-sw.js')

  // Inject registration snippet before </body>
  let html = fs.readFileSync(indexPath, 'utf-8')
  const swSnippet = `
  <script>
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/admin/tina-sw.js').catch(console.error);
    }
  </script>
`
  if (html.includes('tina-sw.js')) {
    console.log('[postbuild] SW snippet already present in index.html — skipping')
    return
  }

  html = html.replace('</body>', swSnippet + '</body>')
  if (!html.includes('</body>')) {
    html += swSnippet
  }

  fs.writeFileSync(indexPath, html, 'utf-8')
  console.log('[postbuild] injected SW registration into public/admin/index.html')
}

async function postbuild() {
  await rss()
  injectAdminServiceWorker()
}

postbuild()
