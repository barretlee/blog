---
title: 前端编码规范之CSS
categories:
  - 前端杂烩
tags:
  - tech
  - cnblogs
warning: true
date: 2013-08-09 02:57:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/08/09/css-spec.html" target="_blank">博客园</a>.</div>

<p>　　"字是门面书是屋"，我们不会去手写代码，但是敲出来的代码要好看、有条理，这还必须得有一点约束~</p>
<p>　　团队开发中，每个人的编码风格都不尽相同，有时候可能存在很大的差异，为了便于压缩组件对代码进行压缩以及书写样式的规范统一和美观，很有必要大家一起来研究一套基本规范（模板）！</p>
<p>　　我先抛砖引玉。<strong><span>（禁止）、（必须）<span>等字眼，在这里只是<span>表示强调，未严格要求</span>。</span></span></strong></p>


<h3>前端规范之CSS</h3>
<p><strong>1. <span>tab</span>键用<span>（必须）</span><span>四个空格</span>代替</strong></p>
<p>　　<span>因为在不同系统的编辑工具对tab解析不一样，windows下的tab键是占四个空格的位置，而在linux下会变成占八个空格的位置（除非你自己设定了tab键所占的位置长度）。</span></p>
<p>　　一些童鞋可能会有疑问，tab键换成四个空格，多麻烦啊~</p>
<p>　　其实不然，我平时用sublime text比较多，在这个工具中可以对tab键进行设置。</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/08/09/09141737-747feb02ee5140f8956f9b70ce9f1aae.png" data-source="http://images.cnitblog.com/blog/387325/201308/09141737-747feb02ee5140f8956f9b70ce9f1aae.png" alt=""></p>
<p>　　选择Indent Using Spaces，Tab Width：4两项即可。</p>


<p><strong>2. 每个样式属性后<span><strong>（必须）</strong></span>加 "<span>;<span>"</span></span></strong></p>
<p>方便压缩工具"断句"。</p>


<p><strong><span><span>3. Class命名中<span>（禁止）</span>出现大写字母，<span>（必须）</span>采用"<span> -</span> \对class中的字母分隔，如：</span></span></strong></p>

```
 /* 正确的写法 */
 .hotel-title {
     font-weight: bold;
 }

 /* 不推荐的写法 */
 .hotelTitle {
     font-weight: bold;
 }

```

<ul>
<li>用"-"隔开比使用驼峰是更加清晰。</li>
<li>产品线-产品-模块-子模块，命名的时候也可以使用这种方式（@Artwl）</li>
</ul>


<p><strong>4. 空格的使用，以下规则<span>（必须）</span>执行：</strong></p>

```
 .hotel-content {
     font-weight: bold;
 }

```

