---
title: ECMAScript 6 简介
categories:
  - 前端杂烩
  - JavaScript
tags:
  - tech
  - cnblogs
  - ES6
warning: true
date: 2013-11-26 10:31:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/11/26/ES6-introduce.html" target="_blank">博客园</a>.</div>

<p>ECMAScript 6 是JavaScript的下一个标准，正处在快速开发之中，大部分已经完成了，预计将在2014年正式发布。Mozilla将在这个标准的基础上，推出JavaScript 2.0。</p>
<p>ECMAScript 6 的目标，是使得JavaScript可以用来编写复杂的应用程序、函数库和代码的自动生成器（code generator）。</p>
<p>最新的浏览器已经部分支持ECMAScript 6 的语法，可以通过<a href="http://kangax.github.io/es5-compat-table/es6/" target="_blank">《ECMAScript 6 浏览器兼容表》</a>查看浏览器支持情况。</p>
<h3>ECMAScript 6 新内容一览</h3>
<ol>
<li>
<p><strong>let, const</strong> (定义块级局部变量), 函数在块级域中</p>
</li>
<li>
<p><strong>解构</strong>: <code>let {x, y} = pt; let [s, v, o] = triple();</code> (如可以 <code>let pt = {x:2, y:-5}</code>).</p>
</li>
<li>
<p><strong>参数设置默认设置</strong>: <code>function f(x, y=1, z=0) {...}</code></p>
</li>
<li>
<p><strong>rest</strong>: <code>function g(i, j, ...r) { return r.slice(i, j); }</code> (而不是疯狂地使用arguments).</p>
</li>
<li>
<p><strong>spread</strong>: <code>let a = [0,1,2,3]</code>, <code>o = new Something(...a);</code></p>
</li>
<li>
<p><strong>proxies</strong>: <code>let obj = Proxy.create(handler, proto)</code>. 简单地说，就是类对象元素的符号重载.</p>
</li>
<li>
<p><strong>weak map</strong>: <code>let map = new WeakMap</code>. 当你有循环应用的时候用它.</p>
</li>
<li>
<p><strong>generators</strong>: <code>function* gen() { yield 1; yield 2; }</code> 事实上, gen() 返回一个有next()属性的对象</p>
</li>
<li>
<p><strong>迭代器</strong>: <code>for (var [key, val] of items(x)) { alert(key + ',' + val); }</code>. Iterators 可以是 generators 或者 proxies.</p>
</li>
<li>
<p><strong>array and generator comprehension</strong>: <code>[a+b for (a in A) for (b in B)]</code> (array comprehension), <code>(x for (x of generateValues()) if (x.color === 'blue'))</code> (generator expression).</p>
</li>
<li>
<p><strong>二进制数据</strong>: <code>const Pixel = new StructType({x:uint32, y:uint32, color:Color})</code> (此处Color本身就是一个结构类型), <code>new ArrayType(Pixel, 3)</code>.</p>
</li>
<li>
<p><strong>类语法</strong>, 包含 <code>extends</code>, <code>prototype</code>, and <code>super</code>:</p>

```
class Point extends Base {
  constructor(x,y) {
    super();
    this[px] = x, this[py] = y;
    this.r = function() { return Math.sqrt(x*x + y*y); }
  }
  get x() { return this[px]; }
  get y() { return this[py]; }
  proto_r() { return Math.sqrt(this[px] * this[px] +
      this[py] * this[py]); }
  equals(p) { return this[px] === p[px] &&
      this[py] === p[py]; }
}

```

</li>
<li>&nbsp;<strong>模块</strong>:

```
module math {
  export function sum(x, y) {
    return x + y;
  }
  export var pi = 3.141593;
}
import {sum, pi} from math;
alert(sum(pi,pi));

```



</li>
<li><strong>quasis</strong>: multiline, 可扩展的预处理字符串. <code><code>You are ${age} years old.</code></code>

```
// The following regexp spans multiple lines.
re`line1: (words )*
line2: \w+`

// It desugars to:
re({raw:'line1: (words )*\nline2: \w+',
    cooked:'line1: (words )*\nline2: \w+'})&nbsp;

```

</li>
</ol>
<h3>参考资料</h3>
<ul>
<li><a href="http://espadrine.github.io/New-In-A-Spec/es6/">http://espadrine.github.io/New-In-A-Spec/es6/</a> espadrine</li>
<li><a href="http://javascript.ruanyifeng.com/oop/ecmascript6.html">http://javascript.ruanyifeng.com/oop/ecmascript6.html</a> ruanyifeng</li>

</ul>
<p>后续文章将陆续详细介绍上述新特性。</p>

