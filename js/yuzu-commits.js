//获取yuzu更新日志
function get_yuzu_commit_logs() {
	//使用fetch获取yuzu的提交记录
	fetch('https://api.github.com/repos/yuzu-emu/yuzu/commits')
	.then(function(response) {
		if (!response.ok) {
			//如果获取失败则抛出一个错误
			throw new Error('Network response was not ok');
		}
		//返回为json格式的response
		return response.json();
	})
	.then(function(commits) {
		//遍历每一条提交记录，并构造展示html
		let markdown = '<h1>Recent commits of yuzu-emu/yuzu</h1>';
		let last_date = '';
		commits.forEach(function(commit_info) {
			let commit_date = commit_info.commit.author.date.split('T')[0];
			if (last_date !== commit_date) {
				//如果是新的一天则添加日期标头
				markdown += `<h2>${commit_date}</h2>`;
				last_date = commit_date;
			}
			let lines = commit_info.commit.message.split('\n');
			if (lines.length > 1) {
				//若提交记录有详细内容则使用details标签展示，点击后显示详细内容
				let content = lines.slice(1).join('\n');
				markdown += `<details><summary>${lines[0]}</summary>`;
				markdown += `<p>${content}</p></details>`;
			} else {
				//不然则只展示一行简短的描述
				markdown += `<p>- ${lines[0]}</p>`;
			}
		});
		//将构造好的html添加到页面中，在id为commits的元素内
		document.querySelector('#commits').innerHTML = markdown;
	})
	.catch(function(error) {
		//如果出现错误则在控制台输出错误信息，并在页面上提示错误
		console.error('Error:', error);
		document.querySelector('#commits').innerHTML = '更新内容加载失败。';
	});
}

//调用获取yuzu更新日志函数
get_yuzu_commit_logs();