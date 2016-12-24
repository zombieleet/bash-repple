// import exec function in child process module
const exec = require('child_process').exec;
const vm = require('vm');

function execHistory(res,callback) {
    // if there is any error, catch it
    try {

		// since repple deals with dollar as an identifier
		//   if this match fail
		//   assume res is a javascript thing and no variable begins with a dollar sign
		//   jump to the else statement
		if ( /^\$/.test(res) ) {
			
			exec(res.replace(/^\$/,''), (err,data) => {
			
			if ( err ) throw err;
			
			callback(null, console.log(data))
			
			});
			return ;
			
		} else {

			// assuming 
			res = vm.runInThisContext(res);

			return callback(null, res);
			
		}
			
    } catch(ex) {
	// assuming the requested event is not added yet
		return callback(null, `requested event not found`)
    }


    
};


module.exports = {
    execHistory
}
