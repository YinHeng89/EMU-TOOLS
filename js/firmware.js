      // 使用 axios 发送请求获取数据
      axios.get('https://api.github.com/repos/THZoria/NX_Firmware/releases')
        .then(response => {
          const data = response.data;
          const versions = data.map(release => release.tag_name);

          const versionDropdownMenu = document.getElementById('versionsDropdownMenu');
          versions.forEach(version => {
            const optionLink = document.createElement('a');
            optionLink.className = 'dropdown-item';
            optionLink.href = '#';
            optionLink.textContent = '固件版本 ' + version;
            optionLink.onclick = () => {
              document.getElementById('versionsDropdown').textContent = '固件版本 ' + version;
              return false;
            };
            versionDropdownMenu.appendChild(optionLink);
          });

          const downloadButton = document.getElementById('downloadButton');
          downloadButton.addEventListener('click', () => {
            const version = document.getElementById('versionsDropdown').textContent.replace(/^固件版本\s/, ''); // 去掉前缀 '固件版本 '
            if (version) {
              const release = data.find(release => release.tag_name === version);
              const asset = release.assets[0];
              const proxyUrl = 'https://gh-proxy.com/';
              const link = proxyUrl + asset.browser_download_url;
              window.open(link);
            }
          });

          const firstVersion = versions[0];
          document.getElementById('versionsDropdown').textContent = '固件版本 ' + firstVersion;
        })
        .catch(error => {
          console.log(error);
        });
