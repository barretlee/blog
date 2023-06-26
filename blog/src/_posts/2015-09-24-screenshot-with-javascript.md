---
title: 使用 JavaScript 截屏
description: 经常在微博上看到很多内容使用的什么长微博截图，并且截图上还附加了很多其他的信息。之前对纯前端截图有些研究，正好本博客有这个需求，今天就把这东西实现了下。
warning: true
categories:
  - 前端杂烩
  - JavaScript
tags:
  - JavaScript
  - 截屏
  - html2cavans
mark: hot
date: 2015-09-24 22:27:13
---


经常在微博上看到很多内容使用的什么长微博截图，并且截图上还附加了很多其他的信息。之前对纯前端截图有些研究，正好本博客有这个需求，今天就把这东西实现了下。

<!--more-->

需要声明的是，JavaScript 目前还不能实现网页截屏，就算以后能够实现，也一定是浏览器提供了相关接口，JS 去调用这些接口。既然不能截屏，那我们能做的只有通过拿到像素点的信息来"拼凑"图片。

### 先说说我们看到的截屏方式

用过 phantomJS 的同学都知道，它提供了一个截屏函数，通过它可以整屏获取页面截图，而且他支持的格式也比较多：JPG/PNG/GIF/PDF。通过简单的两句命令就可以把一个网页截取下来：

```javascript
// render.js
var webPage = require('webpage');
var page = webPage.create();

page.viewportSize = { width: 1920, height: 1080 };
page.open("http://www.taobao.com", function start(status) {
  page.render('taobao_home.jpeg', {format: 'jpeg', quality: '100'});
  phantom.exit();
});
```

安装 phantomjs 之后执行下上面的文件：

```bash
phantomjs render.js
```

你会发现，一张宽度很窄的淘宝首页图就保存到了同目录下的 `taobao_home.jpeg` 中。也有同学使用 phantomjs 做了很多有意思的东西，比如每隔 100ms 截图，然后对比图像之间的差异，分析网页的加载情况和性能问题，甚至做网页的监控。好吧，话题收回来，继续说说其他的截屏方式，关于 phantomjs 可以移步到[官网](http://phantomjs.org/)学习。

### 前端截屏方案

能够导出图片的，目前只有 canvas。页面上的元素，除了图片、视音频、SVG等，其他都是文字，都可以使用 css 样式变换出来。我们知道，在 canvas 中是可以绘制图片和文字的，那么问题就很好解决了。

- 遍历页面的所有元素，提取DOM数
- 获取渲染之后的每个 DOM 节点的内联、外链 CSS 属性
- 将样式转换成 canvas 的属性，利用 offset 等属性辅助摆放位置，将节点对应到 canvas 上

这个方案比较粗糙，但是对于简单的页面，以上操作就能导出一张几乎与原状一模一样的图片。当然，我们想到的，也有人实现出来了，`html2canvas` 就是一个关注度很高的 js 截屏库，它考虑的内容会更多更全面。比如：

![截屏分享](/blogimgs/2015/09/24/20150904_0187d488.jpg)

我博客左侧的微博小图标，hover 上去有一个微博分享，这里我就使用了这个库截取博客全文视图（考虑小屏手机，我把宽度设置成 480，比较窄），其实现是很简单的：

```javascript
html2canvas(document.body).then(function(canvas) {
   canvas.id = 'screenshotCanvas';
   document.body.appendChild(canvas);
});
```

此时，页面的截图已经 append 到了 body 中。canvas 提供了导出图片的函数：

```javascript
var can = documeng.getElementById("screenshotCanvas");
var imgDataURI = can.toDataURL('image/png');
```

我们也可以将到处的内容转化成一个 blob 流，这样就能直接通过 URI 地址来访问了。

### 原始需求是将图片分享出去

无论是 dataURI 还是还是 blob 流，他们都没办法当做一个 URL 在网络上访问，所以当我使用微博分享（附加图片分享）的时候，图片总是拿不到。

```javascript
var shareUrl = "http://service.weibo.com/share/share.php?appkey=YOUR_APP_KEY&title=" 
    + title + "&url=" + url + "&searchPic=false&style=simple&pic=" 
    + picUrl;
```

这里的 picUrl 必须是一个 http 可请求到的地址，实在是无奈呀，在 [coding.net](http://coding.net) 写了一个小应用，用来临时储存图片（10分钟之后删除上传图片），有需要的可以试用下：

- 源码地址：<http://github.com/demo-platform/resolve-blob>
- Demo地址：<http://tmpfile.coding.io>

JQuery 用户可以这样搞：

```javascript
var fd = new FormData();
fd.append("img", imgBlob);
$.ajax({
  type: "POST",
  url: "http://tmpfile.coding.io/img",
  dataType: 'json',
  data: fd,
  crossDomain: true,
  processData: false,
  contentType: false,
  success: function(data){
    if(data && data.path) {    
      console.log("http://tmpfile.coding.io/tmp" + data.path);
    }
  }
});
```

### 小结

只要能拿到原始图，之后的加工处理都是比较简单的。比如如何实现画框截取某个区域的图形，思路就是截取整图，记住鼠标按下和抬起的两个点，然后从整图中抠出来就搞定了。在 QQ 空间发表说说的地方有提供截屏工具，这是因为腾讯在电脑上安装了插件，并且提供了对应的 JS 接口，JS 是没有能力直接截屏的。

好吧，了解原理就好，人家有现成的库可以用，咱们不要动不动就造轮子，不好玩。
