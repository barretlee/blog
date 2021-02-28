---
title: JavaScript之web通信
categories:
  - JavaScript
  - 前端杂烩
  - 网络交互
tags:
  - tech
  - cnblogs
warning: true
date: 2013-12-17 10:01:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/12/17/web-communication.html" target="_blank">博客园</a>.</div>

<p>web通信，一个特别大的topic，涉及面也是很广的。因最近学习了 javascript 中一些 web 通信知识，在这里总结下。文中应该会有理解错误或者表述不清晰的地方，还望斧正！</p>
<h3>一、前言</h3>
<h4>1. comet技术</h4>
<blockquote>
<p>浏览器作为 Web 应用的前台，自身的处理功能比较有限。浏览器的发展需要客户端升级软件，同时由于客户端浏览器软件的多样性，在某种意义上，也影响了浏览器新技术的推广。在 Web 应用中，浏览器的主要工作是发送请求、解析服务器返回的信息以不同的风格显示。AJAX 是浏览器技术发展的成果，通过在浏览器端发送异步请求，提高了单用户操作的响应性。但 Web 本质上是一个多用户的系统，对任何用户来说，可以认为服务器是另外一个用户。现有 AJAX 技术的发展并不能解决在一个多用户的 Web 应用中，将更新的信息实时传送给客户端，从而用户可能在\过时"的信息下进行操作。而 AJAX 的应用又使后台数据更新更加频繁成为可能。</p>
</blockquote>
<p>随着互联网的发展，web 应用层出不穷，也不乏各种网站监控、即时报价、即时通讯系统，为了让用户得到更好的体验，服务器需要频繁的向客户端推送信息。开发者一般会采用基于 AJAX 的长轮询方式或者基于 iframe 及 htmlfile 的流方式处理。当然有些程序需要在客户端安装各种插件( Java applet 或者 Flash )来支持性能比较良好的\推"信息。</p>
<h4>2. HTTP协议中的长、短连接</h4>
<blockquote>
<p><strong>短连接的操作步骤是：</strong>建立连接&mdash;&mdash;数据传输&mdash;&mdash;关闭连接...建立连接&mdash;&mdash;数据传输&mdash;&mdash;关闭连接<strong>长连接的操作步骤是：</strong>建立连接&mdash;&mdash;数据传输...（保持连接）...数据传输&mdash;&mdash;关闭连接</p>

</blockquote>
<p>长连接与短连接的不同主要在于client和server采取的关闭策略不同。短连接在建立连接以后只进行一次数据传输就关闭连接，而长连接在建立连接以后会进行多次数据数据传输直至关闭连接（长连接中关闭连接通过Connection：closed头部字段）。</p>
<h3>二、web 通信</h3>
<p>首先要搞清楚，xhr 的 readystate 各种状态。</p>
<table>
<thead>
<tr><th>属性                </th><th> 描述</th>
</tr>

</thead>
<tbody>
<tr>
<td>onreadystatechange  </td>
<td> 存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数。</td>

</tr>
<tr>
<td>readyState          </td>
<td> 存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。  0: 请求未初始化  1: 服务器连接已建立  2: 请求已接收3: 请求处理中  4: 请求已完成，且响应已就绪</td>

</tr>
<tr>
<td>status              </td>
<td> 200: "OK" 404: 未找到页面</td>

</tr>

</tbody>

</table>
<h4>&nbsp;</h4>
<h4>1.轮询</h4>
<p>轮询是一种\拉"取信息的工作模式。设置一个定时器，定时询问服务器是否有信息，每次建立连接传输数据之后，链接会关闭。</p>
<p>前端实现：</p>

```
var polling = function(url, type, data){
    var xhr = new XMLHttpRequest(),
        type = type || "GET",
        data = data || null;

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4) {
            receive(xhr.responseText);
            xhr.onreadystatechange = null;
        }
    };

    xhr.open(type, url, true);
    //IE的ActiveXObject("Microsoft.XMLHTTP")支持GET方法发送数据，
    //其它浏览器不支持，已测试验证
    xhr.send(type == "GET" ? null : data);
};

var timer = setInterval(function(){
    polling();
}, 1000);

```

<p>在轮询的过程中，如果因为网络原因，导致上一个 xhr 对象还没传输完毕，定时器已经开始了下一个询问，上一次的传输是否还会在队列中，这个问题我没去研究。如果感兴趣可以自己写一个ajax的请求管理队列。</p>
<h4>2.长轮询(long-polling)</h4>
<p>长轮询其实也没啥特殊的地方，就是在xhr对象关闭连接的时候马上又给他接上~ 看码：</p>

