const api = 'https://api.github.com/repos/yuzu-emu/yuzu-mainline/releases';

axios.get(api)
  .then((response) => {
    const releases = response.data;

    releases.forEach((release) => {
      const tagName = release.name;
	  const releaseDate = new Date(release.published_at).toLocaleString('zh-CN', { timeZone: 'UTC' });
	  const releaseNotes = release.body
	  .replace(/(\s)([0-9a-fA-F]{40,})/g, '更新条目:')
	  .replace(/\n+/g, '<br>').replace(/(## Changes)/g, '【更新内容】')
	  .replace(/(This list of changes was \[auto generated\])/g, '【此列表由系统自动生成】- ')
	  .replace(/(https:\/\/dev\.azure\.com\/yuzu-emu\/yuzu\/_build\/results\?buildId=\d+&view=logs)/g, '<a href="$1" target="_blank">查看更新详情</a>')
	  .replace(/(See More)/g, '查看更多');
      // 添加到HTML页面中
      const el = document.createElement('div');
      el.innerHTML = `
        <strong>${tagName} 更新日期 ${releaseDate}</strong>
        <br>
        <div style="line-height: 30px;width: 700px;">${releaseNotes}</div>
        <br>
      `;
      document.querySelector('#commits').appendChild(el);
    });
  })
  .catch((error) => {
    console.log(error);
    document.querySelector('#commits').innerHTML = '更新内容加载失败。';
  });
