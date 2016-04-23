---
title: 删除数组中的某个元素
categories:
  - JavaScript
tags:
  - tech
  - cnblogs
  - splice
warning: true
date: 2013-05-31 11:55:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/05/31/splice-in-array.html" target="_blank">博客园</a>.</div>

<p>在之前的<a title="Javascript综合应用小案例（续）" href="http://www.cnblogs.com/hustskyking/archive/2013/05/05/getKeywords-2.html" target="_blank">文章</a>中也介绍过类似的东西，主要操作的方式是利用splice这个便利函数。</p>
<p>我们要删除，Arr数组中的元素b，具体做法是：</p>

```
//第一步是获取b在Arr中的位置
var index = Arr.indexOf(b);
//第二步就是利用splice删除该元素
Arr.splice(b, 1);

```

<p>简单点写就是：</p>

```
Arr.splice(Arr.indexOf(b), 1); //这里的b可以是任意对象

```

<p><em>注：并非所有浏览器都支持indexOf这个函数，可能你需要自己写一个遍历函数获取到需要查询元素b的索引值。</em></p>


<p>下面是我随便写的一个Array对象的扩展：</p>

```
Array.prototype.index = function(obj){
    for(var i = 0, len = this.length; i < len; i++){
        if(this[i] === obj) return i;
    }
}
Array.prototype.del = function(obj){
    this.splice(this.indexOf(obj), 1);
    return this;
}

```

<p>测试地址：<a title="DEMO" href="http://qianduannotes.sinaapp.com/test/splice/index.html" target="_blank">DEMO</a></p>
<p>&nbsp;. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; . &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; . &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; . &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;.</p>

