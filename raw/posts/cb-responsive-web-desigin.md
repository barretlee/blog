---
title: 那些年，我们一起玩过的响应式布局
categories:
  - JavaScript
  - 前端杂烩
tags:
  - tech
  - cnblogs
warning: true
date: 2013-08-11 12:17:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/08/11/responsive-web-desigin.html" target="_blank">博客园</a>.</div>

<p>&nbsp;博客园的资源很丰富，也很精彩。不过这些精彩的东西放到一些移动终端上阅览就不堪入目了，<span>体验相当不好</span>。</p>
<p>&nbsp;&nbsp;<img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/08/11/11111006-2d09cc55663d4efaab0b4e7c9f734775.png" data-source="http://images.cnitblog.com/blog/387325/201308/11111006-2d09cc55663d4efaab0b4e7c9f734775.png" alt="" width="386" height="686"></p>
<p>&nbsp;你可以忍受每一次打开博客，还得放大屏幕阅读么？整个屏幕都挤满了很小很小的文字，反正我是受够了。</p>
<p>&nbsp;所以，我们需要改变！！！ 先看看什么是响应式布局，你所看的这篇文章就是采用响应时布局~ <span>（<strong>现代浏览器才能看到效果</strong>）</span></p>


<h3>什么是响应式布局</h3>
<p>我的理解就是，<span>为了让用户享受更好的体验效果，给用户展现最有价值的信息，让同一个页面在不同终端上有不一样的展现效果</span>。比如你正在阅读的这篇博客，当你缩小（放大）浏览器窗口时<em>（先滚动顶部，因为顶部做了比较多的修改，效果比较明显）</em>，你会看到这些神奇的效果。</p>
<p><span><strong>正常情况下</strong></span>，顶部是这样的：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/08/11/11111800-ae1213c1cbe34476b2d4401a788ac48d.jpg" data-source="http://images.cnitblog.com/blog/387325/201308/11111800-ae1213c1cbe34476b2d4401a788ac48d.jpg" alt="" width="691" height="362"></p>
<p><span><strong>稍微缩小一点</strong></span>，是这样的：</p>
<ul>
<li>变化一：about那个块不见了</li>
<li>变化二：浮动的推荐<反对框偏移了</li>
</ul>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/08/11/11111900-eee34c4fac6342f585c1d91681d52e4a.jpg" data-source="http://images.cnitblog.com/blog/387325/201308/11111900-eee34c4fac6342f585c1d91681d52e4a.jpg" alt="" width="690" height="449"></p>
<p><span><strong>再缩小一点</strong></span>：</p>
<ul>
<li>变化一：背景图片不见了</li>
<li>变化二：右侧sidebar块跑到文章下面去了</li>
</ul>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/08/11/11112040-da39f5f2f3d04f6bb07917930be7f098.jpg" data-source="http://images.cnitblog.com/blog/387325/201308/11112040-da39f5f2f3d04f6bb07917930be7f098.jpg" alt="" width="591" height="525"></p>
<p><span><strong>还可以再小一点</strong></span>，</p>
<p>　　这个变化就相当大了，很多东西都不见了，元素的位置也改变了</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/08/11/11112203-fd25eec77a92454292437db2ca0a40a8.jpg" data-source="http://images.cnitblog.com/blog/387325/201308/11112203-fd25eec77a92454292437db2ca0a40a8.jpg" alt="" width="436" height="564"></p>
<p>　　那么，什么是响应式布局，你有了一定的理解么~</p>


<h3>技术什么的不是关键，关键是设计</h3>
<p>　　技术太普遍了，大家都会用，可是<span>真正让用户感到舒适的，还是好的设计</span>。<span>我是这样考虑的：</span></p>
<p><strong>1. 屏幕分类：</strong></p>
<p>　　根据移动终端的尺寸（分辨率），我大概做了这么些分类：</p>
<p>　　←480px &nbsp; 481px~700px &nbsp; 701px~960px &nbsp; 961px→</p>
<p>　　首先搞清楚你的用户群所使用的终端类型和比例，这是2012年第二季度的统计数据</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/08/11/11112952-d5d987f9fc6247a7afc34ac7d46b87ff.gif" data-source="http://images.cnitblog.com/blog/387325/201308/11112952-d5d987f9fc6247a7afc34ac7d46b87ff.gif" alt=""></p>
<p><span>　　iPhone、Nokia、HTC、Samsung和Moto 五个品牌的移动终端位居前五位，占比分别为22.13%、13.98 和11.69%、10.87% 和7.47%，其次为Huawei、Sony 和ZTE 等。</span></p>
<p><span>　　感兴趣的话，可以去搜搜这些终端的分辨率是多少，然后针对这些数据做一个分类~我不多说了。</span></p>


