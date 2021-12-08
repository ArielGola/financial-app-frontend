import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import {
  precacheAndRoute,
  createHandlerBoundToURL,
  cleanupOutdatedCaches,
} from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");


registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== "navigate") {
      return false;
    } // If this is a URL that starts with /_, skip.

    if (url.pathname.startsWith("/_")) {
      return false;
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Return true to signal that we want to use the handler.

    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html")
);


registerRoute(
  ({ url }) => url.pathname.endsWith(".jpg"),
  new StaleWhileRevalidate({
    cacheName: "images-jpg",
    plugins: [new ExpirationPlugin({ maxEntries: 10 })],
  })
);


registerRoute(
  ({ url }) => url.pathname.endsWith(".webp"),
  new StaleWhileRevalidate({
    cacheName: "images-webp",
    plugins: [new ExpirationPlugin({ maxEntries: 10 })],
  })
);


registerRoute(
  ({ url }) => url.pathname.endsWith(".png"),
  new StaleWhileRevalidate({
    cacheName: "images-png",
    plugins: [new ExpirationPlugin({ maxEntries: 10 })],
  })
);


self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});


const cacheStatic = "static-v-1.1";
const cacheInmutable = "inmutable-v-1.3";

self.addEventListener("install", (e) => {
  console.log(e);
  const cacheStaticPromise = caches.open(cacheStatic).then((cache) => {
    return cache.addAll([
      "/service-worker.js",
      "/favicon.ico",
      "/site.webmanifest",
    ]);
  });

  const cacheInmutablePromise = caches.open(cacheInmutable).then((cache) => {
    return cache.addAll([
      "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
      "https://unpkg.com/react/umd/react.production.min.js",
      "https://unpkg.com/react-dom/umd/react-dom.production.min.js",
      "https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js",
    ]);
  });

  e.waitUntil(Promise.all([cacheInmutablePromise, cacheStaticPromise]));
});