---
title: ECMAScript 6入门
categories:
  - JavaScript
  - 前端杂烩
tags:
  - tech
  - cnblogs
  - ES6
date: 2014-05-02 09:42:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2014/05/02/ecmascript6-overview.html" target="_blank">博客园</a>.</div>

<p>预计在2014年底，ECMAScript 6将会正式发布，他的草案在13年3月份被冻结，后续提出新特性将会移至ECMASript 7中。目前还没有哪款浏览器实现了ES6的全部内容，兼容性最强的一款要数FireFox了。具体情况可以在<a href="http://kangax.github.io/es5-compat-table/es6/" target="_blank">这里</a>查看。</p>
<p>关于 ECMAScript 6 草案，我在博客里头复制了一份，可以点击<a href="http://barretlee.com/ST/ES6/" target="_blank">这里</a>。</p>
<p>JavaScript的内容是越来越丰富，在ES6中还添加了模块（module）和类（class），感觉他已经失去了曾经的单纯了，不知道这些新功能的补充对开发者来说是福音还是负担。之前写过两篇关于ES6的文章，<a href="http://www.cnblogs.com/hustskyking/p/ES6-introduce.html">ECMAScript 6 简介</a> 和 <a href="http://www.cnblogs.com/hustskyking/p/ES6-computed-properties.html">ECMAScript 6中的let和const关键词</a>，本文将一一介绍ES6中的一些新特性。</p>
<p><strong>注意：如果想测试以下属性，请安装 0.11+ 版本的 node，并添加上 --harmony 参数。</strong></p>
<h3>一、let 和 const</h3>
<p>这个内容在 <a href="http://www.cnblogs.com/hustskyking/p/ES6-computed-properties.html">ECMAScript 6中的let和const关键词</a>&nbsp;一文中已经介绍过了。简单来说就是一句话：ES6中引入了块级作用域，let的有效区间是他所在的 <code>{}</code> 大括号中。const 为常量，定义之后不能更改，也删除不了。</p>

```
> const PI = 3.14;> Object.getOwnPropertyDescriptor(window, PI)
Object {value: 3.1415, writable: false, enumerable: true, configurable: false}

```

<p>writable 和 configurable 都是 false。</p>
<h3>二、多变量的模式赋值</h3>
<p>写过 coffee-script 的人都知道，我们可以这样给一个数据赋值：</p>

```
num[1..3] = ["hello", "i'am", "Barret Lee"]

```

<p>ES6中也允许类似的多变量赋值：</p>

```
var [x, y, z] = ["hello", "i'am", "Barret Lee"];

```

<p>更强大的是，他还适合对象：</p>

```
var { foo, bar } = { foo: "Barret", bar: "Lee" };

```

<p>这种赋值方式是模式匹配的，只要左侧跟右侧对应，便可以成功赋值。感觉新手不会太适应这种写法。</p>
<h3>三、数组推导</h3>
<p>先看例子：</p>

```
var a1 = [1, 2, 3, 4];
var a2 = [i * 2 for (i of a1)];

a2 // [2, 4, 6, 8]

```

<p>这东西只是简化了编程，没有从根本上增加功能和特性，写 coffee 的人应该比较喜欢，我看着还是有点不习惯，其实上面的写法就等价于：</p>

```
var a1 = [1, 2, 3, 4];
var a2 = a1.map(function (i) { return i * 2 });

```

<p>我想除非是代码长度有限制，否则这玩意儿正式出来了我也不会用它。</p>
<h3>四、字符串的扩展</h3>
<p>这一块的内容相当于是给 JS 编码打一个补丁，这个补丁用来弥补双字节 UTF-16 字符带来的问题，引入的各个函数也只是对不同场景的修复。这个扩展还是相当重要的，尤其是 ArrayBuffer 中数据类型的相关处理，涉及到很多类似 Float64Array Uint32Array 等类型化数组的处理，我在 <a href="http://www.cnblogs.com/hustskyking/p/javascript-array.html">你所不知道的JavaScript数组</a> 曾提到过。</p>
<h4>1. codePointAt</h4>
<p>这个地方需要解释下 JavaScript 对字符的储存模式，JavaScript 中的字符串是以 UTF-16 为代码单元，通常我们使用的字符范围都在 Unicode 值 0x10000 以内，他们对应的 UTF-16 就是它们自身，但 Unicode 中也存在这个范围之外的字符，这时候就需要两个 UTF-16 字符来描述，比如：</p>

```
alert("𠐀".length); //2

```

