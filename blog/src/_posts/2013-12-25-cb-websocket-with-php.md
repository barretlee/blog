---
title: 细说websocket - php篇
categories:
  - JavaScript
  - 前端杂烩
  - 网络交互
tags:
  - tech
  - cnblogs
  - PHP
  - websocket
warning: true
date: 2013-12-25 11:24:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/12/25/websocket-with-php.html" target="_blank">博客园</a>.</div>

<p>下面我画了一个图演示 client 和 server 之间建立 websocket 连接时握手部分，这个部分在 node 中可以十分轻松的完成，因为 node 提供的 net 模块已经对 socket 套接字做了封装处理，开发者使用的时候只需要考虑数据的交互而不用处理连接的建立。而 php 没有，从 socket 的连接、建立、绑定、监听等，这些都需要我们自己去操作，所以有必要拿出来再说一说。</p>

```
+--------+    1.发送Sec-WebSocket-Key        +---------+
|        | --------------------------------> |        |
|        |    2.加密返回Sec-WebSocket-Accept  |        |
| client | <-------------------------------- | server |
|        |    3.本地校验                      |        |
|        | --------------------------------> |        |
+--------+                                   +--------+

```

<p>看了我写的<a href="http://www.cnblogs.com/hustskyking/p/websocket-with-node.html" target="_blank">上一篇文章</a>的同学应该是对上图有了比较全面的理解。① 和 ② 实际上就是一个 HTTP 的请求和响应，只不过我们在处理的过程中我们拿到的是没有经过解析的字符串。如：</p>

```
GET /chat HTTP/1.1
Host: server.example.com
Origin: http://example.com

```

<p>我们往常看到的请求是这个样子，当这东西到了服务器端，我们可以通过一些代码库直接拿到这些信息。</p>
<h3>一、php 中处理 websocket</h3>
<p>WebSocket 连接是由客户端主动发起的，所以一切要从客户端出发。第一步是要解析拿到客户端发过来的 Sec-WebSocket-Key 字符串。</p>

```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13

```

<p><a href="http://www.cnblogs.com/hustskyking/p/websocket-with-node.html" target="_blank">前文</a>中也提到了 client 请求的格式（如上），首先 php 建立一个 socket 连接，监听端口的信息。</p>
<h4>1. socket 连接的建立</h4>
<p>关于 socket 套接字的建立，相信很多大学修过计算机网络的人都知道了，下面是一张连接建立的过程：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/12/25/25124523-33fc2253152447d4a16bac3b6704d832.jpg" data-source="http://images.cnitblog.com/blog/387325/201312/25124523-33fc2253152447d4a16bac3b6704d832.jpg" alt="" width="467" height="620"></p>

```
// 建立一个 socket 套接字
$master = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
socket_set_option($master, SOL_SOCKET, SO_REUSEADDR, 1);
socket_bind($master, $address, $port);
socket_listen($master);

```

<p>相比 node，这个地方的处理实在是太麻烦了，上面几行代码并未建立连接，只不过这些代码是建立一个 socket 套接字必须要写的东西。由于处理过程稍微有复杂，所以我把各种处理写进了一个类中，方便管理和调用。</p>

```

//demo.php
Class WS {
    var $master;  // 连接 server 的 client
    var $sockets = array(); // 不同状态的 socket 管理
    var $handshake = false; // 判断是否握手

    function __construct($address, $port){
        // 建立一个 socket 套接字
        $this->master = socket_create(AF_INET, SOCK_STREAM, SOL_TCP)
            or die("socket_create() failed");
        socket_set_option($this->master, SOL_SOCKET, SO_REUSEADDR, 1)
            or die("socket_option() failed");
        socket_bind($this->master, $address, $port)
            or die("socket_bind() failed");
        socket_listen($this->master, 2)
            or die("socket_listen() failed");

        $this->sockets[] = $this->master;

        // debug
        echo("Master socket  : ".$this->master."\n");

        while(true) {
            //自动选择来消息的 socket 如果是握手 自动选择主机
            $write = NULL;
            $except = NULL;
            socket_select($this->sockets, $write, $except, NULL);

            foreach ($this->sockets as $socket) {
                //连接主机的 client 
                if ($socket == $this->master){
                    $client = socket_accept($this->master);
                    if ($client < 0) {
                        // debug
                        echo "socket_accept() failed";
                        continue;
                    } else {
                        //connect($client);
                        array_push($this->sockets, $client);
                        echo "connect client\n";
                    }
                } else {
                    $bytes = @socket_recv($socket,$buffer,2048,0);
                    if($bytes == 0) return;
                    if (!$this->handshake) {
                        // 如果没有握手，先握手回应
                        //doHandShake($socket, $buffer);
                        echo "shakeHands\n";
                    } else {
                        // 如果已经握手，直接接受数据，并处理
                        $buffer = decode($buffer);
                        //process($socket, $buffer); 
                        echo "send file\n";
                    }
                }
            }
        }
    }
}

demo.php 握手连接测试代码
```



