---
title: 理解 Flutter 和 RN/Weex 的差异
description: 小胡子哥的个人网站
warning: 'true'
author: 小胡子哥
tags:
  - flutter
  - weex
categories:
  - 前端杂烩
date: 2019-06-21 12:02:00
---

![upload successful](/blogimgs/2019/06/21/flutter.png)

Flutter 和 RN/Weex 的差异，核心在于渲染的基础由自己实现，简单来说，

- Flutter 的代码经过 Flutter 引擎直接就渲染到了屏幕上
- 而 RN/Weex 的代码需要先跑到 Native 层处理一下，然后经过 Native 层渲染到屏幕

很显然前者效率会更高。由于 Native 组件可能会随着系统的升级跟着一起升级（API 增、删或变化），RN/Weex 需要写很多胶水层代码来适配不同版本、不同平台的 Native 组件，而 Flutter 就不存在这个问题，但 Flutter 却不能像 RN/Weex 那般可以直接使用 Native 提供的丰富组件和属性，它需要使用 Flutter 引擎暴露出来的底层 API 做封装，

- 比如要具备 Flex 布局能力，就需要写一个 Flex 引擎来识别上层的 Flex 语法
- 比如想使用 React 的 DSL，上层就必须实现一个类 React 框架来对接 Flutter 引擎提供的渲染 API
- 再比如想使用圆角、投影等等，就必须增加一种渲染策略来实现圆角效果和阴影效果等等

好在 Flutter 社区针对 Android 和 iOS 分别实现了一套适合各自系统风格的组件，长得跟 Native 一样。如果这些组件不能满足开发者的需求，开发者也可以很轻松地定义一种新的组件，这对开发者显然是十分友好的，我们可以拿到非常底层的 API 做各种想实现的效果，而且性能还特别高。

Flutter 引擎之上有一层是 Dart，事实上它就提供了上面我们所说的 Flex 布局能力、类 React 的 DSL 能力、各种动画、CSS rule 等，其实现方式就利用 Flutter 引擎提供的比较底层的可以直接在 GPU 上渲染的 API 能力。

如果你想用 Vue 的 DSL 写 Flutter 行不行？其实也是可以的，但是需要有人写一个 Vue 的框架来对接 Flutter 引擎提供的渲染 API，Flutter 引擎就像一个 Driver 层，保证了在各端上的渲染一致性，需要开发者在 Driver 之上进行自己的框架抽象、组件抽象等。

以上，可能表述存在一些偏差，但是基本就是这么个意思。