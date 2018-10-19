---
title: 聊聊设计模式（4）：装饰模式
description: 装饰模式，动态地给一个对象增加一些额外的职责 ( Responsibility )，就增加对象功能来说，装饰模式比生成子类实现更为灵活。
warning: true
categories:
  - 前端杂烩
tags:
  - 设计模式
  - 装饰模式
date: 2017-02-14 08:47:45
---


Decorator Pattern，中文名为装饰者模式，这个模式思想很简单，但是特别容易把代码搞复杂，它包含四个重要角色：

- `Component`, 抽象构件
- `ConcreteComponent`, 具体构件
- `Decorator`, 抽象装饰类
- `ConcreteDecorator`, 具体装饰类

![https://unsplash.com/search/decoration?photo=WjqEDAsn_nI](/blogimgs/2017/02/14/6c0378f8gy1fcppr5hep8j20p00dwjui.jpg)<!--<source src="http://ww1.sinaimg.cn/large/6c0378f8gy1fcppr5hep8j20p00dwjui">-->

<!--more-->

这几个角色很容易把人搞懵，所以在使用这个模式之前要彻底理解它。ECMAScript 2017 中增加了修饰器，它从语法层面帮掩盖了 `Decorator` 装饰类和 `Component` 构件，极大程度方便了我们理解装饰器：

```js
function activate(target) {
    target.barkable = true;
    target.runnable = true;
}

@activate
class EDog {}

console.log(EDog.barkable, EDog.runnable); // true true
```

上面的代码很简单，`activate` 是一个开关装饰类，通过它激活了 `EDog` —— 不会跑、不会叫的电子狗，让它具备了 `bark` 和 `run` 能力。

### 场景复现

过年回来后业务压力不大，小苏让小喜抽空做一个代码发布平台，帮助团队迁移代码发布平台，之前的前端静态代码是通过 SVN 管理和发布的，现在需要迁移到 Git 上去，小苏说这是个重任。小喜暗自欣喜，这 TM 也太简单了。

使用开源的 gitlab 搭建了一个代码管理平台，然后在 gitlab 上添加了钩子，每次有代码推送时，向小喜的代码平台发送一个请求，小喜便直接执行 `publish` 操作：

```js
class CodePlatform {
    publish(gitInfo) {
        this.scpCodeFromGitlabToOnline();
    }
    // 直接将 gitlab 代码直接复制到线上机器
    scpCodeFromGitlabToOnline() {
        // ...
    }
}
```

不久之后代码的构建从线下迁移到了线上，要求代码发布时先使用构建服务器处理，于是小喜给 `CodePlatform` 增加了一项功能：

```js
class CodePlatform {
    publish() {
        this.transferCodeToBuilderServer(() => {
            this.scpCodeFromGitlabToOnline();
        });
    }
    scpCodeFromGitlabToOnline() {}
    // 将代码扔到构建服务器
    transferCodeToBuilderServer() {}
}
```

随着团队工程化程度越来越高，很多线下操作流程渐渐搬移到了线上进行云处理，后续又增加了测试服务器、日志服务器、安全监测服务器等，结果小喜的代码变成了这样：

```js
class CodePlatform {
    publish() {
        // publish 的逻辑越来越重
    }
    scpCodeFromGitlabToOnline() {}
    transferCodeToBuilderServer() {}
    transferCodeToLogServer() {}
    transferCodeToSecureServer() {}
    transferCodeToTestServer() {}
}
```

小喜怎么也没想到，发布一个仓库在 `CodePlatform` 需要走这么多流程，这个类的职责越来越多，代码体积也越来越庞大，此时的小喜有点苦恼。

有一次，小喜学习 ES7 相关知识，突然看到一个叫做 `Decorator` 的东西，想了想似乎可以在项目中用一下。这不用不知道，一用吓一跳，原来之前的代码还可以这样架构：

```js
// 为所有的服务添加日志服务
class LogService {}
const logger = new LogService();

@logger('build')
class BuildService {}

@logger('secure')
class SecureService {}

@logger('test')
class TestService {}
```

首先将服务抽离出来，然后：

```js
const builder = new BuildService();
const securer = new SecureSevice();
const tester = new TestService();

@securer
@logger('CodePlatform')
class CodePlatform {
    @builder
    @tester
   publish() {}
}
```

让 CodePlatform 的代码先走一遍 `securer`，在发布的时候走一遍 `tester` 和 `builder`，代码结构瞬间变得清晰了很多。

### 问题解析

我们经常在代码中干这件事情，尤其是业务代码。一些临时需求，为了图方便、图快，直接在原有的基础上增加几个方法，然后在执行入口位置添加补丁，时间长了之后，维护起来十分吃力，这也是为什么在业务交接时大家相互吐槽代码的主要原因之一。很多人拿到代码的第一感觉就是，写这代码的人是傻x，这代码得重构。

上面的问题在于 `CodePlatform` 承担了太多的职责，最后这个类变得特别繁忙，加上代码量多了之后，阅读难度提升了。事实上，测试、监控、日志、安全等都是发布之前对代码的流程化操作，`CodePlatform` 的核心功能是 **发布代码**，其他的操作都可以看做对待发布代码的装饰。

JS 中 `Decorator` 语法糖十分容易理解，它既可以装饰类也可以装饰类的成员方法。所以我就没把这个模式的具体实现写出来，感兴趣的可以到网上搜索下。

### 装饰模式

对类做职能补充有几种方式：

- 继承，让继承类拥有父类的所有能力，并自我扩展
- 关联，将两个功能集进行合并
- 修改父类（基类），这是当然不推荐的方案

**装饰模式，动态地给一个对象增加一些额外的职责 ( Responsibility )**，就增加对象功能来说，装饰模式比生成子类实现更为灵活。

装饰者模式可以在运行时给对象动态地增加更多的职责，它属于通过建立关联方式来扩充对象的能力。从上面的例子中看得出来，CodePlatform 在装饰前后基本看不出差异，这就是这个模式的特点。


### 拓展阅读

- [Wikipedia - 修饰模式](https://zh.wikipedia.org/zh-cn/修饰模式)
- [结构型模式 » 装饰模式](http://design-patterns.readthedocs.io/zh_CN/latest/structural_patterns/decorator.html)
- [修饰器](http://es6.ruanyifeng.com/#docs/decorator)

---

题图：[Jeffrey Wegrzyn](https://unsplash.com/search/decoration?photo=WjqEDAsn_nI)
