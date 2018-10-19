---
title: H5 Crash 研究
description: 我们知道，支撑页面在 webview 上良好运转的前提是具备一个高效并且稳定的 webview 容器，而容器的高效稳定不仅仅由容器提供方来保障，也需要容器使用者遵守一些基本准则，否则就有可能出现页面 Crash 的情况，这些准则是什么？什么样的上层代码会引起容器异常退出？这是本文需要阐述的内容
warning: true
mark: hot
categories:
  - 无线技术
  - 前端杂烩
tags:
  - H5
  - 无线
  - Crash
date: 2016-05-30 00:30:12
---


我们知道，支撑页面在 webview 上良好运转的前提是具备一个高效并且稳定的 webview 容器，而容器的高效稳定不仅仅由容器提供方来保障，也需要容器使用者遵守一些基本准则，否则就有可能出现页面 Crash 的情况，这些准则是什么？什么样的上层代码会引起容器异常退出？这是本文需要阐述的内容。

<!--more-->

### H5 Crash 问题概况

下图是 H5 Crash 的大致流程图：

![H5 Crash 流程图](/blogimgs/2016/05/30/TB1FCOOKXXXXXccXXXXXXXXXXXX-676-667.png)<!--<source src="//img.alicdn.com/tfs/TB1FCOOKXXXXXccXXXXXXXXXXXX-676-667.png">-->

由于前端没办法捕捉到页面 Crash 的状态和堆栈，但是 H5 页面上发生的错误会传递到 Java 和更底层的 Native 直到容器异常退出，在退出的那一刻，容器会将堆栈写入到日志中，当下次打开容器时（也可能是定时上报）就会上报这些堆栈信息。

### H5 Crash 原因初探

测试代码 [仓库地址](//github.com/barretlee/h5crash.git)：

```bash
git clone //github.com/barretlee/h5crash.git;
cd demo;
```

**注意：** 代码需要在 Webview 容器中测试，PC 浏览器下不会出现异常。

H5 Crash 的原因不太明显，但是从经验上判断和摸索，大致归类为以下三种：

**1. 内存问题**

- 测试方法：使用闭包，不断增加内存量，看看增加到哪个区间大小， webview 容器会出现异常
- 测试地址：<http://rawgit.com/barretlee/h5crash/master/demo/crash-memory.html>（微信、微博或者其他客户端打开该页面的用户，可以点进去测试下，选择 100M 内存，不出意外，你的客户端会闪退。）

```html
<script>
var Closure = function() {
  var _cache = [];
  var cache = 0;
  var add = function(size) {
    cache += size;
    size = size * 1024 * 1024;
    _cache.push(new Array(size).join('x'));
    refresh();
  };
  var refresh = function() {
    r.innerHTML = '内存消耗： ' + cache + 'M';
  };
  return {
    cache: cache + 'M',
    add: add,
    refresh: refresh
  }
};
var closure = Closure();
</script>

<button onclick="closure.add(1)">增加 1M 内存消耗</button>
<button onclick="closure.add(10)">增加 10M 内存消耗</button>
<button onclick="closure.add(20)">增加 20M 内存消耗</button>
<button onclick="closure.add(50)">增加 50M 内存消耗</button>
<button onclick="closure.add(100)">增加 100M 内存消耗</button>

<div id="r">内存消耗：0 M</div>
```

- 存在的干扰：这种测试存在比较多的干扰，比如设备类型、系统类型（iOS/Android)、和设备内存运行状态等。

**2. Layers 数问题**

Layers 数的获取比较麻烦，Chrome Driver 没有提供该数据的接口，目前也没有比较好的办法拿到这个数据。

- 测试方法：通过不同的方式创建层，观察页面的 Crash 情况
- 测试地址：<http://rawgit.com/barretlee/h5crash/master/demo/crash-layer.html>

