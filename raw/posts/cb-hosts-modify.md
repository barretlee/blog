---
title: 修改Hosts为何不生效，是DNS缓存？
categories:
  - 工具
  - 前端杂烩
  - 网络交互
tags:
  - tech
  - cnblogs
  - hosts
mark: hot
date: 2015-05-11 10:47:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2015/05/11/hosts-modify.html" target="_blank">博客园</a>.</div>

<p><strong>Update:</strong></p>
<ul>
<li>如果浏览器使用了代理工具，修改 Hosts 也不会生效。这里是因为，浏览器会优先考虑代理工具（如添加 pac 文件、SwitchySharp等）的代理，建议调试的时候先关闭这些代理。</li>
<li>使用 pac 文件代理有的时候部分文件的代理不生效，应该是 pac 对应的代理服务器上，做了部分处理。</li>
<li>部分浏览器也有 DNS 缓存，如 chrome(chrome://dns)，这是为什么重启浏览器也不生效的原因，一般设定时间为 60s (如 Firefox)。</li>
<li>浏览器有DNS缓存，系统也会存在 DNS 缓存，有的时候即便在 chrome://dns 清空了浏览器 DNS 缓存，依然不生效，是因为系统 DNS 缓存还未刷新，刷新方式可以看<a href="http://cnzhx.net/blog/how-to-flush-dns-cache-in-linux-windows-mac/">这篇文章</a>。</li>
</ul>
<hr>
<p>&nbsp;相信很多同学都在使用 SwitchHosts/<a href="http://ihosts.alibaba.net/" target="_blank">iHosts</a>/Gas Mask 等 Hosts 管理工具，当然也有人直接修改 <code>/etc/hosts</code> 或者 <code>system32/drivers/etc/hosts</code> 文件，而经常遇到的疑问是：咿，刚才不是修改并且保存了么，为何 Chrome 浏览器还不生效呢？</p>
<ul>
<li>有人说重启下浏览器就好了，</li>
<li>有人说清空下缓存 DNS（chrome://net-internals/#DNS）就好了，</li>
<li>有人说隐私模式下打开就好了，</li>
<li>有人说等一分钟吧...</li>
</ul>
<p>结果就是，进入隐私模式的都好了，重启、清空缓存DNS和等一分钟的同学还在继续纠结中。。。</p>
<p>上面提到的三个工具，SwitchHosts/iHosts/Gas Mask，其实也只有 iHosts 生效了(Mac下)。</p>
<p>开发过程中我们会无数次的切换 Hosts，如果不知道原理，我们在测试的时候还是很心惊胆战的=_=||</p>
<h3 id="0">修改Hosts不生效的根本原因</h3>
<p><strong>因为服务器设置了 <code>keep-alive</code> ！次要原因是存在浏览器 DNS 缓存和系统 DNS 缓存。</strong></p>
<p>&gt; Keep-alive <a href="http://zh.wikipedia.org/wiki/HTTP%E6%8C%81%E4%B9%85%E8%BF%9E%E6%8E%A5" target="_blank">相关文档</a></p>
<p>服务器在响应头设置了 <code>Connection: keep-alive</code> （一般的网页都会设置 keep-alive，保持长连接，避免多次连接产生网络消耗）之后，客户端会跟服务器保持长连接，只要长连接不断开，页面在请求的时候就不会重新解析域名！</p>
<p>我们可以这样来测试：</p>
<ol>
<li>打开一个你至少两分钟没有打开的浏览器（你也可以关闭掉你的浏览器，然后重新打开，记得把所有的 tab 都关了，除了当前 tab ^_^）</li>
<li>在 hosts 添加 <code>127.0.0.1 www.taobao.com</code></li>
<li>新开 tab，打开 <a href="http://www.taobao.com">www.taobao.com</a>，是不是进不去了 &lt;这里说明 hosts 修改生效了&gt;</li>
<li>注释掉刚才hosts修改，<code># 127.0.0.1 www.taobao.com</code> ，再打开 <a href="http://www.taobao.com">www.taobao.com</a>，很好，正常打开了 &lt;这里说明 hosts 修改也生效了&gt;</li>
<li>去掉注释符，<code>127.0.0.1 www.taobao.com</code> ，再打开 <a href="http://www.taobao.com">www.taobao.com</a>，依然可以访问！！！</li>
<li>Chrome 中进入 chrome://net-internals/#sockets，<img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/05/11/111045527042806.png" data-source="http://images.cnitblog.com/blog2015/387325/201505/111045527042806.png" alt="">，可以看到淘宝首页中很多域名都是与服务器保持着长连接，点击上方的 <code>close idle sockets</code> 按钮，可以关闭所有的长连接</li>
<li>此时，再去访问 <a href="http://www.taobao.com">www.taobao.com</a>，是不是进不去了！</li>
</ol>
<h3 id="1">为何一些修改可以让 "Hosts 生效"</h3>
<h4 id="2">1. 重启浏览器</h4>
<p>重启浏览器之后，所有的连接（包括长连接）都会断开，自然就生效了</p>
<h4 id="3">2. 隐私模式打开</h4>
<p>因为隐私模式下不会复用 TCP 连接，新开连接的时候，会重新解析 DNS 域名，自然也生效了</p>
<h4 id="4">3. iHosts 管理器在 Mac 下生效</h4>
<p>因为我在 Windows 下测试过，貌似没有立即生效。问了 iHosts 的作者@必隆，他告诉我，在修改 hosts 文件的时候，会重启网络服务，这个时候必然会断开所有的 TCP 连接（重启网络服务，差不多相当于先断网再联网...)</p>
<h4 id="5">4. 修改之后，等一会儿...</h4>
<p>"等一会儿"，要稍微等久一点，<code>keep-alive</code> 的默认设置是 120s，开发者也有可能增大或者减小这个配置，所以"等一会儿"也是很伤神的=。 =</p>
<p>看到这里，你对其中的原理是否有所了解了呢？</p>