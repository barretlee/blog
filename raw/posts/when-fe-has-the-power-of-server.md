---
title: 当前端也拥有 Server 的能力
description: 今天看了不少文章，比较感兴趣的是 Cache API。它是浏览器 Request/Response 的缓存管理工具，其使用风格和运用场景让我瞬间联想到了 ServiceWorker 和 Fetch API，相信很多同学也多次看到过这两个东西，本文会对它们做一个简洁的介绍，并谈一谈我对这些新玩具的看法。
warning: true
mark: hot
categories:
  - 前端杂烩
  - 网络交互
  - JavaScript
tags:
  - Cache
  - ServiceWorker
  - Fetch
date: 2016-02-16 20:00:00
---


今天看了不少文章，比较感兴趣的是 Cache API。它是浏览器 Request/Response 的缓存管理工具，其使用风格和运用场景让我瞬间联想到了 ServiceWorker 和 Fetch API，相信很多同学也多次看到过这两个东西，本文会对它们做一个简洁的介绍，并谈一谈我对这些新玩具的看法。

<!--more-->

### Fetch API

传统的 XMLHttpRequest，出了两个版本，在 XHR2.0 中引入了跨源请求、上传进度事件和对二进制数据的支持等，这些 API 的增强让 AJAX 可以很方便地与 HTML5 API 相结合，例如 File System API、Web Audio API、WebGL 等，让前端对音视频的处理和富客户端元素的处理更加有亲和力。

作为一个与后端交互的通道，XHR2.0 的接口封装依然过于底层。看看 jQuery 对 AJAX 的封装，再回头看看我们今天要介绍的 Fetch API，不得不惊叹，浏览器已经在应用层面思考着功能的拓展，依托着 Promise 产出了十分友好的新一套接口。

以前我们使用 XHR 去请求一个资源，会这么做：

```javascript
// Just getting XHR is a mess!
if (window.XMLHttpRequest) {
  request = new XMLHttpRequest();
} else if (window.ActiveXObject) {
  try {
    request = new ActiveXObject('Msxml2.XMLHTTP');
  } 
  catch (e) {
    try {
      request = new ActiveXObject('Microsoft.XMLHTTP');
    } 
    catch (e) {}
  }
}
request.onreadstatechange = function(){
  // handle data;
};
request.open('GET', 'http://barretlee.com/test.json', true);
request.send(null);
```

而使用 Fetch API，我们只需要：

```javascript
fetch('http://barretlee.com/test.json').then(function(response) { 
  // Convert to JSON
  return response.json();
}).then(function(val) {
  console.log(val); 
});
```

对于 Text/HTML 和 Blob 等格式的请求和转化也是异常方便：

```javascript
// Text/HTML 请求
fetch('/next/page').then(function(response) {
    return response.text();
}).then(function(text) {
  console.log(text); 
});

// Blob 流
fetch('flowers.jpg').then(function(response) {
  return response.blob();
}).then(function(blob) {
  document.querySelector('img').src = URL.createObjectURL(blob);
});
```

Fetch API 让我们更加关注请求和响应之间的交互，而不是聚焦在如何请求和如何处理响应两个问题上。

当然，它也存在几个相比 XHR 不足的地方，首先它不能 abort 请求，同时也不能获取请求过程中的 progress 状态，当然也没有 timeout 超时处理。Fetch API 是基于 Promise 的，而 Promise 的状态只有 pending、resolve、reject，不会出现诸如 pending(80%) 的状态提示；我们也无法对一个 Promise chains 做 abort 处理，这些都是能够理解并且接受的。

我也相信，Fetch API 有能力提供这些状态信息和附加的 API，只是在这个不成熟的环境下，它目前不需要迈这么大的步子。

### ServiceWorker

ServiceWorker，简单而言就是一个放在前端的 HTTP 拦截器，比如我们要请求一个不存在的 URI 如：`/test/a.html`，直接请求就会响应 404，而如果我们预先在 ServiceWorker 中注册了这个地址，并且指定响应内容，当再次请求时，你会看到结果是存在的，举个例子：

