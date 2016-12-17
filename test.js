var fs = require('fs');
var ch = 0;
var exec = require('child_process').exec
/*
exec('wc -l < .repplehist', (err,data) => {
	if ( err ) throw err
	console.log(data)
});
*/

fs.readFile('.repplehist', (err, data) => {
	if ( err ) throw err;
	console.log(data.toString())
        ch++
       console.log(ch)
})
