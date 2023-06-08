// 定义一个函数，用于从 GitHub 加载 Ryujinx 的更新日志 
function loadRyujinxChangeLog() {
	// 使用 fetch 方法获取日志文件的原始文本数据
	return fetch('https://ghproxy.com/https://raw.githubusercontent.com/wiki/Ryujinx/Ryujinx/Changelog.md')
		.then(res => res.text()) // 将获取到的结果解析成文本格式
		.then(data => {
			// 使用 Showdown 库将 Markdown 格式的文本转换成 HTML 格式
			const converter = new showdown.Converter()
			// 将转换后的 HTML 文本进行修改，为其中的 a 标签添加 target="_blank" 属性
			const logHtml = converter.makeHtml(data)
			.replace(/(<a href="[^"]*")>/g, '$1 target="_blank">')
			.replace(/(Ryujinx Changelog)/g, 'Ryujinx 主线版本更新日志')
			.replace(/(Fixed:)/g, '修复内容：')
			.replace(/(For 1\.0\.x releases, see \<a href=\"https:\/\/github\.com\/Ryujinx\/Ryujinx\/wiki\/Older-Changelog\" target=\"_blank\"\>here<\/a>\.)/g, '对于 1.0.x 版本，请参见<a href=\"https:\/\/github\.com\/Ryujinx\/Ryujinx\/wiki\/Older-Changelog\" target=\"_blank\"\>此处<\/a>。：')
			.replace(/(All updates to the Ryujinx official master build will be documented in this file.)/g, 'Ryujinx 官方主版本的所有更新都将记录在此文件中。');
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
