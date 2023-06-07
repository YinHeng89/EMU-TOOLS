
//获取yuzu更新日志
function get_yuzu_commit_logs() {
	fetch('https://api.github.com/repos/yuzu-emu/yuzu/commits')
	.then(function(response) {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	})
	.then(function(commits) {
		let markdown = '<h1>Recent commits of yuzu-emu/yuzu</h1>';
		let last_date = '';
		commits.forEach(function(commit_info) {
			let commit_date = commit_info.commit.author.date.split('T')[0];
			if (last_date !== commit_date) {
				markdown += `<h2>${commit_date}</h2>`;
				last_date = commit_date;
			}
			let lines = commit_info.commit.message.split('\n');
			if (lines.length > 1) {
				let content = lines.slice(1).join('\n');
				markdown += `<details><summary>${lines[0]}</summary>`;
				markdown += `<p>${content}</p></details>`;
			} else {
				markdown += `<p>- ${lines[0]}</p>`;
			}
		});
		document.querySelector('#commits').innerHTML = markdown;
	})
	.catch(function(error) {
		console.error('Error:', error);
	});
}

get_yuzu_commit_logs();