```
var longPoll = function(type, url){
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        // 状态为 4，数据传输完毕，重新连接
        if(xhr.readyState == 4) {
            receive(xhr.responseText);
            xhr.onreadystatechange = null;

            longPoll(type, url);
        }
    };

    xhr.open(type, url, true);
    xhr.send();
}

```

<p>只要服务器断开连接，客户端马上连接，不让他有一刻的休息时间，这就是长轮询。</p>
<h4>3.数据流</h4>
<p>数据流方式，在建立的连接断开之前，也就是 readystate 状态为 3 的时候接受数据，但是麻烦的事情也在这里，因为数据正在传输，你拿到的 xhr.response 可能就是半截数据，所以呢，最好定义一个数据传输的协议，比如前2个字节表示字符串的长度，然后你只获取这个长度的内容，接着改变游标的位置。</p>
<p>假如数据格式为： data splitChar &nbsp; data为数据内容，splitChar为数据结束标志（长度为1）。 那么传输的数据内容为 data splitChar data splitChar data splitChar...</p>

```
var dataStream = function(type, url){
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){

        // 状态为 3，数据接收中
        if(xhr.readyState == 3) {
            var i, l, s;

            s = xhr.response; //读取数据
            l = s.length;     //获取数据长度

            //从游标位置开始获取数据，并用分割数据
            s = s.slice(p, l - 1).split(splitChar);

            //循环并操作数据
            for(i in s) if(s[i])  deal(s[i]);

            p = l;  //更新游标位置

        }

        // 状态为 4，数据传输完毕，重新连接
        if(xhr.readyState == 4) {
            xhr.onreadystatechange = null;

            dataStream(type, url);
        }
    };

    xhr.open(type, url, true);
    xhr.send();
};

```

<p>这个代码写的是存在问题的，当readystate为3的时候可以获取数据，但是这时获取的数据可能只是整体数据的一部分，那后半截就拿不到了。readystate在数据传输完毕之前是不会改变的，也就是说他并不会继续接受剩下的数据。我们可以定时去监听readystate，这个下面的例子中可以看到。</p>
<p>这样的处理不算复杂，但是存在问题。上面的轮询和长轮询是所有浏览器都支持的，所以我就没有写兼容IE的代码，但是这里，低版本IE不允许在readystate为3的时候读取数据，所以我们必须采用其他的方式来实现。</p>
<p>在ajax还没有进入web专题之前，我们已经拥有了一个法宝，那就是iframe，利用iframe照样可以异步获取数据，对于低版本IE可以使用iframe来接受数据流。</p>

```
if(isIE){
    var dataStream = function(url){
        var ifr = document.createElement("iframe"), doc, timer;

        ifr.src = url;
        document.body.appendChild(ifr);

        doc = ifr.contentWindow.document;

        timer = setInterval(function(){

            if(ifr.readyState == "interactive"){
                // 处理数据，同上
            }

            // 重新建立链接
            if(ifr.readyState == "complete"){
                clearInterval(timer);

                dataStream(url);
            }
        }, 16);
    };
};

```

<p>定时去监听iframe的readystate的变化，从而获取数据流，不过，上面的处理方式还是存在问题。数据流实现\服务器推"数据的原理是什么呢，简单点说，就是文档(数据)还没有加载完，这个时候浏览器的工作就是去服务器拿数据完成文档(数据)加载，我们就是利用这点，给浏览器塞点东西过去~ 所以上述利用iframe的方式获取数据，会使浏览器一直处于加载状态，title上的那个圈圈一直在转动，鼠标的状态也是loading，这看着是相当不爽的。幸好，IE提供了HTMLFile对象，这个对象就相当于一个内存中的Document对象，它会解析文档。所以我们创建一个HTMLFile对象，在里面放置一个IFRAME来连接服务器。这样，各种浏览器就都支持了。</p>

```
if(isIE){
    var dataStream = function(url){
        var doc = new ActiveXObject("HTMLFile"),
            ifr = doc.createElement("iframe"),
            timer, d;

        doc.write("<body>");

        ifr.src = url;
        doc.body.appendChild(ifr);

        d = ifr.contentWindow.document;

        timer = setInterval(function(){

            if(d.readyState == "interactive"){
                // 处理数据，同上
            }

            // 重新建立链接
            if(d.readyState == "complete"){
                clearInterval(timer);

                dataStream(url);
            }
        }, 16);
    };
};

```
</body>
<h4>4.websocket</h4>
<p>websocket是前端一个神器，ajax用了这么久了，相关技术也是很成熟，不过要实现个数据的拉取确实十分不易，从上面的代码中也看到了，各种兼容性问题，各种细节处理问题，自从有了websocket，哈哈，一口气上五楼...</p>

