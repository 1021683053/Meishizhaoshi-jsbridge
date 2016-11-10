var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var sources = [
    'src/intro.js',
    'src/client.js',
    'src/bridge.js',
    'src/util.js',
    'src/set.js',
    'src/m.js',
    'src/outro.js'
];

gulp.task('bulid', function(){
    return gulp.src(sources)
        .pipe( concat('jsbridge.js') )
        .pipe( gulp.dest('dist/') )
        .pipe( uglify({
            banner: 'jsbridge - bridge for IOS&Android | https://github.com/90Team/jsbridge'
        }))
        .pipe( rename('jsbridge.min.js') )
        .pipe( gulp.dest('dist/') );
});

gulp.task('default', function(){
    gulp.watch('src/*.js', ['bulid']);
});

gulp.task('upload', function(){
    var qiniu = require("qiniu");
    qiniu.conf.ACCESS_KEY = 'BQhup6ethxXtB0A2bq5ywslryJaWYBotcufxXUmm';
    qiniu.conf.SECRET_KEY = 'gReljuOcBbcxojJMHofk7XXpe89iSHlx0WRLlfar';
    var bucket = "assets";

    //要上传的文件
    var Files = [
        {
            path: './dist/jsbridge.js',
            name: 'jsbridge.js'
        },
        {
            path: './dist/jsbridge.min.js',
            name: 'jsbridge.min.js'
        }
    ]


    //构建上传策略函数
    function uptoken(bucket, key) {
        var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
        return putPolicy.token();
    };

    //构造上传函数
    function uploadFile(uptoken, key, localFile) {
        var extra = new qiniu.io.PutExtra();
        qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
            if(!err) {
                // 上传成功， 处理返回值
                console.log(ret.hash, ret.key, ret.persistentId);
            } else {
                // 上传失败， 处理返回代码
                console.log(err);
            }
        });
    };

    //调用uploadFile上传
    uploadFile(uptoken(bucket, Files[0].name), Files[0].name, Files[0].path);
    uploadFile(uptoken(bucket, Files[1].name), Files[1].name, Files[1].path);
});
