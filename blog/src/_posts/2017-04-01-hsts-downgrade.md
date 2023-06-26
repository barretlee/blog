---
title: 聊聊 HSTS 下的 HTTPS 降级问题
description: >-
  HSTS 的作用是为了在用户通过 HTTP 访问网站时不需要服务器做 301/302 跳转，直接一个 307 本地强制使用 HTTPS
  访问网站，这可以防止用户在第一次发出请求时被劫持，也减少了一次请求。
warning: true
categories:
  - 网络技术
  - 前端杂烩
tags:
  - HTTPS
  - HSTS
date: 2017-04-01 12:00:02
---


HSTS 的作用是为了在用户通过 HTTP 访问网站时不需要服务器做 301/302 跳转，直接一个 307 本地强制使用 HTTPS 访问网站，这可以防止用户在第一次发出请求时被劫持，也减少了一次请求。

![secure](/blogimgs/2017/04/01/TB1xL5RQpXXXXXIXpXXXXXXXXXX-900-500.jpg)<!--<source src="https://img.alicdn.com/tfs/TB1xL5RQpXXXXXIXpXXXXXXXXXX-900-500.jpg">-->

<!--more-->

HSTS 是服务器（如 Nginx）通过一个 Strict-Transport-Security 请求响应头写入到客户端的，所以用户至少要访问一次这个网站，HSTS 才会生效。HSTS 还可以申请内置到浏览器中，Chrome 维护了 HSTS Preload List 名单，允许用户在从未访问某网站的情况下，第一次访问时就自动使用 HTTPS。安全性就更强了。

**降级问题**

那么问题就来了，如果你的域名服务器配置了 HSTS 策略，而网站因为某些原因又降级为 HTTP，此时客户端岂不是被坑到了？因为每次访问都会在本地强制使用 HTTPS，结果就是网站访问失败，如何解决呢？

HSTS 的设置时间一般都不短，而内置到 Chrome 中的 HSTS Preload List 要求更为严格，必须设置 18 周以上的缓存时间，如果想把自己的域名从名单中撤出来，需要经历漫长的审核以及浏览器的发版。

对于加到 Preload 的网站，基本无解，所以内心需要多么坚定地拥护 HTTPS 才敢走出这一步，可想而知。我查了下，BAT 都是没有加进去的，Google/Twitter/Facebook 倒是都加进去了。

**使用 Chrome 工具删除**

即便你的网站没加入到 Preload，遇到以上问题，其实也是无解的，只能等 HSTS 设置时间过期，或者告诉用户使用 Chrome 提供的开发者工具，将名单删除，怎么删除呢？

在浏览器打开 `chrome://net-internals/#hsts` 这个页面，可以看到三个选项：

- Add domain，可以将你的域名添加到 Preload 中，这只在你的浏览器生效
- Delete domain，将手动或者 Nginx 设置了 HSTS 的域名从浏览器删除，也就是上面问题的处理方案，但这里是删不掉内置到 HSTS Preload List 的域名的
- Query domain，我就是从这里查到 BAT/GTF 这 6 个网站是否加入到 Preload 的

![删除](/blogimgs/2017/04/01/TB1VHKtQpXXXXajaXXXXXXXXXXX-532-102.png)<!--<source src="https://img.alicdn.com/tfs/TB1VHKtQpXXXXajaXXXXXXXXXXX-532-102.png">-->

---

题图：<https://unsplash.com/search/secure?photo=bt41lw9i6Kc>
