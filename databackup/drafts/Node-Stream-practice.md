title: Node Stream 实践
description: 小胡子哥的个人网站
warning: true
author: 小胡子哥
tags:
  - Node Stream
categories:
  - JavaScript
  - 前端杂谈
date: 2017-06-12 19:49:00
---
在[上文](http://www.barretlee.com/blog/2017/06/06/dive-to-nodejs-at-stream-module/)中，花了不少篇幅讲解 Node Stream 的内部原理，了解了两种 Stream（Readable/Wriable）的运作机制和使用方法，以及这两种 Stream 拼装在一起之后衍生出的 Transform/Duplex Stream，本文通过一些实践来巩固这些知识。

