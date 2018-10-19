---
title: iconfont的蜕化操作
categories:
  - JavaScript
  - 前端杂烩
tags:
  - tech
  - cnblogs
mark: hot
date: 2015-08-17 09:54:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2015/08/17/iconfont-opt.html" target="_blank">博客园</a>.</div>

<p>很多国外的网站，访问的时候可以看到，页面先是大面积白一下，然后恢复正常。原因是网页上用到了 webfont，这些页面很多情况都是直接引用 google 的 webfont 地址，中华大局域网下，由于网络原因，页面虽已经全部加载，引用的 webfont 资源却还未下载成功，这就导致了使用了 webfont 的内容呈现空白状态，没有被渲染出来。</p>
<p>如，访问该网站：<a href="http://zurb.com/playground/foundation-icon-fonts-3">http://zurb.com/playground/foundation-icon-fonts-3</a></p>
<p>为啥国内很少有这种事儿发生？英文字符并不多，生成 webfont 所占用的 unicode range 很小，故英文字体的 webfont 体积是很小的。而中文字符却有好几千个，一个完整中文的 webfont 至少有 2-3M，没人会在自己的网站上使用如此庞大的 webfont 的字体。</p>
<p>但 webicon 就不一样了，根据页面的需要，只摘取几个 unicode 段位，体积自然也是很小了。为了不影响正常字符的展示，webicon 的制作一般会选用空白的 unicode 段位，这些 unicode 在浏览器下默认展示为 <span>""</span>，一个乱码的符号。那么同样的问题就出现了，由于 CDN 的服务不太稳定或者用户网络原因，页面打开之后，部分 webicon 的资源还未加载成功，那么那些使用到 webicon 的位置便会出现乱码，如果图标较大，体验是十分不好的。</p>
<h3 id="iconfont_1"><a class="headeranchor-link" name="user-content-iconfont_1" href="#iconfont_1"></a>iconfont 制作的基本原理</h3>
<p>Unicode&thinsp;码表是一个很大的表格，每个表格都对应一个 Unicode 字符，每个字符都有一个 Unicode 码值对应，如 "李" 对应 "\u674e", "靖" 对应 "\u9756"。因为码表很大，有部分表格并没有对应的字符，但是它有自己的码值。iconfont 的制作，首先将绘制的图形（可以是一张图片、也可以是一个 svg 描述）通过工具或者程序生成文字icon，然后将文字icon对应到码表之中，为了不干预码表中已有的字符，我们通常会把文字icon对应到没有字符的表格中，最后导出我们额外对应的表格信息，生成iconfont。如下图所示：</p>

```
                              Unicode 码表
                           +-----------------+
           ...             |     |     |     |
                           |     |     |     |
   图形icon     文字icon    +-----------------+
  +-------+    +------+    |     |     |     |
  |icon a +---->   A  +-----------> Ua |     |
  +-------+    +------+    |     |     |     |
                           +-----------------+
  +-------+    +------+    |     |     |     |
  |icon b +---->   B  +-----> Ub +     |     +------> iconfont
  +-------+    +------+    |     |     |     |
                           +-----------------+
  +-------+    +------+    |     |     |     |
  |icon C +---->   C  +-----> Uc |     |     |
  +-------+    +------+    |     |     |     |
                           +-----------------+
           ...             |     |     |     |
                           |     |     |     |
                           +-----------------+

```

<p>图中，三个icon分别对应到 Unicode 码表中码值为 Ua Ub Uc 的三个表格，那么最后导出的 iconfont 也就只包含这三个字符信息，这个体积是很小的。</p>
<p>延伸阅读：<a href="http://www.cnblogs.com/hustskyking/p/manufacture-font-face-in-web.html">再探@font-face及webIcon制作</a></p>
<h3 id="iconfont_2"><a class="headeranchor-link" name="user-content-iconfont_2" href="#iconfont_2"></a>iconfont 的蜕化处理</h3>
<p>正常的情况下是一堆漂亮的 icon 图标，而当网络较慢或者 CDN 不稳定的时候，用户看到的是图示乱码的框框，优化之后，用户可以看到我们对 iconfont 的蜕化操作。效果预览：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/08/17/170948437225461.png" data-source="http://images0.cnblogs.com/blog2015/387325/201508/170948437225461.png" alt=""></p>

```
# 绑定 hosts
2.2.2.2 at.alicdn.com
# 然后访问淘宝首页，可以看到效果

```

<p>了解了iconfont 的制作之后，理解上图就不难了。中间乱码的那张图里，每个图标对应的都是无字符的码表表格，页面默认的字体呈现这些字符的状态就是 ""。这里我们提到的蜕化处理，只需要在对应 Unicode 码表时，将每个图标对应到有字符的码表表格中，就会看到最上层那张图片的效果。</p>
<p>有人会问，那些蜕化的图标是从哪里来的？对应的键值又是多少？</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/08/17/170948513634127.png" data-source="http://images0.cnblogs.com/blog2015/387325/201508/170948513634127.png" alt=""></p>
<p>除了 emoji 外，我们输入法能够输出的所有文字在 web 上也都是能够正常显示的，所谓的正常显示就是不会出现 ""。平时常用的搜狗输入法/百度输入法都提供了很多的特殊字符，我们可以在这些特殊字符中找到最能表现icon的字符，当然，甚至可以使用文字、字母来替代。</p>
<p>比如音乐icon可以使用 "♫" 替代，计算字符码值的方式是：</p>

```
var code = "♫".charCodeAt(0).toString(16);
// htmlEncodedStr 便可以作为icon的内容
var htmlEncodedStr = "<#x" + code + ";";

```

<p>以国内目前做的最好的 <a href="http://iconfont.cn/">iconfont 网站</a>为例，演示如何便捷的修改文字icon对应的默认码值:</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/08/17/170948589255051.gif" data-source="http://images0.cnblogs.com/blog2015/387325/201508/170948589255051.gif" alt=""></p>
<p>修改完之后保存，此时这个 icon 对应的码值就已经变化了。</p>


<h3 id="iconfont_2">☞&nbsp;小结</h3>
<p>很多网站都承载着日均几百上千万的流量，用户的网络环境复杂，每个细节问题都会在部分用户面前暴露无遗，我们要做的就是去优化那些概率性看到的"小问题"，这些"小问题"在庞大的用户群体中会变成一个很大的问题，必须引起重视。</p>

