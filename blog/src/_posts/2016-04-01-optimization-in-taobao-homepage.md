---
title: 淘宝首页性能优化实践
description: 代码的性能优化是一个精细活，如果你要在一个庞大的未经优化的页面上做性能优化，可能会面临一次重构代码。本文从淘宝首页个性化引出的问题出发，从微观到宏观讲述了页面的优化实践，提出了几条可以借鉴的「黄金法则」，希望对你有所启发，后续会继续给大家带来淘宝首页稳定性保障的分享。
warning: true
mark: hot
categories:
  - 前端杂烩
tags:
  - 淘宝首页
  - 性能优化
date: 2016-04-01 20:11:00
---

上文 [《一起来看看淘宝首页的个性化》](http://www.barretlee.com/blog/2016/03/31/personality-in-taobao-home-page/) 中，带大家看了下弥散着个性化味道的新首页，前端面临着：

- 数据来源多
- 串行请求渲染一个模块
- 运营数据和个性化数据匹配和管理
- 数据兜底容灾

等多个问题。<!--more-->本次淘宝首页改版，虽已不再支持 IE6 和 IE7 等低版本的古董浏览器，但是依然存在多个影响首页性能的因素：

- <b>依赖系统过多</b>，数据的请求分为三块，其一是静态资源（如 js/css/image/iconfont 等）；其二是推到 CDN 的静态数据（如运营填写的数据、前端配置信息等）；其三是后端接口，不同的模块对应不同的业务，而且页面中还有不少的广告内容，粗略估计页面刚加载时首屏发出的接口请求就有 8 个，滚到最底下，得发出 20 多个请求。
- <b>无法直接输出首屏数据</b>，首屏很多数据是通过异步请求获取的，由于系统限制，这些请求不可避免，而且请求个数较多，十分影响首屏时间。
- <b>模块过多</b>，为了能够在后台隔离运营之间填写数据的权限，模块必须做细粒度的拆分，如下图所示：
![多模块的拆分](/blogimgs/2016/04/01/TB1W6IyLVXXXXbQaXXXvLv21FXX-1846-1074.png_800x800.jpg)<!--<source src="http://gtms01.alicdn.com/tps/i1/TB1W6IyLVXXXXbQaXXXvLv21FXX-1846-1074.png_800x800.jpg">-->
一个简单的模块必须拆分成多个行业小模块，页面中其他位置也是如此，而且这些被拆分出来的模块还不一定会展现出来，需要让算法告诉前端展示哪些模块。
- <b>图片过多</b>，翻页往下滚动，很明显看到，页面整屏整屏的图片，有些图片是运营填写，有些图片由个性化接口提供，这些图片都没有固定的尺寸。

### 网页性能衡量指标

网页性能衡量指标有很多，倘若能够把握关键的几个，集中优化，性能自然也就上去了。

#### FPS

最能反映页面性能的一个指标是 FPS（frame per second），一般系统设定屏幕的刷新率为 60fps，当页面元素动画、滚动或者渐变时绘制速率小于 60，就会不流畅，小于 24 就会卡顿，小于 12 基本认定卡爆了。

1 帧的时长约 16ms，除去系统上下文切换开销，每一帧中只留给我们 10ms 左右的程序处理时间，如果一段脚本的处理时间超过 10ms，那么这一帧就可以被认定为丢失，如果处理时间超过 26ms，可以认定连续两帧丢失，依次类推。我们不能容忍页面中多次出现连续丢失五六帧的情况，也就是说必须想办法分拆执行时间超过 80ms 的代码程序，这个工作并不轻松。

页面在刚开始载入的时候，需要初始化很多程序，也可能有大量耗时的 DOM 操作，所以前 1s 的必要操作会导致帧率很低，我们可以忽略。当然，这是对 PC 而言，Mobile 内容少，无论是 DOM 还是 JS 脚本量都远小于 PC，1s 可能就有点长了。

#### DOMContentLoaded 和 Load

DOM 加载并且解析完成才会触发 DOMContentLoaded 事件，倘若源码输出的内容过多，客户端解析 DOM 的时间也会响应加长，不要小看这里的解析时间，如果 DOM 数量增加 2000 个并且嵌套层级较深，解析时间也会相应增加 50-200ms，这个消耗对大多数页面来说其实是没必要的，保证首屏输出即可，后续的内容只保留钩子，利用 JS 动态渲染。

Load 时间可以用来衡量首屏加载中，客户端接受的信息总量，如果在首屏中充满了大尺寸图片或者客户端与后端建立连接次数较多，Load 时间也会相应被拖长。

#### 流畅度

流畅度是对 FPS 的视觉反馈，FPS 值越高，视觉呈现越流畅。为了保障页面的加载速度，很多内容不会在页面打开的时候全部加载到客户端。这里提到的流畅度是等待过程中的视觉缓冲，如下方是 Google Plus 页面的一个效果图：

![Google Plus Item](/blogimgs/2016/04/01/TB1CbQPLVXXXXauXFXXIrP49pXX-446-537.gif)<!--<source src="http://gtms04.alicdn.com/tps/i4/TB1CbQPLVXXXXauXFXXIrP49pXX-446-537.gif">-->

墙内访问 google 的速度不是很快，上面元素中的的很多内容都是通过异步方式加载，而从上图可以看出 Google 并没有让用户产生等待的焦虑感。

### 淘宝首页的性能优化

由于平台限制，淘宝首页面临一个先天的性能缺陷，首屏的渲染需要从 7 个不同的后端取数据，这些数据请求是难以合并的，如果用户屏幕比较大，则首屏的面积也比较大，对应的后端平台数据接口就更多。数据是个性化内容或者为广告内容，故请求也不能缓存。

#### 关键模块优先

不论用户首屏的面积有多大，<b>保证关键模块优先加载</b>。下面代码片段是初始化所有模块的核心部分：

```javascript
$('.J_Module').each(function(mod) {
  var $mod = $(mod);
  var name = $mod.attr('tms');
  var data = $mod.attr('tms-data');
  if($mod.hasClass('tb-pass')) {
    Reporter.send({
      msg: "跳过模块 " + name
    });
    return;
  }
  // 保证首屏模块先加载
  if (/promo|tmall|tanx|notice|member/.test(name)) {
    window.requestNextAnimationFrame(function(){
      // 最后一个参数为 Force, 强制渲染, 不懒加载处理
      new Loader($mod, data, /tanx/.test(name));
    });
  } else {
    // 剩下的模块进入懒加载队列
    lazyQueue.push({
      $mod: $mod,
      data: data,
      force: /fixedtool|decorations|bubble/.test(name)
    });
  }
});
```

TMS 输出的模块都会包含一个 `.J_Module` 钩子，并且会预先加载 js 和 css 文件。

对于无 JS 内容的模块，会预先打上 `tb-pass` 的标记，初始化的时候跳过此模块；对于首屏模块关键模块，会直接进入懒加载监控：

```javascript
// $box 进入浏览器视窗后渲染
// new Loader($box, data) ->
datalazyload.addCallback($box, function() {
  self.loadModule($box, data);
});

// $box 立即渲染
// new Loader($box, data, true) ->
self.loadModule($box, data);
```

除必须立即加载的模块外，关键模块被加到懒加载监控，原因是，部分用户进入页面就可能急速往下拖拽页面，此时，没必要渲染这些首屏模块。

非关键模块统一送到 `lazyQueue` 队列，没有基于将非关键模块加入到懒加载监控，这里有两个原因：

- 一旦加入监控，程序滚动就需要对每个模块做计算判断，模块太多，这里可能存在性能损失
- 如果关键模块还没有加载好，非关键模块进入视窗就会开始渲染，这势必会影响关键模块的渲染

那么，什么时候开始加载非关键模块呢？

```javascript
var __lazyLoaded = false;
function runLazyQueue() {
  if(__lazyLoaded) {
    return;
  }
  __lazyLoaded = true;
  $(window).detach("mousemove scroll mousedown touchstart touchmove keydown resize onload", runLazyQueue);
  var module;
  while (module = lazyQueue.shift()) {
    ~function(m){
      // 保证在浏览器空闲时间处理 JS 程序, 保证不阻塞
      window.requestNextAnimationFrame(function() {
        new Loader(m.$mod, m.data, m.force);
      });
    }(module);
  }
}
$(window).on("mousemove scroll mousedown touchstart touchmove keydown resize onload", runLazyQueue);
// 担心未触发 onload 事件, 5s 之后执行懒加载队列
window.requestNextAnimationFrame(function() {
  runLazyQueue();
}, 5E3);
```

上面的代码应该十分清晰，两种请求下会开始将非关键模块加入懒加载监控：

- 当页面中触发 `mousemove scroll mousedown touchstart touchmove keydown resize onload` 这些事件的时候，说明用户开始与页面交互了，程序必须开始加载。
- 如果用户没有交互，但是页面已经 onload 了，程序当然不能浪费这个绝佳的空档机会，趁机加载内容；经测试，部分情况下，onload 事件没有触发（原因尚不知），所以还设定了一个超时加载，5s 之后，不论页面加载情况如何，都会将剩下的非关键模块加入到懒加载监控。

#### 懒执行，有交互才执行

如果说上面的优化叫做懒加载，那么这里的优化可以称之为懒执行。

首页上有几个模块是包含交互的，如头条区域的 tab ，便民服务的浮层和主题市场的浮层，部分用户进入页面可能根本不会使用这些功能，所以<b>程序上并没有对这些模块做彻底的初始化</b>，而是等到用户 hover 到这个模块上再执行全部逻辑。

#### 更懒的执行，刷新页面才执行

首屏中有两个次要请求，一个是主题市场的 hot 标，将用户最常逛的三个类目打标；第二个是个人中心的背景，不同的城市会展示不同的背景图片，这里需要请求拿到城市信息。

这两处的渲染策略都是，在程序的 idle（空闲）时期，或者 `window.onload` 十秒之后去请求，然后将请求的结果缓存到本地，当用户第二次访问淘宝首页时能够看到效果。<b>这是一种更懒的执行，用户刷新页面才看得到</b>.这种优化是产品能够接受，也是技术上合理的优化手段。

#### 图片尺寸的控制和懒加载

不论图片链接的来源是运营填写还是接口输出，都难以保证图片具备恰当的宽高，加上如今 retina 的屏幕越来越多，对于这种用户也要提供优质的视觉体验，图片这块的处理并不轻松。

```html
<img src='//g.alicdn.com/s.gif' data-src='//g.alicdn.com/real/path/to/img.png' />
```

阿里 CDN 是支持对图片尺寸做压缩处理的，如下图为 200x200 尺寸的图片：

![200x200](/blogimgs/2016/04/01/TB1JZa9LVXXXXb3XFXXXXXXXXXX-200-200.gif)<!--<source src="//img.alicdn.com/tps/TB1JZa9LVXXXXb3XFXXXXXXXXXX-200-200.gif">-->

加上 `_100x100.jpg` 的参数后，会变成小尺寸：

![100x100](/blogimgs/2016/04/01/TB1JZa9LVXXXXb3XFXXXXXXXXXX-200-200.gif_100x100.jpg)<!--<source src="//img.alicdn.com/tps/TB1JZa9LVXXXXb3XFXXXXXXXXXX-200-200.gif_100x100.jpg">-->

我们知道 webp 格式的图片比对应的 jpg 要小三分之一，如上图加上 `_.webp` 参数后:

![100x100 webp](/blogimgs/2016/04/01/TB1JZa9LVXXXXb3XFXXXXXXXXXX-200-200.gif_100x100.jpg_.webp.jpg)<!--<source src="//img.alicdn.com/tps/TB1JZa9LVXXXXb3XFXXXXXXXXXX-200-200.gif_100x100.jpg_.webp">-->
（不支持 webp 格式的浏览器展示不出来这张图片）

视觉效果并没有什么折扣，但是图片体积缩小了三分之一，图片越大，节省的越明显。显然，淘宝首页的所有图片都做了如上的限制，针对坑位大小对图片做压缩处理，只是这里需要注意的是，运营填写的图片可能已经是压缩过的，如：

```html
$img = '//g.alicdn.com/real/path/to/img.png_400x400.jpg';

<img src='{{$img}}_100x100jpg_.webp' />
```

上面这种情况，图片是不会正确展示的。首页对所有的图片的懒加载都做了统一的函数处理：

```javascript
src = src.replace(/\s/g, '');
var arr;
if (/(_\d{2,}x\d{2,}\w*?\.(?:jpg|png)){2,}/.test(src) && src.indexOf('_!!') == -1) {
  arr = src.split('_');
  if (arr[arr.length - 1] == '.webp') {
    src = [arr[0], arr[arr.length - 2], arr[arr.length - 1]].join('_');
  } else {
    src = [arr[0], arr[arr.length - 1]].join('_');
  }
}
if (src.indexOf('_!!') > -1) {
  src = src.replace(/((_\d{2,}x\d{2,}[\w\d]*?|_co0)\.(jpg|png))+/, '$1');
}
WebP.isSupport(function(isSupportWebp) {
  // https 协议访问存在问题 IE8，去 schema
  if (/^http:/.test(src)) {
    src = src.slice(5);
  }
  // 支持 webp 格式，并且 host 以 taobaocdn 和 alicdn 结尾，并且不是 s.gif 图片
  if (isSupportWebp && /(taobaocdn|alicdn)\.com/.test(src) && (src.indexOf('.jpg') ||
    src.indexOf('.png')) && !/webp/.test(src) && !ignoreWebP && !/\/s\.gif$/.test(src)) {
    src += '_.webp';
  }
  $img.attr('src', src);
});
```

#### 模块去钩子，走配置

TMS 的模块在输出的时候会将数据的 id 放在钩子上：

```html
<div class='J_Module' tms-datakey='2483'></div>
```

如果模块是异步展示的，可以通过 `tms-datakey` 找到模块数据，而首页的个性化是从几十上百个模块中通过算法选出几个，如果把这些模块钩子全部输出来，虽说取数据方便了很多，却存在大量的冗余，对此的优化策略是：将数据格式相同的模块单独拿出来，新建页面作为数据页。所以可以在源码中看到好几段这样的配置信息：

```html
<textarea class="tb-hide">[{"backup":"false","baseid":"1","mid":"222726","name":"iFashion","per":"false","tid":"3","uid":"1000"},{"backup":"false","baseid":"3","mid":"222728","name":"美妆秀","per":"false","tid":"3","uid":"1001"},{"backup":"false","baseid":"4","mid":"222729","name":"爱逛街","per":"false","tid":"4","uid":"1002"},{"backup":"false","baseid":"2","mid":"222727","name":"全球购","per":"false","tid":"4","uid":"1003"}]</textarea>
```

减少了大量的源码以及对 DOM 的解析。

#### 低频修改模块，缓存请求

有一些模块数据是很少被修改的，比如接口的兜底数据、阿里 APP 模块数据等，可以通过调整参数，设置模块的缓存时间，如：

```javascript
io({
  url: URL,
  dataType: 'jsonp',
  cache: true,
  jsonpCallback: 'jsonp' + Math.floor(new Date / (1000 * 60)),
  success: function() {
    //...
  }
});
```

`Math.floor(new Date / (1000 * 60))` 这个数值在一分钟内是不会发生变化的，也就是说将这个请求在本地缓存一分钟，对于低频修改模块，缓存时间可以设置为一天，即：

```javascript
Math.floor(new Date / (1000 * 60 * 60 * 24))
```

当然，我们也可以采用本地储存的方式缓存这个模块数据：

```javascript
offline.setItem('cache-moduleName', JSON.stringify(data), 1000 * 60 * 60 * 24);
```

缓存过期时间设置为 1 天，淘宝首页主要采用本地缓存的方式。

##### 使用缓动效果减少等待的焦急感

这方面的优化不是很多，但是也有一点效果，很多模块的展示并不是干巴巴的 `.show()`，而是通过动画效果，缓动呈现，这方面的优化推荐使用 CSS3 属性去控制，性能消耗会少很多。

### 优化的思考角度

上文 [《一起来看看淘宝首页的个性化》](http://www.barretlee.com/blog/2016/03/31/personality-in-taobao-home-page/) 中提到几个黄金法则：

- 首屏一定要快
- 滚屏一定要流畅
- 能不加载的先别加载
- 能不执行的先别执行
- 渐进展现、圆滑展现

性能优化的切入角度不仅仅是上几个方面，对照 Chrome 的 Timeline 柱状图和折线图，我们可以找到几个优化的点：

![淘宝首页 Chrome Timeline](/blogimgs/2016/04/01/TB1qwc6LVXXXXcnXXXX5W.tKFXX-1818-1096.png)<!--<source src="http://gtms02.alicdn.com/tps/i2/TB1qwc6LVXXXXcnXXXX5W.tKFXX-1818-1096.png">-->

- 在 1.0s 左右存在一次 painting 阻塞，可能因为一次性展示的模块面积过大
- 从 FPS 的柱状图可以看出，在 1.5s-2.0s 之间，存在几次 Render 和 JavaScript 丢帧
- 从多出的红点可以看出页面 jank 次数，也能够定位到代码堆栈

在优化的过程中需要更多地思考，如何让阻塞的脚本分批执行，如何将长时间执行的脚本均匀地分配到时间线上。这些优化都体现在代码的细节上，宏观上的处理难以有明显的效果。当然，在宏观上，淘宝首页也有一个明显的优化：

```javascript
// //gist.github.com/miksago/3035015#file-raf-js
(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
})();
```

这段代码基本保证每个模块的初始化都是在浏览器空闲时期，减少了很多不必要的丢帧。这个优化也可以被应用到每个模块的细节代码之中，不过优化难度会更高。

### 小结

代码的性能优化是一个精细活，如果你要在一个庞大的未经优化的页面上做性能优化，可能会面临一次重构代码。本文从淘宝首页个性化引出的问题出发，从微观到宏观讲述了页面的优化实践，提出了几条可以借鉴的「黄金法则」，希望对你有所启发，后续会继续给大家带来淘宝首页稳定性保障的分享。



