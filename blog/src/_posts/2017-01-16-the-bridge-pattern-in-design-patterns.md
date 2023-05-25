---
title: 聊聊设计模式（1）：桥接模式
warning: true
categories:
  - 前端杂烩
tags:
  - 设计模式
  - 桥接模式
date: 2017-01-16 20:57:09
description: 桥接模式（Bridge Pattern），也有很多地方称之为桥连模式，不管怎么叫，记得有个桥（bridge）就行了，重点要理解这个「桥」是如何连接的，什么场景下需要使用桥接模式。
---


桥接模式（Bridge Pattern），也有很多地方称之为桥连模式，不管怎么叫，记得有个桥（bridge）就行了，重点要理解这个「桥」是如何连接的，什么场景下需要使用桥接模式。

![by James Besser @https://unsplash.com/search/bridge?photo=fCCnUAGJrUQ](/blogimgs/2017/01/16/6c0378f8gw1fbsrsfhduuj20p00dw776.jpg)<!--<source src="http://ww3.sinaimg.cn/large/6c0378f8gw1fbsrsfhduuj20p00dw776.jpg">-->

<!--more-->

### 场景复现

小喜在做一个平台（阿尔法）的本地 SDK 工具，用于线下开发模块，这个工具的用户是 A 部门的前端人员，经过一个星期的紧张开发，小喜完成了工具的开发，用户反馈不错。大致的代码结构是这个样子的：

```javascript
class SDK {
    login() { /* 登录控制 */ }
    start() { /* 启动逻辑 */ }
    create() { /* 创建模块 */ }
    publish() { /* 提交模块 */ }
    init() {
        this.login();
        this.start();
        this.create();
        this.publish();
    }
}
```

突然有一天，老大小苏说，最近公司资源紧缺，雇了十几个外包，也要用这个 SDK 工具开发模块，而外包是不允许访问公司内网的。工程紧急，小苏要求小喜在一天内为外包同学搞一个可以用的 SDK，小喜想了想，点了点头，花了不到半天就搞定了：

```javascript
class wbSDK extend SDK {
    wbLogin() { /*外包登录*/ }
    //...
}
```

准备交差的时候，小苏提醒道，外包是不允许直接提交模块的，必须有一个审核流程，于是小喜回去又修改了一下：

```javascript
class wbSDK extend SDK {
  wbLogin() { /*外包登录*/ }
  wbPublish() {
    if (this.checkPublish() {
      this.publish();
    }
  }
  //...
}
```

一段时间之后，这个平台影响力做大了，部门 B、C、D 的同学都想使用这个工具，小喜此时觉得蛋有点疼，原因是每个部门的登录、检测和发布都有差异，为了让更多人受益于这个 SDK 工具，小喜只好硬着头皮写了这些代码：

```javascript
class B_SDK extend SDK {
    B_Login() {}
    B_Check() {}
    B_Publish() {}
    //...
}
class C_SDK extend SDK {
    C_Login() {}
    C_Check() {}
    C_Publish() {}
    //...
}
// ...
```

部门 F 的同学因为某种原因，也搞了一个类似的平台（里试石），而且做得比阿尔法要好，于是部门老板要求小喜将 SDK 对接到里试石，两个系统主要的差异在于模块的初始化和创建形式不同，而且这些差异在不同的部门之间也有不同。小喜擦干了眼泪，代码一直撸到天亮：

```javascript
class baseSDK extent SDK {
    // base SDK
}
class Fuck_A_SDK extend baseSDK {}
class Fuck_B_SDK extend baseSDK {}
class Fuck_C_SDK extend baseSDK {}
//....
```

### 问题解析

以上问题的根源在于 **影响 SDK 这个类的变量太多了**。刚开始影响 SDK 的变量是登录，小喜在代码中添加了 `wbLogin` 方法，然后在代码中写了一堆 `if else` 逻辑，勉强解决问题。

后面影响的因素变得很多，有登录、初始化、检测、发布以及部门和平台差异等，小喜通过多次继承来解决问题，带来的麻烦是，代码的维护成本和冗余度都变高了。

小喜把这个问题丢给了小天，询问有没有更好的处理办法，小天说，刚开始 `Login` 独立出来一个类，不同部门和外包可以基于 `baseLogin` 扩展...小喜打断道，你丫的事后诸葛亮，我怎么知道会有外包和其他部门的同学用我的 SDK 呀 🤣🤣🤣

小天的想法是正确的，如果我们能够早早的探测到变量，将变量通过类抽象出来，那么使用的时候就会轻松很多了：

```javascript
class baseSDK {}

// 抽象变量
class baseLogin {}
class baseCreate {}
class baseCheck {}

// C 部门使用示例
class C_Login extent baseLogin {}
class C_Create extent baseCreate {}
class C_Check extent baseCheck {}

// 启动程序
runSDK = () => {
     let sdk = new baseSDK();
     sdk.setLogin(new C_Login());
     sdk.setCreate(new C_Create());
     sdk.setCheck(new C_Check());
     sdk.init();     
}
```

### 桥接模式

桥接模式的思想就是：**将抽象部分与实现部分分离，使它们都可以独立地变化。**

分离抽象部分，要尽可能多的考虑哪些是变量，哪些是常量，常量可以写死在代码中，而变量就需要抽象出来交给管理器去管理，尤其是十分复杂的变量（比如登录这个操作）。

在桥接模式中，每一个被抽象出来的变量，都需要在主体中提供一个渠道——也就是「桥」——来衔接，比如上面代码中的 `sdk.setLogin()` 方法，它的作用就是连接 `new C_Login()`。这应该就是为什么这个模式被命名为 Bridge 的原因吧。

S.O.L.I.D 五项原则中有一条是单一职责原则，意思就是一个类只应该有一个影响它变化的因素，小喜刚开始的设计就违背了这个原则。倘若再给 SDK 加上几个变量，多次继承的方式还吃得消么？

### 相关阅读

- [《桥接模式》](http://design-patterns.readthedocs.io/zh_CN/latest/structural_patterns/bridge.html)
- [《Design Patterns - Bridge Pattern》](https://www.tutorialspoint.com/design_pattern/bridge_pattern.htm)
