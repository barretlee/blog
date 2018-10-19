---
title: IE6 bug集
categories:
  - JavaScript
  - 杂物间
tags:
  - tech
  - cnblogs
  - 兼容性
warning: true
date: 2013-04-24 08:08:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/04/24/ie6-bugs.html" target="_blank">博客园</a>.</div>

<p><strong>1.IE6的3像素偏移BUG</strong>&nbsp;&nbsp;&nbsp; 当浮动元素与非浮动元素相邻（注意这里的相邻可以是纵向的也可以是横向的）时，这个3像素的Bug就会出现，它会偏移3像素。实际表现就是两个元素之间产生了一道缝隙！解决方法很简单，将两个元素都浮动就OK了。此BUG深层的原因是非浮动元素的layout未触发，所以这里只要是能够触发layout的css都可以解决问题。</p>


<p><strong>2.IE6 双倍边距问题</strong>&nbsp;&nbsp;&nbsp; 当浮动元素设置margin边距时，边距会加倍。解决方法是给浮动元素加上display：inline属性。</p>


<p><strong>3.IE6下空标签高度问题</strong>&nbsp;&nbsp;&nbsp; 当你把标签的高度设置为0-19内的数字时，IE6会一致的显示为19px高。解决方法：给标签加上overflow：hidden。</p>


<p><strong>4.IE6图片下方有空隙产生</strong><span>&nbsp; &nbsp;css代码：</span></p>

```
div {
  border:1px solid red;
  background:orange;
}
img {
  width:276px;
  height:110px;
}

```

<pre><span>HTML代码：</span></pre>

```
<div>
     <img src="...." alt="google">
</div>

```

<pre>解决办法是：img｛display：block；}<span><strong>5.IE6,7失效的margin-left/right bug</strong></span><span>HTML代码：</span></pre>

```
<div class="wrap">
    <div class="cont">www.hemin.cn</div>
</div>

```

<pre><span>CSS代码：</span></pre>

```
wrap{background:#eee;border:1px solid #ccc;}
cont{border-bottom:2px solid #aaa;margin:0 100px;height:30px;}

```

<pre><span>解决方法：触发.warp的layout就可以了。具体的比如：给.warp加上zoom:1或者width等等。</span><span><strong>6. IE6 幽灵文本(Ghost Text bug)</strong></span>在我写本文之前，我遇到了这个bug。它相当的古怪和滑稽。一块不知哪来的重复的文本，被IE6显示在靠近原文本的下面。(译注：也可以参看<a href="http://www.positioniseverything.net/explorer/dup-characters.html" target="_blank">Explorer 6 Duplicate Characters Bug</a>获得bug演示)。我无法解决它，所以我搜索它，果然，这是另一个IE6的bug。对此有许多解决方法，但是没有一个对我的例子有效(因为网站的复杂性我无法使用其中的一些方法)。所以我使用了hack。在原文本之后增加空格看起来能解决这个问题。但是，从<a href="http://hippytechblog.blogspot.com/2009/07/ie6-ghost-text-bug.html" target="_blank">Hippy Tech Blog</a>那里了解到，问题背后的原因是由于html注释标签。IE6不能正确的渲染它。下面是他建议的解决方案列表：</pre>
<ol>
<li>使用&lt;!&mdash;[IF !IE]&gt;标签包围注释</li>
<li>移除注释</li>
<li>在前浮动上增加样式 {display:inline;}</li>
<li>在适当的浮动的div上使用负边距</li>
<li>在原文本增加额外的<nbsp;(比如10个空格) (hacky way)</li>
</ol>
<pre><span><strong>7. 相对位置和溢出隐藏(Position Relative and Overflow Hidden)</strong></span>这个问题我遇到过很多次，当时我正在准备一个JQuery的教程，因为我使用了很多overflow hidden来达到我想要的布局。问题发生在当父元素的overflow被设置成hidden并且子元素被设置成position:relative。CSS-Trick有一个很好的例子来演示这个bug。<a href="http://snook.ca/archives/html_and_css/position_relative_overflow_ie/" target="_blank">position:relative and overflow in internet explorer</a><em>解决方法</em>为父元素增加position:relative;<span><strong>8. IE的最小高度(Min-Height for IE)</strong></span>这很简单，IE忽略min-height属性。你可以用下面的hack来修复它。感谢<a href="http://www.dustindiaz.com/min-height-fast-hack/" target="_blank">Dustin Diaz</a>。这个解决方法在IE6, Mozilla/Firefox/Gecko, Opera 7.x+, Safari1.2里都工作的很好。<em>解决方法</em></pre>