<p>因为字符串的 length 表示的并不是字符个数，而是 UTF-16 的单元个数。关于这方面知识的具体介绍，可以戳<a href="http://www.web-tinker.com/article/20468.html" target="_blank">这里</a>。</p>
<p>ES6提供了 codePointAt 函数来正确处理 4 个字节储存的字符。</p>

```
var s = "𠐀二";
s.codePointAt(0);

```

<p>codePointAt 会把 s 中的两个字符都正确解析出来，相当于智能的将储存单元切换为 2 或者 4.</p>
<h4>2. fromCodePoint</h4>
<p>对应 String.fromCharCode 的能够智能解析 s 的函数是 String.fromCodePoint</p>
<h4>3. 字符的Unicode表示法</h4>
<p>我们知道可以使用 \u0000-\uFFFF 来表示一个 Unicode 字符，依然是上面的问题，如果字符超出了这个范围，比如 "\u10000" 这个字符，便不能正确的解析出来，ES6中可以这样：</p>

```
#\u{10000}

```

<p>用大括号括起来就可以正常解析超过 FFFF 的字符了。</p>
<h4>4. 正则修饰符 u</h4>

```
/^.$/.test("𠐀") // false
/^..$/.test("𠐀") // true
/^.$/u.test("𠐀") // true

```

<p>看到上面三个测试，相信你已经知道是什么意思了。</p>
<h4>5. 几个没啥意思的函数</h4>
<p>contains(), startsWith(), endsWith(), repeat()</p>
<p>都是对 String 的拓展，顾名就能思意。</p>
<h4>6. 模板字符串</h4>
<p>之前写过一篇关于 TEMPLATE 标签的<a href="http://i.cnblogs.com/javascript-template-tag">文章</a>，这里我们又看到了一个跟模板相关的东西。</p>

```
// 字符串中嵌入变量
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`

var x = 1;
var y = 2;
console.log(`${ x } + ${ y } = ${ x + y}`)
// "1 + 2 = 3"

```

<p>配合 TEMPLATE 标签使用是比较方便的，不过 TEMPLATE 标签可以很方便的使用自定义标签，这个特性也不是很突出了。</p>

```
<div id="test">
  <x-from>DOM文档</x-from>
  <x-name>test元素</x-name>
</div>

<template id="temp">
  我是来自 <strong><content select="x-from"></content></strong>
  中的 <strong><content select="x-name"></content></strong>
  的数据。
</template>

<script>
var root = test.webkitCreateShadowRoot();
root.appendChild(document.importNode(temp.content));
</script>

```

<h3>五、数值的扩展</h3>
<h4>1. 二进制和八进制表示法</h4>

```
0b111110111 === 503 // true
0o767 === 503 // true

```

<p>前缀 0b 和 0o 表示二进制和八进制数值</p>
<h4>2. 扩展函数</h4>
<ul>
<li>Number.isFinite()</li>
<li>Number.isNaN()</li>
<li>Number.parseInt()</li>
<li>Number.parseFloat()</li>
<li>Number.isInteger()</li>
</ul>
<p>具体细节可以去 <a href="//developer.mozilla.org/en/" target="_blank">MDN</a> 上搜查。</p>
<h3>六、对象的扩展</h3>
<p>在 ES5.1 中我们看到了 Object 的灵活性提高了很多，加入了 create、defineProperty、freeze 等等很多十分有用的方法，而在 ES6 中，依然继续加强：</p>
<h4>1. <code>Object.is()</code></h4>
<p>比较严格相等，传入两个参数，其功能跟 <code>===</code> 差不多，不同的是：+0不等于-0，NaN与本身恒等</p>

```
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true

```

<h4>2. proto属性</h4>

```
obj.__proto__ = otherObj;

```

<p>这东西浏览器早就实现了，只是在 ES6 才被纳入标准中，还记得这东西被用来判断是否为 IE 么：</p>

```
var isIE = "__proto__" in {} ? false : true;

```

<h4>3. 增强的对象写法</h4>
<p>又是一个装饰品：</p>

```
var Person = {
  name: 'Barret Lee',

  //等同于birth: birth
  birth,

  // 等同于hello: function ()...
  hello() { console.log('My Name Is', this.name); }

}; 

```

<h4>4. 允许变量渗入 key 中</h4>

```
var name = "my name";
var Me = {
    [name]: "Barret Lee",
    "name": "李靖"
};
Me[name]       // "Barret Lee"
Me["my name"]  // "Barret Lee"
Me["name"]     // "李靖"

