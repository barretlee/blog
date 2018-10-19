var fs = require('fs');
var path = require('path');
var base = path.join(__dirname, 'blog/src/_posts/');

fs.readdirSync(base).forEach(function(item){
  var file = path.join(base, item);
  fs.writeFileSync(file, '---\n' + fs.readFileSync(file).toString());
});