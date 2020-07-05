importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn@3.6.3-5/workbox/workbox-sw.js')

// --------------------------------------------------
// Configure
// --------------------------------------------------

// Set workbox config
workbox.setConfig({
  "debug": false
})

// Start controlling any existing clients as soon as it activates
workbox.clientsClaim()

// Skip over the SW waiting lifecycle stage
workbox.skipWaiting()

// --------------------------------------------------
// Precaches
// --------------------------------------------------

// Precache build artifacts
workbox.precaching.precacheAndRoute([], {
  "cacheId": "GLAMPI",
  "directoryIndex": "/"
})

// --------------------------------------------------
// Runtime Caching
// --------------------------------------------------

// Register route handlers for runtimeCaching
workbox.routing.registerRoute(new RegExp('/_nuxt/(?!.*(__webpack_hmr|hot-update))'), workbox.strategies.cacheFirst ({}), 'GET')
workbox.routing.registerRoute(new RegExp('^/(?!.*(__webpack_hmr|hot-update))'), workbox.strategies.networkFirst ({}), 'GET')