```
selector {
   min-height:500px;
   height:auto !important;
   height:500px;
}

```

<pre><span><strong>9. Bicubic图像缩放(Bicubic Image Scaling)</strong></span>你会喜欢这个的。IE那糟糕图像缩放让你很困扰？如果你拿IE和其他浏览器比较，IE缩小的图像看起来不如其他浏览器。</pre>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/04/24/2010072616324250.gif" data-source="http://pic002.cnblogs.com/img/lw19870811/201007/2010072616324250.gif" alt=""></p>
<pre><em>解决方法</em></pre>

```
img { -ms-interpolation-mode: bicubic;}

```

<pre><strong>10.PNG透明(PNG Transparency)</strong></pre>
<pre>我猜每个人都知道这个，但我仍把它列在这里，作为以后的参考。</pre>
<pre>所以如果你想要使用透明图像并且GIF不能给你想要的质量，你会需要这个对PNG的hack。你必须意识到，如果你使用一张PNG图像作为背景，你将不能设置背景的位置。<em>解决方法</em><em>&nbsp;</em></pre>

```
img {
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(...);
｝

```

<pre><span></span><strong>11. IFrame透明背景 (IFrame Transparent Background)</strong></pre>
<pre>在firefox和safari里你应该不会遇到这个问题因为默认情况下，iframe的背景被设置为transparent，但是在IE里，却不是如此。你需要用到allowTransparency 属性并且加入下面的CSS代码来达成目的。<em>解决方法</em></pre>

```
/* in the iframe element */
<iframe src="content.html" allowtransparency="true">
</iframe>

/* in the iframe docuement, in this case content.html */
body {
    background-color:transparent;
}

```

<pre><strong>12. 禁用IE默认的垂直滚动条(Disabled IE default Vertical Scroll bar)</strong></pre>
<pre>默认情况下，即使内容适合窗口大小，IE(译注：IE6/7)也会显示垂直滚动条。你可以使用overflow:auto，让滚动条只在你需要时出现。<em></em><span><strong>13. :hover伪类(:hover Pseudo Class)</strong></span>IE只支持&lt;a&gt;元素的 :hover伪类。你可以使用jQuery的hover event来达到相同效果。<em></em></pre>
<pre><strong>14. 盒模型Hack(Box Hack Model)</strong></pre>
<pre>这是IE里最热门的bug了。基本的理解是，IE计算宽度(width)的方式不同。基于w3c标准，一个元素总宽度应该是总宽度 = margin-left + border-left + padding-left + width + padding-right + border-right + margin-right但是，IE计算宽度时没有加上填充和边框：总宽度 = margin-left + width + margin-right更多的细节，请参考这个链接：<a href="http://www.456bereastreet.com/archive/200612/internet_explorer_and_the_css_box_model/" target="_blank">Internet Explorer和CSS盒模型详细解释</a><em>解决方法</em>使用w3c的标准兼容模式。IE6或者之后的版本能基于w3c的标准计算，但是你仍旧会在IE5中遇到问题。或者你可以用CSS Hack来解决这个问题。所有标准兼容的浏览器都能读取w\\idth:180px 除了IE5。</pre>

