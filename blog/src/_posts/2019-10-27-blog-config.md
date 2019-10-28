---
title: 本博客的配置和发布
description: 小胡子哥的个人网站
warning: false
author: 小胡子哥
tags:
  - 'Blog'
categories:
  - 随笔
date: 2019-10-27 23:54:00
---

分享下我个人博客（<https://www.barretlee.com>）的配置和发布：

### 1. 域名

在 DNSPod 上配置的域名，默认解析到 coding pages，国外解析到 github pages，DNSPod 支持 D 监控，当域名不可用时会邮件警报。

coding 支持绑定多个域名，也支持给所有绑定的域名自动配置证书，github 只能绑定一个域名，这就会导致 www.barretlee.com 和 barretlee.com 只能有一个是 https，比较坑，貌似 Google 的 DNS 解析服务能够解决这个问题，国内的似乎都不行。

### 2. 开发

使用 hexo 构建，由于文章比较多，超过 300 篇，构建时长约 6min，很慢；hexo 支持多 git 仓库部署，我配置了 coding 和 github 两个。

使用了不少 hexo 的插件，但是很多都不满足需求，不满足需求的插件都重新改写了。平时使用改写的 hexo-admin 在本地编辑内容。

![blog config admin](/blogimgs/2019/10/27/blog-config-admin.png)


### 3. 部署

以前每次都是本地编辑文章，然后构建发布，发现错别字，又回到本地编辑、构建、发布，体验十分差，所以近两年都懒得写文章了，宁愿发长微博。

本周末折腾了一番，接入了 travis-ci，发现还挺好用，只是配置的时候需要注意点 git 仓库权限问题，可以参考 <https://github.com/barretlee/blog/blob/master/.travis.yml> 解决问题，后续写文章应该会直接走 github 网页新建文件。

![blog config travis](/blogimgs/2019/10/27/blog-config-travis.png)

### 4. 评论

从多说到畅言到 github issue，估计不会再继续折腾了，看了两个开源的 github issue 评论组件，gitment 和 gitalk ，这两个工具都有点像半成品，感觉还有很大的优化空间，由于 gitalk UI 稍微看得舒服点，将就着用了，效果如图四。历史评论就懒得迁移了。

![blog config comment](/blogimgs/2019/10/27/blog-config-comment.png)

周末把博客 UI 的部分细节做了调整，估计后续三五年都不会再折腾博客设计了。
