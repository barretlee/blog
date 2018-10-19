---
title: 浅谈叶小钗面试的几个问题
categories:
  - JavaScript
  - 观点和感想
tags:
  - tech
  - cnblogs
warning: true
date: 2013-06-27 07:37:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/06/27/answers.html" target="_blank">博客园</a>.</div>

<h3><strong>问题：</strong></h3>
<p>链接地址：<a title="试题" href="http://www.cnblogs.com/yexiaochai/p/3158443.html" target="_blank">http://www.cnblogs.com/yexiaochai/p/3158443.html</a></p>
<p><strong>① 作用域问题</strong></p>

```
var a = 6;
setTimeout(function () {
    alert(a);
    a = 666;
}, 1000);
a = 66;

```



<p>这道题，我可耻的没有答起，我面试结束刚刚上出租就知道这道题很水了。。。。考察作用域的，当时活生生的被大神气场照住了，周围人的集体智商都减低了！！！</p>
<p><strong>② 语义化标签</strong></p>
<p>这道题我确实没辙，之前其实差点写类似的博客，却没有写，今天结束后补上吧！</p>
<p>1）tite与h1的区别</p>
<p>2）b与strong的区别</p>
<p>3）i与em的区别</p>
<p>PS：不要小看这些题，80%人答不上来</p>
<p><strong>③ 事件绑定</strong></p>
<p>addEventListener，第三个参数是用来表示事件是以事件冒泡还是事件捕获这个各位都知道！但是他问的问题是：</p>
<p>我们给一个dom同时绑定两个点击事件，一个用捕获，一个用冒泡，你来说下会执行几次事件，然后会先执行冒泡还是捕获！！！</p>
<p>来吧，谁能说出来。。。。</p>
<p><strong>④ CSS选择器问题</strong></p>
<p>考察优先级问题，反正会出很多莫名其妙的变形，比如将style标签写在body后与body前有什么区别，比如同一dom应用多个class其应该如何表现，比如class a定义颜色为blue，class b定义颜色为red，同时应用到dom上，dom作何显示。。。</p>
<p>好吧各位去回答吧。。。。。</p>


<h3><strong>浅见：</strong></h3>
<p><strong>1. JS单线程</strong></p>
<p>setTimeout加入到队列的后面 所以结果是66如果题目是这样</p>

```
var a = 6;
setTimeout(function () {
    alert(a);
    var a = 666;
}, 1000);
a = 66;

```

<p>结果就是undefined（变量提升）</p>
<p><strong>2. 标签语义化</strong>1）你是不是写错了？title和alt的区别吧？2）和3），-&gt;语气</p>
<p>b和i，一个是加粗，一个是斜体，都是视觉上的效果，而em和strong有情感色彩加强P.S：记得strong在IE和chrome显示不同，一个加粗一个未加粗</p>
<p><strong>3. 冒泡和捕捉</strong></p>
<p>addEventListener绑定几次就执行几次，即便绑定的函数一样也会多次执行，结果应该是先显示捕捉再显示冒泡冒泡，需要先冒泡到根节点（document，部分浏览器是html节点），再向下，碰到有绑定的DOM就执行；而捕捉是直接从根节点开始（这里我理解的也不是很深入）</p>
<p>p.s：请移步<a href="http://www.cnblogs.com/yexiaochai/archive/2013/06/30/3163370.html" target="_blank">http://www.cnblogs.com/yexiaochai/archive/2013/06/30/3163370.html</a></p>
<p><strong>4.css渲染</strong></p>
<p>如果写在body后会重新渲染整个页面；同一个DOM同时应用多个class，样式都会应用，重复的样式会覆盖</p>


<p>总体感觉面试的题目还是比较基础吧~</p>
<p>呵呵，我前几天也被阿里面了，比较幸运的拿到了offer</p>