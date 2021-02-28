---
title: chrome浏览器渲染白屏问题剖析
categories:
  - 前端杂烩
tags:
  - tech
  - cnblogs
warning: true
date: 2013-11-04 01:26:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/11/04/white-screen-in-chrome.html" target="_blank">博客园</a>.</div>

<p>刚截图十几次，终于捕捉到了这个白屏现象，hiahia~~</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/11/04/04131830-4cf27759a6e8428786bc2edd4fc9a479.jpg" data-source="http://images.cnitblog.com/blog/387325/201311/04131830-4cf27759a6e8428786bc2edd4fc9a479.jpg" alt="" width="855" height="445"></p>
<p>大家可以很清晰地看到下边还木有渲染完毕的透明层，这是一个十分普遍的问题，经常遇到。我的浏览器版本是</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/11/04/04131852-5b23b655bc6945fa9b44a2ec30477970.jpg" data-source="http://images.cnitblog.com/blog/387325/201311/04131852-5b23b655bc6945fa9b44a2ec30477970.jpg" alt=""></p>
<p>到目前为止应该是最新版(release版本)，之前的版本应该也存在类似的问题。只要处理好代码，这种体验相当不好的白屏问题是可以避免的，Qzone的页面貌似就没有这个现象。首先我们来聊一聊这个问题是怎么产生的，这涉及到chrome浏览器对网页的解析和渲染。</p>
<blockquote>
<p>渲染引擎首先通过网络获得所请求文档的内容，通常<strong>以8K分块的方式</strong>完成。下面是渲染引擎在取得内容之后的基本流程：解析html以<strong>构建dom树-&gt;构建render树-&gt;布局render树-&gt;绘制render树</strong></p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/11/04/04131906-c540e43cdc124640987ac5c4830fbe43.png" data-source="http://images.cnitblog.com/blog/387325/201311/04131906-c540e43cdc124640987ac5c4830fbe43.png" alt=""></p>

</blockquote>


<p>　　渲染引擎开始解析html，并将标签转化为内容树中的dom节点。接着，它解析外部CSS文件及style标签中的样式信息。这些样式信息以及html中的可见性指令将被用来构建另一棵树&mdash;&mdash;render树。</p>
<p>　　Render树由一些包含有颜色和大小等属性的矩形组成，它们将被按照正确的顺序显示到屏幕上。</p>
<p>　　Render树构建好了之后，将会执行布局过程，它将确定每个节点在屏幕上的确切坐标。再下一步就是绘制，即遍历render树，并使用UI后端层绘制每个节点。</p>
<p>　　值得注意的是，这个过程是逐步完成的，为了更好的用户体验，渲染引擎将会尽可能早的将内容呈现到屏幕上，并不会等到所有的html都解析完成之后再去构建和布局render树。它是解析完一部分内容就显示一部分内容，同时，可能还在通过网络下载其余内容。</p>
<p>　　如果我们在Render树未完全绘制并渲染之前，向下快速拖动滚动条会看到上图所示的白屏现象。那这种现象可以通过什么方式来处理呢？应该说这是避免不了的，我们能做的就是：</p>
<ul>
<li>遵循XHTML编码规则，错误的标签在解析的过程中，浏览器需要花费很多时间去进行容错处理（一些push和pop操作），会在构建DOM树的时间花掉额外的时间。</li>
<li>优化HTML代码，减少代码层次（有些网站堆砌一二十层标签的做法实在是没法不让人吐槽）<img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/11/04/04131918-9b6922039228486a849672bbf9a64739.jpg" data-source="http://images.cnitblog.com/blog/387325/201311/04131918-9b6922039228486a849672bbf9a64739.jpg" alt=""></li>
<li>优化css，减少样式计算所需要的时间，<code>div div div div｛...｝</code>，尽量不要出现这么复杂的选择符。</li>
<li>尽量不要使用 <code>document.write</code>，html不能被自顶向下或自底向上地被解析，一种重要的原因也是因为脚本标签中含有这个所导致的，他可能会添加标签。</li>
<li>缩短第一屏的内容，后几屏的内容用js异步+判断滚动条动作载入，减少构建Render树和布局render树的时间</li>

</ul>
<p>关于浏览器的工作原理，有兴趣的可以上网<a href="//www.google.com.hk/search?q=%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86" target="_blank">搜搜</a>。</p>

