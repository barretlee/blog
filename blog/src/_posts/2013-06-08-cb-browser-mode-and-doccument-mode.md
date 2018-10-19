---
title: 关于浏览器模式和文本模式的困惑
categories:
  - JavaScript
  - 剪贴板
tags:
  - tech
  - cnblogs
warning: true
date: 2013-06-08 12:10:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/06/08/browser-mode-and-doccument-mode.html" target="_blank">博客园</a>.</div>

<h4>什么是浏览器模式和文本模式？</h4>
<p>经常使用IE开发者工具的同学，肯定见过浏览器模式和文本模式，对于这两个名词，综合相关文档解释如下：</p>
<p><strong>浏览器模式</strong>（Browser Mode），用于切换IE针对该网页的默认文本模式、对不同版本浏览器的条件注释解析、决定请求头里userAgent的值。它在浏览器发出请求之前就已经确定，网站没有办法修改这个值。它代表的是用户以何种浏览器访问网站。IE9支持下列浏览器模式：</p>
<table border="1">
<tbody>
<tr><th>&nbsp;</th><th>userAgent</th><th>默认文本模式</th></tr>
<tr>
<td><em>IE7</em></td>
<td>MSIE 7.0</td>
<td><em>IE7标准</em></td>
</tr>
<tr>
<td><em>IE8</em></td>
<td>MSIE 8.0 && Trident/4.0</td>
<td><em>IE8标准</em></td>
</tr>
<tr>
<td><em>IE9</em></td>
<td>MSIE 9.0 && Trident/5.0</td>
<td><em>IE9标准</em></td>
</tr>
<tr>
<td><em>IE9兼容性</em></td>
<td>MSIE 7.0 && Trident/5.0</td>
<td><em>IE7标准</em></td>
</tr>
</tbody>
</table>
<p>（<em>IE9兼容性</em>模式与<em>IE7</em>模式的区别是：前者在UA里加上了Trident版本，后者和IE7完全一致无Trident标识；IE8中，<em>IE9兼容性</em>模式对应为<em>IE8兼容性</em>模式，UA里Trident版本为4.0，其他没变化。另，IE8中没有<em>IE9模式</em>）<span id="more-94"></span></p>
<p><strong>文本模式</strong>（Document Mode），其实就是经常说的文档模式。不同的文本模式对应不同的排版引擎，不同的JS引擎。上面提到，每一种浏览器模式对应一种默认的文本模式，网站还可以通过一些手段来更改文本模式，它代表的是浏览器以何种模式呈现页面。IE9有下列文本模式：</p>
<table border="1">
<tbody>
<tr><th>&nbsp;</th><th>documentMode</th></tr>
<tr>
<td><em>IE7标准</em></td>
<td>7</td>
</tr>
<tr>
<td><em>IE8标准</em></td>
<td>8</td>
</tr>
<tr>
<td><em>IE9标准</em></td>
<td>9</td>
</tr>
<tr>
<td><em>怪异</em>（Quirks）</td>
<td>5</td>
</tr>
</tbody>
</table>
<p>（需要说明的是，IE8开始支持的渲染机制有：怪异模式（quirks mode）、完全标准模式（standards mode）和近似标准模式（almost standards mode），但开发者工具是无法选择近似标准模式的，实际上我们一般都选择触发完全标准模式）</p>
<h4>浏览器模式和文本模式有什么用？</h4>
<p>用来解决IE各版本带来的兼容性问题。根据微软描述的IE兼容性策略，在IE8+访问一个页面要经过这样的流程：</p>
<p><strong>一、</strong>首先，浏览器要确定浏览器模式。上面说过，浏览器模式是在请求发送之前就必须确定，默认取最新（IE9为<em>IE9标准</em>，IE8为<em>IE8标准</em>），有两种方式可以更改它：</p>
<ul>
<li>通过开发者工具选择（可选项见上表）；</li>
<li>通过点击兼容性视图按钮；</li>
<li>命中兼容性视图列表（微软维护的需要采用兼容性视图的列表。IE8+默认对这个列表和局域网的网址都会采用<em>相应的兼容性</em>模式）；</li>
</ul>
<p><strong>二、</strong>浏览器通过请求头里userAgent的值，告诉服务器当前是何种浏览器模式；</p>
<p><strong>三、</strong>服务器可以通过下面方式改变浏览器文本模式：</p>
<ul>
<li>doctype；</li>
<li>X-UA-Compatible Meta或对应的响应头；</li>
</ul>
<p><strong>四、</strong>浏览器综合考虑开发者工具设置、第三步服务器返回的设置、兼容性列表设置等等情况，决定页面使用何种文本模式。这个过程有点复杂，放一张Qwrap群里灰大提供的流程图，可以自己点开看大图。</p>
<p><a href="http://st.imququ.com/uploads/2012/02/ie9.jpg"><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/06/08/m_ie9.jpg" data-source="http://st.imququ.com/uploads/2012/02/m_ie9.jpg" alt="" width="500" height="875"></a></p>
<p>（上图是IE9选取文本模式的流程图，<a href="http://st.imququ.com/uploads/2012/02/ie8.png">这里还有IE8版本</a>，有一些区别）</p>
<h4>问题终于来了！</h4>
<p>回顾下前面的介绍，浏览器模式决定：1）发送给服务端的UA；2）默认的文本模式；3）如何解析条件注释。它在请求发送前就已经确定，且不受服务端控制。文本模式决定：1）排版引擎；2）JS引擎。它在浏览器得到响应后最终确定，服务端可通过doctype或X-UA-Compatible来控制。</p>
<p><strong>测试一、</strong>根据前文，如果用户浏览器没有激活兼容性视图；没有开启IE开发者工具。那么IE9的浏览器模式默认为<em>IE9</em>，默认对应的文本模式应该是<em>IE9标准</em>（对于IE8来说，是类似的），我们通过下列代码将它改到<em>IE7标准</em>：</p>
<div>
<div id="highlighter_562551" class="syntaxhighlighter nogutter  html">
<div class="toolbar">&nbsp;

