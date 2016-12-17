// import the exeHistory function in exechistory module
//    this module executes a pass command when requested
const execHistory = require('./exechistory').execHistory

//import histArray
let histArray = require('./history').histArray


function substHistory(cmd,callback) {
    let res;

    //console.log(/^\$(\^.*)(\^.*)/.test(cmd))
    // test to see if the command typed is a bash history subtitution command
    //  command should be in this format $^tosubstitute^substitute
    if ( /^\$(\^.*)(\^.*)/.test(cmd) ) {

	//console.log('hi')
	// the brackets saves the match 
	let subst = cmd.match(/^\$(\^.*)(\^.*)/)

	// create a regexp from new RegExp.
	//    subst[1] is the history command to be subtituted
	let match = new RegExp(subst[1].replace('^',''), 'g');

	// the replacement for subst[1]
	let matchAgainst = subst[2].replace('^','');
	
	// get the last element in the array and replace match with matchAgainst
	res = (histArray[histArray.length - 1]).replace(match,matchAgainst);

	// push the command into the array
	histArray.push(res)


	// execute the command
	execHistory(res,callback);
	

	return true;

    } else if ( /^\$!!\s+(\^.*)(\^.*)/.test(cmd) ) {

	// save the regular expressions in brackets
	let subst = cmd.match(/^\$!!\s+(\^.*)(\^.*)/);


	// replace ^ in subst[1]
	let match = new RegExp(subst[1].replace('^',''), 'g');

	// replace ^ in subst[2]
	let matchAgainst = subst[2].replace('^','');

	// go up to the array by 1
	cmd = histArray[histArray.length - 1]

	// replace $ in the command , replace match with matchAgainst in the result
	res = cmd.replace('$','').replace(match, matchAgainst);

	// push the command to the end of the array
	histArray.push(cmd.replace(match,matchAgainst));

	// execute the command
	execHistory(res,callback);
	
	return true;
	
    } else if ( /^\$!(-[0-9]+)\s+(\^.*)(\^.*)/.test(cmd) ) {

	
	// save the regular expressions in brackets
	let subst = cmd.match(/^\$!(-[0-9]+)\s+(\^.*)(\^.*)/)
	
	// since the number to go up by is always -somenumber
	//   replace the - sign
	//   and convert it to a number
	let goUpBy = parseInt(String(subst[1]).replace('-',''));

	// replace ^ in subst[2]
	let match = new RegExp(subst[2].replace('^',''), 'g');
	
	// replace ^ in subst[3]
	let matchAgainst = subst[3].replace('^','')

	// get the histArray length and substract it from goUpBy
	cmd = histArray[histArray.length - goUpBy]

	// replace $ in the command , replace match with matchAgainst in the result
	res = cmd.replace('$','').replace(match,matchAgainst);

	
	// push the command to the end of the array
	histArray.push(cmd.replace(match,matchAgainst));

	// execute the command
	execHistory(res,callback)
	
	return true;
    }
    
};


module.exports = {
    substHistory
}
