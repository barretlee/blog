var fs = require('fs');
var path = require('path');
var url = require('url');
var querystring = require('querystring');

var password = '';
if(fs.existsSync(path.join(__dirname, 'config.js'))) {
  password = require('./config').password;
}

var PORT = 29232;
var NOT_FOUNT_MSG = '小胡子哥提醒您：404 了！';
var FAVICON = fs.readFileSync(path.join(__dirname, 'favicon.ico'));
var io = null;

var Reading = function() {
  this.init();
};

Reading.prototype.init = function() {
  var app = require('http').createServer(this.router);
  io = require('socket.io')(app);
  app.listen(PORT, function(){
    console.log('run at: http://127.0.0.1:' + PORT);
  });
};

Reading.prototype.router = function(req, res) {
  var self = this;
  if (req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html;charset=utf-8'
    });
    res.end(fs.readFileSync(path.join(__dirname, 'index.html')));
  } else if(req.url === '/favicon.ico') {
    res.writeHead(200);
    res.end(FAVICON);
  } else if(req.url === '/new') {
    bodyParser(req, res, function() {
      var keys = Object.keys(req.body);
      if(keys && keys[0] && keys[0].length > 20 && req.body[keys[0]] === '') {
        req.body.data = keys[0];
      }
      console.log(req.body);
      if(req.body.data) {
        try {
          data = JSON.parse(req.body.data);
        } catch(e) {
          data = {};
        }
        io.emit('broadcast', data);
        res.end('success');
      } else {
        res.end('post err.');
      }
    });
  } else {
    res.end(NOT_FOUNT_MSG);
  }
};

new Reading();


function bodyParser(req, res, callback) {
  var body = '';
  req.on('data', function(chunk) {
    body += chunk || '';
  });
  req.on('end', function(chunk) {
    body += chunk || '';
    req.body = querystring.parse(body);
    callback && callback(req, res);
  });
}
