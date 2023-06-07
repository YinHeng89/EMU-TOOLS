self.addEventListener('fetch', function (e) {

    console.log('现在正在请求：' + e.request.url);
    const cacheName = 'EMU-Tools-v1.0.3.4';
});