```

<p>挺方便的，不过容易出错，比如上面，看晕了吧~</p>
<h4>5. Symbol</h4>
<p>一种从类型上区分数据的工具，他是一个原始类型的值，不是对象，很适合做标识符。</p>
<h4>6. Proxy</h4>
<p>Proxy 内置的一个代理工具，使用他可以在对象处理上加一层屏障：</p>

```
var plain = {
    name : "Barret Lee"
};
var proxy = new Proxy(plain, {
    get: function(target, property) {
        return property in target ? target[property] : "我擦";
    }
});

proxy.name // "Barret Lee"
proxy.title // "我擦"

```

<p>Proxy(target, handler), 这里的 handler 可以是 set get has hasOwn keys 等等方法，具体可以移步这里：<a href="http://wiki.ecmascript.org/doku.php?id=harmony:direct_proxies" target="_blank">http://wiki.ecmascript.org/doku.php?id=harmony:direct_proxies</a></p>
<h3>七、函数的扩展</h3>
<h4>1. 参数设置默认值</h4>

```
function Point(x = 0, y = 0) {
   this.x = x;
   this.y = y;
}

var p = new Point();
// p = { x:0, y:0 }

```

<p>他这个参数可以初始化相当于暴露更多的底层接口吧，提高了函数的拓展性。</p>
<h4>2. rest运算符（...）</h4>

```
function add(...values) {
    let sum = 0;

   for (var val of values) {
      sum += val;
   }

   return sum;
}
add(1, 2 ,3)  // 6

```

<p>这里的 values 需要用 val of values 来遍历。</p>
<h4>3. 箭头函数（=&gt;）</h4>
<p>之前写过 coffee ，所以对这个我还是比较熟悉的：</p>

```
var f = (a, b) => {return a + b};

```

<p>这个跟上面提到的一些内容一样，都是装饰性的，没太多用途。</p>
<h3>八、Set和Map数据结构</h3>
<h4>1. Set</h4>
<p>简单点解释，他就是一个没有重复数值的数组。或者说他就是一个数组的 hash 表。</p>

```
var items = new Set([1,2,3,4,5,5,5,5]);

for (i of s) {console.log(i)}
// 2 3 4 5

```

<p>其遍历也是使用 val of values，他没有继承 Array 的方法，自己的几个方法是：</p>
<ul>
<li>size()：返回成员总数。</li>
<li>add(value)：添加某个值。</li>
<li>delete(value)：删除某个值。</li>
<li>has(value)：返回一个布尔值，表示该值是否为set的成员。</li>
<li>clear()：清除所有成员。</li>
</ul>
<p>转化为数组的方式：</p>

```
var items = new Set([1, 2, 3, 4, 5]);
var array = Array.from(items);

```

<h4>2. Map</h4>
<p>Map 是一个\超对象"，其 key 除了可以是 String 类型之外，还可以为其他类型（如：对象）</p>

```
var m = new Map();

o = {p: "Hello World"};

m.set(o, "content")

console.log(m.get(o))
// "content"

```

<p>他的方法和 Set 差不多：</p>
<ul>
<li>size：返回成员总数。</li>
<li>set(key, value)：设置一个键值对。</li>
<li>get(key)：读取一个键。</li>
<li>has(key)：返回一个布尔值，表示某个键是否在Map数据结构中。</li>
<li>delete(key)：删除某个键。</li>
<li>clear()：清除所有成员。</li>
<li>keys()：返回键名的遍历器。</li>
<li>values()：返回键值的遍历器。</li>
<li>entries()：返回所有成员的遍历器。</li>
</ul>
<h4>3. WeakMap</h4>
<p>如果说Map 是一个\超对象"，那 WeakMap 就是个 \弱超对象"，他的键值只能是除 null 以外的对象。他的存在是为了方便垃圾回收。</p>
<h3>八、遍历器（Iterator）</h3>
<p>相比 Array，他对数据的管理更为紧凑，而且可操纵性也比较强，以后会成为一个比较通用的 JS 工具。</p>

```
function idMaker(){
    var index = 0;

    return {
       next: function(){
           return {value: index++, done: false};
       }
    }
}

var it = idMaker();

it.next().value // '0'
it.next().value // '1'
it.next().value // '2'

```

<p>一个对象只要具备了next方法，就可以用for...of循环遍历它的值。</p>

```
for (var n of it) {
  if (n > 5)
    break;
  console.log(n);
}

```

<h3>九、Generator 函数</h3>
<p>Generator就是一个改装了的 Iterator 遍历器，通过 yield 来增加一个 next() 节点。</p>
<p>声明一个 Generator 的方法：</p>

```
function * foo( input ) {
    var res = yield input;
}

