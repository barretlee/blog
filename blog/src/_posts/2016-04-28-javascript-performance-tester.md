---
title: JavaScript 代码执行效率对比工具
description: JavaScript 代码执行效率对比工具，对比多个程序在一段时间内执行的次数，和性能差异。
warning: true
categories:
  - 工具
  - 前端杂烩
  - JavaScript
tags:
  - JavaScript
  - Performance
date: 2016-04-28 20:00:23
---


平时写些小页面小程序，一般不会出现性能问题，但是在大的工程，或者在写一个框架、类库的时候，代码的性能就需要提高一个优先级了。测试代码的性能有多种方案：

- 在 <http://jsperf.com> 上测试
- 使用 `console.time` 来收集代码执行的时间
```javascript
console.time('Name');
// code here...
console.timeEnd('Name');
```
- 自己写一个时间控制器

<!--more-->

本文自然就是自己撸一个简单易用的测试工具，效果如下图：

![JavaScript 代码执行效率对比工具](/blogimgs/2016/04/28/TB1d238JpXXXXcoXFXXXXXXXXXX-446-570.gif)<!--<source src="//img.alicdn.com/tps/TB1d238JpXXXXcoXFXXXXXXXXXX-446-570.gif">-->


### 设计分析

可以先把代码下载下来，跑起来：

```bash
git clone //github.com/barretlee/performance.git
cd performance/test;
open index.html;
```

或者直接打开测试页面：<http://barretlee.github.io/performance/test/>。

点击代码按钮，Performance 会循环执行 button 中的代码，持续时间是设定的 1000ms，每次执行完，都会计算出相对效率，100% 是效率最高的，剩下的自然就是效率比较低的，从而可以比较清晰地看出程序之间性能差异。

### 相关阅读

- http://share.web-tinker.com/performance.js

