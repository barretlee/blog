---
title: 聊聊设计模式（3）：门面模式
description: Facade，中文译为门面、外观，所以本文要讲的 Facade Pattern 翻译时经常看到有两个名字，门面模式和外观模式。
warning: true
categories:
  - 前端杂烩
tags:
  - 设计模式
  - 门面模式
date: 2017-02-07 08:35:03
---

Facade，中文译为门面、外观，所以本文要讲的 Facade Pattern 翻译时经常看到有两个名字，门面模式和外观模式。

![https://unsplash.com/search/facade?photo=5NArdqS7FW4 by Chris Barbalis](/blogimgs/2017/02/07/6c0378f8gy1fchm1y9bubj20p00dw42z.jpg)<!--<source src="http://ww1.sinaimg.cn/large/6c0378f8gy1fchm1y9bubj20p00dw42z">-->

<!--more-->

这是一个在 JavaScript 中被经常用到的设计模式：

```js
class modA {}
class modB {}

// 门面模式实例
class Facade {
    init() {
        modA.initialize();
        modB.init();
    }
    run() {
        modA.start();
        modB.run();
    }
}
```

`modA` 和 `modB` 是客户端运行的两个依赖系统，例子中通过 `Facade` 类做了简单封装，客户端便可以使用少量代码快捷启动两个子系统，这里的 `Facade` 就是两个子系统的门面，客户端跟门面而不会直接与子系统打交道。

上面的例子比较抽象，还是有些晦涩的，下面看一个实际的场景。

### 场景复现

小喜负责的业务增加了一些社交元素，不久之后业务方给小喜提了一个需求，要求在某类文章下方增加一个赞赏按钮，用户点击按钮时，调用 Z 平台的接口付款，然后将操作记录到后端，最后发送一个统计埋点，需要三天内上线。

小喜笑了笑，心里开心道：就这点需求，哪用得着三天，给我俩小时就够了：

```js
async function payWithZFB() {
    request('interface-a');
    // ...
}
async function addRecord() {}
async function sendTrack() {}

async function Zan() {
    // 调用 Z 平台接口，进行支付操作
    let record = await payWithZFB();
    // 调用后端接口，记录日志
    let track = await addRecord(record);
    // 调用埋点接口，发送埋点信息
    await sendTrack(track);
}
```

事实上，小喜找 Z 平台、后端和日志平台的同学要接口就花了一整天，并且 `pageWithZFB`、`addRecord` 和 `sendTrack` 三个函数的实现都十分复杂，各种权限验证、安全验证等，小喜做完这个需求内心是崩溃的。

随着业务规模的扩大，SNS 相关需求量有所增加，其他业务上陆续也开始使用赞赏功能。同组的小天收到了类似的需求，但小天并不知道小喜之前做过，同样花了一天时间，采用了类似的方式实现了功能。

一段时间后， Z 平台那边说需要提升安全防护，要求开发者对接口做调整，需要将 `interface-a` 调整为 `interface-b`，小喜和小天都收到了这个需求，他们相互瞪了对方一眼，然后默默地回去修改了。

小苏在进行团队代码 review 的时候，看到了这个问题，为了减少团队在这一块的开销，他让小喜使用 NodeJS 做了一层封装，代码变动其实并不大，从客户端调用 HTTP 接口，变成了 Node 调用 HSF 接口：

```js
class Facade {
    zan () {
        let record = await payWithZFB();
        let track = await addRecord(record);
        await sendTrack(track);
    }
}
```

然后小喜和小天在客户端的调用都变成了：

```js
const facade = new Facade();
facade.zan();
```

这个调整带来的很大的便捷，不管 Z 平台、后端和日志平台的规则如何变化，小喜只需要修改 Node 提供的 `Facade` 服务就能解决问题，业务上不需要做任何发布。

### 问题解析

这个问题应该相当明确，这个模式也很好理解。业务需求经常会牵涉到多个平台的协作，协作就意味着频繁的交流和沟通，最后演变的结果便是：

```
A 同学：hi，请问如何使用 Z 平台的支付接口呀？
B 同学：[自动回复] 询问支付接口请回复 1，中午请我吃饭请回复 2。
A 同学：1
B 同学：[自动回复] 文档链接：http://z/interface
```

平台通过机器人解决了客服问题，但是使用者却不得不一遍又一遍地阅读粗糙无比的文档（好像有点跑题了，我们回来继续解析问题）。

`Facade` 隔离了客户端与三个平台之间的通信，尽管客户端依然还可以跳过 `Facade` 与平台交流，一般情况下不会这么去做，但也不排除这种情况，比如客户端和 Z 平台之间的认证禁止间接进行，那么客户端的调用就会变成：

```js
const facade = new Facade();
authZFB(function() {
    facade.zan();
});
```

门面模式还是允许客户端去直接操作子系统的，这也说明了这个模块比较灵活。

### 门面模式

**门面模式，要求一个子系统的外部与其内部的通讯必须通过一个统一的对象进行。门面模式提供一个高层次的接口，使得子系统更易于使用。**

引入门面模块，可以将子系统之间的通信和相互依赖达到最小，从而降低整个系统的复杂度，也很大程度上提高了客户单使用的便捷性，客户端无需关系子系统的实现细节，通过门面角色便可以完成功能的调用。

门面模式相对复杂的使用方式是，提供抽象的门面类，然后根据配置文件生成具体的门面类，这种模式用的比较广泛，也是值得提倡的。

### 拓展阅读

- [结构型模式 » 外观模式](http://design-patterns.readthedocs.io/zh_CN/latest/structural_patterns/facade.html)
- [wikipedia - 外观模式](https://zh.wikipedia.org/wiki/%E5%A4%96%E8%A7%80%E6%A8%A1%E5%BC%8F)