<p>上面这段代码是经过我调试了的，没太大的问题，如果想测试的话，可以在 cmd 命令行中键入 <code>php /path/to/demo.php</code>;当然，上面只是一个类，如果要测试的话，还得新建一个实例。</p>

```
$ws = new WS('localhost', 4000);

```

<p>客户端代码可以稍微简单点：</p>

```
var ws = new WebSocket("ws://localhost:4000");
ws.onopen = function(){
    console.log("握手成功");
};
ws.onerror = function(){
    console.log("error");
};

```

<p>运行服务器代码，当客户端连接的时候，我们可以看到：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/12/25/25124555-64ad002702334156a80bedef37fbf361.jpg" data-source="http://images.cnitblog.com/blog/387325/201312/25124555-64ad002702334156a80bedef37fbf361.jpg" alt=""></p>
<p>通过上面的代码可以清晰的看到整个交流的过程。首先是建立连接，node 中这一步已经封装到了 net 和 http 模块，然后判断是否握手，如果没有的话，就 shakeHands。这里的握手我直接就 echo 了一个单词，表示进行了这个东西，<a href="http://www.cnblogs.com/hustskyking/p/websocket-with-node.html" target="_blank">前文</a>我们提到过握手算法，这里就直接写了。</p>
<h4>2. 提取 Sec-WebSocket-Key 信息</h4>

```
function getKey($req) {
    $key = null;
    if (preg_match("/Sec-WebSocket-Key: (.*)\r\n/", $req, $match)) {
        $key = $match[1];
    }
    return $key;
}

```

<p>这里比较简单，直接正则匹配，websocket 信息头一定包含 Sec-WebSocket-Key，所以我们匹配起来也比较快捷~</p>
<h4>3. 加密 Sec-WebSocket-Key</h4>

```
function encry($req){
    $key = $this->getKey($req);
    $mask = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

    return base64_encode(sha1($key . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11', true));
}

```

<p>将 SHA-1 加密后的字符串再进行一次 base64 加密。如果加密算法错误，客户端在进行校检的时候会直接报错：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/12/25/25124720-0518fd35df2c4f7a91f624e4bbf2ec6c.jpg" data-source="http://images.cnitblog.com/blog/387325/201312/25124720-0518fd35df2c4f7a91f624e4bbf2ec6c.jpg" alt=""></p>
<h4>4. 应答 Sec-WebSocket-Accept</h4>

```
function dohandshake($socket, $req){
    // 获取加密key
    $acceptKey = $this->encry($req);
    $upgrade = "HTTP/1.1 101 Switching Protocols\r\n" .
               "Upgrade: websocket\r\n" .
               "Connection: Upgrade\r\n" .
               "Sec-WebSocket-Accept: " . $acceptKey . "\r\n" .
               "\r\n";

    // 写入socket
    socket_write(socket,$upgrade.chr(0), strlen($upgrade.chr(0)));
    // 标记握手已经成功，下次接受数据采用数据帧格式
    $this->handshake = true;
}

```

<p>这里千万要注意，每一个请求和相应的格式，最后有一个空行，也就是 <code>\r\n</code>，开始测试的时候把这东西给弄丢了，纠结了半天。</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/12/25/25124605-f1c4f57be53a43b1bcfb20392fe6c18a.jpg" data-source="http://images.cnitblog.com/blog/387325/201312/25124605-f1c4f57be53a43b1bcfb20392fe6c18a.jpg" alt=""></p>
<p>当客户端成功校检key后，会触发 onopen 函数：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/12/25/25124618-53351ac2263d4ca89be4bd7eaca1968c.jpg" data-source="http://images.cnitblog.com/blog/387325/201312/25124618-53351ac2263d4ca89be4bd7eaca1968c.jpg" alt=""></p>
<h4>5. 数据帧处理</h4>

```
// 解析数据帧
function decode($buffer)  {
    $len = $masks = $data = $decoded = null;
    $len = ord($buffer[1]) < 127;

    if ($len === 126)  {
        $masks = substr($buffer, 4, 4);
        $data = substr($buffer, 8);
    } else if ($len === 127)  {
        $masks = substr($buffer, 10, 4);
        $data = substr($buffer, 14);
    } else  {
        $masks = substr($buffer, 2, 4);
        $data = substr($buffer, 6);
    }
    for ($index = 0; $index < strlen($data); $index++) {
        $decoded .= $data[$index] ^ $masks[$index % 4];
    }
    return $decoded;
}

```

