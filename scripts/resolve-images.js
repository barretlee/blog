var fs = require('fs');
var path = require('path');
var exexSync = require('child_process').execSync;
var utils = require('./utils');

var base = path.join(__dirname, "../blog/src/_posts/");
var error = {};

console.log(`清理图片路径：开始检查 /blogimgs 目录`);
utils.travel(base, deal);
console.log(`检查完成\n`);

fs.writeFileSync(path.join(__dirname, 'check.json'), JSON.stringify(error, null, 2));

function deal(file) {
  var DATE_REG = /(\d{4})-(\d{2})-(\d{2})/m;
  var IMG_REG = /\!\[([^\]]+?)\]\(([\s\S]+?)\)/g;
  var content = fs.readFileSync(file).toString();
  var LOADING_IMG_URL = "//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png";
  var isStandardPath = true;
  var date = DATE_REG.exec(file);
  if (!date) {
    isStandardPath = false;
    date = DATE_REG.exec(content);
    if (!date) {
      error[file] = error[file] || {};
      error[file]['date'] = 'not match date';
      return;
    }
  }
  // 图片处理，将 blogimg 中的非日期路径图片迁移到日期文件夹
  var content2 = content.replace(IMG_REG, function ($0, $1, $2) {
    if ($2 === LOADING_IMG_URL) return $0;
    if ($2.indexOf('www.barretlee.com') > -1) {
      console.log('rename', $2);
      var p = '/blogimgs/' + $2.split('/blogimgs/')[1];
      return `![${$1}](${p})`;
    }
    if (!/\.(jpg|png|svg|gif|jpeg)$/.test($2)) {
      console.log(`unknown image type: ${$2}.`);
      return $0;
    }
    var imgRoot = path.join(__dirname, `../blog/src/blogimgs/`);
    var imgDirPath = `${date[1]}/${date[2]}/${date[3]}`;
    var dir = path.join(imgRoot, imgDirPath);
    var name = path.basename($2);
    var img = path.join(dir, name);
    if (!fs.existsSync(dir)) {
      try {
        exexSync(`mkdir -p ${dir}`);
      } catch(e) {
        error[file] = error[file] || {};
        error[file][$2] = `mkdir ${dir} failed.`;
      }
    }
    if (!fs.existsSync(img)) {
      // relative images
      if (/^\/blogimgs/.test($2)) {
        if (!fs.existsSync(path.join(imgRoot, name))) {
          error[file] = error[file] || {};
          error[file][$2] = `image ${$2} not exist in /blogimgs.`;
        } else {
          console.log('move', $2);
          fs.renameSync(path.join(imgRoot, name), img);
        }
        // remote images 
      } else if (/^(https?\:)\/\//.test($2)) {
        try {
          console.log('download', $2);
          exexSync(`wget -O ${img} ${url}`);
        } catch (e) {
          error[file] = error[file] || {};
          error[file][$2] = `download image ${$2} failed.`;
        }
        // unknown images
      } else {
        error[file] = error[file] || {};
        error[file][$2] = `unknown image: ${$2}.`;
      }
    }
    // TODO: replace $1;
    return `![${$1}](/blogimgs/${imgDirPath}/${name})`;
  });
  if (content !== content2) {
    console.log('>>> rewrite', file);
    fs.writeFileSync(file, content2);
  }
  if (!isStandardPath) {
    var fileName = path.basename(file);
    console.log('>>> rename', fileName);
    fs.renameSync(file, file.replace(fileName, `${date[1]}-${date[2]}-${date[3]}-${fileName}`));
  }
}