```

<p>使用方式：</p>

```
function * foo( input ) {
  var res = yield input;
}

var g = foo(10);
g.next(); // { value: 10, done: false }
g.next(); // { value: undefined, done: true }

```

<p>Genrator的标识就是函数名前面有个 <code>*</code> 号，由于每个 yield 都会增加一个 next() 节点，当我们在一个 Generator 中添加多个 yield 的时候：</p>

```
function* G() {
    yield 'Barret';
    yield 'Lee';
}

var g = G();
g.next(); // "Barret"
g.next(); // "Lee"
g.next(); // undefined
g.next(); // Error: Generator has already finished

```

<p>相比 Iterator，我更喜欢 Generator。</p>
<h3>十、Promise 对象</h3>
<p>ES6将 Promise 纳入规范之后，很多浏览器根据 Promise/A+ 规范实现了一套 API，Promise对象是对异步操作的平坦式表达，避免了 callback hell，也就是多层嵌套的回调函数。这方面的东西可以参考我之前写的 <a href="http://www.cnblogs.com/hustskyking/p/javascript-asynchronous-programming.html">JavaScript异步编程原理</a>.</p>
<p>这里是 <a href="http://promisesaplus.com/" target="_blank">Promise/A+</a> 规范文档，感兴趣的可以阅读一下。</p>
<p>在Promises/A规范中，每个任务都有三种状态：默认(pending)、完成(fulfilled)、失败(rejected)。</p>
<ul>
<li>默认状态可以单向转移到完成状态，这个过程叫resolve，对应的方法是deferred.resolve(promiseOrValue)；</li>
<li>默认状态还可以单向转移到失败状态，这个过程叫reject，对应的方法是deferred.reject(reason)；</li>
<li>默认状态时，还可以通过deferred.notify(update)来宣告任务执行信息，如执行进度；</li>
<li>状态的转移是一次性的，一旦任务由初始的pending转为其他状态，就会进入到下一个任务的执行过程中。</li>
</ul>
<h3>十一、Class和Module</h3>
<h4>1. Class</h4>
<p>Class，对象模板：</p>

```
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '('+this.x+', '+this.y+')';
  }

}

```

<p>一下子就有了 C++/Java 的感觉了，在类中可以使用 extends 继承：</p>

```
class ColorPoint extends Point {

  constructor(x, y, color) {
    super(x, y); // same as super.constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color+' '+super();
  }

}

```

<h4>2. Module</h4>
<p>之前在<a href="http://www.cnblogs.com/hustskyking/p/how-to-achieve-loading-module.html">这篇文章</a>谈过模块化编程的必要性，时代在变化，需求也在变，ES6引入 Module 也算是与时俱进。ES6允许将独立的js文件作为模块，也就是说，允许一个JavaScript脚本文件调用另一个脚本文件，从而使得模块化编程成为可能。</p>

```
// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}

```

<p>如果我们要引入 circle.js 的函数，可以：</p>

```
// main.js

import { area, circumference } from 'circle';

console.log("圆面积：" + area(4));
console.log("圆周长：" + circumference(14));

```

<p>如果要引入整个 circle 的内容：</p>

```
// main.js

module circle from 'circle';

console.log("圆面积：" + circle.area(4));
console.log("圆周长：" + circle.circumference(14));

```

<p>模块之间的继承使用这条命令：</p>

```
// other.js
export * from 'circle';

```

<p>这个东西，很好用，可惜了，纯洁的 JS，被糟蹋成啥样了=. =</p>
<h3>十二、感谢</h3>
<p>本文的书写逻辑参考阮一峰的<a href="http://es6.ruanyifeng.com/" target="_blank">总结</a>，并参入了一些个人主观色彩，感谢前人栽树！</p>
<h3>十三、参考资料</h3>
<ul>
<li><a href="http://es6.ruanyifeng.com/" target="_blank">http://es6.ruanyifeng.com/</a> 阮一峰</li>
<li><a href="http://www.web-tinker.com/article/20558.html" target="_blank">http://www.web-tinker.com/article/20558.html</a> <a href="http://www.web-tinker.com/article/20468.html" target="_blank">http://www.web-tinker.com/article/20468.html</a>
<a href="http://www.web-tinker.com/article/20520.html" target="_blank">http://www.web-tinker.com/article/20520.html</a> 次碳酸钴</li>
<li><a href="http://huangj.in/765" target="_blank">http://huangj.in/765</a> H-Jin</li>

</ul>

