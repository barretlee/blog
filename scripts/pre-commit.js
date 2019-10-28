var fs = require('fs');
var path = require('path');
var exexSync = require('child_process').execSync;

var base = path.join(__dirname, "./src/_posts/");
var travel = function(filePath, handler) {
  fs.readdirSync(filePath).forEach(function(file) {
    var file = path.join(filePath, file);
    if(fs.statSync(file).isDirectory()) {
      travel(file, handler);
    } else {
      handler(file);
    }
  });
};


var err = [];
travel(base, deal);
console.log(err);


function deal(file) {
  var content = fs.readFileSync(file).toString();
  var date = /(\d{4})-(\d{2})-(\d{2})/.exec(file);
  var content2 = content.replace(/\!\[([^\]]+?)\]\(([\s\S]+?)\)/g, function ($0, $1, $2) {
    if (!/\.(jpg|png|svg|gif)$/.test($2)) {
      var name = $2.split('/');
      name = name[name.length - 1];
      if (fs.existsSync(`./src/blogimgs/${date[1]}/${date[2]}/${date[3]}/${name}`)) {
        fs.renameSync(`./src/blogimgs/${date[1]}/${date[2]}/${date[3]}/${name}`, `./src/blogimgs/${date[1]}/${date[2]}/${date[3]}/${name}.jpg`)
      }
      return `![${$1}](${$2}.jpg)`
    } else {
      return $0;
    }
    // if ($2.indexOf('//') === -1 || $2 === "//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png") return $0;
    // if ($2.indexOf('www.barretlee.com') > -1) {
    //   var p = '/blogimgs/' + $2.split('/blogimgs/')[1];
    //   return `![${$1}](${p})`;
    // }
    // var url = /^http/.test($2) ? $2 : `http:${$2}`;
    // var name = url.split('/');
    // name = name[name.length - 1];
    // if (url.indexOf('sinaimg') > -1 && url.indexOf('.') === -1) {
    //   name += '.jpg';
    // }
    // console.log(`![${$1}](/blogimgs/${date[1]}/${date[2]}/${date[3]}/${name})<!--<source src="${$2}">-->`);
    // mkDirByPathSync(`./src/blogimgs/${date[1]}/${date[2]}/${date[3]}`);
    // try {
    //   exexSync(`wget -O /Users/barretlee/work/blogsys/blog/src/blogimgs/${date[1]}/${date[2]}/${date[3]}/${name} ${url}`);
    // } catch(e) {
    //   err.push(file + ' ' + $2);
    // }
    // // 删除错误目录下的文件
    // if (fs.existsSync(`./src/blogimgs/${name}`)) {
    //   fs.unlink(`./src/blogimgs/${name}`);
    // }
    // return `![${$1}](/blogimgs/${date[1]}/${date[2]}/${date[3]}/${name})<!--<source src="${$2}">-->`;
  });
  if (content !== content2) {
    fs.writeFileSync(file, content2);
  }
}

function mkDirByPathSync(targetDir, {isRelativeToScript = false} = {}) {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
      console.log(`Directory ${curDir} created!`);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
      // console.log(`Directory ${curDir} already exists!`);
    }

    return curDir;
  }, initDir);
}