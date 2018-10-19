---
title: JavaScript之鼠标滚动事件
categories:
  - JavaScript
  - 杂物间
tags:
  - tech
  - cnblogs
warning: true
date: 2013-04-09 08:36:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/04/09/mousewheel.html" target="_blank">博客园</a>.</div>

<p><span>最近正在做评论模块的</span><a href="http://blog.163.com/jinlu_hz/blog/static/11383015220112251147684/" target="_blank">image LazyLoad</a><span>（图片资源延迟加载/按需加载），其中涉及到一些mouse scroll操作。老外的</span><a href="http://adomas.org/javascript-mouse-wheel/" rel="nofollow" target="_blank">Mouse wheel programming in JavaScript</a><span>一文，对我很有价值。</span><span>&mdash;&mdash;以下为翻译&mdash;&mdash;</span><span>本文有些信息可能已经过时，但是大部分知识点仍旧有用。</span><span>Web应用日新月异，也越来越接近于桌面应用。功能上越来越强，比如drag<drop（拖拽），autocompletition（自动完成/自动补全）等等。在AJAX的配合下，这些应用都易于实现。</span><span>本文要说的并不是AJAX技术，而是关于相对简单的用户输入手段&mdash;&mdash;鼠标滚轮。目前已经很难找到不带滚轮的鼠标了，大多数用户会使用滚轮用来滚动浏览器、缩放页面/照片之类的操作。Web应用在这个领域却鲜有建树。本文将提供一些基于鼠标滚轮的javascript事件和相关的处理手段。</span></p>
<h3>Annotated code 带注释的代码</h3>
<p>
<span>下面是一段带注释的javascript代码，阐述鼠标滚动事件背后的一些原理。</span><span>//此处不准备对代码注释进行翻译，<a href="http://adomas.org/javascript-mouse-wheel/plain.html" rel="nofollow" target="_blank">查看源代码</a></span></p>



```
/**
 * This is high-level function.
 * It must react to delta being more/less than zero.
 */
function handle(delta) {
        if (delta < 0)
        ...;
        else
        ...;
}

/**
 * Event handler for mouse wheel event.
 */
function wheel(event){
    var delta = 0;
    if (!event) /* For IE. */
        event = window.event;
    if (event.wheelDelta) { /* IE/Opera. */
        delta = event.wheelDelta / 120;
        /**
         * In Opera 9, delta differs in sign as compared to IE.
         */
        if (window.opera)
            delta = -delta;
    }
    else

        if (event.detail) {
        /** Mozilla case. */
        /**
         * In Mozilla, sign of delta is different than in IE.
         * Also, delta is multiple of 3.
         */
            delta = -event.detail / 3;
        }
    /**
     * If delta is nonzero, handle it.
     * Basically, delta is now positive if wheel was scrolled up,
     * and negative, if wheel was scrolled down.
     */
    if (delta)
        handle(delta);
    /**
     * Prevent default actions caused by mouse wheel.
     * That might be ugly, but we handle scrolls somehow
     * anyway, so don't bother here..
     */
    if (event.preventDefault)
        event.preventDefault();
    event.returnValue = false;
}

/**
 * Initialization code.
 * If you use your own event management code, change it as required.
 */
if (window.addEventListener)
    /** DOMMouseScroll is for mozilla. */
    window.addEventListener('DOMMouseScroll', wheel, false);
/** IE/Opera. */
window.onmousewheel = document.onmousewheel = wheel;  

```



