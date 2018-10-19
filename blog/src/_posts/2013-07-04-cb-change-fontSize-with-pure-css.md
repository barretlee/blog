---
title: 字体大小自适应纯css解决方案
categories:
  - 前端杂烩
tags:
  - tech
  - cnblogs
warning: true
date: 2013-07-04 01:18:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/07/04/change-fontSize-with-pure-css.html" target="_blank">博客园</a>.</div>

<h3><span>viewpoint</span></h3>
<p>css3提供了一些与当前viewpoint相关的元素，vw，vh，vim等。</p>

```
\viewpoint" = window size

vw = 1% of viewport width
1vh = 1% of viewport height
1vmin = 1vw or 1vh, 最小
1vmax = 1vw or 1vh, 最大

```

<p><strong>兼容性：chrome 20+/ safari 6+/ IE 10+ / FF 19+ / IOS 6+</strong></p>
<p><strong>DEMO地址：<a href="http://qianduannotes.sinaapp.com/test/fontResize.html" target="_blank">http://qianduannotes.sinaapp.com/test/fontResize.html</a>&nbsp; </strong>（已经用JS修正重绘bug）</p>

```
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <title>Demo</title>
    <style type="text/css">
        #box { font-size: 4vw;}
    </style>
</head>

<body>
    <div id="box">
        我是Barret Lee 我是Barret Lee 我是Barret Lee
    </div>
</body>
</html>

```

<p>但是该方案存在一个bug，上面的代码，当浏览器窗口变化的时候，box中的文字并没有按照应有的比例变化，但是css3标准中是这么说的：</p>
<blockquote>
<p><span>When the height or width of the viewport is changed, they are scaled accordingly.</span></p>
</blockquote>


<h3>插曲</h3>
<p>像这样的问题，我之前也遇到过，比如以下代码：<strong>（小插曲，可跳过）</strong></p>

```
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <title>CSS3 Demo</title>
    <style type="text/css">
        body, div { margin:0; padding: 0;}
        .wrap { background: blue; width: 100%;}
        .box { width: 900px; height: 200px;}
    </style>
</head>

<body>
    <div class="wrap"><div class="box"></div></div>
</body>
</html>

```



<p><strong>DEMO地址：<a href="http://qianduannotes.sinaapp.com/test/paintBug.html" target="_blank">http://qianduannotes.sinaapp.com/test/paintBug.html</a></strong>　　</p>
<p>box的宽度设置为900px，wrap设置为100%；缩小浏览器窗口，当宽度小于900时会出现滚动条，向右滚动，会发现蓝色部分并不是100%，这个问题大家可以去思考下。</p>


<h3>bug处理</h3>
<p>回到上面的问题，font-size:4vw，应该会使得字体的大小变化，可是他没有，和标准说的不一样，所以可以认为是一个bug。</p>

```
window.onresize = function(){
    var box = document.getElementById("box");
    box.style["z-index"] = 1;
}

```

<p>&nbsp;z-index可以对应的元素被重绘（repaint）。</p>


<p>&nbsp;延伸一点点关于重绘（repaint）和回流（reflow）的知识：</p>

```

    1. 添加、删除元素(回流+重绘)
    2. 隐藏元素，display:none(回流+重绘)，visibility:hidden(只重绘，不回流)
    3. 移动元素，比如改变top,left(jquery的animate方法就是,改变top,left不一定会影响回流)，或者移动元素到另外1个父元素中。(重绘+回流)
    4. 对style的操作(对不同的属性操作，影响不一样)
    5. 还有一种是用户的操作，比如改变浏览器大小，改变浏览器的字体大小等(回流+重绘)
    让我们看看下面的代码是如何影响回流和重绘的:
var s = document.body.style;
s.padding = "2px"; // 回流+重绘
s.border = "1px solid red"; // 再一次 回流+重绘
s.color = "blue"; // 再一次重绘
s.backgroundColor = "#ccc"; // 再一次 重绘
s.fontSize = "14px"; // 再一次 回流+重绘
// 添加node，再一次 回流+重绘

关于重绘和回流
```



<h3>&nbsp;其他方案</h3>
<p><strong>1. css expression</strong>， 这个效率比较低，不推荐使用</p>

```
#box { star:expression(onresize = function(){
                var res = parseInt(this.style.width) / 20;
                res = res < 9 : "9px" ? res + "px";
                this.style.fontSize = res;
            });
        }//P.S:上面代码没测试，不知道写错没有

```

<p>与其说用的css，还不如说是JS，而且是效率不够的JS。</p>


<p><strong>2. media query</strong>，这东西也不是特别好用</p>

```
h2{
  font-size:25px
}

@media screen and (max-width: 850px){/* 可视区域小于 850px, 设置更小font-size属性 */
   h2{
     font-size:19px;
   }
}

```

<p>用media query会使得字体的变化出现不连贯性，而且要可能设置多个@media，相当麻烦。</p>


<p><strong>3. media query + -webkit-transition&nbsp;</strong>实现平滑转变</p>
<p><strong>&nbsp;DEMO地址：</strong><a href="http://qianduannotes.sinaapp.com/test/fontResize2.html" target="_blank">http://qianduannotes.sinaapp.com/test/fontResize2.html</a></p>

```
div{
    font-size: 40px;
    -webkit-transition:font-size 0.2s ease-out;
}

@media only screen and (max-width: 1200px) { div{ font-size: 39px; }}
@media only screen and (max-width: 1100px) { div{ font-size: 38px; }}
@media only screen and (max-width: 1000px) { div{ font-size: 37px; }}
@media only screen and (max-width: 900px) { div{ font-size: 36px; }}
@media only screen and (max-width: 800px) { div{ font-size: 35px; }}
@media only screen and (max-width: 700px) { div{ font-size: 34px; }}
@media only screen and (max-width: 600px) { div{ font-size: 33px; }}
@media only screen and (max-width: 500px) { div{ font-size: 32px; }}
@media only screen and (max-width: 400px) { div{ font-size: 31px; }}
@media only screen and (max-width: 300px) { div{ font-size: 30px; }}

```



<h3>小结</h3>
<p>这玩意儿其实也没太大作用，用JS处理相当简单，<span>不知道大家还有没有其他比较好的方案，可以提出来交流下~</span></p>


<h3>参考文档</h3>
<p><span>&nbsp; *&nbsp;</span><a href="http://css-tricks.com/viewport-sized-typography/" target="_blank">Viewport Sized Typography</a></p>

