---
title: JavaScript事件机制
categories:
  - JavaScript
  - 前端杂烩
tags:
  - tech
  - cnblogs
warning: true
date: 2014-02-17 09:18:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2014/02/17/problem-javascript-event.html" target="_blank">博客园</a>.</div>

<p>群里童鞋问到关于事件传播的一个问题：\事件捕获的时候，阻止冒泡，事件到达目标之后，还会冒泡吗？"。</p>
<p>初学 JS 的童鞋经常会有诸多疑问，我在很多 QQ 群也混了好几年了，耳濡目染也也收获了不少，以后会总结下问题的结论，顺便说说相关知识的扩展~</p>
<p>如果贸然回答还会冒泡，这不太好的，稍微严谨点考虑 0级 DOM 事件模型的话，这个答案是否定的。但是在 2级 DOM 事件模型中，答案是肯定的，这个问题值得探讨记录下。</p>
<p>本文地址：<a href="http://www.cnblogs.com/hustskyking/p/problem-javascript-event.html">http://www.cnblogs.com/hustskyking/p/problem-javascript-event.html</a>&nbsp;</p>
<h3>一、问题结论</h3>
<p>netscape 和 微软 曾经的战争还是比较火热的，当时， netscape 主张捕获方式，微软主张冒泡方式。后来 w3c 采用折中的方式，平息了战火，制定了统一的标准&mdash;&mdash;先捕获再冒泡。</p>
<div><strong>&nbsp;事件的触发有三个阶段</strong><ol>
<li>document&nbsp;往事件触发地点，捕获前进，遇到相同注册事件立即触发执行</li>
<li>到达事件位置，触发事件（多谢&nbsp;<span>@糖果果&nbsp;<span>指出&nbsp;<a href="#2878498">问题</a>&nbsp;，</span></span><span>@update 14/2/19</span> 如果该处既注册了冒泡事件，也注册了捕获事件，按照注册顺序执行）</li>
<li>事件触发地点往 document 方向，冒泡前进，遇到相同注册事件立即触发</li>
</ol>
<p>这么说很多人比较迷糊，我们在注册事件的时候，通常使用的是 捕获 或者 冒泡 的 一种：</p>

```
obj.addEventListener("click", func, true); // 捕获方式
obj.addEventListener("click", func, false); // 冒泡方式

```

<p>事件只会因为捕获或者冒泡触发一次。举个栗子：</p>
<p><strong><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/02/17/172047332617225.jpg" data-source="http://images.cnitblog.com/blog/387325/201402/172047332617225.jpg" alt=""></strong></p>
<p>点击 s2，结果是：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/02/17/172049374659103.jpg" data-source="http://images.cnitblog.com/blog/387325/201402/172049374659103.jpg" alt=""></p>
<p>因为这里采用的是捕获模式，从 document 往 s2 走，依次发现 s1 和 s2 都有注册捕获事件，于是便触发了，然后冒泡，没找到冒泡事件，不执行任何操作。如果将 true 改成 false，可以看到结果相反。为了更好的让你理解整个事件机制，我给他们的捕获和冒泡模式下都注册事件：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/02/17/172057001398575.jpg" data-source="http://images.cnitblog.com/blog/387325/201402/172057001398575.jpg" alt=""></p>
<p>结果真是太清晰了：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/02/17/172057281606167.jpg" data-source="http://images.cnitblog.com/blog/387325/201402/172057281606167.jpg" alt=""></p>


<h3>二、误区</h3>
<p>指出两个误区。</p>
<p><strong>1. 在同一个对象上注册事件，并不一定按照注册顺序执行</strong></p>
<p>这一点，从上面的例子可以看出，你随便打乱四个事件绑定的顺序，结果一般不变！出现这样结果的原因是存在捕获模式和冒泡模式。但是值得注意的是，下面 #5楼 @糖果果 提出的问题，之所以如此是因为事件目的地节点既绑定了冒泡事件也绑定了捕获事件，此时的执行顺序按照绑定的先后顺序执行（情况比较少见）。</p>
<p><strong>2.event.stopPropagation();就是阻止事件的冒泡</strong></p>
<p>这个表述不能说他错误，但是是不完整的，他除了阻止事件的冒泡，还阻止事件的继续捕获，简而言之就是阻止事件的进一步传播。下面的例子可以看到：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/02/17/172104390057858.jpg" data-source="http://images.cnitblog.com/blog/387325/201402/172104390057858.jpg" alt=""></p>
<p>结果是输出了 s1.</p>


<h3>三、拓展</h3>
<p><strong>1.&nbsp;stopImmediatePropagation 的使用</strong></p>
<p>这玩意儿是 w3c 的东西，使用的也不是特别多，我们知道 stopPropagation 可以阻止事件的进一步传播，但是他阻止不了该元素上绑定的其他函数的执行，比如我们在 obj 上绑定了 func1 和 func2，如果我们在 func1 中使用了&nbsp;stopPropagation ，那 func2 依然还是会执行出来。倘若这里使用&nbsp;stopImmediatePropagation，结果就不一样了，他不仅阻止事件的传播，还阻止 func2 的执行。如：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/02/17/172112453398807.jpg" data-source="http://images.cnitblog.com/blog/387325/201402/172112453398807.jpg" alt=""></p>
<p>结果是：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/02/17/172113011073790.jpg" data-source="http://images.cnitblog.com/blog/387325/201402/172113011073790.jpg" alt=""></p>
<p>而改成evt.stopImmediatePropagation();之后，阻止了第二个监听事件的触发：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/02/17/172113246634621.jpg" data-source="http://images.cnitblog.com/blog/387325/201402/172113246634621.jpg" alt=""></p>
<p>结果是：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/02/17/172113354087200.jpg" data-source="http://images.cnitblog.com/blog/387325/201402/172113354087200.jpg" alt=""></p>
<p><strong>2. setCapture 和 releaseCapture</strong></p>
<p>这两个是 IE 下的事件绑定函数，只要我们在某个元素上 setCapture 了，那么你在任何地方的鼠标操作（mouseXXX之类的动作）都会在这个元素上触发（前提是你在这个元素上绑定了事件），releaseCapture 或者本窗口失去聚焦才会释放这个绑定~</p>


<h3>四、小结</h3>
<p>对于此类知识的学习，应该查阅官方点的文档，或者看看《JavaScript权威指南》的解说，后期会经常整理诸如此类的问题。若有疑问，可以在下方评论中提出。</p>


</div>