const {  warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// This helps in faster loading and offline availability of these files
precacheAndRoute(self.__WB_MANIFEST);

// Cache-first strategy means the cache will be checked first for a response before network requests
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// This pre-caches important URLs for faster access
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// This is for HTML navigation requests like page loads
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Stale-while-revalidate strategy means the cache will be checked first for a response before network requests
registerRoute(
  // Function to determine if the request is for a style, script, or worker file
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
