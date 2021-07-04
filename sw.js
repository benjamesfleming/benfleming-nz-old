importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/115bb01653a9d97ab4d6.js",
    "revision": "19ae7108ed064bb718dd8abc7fccaa27"
  },
  {
    "url": "/_nuxt/6d1c23be8d7be55b1d58.js",
    "revision": "99667f7e6b1f3e58ac933ba22cc90824"
  },
  {
    "url": "/_nuxt/766466443241ecd8ba70.js",
    "revision": "598c957fb34e7c1b088706958506c875"
  },
  {
    "url": "/_nuxt/956214353ca81de274aa.js",
    "revision": "41b30fc4543346d758f4a32ed1edd820"
  },
  {
    "url": "/_nuxt/adf002d9a0ad8801b131.js",
    "revision": "1e366b65d79c9e776b9b1435dc657705"
  },
  {
    "url": "/_nuxt/c292503310fb6b13725e.js",
    "revision": "110c382525807180cee13beb60477b70"
  },
  {
    "url": "/_nuxt/f533e0675f6cd3b80c01.js",
    "revision": "359d3ad1ab4fcc1947eda788f47557b1"
  },
  {
    "url": "/_nuxt/f963c7b0019dec00f5d3.js",
    "revision": "636c77e430f7270354a31df887e4dbf9"
  }
], {
  "cacheId": "benfleming.nz",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('https://fonts.googleapis.com/.*'), workbox.strategies.cacheFirst({"cacheableResponse":{"statuses":[0,200]}}), 'GET')

workbox.routing.registerRoute(new RegExp('https://fonts.gstatic.com/.*'), workbox.strategies.cacheFirst({"cacheableResponse":{"statuses":[0,200]}}), 'GET')