<ul>
<li>选择器与&nbsp;<span><code>{&nbsp;</code></span>之前<span>（<code>必须）</code></span>要有空格</li>
<li>属性名的&nbsp;<span><code>:&nbsp;</code></span>后<span>（<code>必须）</code></span>要有空格</li>
<li>属性名的&nbsp;<span><code>:&nbsp;</code></span>前<span>（<code>禁止）</code></span>加空格</li>
</ul>
<p>一个原因是美观，其次IE 6存在一个bug， 戳<a href="http://www.cnblogs.com/hustskyking/articles/css-bug-in-IE6.html" target="_blank">bug</a></p>


<p><strong>5.多选择器规则之间<span>（<code>必须）</code></span>换行</strong></p>
<p>当样式针对多个选择器时每个选择器占一行</p>

```
 /* 推荐的写法 */
 a.btn,
 input.btn,
 input[type="button"] {
     ......
 }

```



<p><strong>6. <span>（<code>禁止）</code></span><span>将样式写为单行, 如</span></strong></p>

```
.hotel-content {margin: 10px; background-color: #efefef;}

```

<p>单行显示不好注释，不好备注，这应该是压缩工具的活儿~</p>


<p><strong>7. <span>（<code>禁止）</code></span><span>向&nbsp;</span><span><code>0&nbsp;</code></span><span>后添加单位, 如：</span></strong></p>

```
.obj {
    left: 0px;
}

```

<p>只是为了统一。记住，绿色字表强调，不表强制！</p>


<p><strong>8. <span>（<code>禁止）</code></span>使用css原生<code>import</code></strong></p>
<p>使用css原生import有很多弊端，比如会增加请求数等....</p>
<p><strong>推荐文章</strong>：<a href="http://www.stevesouders.com/blog/2009/04/09/dont-use-import/" target="_blank">Don't use @import</a></p>


<p><strong>9. <span>（<code>推荐）</code></span>属性的书写顺序, 举个例子:</strong></p>

```
.hotel-content {
     /* 定位 */
     display: block;
     position: absolute;
     left: 0;
     top: 0;
     /* 盒模型 */
     width: 50px;
     height: 50px;
     margin: 10px;
     border: 1px solid black;
     / *其他* /
     color: #efefef;
 }

```

<ul>
<li>定位相关, 常见的有：<code>display</code>&nbsp;<code>position</code>&nbsp;<code>left</code>&nbsp;<code>top</code>&nbsp;<code>float</code>&nbsp;等</li>
<li>盒模型相关, 常见的有：<code>width</code>&nbsp;<code>height</code>&nbsp;<code>margin</code>&nbsp;<code>padding</code>&nbsp;<code>border</code>&nbsp;等</li>
<li>其他属性</li>
</ul>
<p>&nbsp;　 &nbsp;<span>按照这样的顺序书写可见提升浏览器渲染dom的性能</span></p>
<p><span>　　简单举个例子，网页中的图片，如果没有设置width和height，在图片载入之前，他所占的空间为0，但是当他加载完毕之后，那块为0的空间突然被撑开了，这样会导致，他下面的元素重新排列和渲染，造成重绘（repaint）和回流（reflow）。我们在写css的时候，把元素的定位放在前头，首先让浏览器知道该元素是在文本流内还是外，具体在页面的哪个部位，接着让浏览器知道他们的宽度和高度，border等这些占用空间的属性，其他的属性都是在这个固定的区域内渲染的，差不多就是这个意思吧~(@frec)</span></p>
<p><span><strong>&nbsp;推荐文章</strong>：</span><a href="http://css-tricks.com/poll-results-how-do-you-order-your-css-properties/" target="_blank">Poll Results: How do you order your CSS properties?</a></p>
<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a href="http://www.mozilla.org/css/base/content.css" target="_blank">http://www.mozilla.org/css/base/content.css</a></p>


<p><strong>10. 小图片<span>（必须）</span><span>sprite</span> 合并</strong></p>
<p><strong>推荐文章</strong>：<a class="blogTitle btitle" title="NodeJs智能合并CSS精灵图工具iSpriter" href="http://www.alloyteam.com/2012/09/update-ispriter-smart-merging-css-sprite/" rel="bookmark" target="_blank">NodeJs智能合并CSS精灵图工具iSpriter</a></p>


<p><strong>11. <span>（<code>推荐）</code></span><span>当编写针对特定<span>html</span>结构的样式时，使用</span><span><code>元素名</code></span><span>&nbsp;+<span>&nbsp;</span></span><span><code>类名</code></span></strong></p>

```
/* 所有的nav都是针对ul编写的 */
 ul.nav {
     ......
 }

```

<p>".a div"和".a div.b"，为什么后者好？如果需求有所变化，在".a"下有多加了一个div，试问，开始的样式是不是会影响后来的div啊~</p>


<p><span><strong>12. <span>（推荐）</span>IE Hack List</strong></span></p>

```
 /* 针对ie的hack */
 selector {
     property: value;     /* 所有浏览器 */
     property: value\9;   /* 所有IE浏览器 */
     property: value\0;   /* IE8 */
     +property: value;    /* IE7 */
     _property: value;    /* IE6 */
     *property: value;    /* IE6-7 */
 }

```

<p><span>当使用hack的时候想想能不能用更好的样式代替</span></p>


<p><strong>13. <span>（<code>不推荐）</code></span><span>ie使用</span><span><code>filter</code></span><span>,<span>（&nbsp;</span></span><span><code>禁止）</code></span><span>使用</span><span><code>expression</code></span></strong></p>
<p>这里主要是效率问题，应该当格外注意，咱们要少用烧CPU的东西~&nbsp;</p>


<p><strong>14. <span>（禁止）</span>使用<span>行内（inline）</span>样式</strong></p>

```
<p>Barret Lee</p>

```

<p>像这样的行内样式，最好用一个class代替。又如要隐藏某个元素，可以给他加一个class</p>

```
.hide {
    display: none;
}

```

<p>尽量做到样式和结构分离~</p>


<p><strong>15. <span>（推荐）</span>reset.css样式</strong></p>
<p><strong>推荐网站：<a href="http://www.cssreset.com/" target="_blank">http://www.cssreset.com/</a></strong></p>


<p><strong>16.<span>（禁止）</span>使用"<span>*</span>"来选择元素</strong></p>

```
/*别这样写*/
* {
    margin: 0;
    padding: 0;
}

```

<p>这样写是没有必要的，一些元素在浏览器中默认有margin或padding值，但是只是部分元素，没有必要将所有元素的margin、padding值都置为0。</p>


<p><strong>17. 链接的样式，<span>（务必）</span>按照这个顺序来书写</strong></p>

```
a:link -> a:visited -> a:hover -> a:active

```



<p><strong>18. <span>等</span><span>你补充...</span></strong><span>&nbsp;</span></p>


<h3>应该说在前面的话</h3>
<ul>
<li>对于不同的团队、不同的需求，编码规范上有一些差异，这个很正常。</li>
<li>最后上线的代码肯定不是上述遵从规范的，上线的代码都会经过打包和压缩。</li>
<li>不同的人有不同的编码风格，当你是一个人作战的时候，你可以不用考虑这些，但是如果是团队开发，有一个规范还是很有指导价值的~</li>
</ul>


<p>　　这些规范是在团队开发过程中，集思广益总结出来的，不是很全面，<strong><span>如果你有好的建议，请提出来，我们一起打造一个良好的前端生态环境！</span></strong></p>
<p>　　后面我会陆续把HTML、JavaScript和LESS等规范罗列出来，大家共同进步！！！</p>


<p><strong>相关阅读：</strong><a href="http://www.cnblogs.com/hustskyking/p/javascript-spec.html" target="_blank">前端编码规范之JavaScript</a></p>
<p>&nbsp;&nbsp;</p>