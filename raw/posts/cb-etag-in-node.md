---
title: Etag缓存在PHP和NodeJS中的实现
categories:
  - 前端杂烩
  - 网络交互
tags:
  - tech
  - cnblogs
  - Etag
  - PHP
  - NodeJS
date: 2014-05-11 07:26:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2014/05/11/etag-in-node.html" target="_blank">博客园</a>.</div>

<p>HTTP 提供了许多页面缓存的方案，其中属 Etag 和 Last-Modified 应用最广。本文会先介绍 Etag 的应用场景，然后说说他在 php 和 node 中的使用。</p>
<h3>一、Etag的使用</h3>
<p>客户端和浏览器之间的交互：</p>

```
+---------+       1         +---------+
|         |---------------->|         |
|         |   2（200，OK）   |         |
|         |<----------------|         |
|    客   |    3（Etag）     |    服   |
|         |---------------->|         |
|    户   |    4（304）      |    务   |
|         |<----------------|         |
|    端   |    3（强制刷新）  |    端   |
|         |---------------->|         |
|         |   6（200，OK）   |         |
|         |<----------------|         |
+---------+                 +---------+
                <Created By Barret Lee>
```
<p>1. 客户端向服务器请求资源S</p>
<p>2. 服务器返回数据，并带上一个 Etag</p>
<p>3. 客户端再次请求资源S，由于上次服务器给他返回了一个 Etag，这次请求的时候他会带上这个 Etag</p>
<p>4. 服务器发现请求中包含 Etag，判断是否过期，没过期则返回 304 Not Modified</p>
<p>5. 客户端强制刷新（如chrome中ctrl+shift+R刷新页面），请求中剔除 Etag</p>
<p>6. 服务器未发现请求中包含 Etag，返回资源S，并带上一个 Etag</p>
<h3>二、代码实现</h3>
<p>第一次请求数据：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/05/11/111923172133405.jpg" data-source="http://images.cnitblog.com/i/387325/201405/111923172133405.jpg" alt=""></p>
<p>浏览器在接受到服务器发过来的 Etag 后，会保存下来，下次请求的时候会将它放在请求头中，其 key 值为 If-None-Match。</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/05/11/111923246041196.jpg" data-source="http://images.cnitblog.com/i/387325/201405/111923246041196.jpg" alt=""></p>
<p>服务器拿到 If-None-Match 之后，对比之前的 Etag，如果没变，则返回 304 Not Modified.</p>
<h4>1. php 中的 Etag</h4>

```
<?php
    $str = "Barret Lee";
    $Etag = md5($str);

    if(array_key_exists('HTTP_IF_NONE_MATCH', $_SERVER) and $_SERVER['HTTP_IF_NONE_MATCH'] == $Etag){
        header("HTTP/1.1 304 Not Modified");
        exit();
    } else {
        header("Etag:" . $Etag);
        echo $str;
    }
?>

```

<p>Etag 是一个字符串，我们一般使用该请求对应响应输出的 md5 值作为 Etag，可以简单地理解为文件的版本号。在 php 中存在两个获取 md5 的函数，一个是针对字符串的，就是 <code>md5()</code>，然后就是针对文件的， <code>md5_file()</code>。</p>
<p>首先判断在请求中是否包含 'HTTP_IF_NONE_MATCH' 这个 key，如果包含并且其值为之前的 md5 值，则返回 304，否则输出 Etag 以及内容。</p>
<h4>2. node 中的 Etag</h4>
<p>与 php 有些不同，从 $_SERVER 中拿到的内容是经过 apache 包装过的，而 node 获取的数据是最原始的。</p>

```
var hashStr = "A hash string.";
var hash = require("crypto").createHash('sha1').update(hashStr).digest('base64');

require("http").createServer(function(req, res){
    if(req.headers['if-none-match'] == hash){
        res.writeHead(304);
        res.end();
        return;
    }
    res.writeHead(200, {
        "Etag": hash
    })
    res.write(hashStr);
    res.end();
}).listen(9999);

```

<p>上面对 hashStr（输出的内容） 进行了简单的处理，并将其作为 Etag 放在 head 中输出，上面的代码一目了然，我就不解释了。</p>
<h3>三、小结</h3>
<p>Etag 在缓存处理中用的比较广泛，使用它可以减少一些不必要请求的带宽的占用。服务器输出的内容不变，浏览器就应该使用缓存，没必要每次都向服务器端索要数据，造成不必要的浪费。</p>
<p>从上面我们可以看到，如果想拿到 Etag，就必须先拿到要输出的数据，所以 Etag 只能减少带宽的占用，并不能降低服务器的消耗。如果是静态页面，可以判断文件最近一次的修改时间（Last-Modified），获取文件上次修改时间的消耗比拿到整个数据的消耗要小的多。所以很多时候 Etag 都是配合这 Last-Modified 一起使用的。</p>
<p>上面的 php 和 node 代码演示，很明显的差异就是，node 更加细致，或者说他更加底层，我们可以获取的几乎都是未加修饰的原始数据，从数据量的交互和可操控性来看，我更偏向于 node 的使用。</p>

