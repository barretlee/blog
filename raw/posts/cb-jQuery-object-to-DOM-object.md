---
title: jQuery对象与dom对象相互转换
categories:
  - JavaScript
  - 杂物间
tags:
  - tech
  - cnblogs
warning: true
date: 2013-05-16 01:02:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/05/16/jQuery-object-to-DOM-object.html" target="_blank">博客园</a>.</div>

<p>刚开始学习jQuery时可能一时会分不清楚哪些是jQuery对象、哪些是DOM对象。至于DOM对象不多解释，我们接触的太多了，下面重点介绍一下jQuery，以及两者相互间的转换。</p>
<h3><strong>什么是jQuery对象？</strong></h3>
<p>---就是通过jQuery包装DOM对象后产生的对象。jQuery对象是jQuery独有的，其可以使用jQuery里的方法。</p>
<p>比如：</p>

```
$("#test").html()

```

<p>意思是指：获取ID为test的元素内的html代码。其中html()是jQuery里的方法</p>
<p>这段代码等同于用DOM实现代码：</p>

```
document.getElementById("id").innerHTML;

```

<p>虽然jQuery对象是包装DOM对象后产生的，但是jQuery无法使用DOM对象的任何方法，同理DOM对象也不能使用jQuery里的方法.乱使用会报错。比如：</p>

```
$("#test").innerHTML //错误写法
document.getElementById("id").html()  //错误写法

```

<p>还有一个要注意的是：用#id作为选择符取得的是jQuery对象与document.getElementById("id")得到的DOM对象，这两者并不等价。</p>
<p>jQuery对象与DOM对象也可以相互转换。在两者转换前首先我们给一个约定：如果一个获取的是 jQuery对象，那么我们在变量前面加上$，如：var $variab = jQuery对象；如果获取的是DOM对象，则与习惯普通一样：var variab = DOM对象；这么约定只是便于讲解与区别，实际使用中并不规定。</p>


<h3><strong>jQuery对象转成DOM对象</strong></h3>
<p>两种转换方式将一个jQuery对象转换成DOM对象：[index]和.get(index);</p>
<p><strong>(1)jQuery对象是一个数据对象，可以通过[index]的方法，来得到相应的DOM对象。</strong></p>

```
var $v =$("#v") ; //jQuery对象
var v=$v[0]; //DOM对象
alert(v.checked) //检测这个checkbox是否被选中

```

<p><strong>(2)jQuery本身提供，通过.get(index)方法，得到相应的DOM对象</strong></p>

```
var $v=$("#v"); //jQuery对象
var v=$v.get(0); //DOM对象
alert(v.checked) //检测这个checkbox是否被选中

```



<h3><strong>DOM对象转成jQuery对象</strong></h3>
<p>对于已经是一个DOM对象，只需要用$()把DOM对象包装起来，就可以获得一个jQuery对象了。$(DOM对象)</p>

```
var v=document.getElementById("v"); //DOM对象
var $v=$(v); //jQuery对象

```

<p>转换后，就可以任意使用jQuery的方法了。</p>
<p>通过以上方法，可以任意的相互转换jQuery对象和DOM对象。</p>
<p><span><em><span>注：DOM对象才能使用DOM中的方法，jQuery对象是不可以用DOM中的方法。</span></em></span></p>


<p><span><span>* 参考链接：<em>http://www.chinaz.com/design/2010/0309/108144.shtml</em></span></span></p>