---
title: ECMAScript 6中的let和const关键词
categories:
  - JavaScript
  - 前端杂烩
tags:
  - tech
  - cnblogs
  - ES6
warning: true
date: 2013-11-28 09:46:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/11/28/ES6-computed-properties.html" target="_blank">博客园</a>.</div>

<p>ECMAScript 6中多了两个定义变量的关键词，一个是<a href="http://wiki.ecmascript.org/doku.php?id=harmony:let" target="_blank">let</a>，另一个是<a href="http://wiki.ecmascript.org/doku.php?id=harmony:const" target="_blank">const</a>，后者顾名思义就是常量定义，前者的作用域范围是块级的。</p>
<p>一般写过js的童鞋都知道，同其他语言一样，JS中的变量作用域是函数域而不是块级分割的，但是涉及到变量提升（hosting），闭包等问题的时候，很多有经验的程序员依然会头疼。</p>

```
var a = 5;
if(true){
    var a = 10;
}
console.log(a);//10

```

<p><span>上面的结果是10，但是我们看到，在if block内外都有一个a的定义，按我们正常的理解来看，这两个a应该占用的是不同的内存，而事实上，他们共用同一个内存。为此，ES 6中的let关键词\修复"了这个问题。</span></p>

```
let a = 5;
if(true){
    let a = 10;
}
console.log(a); //5

```

<p><span>let作用在块级作用域中，所以不管是switch还是if还是for，只要是let定义的变量，他就只能在那个花括号内部起作用。let是一个让程序员比较省心的一个关键词，而还有一个令人兴奋的关键词是let的兄弟const，一旦定义一个变量为const类型，后面就不能对他进行修改。</span></p>

```
const aa = 11;
alert(aa) //11
aa = 22;
alert(aa) //11

```

<p><span>关于这两者的兼容性问题，可以到这里查看</span><a href="http://kangax.github.io/es5-compat-table/es6/" target="_blank">http://kangax.github.io/es5-compat-table/es6/</a></p>
<p>Node已经支持了const和let关键词，可以这样使用<code>node --harmony</code>和<code>use strict</code>。目前一些浏览器还不支持这样的写法，但是利用defs.js这个库可以ES3也支持这个。他的原理就是利用<a href="//github.com/ariya/esprima" target="_blank">esprima</a>来编译并重写你的代码。比如：</p>

```
"use strict";
function fn() {
    const y = 0;
    for (let x = 0; x < 10; x++) {
        const y = x * 2;
        const z = y;
    }
    console.log(y); // prints 0
}
fn();

```

<p><span>经过def.js重新编译之后变成：</span></p>

```
"use strict";
function fn() {
    var y = 0;
    for (var x = 0; x < 10; x++) {
        var y$0 = x * 2;
        var z = y$0;
    }
    console.log(y); // prints 0
}
fn();

```

<p><span>详情可以去</span><a href="//github.com/olov/defs" target="_blank">//github.com/olov/defs</a><span>这里瞅瞅。</span></p>

