---
title: 我需要学习 ECMAScript 6 么？
description: 前几天翻译了一篇 ECMAScript 6 的入门文章，看到几则评论说 JavaScript 越来越像 Java 了，我暗暗地笑了笑。也有同学很疑惑是否有必要学习 ES6，使用 TypeScript 的同学也有类似的疑惑。
warning: true
categories:
  - 前端杂烩
  - JavaScript
tags:
  - JavaScript
  - ECMAScript
date: 2016-07-13 00:15:49
---


前几天翻译了一篇 [ECMAScript 6 的入门文章](http://www.barretlee.com/blog/2016/07/09/a-kickstarter-guide-to-writing-es6/)，看到几则评论说 JavaScript 越来越像 Java 了，我暗暗地笑了笑。也有同学很疑惑是否有必要学习 ES6，使用 TypeScript 的同学也有类似的疑惑。

<!--more-->

![//unsplash.com/@dtopkin1 by Dayne Topkin](/blogimgs/2016/07/13/6c0378f8gw1f5rkudyzzoj20p00dwt9x.jpg)<!--<source src="//ww1.sinaimg.cn/large/6c0378f8gw1f5rkudyzzoj20p00dwt9x.jpg">-->

记得之前 [winter](http://weibo.com/u/1196343093) 在微博上说，不要对知识存在偏见性，人家吵架说什么什么东西不要学，千万千万别信，但是他们吵架时提到的知识点，记得赶紧收进口袋装好。那么，ES6 这个话题呢？你是否对这个话题存在偏见性？

### ES6 历史简述

ECMAScript 6，很多地方称之为 ECMAScript 2015，从老外们的博客来看，貌似更倾向于后面的叫法，这个并不重要。

ECMAScript 是一个标准，从 1.0 发展至今，目前已经进入 [ES7 草案阶段](//tc39.github.io/ecma262/)，其中有两个版本是我们熟知的，ECMAScript 3.1 和 ECMAScript 5.0，旧版的 IE 实现都是基于 3.1 规范，而 IE9 以后及现代浏览器基本都依照 ES5.0 规范。

标准的每个版本都会经历多个阶段：提案、草案、标准、实验性、文档和历史标准。其中 Draft/REC/RFC 三种状态是阅读规范是最常看到的，到了 RFC 的文档基本就不会再变化了，后续的变化会提到下一个版本的提案或草案中。

### ES6 讲述了什么？

阅读 ES6 文档，最直观的感受是，它更加灵活了。矫正了 ES5.0 很多模棱两可的写法（事实上 ES5.0 的 strict 模式就已经很严格了）；同时在基础对象上扩展了很多工具函数，这一扩充基本让我们告别了 prototype/undescore 等类库，并且它还加强了对 UTF-16 的支持；同时增加了大型工程下编程的语法支持，如 Class/Module/Import/Decorator 等语法。

ES6 不希望语言本身对编程有限制，也不希望模糊不清的写法迷惑编程人员。而在添加很多语法糖之后，CoffeeScript 和 TypeScript 就略显多余了，两种预处理语言刚出来的时候，我也花了很多功夫去学习，并且尝试去适应。而现在，ES6 作为一种标准出现在我们眼前，我已经不能说服自己再使用其他预处理语言编写 JS 代码了。

### 我需要学习 ES6 么？

这个问题，还是让代码来回答吧：

```javascript
import Baz from 'bazGroup';

class Foo extends Baz {
  static classMethod() {
    return 'hello';
  }
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod();

for (let x of new Foo('hello', 'world')) {
  console.log(x);
}
```

上面这串代码，你还能够完整理解么？

ECMAScript 2015 是一种标准，而且各个浏览器厂商都相当踊跃地遵循这个标准，目前 Chrome 已经支持了将近 80%+ 的 ES6 特性，业界流行框架类库都开始使用 ES6 编写，很多大小公司也开始玩弄起这个标准。不说别的原因，这类代码放到你眼前，你是否读得懂？

所以，ES6 需要学习么？毫无疑问呀😜