<p><strong><span>2. 不同的需求</span></strong></p>
<p><strong><span>　　</span></strong><span>一个比较小的屏幕能够容纳多少数据，展现多少信息，这一点必须把握住，比如当设备宽度是480像素的时候，我们没必要展现太多的信息，因为你展现出来用户也不会看，这些<span>冗余信息只会影响用户对信息主次的判断，甚至他们会觉得这些冗余信息太多，而跳过你的内容</span>。</span></p>
<p><span>　　我的设计是这样的：</span></p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/08/11/11113624-b63e08b4fa52468abde3a2c0ea331d00.jpg" data-source="http://images.cnitblog.com/blog/387325/201308/11113624-b63e08b4fa52468abde3a2c0ea331d00.jpg" alt="" width="406" height="524"></p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/08/11/11113648-0fc153eca1cc433e89023b9ed037a4ac.jpg" data-source="http://images.cnitblog.com/blog/387325/201308/11113648-0fc153eca1cc433e89023b9ed037a4ac.jpg" alt="" width="405" height="575"></p>
<p>&nbsp;我的页面只包括这些内容，像随笔分类、随笔档案，友情链接，推荐链接等，<span>这些信息又多又占空间，应该去除!</span></p>
<p>&nbsp;再比如：刚开始的时候，那个推荐<反对的块及贴在文章的右侧，当窗口缩小之后，我把他放到了右下角，再小些，为了展示更多的内容，直接把他给隐藏了~</p>


<h3>关于技术</h3>
<p>技术核心是Media Query，网上都说烂了。</p>
<p><strong>给推荐两篇博文：</strong></p>
<ul>
<li><a title="Read 'The State Of Responsive Web Design'" href="http://mobile.smashingmagazine.com/2013/05/29/the-state-of-responsive-web-design/" rel="bookmark" target="_blank">The State Of Responsive Web Design</a></li>
<li>
<p class="post_title fs24 f_w"><a title="响应式布局这件小事" href="http://www.jiawin.com/response-type-layout-design/" rel="bookmark" target="_blank">响应式布局这件小事</a></p>
</li>
</ul>
<p>这两个<span>博客的布局也是响应式布局</span>。</p>


<p><strong>需要注意的几个点：</strong></p>
<p>　　1. head中记得加上这句话：</p>

```
<meta name="viewport" content="width=device-width; initial-scale=1.0">

```

<p>　　如果不加，效果就是本文第一章图所示，文字会很小很多的挤在一个页面上。</p>


<p>　　2. media query虽然好用，<strong><span>但是低版本IE不支持</span></strong>，不要纠结，咱把他给忽视掉~O(&cap;_&cap;)O~</p>
<p>　　如果你太固执一定要考虑的话，推荐这个：<a href="//code.google.com/p/css3-mediaqueries-js/">//code.google.com/p/css3-mediaqueries-js/</a></p>

```
<!--[if lt IE 9]>
     <script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js">
</script> <![endif]-->

```

<p>　　把这句话加到你的代码顶部，我试过了，相当不好用，响应式效果甚微。</p>


<h3>关于测试工具</h3>
<p>　　1. 这个网站，你可以试试，戳<a href="http://dfcb.github.io/Responsivator/" target="_blank">测试工具</a></p>
<p>　　2. chrome下有一个插件，叫做Moblile/Tablet Divice Testing，下载地址：<a href="//chrome.google.com/webstore/detail/mobiletablet-device-testi/elmekokodcohlommfikpmojheggnbelo" target="_blank">戳我</a></p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/08/11/11115330-20656f7059b8442b8d4443946c499ad5.jpg" data-source="http://images.cnitblog.com/blog/387325/201308/11115330-20656f7059b8442b8d4443946c499ad5.jpg" alt=""></p>


<h3>本文响应式布局代码</h3>
<p>说了半天，有些童鞋可能等不及想去试试了~</p>
<p>晒晒我弄的几行代码，有兴趣的可以参考下：<a href="http://files.cnblogs.com/hustskyking/media-480.css" target="_blank">../file/media-480.css</a></p>

