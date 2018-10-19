---
title: JavaScript跨域（1）：什么是跨域，如何跨域
categories:
  - JavaScript
  - 杂物间
tags:
  - tech
  - cnblogs
  - 跨域
warning: true
date: 2013-03-31 07:05:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/03/31/CDS-introduce.html" target="_blank">博客园</a>.</div>

<p>　　无数次看到：<span><span>Origin null is not allowed by Access-Control-Allow-Origin</span>&nbsp;, 网络没有让你绝望，但是或许会让你蛋疼，因为你找了半天没看到一个比较实用的解决方案，亦或者水平不够，别人写的东西累赘没看懂，抑或是。。。</span></p>
<p>　　网上看到了一篇文章&mdash;&mdash;<a title="cds" href="http://www.cnblogs.com/hustskyking/articles/ten-methods-cross-domain.html" target="_blank">跨域资源共享的10中方式</a>，已经放在自己的家里了O(&cap;_&cap;)O~</p>
<p>　　跨域也是平时项目中比较让人头疼的一个玩意儿，上文只是简要地提出了有哪些跨域方式，这里呢，将向大家详细说明，各种使用频率比较高的跨域方式。</p>
<p>　　什么是跨域：</p>
<blockquote>
<p><span>A&nbsp;</span><strong>cross-domain solution</strong><span>&nbsp;(</span><strong>CDS</strong><span>) is a means of&nbsp;</span><a title="Information assurance" href="http://en.wikipedia.org/wiki/Information_assurance">information assurance</a><span>&nbsp;that provides the ability to manually or automatically access or transfer between two or more differing security domains.</span></p>
</blockquote>
<p>　　上面是从wiki上引用过来的。意思是：解决两个安全域之间的信息传递，这个就叫做CDS&mdash;&mdash;跨域解决方案。首先解释下怎么样的两个域之间的数据传输需要跨越。</p>
<p><span>&nbsp;</span></p>
<h3>What [什么是跨域]</h3>
<p>　　JavaScript出于安全方面的考虑，不允许跨域调用其他页面的对象。但在安全限制的同时也给注入iframe或是ajax应用上带来了不少麻烦。这里把涉及到跨域的一些问题简单地整理一下：</p>
<p>　　首先什么是跨域，简单地理解就是因为JavaScript同源策略的限制，a.com 域名下的js无法操作b.com或是c.a.com域名下的对象。更详细的说明可以看下表：</p>
<table class="border">
<tbody>
<tr><th>URL</th><th>说明</th><th>是否允许通信</th></tr>
<tr>
<td>http://www.a.com/a.jshttp://www.a.com/b.js</td>
<td>同一域名下</td>
<td>允许</td>

</tr>
<tr>
<td>http://www.a.com/lab/a.jshttp://www.a.com/script/b.js</td>
<td>同一域名下不同文件夹</td>
<td>允许</td>

</tr>
<tr>
<td>http://www.a.com:8000/a.jshttp://www.a.com/b.js</td>
<td>同一域名，不同端口</td>
<td>不允许</td>

</tr>
<tr>
<td>http://www.a.com/a.js//www.a.com/b.js</td>
<td>同一域名，不同协议</td>
<td>不允许</td>

</tr>
<tr>
<td>http://www.a.com/a.jshttp://70.32.92.74/b.js</td>
<td>域名和域名对应ip</td>
<td>不允许</td>

</tr>
<tr>
<td>http://www.a.com/a.jshttp://script.a.com/b.js</td>
<td>主域相同，子域不同</td>
<td>不允许</td>

</tr>
<tr>
<td>http://www.a.com/a.jshttp://a.com/b.js</td>
<td>同一域名，不同二级域名（同上）</td>
<td>不允许（cookie这种情况下也不允许访问）</td>

</tr>
<tr>
<td>http://www.cnblogs.com/a.jshttp://www.a.com/b.js</td>
<td>不同域名</td>
<td>不允许</td>

</tr>

</tbody>

</table>
<p><span>&nbsp;</span></p>
<h3>same-origin policy [同源策略]</h3>
<p>　　在客户端编程语言中，如<span class="wp_keywordlink_affiliate">javascript</span>和ActionScript，同源策略是一个很重要的安全理念，它在保证数据的安全性方面有着重要的意义。同源策略规定跨域之间的脚本是隔离的，一个域的脚本不能访问和操作另外一个域的绝大部分属性和方法。</p>
<p>　　那么什么叫相同域，什么叫不同的域呢？当两个域具有相同的协议(如http), 相同的端口(如80)，相同的host（如www.example.org)，那么我们就可以认为它们是相同的域。比如http://www.example.org/和http://www.example.org/sub/是同域，而http://www.example.org, //www.example.org, http://www.example.org:8080, http://sub.example.org中的任何两个都将构成跨域。同源策略还应该对一些特殊情况做处理，比如限制file协议下脚本的访问权限。本地的<span class="wp_keywordlink_affiliate">html</span>文件在浏览器中是通过file协议打开的，如果脚本能通过file协议访问到硬盘上其它任意文件，就会出现安全隐患，目前IE8还有这样的隐患。</p>
<p>　　受到同源策略的影响，跨域<span class="wp_keywordlink_affiliate">资源</span>共享就会受到制约。但是随着人们的实践和浏览器的进步，目前在跨域请求的技巧上，有很多宝贵经验的沉淀和积累。这里我把跨域<span class="wp_keywordlink_affiliate">资源</span>共享分成两种，一种是单向的数据请求，还有一种是双向的消息通信。</p>


<h3>How [如何跨域]</h3>
<p>　　你可以看看这个提纲，<a title="CDS" href="http://www.cnblogs.com/hustskyking/articles/ten-methods-cross-domain.html" target="_blank">跨域十法</a>，也可以等等，我会很详细很具体地告诉你如何跨域~</p>
<p>　　O(&cap;_&cap;)O哈哈~</p>
<p>　　下一节将给大家细说JSONP方法跨域。</p>


<h3>Reference [参考资料]</h3>
<p>　　1.<a title="wiki CDS" href="http://en.wikipedia.org/wiki/Cross-domain_solution" target="_blank">wiki</a></p>
<p>　　2.<a title="CDS" href="http://www.woiweb.net/10-cross-domain-methods.html" target="_blank">疯狂小强</a></p>
<p>　　3.<a title="CDS" href="http://www.cnblogs.com/rainman/archive/2011/02/20/1959325.html" target="_blank">Rain Man</a></p>