var _hmt = _hmt || [];
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?d27c614c832ad02820e351ab160f1ad8";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

// 显示当前版本号
var currentVersion = "EA-3556";
document.getElementById("version").value = currentVersion;
var latestVersion = ""

// 检测最新版本
function checkVersion() {
  let currentVersion = document.getElementById("version").value;
  axios.get("https://api.github.com/repos/pineappleEA/pineapple-src/releases/latest")
    .then(function (response) {
      latestVersion = response.data.tag_name;
      let downBtnEls = document.getElementsByClassName("downloadBtn");
      if (latestVersion !== currentVersion) {
        alert("当前版本不是最新版本，请下载最新版！最新版本号为：" + latestVersion);
        for (let i = 0; i < downBtnEls.length; i++) {
          downBtnEls[i].removeAttribute("disabled");
        }
      } else {
        for (let i = 0; i < downBtnEls.length; i++) {
          downBtnEls[i].setAttribute("disabled", "disabled");
        }
        alert("当前已是最新版本！");
      }
    })
    .catch(function (error) {
      alert("检测最新版本失败，请稍后重试！" + error);
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
  // 发送 GET 请求以获取仓库信息和资产信息
  axios.get("https://api.github.com/repos/THZoria/NX_Firmware/releases/latest")
    .then(response => {
      // 获取最新版本中的第一个资产（即软件包文件）
      const asset = response.data.assets[0];
      // 获取最新版本字符串
      const version = response.data.tag_name;
      // 获取经过代理处理后的下载地址
      const downloadUrl = `https://ghproxy.com/${asset.browser_download_url}`;
      // 弹出对话框提示，显示最新版本信息，让用户确认下载
      if (confirm(`当前最新固件为 ${version}，是否下载？`)) {
        window.open(downloadUrl); // 下载最新固件
      }
    })
    .catch(error => {
      console.error(error);
    });
}

