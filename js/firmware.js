axios.get('https://api.github.com/repos/THZoria/NX_Firmware/releases')
  .then(response => {
    const data = response.data;
    const versions = data.map(release => release.tag_name);

    const versionSelect = document.getElementById('versions');
    versions.forEach(version => {
      const option = document.createElement('option');
      option.value = version;
      option.textContent = version;
      versionSelect.appendChild(option);
    });

    const downloadButton = document.getElementById('downloadButton');
    downloadButton.addEventListener('click', () => {
      const version = versionSelect.value;
      if (version) {
        const release = data.find(release => release.tag_name === version);
        const asset = release.assets[0];
        const proxyUrl = 'https://ghproxy.com/';
        const link = proxyUrl + asset.browser_download_url;
        window.open(link);
      }
    });
    const firstVersion = versions[0];
    versionSelect.value = firstVersion;
  })
  .catch(error => {
    console.log(error);
  });
