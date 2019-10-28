---
title: JavaScript 关于 for 循环中的疑问
description: 我一直都没搞明白，for 循环的 var 声明是怎么使用的。
warning: true
categories:
  - JavaScript
tags:
  - for
date: 2015-09-30 16:23:36
---

底部有更新, 疑惑已经解开。

---

我一直都没搞明白，for 循环的 `var` 声明是怎么使用的。

<!--more-->

```
for(var i = 0; i < len; i++ ) {
  // code… 
}
```

最后的结果是这样？

```
{var i = 0;  // code… }
{var i = 1;  // code… }
{var i = 2;  // code… }
```

还是这样：

```
var i;
{i = 1;  // code… }
{i = 2;  // code… }
{i = 3;  // code… }
```

但是根据 ES6 中 let 关键词的例子：

```
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[2](); // 2
```

let 只能在 block 块中生效，可以推测，应该是第一种方式解析，我们知道 `var` 会被提升（hoisting），所以第一种方式应该是：

```
var i;
{var i = 0;  // code… }
{var i = 1;  // code… }
{var i = 2;  // code… }
```

显得十分别扭！到底是啥样的呢？好疑惑。

下面是 for 循环中包含 var 声明的执行流程：

![ES5-12.6.3](/blogimgs/2015/09/30/20150903_d17189e4.jpg)

章节地址：<http://www.barretlee.com/ST/ES5.1/#sec-12.6.3>

并没有说的太明白，我知道很多人肯定趋向第二种解释，感觉不是很对。



---

咨询了下 Franky 教主，沟通之后，心里也有了结果。

ES5 和 ES6 不太一样，ES5 的 for 语句只有静态语义，而 ES6 的 for statement 存在两种语义，代码格式不同语义不同，分为静态语义和动态语义，上述 ES6 中的 let 关键词是因为 block 块具备动态语义，具体可以看这里：<http://www.barretlee.com/ST/ES6/#sec-for-statement>。

而 ES5 中 `var VariableDeclarationListNoIn` 是先声明，然后赋值。上图 ES5 文档中没有做出特殊说明，可以看出 var 变量并不会多次声明。

具体表述可能有些乱，但是心中的疑问总算是解开了。

对于这种原则性的问题，建议直接阅读 ES 文档。
