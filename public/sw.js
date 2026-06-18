const ICON_MAP = {
  'google.svg': '/clerk-icons/google.svg',
  'github.svg': '/clerk-icons/github.svg',
  'apple.svg': '/clerk-icons/apple.svg',
};

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only intercept img.clerk.com static SVG icons
  if (url.hostname === 'img.clerk.com' && url.pathname.startsWith('/static/')) {
    const filename = url.pathname.split('/').pop(); // e.g. "google.svg"
    const local = ICON_MAP[filename];
    if (local) {
      const localUrl = new URL(local, self.location.origin).href;
      event.respondWith(fetch(localUrl));
      return;
    }
  }

  // All other requests pass through normally
  event.respondWith(fetch(event.request));
});