```
#content {
    padding:10px;
    border:1px solid;
    width:200px;
    w\\idth:180px;
}

```

<pre><span><strong>15.IE bug</strong></span>（摘自：<a href="http://www.iwanna.cn/archives/2010/07/29/4780/">http://www.iwanna.cn/archives/2010/07/29/4780/</a>）</pre>
<table>
<thead>
<tr><th width="30">&nbsp;</th><th width="120">问题</th><th width="60">浏览器</th><th width="90">DEMO</th><th width="120">解决方法</th></tr>
<tr>
<td colspan="5"><strong>Hacking Rules:&nbsp;</strong>property:all-<a class="st_tag internal_tag" title="Posts tagged with IE" href="http://www.iwanna.cn/tags/ie/" rel="tag nofollow">ie</a>\9; property:gte-ie8\0;*property:lte-ie7; +property:ie7; _property:ie6;</td>

</tr>

</thead>
<tbody>
<tr>
<td>1</td>
<td>input[button | submit] 不能用 margin:0 auto; 居中</td>
<td>IE8</td>
<td><a href="http://haslayout.net/demos/No-Auto-Margin-Center-on-Buttons-Inconsistency-Demo.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/No-Auto-Margin-Center-on-Buttons-Inconsistency-Fixed-Demo-CS.html" target="_blank">fixed</a></td>
<td>为input添加width</td>

</tr>
<tr>
<td>2</td>
<td>body{overflow:hidden;}没有去掉滚动条</td>
<td>IE6/7</td>
<td><a href="http://haslayout.net/demos/Document-Scrollbars-Overflow-Inconsistency-Demo.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/Document-Scrollbars-Overflow-Inconsistency-Fixed-Demo.html" target="_blank">fixed</a></td>
<td>设置html{overflow:hidden;}</td>

</tr>
<tr>
<td>3</td>
<td>hasLayout的标签拥有高度</td>
<td>IE6/7</td>
<td><a href="http://haslayout.net/demos/Empty-Element-Height-Bug-Demo.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/Empty-Element-Height-Bug-Fixed-Demo.html" target="_blank">fixed</a></td>
<td>*height:0;_overflow:hidden;</td>

</tr>
<tr>
<td>4</td>
<td>form&gt;[hasLayout]元素有margin-left时，子元素中的[input | textarea] 出现2×margin-left</td>
<td>IE6/7</td>
<td><a href="http://haslayout.net/demos/Form-Control-Double-Margin-Bug-Demo.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/Form-Control-Double-Margin-Bug-Fixed-Demo.html" target="_blank">fixed</a></td>
<td>form &gt; [hasLayout 元素]{margin-left:宽度;}form div{*margin-left:宽度&divide;2;}</td>

</tr>
<tr>
<td>5</td>
<td>当border-width有1条&lt;边3条时被设置成dotted时，1px的边dotted显示成dashed</td>
<td>IE7</td>
<td><a href="http://haslayout.net/demos/IE7-1px-Dotted-Border-Appears-As-Dashed-Bug-Demo.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/IE7-1px-Dotted-Border-Appears-As-Dashed-Bug-Fixed-Demo.html" target="_blank">fixed</a></td>
<td>不在同一个元素上使用不同宽度的 dotted</td>

</tr>
<tr>
<td>6</td>
<td>当子元素有position:relative的时候，父元素设置overflow:[hidden|auto]相当于给子元素设置了position:visible;</td>
<td>IE6/7</td>
<td><a href="http://haslayout.net/demos/relative-overflow-failure-bug-demo.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/relative-overflow-failure-bug-demo-fixed.html" target="_blank">fixed</a></td>
<td>给父元素设置position:relative;</td>

