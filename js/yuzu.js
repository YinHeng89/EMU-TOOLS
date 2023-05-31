
// 显示当前版本号
// var currentVersion = "EA-3556";
// document.getElementById("version").value = currentVersion;
// var latestVersion = ""

// 检测最新版本
function checkVersion() {
  axios.get("https://api.github.com/repos/pineappleEA/pineapple-src/releases/latest")
    .then(function (response) {
      latestVersion = response.data.tag_name;
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
  const owner = 'pineappleEA';
  const repo = 'pineapple-src';

  // 发起 API 请求获取最新版本号
  const apiResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`);
  const latestRelease = await apiResponse.json();
  const latestVersion = latestRelease.tag_name;

  // 从 API 响应中获取下载链接
  const osEm = {
    Windows: `https://ghproxy.com/${latestRelease.assets.find(asset => asset.name.endsWith('.zip')).browser_download_url}`,
    Linux: `https://ghproxy.com/${latestRelease.assets.find(asset => asset.name.endsWith('.AppImage')).browser_download_url}`
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
        text:  `当前最新固件版本：${version}`,
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


