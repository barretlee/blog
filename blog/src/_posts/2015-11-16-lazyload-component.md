---
title: 图片脚本懒加载 - Lazyload
description: 写了一个轻巧的小程序 - Lazyload，100 行代码。加上一个 `data-src` 属性，能够让页面中的图片懒加载、textarea 中的脚本懒执行，有需要的可以拿过去用用，代码逻辑比较简单，也可以自己增强点功能，比如动态添加懒加载监听等等。
warning: true
categories:
  - 工具
  - 前端杂烩
tags:
  - lazyload
date: 2015-11-16 22:30:59
---

**注：代码有更新，细节以 github 的 README 说明为准。**

写了一个轻巧的小程序 - Lazyload，100 行代码。加上一个 `data-src` 属性，能够让页面中的图片懒加载、textarea 中的脚本懒执行，有需要的可以拿过去用用，代码逻辑比较简单，也可以自己增强点功能，比如动态添加懒加载监听等等。

<!--more-->

- 仓库地址：<http://github.com/barretlee/lazyload>
- Demo地址：<http://barretlee.github.io/lazyload/demo/index.html>

核心代码：

```
Lazyload.prototype._detectElementIfInScreen = function() {
  if(!this.elements.length) return;
  for (var i = 0, len = this.elements.length; i < len; i++) {
    var ele = this.elements[i];
    var rect = ele.getBoundingClientRect();
    if(rect.top >= Lazyload.DISTANCE && rect.left >= Lazyload.DISTANCE
      && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
      && rect.left <= (window.innerWidth || document.documentElement.clientWidth)) {
      this.loadItem(ele, i);
      this.elements.splice(i, 1);
      i--; len--;
    }
  }
};
```

这里主要用到了 `getBoundingClientRect` 这个函数，兼容性没话说，IE6 都兼容，他的作用是获取元素距离视窗上下左右的距离：

![Chrome getBoundingClientRect](/blogimgs/2015/11/16/20151101_a1f44914.jpg)

配置了两个参数：

- `Lazyload.TAG`，默认是 "data-src"
- `Lazyload.DISTANCE`，可以设置元素提前多少像素加载，默认是 0，即进入视窗便加载。

使用方式：

```
<script src="//raw.githubusercontent.com/barretlee/lazyload/master/index.js"></script>

<div class="box">
  <div class="item"><img src data-src="img-path"></div>
  <div class="item"><textarea>alert(1)</textarea></div>
</div>

<script>new Lazyload(".box .item")</script>
```

请轻点拍砖；）






