---
title: 走进 phantomjs 嵌入式测试
description: Google 上搜索了下 phantomjs 关键词，展示最多的是测试和截屏相关的内容。phantomjs 提供了大量的 API，让我们可以操作 webkit 网页沙箱中的内容，也可以将网页中的信息输出到外层，进行分析处理。而本文着重要讲述的是，如何更好的与 webkit 网页沙箱交互，如何注入脚本，如何修改请求。
warning: true
categories:
  - 工具
  - 前端杂烩
  - 网络交互
  - JavaScript
tags:
  - phantomjs
date: 2015-09-25 10:21:30
---


Google 上搜索了下 phantomjs 关键词，展示最多的是测试和截屏相关的内容。phantomjs 提供了大量的 API，让我们可以操作 webkit 网页沙箱中的内容，也可以将网页中的信息输出到外层，进行分析处理。而本文着重要讲述的是，如何更好的与 webkit 网页沙箱交互，如何注入脚本，如何修改请求。

<!--more-->

QA 测试最烦恼的是 UI 测试，包括网页元素的正确呈现，网页交互之后的元素变化等，人工测试很容易疏忽一些问题，并且 UI 层面的测试用例也不好写，这让人很头痛。为了让程序能够很好地分析页面 UI，也有很多人做了图片对比工具，通过 phantomjs 提供的 screen capture 功能，定时抓取页面截图，或者在不同的场景下抓取同一个页面的截图，在时间维度和空间维度上对页面图片做对比分析，做监控警报等。技术成本不是很高，但是为了个性需求需要做很多额外的工作。

### 事件就是精确插入点

为了能够在精确的时间点注入测试脚本，我们需要了解下 phantomjs 在请求资源时会发生哪些事件，毕竟它也是一个事件驱动模型。

- `onInitialized` 类似于我们发送 ajax 请求，状态为 0 的时候
- `onLoadStarted` 准备加载网页，此时页面的 `page.content` 是存在的，内容为 `<html><body></body></html>`
- `onLoadFinished` 页面加载完成，是 `DOMContentLoaded` 还是 `window.onload`，我稍微测试了下，感觉应该是后者
- `onResourceRequested` 请求资源，如 css、js 等
- `onResourceReceived` 请求的资源已到达
- `onClosing` 关闭页面
- `onConsoleMessage` 沙箱内的 console 内容是不会出现到外层的，通过这个函数可以输出

还有很多，具体可以翻阅文档: <http://phantomjs.org/api/webpage/>。这些事件都是打开一个页面之后的实例化对象上的：

```javascript
var page = require('webpage').create();
// 事件监听
page.onxxxx();
page.open(url, function(){});
```

用惯了 nodejs 的同学，可能会很自然的在代码里头写 

```javascript
var page = require('webpage').create();
// phantomjs API 没有这些东西
var http = require('http');
```


我们需要搞清楚的是 phantomjs 是一个基于 webkit 内核的 JS API，webkit 包含两方面，一个是 webCore 解析 html，一个是 V8 解析和运行 javascipt，phantomjs 包含了 webkit 和基于 webkit 的 js 封装，相比单纯的 webkit 它提供了更多的 API。而 nodejs 是对 v8 的封装，在 v8 上做了一些上层建筑。要搞清楚 phantomjs 和 nodejs 之间的界限。

实际上，phantomjs 自己也做了一些类似 nodejs 的 API 包装，比如 webserver、child_process、FileSystem 等等，这些 API 可以让我们很方便的操作网络 IO 和系统进程。

### 注入代码测试

嵌入式指的是，将测试代码嵌入到 phantomjs 的沙箱之中，然后通过它提供的 API 将测试数据导出来，那么，如何将数据插入进去？

**1. includeJS/injectJS注入文件**

两个函数都可以网沙箱内注入代码，区别是 `includeJS` 主要用于注入一个远程的脚本，如：

```javascript
var webPage = require('webpage');
var page = webPage.create();

page.includeJs('http://code.jquery.com/jquery-1.10.2.min.js', function() {
  // 模拟登录
  var $testForm = $('form#login');
  $testForm.find('input[name="username"]').value('barret');
  $testForm.find('input[name="password"]').value('1234');
  $testForm.submit();
});
```

**2. evaluate注入代码**

而 `injectJS` 主要用于注入本地的文件，在做测试的时候，这个函数的使用频率稍高一些。很多的测试平台都是在线的，并且支持在线编写测试用例，最后生成的脚本地址当然也是网络可访问的，那么这个时候用 `includeJS` 就略微方便一些啦。

上面两种方式是想容器内注入可执行稳紧啊。除此之外，我们还可以使用 `evaluate` 直接注入可执行的脚本内容，如：

```javascript
var webPage = require('webpage');
var page = webPage.create();

page.open('http://www.taobao.com', function(status) {
  var title = page.evaluate(function() {
    return document.title;
  });
  console.log(title);
  phantom.exit();
});
```

这种方式有点类似于我们在 chrome devtoos 的控制台中输入代码进行测试。

### 搬出数据

注入代码拿到输出之后，我们需要将数据拿出来，在运行的环境中，可以通过如下手段将数据搬出来。

**1. 多开几个 webserver**

上面提到，phantomjs 提供了 webserver 方面的 API，我们可以在注入的代码中：

```javascript
// part of inject.js
$.post("http://localhost:10220", data, function(){
  // code..
})
```

向外部通讯，而我们在外部也准备好了接驾代码：

```javascript
// part of server.js
var server = require('webserver').create();
var port = 10220;
server.listen(port, function(req, res){
  console.log(JSON.stringify(req, null, 2));
  // coding...
})
```

所以 http 是个好东西，我们可以控制 web 的 server（沙箱外） 和 client（沙箱内），那么数据通讯就不是问题了。

**2. callPhantom 函数**

phantomjs 的 webpage 对象提供了一个 `onCallback` 函数，这个函数能够听到沙箱内一个叫做 `callPhantom` 函数的呐喊。`callPhantom` 是 phantomjs 在 window 上扩展的函数，他的使用：

```javascript
var page = require("webpage").create();
page.onCallback = function(msg) {
    console.log("这是沙箱说的话: " + msg);
    return "嘿，沙箱，我听到了！";
};
page.evaluate(function() {
    // Return-value of the "onCallback" handler arrive here
    var callbackResponse = window.callPhantom("嘿，外壳，我是沙箱~");
    console.log("这是外壳说的话: " + callbackResponse);
});
```

所以一切都是那么简单！知道了这些之后，还有啥事我们办不成的呢？！

### 小结

`Jasmine` 和 `QUnit` 是两套用的比较多的测试框架，我们可以使用上面任一种方式进行测试开发。

自动化测试少不了这些有用的工具，这些工具能够让我们在网页初始化的任何阶段注入测试代码，所以我们可以写好一堆测试用例，作为持续集成的测试库，让上线的代码更安全、更干净！