```html
<style>.transform {
  transform: translateZ(0);
}
.animation {
  width:100px;
  height:100px;
  background:red;
  position:relative;
  animation:move 5s infinite;
}

@keyframes move {
  from {left:0px;}
  to {left:200px;}
}
</style>
<script>
var Layer = function() {
  function getType() {
    return document.querySelector('input:checked').value;
  };
  return {
    createOne: function(index) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(index));
      switch(getType()) {
        case 'opacity':
          div.style.cssText = "opacity:" + (index / 1000);
          break;
        case  'transform':
          div.className = 'transform';
          break;
        case  'animation':
          div.className = 'animation';
          break;
        case  'zindex':
          div.style.cssText = "position:relative; z-index:" + index;
          break;
      }
      document.body.appendChild(div);
    },
    create: function(num) {
      [].slice.call(document.querySelectorAll('div')).forEach(function(item) {
        item.parentNode && item.parentNode.removeChild(item);
      });
      while(num--) {
        this.createOne(num);
      }
    }
  }
};
var layer = Layer();
</script>

<strong>层类型: </strong>
<ul>
  <li><label><input type="radio" checked name="type" value="opacity"> <span>通过 opacity 创建层</span></label></li>
  <li><label><input type="radio" name="type" value="transform"> <span>通过 transforms 创建层</span></label></li>
  <li><label><input type="radio" name="type" value="animation"> <span>通过 animation 创建层</span></label></li>
  <li><label><input type="radio" name="type" value="zindex"> <span>通过绝对定位分层</span></label></li>
</ul>

<button onclick="layer.create(1)">创建 1 个层</button>
<button onclick="layer.create(10)">创建 10 个层</button>
<button onclick="layer.create(20)">创建 20 个层</button>
<button onclick="layer.create(50)">创建 50 个层</button>
<button onclick="layer.create(100)">创建 100 个层</button>
<button onclick="layer.create(200)">创建 200 个层</button>
<button onclick="layer.create(500)">创建 500 个层</button>
<button onclick="layer.create(1000)">创建 1000 个层</button>
<button onclick="layer.create(2000)">创建 2000 个层</button>
<button onclick="layer.create(5000)">创建 5000 个层</button>
<button onclick="layer.create(10000)">创建 10000 个层</button>
```

- 实际上，创建多个层，也是对内存的巨大消耗，页面 Crash 可能还是因为内存消耗过大

**3. 并发过多问题**

- 测试方法：尝试并发发出多种不同的请求（Fetch请求、XHR 请求、Script/CSS 资源请求），观察页面 Crash 情况
- 测试地址：<http://rawgit.com/barretlee/h5crash/master/demo/crash-request.html>

```html
<script>
var Request = function() {
  function getType() {
    return document.querySelector('input:checked').value;
  };
  function getResource() {
    var type = getType();
    var resource = {
      fetch: '/',
      xhr: '/',
      script: '//g.alicdn.com/sd/data_sufei/1.5.1/aplus/index.js',
      css: '//g.alicdn.com/kg/global-util/1.0.3/index-min.css'
    };
    return resource[type];
  };
  return {
    emitOne: function() {
      var url = getResource() + "?_t=" + (new Date * 1 + Math.random());
      switch(getType()) {
        case 'fetch':
          return fetch('/');
        case 'xhr':
          with(new XMLHttpRequest) {
            open('GET', url);
            send();
          }
          return;
        case 'script':
          var s = document.createElement('script');
          s.src = url;
          document.body.appendChild(s);
          return;
        case 'css':
          var s = document.createElement('link');
          s.href = url;
          document.body.appendChild(s);
      }
    },
    emit: function(num) {
      [].slice.call(document.querySelectorAll('script,link')).forEach(function(item) {
        item.parentNode && item.parentNode.removeChild(item);
      });
      while(num--) {
        this.emitOne();
      }
    }
  }
};
var request = Request();
</script>

<strong>请求类型: </strong>
<ul>
  <li><label><input type="radio" checked name="type" value="fetch"> <span>使用 Fetch 发送请求</span></label></li>
  <li><label><input type="radio" name="type" value="xhr"> <span>使用 XHR 发送请求</span></label></li>
  <li><label><input type="radio" name="type" value="script"> <span>并发请求脚本资源</span></label></li>
  <li><label><input type="radio" name="type" value="css"> <span>并发请求样式资源</span></label></li>
</ul>

<button onclick="request.emit(1)">并发 1 个请求</button>
<button onclick="request.emit(10)">并发 10 个请求</button>
<button onclick="request.emit(20)">并发 20 个请求</button>
<button onclick="request.emit(50)">并发 50 个请求</button>
<button onclick="request.emit(100)">并发 100 个请求</button>
<button onclick="request.emit(500)">并发 500 个请求</button>
<button onclick="request.emit(1000)">并发 1000 个请求</button>
```

- 存在的干扰：设备的种类、设备的 CPU 使用情况和网络状况等。

### H5 Crash 测试结果

**测试结果：**

- 通过 opacity、animation、positon 等方式创建层，即便是 1w 个，页面也没有明显变化；但是使用 transform 创建 2k~5k 个层，页面会卡顿几秒后立即闪退；
- 内存是条红线，测试发现，一次性消耗 20M 的内存，会导致客户端立即闪退；
- 并发请求也是存在响应问题的，Fetch API 和 CSS Resource 并发 1k 请求没有出现问题，但是 XHR 和 Script Resource 请求，问题特别明显，虽然没有导致页面闪退，但是页面已经进入了假死状态。

以上临界值还可以继续精确。

### 小结

本文主要是对 H5 Crash 做了一个预研，测试可能存在诸多误差，测试方法也需要改进，不过沿着这些的思路考究会比较容易找到结论。

后续会给出比较有意义的边界数据以及探测工具。
