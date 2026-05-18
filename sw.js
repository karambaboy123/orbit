/* Orbit Service Worker — cache-first met network fallback */
const CACHE_NAME = 'orbit-v14';
const CORE_URLS = [
  '/orbit/',
  '/orbit/index.html',
  '/orbit/manifest.json',
  '/orbit/icon.svg',
  '/orbit/styles.css',
  '/orbit/js/state.js',
  '/orbit/js/theme.js',
  '/orbit/js/icons.js',
  '/orbit/js/utils.js',
  '/orbit/js/ai.js',
  '/orbit/js/backup.js',
  '/orbit/js/help.js',
  '/orbit/js/main.js',
  '/orbit/js/views/home.js',
  '/orbit/js/views/dash.js',
  '/orbit/js/views/new-task.js',
  '/orbit/js/views/prompt-gen.js',
  '/orbit/js/views/file-to-ai.js',
  '/orbit/js/views/ai-checklist.js',
  '/orbit/js/views/analysis.js',
  '/orbit/js/views/settings.js',
  '/orbit/js/views/portfolio.js',
  '/orbit/js/views/goal-detail.js',
  '/orbit/js/views/notes.js',
  '/orbit/js/views/review.js',
  '/orbit/js/views/launcher.js',
];

/* ── Install: cache kern-bestanden ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_URLS))
  );
  self.skipWaiting();
});

/* ── Activate: verwijder oude caches ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

/* ── Fetch: cache-first, daarna netwerk ── */
self.addEventListener('fetch', event => {
  /* alleen GET requests afhandelen */
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  /* externe CDN-requests (Tailwind, Lucide, fonts) — netwerk-first met cache fallback */
  const isExternal = !url.hostname.includes('github.io') && !url.hostname.includes('localhost');
  if (isExternal) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  /* eigen bestanden — cache-first */
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return res;
      });
    })
  );
});
