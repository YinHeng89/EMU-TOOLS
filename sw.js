self.addEventListener('fetch', function (e) {

    console.log('现在正在请求：' + e.request.url);
    const cacheName = 'EMU-Tools-v1.0.3.3';
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
          return cache.addAll([
            '/',
            '/index.html',
            '/styles.css',
            '/app.js',
            '/images/icon.png'
          ]);
});