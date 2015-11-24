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
            //�����Ŀ¼���ڣ��򷵻�
            if(err && err.code.toUpperCase() === "EEXIST"){
                return false;
            }
            //����ϼ�Ŀ¼�����ڣ��ȹ����ϼ�Ŀ¼
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


