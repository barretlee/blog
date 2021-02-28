---
title: ajax请求管理
categories:
  - JavaScript
  - 杂物间
tags:
  - tech
  - cnblogs
warning: true
date: 2012-09-16 01:02:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2012/09/16/3049805.html" target="_blank">博客园</a>.</div>

<p><strong>本文从ITeye导入</strong></p>


<p><span><strong>ajax请求管理&mdash;&mdash;</strong>问题提出</span></p>


<p><span>&nbsp;&nbsp;&nbsp; Ajax应用程序虽然很强大且对用户很友好，但是也存在一些问题。</span></p>


<p><span>&nbsp;&nbsp;&nbsp; 如果客户端向服务器发送请求过于频繁，服务器将会陷入对来自多个用户的大量请求的处理中。进而，客户端在等待服务器返回大量的响应时就会变得十分迟钝。</span></p>


<p><span>&nbsp;&nbsp;&nbsp; <a class="quote_title" title="http1.1" href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec5.html#sec5" target="_blank">HTTP1.1规范</a>中规定一个客户端在同一时刻与同一个域名不能有两个以上的链接。虽然有一些方法能够突破这个限制（诸如使用子域名来处理某些请求），但绝大多数浏览器在同一时刻能够发起的链接也是有限的。</span></p>


<p><span>&nbsp;&nbsp;&nbsp; 当使用XHR时，这个限制将在后台进行处理：你只是根据自己的需求来启动请求，而浏览器在打开连接时将把他们放到队列中逐步发送。当请求比较少或者间隔比较长时，这种工作机制是能够满足需求的；但当在不同时刻，应用程序的各个部分都将发送请求时，这种内建的队列机制就无法提供足够的控制，无法确定请求将在何时发送，哪个请求先发送等。</span></p>


<p><span>&nbsp;&nbsp;&nbsp; 幸好，实现一个能够处理更复杂通信模式的自定义请求管理器并不难~</span></p>


<p><span>&nbsp;&nbsp;&nbsp; 待续......</span></p>