fetch('https://api.github.com/repos/THZoria/NX_Firmware/releases')
  .then(response => response.json())
  .then(data => {
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
        const link = `https://ghproxy.com/https://github.com/THZoria/NX_Firmware/releases/download/${version}/Firmware.${version}.zip`;
        window.open(link);
      }
    });
    const firstVersion = versions[0];
    versionSelect.value = firstVersion;
  });
