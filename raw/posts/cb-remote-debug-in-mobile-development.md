---
title: PC远程调试移动设备
categories:
  - JavaScript
  - 前端杂烩
  - 网络交互
tags:
  - tech
  - cnblogs
  - 移动端调试
date: 2014-08-29 12:15:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2014/08/29/remote-debug-in-mobile-development.html" target="_blank">博客园</a>.</div>

<p>我们在移动端进行前端开发时，会遇到一个让人头痛但不得不面对的问题&mdash;&mdash;调试。</p>
<p>在 PC 机器上，我们有功能强大的 Chrome DevTools、Firebug，即便是老版本的 IE ，我们也可以安装微软提供的插件，对网页样式和请求信息轻松进行调试。但在手机、平板上，很多人就无招可施了，一个劲的 alert 查看调试信息。如果你已经厌倦了可爱又可恨的 alert 弹窗，请继续往下阅读。</p>
<h3>一、先说说调试的原理</h3>
<p>设备浏览器中输入一个 URL，它会向 URL 所在的 server 请求资源：</p>

```
+-------------+         +---------------+
|    client   |--------→|    Internet   |
+-------------+         +---------------+

```

<p>此时，数据是从 client 和 目标 server 之间的隐秘交互，除非 server 端的代码是由我们自己控制，否则很难了解他们之间都做了什么信息传递。如果 server 传过来的代码存在 bug，此时我们就相当纠结了。比较常见的情景是，该 server 就是我们的测试机器，我们在测试机器上开发，通过一个移动设备 client 来实施调试代码，常用的调试方式就是修改 server 代码，再实时查看 client 的响应。</p>
<p>但是，问题来了。某天，Barret 发现 client 端页面显示有 bug，由于 client 请求的目标 server 是线上，不像平时的测试机器，我们可以随意修改代码然后查看效果，并且线上的代码都是经过压缩和打包了的，很难阅读，怎么办？</p>
<p>于是，我想到了使用代理：</p>

```
+-------------+    \ /   +---------------+
|    client   |-----×---→|    Internet   |
+-------------+    / \   +---------------+
       |                         ↑
       |                         |
       |     +-------------+     |
       +----→|    proxy    |-----+
             +-------------+

```