</tr>
<tr>
<td>7</td>
<td>:hover伪类不能改变有position:absolute的子级元素的left/top值</td>
<td>IE7</td>
<td><a href="http://haslayout.net/demos/ie7-broken-hover-absolute-bug-demo.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/ie7-broken-hover-absolute-bug-demo-fixed.html" target="_blank">fixed</a></td>
<td>把top/left的值设置成除0%外的所有百分值；或添加一个margin-[所有方向]除0外的所有值，包括0%</td>

</tr>
<tr>
<td>8</td>
<td>:focus + selector {} 选择器失效</td>
<td>IE8</td>
<td><a href="http://haslayout.net/demos/ignored-focus-bug-demo.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/ignored-focus-bug-demo-fixed.html" target="_blank">fixed</a></td>
<td>在失效选择器后面添加一个空选择器, :focus{}</td>

</tr>
<tr>
<td>9</td>
<td>列表中混乱的浮动：在list中浮动图片时，图片出现溢出正常位置；或没有list-style</td>
<td>IE8</td>
<td><a href="http://haslayout.net/demos/image-float-bullet-chaos-demo.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/image-float-bullet-chaos-demo-fixed.html" target="_blank">fixed</a></td>
<td>用背景图片替换list-style</td>

</tr>
<tr>
<td>10</td>
<td>th 不会自动继承上级元素的 text-align</td>
<td>IE8</td>
<td><a href="http://haslayout.net/demos/non-inherited-th-text-align-bug-demo.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/non-inherited-th-text-align-bug-demo-fixed.html" target="_blank">fixed</a></td>
<td>给th添加text-align:inherit; (base.<a class="st_tag internal_tag" title="Posts tagged with CSS" href="http://www.iwanna.cn/tags/css/" rel="tag nofollow">css</a>中已包含)</td>

</tr>
<tr>
<td>11</td>
<td>样式(包括link/style/@import(link)) 最多允许个为是：32</td>
<td>IE6-8</td>
<td>─ 常识</td>
<td>99.99%的情况下，不会遇到</td>

</tr>
<tr>
<td>12</td>
<td>:hover 时若background-color为#fff, 失效</td>
<td>IE7</td>
<td><a href="http://haslayout.net/demos/hover-white-background-ignore-bug.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/hover-white-background-ignore-bug-fixed-demo.html" target="_blank">fixed</a></td>
<td>把background-color改成background。或者，非#fff || #ffffff</td>

</tr>
<tr>
<td>13</td>
<td>忽略"&gt;"后有注释的选择器：selector&gt; /**/ selector{}</td>
<td>IE6</td>
<td><a href="http://haslayout.net/demos/ie7-child-selector-comment-bug-demo.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/ie7-child-selector-comment-bug-demo.html" target="_blank">fixed</a></td>
<td>[<a href="http://haslayout.net/css/IE7-Child-Selector-Comment-Bug" target="_blank">官方误判</a>] 这个bug是IE6 BUG</td>

</tr>
<tr>
<td>14</td>
<td>* html</td>
<td>IE6</td>
<td>─ HACK</td>
<td>只对IE6有效</td>

</tr>
<tr>
<td>15</td>
<td>PNG图片中的颜色和背景颜色的值相同，但显示不同</td>
<td>IE6-7</td>
<td><a href="http://haslayout.net/demos/png-color-mismatch-demo.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/png-color-mismatch-demo-fixed.html" target="_blank">fixed</a></td>
<td>利用&nbsp;<a href="http://pmt.sourceforge.net/pngcrush/" target="_blank">pngcrush</a>&nbsp;去除图片中的 Gamma profiles</td>

</tr>
<tr>
<td>16</td>
<td>margin:0 auto; 不能让block元素水平居中</td>
<td>IE6-8</td>
<td><a href="http://haslayout.net/demos/no-auto-margin-center-pseudo-bug-demo.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/no-auto-margin-center-pseudo-bug-demo-fixed.html" target="_blank">fixed</a></td>
<td>给block元素添加一个width</td>

