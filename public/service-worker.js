const CACHE_NAME = "hospital-nueva-vida-v2";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/service-worker.js",
  "/vite.svg",
  "/icons/android-chrome-192x192.png",
  "/icons/android-chrome-512x512.png",
  "/styles.css", // ✅ Agregamos CSS
  "/src/main.tsx", // ✅ Agregamos script principal
  "/src/App.tsx", // ✅ Agregamos la app principal
  "/src/utils/indexedDB.js", // ✅ IndexedDB en caché para soporte offline
];

// ✅ Instalar el Service Worker y almacenar en caché archivos esenciales
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("✅ Archivos cacheados correctamente");
      return cache.addAll(urlsToCache);
    })
  );
});

// ✅ Interceptar solicitudes de red y servir desde caché si no hay conexión
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return (
          response ||
          fetch(event.request).then((fetchResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, fetchResponse.clone()); // Guarda en caché para futuras solicitudes
              return fetchResponse;
            });
          })
        );
      })
      .catch(() => {
        console.error("❌ Error al obtener recurso en modo offline");
        return new Response(
          "⚠️ Sin conexión a internet y el recurso no está en caché",
          {
            status: 503,
            headers: { "Content-Type": "text/plain" },
          }
        );
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