```
var ws = new WebSocket("ws://www.example.com:8888");

ws.onopen = function(evt){};
ws.onmessage = function(evt){
    deal(evt.data);
};
ws.onclose  = function(evt){};

//ws.close();

```

<p>新建一个WebSocket实例，一切就OK了，<code>ws://</code> 是websocket的连接协议，8888为端口号码。onmessage中提供了data这个属性，相当方便</p>
<h4>5.EventSource</h4>
<p>HTML5中提供的EventSource这玩意儿，这是无比简洁的服务器推送信息的接受函数。</p>

```
new EventSource("test.php").onmessage=function(evt){
    console.log(evt.data);
};

```

<p>简洁程度和websocket是一样的啦，只是这里有一个需要注意的地方，test.php输出的数据流应该是特殊的MIME类型，要求是"text/event-stream"，如果不设置的话，你试试~ （直接抛出异常）</p>
<h4>6.ActionScript</h4>
<p>情非得已就别考虑这第六种方式了，虽说兼容性最好，要是不懂as，出了点bug你也不会调试。</p>
<p>具体实现方法：在 HTML 页面中内嵌入一个使用了 XMLSocket 类的 Flash 程序。JavaScript 通过调用此 Flash 程序提供的套接口接口与服务器端的套接口进行通信。JavaScript 在收到服务器端以 XML 格式传送的信息后可以很容易地控制 HTML 页面的内容显示。</p>
<h4>7.Java Applet套接口</h4>
<p>这玩意儿原理和Flash类似，不过我不懂，就不细说了。</p>
<h3>三、后端处理方式</h3>
<p>本文主要是总结Javascript的各种通讯方式，后端配合node来处理，应该是挺给力的。</p>

```
var conns = new Array();

var ws = require("websocket-server");
var server = ws.createServer();

server.addListener("connection", function(connection){
  console.log("Connection request on Websocket-Server");
  conns.push(connection);
  connection.addListener('message',function(msg){
        console.log(msg);
        for(var i=0; i<conns.length; i++){
            if(conns[i]!=connection){
                conns[i].send(msg);
            }
        }
    });
});
server.listen(8888);
```
<p>下面是一个php的测试demo。</p>

```
header('Content-Type:text/html; charset=utf-8');
while(1){
    echo date('Y-m-d H:i:s');
    flush();
    sleep(1);
};

```

<h3>四、web 通信方式利弊分析</h3>
<ul>
<li>轮询，这种方式应该是最没技术含量的，操作起来最方便，不过是及时性不强，把定时器的间隔时间设置的短一些可以稍微得到缓和。</li>
<li>长轮询，算是比较不错的一个web通讯方式，不过每次断开连接，比较耗服务器资源，客户端到无所谓。</li>
<li>数据流，他和长轮询不同之处是接受数据的时间不一样，数据流是readystate为3的时候接受，低版本IE不太兼容，处理起来略麻烦，而且还要自己设计数据传输协议。不过他对资源的消耗比上面几种都可观。</li>
<li>websocket和EventSource，两个利器，不过，没几个浏览器支持，这是比较让人伤心~</li>
<li>ActionScript和Java Applet，两者都是需要在客户端安装插件的，一个是Flash插件，一个是Java插件，而且搞前端的人一般对这东西不太熟悉，如果没有封装比较好的库可以使用，那建议还是别用了。</li>
</ul>
<h3>五、参考资料</h3>
<ul>
<li><a href="http://www.ibm.com/developerworks/cn/web/wa-lo-comet/" target="_blank">http://www.ibm.com/developerworks/cn/web/wa-lo-comet/</a> Comet：基于 HTTP 长连接的\服务器推"技术</li>
<li><a href="http://blog.csdn.net/yankai0219/article/details/8208776" target="_blank">http://blog.csdn.net/yankai0219/article/details/8208776</a> HTTP协议中长连接、短连接</li>
<li><a href="http://www.web-tinker.com/" target="_blank">http://www.web-tinker.com/</a> comet系列文章 <strong>推荐<a href="http://www.web-tinker.com/rss.xml" target="_blank">订阅</a></strong></li>
</ul>

