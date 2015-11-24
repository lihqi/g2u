/**
 * Created by woota on 2015/11/20.
 */
var fs = require("fs");
var path = require("path");

exports.mk = function(oPath){
    var oPathObj = path.parse(oPath),
        odir = oPathObj.dir,
        tdir = odir.replace("static","_static"),
        tdirArray = tdir.split("\\");

    makeDir(tdir);

    function makeDir(_path){
        fs.mkdir(_path,function(err){
            //如果该目录存在，则返回
            if(err && err.code.toUpperCase() === "EEXIST"){
                return false;
            }
            //如果上级目录不存在，先构建上级目录
            if(err && err.code.toUpperCase() === "ENOENT"){
                var new_path = _path.slice(0,_path.lastIndexOf("\\"));
                makeDir(new_path);
                setTimeout(function(){
                    makeDir(_path);
                },100);


            }

        });
    }



};


