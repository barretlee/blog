---
title: 一个不陌生的JS效果-marquee,用css3来实现
categories:
  - JavaScript
  - 杂物间
tags:
  - tech
  - cnblogs
warning: true
date: 2013-07-26 10:25:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/07/26/marquee-in-javascript.html" target="_blank">博客园</a>.</div>

<p>关于marquee，就不多说了，可以<a title="marquee演示" href="http://qianduannotes.sinaapp.com/marquee/show.html" target="_blank">戳这里</a>。</p>
<p>毕竟他是一个很古老的元素，现在的标准里头也不推荐使用这个标签了。但平时一些项目中会经常碰到这样的效果，每次都是重新写一遍，麻烦！</p>


<h3>JS类实现marquee</h3>
<p>今天倒弄了一个<strong>类</strong>，还不全，打个草稿吧~ 下次就凑合着用吧。</p>
<p>DEMO在这里，<a title="DEMO" href="http://qianduannotes.sinaapp.com/marquee/index.html" target="_blank">戳我</a></p>

```
/**
* @author 靖鸣君
* @email jingmingjun92@163.com
* @description 滚动
* @class Marquee
* @param {Object}
*/
var Marquee = function(){
    this.direction = "top";
    this.speed = 30;
};

Marquee.prototype = {
    //initial
    init: function(obj, setttings){
        this.obj = obj;
        this._createBox();
        this.scroll();
        if(settings){
            settings.direction && (this.direction = settings.direction);
            settings.speed && (this.speed = settings.speed);
        }
    },
    _createBox: function(){
        //create inner box A
        this.iBox = document.createElement("div");
        var iBox = this.iBox;
        with(iBox.style){
            width = "100%";
            height = "100%";
            overflow = "hidden";
        }
        iBox.setAttribute("id", "marqueeBoxA");
        iBox.innerHTML = obj.innerHTML;

        //clone inner box B
        var iBox2 = iBox.cloneNode(true);
        iBox2.setAttribute("id", "marqueeBoxB");

        //append to obj Box
        this.obj.innerHTML = "";
        this.obj.appendChild(iBox);
        this.obj.appendChild(iBox2);
    },
    //animation
    scroll: function() {
        var _self = this;
        this.timer = setInterval(function(){
            _self._ani();
        }, this.speed);
    },
    //setInterval function
    _ani: function() {
        if(obj.clientHeight - obj.scrollTop <= 0){
            obj.scrollTop = obj.offsetHeight - obj.scrollTop + 1;
        } else {
            obj.scrollTop++;
            console.log(obj.offsetHeight, obj.scrollTop);
        }
    },
    stop: function(){
        clearInterval(this.timer);
    },
    start: function(){
        this.scroll();
    }
};
```

<p>gists地址：<a href="//gist.github.com/barretlee/6095976">//gist.github.com/barretlee/6095976</a></p>
<p>代码写的比较粗糙，下面说说这个<strong>思路</strong>：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/07/26/26221029-f82024416caf481a91ad51b1576d33d0.jpg" data-source="http://images.cnitblog.com/blog/387325/201307/26221029-f82024416caf481a91ad51b1576d33d0.jpg" alt=""></p>
<p>BoxA和BoxB内容相同，当BoxA滚动离开外层盒子时，把scrollTop设置成，当前的scrollTop - BoxA的高度，记得再加上一个1.</p>
<p>思路很简单，操作也很方便，我比较习惯用scrollTop来控制移动，有的人也喜欢用绝对定位和相对定位配合，但是这样写出来的插件兼容性不是很好，有些页面定位元素太多，可能会造成插件的样式乱套。</p>
<p>这个插件（楼主比较懒，还没有写完）的<strong>使用方式</strong>：</p>

```
var marquee = new Marquee(),
    obj = document.getElementById("box");

marquee.init(obj);

```

<p>对应的html代码：</p>

```
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <title>Demo</title>
    <style type="text/css">
        #box {
            width: 150px;
            height: 200px;
            border:1px solid #EFEFEF;
            background: #F8F8F8;
            padding:0 20px;
            line-height:22px;
            overflow:hidden;
        }
    </style>
</head>

<body>
    <div id="box">
        我是Barret Lee1<br> 我是Barret Lee2<br> 我是Barret Lee3<br> 我是Barret Lee4<br> 我是Barret Lee5<br>
        我是Barret Lee1<br> 我是Barret Lee2<br> 我是Barret Lee3<br> 我是Barret Lee4<br> 我是Barret Lee5<br>
    </div>
</body>
</html>

```

<p>当然，给了几个<strong>接口</strong>：</p>

```
marquee.init(obj, {
     direction: "xx",  //这个还没写，一般就是top和left吧~
     speed: 30
});

```



<h3><strong>&nbsp;补充一个css3下marquee的知识点</strong></h3>

```
overflow:-webkit-marquee;//指定溢出时滚动。

-webkit-marquee-style:scroll | slide | alternate; //跑马灯样式，分三种。

scroll，从一端滚动到另一端，内容完全滚入（消失）时重新开始。

slide，从一端滚到另一端，内容接触到另一端后，立马重新开始。

alternate，内容不跑到显示区域外，在里面来回碰壁反弹。这里主要用第一种。

-webkit-marquee-repetition:infinite | number;// 跑马灯跑的次数，infinite 为

无限多次，不结束。或者可以用正整数设置滚动的次数。

-webkit-marquee-direction:up | down | left | right; //跑动的方向，这个要注

意结合实际情况，即实际你操作的标签文本流溢出在哪个方向溢出。

-webkit-marquee-speed:slow | normal | fast;//跑动的速度设置。

```

<p>实例：</p>

```
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <title>Demo</title>
    <style type="text/css">
        h1 {
            color:rgba(250,100,100,0.7);
            height:40px;
            line-height:40px;
            width:400px;
            overflow: -webkit-marquee;
            -webkit-marquee-style: scroll;
            -webkit-marquee-repetition: infinite;
            -webkit-marquee-direction: right;
            -webkit-marquee-speed:normal;
            border:1px #ccc solid;
            margin-top: 30px;
        }
        h1.left {
            -webkit-marquee-direction: left;
        }
        h1.up {
            -webkit-marquee-direction: up;
        }
        h1.down {
            -webkit-marquee-direction: down;
        }
</style>
</head>

<body>
<h1>我是Barret Lee，Barret Lee，我是Barret Lee，Barret Lee，我是Barret Lee</h1>
<h1 class="up">我是Barret Lee，Barret Lee，我是Barret Lee，Barret Lee，我是Barret Lee</h1>
<h1 class="left">我是Barret Lee，Barret Lee，我是Barret Lee，Barret Lee，我是Barret Lee</h1>
<h1 class="down">我是Barret Lee，Barret Lee，我是Barret Lee，Barret Lee，我是Barret Lee</h1>
</body>
</html>

```

<p>DEMO地址：<a title="css3 marquee" href="http://qianduannotes.sinaapp.com/marquee/css3marquee.html" target="_blank">http://qianduannotes.sinaapp.com/marquee/css3marquee.html</a>&nbsp;（此属性在后续新版本中已经不提供支持了 &nbsp;修改于<strong>2013/11/09</strong>）</p>
<p>这个还是蛮实用的~做下兼容性处理，我觉得，可以直接拿过来用：)</p>

