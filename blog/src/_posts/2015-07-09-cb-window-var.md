---
title: 如何快速定位不小心暴露到全局的变量
categories:
  - JavaScript
  - 前端杂烩
tags:
  - tech
  - cnblogs
date: 2015-07-09 11:40:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2015/07/09/window-var.html" target="_blank">博客园</a>.</div>

<p>今天在查看页面控制台的时候，无意中看到了一个暴露到全局的变量 i，全局变量是不会被压缩工具压缩成简写的字母，这个被频繁使用的变量名暴露到全局也是个相当大的隐患，可能一个不小心就覆盖了第二次暴露到全局的同名变量。</p>
<p>刚开始我就怀疑是自己出现了这样愚蠢的错误：</p>

```
function A() {
    // 在一个函数中多次用到了 for 循环，为了节省变量，都是用了变量 i
    for(var i = 0; ...) {
        //...
    }
    for(i = 0; ...) {
        //...
    }
    for(i = 0; ...) {
        //...
    }
}

```

<p>结果在某次拆分函数的时候，忘记定义:</p>

```
function A(){
    for(var i = 0; ...) {
        //...
    }
    for(i = 0; ...) {
        //...
    }
}
function B(){
    for(i = 0; ...) {
        //...
    }
}

```

<p>这个时候，变量 i 在 B 函数执行的时候就暴露到了全局。抱着这样的怀疑，我搜索了 50 多个模块的代码，一无所获...此时，我依然十分怀疑是自己的程序哪里疏忽了，全局搜索 <code class="highlight">i =</code> 和 <code class="highlight">i++</code>，五分钟过去了，未果...</p>
<h3 id="">找到这个变量</h3>
<p>如果这个变量名叫做 <code class="highlight">fuckIE</code>，分分钟全局搜索就出来了，类似这种简短的常用的变量，着实让人头疼了好一会儿。后来想到了这个方案：</p>

```
Object.defineProperty(window, "i", {
    get : function(){ return window.i; },
    set : function(newValue){ debugger;window.i = newValue; },
    enumerable : true,
    configurable : true
});

```

<p>在全局定义变量 i 的时刻，打一个断点，然后 F10 往前走一步，果然，在控制台右侧的 Call Stack 中找到了端倪！</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/07/09/091139059868960.png" data-source="http://images0.cnblogs.com/blog2015/387325/201507/091139059868960.png" alt="" width="728" height="297"></p>
<p>这个变量是从第三方组件中（offline组件，使用相当频繁的一个组件）暴露出来的，估计出错的方式同我上面的描述差不多，拆分函数的时候忘记重新定义变量 i。</p>
<p>当然还有更快的方式：</p>

```
window.__defineSetter__('i', function(){ debugger })

```

<h3 id="">不挖坑才是最好的解决方案</h3>
<p><strong>1. 使用 <code class="highlight">use strict;</code></strong></p>
<p>在严格模式下，这种问题暴露无遗，每个函数内都加上 <code class="highlight">use strict;</code>，虽然在语言上有所限制，但是低级错误一定不会出现，因为严格模式会给你报错！</p>
<p><strong>2. 使用 jslint/jshint 等 js 分析工具</strong></p>
<p>这些东西除了配置上较为繁琐，用起来还是很顺手的，做过配置的错误都会直接在 IDE 上标红显示出来，很容易发现问题，但是不建议一个项目中途使用，因为代码习惯的问题，很多地方被 js 分析工具作为错误抛出来，改动量是相当大的。</p>
<p>我有次也犯了个比较隐晦的错误：</p>

```
$(window).on('click', function(evt){
    var target = event.target.nodeName.toLowerCase();
    if(target !== 'ul'){
        //...
    }
});

```

<p>在 IE 和 Chrome 下，代码跑得好好的，但是到了测试较少的 FF 下，问题出来了，<code class="highlight">event is not defined.</code>，IE 和 Chrome 是支持 <code class="highlight">window.event</code> 抓取当前事件对象的，而 FF 不支持，所以每次点击页面上都会报错。。。</p>
<p>诸如此类的问题，在我们的平时编码之中不胜枚举，所以有一个编码规范作为强约束是十分有必要的！</p>

