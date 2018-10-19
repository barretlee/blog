---
title: 让浏览器不再显示 https 页面中的 http 请求警报
categories:
  - 前端杂烩
  - 网络交互
  - 网络安全
tags:
  - tech
  - cnblogs
  - CSP
date: 2015-08-21 11:08:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2015/08/21/upgrade-insecure-requests.html" target="_blank">博客园</a>.</div>

<p>HTTPS 是 HTTP over Secure Socket Layer，以安全为目标的 HTTP 通道，所以在 HTTPS 承载的页面上不允许出现 http 请求，一旦出现就是提示或报错：</p>
<blockquote>
<p>Mixed Content: The page at "<a href="//www.taobao.com/">//www.taobao.com/</a>" was loaded over HTTPS, but requested an insecure image "<a href="http://g.alicdn.com/s.gif">http://g.alicdn.com/s.gif</a>". This content should also be served over HTTPS.</p>
</blockquote>
<p>HTTPS改造之后，我们可以在很多页面中看到如下警报：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/08/21/211107536449320.png" data-source="http://images0.cnblogs.com/blog2015/387325/201508/211107536449320.png" alt=""></p>
<p>很多运营对 https 没有技术概念，在填入的数据中不免出现 http 的资源，体系庞大，出现疏忽和漏洞也是不可避免的。</p>
<h3 id="cspupgrade-insecure-requests"><a class="headeranchor-link" name="user-content-cspupgrade-insecure-requests" href="#cspupgrade-insecure-requests"></a>CSP设置upgrade-insecure-requests</h3>
<p>好在 W3C 工作组考虑到了我们升级 HTTPS 的艰难，在 2015 年 4 月份就出了一个 <code>Upgrade Insecure Requests</code> 的<a href="http://www.w3.org/TR/mixed-content/">草案</a>，他的作用就是让浏览器自动升级请求。</p>
<p>在我们服务器的响应头中加入：</p>

```
header("Content-Security-Policy: upgrade-insecure-requests");

```

<p>我们的页面是 https 的，而这个页面中包含了大量的 http 资源（图片、iframe等），页面一旦发现存在上述响应头，会在加载 http 资源时自动替换成 https 请求。可以查看 google 提供的一个 <a href="//googlechrome.github.io/samples/csp-upgrade-insecure-requests/index.html">demo</a>：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/08/21/211108018005511.png" data-source="http://images0.cnblogs.com/blog2015/387325/201508/211108018005511.png" alt=""></p>
<p>不过让人不解的是，这个资源发出了两次请求，猜测是浏览器实现的 bug：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/08/21/211108089252988.png" data-source="http://images0.cnblogs.com/blog2015/387325/201508/211108089252988.png" alt=""></p>
<p>当然，如果我们不方便在服务器/Nginx 上操作，也可以在页面中加入 <code>meta</code> 头：</p>

```
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

```

<p>目前支持这个设置的还只有 chrome 43.0，不过我相信，CSP 将成为未来 web 前端安全大力关注和使用的内容。而 <code>upgrade-insecure-requests</code> 草案也会很快进入 RFC 模式。</p>
<p>从 W3C 工作组给出的 <a href="http://www.w3.org/TR/upgrade-insecure-requests/#examples">example</a>，可以看出，这个设置不会对外域的 a 链接做处理，所以可以放心使用。</p>
<h3 id="_1"><a class="headeranchor-link" name="user-content-_1" href="#_1"></a>相关阅读</h3>
<ul>
<li><a href="http://www.w3.org/TR/mixed-content/">http://www.w3.org/TR/mixed-content/</a></li>
<li><a href="//www.chromestatus.com/feature/6534575509471232">//www.chromestatus.com/feature/6534575509471232</a></li>
</ul>

