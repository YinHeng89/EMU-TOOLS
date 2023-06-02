//注册SW
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
            .then(function (registration) {
                // 注册成功
                console.log('ServiceWorker registration successful with scope: ', registration.scope)
            })
            .catch(function (err) {
                // 注册失败:(
                console.log('ServiceWorker registration failed: ', err)
            })
    })
}

//获取访问数据
$(document).ready(function () {
    // 发送 AJAX GET 请求获取 PHP 文件返回的数据
    $.get("http://count.lovestoblog.com/count.php", function (data) {
        // 将返回的数据插入到 HTML 中
        $("#data-container").html(data);
    });
});