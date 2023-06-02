<?php
header("Access-Control-Allow-Origin: https//emu-tools.com");
date_default_timezone_set('Asia/Shanghai');

// 记录访问 IP 地址的数量并显示当前访问 IP 地址
$user_ip = $_SERVER["REMOTE_ADDR"];

// 连接到 MySQL 数据库
$conn = mysqli_connect("sql207.epizy.com", "epiz_34337531", "Cd3hexOBe0osvu", "epiz_34337531_statistics");
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

// 获取今天的日期
$today = date('Y-m-d');

// 查询今日访问次数
$sql = "SELECT COUNT(*) as count FROM visitor_ips WHERE DATE(date) = '$today'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $today_visits = $row['count'];
}

// 从数据库获取当前的访问量
$result = mysqli_query($conn, "SELECT count FROM visit_counter WHERE id=1");
$row = mysqli_fetch_assoc($result);
$count = $row['count'];

// 如果数据库没有访问量记录，则初始化为0
if (!$count) {
    mysqli_query($conn, "INSERT INTO visit_counter (id, count) VALUES (1, 0)");
}

// 增加访问量并更新到数据库中
$count++;
mysqli_query($conn, "UPDATE visit_counter SET count=" . $count . " WHERE id=1");

// 查询当前 IP 地址的记录
$result = mysqli_query($conn, "SELECT * FROM visitor_ips WHERE ip_address='$user_ip'");
$num_rows = mysqli_num_rows($result);

function generateUuid()
{
    $data = random_bytes(16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

if ($num_rows == 0) {
    // 如果用户 IP 地址不存在于数据库中，则添加一条新的记录
    $now_id = generateUuid();
    mysqli_query($conn, "INSERT INTO visitor_ips (`id`, `date`, `ip_address`, `visit_count`) VALUES ('$now_id','$today','$user_ip', 1)");
} else {
    // 如果用户 IP 地址已经存在于数据库中，则更新其访问次数
    $row = mysqli_fetch_assoc($result);
    $visit_count = $row["visit_count"] + 1;
    $id = $row["id"];
    mysqli_data_seek($result, 0);
    mysqli_query($conn, "UPDATE visitor_ips SET visit_count='$visit_count', `date`='$today' WHERE id='$id'");
}


// 统计访问 IP 数量并输出结果
$count_result = mysqli_query($conn, "SELECT COUNT(DISTINCT ip_address) AS total_ips FROM visitor_ips");
$count_row = mysqli_fetch_assoc($count_result);
$total_ips = $count_row["total_ips"];

// 关闭数据库连接
$conn->close();

?>

<p>
<!-- 当前工具版本 v1.0.3 <a href="/update.html" target="_blank">查看更新记录</a> -->
    <?php
    echo " 今日访问次数 " . $today_visits . "，本站累计访问次数 " . $total_ips . " 次";
    ?>
</p>