```

/*====================== media =========================*/
@media screen and (max-width: 480px) {
    html, body {
        background: none;
    }
    ul#topMnu,
    a.minyx,
    #rss,
    #sideLeft,
    #sideRight,
    #menu,
    #profile_block {
        display: none;
    }
    div#container {
        width: 96%;
        padding: 0 2%;
        min-width: 0 !important;
    }
    div#content {
        margin-right: 0;
        float: none;
        padding-top: 310px;
    }
    div#sidebar {
        margin-left: 0;
        width: 100%;
        float: none;
    }
    .commentbox_title,
    #tbCommentBody {
        width: 96%;
    }
    #about {
        position: absolute;
        width: 96%;
        top: 80px;
    }
    #div_digg {
        position: static;
    }
    #skyking-footer {
        margin-top: 30px;
        padding: 15px 20px 0;
    }
    #skyking-footer div {
        width: 100%;
    }
    #skyking-footer span {
        float: none;
        border: none;
        padding: 0;
        width: 100%;
        display: inline-block;
        margin-bottom: 15px;
    }
    #skyking-footer p {
        margin: 0;
        text-indent: 2em;
    }
}
@media screen and (min-width: 481px) and (max-width: 699px) {
    html, body {
        background: none;
    }
    ul#topMnu,
    a.minyx,
    #rss {
        display: none;
    }
    div#container {
        width: 96%;
        padding: 0 2%;
        min-width: 0 !important;
    }
    div#content {
        margin-right: 0;
        float: none;
    }
    div#sidebar {
        margin-left: 0;
        width: 100%;
        float: none;
    }
    #about {
        position: static;
    }
    .commentbox_title,
    #tbCommentBody {
        width: 96%;
    }
    #skyking-footer {
        margin-top: 30px;
        padding: 15px 20px 0;
    }
    #skyking-footer div {
        width: 100%;
    }
    #skyking-footer span {
        float: none;
        border: none;
        padding: 0;
        width: 100%;
        display: inline-block;
        margin-bottom: 15px;
    }
    #skyking-footer p {
        margin: 0;
        text-indent: 2em;
    }
    #div_digg {
        right: 15px;
    }
}
@media screen and (min-width: 700px) and (max-width: 960px) {
    div#container {
        width: 96%;
        padding: 0 2%;
        min-width: 0 !important;
    }
    #wrapper {
        overflow-x:hidden;
    }
    #skyking-footer div {
        width: 100%;
    }
    #skyking-footer span {
        float: left;
        margin-bottom: 15px;
        margin-left: 1%;
        width: 22%;
        min-height: 120px;
    }
    div#sidebar div#sideRight,
    div#sidebar div#sideLeft {
        float: none;
        width: auto;
    }
    div#content {
        margin-right: 32%;
    }
    div#sidebar {
        width: 30%;
        margin-left: -30%;
    }
    #about {
        position: static;
        display:none;
    }
    #div_digg {
        right: 15px;
    }
}

meida query
```



<h3>小结</h3>
<p><span>　　响应式布局是这几年很流行的一个设计理念，随着移动互联网的盛行，为解决如今各式各样的浏览器分辨率以及不同移动设备的显示效果，响应式布局显得十分重要。设计虽好，我觉得也存在诸如一下的一些<span><strong>弊端</strong></span>：</span></p>
<p><span>　　1. 页面需要加载更多额外的内容，比如我们的手机看这个页面的话，体验效果还行，但是那些次要的内容依然被加载进来了，没看看见是因为被我display:none给隐藏了。</span><span>所以，如果想得到好的用户体验，同时节省流量的话，应该在加载之前做一些判断。</span></p>
<p><span>　　<span>2. 还是存在兼容性问题，要知道，现在IE6-8所占的市场份额仍然在40%+，这么庞大的用户群我们暂时是不能忽略的，若引用其他的JS来矫正，这个太费资源，不可取，而且事实表明这些JS并不好用。</span></span></p>


<p>P.S：本文图片都是直接截屏，没有做优化处理，整个页面体积过于庞大，看来图片的优化和lazyload很有必要啊！！！下次弄一个简洁版的lazyload用用~~</p>
<p>&nbsp;最后。。。来一张萌图，哈哈哈~</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/08/11/11124011-2bb20347825f45139a41031f0fde7b22.gif" data-source="http://images.cnitblog.com/blog/387325/201308/11124011-2bb20347825f45139a41031f0fde7b22.gif" alt=""></p>