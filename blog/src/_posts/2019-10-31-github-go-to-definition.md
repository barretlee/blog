---
title: Github 的 Go to Definition 功能实现剖析
description: Github 的源码阅读已经支持 Go to Definition 了，目前还在 beta 阶段，且需要用户手动开启，仔细研究了下它的实现方式，从逻辑上看是存在 bug 的，整体策略大概是：
warning: true
author: 小胡子哥
tags:
  - github
  - Go to Definition
categories:
  - 前端杂烩
  - 工具
date: 2019-10-31 23:58:00
---

Github 的源码阅读已经支持 Go to Definition 了，目前还在 beta 阶段，且需要用户手动开启，仔细研究了下它的实现方式，从逻辑上看是存在 bug 的，整体策略大概是：

![Go to Definition](/blogimgs/2019/10/31/go-to-definition.png)

1. 仓库进入 Navigation 模式（initialization），Github Server 端对该版本（取 commit hash）的源码进行词法分析，保存关键 token 信息，并记录关键 token 的初始定义位置和被引用的位置；
2. 用户进入网页，若 initialization 未完成则无效果；否则启动 Navigation 模式；
3. 探测用户鼠标 hover 事件，当 hover 到 textNode 节点时，取出节点位置，这里用到的是一个新的 API：document.caretRangeFromPoint；
4. 步骤 3 中拿到的只是 offset，它是个位置数值信息，通过正则 /\w+[!?]?/g 匹配出 hover 到的目标文本，然后将信息发送到 Server，入参包括文本、文件路径、commit hash 和语言类型；
5. Server 端返回步骤 1 中生成的 token 元数据，并直接解析成 HTML，前端展示

这里的 bug 就出现在第 5 步，如果某个变量在两个子作用域中定义，那么 Server 端是无法识别它的 Definition 属于哪个作用域的（我没测试，从理论上讲，应该有这个 bug），另外它 hover 到任何单词都会发送请求，但是后台却只对 function 做了识别，其他类型都是无返回的。

简单来说，这个 beta 功能可以满足部分场景的需要，但并不能完全覆盖且准确地识别所有类型。真要完整识别，应该只能在浏览器端通过 LSP 协议来做，不过这么做的话，对网络 IO 和本地 CPU 都是一个巨大的挑战，Web 版的 VS Code 会有这个能力，我估计 Github 网页上不会提供。