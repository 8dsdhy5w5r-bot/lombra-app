var CACHE = "lombra-v17";
var URLS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./chapters.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) {
      return c.addAll(URLS).catch(function() {
        // Si chapters.js ou icons manquent, on cache au moins le core
        return c.addAll(["./", "./index.html", "./manifest.json"]);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(function(ks) {
      return Promise.all(
        ks.filter(function(k) { return k !== CACHE; })
          .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request).then(function(res) {
        if (res.ok && e.request.method === "GET") {
          var clone = res.clone();
          caches.open(CACHE).then(function(c) { c.put(e.request, clone); });
        }
        return res;
      }).catch(function() {
        return caches.match("./index.html");
      });
    })
  );
});
