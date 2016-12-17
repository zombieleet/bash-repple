
let histArray = [];

function checkHistory(cmd,callback) {

    let res;
    
    
    if ( /^\$!!/.test(cmd) ) {

	
	cmd = cmd.replace("\$","");

	
	//fs.appendFileSync('.repplehist', cmd);
	
	

	
	res = histArray[histArray.length - 1]

	histArray.push(res)
	
	callback(null, res)
	
	return true;
	
    } else if ( /^\$!(-[0-9]+)/.test(cmd) ) {


	
	//fs.appendFileSync('.repplehist', cmd);

	
	cmd = parseInt(cmd.match(/^\$!(-[0-9]+|[0-9]+)/)[1]);


	cmd = String(cmd).replace("-", "");

	

	res = histArray[histArray.length - cmd];

	histArray.push(res)
	
	callback(null, res)
	
	return true
    }
			
}   
	

module.exports = {
    checkHistory,
    histArray
}	       	 	 
