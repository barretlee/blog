---
title: nodejs给图片批量加水印
description: 本只是想给博客添加个水印，github 上搜索了半天，找了一个比较小巧的库，叫做 images。
warning: true
categories:
  - JavaScript
  - 网络技术
tags:
  - npm
  - 水印
date: 2015-09-08 21:27:57
---


本只是想给博客添加个水印，github 上搜索了半天，找了一个比较小巧的库，叫做 images。

<!--more-->

这个库的地址是：<http://github.com/zhangyuanwei/node-images>，它是一个跨平台极为轻量的图片编解码工具，同时附加了一些图片的操作函数，如：

- `.size()` 比例伸缩
- `.draw(img, x, y)` 在图片上绘制一个图片
- `.encode()` 将图片解码到 buffer 中

给图片加水印主要就用到了 `.draw()` 函数。


首先需要安装 `images` 库：

```
npm install images
```

然后开撸，基本代码如下:

```javascript
var images = require('images');
var path = require('path');
var watermarkImg = images(path.join(__dirname, 'path/to/watermark.ext'));
var sourceImg = images(path.join(__dirname, 'path/to/sourceImg.ext'));
var savePath = path.join(__dirname, 'path/to/saveImg.jpg');

// 比如放置在右下角，先获取原图的尺寸和水印图片尺寸
var sWidth = sourceImg.width();
var sHeight = sourceImg.height();
var wmWidth = watermarkImg.width();
var wmWidth = watermarkImg.height();

images(sourceImg)
  // 设置绘制的坐标位置，右下角距离 10px
  .draw(watermarkImg, sWidth - wmWidth - 10, sHeight - wmHeight - 10)
  // 保存格式会自动识别
  .save(savePath);
```

晒一张本博客的一个水印截图：

![博客水印截图](/blogimgs/2015/09/08/201592102.jpg)

看到右下角的水印了么 ；）

至于批量加水印，额，for 循环吧，while 循环也行=。 =
