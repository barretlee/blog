---
title: 深入浅出NodeJS——数据通信，NET模块运行机制
categories:
  - JavaScript
  - 前端杂烩
  - 网络交互
tags:
  - tech
  - cnblogs
  - NodeJS
warning: true
date: 2014-04-22 02:11:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2014/04/22/nodejs-net-module.html" target="_blank">博客园</a>.</div>

<p>互联网的运作，最根本的驱动就是信息的交互，NodeJS 在数据交互这一块做的很带感，异步编程让人很惬意，关于 NodeJS 的数据通信，最基础的两个模块是 NET 和 HTTP，前者是基于 TCP 的封装，后者本质还是 TCP 层，只不过做了比较多的数据封装，我们视之为更高层。</p>
<p>本文先述说 NodeJS 的 NET 模块工作机制，下次再谈一谈 HTTP 模块。</p>
<p>本文地址：<a href="http://www.cnblogs.com/hustskyking/p/nodejs-net-module.html">http://www.cnblogs.com/hustskyking/p/nodejs-net-module.html</a>，转载请注明源地址。</p>
<h3>一、服务器和客户端之间的交互</h3>
<p>NodeJS 底层支撑是 <a href="http://en.wikipedia.org/wiki/V8_engine" target="_blank">v8</a>，v8 是用 C++ 编写的一个编译和运行 JavaScript 代码的库，说到 TCP/UDP，写 C/C++ 的童鞋肯定不会感到陌生，在建立 socket 连接的时候，基本都会涉及到相关的知识。</p>
<p>这里先解释下服务器端和客户端之间的一些共性和差异。关于数据交互，我们可以想象成，Server 与 Client 之间建立了一个管道（pipe），这个管道有两个分支，一个是用于发送 S 到 C 的数据，一个是用于发送 C 到 S 的数据。那么这个管道是如何建立的呢？</p>
<p>首先，Server 监听本地的某个端口（所谓端口，可以理解成对外交流的摊铺），Client 很明确自己要跟谁去交流，他去访问 Server 的那个摊铺，于是两者之间就可以沟通了。所以 Server 跟 Client 之间的差异是十分明显的，Server 会监听端口，而 Client 去访问端口。</p>
<p>Unix/Linux 系统跟 windows 有些不同，他可以去监听端口，也可以去监听文件，也就是说他可以把端口和文件都当做对外交流的摊铺。那么 Client 可以通过访问一个文件与 Server 建立起 pipe。</p>
<h3>二、Node 如何开启一个 TCP 服务器</h3>
<p>在电脑上安装好了 Node 之后，我们就可以引用 Node 提供的模块，Node 内置了很多模块，如文件处理（FireSystem）、控制台（Console）、数据流（Stream）等等，这些我会在以后的文章中提到。建立 TCP 连接需要用到的是 Node 的 NET 模块。使用一个模块十分简单：</p>

```
var net = require('net');

```

<p><code>net</code> 是一个系统模块，也就是安装 Node 之后自带的模块，没必要对他感到畏惧，其实他的内部也是十分简单的：</p>

```
var Net = function(){};

Net.methodA = function (){};
Net.methodB = function (){};

module.exports = Net;

```

<p>我们可以简单理解 net 模块的内部实现，他就是一个 Net 类，上面绑定了很多的 methods，require 之后，相当于返回一个 Net 类，此时我们就可以尽情使用 Net 中定义的所有方法和属性了。</p>
<p>Node 中开启一个 TCP 服务器：</p>

```
// server.js
var net = require('net');
var server = net.createServer(function(socket) { //'connection' listener
    console.log('server connected');
    socket.on('end', function() {
        console.log('server disconnected');
    });
    socket.on('data', function(){
        socket.end('hello\r\n');
    });
});
server.listen(8124, function() { //'listening' listener
    console.log('server bound');
});

```

<p>上面这段代码应该很好理解，首先 <code>net.createServer</code> 创建一个 TCP 服务，这个服务绑定（server.listen）在 8124 这个端口上，创建 Server 后我们看到有一个回调函数，这个回调函数的实现方式是怎么样的呢？</p>

