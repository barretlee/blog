---
title: Javascript本地储存（3）：离线web应用
categories:
  - JavaScript
  - 杂物间
tags:
  - tech
  - cnblogs
warning: true
date: 2013-03-30 01:03:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/03/30/javascript-applicationcache.html" target="_blank">博客园</a>.</div>

<p>　　前两篇文章分别介绍了<a title="javascript cookie" href="http://www.cnblogs.com/hustskyking/archive/2013/03/27/javascript-cookie.html" target="_blank">Cookie应用</a>和<a title="userdata and localstorage" href="http://www.cnblogs.com/hustskyking/archive/2013/03/28/javascript-userdata-and-localstorage.html" target="_blank">另一种本地储存方式</a>，无论是cookie、userData还是localStorage都是一段保存在客户端磁盘的一段文本，他们可以被主动删除，但是本文要讲的\应用程序缓存"是HTML5中新增的一个技术，他允许web应用将应用程序自身本地保存到用户的浏览器中，他是不会随着用户清楚浏览器缓存而被清除的。</p>
<blockquote>不像localStorage和sessionS只是保存web应用程序相关的数据，他是将应用程序本身保存起来&mdash;&mdash;应用程序所需运行的所有文件（HTML、CSS、JavaScript、图片等）。&mdash;&mdash;《Javascript权威指南（第六版）》Page-594</blockquote>
<p>　　\应用程序缓存"真正意义上不是\"缓存，更好的说法应该称之为\应用程序存储"。</p>


<h3>Introduction [简单介绍]</h3>
<p>　　通过在应用程序主HTML页面的&lt;html&gt;标签中设置manifest属性，只想到清单文件就行了。这里的清单文件就是，将要缓存的文件列表。</p>

```
<!DOCTYPE HTML>
<html manifest="myapp.appcache">
　　<head>...</head>
　　<body>...</body>
</html>

```

<p>　　清单文件格式也是有要求的，他的杭寿必须以\CACHE MANIFEST"字符串开始，其余就是要缓存的文件URL列表，一行一个URL。</p>

```
CACHE MANIFEST
#上一行表示此文件是一个清单文件。本行为注释

#下面的内容都是应用程序依赖的资源文件的URL
myapp.html
myapp.js
myapp.css
images/backgorund.png

```

<p>　　有人可能会问了：那清单文件一定要以appcache作为未见的扩展名么？　　答案是否定的，web服务器真正识别清单文件的方式是通过"text/cache-manifest"这个MIME类型的一个清单。如果服务器将清单文件的Content-Type的头信息设置成其他MIME类型，那就不会缓存应用程序了，因此，肯呢过需要对web服务器做一定的配置来使用这个MIME类型，比如在web应用目录下创建Apache服务器的一个.htaccess文件。</p>
<h3>More [更多介绍]</h3>
<p><strong>1.复杂的清单</strong></p>
<p>　　先给个清单：</p>

```
CACHE MANIFEST

CACHE:
myapp.html
myapp.css
myapp.js

FALLBACK
video/ offline_help.html

NETWORK:
cgi/

```

<p>　　"CACHE"应该是不用细说了。　　"NETWORK"： 标识了该ＵＲＬ中的资源从不缓存，总要通过网络获取。　　"FALLBACK"：区域中的清单项每行都包含两个URL，第二个URL是指需要加载和存储在缓存中的资源，第一个URL是一个前缀。任何能够匹配到这个前缀的URL都不会缓存起来，但是可能的haunted，他们会从网络中载入。如果从网络中载入这样一个URL失败的话，就会使用第二个URL指定的缓存资源来代替，从缓存中获取。</p>
<p>　　想想一个web应用包含一定数量的视频教程，这些视频都很大，显然把他们缓存在本地是不合适的，因为，在离线状态心爱，通过清单文件中的fallback区域，就可以使用一些急于文本的帮助文件来代替了。</p>
<p><strong>2.缓存的更新</strong></p>

```
CACHE MANIFEST
# MyApp version 1 (更改这个数九就可以让浏览器重新下载这个文件)
Myapp.html
Myapp.js

```

<p>　　浏览器在检查清单文件以及更新缓存的操作是异步的，可能是在从缓存中载入应用之前，也可能同时进行。　　浏览器在更新缓存过程中会触发一系列事件，可以通过注册处理程序来跟踪这个过程同时提供反馈给用户。如下：</p>

```
applicationCache.onupdateready = function(){
    var reload = confirm("发现一个新版本，需要刷新页面，点击确定刷新。");
    if(reload) locatiuon.reload();
}

```

<p>　　注：只有支持应用程序缓存的浏览器才会有applicationCache属性，当然除了上面例子的updateready时间之外，还有其他7中应用程序缓存时间可以监控。</p>

```
var appCache = window.applicationCache;

function logEvent(e) {
    console.log(e);
}

function logError(e) {
    console.log(\error " + e);
};

appCache.addEventListener("cached", logEvent, false);
appCache.addEventListener("checking", logEvent, false);
appCache.addEventListener("downloading", logEvent, false);
appCache.addEventListener("error", logError, false);
appCache.addEventListener("noupdate", logEvent, false);
appCache.addEventListener("obsolete", logEvent, false);
appCache.addEventListener("progress", logEvent, false);
appCache.addEventListener("updateready", logEvent, false);

```



<h3>Related blog [相关博文]</h3>
<p>　　<a class="titlelink" href="http://www.cnblogs.com/hustskyking/archive/2013/03/27/javascript-cookie.html">JavaScript本地储存（1）：cookie在前端</a></p>
<p>　　<a class="titlelink" href="http://www.cnblogs.com/hustskyking/archive/2013/03/28/javascript-userdata-and-localstorage.html">JavaScript本地储存（2）：userData和localStorage</a><span>&nbsp;</span></p>


<h3>Reference [参考资料]</h3>
<p>　　1.《JavaScript权威指南（第六版）》&mdash;&mdash; 淘宝团队翻译&nbsp;&nbsp; <a title="当当地址" href="http://product.dangdang.com/main/product.aspx?product_id=22722790" target="_blank">当当</a></p>
<p>　　2. <a title="about applicationCache" href="http://www.kuqin.com/webpagedesign/20111217/316394.html" target="_blank">other</a></p>

