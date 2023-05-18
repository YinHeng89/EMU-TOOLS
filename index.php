<?php
//PHP代码
?>
<!DOCTYPE html>
<html>

<head>
    <title>EMU-Tools Switch模拟器版本在线检测工具</title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="keyword" content="switch模拟器,steam deck模拟器,模拟器,Yuzu,ryujinx,固件下载" />
    <link rel="stylesheet" href="./css/reset.css">
    <link rel="stylesheet" href="./css/main.css">
    <!-- <link rel="stylesheet" href="/css/style.css"> -->
    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?d27c614c832ad02820e351ab160f1ad8";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
</head>

<body>
    <form>
        <div>
            <div class="menu">
                <div class="menu-title">
                    <img src="./images/logo.png" height="30px" width="30px">
                    <span>EMU-Tools</span>
                </div>
                <ul class="menu-list">
                    <li><a href="./index.php" target="_parent">Yuzu模拟器</a></li>
                    <li class="second"><a href="#" target="_parent">ryujinx模拟器</a></li>
                    <li class="second"><a href="#" target="_parent">固件下载</a></li>
                    <li class="second"><a href="#" target="_parent">其他工具</a></li>
                    <li class="second"><a href="#" target="_parent">工具简介</a></li>
                </ul>
            </div>
            <div class="main">
                <h1>Yuzu-EA 模拟器版本检测</h1>
                <p>请点击下方按钮“检测更新”按钮检测最新版本。</p>
                <form>
                    <!-- <label for="version">输入当前版本号，留空则自动检测最新版本：</label> -->
                    <div>
                        <!-- <input type="text" id="version" name="version"> -->
                        <label id="version">当前最新版本号为： <span id="latestVersion">-----</span></label>
                        <input type="button" value="检测更新" onclick="checkVersion()">
                    </div>
                    <div>
                        <input type="button" value="下载最新版(Windows)" onclick="downloadLatest('Windows')" class="downloadBtn" disabled="disabled">
                        <input type="button" value="下载最新版(Linux)" onclick="downloadLatest('Linux')" class="downloadBtn" disabled="disabled">
                        <input type="button" value="检查并下载最新固件" onclick="downloadfirmware()">
                    </div>
                </form>
                <p style="color: rgb(190, 190, 190);">本工具只用于检测yuzu模拟器最新版本,所有软件包来源于Github</p>
            </div>
        </div>
    </form>
    <p class="second">当前工具版本 v1.0.3 <a href="./update.php" target="_blank">查看更新记录</a>
        <?php // 记录访问 IP 地址的数量并显示当前访问 IP 地址
        $user_ip = $_SERVER["REMOTE_ADDR"];
        echo "当前访问IP地址是：" . $user_ip . "<br>";

        // 连接到 MySQL 数据库
        $conn = mysqli_connect("sql304.epizy.com", "epiz_34231135", "j9ajpUMsY3k", "epiz_34231135_mywebsite");

        // 检查并记录用户 IP 地址是否已经存在于数据库中
        $result = mysqli_query($conn, "SELECT * FROM visitor_ips WHERE ip_address='$user_ip'");
        $num_rows = mysqli_num_rows($result);

        if ($num_rows == 0) {
            // 如果用户 IP 地址不存在于数据库中，则添加一条新的记录
            mysqli_query($conn, "INSERT INTO visitor_ips (`ip_address`, `visit_count`) VALUES ('$user_ip', 1)");
        } else {
            // 如果用户 IP 地址已经存在于数据库中，则更新其访问次数
            $row = mysqli_fetch_assoc($result);
            $visit_count = $row["visit_count"] + 1;
            mysqli_query($conn, "UPDATE visitor_ips SET visit_count=$visit_count WHERE ip_address='$user_ip'");
        }

        // 统计访问 IP 数量并输出结果
        $count_result = mysqli_query($conn, "SELECT COUNT(DISTINCT ip_address) AS total_ips FROM visitor_ips");
        $count_row = mysqli_fetch_assoc($count_result);
        $total_ips = $count_row["total_ips"];
        echo "本站累计访问次数 " . $total_ips . " 次";
        ?>
    </p>
    <script src="./js/main.js"></script>
    <script src="./js/script.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</body>

</html>
<?php
// 写完 PHP 代码
?>