<p>这里涉及的编码问题在前文中已经提到过了，这里就不赘述，php 对字符处理的函数太多了，也记得不是特别清楚，这里就没有详细的介绍解码程序，直接把客户端发送的数据原样返回，可以算是一个聊天室的模式吧。</p>

```
// 返回帧信息处理
function frame($s) {
    $a = str_split($s, 125);
    if (count($a) == 1) {
        return "\x81" . chr(strlen($a[0])) . $a[0];
    }
    $ns = "";
    foreach ($a as $o) {
        $ns .= "\x81" . chr(strlen($o)) . $o;
    }
    return $ns;
}

// 返回数据
function send($client, $msg){
    $msg = $this->frame($msg);
    socket_write($client, $msg, strlen($msg));
}

```

<p>客户端代码：</p>

```
var ws = new WebSocket("ws://localhost:4000");
ws.onopen = function(){
    console.log("握手成功");
};
ws.onmessage = function(e){
    console.log("message:" + e.data);
};
ws.onerror = function(){
    console.log("error");
};
ws.send("李靖");

```

<p>在连通之后发送数据，服务器原样返回：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/12/25/25124629-a1d032dbd01a4a958cae055a99c964eb.jpg" data-source="http://images.cnitblog.com/blog/387325/201312/25124629-a1d032dbd01a4a958cae055a99c964eb.jpg" alt=""></p>


<h3>二、注意问题</h3>
<h4>1. websocket 版本问题</h4>
<p>客户端在握手时的请求中有<code>Sec-WebSocket-Version: 13</code>，这样的版本标识，这个是一个升级版本，现在的浏览器都是使用的这个版本。而以前的版本在数据加密的部分更加麻烦，它会发送两个key：</p>

```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Key1: xxxx
Sec-WebSocket-Key2: xxxx

```

<p>如果是这种版本（比较老，已经没在使用了），需要通过下面的方式获取</p>

```
function encry($key1,$key2,$l8b){ //Get the numbers preg_match_all('/([\d]+)/', $key1, $key1_num); preg_match_all('/([\d]+)/', $key2, $key2_num);

    $key1_num = implode($key1_num[0]);
    $key2_num = implode($key2_num[0]);
    //Count spaces
    preg_match_all('/([ ]+)/', $key1, $key1_spc);
    preg_match_all('/([ ]+)/', $key2, $key2_spc);

    if($key1_spc==0|$key2_spc==0){ $this->log("Invalid key");return; }
    //Some math
    $key1_sec = pack("N",$key1_num / $key1_spc);
    $key2_sec = pack("N",$key2_num / $key2_spc);

    return md5($key1_sec.$key2_sec.$l8b,1);
}

```

<p>只能无限吐槽这种验证方式！相比 nodeJs 的 websocket 操作方式：</p>

```
//服务器程序
var crypto = require('crypto');
var WS = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
require('net').createServer(function(o){
    var key;
    o.on('data',function(e){
        if(!key){
            //握手
            key = e.toString().match(/Sec-WebSocket-Key: (.+)/)[1];
            key = crypto.createHash('sha1').update(key + WS).digest('base64');
            o.write('HTTP/1.1 101 Switching Protocols\r\n');
            o.write('Upgrade: websocket\r\n');
            o.write('Connection: Upgrade\r\n');
            o.write('Sec-WebSocket-Accept: ' + key + '\r\n');
            o.write('\r\n');
        }else{
            console.log(e);
        };
    });
}).listen(8000);

```

<p>多么简洁，多么方便！有谁还愿意使用 php 呢。。。。</p>
<h4>2. 数据帧解析代码</h4>
<p>本文没有给出 decodeFrame 这样数据帧解析代码，前文中给出了数据帧的格式，解析纯属体力活。</p>
<h4>3. 代码下载</h4>
<p>对这部分感兴趣的同学，可以再去深究。提供了<a href="http://files.cnblogs.com/hustskyking/ws.zip" target="_blank">参考代码下载</a>。</p>
<h4>4. 相关开源库参考</h4>
<p><a href="http://socketo.me" target="_blank">http://socketo.me</a> Ratchet 为 php 封装的一个 WebSockets 库。 ]</p>
<p>Google 上搜索 <a href="//www.google.com.hk/search?q=php+websocket+class" target="_blank">php+websoket+class</a>，也能找到不少相关的资料。</p>
<h3>三、参考资料</h3>
<ul>
<li><a href="http://www.php.net/manual/zh/ref.sockets.php" target="_blank">http://www.php.net/manual/zh/ref.sockets.php</a> php manual</li>
<li><a href="http://www.rfc-editor.org/rfc/rfc6455.txt" target="_blank">http://www.rfc-editor.org/rfc/rfc6455.txt</a>&nbsp;&nbsp;[<a href="http://www.rfc-editor.org/rfc/rfc6455.txt">RFC6455</a>] WebSocket</li>
</ul>

