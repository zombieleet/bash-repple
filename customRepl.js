#!/usr/bin/env node

const fs = require('fs');
const repl = require('repl');
const vm = require('vm');
const exec = require('child_process').exec
const checkHistory = require('./history').checkHistory
const substHistory = require('./substHistory').substHistory


let histArray = require('./history').histArray;
// use eval

var customRepl = repl.start({
    prompt: 'my repl> ',
    replMode: repl.REPL_MODE_STRICT,
    ignoreUndefined: true,
    eval: meval
});



Number.isNegative = (num) => {
    if ( ! num ) throw Error('Number was not specified');

    if ( typeof num !== 'number' ) throw Error(`${num} is not a number`)
    

    let _n = String(num);

    if ( /^-/.test(_n) )
	return true;

    return false;
    
};

function meval(cmd,context,filename,callback) {
    
    let result
    global.require = require




    let fileExistence = fs.existsSync('.repplehist');

    if ( !fileExistence ) {
	fs.writeFileSync('.repplehist', '');
    }
    
    //fs.appendFileSync('.repplehist', cmd);
    
    
    if ( /^\$/.test(cmd) ) {


	if ( checkHistory(cmd,callback) ) return 


	if ( substHistory(cmd,callback) ) return 


	histArray.push(cmd.replace("\n",""))
	//fs.appendFileSync('.repplehist', cmd);

	
	cmd = cmd.replace("\$", "");
	
	exec(cmd, (err, data) => {
	    if ( err ) throw err;
	    return callback(null,console.log(data))
	});
	
	return ;
    } else {
	
	//fs.appendFileSync('.repplehist', cmd);
	histArray.push(cmd.replace("\n",""))
	result = vm.runInThisContext(cmd);
	return callback(null, result);
    }

}




