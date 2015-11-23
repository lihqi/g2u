var fs = require("fs");
var jschardet = require("jschardet");
var mkdir = require("./mkdir");
var transform = require("./transform");
var path = require("path");

exports.find = function(regExp,startPath,op,cb){
	var results = [],
		asyncOps = 0,
		errored = false;

	function error(err){
		if(!errored){
			return cb(err);
		}
	}

	function finder(_path){
		asyncOps++;
		fs.readdir(_path,function(err,files){
			if(err){
				return error(err);
			}

			files.forEach(function(file){
				var fpath = path.join(_path,file);

				asyncOps++;
				fs.stat(fpath,function(err,stats){
					if(err){
						return error(err);
					}

					if(stats.isDirectory()){
						finder(fpath);
					}

					if(stats.isFile() && regExp.test(file)){
						var str = fs.readFileSync(fpath);
						var encoding = jschardet.detect(str).encoding && jschardet.detect(str).encoding.toUpperCase()
						if(encoding == "GB2312"){
							console.log(encoding + " : " + fpath);
							results.push(fpath);

							if(op === "mkdir"){
								mkdir.mk(fpath);
							} else if(op === "convert"){
								transform.convert(fpath);
							}
						}

					}

					asyncOps--;
					if(asyncOps === 0){
						cb(null,results);
						console.log("inner");
					}
				});
			});

			asyncOps--;
			if(asyncOps === 0){
				cb(null,results);
				console.log("outter");
			}
		});
	}

	finder(startPath);
};