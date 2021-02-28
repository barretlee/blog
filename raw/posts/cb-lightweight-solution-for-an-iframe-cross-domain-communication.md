---
title: iframe跨域通信的通用解决方案
categories:
  - JavaScript
  - 杂物间
tags:
  - tech
  - cnblogs
warning: true
date: 2013-03-29 11:10:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/03/29/lightweight-solution-for-an-iframe-cross-domain-communication.html" target="_blank">博客园</a>.</div>

<p><a href="http://www.alloyteam.com/wp-content/uploads/2012/08/two_messenger.png" rel="prettyPhoto[1]"><img class="aligncenter lh_lazyimg slideshow_imgs" title="图2" src="http://www.alloyteam.com/wp-content/uploads/2012/08/two_messenger.png" alt="2个信使的情况" width="390" height="322"></a></p>
<p><strong>一、背景</strong></p>
<p>在这个Web页面越来越丰富的时代，页面通过iframe嵌入其他的页面也越来越常见。但由于浏览器同源策略的限制，不同域之间属性和操作是无法直接交互的，所以在这个时候，开发者多多少少需要一些方案来突破这些限制。跨域问题涉及的地方也很多，如文档之间的消息通信、ajax请求、Cookie等，本文讨论的是iframe和父页面的消息通信。</p>


<p><strong>二、现状</strong></p>
<p>目前网上也可以找到各种解决方案（少说都有10+个，有兴趣的话可以<a href="http://www.woiweb.net/10-cross-domain-methods.html" target="_blank">去看看</a>），对于现代浏览器来说，原生的postMessage API一定是不二的选择，所以各种方案的不同点均在于IE 6、7中的处理（不用兼容IE6、7的同志可以去看其他文章了）。当然这么多方案有各种优缺点，甚至有些只支持单向跨域，个人觉得实际意义不大。另外一些方案需要proxy.html这样的代理页面做中转，但是涉及服务器上的部署，并且对于多方合作来说还是有些麻烦。</p>
<p><strong>三、思路</strong></p>
<p>虽然不再复述现有的各种方案，但还是想交待一点上下文。相信网上看到最多方案就是利用location.hash或是window.name进行iframe的跨域通信：</p>
<ul>
<li>location.hash会直接暴露在URL里，并且在一些浏览器里会产生历史记录，数据安全性不高也影响用户体验，所以不做考虑。另外由于URL大小的限制，支持传递的数据量也不大。</li>
<li>window.name相比来讲就好很多了，支持2M的数据量，并且当iframe的页面跳到其他地址时，其window.name值保持不变，副作用可以说是最小的。</li>
</ul>
<p>讲到这思路也比较清晰了，咱们就用window.name呗，但问题又来了：只有两个页面同域时才能访问window.name。这个问题还好，只要把iframe改为与父页面同域就可以了。这又衍生了新的问题：这不是意味着只能单向通信了吗，iframe怎么向父页面发消息（不可能去改父页面的location吧）？在暗骂坑爹的同时偶然发现了一个很神奇的方法，就是想访问一个iframe的window.name时，只要将其location改为"about:blank"即可，屡试不爽~没错这个\特性"可以视为IE6/7的一项安全性问题，但利用这个特性来进行跨域通信并没有实际的安全风险。</p>
<p>具体的实现见下图，在iframe的内部再创建一个iframe（我们称之为信使），父子页面轮询信使的window.name，父子页面各自使用变量保存window.name，轮询时发现有变化即被视为收到消息。基本原理就是这么简单，我们继续..</p>
<p><a href="http://www.alloyteam.com/wp-content/uploads/2012/08/one_messenger1.png" rel="prettyPhoto[1]"><img class="aligncenter size-full wp-image-2868 lh_lazyimg slideshow_imgs" title="图1" src="http://www.alloyteam.com/wp-content/uploads/2012/08/one_messenger1.png" alt="1个信使的情况" width="487" height="403"></a></p>
<p>图1</p>
<p>作为一个通用的解决方案，我们的目标是提供一个js文件，封装通信的接口，需要通信的页面只要加载js文件就行。但在封装前，需要考虑更复杂一点的情况：当父子页面双方频率较高地双向通信时，如何进行支持？按照上述的方案，信使的window.name并没有读写锁的概念，这意味着消息很容易乱掉或被漏掉。所以更好的方案应该是：创建两个信使，分别负责"父–&gt;子"和"子–&gt;父"的消息传递，并且为了防止消息被冲掉，发送消息时会维护一个消息队列，在取消息时处理消息队列里的所有消息。见图2。</p>
<p><a href="http://www.alloyteam.com/wp-content/uploads/2012/08/two_messenger.png" rel="prettyPhoto[1]"><img class="aligncenter size-full wp-image-2869 lh_lazyimg slideshow_imgs" title="图2" src="http://www.alloyteam.com/wp-content/uploads/2012/08/two_messenger.png" alt="2个信使的情况" width="488" height="402"></a></p>
<p>图2</p>
<p><strong>四、封装</strong></p>
<p>最后的封装就是加入了postMessage API的检测，另外也要判断是否为跨域，这样就满足了所有iframe通信的情况了。这里实现的信使只负责消息的监听和发送，所以在使用上是非常简单的：</p>
<div>
<div id="highlighter_724833" class="syntaxhighlighter  js">

```
// 父页面中
// 初始化信使, 告知与其交互的iframe引用
var messenger = Messenger.initInParent(iframeEl);

// 监听消息
messenger.onmessage = function (data) {
          ...
};

// 发送消息
messenger.send(message);

```


```
// iframe中
// 初始化信使
var messenger = Messenger.initInIframe();

// 监听消息
messenger.onmessage = function (data) {
      ...
};

// 发送消息
messenger.send(message);

```

</div>
</div>
<p>具体使用可以参考下方的demo : )</p>
<p><strong>五、总结</strong></p>
<p>虽然国内也有人提过使用"about:blank"进行iframe通信的，但是代码的封装和可读性都不是太好，<a href="http://www.ne.jp/asahi/nanto/moon/2011/12/08/ie-post-message.html" target="_blank">本方案</a>是一日本人所提出<span>，我觉得处理的很好，所以就拿出来和大家分享下</span>。虽然尝试过优化轮询那一块，但暂时无果，有兴趣的朋友可以一起研究下~</p>
<p><strong>DEMO：<a href="http://www.alloyteam.com/wp-content/uploads/2012/08/parent.html" target="_blank">点击这里</a></strong></p>
<p><strong>脚本下载：<a href="http://biqing.alloyteam.com/lab/messenger/messenger.js" target="_blank">http://biqing.alloyteam.com/lab/messenger/messenger.js</a></strong></p>
<p><strong>GitHub：<a href="//github.com/biqing/MessengerJS" target="_blank">//github.com/biqing/MessengerJS</a></strong></p>


<p><strong>原文链接：http://www.alloyteam.com/2012/08/lightweight-solution-for-an-iframe-cross-domain-communication</strong></p>