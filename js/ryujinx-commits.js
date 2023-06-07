function loadRyujinxChangeLog() {
	return fetch('https://raw.githubusercontent.com/wiki/Ryujinx/Ryujinx/Changelog.md')
		   .then(res => res.text())
		   .then(data => {
			  const converter = new showdown.Converter()
			  const logHtml = converter.makeHtml(data)
			  return logHtml;
		   })
		   .catch(err => {
			  console.error(err);
			  return '<p>加载失败。</p>';
		   });
  }
  
  var logContainer = document.getElementById('log-container');
  loadRyujinxChangeLog().then(log => {
	logContainer.innerHTML = log; // 将日志内容插入 div 元素
  });
  