```
net.createServer = function(callback){
    // 每次客户端连接都会新建一个 socket
    var socket = new Socket();
    callback && callback(socket);
};

```

<p>在调用上面函数的时候传入一个参数，这个参数也是函数，并且接受了 socket ，这个由其他方法构造的一个管道（pipe），他的作用就是用来数据交互的。第一节中我们说到了，pipe 是需要 Client 跟 Server 打招呼才能建立的，如果此刻没有客户端访问 Server，这个 socket 就不会存在了。</p>
<h3>三、写一个客户端程序与服务器交互</h3>
<p>既然 Socket ，也就是管道（pipe）还没有存在，那肯定是不会存在通讯的，下面来写一个客户端程序：</p>

```
// client.js
var net = require("net");
var client = net.connect({port: 8124}, function(){
    console.log('client connected');
    client.write('world!\r\n');
});
client.on('data', function(data) {
    console.log(data.toString());
    client.end();
});
client.on('end', function() {
    console.log('client disconnected');
});

```

<p><code>net.connect</code> 顾名思义，就是连接到服务端，第一个参数是对象，设置端口（port）为 8124，也就是我们服务器监听的端口，由于没有设置 host 参数，那默认就是 localhost （本地）。在 Server 中，socket 是管道的一端，而在 client 中，client 本身就是管道的一端，如果是多个客户端连接 Server，Server 会新建多个 socket，每个 socket 对应一个 client。</p>
<p>数据的通信就十分简单了，首先运行服务器程序：</p>

```
node server.js

```

<p>此时便会有一个服务器监听 8124 端口，然后打开一个客户端程序：</p>

```
node client.js

```

<p>那么两者之间的信息交互就开始了。具体他们是怎么交流的呢？</p>
<h3>四、基于事件的哲学</h3>
<p>首先我们要说一说 NodeJS 的 EventEmitter 模块。这个模块就是一个事件中心，之前写过相关的内容，可以看看简介版的 EventEmitter，<a href="http://www.cnblogs.com/hustskyking/p/how-to-achieve-loading-module.html#p-2" target="_blank">戳我</a>。EventEmitter 也就是如此，可以 on 添加事件到事件池，也可以 trigger 触发事件，当然可以从事件池中删除事件 off。</p>
<p>NET 模块是继承 EventEmitter 的，所以他创建的很多对象可以：</p>

```
client.on('data', function(data) {
    console.log(data.toString());
    client.end();
});

```

<p>如上绑定很多自定义的事件，等到交互中需要信息交流的时候再触发。就拿上面这句代码来说，client 绑定了一个 data 事件，这个事件会在 Server 有信息传过来的时候触发，他所做的工作，先打印传过来的数据，然后 end() 关闭这个管道（pipe）。</p>
<p>JavaScript 是基于事件的一门语言，几乎所有的动作都是由事件驱动的，这个在异步编程中显得十分突出。</p>
<h3>五、相关 API 的枚举</h3>
<p>Server 除了有 listen 函数外，还有很多的接口：</p>
<ul>
<li><code>Server.close([callback])</code>，停止监听，那么之前的所有管道也就没有用了。</li>
<li>
<p><code>Server.maxConnections</code>，Server 的最大连接数，这个连接数是有上限的（跟系统有关），我们也可以自己设定连接数的最大上限（不超过系统最大连接数）。</p>
</li>
<li>
<p><code>Server.address()</code>，在 listen 之后可以通过这个函数拿到服务器的相关信息。</p>

```
// grab a random port. 
server.listen(function() {
    address = server.address();
    console.log("opened server on %j", address);
});

```

</li>
</ul>
<p>还有 write、end、destroy、pause、resume 等等很多丰富的接口，可以在这里查看详情<a href="http://nodejs.org/api/net.html" target="_blank">http://nodejs.org/api/net.html</a>。</p>
<h3>六、小结</h3>
<p>本来打算写一个聊天室，但是这种简单的代码网络上俯拾皆是，本文目的是说清楚 TCP 连接在服务器和客户端之间的交互过程，深入的话题留到下次谈。</p>
<h3>七、参考资料</h3>
<ul>
<li><a href="http://nodejs.org/api/net.html" target="_blank">http://nodejs.org/api/net.html</a></li>
</ul>