<p>我们在 client 端做相应配置，让他的请求强制指向 proxy，然后 proxy 转发请求到目标 server，proxy 上的请求和响应都是透明的，通过篡改 client 到 proxy 的请求，或者篡改 server 到 proxy 的响应，就可以实时查看这些人为修改在 client 端的效果了。本文目的就是说明 proxy 是如何操作的。</p>
<h3>二、通过 Fiddler 代理</h3>
<p>windows 下著名的 http(s) 代理软件 fiddler 使用比较广泛，mac 下可以使用 charles 代理，由于使用人群相对偏少，本文就不细说，感兴趣的可以 PM 我。charles 是一个跨平台的软件，windows 下也可以使用，不过个人偏好 fiddler。OK，我们来看看 fiddler 是如何一步一步完成网络代理的。</p>
<p><strong>1. 配置客户端</strong></p>
<p>这里说的客户端包括手机、平板甚至电脑。一般的 android / IOS 设备都可以设置代理：</p>
<p>step 1. 当连接好网络之后（相信你在一个 wifi 环境下进行开发），点击右侧的箭头按钮，我使用的是 android 手机，IOS 也比较好找，在 设置&gt;Wi-Fi 中找到对应的网络，右侧有个圆圈包着的 i 图标，点击进入：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/08/29/282333111579295.jpg" data-source="http://images.cnitblog.com/blog/387325/201408/282333111579295.jpg" alt="" width="289" height="511"></p>
<p>step 2.&nbsp;一般代理方式有两种，手动和自动，将其设置为手动，然后填写，你电脑的 IP（为啥呢？因为 proxy 是你的电脑，client 的请求要全部转发到你的电脑上，然后使用 fiddler 软件去分析/替换请求），windows 下使用 ipconfig 可以看到本机 IP，linux/unix 下使用 ifconfig 查看：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/08/29/282339113135798.jpg" data-source="http://images.cnitblog.com/blog/387325/201408/282339113135798.jpg" alt="" width="452" height="296"></p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/08/29/282333236261387.jpg" data-source="http://images.cnitblog.com/blog/387325/201408/282333236261387.jpg" alt="" width="285" height="505"></p>
<p>step 3.&nbsp;设置端口，端口可以随意设置，但最好大于 3000，数值比较小的端口可能被系统占用了。</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/08/29/282340576885734.jpg" data-source="http://images.cnitblog.com/blog/387325/201408/282340576885734.jpg" alt=""></p>
<p>这里需要注意一点，由于 client 相对我们电脑的 fiddler 来说是一个远程设备，所以要在 Allow Remote Computers to Connert 选项上打上勾勾。</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/08/29/282339362666508.jpg" data-source="http://images.cnitblog.com/blog/387325/201408/282339362666508.jpg" alt=""></p>
<p>step 4.&nbsp;进入手机浏览器，输入网址：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/08/29/282343301106735.jpg" data-source="http://images.cnitblog.com/blog/387325/201408/282343301106735.jpg" alt="" width="258" height="458"></p>
<p>step 5.&nbsp;然后把你的眼睛挪到电脑屏幕上看看 fiddler：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/08/29/282344162984759.jpg" data-source="http://images.cnitblog.com/blog/387325/201408/282344162984759.jpg" alt=""></p>
<p>到这里，我相信你已经看明白了整个 proxy 的原理。至于 fiddler 如何替换包，如何修改包，如果调试，不是本文叙述的重点，下面演示一个简单的替换。</p>
<p><strong>2. 调试</strong></p>
<p>请求百度的页面，我们把百度的 logo 换成博客园的：</p>
<p>step 1. 在 AutoResponder 中添加一项：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/08/29/282352193137126.jpg" data-source="http://images.cnitblog.com/blog/387325/201408/282352193137126.jpg" alt="" width="776" height="405"></p>
<p>step 2. 进入你的浏览器（UC下清空缓存，如果缓存中有百度图片，他会使用缓存，并不发出这个请求），打开百度页面：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/08/29/282356507983855.jpg" data-source="http://images.cnitblog.com/blog/387325/201408/282356507983855.jpg" alt="" width="284" height="506"></p>
<p>然后你就发现，貌似哪里有点不对~ 除此之外，你还可以将线上文件替换到本地，比如线上的 xyz-min.js 替换成本地的 xyz.js 然后修改 xyz.js 的内容，直接调试线上 bug，异常方便！</p>
<h3>三、其他工具</h3>
<p>有人会说，我没有实体机，那我建议你在电脑上安装虚拟机，android 和 IOS 的虚拟机都比较好安装。</p>
<p>有人会说，我电脑太卡，跑不动虚拟机，那我建议你就是用上述方式。</p>
<p>有人会说，.....，（如果没实体机也没虚拟机，那你开发个毛线呀）。</p>
<p>Fiddler 和 Charles 都是 HTTP(s) 层的抓包软件，如果你是 websocket 开发调试，建议使用 wireshark，网络七层协议，这个软件能抓除数据链路层之外的所有层信息，出于安全考虑，它抓到的包是不能篡改的。</p>
<p>还有一些比较好用的工具，如利用 pac 文件配置系统代理，weinre 调试等，这里简单介绍下 weinre：</p>
<div>
<h4>1. 安装</h4>

```
npm install –g weinre

```

<h4>2. 打开</h4>

```
weinre -httpPort 7999 -boundHost -all-

```

<ul>
<li>httpPort 监听端口</li>
<li>boundHost –all- 绑定主机</li>
</ul>
<h4>3. 说明都写在图片里头，相信聪明的你可以悟到</h4>
</div>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/08/29/290011110635771.png" data-source="http://images.cnitblog.com/blog/387325/201408/290011110635771.png" alt="" width="675" height="710"></p>
<h3>四、小结</h3>
<p>移动端开发不比 PC 轻松，调试只是需要注意的一个小点，还有很多很多未知的东西等着我们去探索，本文也算是抛砖引玉，如果您有更好的移动端调试方案，希望可以分享出来，一起交流。</p>

