/* Plan réseaux 49 — cache hors ligne.
   Change CACHE quand tu redéployes une nouvelle version : l'ancien cache est purgé. */
const CACHE = "plan49-v6";

const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icone-192.png",
  "./icone-512.png",
  "./donnees.json",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"
];

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    // un fichier manquant (donnees.json par exemple) ne doit pas faire échouer l'installation
    await Promise.all(SHELL.map(u => c.add(new Request(u, { cache: "reload" })).catch(() => {})));
    self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Tuiles de fond et flux temps réel : jamais de cache, toujours le réseau.
  if (/basemaps\.cartocdn\.com|data\.geopf\.fr|arcgisonline\.com|tile\.openstreetmap\.org|proxy\.transport\.data\.gouv\.fr|ara-api\.enroute\.mobi|notify\.ratpdev\.com/.test(url.host + url.pathname)) return;

  // donnees.json : le réseau d'abord pour rester à jour, le cache si hors ligne.
  if (url.pathname.endsWith("/donnees.json")) {
    e.respondWith((async () => {
      try {
        const r = await fetch(req);
        if (r.ok) (await caches.open(CACHE)).put(req, r.clone());
        return r;
      } catch (_) {
        return (await caches.match(req)) || Response.error();
      }
    })());
    return;
  }

  // Reste : le cache d'abord, sinon le réseau (et on met en cache au passage).
  e.respondWith((async () => {
    const hit = await caches.match(req, { ignoreVary: true });
    if (hit) return hit;
    try {
      const r = await fetch(req);
      if (r.ok || r.type === "opaque") (await caches.open(CACHE)).put(req, r.clone());
      return r;
    } catch (_) {
      return (await caches.match("./index.html")) || Response.error();
    }
  })());
});
