<!DOCTYPE html>
<html>

<head>
    <title>EMU-Tools 模拟器在线更新工具</title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="keyword" content="switch模拟器,steam deck模拟器,模拟器,Yuzu,ryujinx,固件下载" />
    <link rel="stylesheet" href="./css/reset.css?v=1">
    <link rel="stylesheet" href="./css/main.css?v=1">
    <!-- <link rel="stylesheet" href="/css/style.css"> -->
    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?1b543a5332cd02150245c48f823a0c55";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
</head>

<body>
    <form>
        <div class="menu">
            <div class="menu-title">
                <img src="./images/logo.png" height="30px" width="30px">
                <span>EMU-Tools</span>
            </div>
            <ul class="menu-list">
                <li><a class="second" href="./index.php" target="_parent">Yuzu模拟器</a></li>
                <li><a class="second" href="#" target="_parent">ryujinx模拟器</a></li>
                <li><a class="second" href="#" target="_parent">固件下载</a></li>
                <li><a href="./tools.php" target="_parent">其他工具</a></li>
                <li><a class="second" href="#" target="_parent">工具简介</a></li>
            </ul>
        </div>
        <div class="main">
            <h1><a style="color: #333;" href="https://emu-tools.com/tools/zelda-totk/" target="_blank">王国之泪存档修改器</a></h1>
        </div>
    </form>
    <p class="second">当前工具版本 v1.0.3 <a href="./update.php" target="_blank">查看更新记录</a>
        <?php
        echo " 今日访问次数 " . $today_visits . "，本站累计访问次数 " . $total_ips . " 次";
        ?>
    </p>
    <script src="./js/main.js"></script>
    <script src="./js/script.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</body>

</html>