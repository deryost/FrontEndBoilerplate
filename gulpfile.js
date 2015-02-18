var fs = require('fs');
var tasks = fs.readdirSync('./gulp/tasks/');
tasks.forEach(function(task) {
	require('./gulp/tasks/' + task); // includes all files in the gulp/task folder
});