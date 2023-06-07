
// 显示当前版本号
// var currentVersion = "EA-3556";
// document.getElementById("version").value = currentVersion;
// var latestVersion = ""

// 检测最新版本(主线版)
function checkVersion() {
  axios.get("https://api.github.com/repos/yuzu-emu/yuzu-mainline/releases/latest")
    .then(function (response) {
      latestVersion = response.data.name;
      let downBtnEls = document.getElementsByClassName("downloadBtn");
      document.getElementById("latestVersion").innerText = latestVersion
      for (let i = 0; i < downBtnEls.length; i++) {
        downBtnEls[i].removeAttribute("disabled");
      }

      // 使用 SweetAlert2 弹出最新版本号提示
      Swal.fire({
        text: '当前最新版本号为：' + latestVersion,
        icon: 'success',
        confirmButtonText: '确认'
      });

    })
    .catch(function (error) {
      // 使用 SweetAlert2 弹出错误提示
      Swal.fire({
        title: '错误',
        text: '检测最新版本失败，请稍后重试！' + error,
        icon: 'error',
        confirmButtonText: '确认'
      });
    });
}

// 下载最新版本
async function downloadLatest(os) {
  const owner = 'yuzu-emu';
  const repo = 'yuzu-mainline';

  // 发起 API 请求获取最新版本号
  const apiResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`);
  const latestRelease = await apiResponse.json();
  const latestVersion = latestRelease.tag_name;

  // 从 API 响应中获取下载链接
  const osEm = {
    Windows: latestRelease.assets.find(asset => asset.name.endsWith('.zip')).browser_download_url.replace('-debugsymbols', ''),
    Linux: latestRelease.assets.find(asset => asset.name.endsWith('.AppImage')).browser_download_url,
    Android: 'https://play.google.com/store/apps/details?id=org.yuzu.yuzu_emu'
  };


  // 打开新窗口下载文件
  window.open(osEm[os]);
}



// 显示当前版本号
// var currentVersion = "EA-3556";
// document.getElementById("version").value = currentVersion;
// var latestVersion = ""

// 检测最新版本（EA版）
function checkVersionEA() {
  axios.get("https://api.github.com/repos/pineappleEA/pineapple-src/releases/latest")
    .then(function (response) {
      latestVersion = response.data.tag_name;
      let downBtnEls = document.getElementsByClassName("downloadBtn");
      document.getElementById("latestVersionEA").innerText = latestVersion
      for (let i = 0; i < downBtnEls.length; i++) {
        downBtnEls[i].removeAttribute("disabled");
      }

      // 使用 SweetAlert2 弹出最新版本号提示
      Swal.fire({
        text: '当前最新版本号为：' + latestVersion,
        icon: 'success',
        confirmButtonText: '确认'
      });

    })
    .catch(function (error) {
      // 使用 SweetAlert2 弹出错误提示
      Swal.fire({
        title: '错误',
        text: '检测最新版本失败，请稍后重试！' + error,
        icon: 'error',
        confirmButtonText: '确认'
      });
    });
}

// 下载最新版本
async function downloadLatestEA(os) {
  const owner = 'pineappleEA';
  const repo = 'pineapple-src';

  // 发起 API 请求获取最新版本号
  const apiResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`);
  const latestRelease = await apiResponse.json();
  const latestVersion = latestRelease.tag_name;

  // 从 API 响应中获取下载链接
  const osEm = {
    Windows: `https://ghproxy.com/${latestRelease.assets.find(asset => asset.name.endsWith('.zip')).browser_download_url}`,
    Linux: `https://ghproxy.com/${latestRelease.assets.find(asset => asset.name.endsWith('.AppImage')).browser_download_url}`,
    Android: `https://play.google.com/store/apps/details?id=org.yuzu.yuzu_emu.ea`
  };

  // 打开新窗口下载文件
  window.open(osEm[os]);
}

// 下载最新固件
function downloadfirmware() {
  axios.get("https://api.github.com/repos/THZoria/NX_Firmware/releases/latest")
    .then(response => {
      const asset = response.data.assets[0];
      const version = response.data.tag_name;
      const downloadUrl = `https://ghproxy.com/${asset.browser_download_url}`;

      Swal.fire({
        icon: 'success',
        text: `当前最新固件版本：${version}`,
        showCancelButton: true,
        confirmButtonColor: "#0ea5e9",
        cancelButtonColor: "#bebebe",
        cancelButtonText: "取消",
        confirmButtonText: "下载",
        reverseButtons: true // 颠倒两个按钮的顺序
      }).then(result => {
        if (result.isConfirmed) {
          window.open(downloadUrl);
        }
      });
    })
    .catch(error => {
      console.error(error);
    });
}


function toggleTab(tabName) {
  var i;
  var tabContent = document.getElementsByClassName("version-content");
  var tabBtns = document.getElementsByClassName("tab-btn");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  for (i = 0; i < tabBtns.length; i++) {
    tabBtns[i].className = tabBtns[i].className.replace("active", "");
  }
  document.getElementById(tabName + "-content").style.display = "block";
  event.currentTarget.className += " active";
  // 禁用最新版本下载按钮
  let downBtnEls = document.getElementsByClassName("downloadBtn");
  for (let i = 0; i < downBtnEls.length; i++) {
    downBtnEls[i].setAttribute("disabled", "disabled");
  }
}

// //获取访问数据（因为跨域和SSL问题，暂不能实现）
// $(document).ready(function () {
//     // 发送 AJAX GET 请求获取 PHP 文件返回的数据
//     $.get("http://count.ccccocccc.cc/count.php", function (data) {
//         // 将返回的数据插入到 HTML 中
//         $("#data-container").html(data);
//     });
// });