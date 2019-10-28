'use strict';

var path = require('path');
var exexSync = require('child_process').execSync;
var utils = require('./utils');

var base = path.join(__dirname, "../blog/src/blogimgs/");
var error = {};

console.log(`压缩图片：开始处理 /blogimgs 目录`);
utils.travel(base, function(file) {
  exexSync(`sips --resampleWidth 1200 ${file}`);
});
console.log(`处理完成\n`);
