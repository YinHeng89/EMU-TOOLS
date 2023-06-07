// 定义一个函数，用于从 GitHub 加载 Ryujinx 的更新日志 
function loadRyujinxChangeLog() {
	// 使用 fetch 方法获取日志文件的原始文本数据
	return fetch('https://raw.githubusercontent.com/wiki/Ryujinx/Ryujinx/Changelog.md')
		   .then(res => res.text()) // 将获取到的结果解析成文本格式
		   .then(data => {
			  // 使用 Showdown 库将 Markdown 格式的文本转换成 HTML 格式
			  const converter = new showdown.Converter()
			  const logHtml = converter.makeHtml(data)
			  // 将转换后的 HTML 文本返回到函数外部，并作为 Promise 的 resolve 值
			  return logHtml;
		   })
		   .catch(err => {
			  // 如果加载过程中出现错误，则打印错误信息，并返回一段错误提示的 HTML 代码
			  console.error(err);
			  return '<p>更新内容加载失败。</p>';
		   });
  }
  
  // 获取用于显示更新日志的页面元素
  var logContainer = document.getElementById('log-container');
  // 调用 loadRyujinxChangeLog 函数，将获取到的日志内容插入页面元素中
  loadRyujinxChangeLog().then(log => {
	logContainer.innerHTML = log; // 将日志内容插入 div 元素
  });
