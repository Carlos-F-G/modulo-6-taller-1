const CACHE_NAME = "hospital-nueva-vida-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/service-worker.js",
  "/vite.svg",
  "/icons/android-chrome-192x192.png",
  "/icons/android-chrome-512x512.png",
];

// ✅ Instalar el Service Worker y almacenar en caché archivos esenciales
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("✅ Archivos en caché correctamente");
      return cache.addAll(urlsToCache);
    })
  );
});

// ✅ Interceptar solicitudes de red y servir desde la caché si no hay conexión
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
      .catch(() => {
        console.error("❌ Error al obtener recurso en modo offline");
      })
  );
});

// ✅ Actualizar caché cuando haya una nueva versión
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("⚡ Eliminando caché antigua:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
