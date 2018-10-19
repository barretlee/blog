---
title: 聊聊设计模式（2）：享元模式
description: 如何理解享元模式，“享”是共享的意思，“元”指的是元件，也就是小颗粒的东西，享元顾名思义便是共享小部件，很多系统或者程序包含大量对象，但是这些对象绝大多数都是差不多的，除了一些极个别的属性外。
warning: true
categories:
  - 前端杂烩
tags:
  - 设计模式
  - 享元模式
date: 2017-02-04 18:31:44
---

如何理解享元模式，“享”是共享的意思，“元”指的是元件，也就是小颗粒的东西，享元顾名思义便是共享小部件，很多系统或者程序包含大量对象，但是这些对象绝大多数都是差不多的，除了一些极个别的属性外。

![https://unsplash.com/search/share?photo=qgHGDbbSNm8 by Elaine Casap](/blogimgs/2017/02/04/6c0378f8ly1fcemcdy783j20p00dwaeb.jpg)<!--<source src="http://ww1.sinaimg.cn/large/6c0378f8ly1fcemcdy783j20p00dwaeb">-->

<!--more-->

### 场景复现

小喜负责团队的机器管理工作，包括测试机器的购买、借还等内容。机器的型号并不多，大约五六种。为了能够精确掌握每台机器的借还和使用情况，小喜通过如下方式设计数据管理模型：

```js
class Device {
    // 记录设备的基本信息
    constructor(id, memory, frequency, processor, network, pixel, price, ...) {
        this.id = id;
        this.memory = memory;
        this.frequency = frenquency;
        this.processor = porcessor;
        this.network = network;
        this.pixel = pixel;
        this.price = price;
        // more attributes ...
    }
    checkout () {
        this.hasCheckedOut = true;
        this.checkoutDate = new Date();
    }
    giveback() {
        this.hasCheckedOut = false;
        this.checkoutDate = null;
    }
    // more methods ...
}
```

这个模型还算是比较简单明了的，每次购买机器入库都会执行：

```js
var device = new Device(...);
DB.insert(device);
```

当有人借还设备时，便会执行：

```js
var device = Database.query(deviceId);

// 借出
device.checkout();
// 归还
device.giveback();

DB.update(device);
```

随着团队规模的扩大，加上集团并购了几个小公司，团队对设备的需求量急剧上升，并且测试标准也有所提升，要求覆盖国内所有常见机型，大约 50 多种，每个机型需要购置大约 100 台机器，总量有 5000 多台。

此时，小喜有点头疼了。每台设备的描述信息和借还记录信息都储存在各自的 `device` 对象中，每个对象大约需要占用 10kb 的内存，5000 多台设备，算下来需要占用 50Mb 的内存。几千个大对象放在内存中，这种数据管理模式让小喜有点方，咨询了下坐在旁边的小天同学有没有什么策略可以改良。

小天在小喜的电脑前比划了几下，最后抛了一个媚眼，小喜立马就懂了。

定义数据模型，一个 `Device` 对象代表一种型号的设备：

```js
class Device {
    constructor(type, xxx, ..) {
        this.type = type;
        // 一种设备的全部基本信息
        this.xxx = xxx;
    }
}
```

使用 `DevicePool` 管理各种型号的设备：

```js
class DevicePool {
    // hash 表保存设备信息
    devicePool = {};
    create(type, xxx, ...) {
        if (devicePool[type]) return devicePool[type];
        const device = new Device(type, xxx, ...);
        devicePool[type] = device;
        return device;
    }
}
```

设备的借还信息和其他信息，通过 `DeviceManager` 来管理：

```js
class DeviceManager {
    deviceManager = {};
    // 借出时，添加借出记录
    checkout (id, type, xxx, ...) {
        const device = new DevicePool.create(type, xxx, ...);
        deviceManager[id] = {
            device: device,
            hasCheckedOut = true,
            checkoutDate = new Date();
        };
    }
    // 归还时，删除借出记录
    giveback(id, type) {
        deviceManager[id].hasCheckedOut = false;
        deviceManager[id].checkoutDate = null;
    }
}
```

小喜看了看内存，设备对象从 50Mb 下降到了 2Mb，小喜激动得一晚上没睡着。

### 问题解析

小天当时告诉小喜，可以想办法减少内存中重复的内容，同一类型的设备描述是相同的，没必要在每个对象中都保存一份。使用单例模式储存设备元信息（`Device` 类），使用工厂模式复用一个类型的设备描述信息（`DevicePool` 类）。小喜一下子就懂了。

小喜通过 `DevicePool` 和 `DeviceManager` 将数据元信息和数据动态信息进行了有效的隔离，然后通过 `checkout` 和 `giveback` 两个方法灵活地组合了这两类信息，组合的时候，有效地控制了内存的无效复制。

### 享元模式

享元模式的核心在于享元工厂类，享元工厂类的作用在于提供一个用于存储享元对象的享元池，用户需要对象时，首先从享元池中获取，如果享元池中不存在，则创建一个新的享元对象返回给用户，并在享元池中保存该新增对象。

在享元模式中有两个比较重要的关键词，内部变量和外部变量；内部变量是可以共享的属性集，而外部变量是对象之间的差异部分，通过相同+不同的方式组合诸多对象，可以有效地节省系统空间，降低内存大小。

### 拓展阅读

- [wikipedia - 享元模式](https://zh.wikipedia.org/wiki/%E4%BA%AB%E5%85%83%E6%A8%A1%E5%BC%8F)
- [结构型模式 » 享元模式](http://design-patterns.readthedocs.io/zh_CN/latest/structural_patterns/flyweight.html)
