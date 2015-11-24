var fs = require("fs");
var iconv = require("iconv-lite");
var path = require("path");

exports.convert = function(oPath){
    var oPathObj = path.parse(oPath),
        odir = oPathObj.dir,
        basename = oPathObj.base;
        tdir = odir.replace("static","_static");


    var file = path.join(tdir,basename);
    fs.createReadStream(oPath).
    	pipe(iconv.decodeStream("gbk")).
    	pipe(iconv.encodeStream("utf8")).
    	pipe(fs.createWriteStream(file));
    console.log("done");

};