<h3>Handler function 事件处理函数</h3>
<p><span>代码中的"handle"是用户的自定义函数，其中带了一个参数为delta。由</span><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/04/09/deltas.png" data-source="http://adomas.org/javascript-mouse-wheel/deltas.png" alt="Deltas pictured. Negative means down, positive up."><span>于浏览器平台的差异性，我们只能够捕捉到滚动的差值（deltas），这个值是滚轮的变化值。</span><span>通常，你只能获取到delta的正值与负值，如左图所示。</span><span>如果delta是正值，滚动向前滚动，反之则为向后滚动。在许多应用中，向上滚动就是页面向上滚动。</span><span>你可能很疑惑，delta的实际值到底会是什么。实际上，上述代码其实是被调整过的，使得99%的情况下获取到的值要么-1要么就是+1。即时如此，如果在firefox下迅速滚动，会出现&plusmn;3的情况。</span><a href="http://digg.com/programming/Mouse_wheel_programming_in_JavaScript#c2431219" rel="nofollow" target="_blank">Digg</a><span>上有人提出14的delta值，Geoffrey Kruse在他的pc上甚至得到了76的值。当然了，这也取决于鼠标敏感度的设置。firefox有一些微妙的现象：如果快速滚动的同时点击右键（原文 scrolling the wheel fast and then push the right mouse button for the menu），会报出例如30的delta值。</span><span>//不明白作者是如何触发这个操作的</span><a href="http://www.robsite.de/" rel="nofollow" target="_blank">Robert Gerlach</a><span>在Safari下做了一些测试："只是滚动一圈的话，值为+-0.1，如果滚动地稍微快点的话（多滚动几圈），这个值也会变大。 这是因为Mac OS下有鼠标滚轮加速功能。滚动一次，浏览器滚动1像素，滚动3次，浏览器却滚动30像素"。同时他也对Camino（基于Gecko的内核引擎）进行研究：\与Safari相似（+- 0.3 to +-Infinity），虽然使用了与firefox相同的内核引擎，但结果这个delta值却只在+-2.666666里浮动，无论滚动速度如何。"</span><span>在此可以看一下</span><a href="http://adomas.org/javascript-mouse-wheel/test.html" rel="nofollow" target="_blank">测试页面A</a><span>与</span><a href="http://adomas.org/javascript-mouse-wheel/test2.html" rel="nofollow" target="_blank">测试页面B</a><span>。</span></p>
<h3>Compatability 兼容性</h3>
<p>
<span>//作者在此感谢了许多人，不作翻译</span></p>
<h3>Usability 可用性</h3>
<p>
<span>Few \don't"s&mdash;&mdash;几个不要</span></p>
<ul>
<li>不要使用滚动进行一些不符合常理的操作，用户已经习惯用滚轮来作页面滚动之类的操作了。一些map应用使用滚轮进行缩放，这个操作符合用户的预期，大胆使用即可。</li>
<li>不要强迫用户依赖滚轮进行操作。<span>//作者的意思</span><span>是</span><span>应该</span><span>提供一种可替换方案，使得在滚轮操作无效的情况下，应用程序仍旧可用</span></li>
<li>尽量避免全局滚动条，这些滚动条可能会给用户在进行滚动时带来一些困惑。</li>

</ul>


<h3>Real world examples 应用实例</h3>
<p>
<a href="http://maps.google.com/" rel="nofollow" target="_blank">Google Maps</a><span>利用滚轮进行zoom in/out。</span><a href="http://mapper.acme.com/" rel="nofollow" target="_blank">ACME Mapper</a><span>Google Maps的增强版</span><span>//在chrome10下滚动无效</span><a href="http://imageflow.finnrudolph.de/" rel="nofollow" target="_blank">ImageFlow</a><span>&nbsp;by Finn Rudolph</span></p>



```
/** Event handler for mouse wheel event.
         *鼠标滚动事件
         */
        var wheel = function(event) {
            var delta = 0;
            if (!event) /* For IE. */
                event = window.event;
            if (event.wheelDelta) { /* IE/Opera. */
                delta = event.wheelDelta / 120;
            } else if (event.detail) {
                /** Mozilla case. */
                /** In Mozilla, sign of delta is different than in IE.
                 * Also, delta is multiple of 3.
                 */
                delta = -event.detail / 3;
            }
            /** If delta is nonzero, handle it.
             * Basically, delta is now positive if wheel was scrolled up,
             * and negative, if wheel was scrolled down.
             */
            if (delta)
                handle(delta);
            /** Prevent default actions caused by mouse wheel.
             * That might be ugly, but we handle scrolls somehow
             * anyway, so don't bother here..
             */
            if (event.preventDefault)
                event.preventDefault();
            event.returnValue = false;
        }

        /** Initialization code.
         * If you use your own event management code, change it as required.
         */
        if (window.addEventListener) {
            /** DOMMouseScroll is for mozilla. */
            window.addEventListener('DOMMouseScroll', wheel, false);
        }
        /** IE/Opera. */
        window.onmousewheel = document.onmousewheel = wheel;

        /** This is high-level function.
         * It must react to delta being more/less than zero.
         */
        var handle = function(delta) {
            var random_num = Math.floor((Math.random() * 100) + 50);
            if (delta < 0) {
                // alert("鼠标滑轮向下滚动：" + delta + "次！"); // 1
                $("btn_next_pic").onclick(random_num);
                return;
            } else {
                // alert("鼠标滑轮向上滚动：" + delta + "次！"); // -1
                $("btn_last_pic").onclick(random_num);
                return;
            }
        }

```



<h3>Reference [参考]</h3>
<p>　　1.http://blog.163.com/jinlu_hz/blog/static/113830152201122911356714/</p>
<p>　　2.http://qiaolevip.iteye.com/blog/1673396</p>

