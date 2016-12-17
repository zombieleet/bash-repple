
const execHistory = require('./exechistory').execHistory
let histArray = [];

function checkHistory(cmd,callback) {

    let res;
    
    
    if ( /^(\$!!)(\s-*[a-zA-Z\_]{1,})*/.test(cmd) ) {

	// save the regular expression in brackets
	//   first regexp contains !!
	//   second regexp contains 0 or more of -
	
	cmd = cmd.match(/^(\$!!)(\s-*[a-zA-Z\_]{1,})*/);

	// save the second regexp
	cmd = cmd[2]

	
	// append the second match in the history 
	res = `${histArray[histArray.length - 1]} ${cmd}`

	histArray.push(res)

	execHistory(res,callback)
	
	return true;
	
    } else if ( /^\$!(-[0-9]+)(\s-*[a-zA-Z\_]{1,})*/.test(cmd) ) {


	
	//fs.appendFileSync('.repplehist', cmd);

	cmd = cmd.match(/^\$!(-[0-9]+)(\s-*[a-zA-Z\_]{1,})*/)
	
	let num = parseInt(cmd[1]);

	let secondOption = cmd[2];
	

	num = String(num).replace("-", "");

	

	res = `${histArray[histArray.length - num]} ${secondOption}`;

	histArray.push(res)
	
	execHistory(res,callback)
	
	return true
    }
			
}   
	

module.exports = {
    checkHistory,
    histArray
}	       	 	 
