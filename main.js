var finder = require("./finder");
var filedir = process.argv[2];
var op = process.argv[3];

finder.find(/\.js$/,filedir,op,function(err,results){
	console.log(results.length);
});

console.log("starts");