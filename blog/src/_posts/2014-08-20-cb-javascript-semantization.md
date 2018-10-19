---
title: 如何让你的JavaScript代码更加语义化
categories:
  - 前端杂烩
tags:
  - tech
  - cnblogs
date: 2014-08-20 11:07:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2014/08/20/javascript-semantization.html" target="_blank">博客园</a>.</div>

<p class="p1">语义化这个词在 HTML 中用的比较多，即根据内容的结构化选择合适的标签。其作用不容小觑：</p>
<ul class="ul1">
<li class="li3">赋予标签含义，让代码结构更加清晰，虽然我们可以在标签上添加 class 来标识，但这种通过属性来表示本体的形式会显得不够直接，而且在一定程度上也有冗余。</li>
<li class="li3">优化搜索引擎（SEO），结构良好的网页对搜索引擎的亲和力是很高的，百度和 google 也给出了很多网页结构化的建议（规范），方便他们抓取网页。</li>
<li class="li3">利于设备解析，如盲人阅读器对页面的分析，目前淘宝很多网页都是支持盲人阅读的，这种体验上的优化得利于网页的良好结构和语义化表达。</li>
<li class="li3">便于开发者维护，在参加工作之前，很多程序员都是单人开发模式，单人开发无所谓代码结构，自己看得懂就差不多了，一旦走向工作岗位，会发现，以前的鄙习有点让自己捉襟见肘了。</li>
</ul>
<p class="p2">W3C Group 工作组在 web 规范上持续贡献，他们的目标也是期望整个互联网的发展态势稳定统一起来。不扯远了，回到本文需要阐述的重点：如何语义化 JavaScript 代码？</p>
<h3 class="p4"><strong>一、先看看那些不易读懂的 JavaScript 代码</strong></h3>
<p class="p2"><strong>1. 判断</strong></p>

```
// 数据类型判断
if(Object.prototype.toString.call(str) === "[object String]"){
    // doSomething();
}；

// 文件类型判断
if(/.*\.css(?=\?|$)/.test(\/path/to/main.css")){
    // doSomething();
}

```

<p class="p2"><strong>2. 清空一个队列</strong></p>

```
var Queue = ["test1", "test2", "test3"];
// 常见方式
Queue.length = 0;
Queue = [];

```

<p class="p2"><strong>3. 注册一个变量</strong></p>

```
// 注册
var repos = {};

repos["a"] = {
   name: "a",
   content: {}
};

repos["b"] = {
   name: "b",
   content: {}
};

```

<p class="p2">上面几个例子倒不至于看不懂，程序都特别简单，第一个例子中，我们通过 Object 原型链上的 toString 方法来判断一个变量是否为 string 类型，以及使用正则来判断一个文件是不是 css 文件。代码写起来比较轻松，倘若我们同时需要判断多个对象是否为多个类型中的一种呢？再比如我们需要在一串代码中提取 require 依赖关系呢，是否应该思考下如何组织自己的代码？</p>
<p class="p2">在第二个例子中，将数组的长度设置为 0，或者使用空数组来重置这个变量，都是十分常见的方式，但目前的场景是清空一个队列，我们是否可以使用更加语义化的形式来呈现？比如我们只需要清空该队列的前五个和后三个 item 呢？</p>
<p class="p2">第三个例子中，变量的注册，把一堆注册放在一起，上面的形式确实也是一目了然，如果 a b c d 等都是分隔穿插在几百行代码之间呢？突然来个 repos["x"] 这样是否显得有些不太直观。</p>
<p class="p2">为了说明本文所倡导的思想，上面的几个解释都有些含糊和牵强，请往下看。</p>
<h3 class="p4"><strong>二、提高代码语义性</strong></h3>
<p class="p2">针对上述三个案例，用更加语义化的方式来呈现代码：</p>
<p class="p2"><strong>1. 语义化变量</strong></p>

```
// 类型判断
function isType(type){
    return function(o){
        return Object.prototype.toString.call(o) === '[object ' + type + ']';
    }
}

var isString = isType("String");
var isObject = isType("Object");
var isArray = isType("Array");

isString("I'm Barret Lee.");
isArray([1,2,3])；
isObject({});

```

<p class="p2">我觉得不需要太多的解释，对比</p>

```
if(Object.prototype.toString.call(str) === "[object String]"){
    // code here...
}

```

<p>显得清新多了吧。</p>

```
// 提取常量
var isCss = /.*\.css(?=\?|$)/;
isCss.test("/path/to/main.css");

```

<p class="p2">不管 isCss 这个正则代码有多长，当我们看到 isCss 这个单词就可以顾名思义。很多人写正则都不会将正则单独提取出来使用某个有意义的变量去存储，加注释还好，要是不加注释，后续开发者就只能硬着头皮看懂正则去理解代码的含义。</p>
<p class="p2">这样的处理，实际上是增加了代码量，不过从工程角度去审视，有助于提高开发效率以及代码的组织性。</p>
<p class="p2"><strong>2. 语义化行为</strong></p>

```
var Queue = ["test1", "test2", "test3"];
Queue.splice(0, Queue.length);

```

<p class="p2">上面代码具有很强的语义性，从索引为 0 的地方开始，直到队列最后，删除 Queue 中所有的 item。这种写法的扩展性也更好：</p>

```
Queue.splice(2, 4); // 删除从索引为 2，往后的 4 个元素

```

<p class="p2">这只是个小例子，有些行为是需要很多代码组合处理的，如果没有很好的组合同一行为的代码，整个结构就显得十分涣散，不利于阅读。</p>

```
// 注册
var repos = [];

function register(o){
   repos[o.name] = o;
}

register({
  name: "a",
  content: {}
});

```

<p class="p2">对比我们之前</p>

```
repos["a"] = {
   name: "a",
   content: {}
};

```

<p class="p5"><span>语义化程度是不是有所提高~</span></p>
<h3 class="p4"><strong>三、小结</strong></h3>
<p class="p2">代码的优化，需要考虑的维度很多。但是代码的优化并不是减少代码量，有的时候我们需要增加代码来提高代码的可阅读性。</p>
<ul class="ul1">
<li class="li3">正确标记变量</li>
<li class="li3">封装某个动作</li>
<li class="li3">注意函数的写法</li>
<li class="li3">不容易理解的东西，加注释</li>
</ul>
<p class="p2">本文为抛砖引玉，希望可以触发你对代码优化的敏感度的思考，写出一手别人竖拇指的代码~</p>
<p class="p2">&nbsp;</p>