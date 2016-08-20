---
title: 三步，将多说评论迁移到 disqus
description: '关于多说，我不想多说什么，看看这两篇文章 http://www.barretlee.com/blog/2015/09/15/hei-duoshuo-what-is-wrong/ //imququ.com/post/back-to-disqus.html'
warning: true
categories:
  - 工具
tags:
  - disqus
  - 多说
date: 2015-10-15 15:59:57
---


关于多说，我不想多说什么，看看这两篇文章：

- [嘿，多说，你咋了？要不咱换成 DISQUS 吧~](http://www.barretlee.com/blog/2015/09/15/hei-duoshuo-what-is-wrong/)
- [Disqus，我又回来了！](//imququ.com/post/back-to-disqus.html)

<!--more-->

开始在网上搜罗了一番，没找到好用的，很多都是 python 写的，表示没学过 python，网上找了 [一个方案](http://blog.jamespan.me/2015/04/21/the-duoshuo-migrator/) 试用，出了好几个问题，最终还是没有搞定。所以自己重新捯饬了一个 nodejs 版本的：

- 仓库地址：<http://github.com/barretlee/duoshuo-migrate-to-disqus>
- 参考文档：[disqus 格式文档](//help.disqus.com/customer/portal/articles/472150-custom-xml-import-format)
- 参考文档：[多说格式文档](http://dev.duoshuo.com/docs/500fc3cdb17b12d24b00000a)


#### 使用方式

__第一步__

进入到你的多说后台，导出多说数据

```
http://{YOUR_DUOSHUO_NAME}.duoshuo.com/admin/tools/export/
```

__第二步__

```
git clone //github.com/barretlee/duoshuo-migrate-to-disqus.git
cd duoshuo-migrate-to-disqus
npm install
node migrate
```

__第三步__

进入你的 disqus 后台，将数据导入

```
//{YOUR_DISQUS_NAME}.disqus.com/admin/discussions/import/platform/generic/
```

如果操作过程中遇到什么问题，可以在本文留言。

如果导入到 disqus 无效，有可能是格式存在问题，或者某个字段的格式不对，这大多是因为多说导出的数据就不对。可以在 `disqus.ejs` 中加些判断，自己做过滤。

多说这种自杀式的行为颇为可耻！
