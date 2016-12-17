
const execHistory = require('./exechistory').execHistory
let histArray = [];

function checkHistory(cmd,callback) {

    let res;
    
    
    if ( /^\$!!/.test(cmd) ) {

	cmd = cmd.replace("\$","");

	
	//fs.appendFileSync('.repplehist', cmd);
	
	

	
	res = histArray[histArray.length - 1]

	histArray.push(res)
	
	execHistory(res,callback)

	
	return true;
	
    } else if ( /^\$!(-[0-9]+)/.test(cmd) ) {


	
	//fs.appendFileSync('.repplehist', cmd);

	
	cmd = parseInt(cmd.match(/^\$!(-[0-9]+)/)[1]);


	cmd = String(cmd).replace("-", "");

	

	res = histArray[histArray.length - cmd];

	histArray.push(res)
	
	execHistory(res,callback)
	
	return true
    }
			
}   
	

module.exports = {
    checkHistory,
    histArray
}	       	 	 