```html
<!-- demo.html -->
<script>
navigator.serviceWorker.register("worker.js", {
  scope: "/test/a.html"
}).then(function(){
  fetch(‘/test/a.html’).then(function(response) {
    return response.text();
  }).then(function(text) {
    console.log(text); 
  });
});
</script>
```
在 demo.html 文件中，我们看到，将 `/test/a.html` 的请求交给 `worker.js` 来处理，处理方式为：

```javascript
// workker.js
addEventListener("fetch", function(evt) {
  evt.respondWith(new Response(“Hi, Barret Lee”));
});
```

在 `demo.html` 的回调中使用 Fetch  获取`/test/a.html` 这个并不存在的内容，被 ServiceWorker 捕获，交给 `worker.js` 处理并响应 `Hi, Barret Lee` 的文本，整个设计思路十分清晰，很轻松地拦截了来自客户端的请求，并作出了响应。

由于 ServiceWorker 是对 Promise 友好的，响应时也可以模拟服务器休眠状态：

```javascript
addEventListener("fetch", function(evt) {
  evt.respondWith(new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve(new Response(“Hi, Barret Lee”));
    }, 1000);
  }));
});
```

由于 Fetch API 提供了对 Header 头的修改，我们几乎可以利用 ServiceWorker 实现真实 HTTP Server 的基本功能。

ServiceWorker 一定程度上改变了 Web 协作的交互模式，传统情况下，我们需要开启一个 Web Server，或者让其他人提供 HTTP Server，前后端之间交互，沟通成本比较高。而 ServiceWorker 把 HTTP Server 搬到了客户端，我们可以在浏览器上轻松 Hold 住两端的操作。这也算是 Web 技术栈融合的表现吧。

当我们的目光放在 HTTP 的交互上，ServiceWorker 会有无限的想象空间，比如对 History API 的延伸思考，跨页面共享问题，前端请求合并和分拆问题，mock 数据问题，前后端的联调问题，类 graphQL 问题，数据的缓存更新和复用问题等等。

### Cache API

Cache API，简而言之就是一个 Request/Response 的缓存对象组，它的生命周期跟 ServiceWorker 是紧密相连的，它没有失效时间，不删除就会一直保持原样。

```javascript
caches.open('test-cache').then(function(cache) {
  cache.add('/index.html');
});
```

一个简单的操作，就将 `/index.html` 这个页面缓存了下来，如果你使用的是最新版的 Chrome，可以打开 DevTools > Resources > Cache Storage，多了一个 `test-cache` 的缓存表，表中多出一项，Request 为 `http://barretlee.com/index.html`, Response 为 `OK`。如下方式可以查看缓存内容：

```javascript
caches.open('test-cache').then(function(cache) { 
  cache.keys().then(function(cachedRequests) { 
    console.log(cachedRequests);
  });
});
```

当浏览器处于 idle（空闲） 状态的时候，会将 Cache 资源预加载到本地。这也让我想起了 link 标签中有一个 prefetch 功能，也会有同学想到 Manifest，不过这两个东西都是不能友好控制的，而 Cache 给我们带来了这样的便利。

### 小结

我一直相当看好 Fetch API 系列相关的新接口，它的特点也很清晰，首先是基于 Promise 的实现，这个实现解决了回调和状态控制的问题，然后是提供了应用级别的接口访问，现在可以把一个 HTTP 请求作为可控的对象随意操作，无论是 Request 还是 Response 都在我们的掌握之中，同时也一定程度解决了跨页面资源共享的问题（至于跨页面通讯，我们有 postMessage 和 MessageChannel 等工具）。

目前浏览器对 Fetch API 和 ServiceWorker 的支持都是比较可观的，虽然 W3C 上的文档状态还是 Draft 模式，相信随着我们对业务需求的更加明确，对前端认知的的不断深入，这些东西将很快被定为 RFC。

本文没有对 API 的使用做深入的说明，一方面是因为这些东西能在 Google 上找到，其次，我觉得有些 API 的设计上还不够成熟，今后会有增删，感兴趣的同学可以去 W3C 提供的文档中深入学习下。


### 拓展阅读

- http://www.html5rocks.com/zh/tutorials/file/xhr2/
- http://www.web-tinker.com/article/20882.html
- http://davidwalsh.name/fetch
- http://developer.mozilla.org/en-US/docs/Web/API/Cache
- http://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

