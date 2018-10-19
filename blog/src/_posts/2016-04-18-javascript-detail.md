---
title: JavaScript 被忽视的细节
description: 《JavaScript 权威指南》这本书从第四版开始，一直到第六版，每个版本我都逐字逐句读过几遍，然而每一遍下来的感受却完全不一样。上上周的周一，再次翻开了这本犀牛书，这一次我是带着批判精神和研究精神过来的，所以看的时候也写下了一些感受和笔记，都是些容易被忽略的点，部分内容犀牛书上不一定有提到。之前都发在微博上，稍微整理了一番，放在这里，方便阅读。
warning: true
categories:
  - JavaScript
  - 观点和感想
tags:
  - JavaScript
date: 2016-04-18 00:51:12
---

《JavaScript 权威指南》这本书从第四版开始，一直到第六版，每个版本我都逐字逐句读过几遍，然而每一遍下来的感受却完全不一样。上上周的周一，再次翻开了这本犀牛书，这一次我是带着批判精神和研究精神过来的，所以看的时候也写下了一些感受和笔记，都是些容易被忽略的点，部分内容犀牛书上不一定有提到。

之前都发在 [微博](http://weibo.com/hustskyking) 上，稍微整理了一番，放在这里，方便阅读。

<!--more-->

### 一些小点

__语句/表达式__

换个角度理解语句（statemaents）和表达式（expressions）：表达式不会改变程序的运行状态，而语句会。还有一种叫做表达式语句，可以理解为表达式和语句的交集，如 `({a:1})`、`"use strict;"`等，我觉得没必要死扣，意义不大。

__字符集__

ES3 要求 JS 必须实现 Unicode 2.1 及后续版本，而 ES5 只要求支持 Unicode 3 及后续版本。Unicode 字符 2005 年超过了十万字符，至今仍在不断增修，最新版本是 8.0。

__分号__

如果你写 JS 代码不喜欢带分号，而又搞不清什么时候必须加分号，可以这么做：在以  "("、"[" 、"/"、"+"、"-" 开头的语句前面都加上一个分号，如 `;(a + b).toString()`。

__进制__

ES5 严格模式中禁止使用八进制。目前各种引擎对 JS 的实现是存在差异的，部分支持八进制，部分不支持。八进制被禁止的原因：String 和 Number 之间经常被相互转换，而以 `0` 开头的八进制数据特别容易让人迷惑，也容易让机器迷惑，比如 `09` 是该被转换成 9 还是直接报错？十六进制不存在这个问题，如 0x98。更多信息参阅 [这里](http://stackoverflow.com/questions/30386993/why-in-javascript-does-10-010-result-in-false)。

__精度__

JS 采用 IEEE-754 浮点数表示法，这是一种二进制表示法，由于精度原因 JS 不能表示所有的实数。它能展示的浮点数个数是有限的，比如它不能准确地表示三分之一的数值字面量。这也导致了它在浮点数的计算上存在误差，如 `0.3-0.2 != 0.2-0.1`，因为在计算的过程中，存在数据的溢出，丢失了精度。

![](//ww1.sinaimg.cn/mw1024/6c0378f8jw1f2l0dtvbzuj20ek07ogm7.jpg)

__null/undefined__

系统级、出乎意料的或者类似错误的值的空缺使用 undefined，而程序级、正常的或意料之中的值的空缺使用 null。平时编程给变量赋值时，不要使用 undefined 而应该用 null。值得注意的是 ES3 中的 undefined 是可以被重新赋值的，ES5 修复了这个 bug。通常我们使用 void 0 来还原/代替 undefined 的值。

__eval__

eval 是个不好把握的东西，它在 ES3 中更像是 Function，而在 ES5 中更像是一个运算符（严格模式下不允许设置别名，否则报错，且将其作为保留字）。实际上 ES3 中也不允许给 eval 设置别名，然而很多实现却依然允许，并将其作为全局代码来执行，浏览器尤其是 IE 对它实现相当混乱，没有什么规律可循，不过 IE 中提供了一个 execScript 函数，类似全局的 eval，这个函数每次执行都会返回 null。

需要使用 eval 的场景并不多，尽量少用，一般需求使用 new Function 就能满足。

__引用__

删除属性存在的坑：`a = {n: {x: 2}}, b = a.n; delete a.n;` 这段代码执行之后，b.x 依然等于 2，原因是 {x:2} 这个对象被 a 和 b 同时引用，delete 指令只删除了 a 对它的引用，b 上的引用依然存在。这种问题有可能造成内存泄漏。

__Object 扩展__

Object 的 freeze 方法过于严格；__defineGetter__/__lookupGetter__ 和对应的 Setter 是很好用的属性。

![](//ww1.sinaimg.cn/mw1024/6c0378f8gw1f2rzy2ncrpj20eo09b3zr.jpg)

__toLocalString__

如图，你可能还不知道 JavaScript 的 toLocaleString 还可以这么玩。

![](//ww1.sinaimg.cn/mw1024/6c0378f8gw1f2s12nir33j20bz05n750.jpg)

__this语义__

this 上下文只存在两种语义，一种是被当作方法调用，this 指向调用它的对象；一种是作为函数调用，指向 Global 对象（严格模式下为 undefined）。它没有作用域的限制，如下图所示，a 由于是作为函数被调用，所以它指向的是 window，故而返回 false。

![](//ww1.sinaimg.cn/mw1024/6c0378f8gw1f2t6g4sc28j208m054aa5.jpg)

__类型__

JavaScript 可以被调用执行的均为 Function 类型，但是也存在可调用的 Object，如低版本 IE 中的一些宿主对象：document.getElementById、alert 等，在很多浏览器中 typeof RegExp 同样是 Object。这绝对是一个不标准的实现，在浏览器摒弃/修正这些错误类型之前应该尽量少依赖它们。

![](//ww1.sinaimg.cn/mw1024/6c0378f8gw1f2uaewdsbmj20hq03zgm5.jpg)

__IE8 getter/setter__

Object.defineProperty 虽然是 ES5 的东西，早在 IE8 就已经支持了，但支持得并不完善，比如 writable、enumerable、configurable 这些配置项设置就无效，IE8 下主要支持 getter/setter。

![](//ww1.sinaimg.cn/mw1024/6c0378f8gw1f2ubot1qvxj20ie0dh41g.jpg)

__JSON.stringify__

JSON.stringify 接受三个参数，很多人都知道第三个参数可以设置空白字符来美化输出，但是你可能不知道第二个参数的作用，它为 {Array|Function} 类型，如果为 Array 则用于过滤 key，如果为 Function 则可以对 value 做处理，如图所示。

![](//ww1.sinaimg.cn/mw1024/6c0378f8gw1f2ud4j7vg2j20ec0dmjso.jpg)

__Symbol__

ES6 中添加了一种新的数据类型，Symbol，它是一种原始数据类型（图一），具备对象的特性（图二），并可以指向同一个引用（图三），能够作为对象的 key 但不可枚举（图四），内置的 Symbol 会影响程序的执行（图五），Symbol.iterator 是个举足轻重的符号，能够让元素具备迭代属性（图六），花样很多。

附图见：http://weibo.com/1812166904/DqMwR8O6z

伪数组添加 Symbol.iterator 的几个办法：鸭式辨型的 iterator 函数、yield 函数和直接使用 Array 的遍历符号。

附图见：http://weibo.com/1812166904/DqMBYebPw

__Set/WeakSet__

Set/WeakSet 这种数据结构，不能说没用，但确实也没啥大用，前者就是个不允许出现重复成员的数组，顺便还带了点 ES6 的特性，后者虽说可以一定程度上防止内存泄漏，但是也容易出错，比如某个引用已经被垃圾回收了，再去使用它可能就返回 null。它们都是 ES6 的配套产物。而 Map/WeakMap 倒是两个非常不错的设计，常规的 Object 结构都为 String-Val 键值对，而它扩展为 AllType-Val，任意类型都可以作为它的 Key，无论是服务端编程还是客户端编程，这个属性都带来了极大的便利性。

![](//ww1.sinaimg.cn/mw1024/6c0378f8gw1f2w362q57jj207203jaa1.jpg)

__正则__

理解正则零宽的含义：正则中所谓的零宽断言，类似于锚点字符，它们匹配指定的位置而不会匹配内容，如 ^ 匹配开头，$ 匹配结尾，\b 匹配单词边界；(?=p) 匹配「接下来的字符与 p 匹配」的位置，(?!p) 匹配「接下来的字符不与 p 匹配」的位置。\b 字符匹配单词边界，实际上就是匹配 \w 与 \W 之间的位置（\w 匹配 [a-zA-Z0-9]）。很少会有人用到 \B，它匹配的是非单词边界位置，简单理解就是 \w & \w 之间位置或者 \W & \W 之间位置。

![](//ww1.sinaimg.cn/mw1024/6c0378f8gw1f305w4ur27j208v02wmx9.jpg)

__持续学习和分享...__

内容都是片段化的分享，比较多，也比较杂，就没有全部列举出来，感兴趣的同学可以 follow 我的 [微博](http://weibo.com/hustskyking)，我的想法和笔记都会在上面同步。

### 感受

在这之前犀牛书已经翻阅了差不多六七遍，很多内容都已经深深地刻在了脑海里，但时间久了也会忘记些，时而巩固复习下，毕竟是前端最基础部分。

带着问题去看书，收获是完全不一样的。犀牛书不难啃，难的是你对这些知识点的理解深度。
