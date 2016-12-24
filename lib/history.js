
const fs = require('fs');
const readline = require('readline');
const execHistory = require('./exechistory').execHistory

const histFile = (
		fs.openSync(`${process.env.HOME}/.node_repl_history`, 'a+')
	) ? `${process.env.HOME}/.node_repl_history` 
	  : fs.writeFileSync(`${process.env.HOME}/.node_repl_history`, "")


let histArray = [];

function configureHistory() {


	let rdl = readline.createInterface({
		input: fs.createReadStream(histFile)
	})

	rdl.on('line', ( line ) => {

		// since bash-repple history expansion/substitution works from the bottom of the array
		// unshift is use to place every new line untop of the previous one
		histArray.unshift(line)

	}).on('close', () => {

		rdl.close()

	});

}

function saveHistory(command, histFile) {
	histArray.push(command);

	//rename histFile to histFile.bak
	// but the value of histFile still remains the same
	fs.rename(histFile, `${histFile}.bak`, () => {
		let rdstream;
		// since the value of histFile remains the same, but the file no longer exists
		// append the command inside the file 
		fs.writeFileSync(histFile, command + "\n");

		rdstream = fs.createReadStream(`${histFile}.bak`);

		rdstream.on('data', (data) => {
			// place all the data at the bottom of command;
			fs.appendFileSync(histFile, data);
		})

		// remove ${histFile}.bak
		rdstream.on('end', () => {
			fs.unlinkSync(`${histFile}.bak`)
		})
	})

}

function checkHistory(cmd,callback) {

    let res;
    
    
    if ( /^(\$!!)(\s-*[a-zA-Z\_]{1,})*/.test(cmd) ) {

		// save the regular expression in brackets
		//   first regexp contains !!
		//   second regexp contains 0 or more of -
		
		cmd = cmd.match(/^(\$!!)(\s-*[a-zA-Z\_]{1,})*/);
		
		// save the second regexp
		cmd = cmd[2]

		if ( cmd ) {
			// append the second match in the history 
			res = `${histArray[histArray.length - 1]} ${cmd}`
		} else {
			res = histArray[histArray.length - 1]
		}

		saveHistory(res, histFile)
		execHistory(res,callback)

		
		return true;
	
    } else if ( /^\$!(-[0-9]+)(\s-*[a-zA-Z\_]{1,})*/.test(cmd) ) {

		cmd = cmd.match(/^\$!(-[0-9]+)(\s-*[a-zA-Z\_]{1,})*/)
		let num = parseInt(cmd[1]);
		let secondOption = cmd[2];
		num = String(num).replace("-", "");

		if ( secondOption ) {

		    res = `${histArray[histArray.length - num]} ${secondOption}`;
	    
		} else {
			res = histArray[histArray.length - num]
		}
			saveHistory(res, histFile)
			execHistory(res,callback)
			
			return true
		}
			
}   
	

module.exports = {
    checkHistory,
    histArray,
	saveHistory,
	configureHistory,
	histFile
}	       	 	 
