---
title: 构建一个安全的 JavaScript 沙箱
description: 灵活是 Javascript 这门语言的特性，也是它难以被掌控的主要原因，这点可以从文中各种沙箱逃逸方式就能看出。ES6 提供了很多新的特性，本文以沙箱为切入点，带着大家学习了几个函数和属性，希望读者有些收获。
warning: true
categories:
  - 前端杂烩
  - JavaScript
tags:
  - Javascript
  - 沙箱
date: 2016-08-23 01:05:13
---

![Sandbox for Addies Birthday!! from //homesteadroots.blogspot.com/2010/07/sandbox-for-addies-birthday-could-also.html](/blogimgs/2016/08/23/6c0378f8gw1f730uldkfrj20p00dwaf1.jpg)<!--<source src="http://ww1.sinaimg.cn/large/6c0378f8gw1f730uldkfrj20p00dwaf1.jpg">-->

在 Node.js 中有一个模块叫做 VM，它提供了几个 API，允许代码在 V8 虚拟机上下文中运行，如：

```javascript
const vm = require('vm');
const sandbox = { a: 1, b: 2 };
const script = new vm.Script('a + b');
const context = new vm.createContext(sandbox);
script.runInContext(context);
```

`vm.Script` 中的代码是预编译好的，通过 `vm.createContext` 将代码加载到一个上下文环境中，置入沙箱（sandbox），然后通过 `script.runInContext` 执行代码，整个操作都在封闭的 VM 中进行。这是 Node.js 提供给我们的便捷功能，那么，在浏览器环境中呢？是否也能做到将代码运行在沙箱中？本文带着大家来探索一番。

<!--more-->

### 代码编译工具

**邪恶的 `eval`**

`eval` 函数可以将一个 Javascript 字符串视作代码片段执行，不过它存在诸多问题，如调试困难、性能问题等，并且它在运行时可以访问闭包环境和全局作用域，存在代码注入的安全风险，作为沙箱，这也是我们不期望看到的。`eval` 虽然好用，但是经常被滥用，在这里我们不多讨论它。

**`new Function`**

Function 构造函数会创建一个新的函数对象，它可以作为 `eval` 的替代品:

```javascript
fn = new Function(...args, 'functionBody');
```

返回的 `fn` 是一个定义好的函数，最后一个参数为函数体。它和 `eval` 不太一样：

- `fn` 是一段编译好的代码，可以直接执行，而 `eval` 需要编译一次
- `fn` 没有对所在闭包的作用域访问权限，不过它依然能够访问全局作用域

如何阻止它访问全局作用域呢？

### `with` 关键词

`with` 是阻止程序访问上一级作用域的一道防火墙：

```javascript
function compileCode(code) {
  code = 'with (sandbox) {' + code + '}';
  return new Function('sandbox', code);
}
```

如上代码，`code` 被执行时，首先会寻找 `sandbox` 中的变量，如果不存在，会往上追溯 `global` 对象，虽然有一道防火墙，但是依然不能阻止 fn 访问全局作用域。

似乎在 ECMAScript 5 中掌握的知识已经不足以解决 `code` 逃逸沙箱的问题了，此时我们可以把焦点放在 ES6 提供的新特性上。

### ES6 Proxy

ES6 中提供了一个 Proxy 函数，它是访问对象前的一个拦截器，下面举一个简单的栗子：

```javascript
const p = new Proxy({}, {
  get(target, key) {
    if(key === 'a') {
      return 1;
    }
    Reflect.get(target, key);
  }
});
p.a // 1
p.s // undefined
```

代码中，`Proxy` 给 `{}` 设置了属性访问拦截器，倘若访问的属性为 `a` 则返回 1，否则走正常程序。

这里我们可以使用 `proxy` 对访问做拦截处理，`sandbox` 本不存在的属性会追溯到全局变量上访问，此时我们可以欺骗程序，告诉它这个「不存在的属性」是存在的，于是有了下面的代码：

```javascript
function compileCode(code) {
  code = 'with (sandbox) {' + code + '}';
  const fn = new Function('sandbox', code);
  return (sandbox) => {
    const proxy = new Proxy(sandbox, {
      has(target, key) {
        return true; // 欺骗，告知属性存在
      }
    });
    return fn(proxy);
  }
}
```

似乎这么做就可以了，但既然用到了 ES6 的特性，我们便不能忽略 ES6 中一个可以控制 `with` 关键词行为的变量。

### Symbol.unscopables

`Symbol` 是 JS 的第七种数据类型，它能够产生一个唯一的值，同时也具备一些内建属性，这些属性可以用来进行元编程（meta programming），即对语言本身编程，影响语言行为。其中一个内建属性 `Symbol.unscopables`，通过它可以影响 `with` 的行为。

```javascript
const foo = () => 'global';
class A {
  foo() { return 'clourse'; }
  get [Symbol.unscopables]() {
    return {
      foo: true // 不允许访问对象的 foo，直接到上层
    }
  }
}
with(A.prototype) {
  foo(); // 'global'
}
```

上面对 A 设置做了 `Symbol.unscopables` 的设定，声明 `foo` 属性在 A 上是不存在的，从而使得代码从 `with` 中逃逸。对此，我们需要对它做一层加固：

```javascript
function compileCode(code) {
  code = 'with (sandbox) {' + code + '}';
  const fn = new Function('sandbox', code);
  return (sandbox) => {
    const proxy = new Proxy(sandbox, {
      has(target, key) {
        return true; // 欺骗，告知属性存在
      }
      get(target, key, receiver) {
        // 加固，防止逃逸
        if (key === Symbol.unscopables) {
          return undefined; 
        }
        Reflect.get(target, key, receiver);
      }
    });
    return fn(proxy);
  }
}
```

### 存在的漏洞

不过，这里还存在两个逻辑漏洞：

- `code` 中可以提前关闭 `sandbox` 的 `with` 语境，如 `'} alert(this); {'`；
- `code` 中可以使用 `eval` 和 `new Function` 直接逃逸

对于第一个问题，我们可以通过堆栈深度检测：

```javascript
let stack = 0;
for (let char of code) {
  if (char === '{') {
    stack++;
  } else if (char === '}') {
    if (stack === 0) {
      throw new Error('Syntax Error.');
    } else {
      stack--;
    }
  }
}
```

事实上，这样做依然不严谨，比如代码注释中出现花括号问题，如 `/*{*/'} alert(this); {'/*}*/`；而对于第二个问题，暂时还没有什么好的办法，尤其是 `Function`，它可以通过很多方式构造出来：

```javascript
(function(){}).constructor("alert(this)")();
/2/.constructor.constructor("alert(this)")();
```

### 最后

灵活是 Javascript 这门语言的特性，也是它难以被掌控的主要原因，这点可以从文中各种沙箱逃逸方式就能看出。ES6 提供了很多新的特性，本文以沙箱为切入点，带着大家学习了几个函数和属性，希望读者有些收获。

本文没有得到一个完美的答案，但是这个问题依然值得思考和研究。

有一个比较不错的思路是，通过 iframe 执行代码，执行的结果通过 `postMessage` 函数通讯传输给操作者。并且 iframe 还提供了很多可供设置的安全参数，如 `allow-scripts`, `allow-forms`, `allow-same-origin`, `allow-top-navigation` 等等，方便我们对沙箱做安全控制。

### 更多阅读

- [Play safely in sandboxed IFrames](http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/)
- [Writing a JavaScript framework - Sandboxed code evaluation](https://blog.risingstack.com/writing-a-javascript-framework-sandboxed-code-evaluation/)

---

题图：[Sandbox for Addies Birthday](http://homesteadroots.blogspot.com/2010/07/sandbox-for-addies-birthday-could-also.html)