</tr>
<tr>
<td>17</td>
<td>使用伪类 :first-line | :first-letter, 属性的值中出现!important 会使属性失效</td>
<td>IE8</td>
<td><a href="http://haslayout.net/demos/ie8-first-line-important-bug.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/ie8-first-line-important-bug-fixed.html" target="_blank">fixed</a></td>
<td>!important is evil, don"t use it anymore</td>

</tr>
<tr>
<td>18</td>
<td>:first-letter 失效</td>
<td>IE6</td>
<td><a href="http://haslayout.net/demos/ie6-first-letter-ignore-bug.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/ie6-first-letter-ignore-bug-fixed.html" target="_blank">fixed</a></td>
<td>把 :first-letter 移到离{}最近的地方，如 h1, p:first-letter{}，而非 p:first-letter h1{}</td>

</tr>
<tr>
<td>19</td>
<td>Position:absolute元素中，a display:block, 在非:hover时只有文本可点击</td>
<td>IE6/7</td>
<td><a href="http://haslayout.net/demos/partial-click-v2-demo.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/partial-click-v2-demo-fixed.html" target="_blank">fixed</a></td>
<td>给a添加background, 如果背景透明，使用background:url("任何页面中已经缓存的文件链接")，不推荐background：url(#)[<a href="http://haslayout.net/css/Partial-Click-Bug-v2" target="_blank">官方的解决方法</a>]，因为会增加一下HTTP请求</td>

</tr>
<tr>
<td>20</td>
<td>float列表元素不水平对齐：li不设置float，a设置display:block;float:[方向]，li不水平对齐</td>
<td>IE6/7</td>
<td><a href="http://haslayout.net/demos/staircase-bug-demo.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/staircase-bug-demo-fixed.html" target="_blank">fixed</a></td>
<td>给li设置display:inline 或 float:[方向]</td>

</tr>
<tr>
<td>21</td>
<td>dt, dd, li 背景失效</td>
<td>IE6</td>
<td><a href="http://haslayout.net/demos/disappearing-list-background-bug-demo.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/disappearing-list-background-bug-demo-fixed.html" target="_blank">fixed</a></td>
<td>dt, dd, li{position:relative;} (base.<a class="st_tag internal_tag" title="Posts tagged with CSS" href="http://www.iwanna.cn/tags/css/" rel="tag nofollow">css</a>中已包含)</td>

</tr>
<tr>
<td>22</td>
<td>&lt;noscript /&gt;元素的样式在启用javascript的情况下显示了样式</td>
<td>IE6-8</td>
<td><a href="http://haslayout.net/demos/noscript-ghost-bug-demo.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/noscript-ghost-bug-demo-fixed.html" target="_blank">fixed</a></td>
<td>利用js给&lt;noscript /&gt;添加display:none;</td>

</tr>
<tr>
<td>23</td>
<td>使用filter处理的透明背景图片的透明部分不可点</td>
<td>IE6-8</td>
<td><a href="http://haslayout.net/demos/no-transparency-click-bug-demo.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/no-transparency-click-bug-demo-fixed.html" target="_blank">fixed</a></td>
<td>把background:none变成background:url("链接")，链接到本身和图片之外的任何文件</td>

</tr>
<tr>
<td>24</td>
<td>li内元素偏离 baseline 向下拉</td>
<td>IE8</td>
<td><a href="http://haslayout.net/demos/list-drop-shift-bug-demo.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/list-drop-shift-bug-demo-fixed.html" target="_blank">fixed</a></td>
<td>给li设置display:inline 或 float:[方向]</td>

</tr>
<tr>
<td>25</td>
<td>列表中li的list-style不显示</td>
<td>IE6/7</td>
<td><a href="http://haslayout.net/demos/no_li_ol_bullets_demo.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/no_li_ol_bullets_demo_fixed.html" target="_blank">fixed</a></td>
<td>给li添加margin-left，留空间来显示（不要加在ul上）</td>

</tr>
<tr>
<td>26</td>
<td>图片不能垂直居中</td>
<td>IE6/7</td>
<td><a href="http://haslayout.net/css/No-line-height-Vertical-Center-on-Images-Bug" target="_blank">bug/fixed</a></td>
<td>添加一个空标签，并赋给"Layout", 比如display:inline-block;</td>

</tr>
<tr>
<td>27</td>
<td>不能自定义指针样式</td>
<td>IE6-8</td>
<td><a href="http://haslayout.net/demos/cursor/a/demo.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/cursor/a/demo_fixed.html" target="_blank">fixed</a></td>
<td>给指针文件设置绝对路径</td>

</tr>
<tr>
<td>28</td>
<td>背景溢出，拖动滚动条后显示正常</td>
<td>IE6</td>
<td><a href="http://haslayout.net/demos/backgroundleak_demo.html" target="_blank">bug</a>&nbsp;|&nbsp;<a href="http://haslayout.net/demos/backgroundleak_demo_ls_fixed.html" target="_blank">fixed</a></td>
<td>给父元素添加overflow:hidden防止溢出，并赋予hasLayout,如果添加_zoom:1;</td>

</tr>
<tr>
<td>29</td>
<td>高度超过height定义的高</td>
<td>IE6</td>
<td><a href="http://haslayout.net/css/Expanding-Height-Bug" target="_blank">bug/fixed</a></td>
<td>添加_overflow:hidden;(推荐)或者_font-size:0;</td>

</tr>
<tr>
<td>30</td>
<td>宽度超过width定义的宽</td>
<td>IE6</td>
<td><a href="http://haslayout.net/css/Expanding-Width-Bug" target="_blank">bug/fixed</a></td>
<td>添加_overflow:hidden; 或使用alice v3 中的 .sl-word-break 类（table用.sl-table-break）</td>

</tr>
<tr>
<td>31</td>
<td>双倍边距</td>
<td>IE6</td>
<td>─ 常识</td>
<td>添加display:inline到float元素中</td>

</tr>
<tr>
<td>32</td>
<td>margin负值隐藏：hasLayout的父元素内的非hasLayout元素，使用负边距时，超出父元素部分不可见</td>
<td>IE6/7</td>
<td><a href="http://haslayout.net/css/Negative-Margin-Bug" target="_blank">bug/fixed</a></td>
<td>去掉父元素的hasLayout；或者赋hasLayout给子元素,并添加position:relative;</td>

</tr>
<tr>
<td>33</td>
<td>给两个浮动元素的某中一个的文字设定为斜体，另一个元素下拉在有斜体文字元素的下面</td>
<td>IE6</td>
<td><a href="http://haslayout.net/css/Italics-Float-Bug" target="_blank">bug/fixed</a></td>
<td>给有斜体文字的元素添加overflow:hidden;</td>

</tr>
<tr>
<td>35</td>
<td>3px 间隔：在float元素后的元素，会有3px间隔</td>
<td>IE6</td>
<td><a href="http://haslayout.net/css/3px-Gap-Bug-aka-Text-Jog-Bug" target="_blank">bug/fixed</a></td>
<td>因为是确切的3px，所以，用\暴力破解"吧，比如_margin-left:-3px;</td>

</tr>
<tr>
<td>35</td>
<td>text-align 影响块级元素</td>
<td>IE6/7</td>
<td><a href="http://haslayout.net/css/Text-Align-Bug" target="_blank">bug/fixed</a></td>
<td>整理你的float；或者分开设置text-alig</td>

</tr>

</tbody>

</table>
<pre>总之万恶的IE6是这么的"与众不同"。以后我会持续更新这篇日志，记录更多的BUG，直到IE6消失！本文转自：<a href="http://www.cnblogs.com/Kampfer/archive/2010/07/25/1784723.html" target="_blank">Kampfer的记事本</a></pre>

