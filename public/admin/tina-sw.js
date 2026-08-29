// Tina CDN image proxy service worker
// Intercepts requests to assets.tina.io and serves the equivalent
// local static file from this Vercel deployment instead.

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(clients.claim()));

self.addEventListener('fetch', event => {
  const match = event.request.url.match(
    /^https:\/\/assets\.tina\.io\/[a-f0-9-]+(\/.*\.(?:png|jpg|jpeg|gif|webp|svg|avif|ico))$/i
  );
  if (!match) return;

  const localPath = match[1]; // e.g. /static/images/foo.png
  const localUrl  = self.location.origin + localPath;

  event.respondWith(
    fetch(localUrl).catch(() => fetch(event.request))
  );
});
