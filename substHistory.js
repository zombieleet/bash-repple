let histArray = require('./history').histArray
function substHistory(cmd,callback) {
    let res;

    //console.log(/^\$(\^.*)(\^.*)/.test(cmd))

    if ( /^\$(\^.*)(\^.*)/.test(cmd) ) {

	//console.log('hi')
	let subst = cmd.match(/^\$(\^.*)(\^.*)/)

	let match = new RegExp(subst[1].replace('^',''), 'g');

	let matchAgainst = subst[2].replace('^','');

	res = (histArray[histArray.length - 1]).replace(match,matchAgainst);

	histArray.push(res)

	console.log(histArray);

	callback(null, res);

	return true;

    }

};


module.exports = {
    substHistory
}