```
<meta http-equiv="X-UA-Compatible" content="IE=7">

```

</div>
</div>
</div>
<p>下面，我们分别用原生IE8、IE9测试<a href="http://qgy18.imququ.com/file/test0.html">这个页面</a>：</p>
<table border="1">
<tbody>
<tr><th>&nbsp;</th><th>请求头UA</th><th>navigator.userAgent</th><th>条件注释</th><th>documentMode</th><th>JS引擎</th></tr>
<tr>
<td>IE8</td>
<td>MSIE 8.0 && Trident/4.0</td>
<td>MSIE 8.0 && Trident/4.0</td>
<td><em>IE7</em></td>
<td>7</td>
<td><em>IE7</em></td>
</tr>
<tr>
<td>IE9</td>
<td>MSIE 9.0 && Trident/5.0</td>
<td>MSIE 7.0 && Trident/5.0</td>
<td><em>IE7</em></td>
<td>7</td>
<td><em>IE7</em></td>
</tr>
</tbody>
</table>
<p>上表说明，浏览器发送请求时的浏览器模式符合预期（根据请求头UA），X-UA-Compatible确实会将浏览器文本模式改到了<em>IE7标准</em>（根据documentMode和JS引擎）。奇怪的是，文本模式的改变导致了浏览器模式的改变，因为条件注释是由浏览器模式决定的。本例中，文本模式改到<em>IE7标准</em>，条件注释也跟着变成<em>IE7</em>，意味着浏览器模式变到<em>IE9/IE8兼容性</em>（从IE9的测试来看，不能是<em>IE7</em>，因为UA里包含Trident）。至于IE8中JS取到的UA为什么没有变化，可能是bug或者理解不一致。</p>
<p><strong>测试二、</strong>那如果把测试地址加到兼容性列表呢？根据前文，这种情况浏览器模式应该是<em>IE9/IE8兼容性</em>，对应的文本模式依然是<em>IE7标准</em>。测试结果如下：</p>
<table border="1">
<tbody>
<tr><th>&nbsp;</th><th>请求头UA</th><th>navigator.userAgent</th><th>条件注释</th><th>documentMode</th><th>JS引擎</th></tr>
<tr>
<td>IE8</td>
<td>MSIE 7.0 && Trident/4.0</td>
<td>MSIE 7.0 && Trident/4.0</td>
<td><em>IE7</em></td>
<td>7</td>
<td><em>IE7</em></td>
</tr>
<tr>
<td>IE9</td>
<td>MSIE 7.0 && Trident/5.0</td>
<td>MSIE 7.0 && Trident/5.0</td>
<td><em>IE7</em></td>
<td>7</td>
<td><em>IE7</em></td>
</tr>
</tbody>
</table>
<p>上表是完全符合预期的。</p>
<p><strong>测试三、</strong>如果把X-UA-Compatible改成IE=edge，继续使用兼容性模式测试呢？结论如下：</p>
<table border="1">
<tbody>
<tr><th>&nbsp;</th><th>请求头UA</th><th>navigator.userAgent</th><th>条件注释</th><th>documentMode</th><th>JS引擎</th></tr>
<tr>
<td>IE8</td>
<td>MSIE 7.0 && Trident/4.0</td>
<td>MSIE 7.0 && Trident/4.0</td>
<td><em>IE8</em></td>
<td>8</td>
<td><em>IE8</em></td>
</tr>
<tr>
<td>IE9</td>
<td>MSIE 7.0 && Trident/5.0</td>
<td>MSIE 9.0 && Trident/5.0</td>
<td><em>IE9</em></td>
<td>9</td>
<td><em>IE9</em></td>
</tr>
</tbody>
</table>
<p>这个结论其实跟测试一是一致的：X-UA-Compatible为IE=edge，意味着文本模式会使用最新可用的版本，然而文本模式的更改，又把浏览器模式从<em>IE9/IE8兼容性</em>变成<em>IE9/IE8</em>。IE9会按照新的浏览器模式来设置JS的navigator.userAgent，IE8下JS的UA不变。</p>
<p><strong>测试四、</strong>那如果通过开发者工具人为设置浏览器模式和文本模式呢？经过测试，这样测试都是符合预期的。例如IE9下，设置浏览器模式为<em>IE8</em>，文本模式为<em>IE7标准</em>，请求头UA、JS的UA、条件注释都表明浏览器模式是<em>IE8</em>，documentMode和JS引擎都表明文本模式是<em>IE7标准</em>。因为，IE开发者工具的优先级最高，设置了这个，其他条件统统无视！</p>
<h3>结论</h3>
<p>IE8/9中X-UA-Compatible对文本模式的改变会导致浏览器模式的改变，也就是说服务端可以间接控制浏览器模式。这与微软文档里这一段描述有出入：</p>
<blockquote>
<p>An important detail to remember is that&nbsp;<strong><em>Browser Mode is chosen before IE requests web content</em></strong>. This means that&nbsp;<strong>sites cannot choose a Browser Mode</strong>.</p>
</blockquote>
<p>对于IE8，如果网站通过X-UA-Compatible meta/header更改文本模式为当前浏览器模式默认文本模式之外的值，那么页面将按照新的文本模式来呈现，条件注释也按照新的文本模式对应的浏览器模式来解析，但是JS获取的UA是浏览器模式初始状态。这样会导致用JS获取UA得到的浏览器版本，与实际渲染的浏览器版本不符，这会对基于UA的浏览器检测造成干扰。</p>
<p>对于IE9，只有一点与IE8不同：JS获取到的是新文本模式对应的浏览器模式的UA。这会导致用JS获取UA得到的浏览器版本，与请求头发送给服务器UA里标识的浏览器版本不符，这可能对统计有影响。</p>
<p>对于IE这种兼容性方案，几乎不可能做到理论上的完美。个人感觉还是IE9的策略影响面较小，更好一些。</p>
<p>PS，上述结论都是我用Windows XP的原生IE8，Windows 7的原生IE9亲自测试得出来的。对于国内那些IE Shell们，实在过于奇葩，不在本文范围内。</p>
<p>参考：</p>
<ol>
<li><a href="http://blogs.msdn.com/b/ie/archive/2010/10/19/testing-sites-with-browser-mode-vs-doc-mode.aspx">Testing sites with Browser Mode vs. Doc Mode</a></li>
<li><a href="http://www.zachleat.com/web/et-tu-x-ua-compatible/">X-UA-Compatible header/meta tag is NOT the same as the Internet Explorer 8+ Compatibility View button</a></li>
</ol>


<p>原文链接：<a title="Permalink to 关于浏览器模式和文本模式的困惑" href="http://www.imququ.com/post/browser-mode-and-document-mode-in-ie.html" rel="bookmark">http://www.imququ.com/post/browser-mode-and-document-mode-in-ie.html</a></p>



