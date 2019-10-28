'use strict';

var fs = require('fs');
var path = require('path');

exports.travel = function (filePath, handler) {
  fs.readdirSync(filePath).forEach(function (file) {
    var file = path.join(filePath, file);
    if (fs.statSync(file).isDirectory()) {
      exports.travel(file, handler);
    } else {
      handler(file);
    }
  });
};