---
title: JavaScript中需要注意的几个问题
categories:
  - JavaScript
  - 前端杂烩
tags:
  - tech
  - cnblogs
warning: true
date: 2013-09-22 03:40:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/09/22/javascript-attention.html" target="_blank">博客园</a>.</div>

<p>　　JavaScript是一门弱语言，她使用起来不像C/C++那样有十分繁琐的内存管理、类型定义等，所以学习JavaScript的门槛相对来说也比较低。门槛低并不意味着这门语言很简单，我们在使用的时候会遇到各种千奇百怪的问题，有些是因为浏览器的兼容性引起的，有些是因为JS语法本身所引起的，还有些是因为ECMAScript标准的改变而引起的，总之，这样的问题很多，下面列举</p>
<h3>几个比较容易忽略的点</h3>
<p>　　<strong>1. switch的case判断</strong></p>

```
var t = event.keyCode;
switch (t) {
   case '65':
      alert("Yay!");
      break;
}

```

<p>　　当keycode为65时，你会发现，咦？怎么木有alert！ 这里需要明确的是，switch在判断的时候使用的是全等号\==="，全等号在比较的时候首先看数据类型是不是一样的，而在这里，t是Number类型，而'65'是String。</p>


<p>　　<strong>2. 严格模式下this&ne;window</strong></p>

```
"use strict";
var global = (function() {
    console.log(this); //undefined
})();

```

<p>　　有时候我们需要用global来缓存this这个全局环境（可能是window，也可能是其他的，比如在Worker中没有window对象，用self代表Global），但是在严格模式下函数作用域返回的this为undefined，一般，我们可以采用如下方式获取到Global对象：</p>

```
"use strict";
var global = (function() {
    var t = new Function("return this")();
    console.log(t);
})();

```

<p>或者：</p>

```
"use strict";
var global = (function() {
    var t = window.eval("this");
    console.log(t);
})();

```

<p>　　因为new Function是在全局作用域上执行的，所以返回的是Global对象，下面的eval需要一起注意，eval前如果不交window，那它便处于function作用域中（javascript利用function里分隔作用域），自然不会返回window或者全局对象。使用Function要注意一点：</p>

```
(function () {
   var local = 1;
   new Function("console.log(typeof local);")(); // logs undefined
}());

```

<p>　　new Function工作在Global作用域链下，所以是访问不到匿名函数中local的~</p>


<p>　　<strong>3. 变量提升（Hoisting）</strong></p>

```
var t = "global";
function foo(){
    console.log(t); //undefined
    return; 　　 var t = "local";
}

```

<p>　　这是一个老生常谈的问题，var最好不好到处散布。所谓的变量提升，在这里存在两个作用域，一个是Global作用域，他下面有t和foo这两个变量，而foo指向的是foo作用域，foo作用域下有一个t变量，画个图演示下吧</p>

```
[Global Scope]
    |----- t   [String] undefined -> "global"
    |----- foo [Reference] [foo Scope]

[foo Scope]
    |----- t   [String] undefined -> "local"

```

<p>　　刚进入全局作用域链的时候，程序扫描到t和foo两个变量，于是给这个t赋值为undefined，扫面完了之后，看到t有值，于是给赋值"global\，foo指向[foo Scope]，于是进入[foo Scope]，继续扫描函数作用域链下的变量，发现目标t之后，赋值为undefined，在console.log时，是这样的：</p>

```
var t = "global";
function foo(){
    var t; // 等同于 -> var t = undefined;
    console.log(t); //undefined     return; 　     var t = "local"; }

```

<p>　　上面的例子写不写return结果都是一样的，加return，只是为了更好的表达变量提升这个动作的存在。一般比较推荐的变量定义方式：</p>

```
function foo(a, b, c) {
    var x = 1,
        bar,
        baz = "something";
}

```

<p>　　一个var，后边连着一串变量的定义。</p>


<h3>附：javascript严格模式下要注意的地方（转自<a href="http://www.web-tinker.com/article/20125.html" target="_blank">次碳酸钴</a>）</h3>
<p>&nbsp;<strong>1. 变量必须声明才能使用</strong></p>

```
"use strict";
a=1; //缺少var语句做声明，因此报错

```


```
"use strict";
var a=b=1; //错误 b未声明

```



<p>&nbsp;<strong>2. 函数声明语句（不包括表达式）不允许在普通代码块（不包括闭包）中使用</strong></p>

```
"use strict";
(function(){
  //闭包中是允许使用函数声明语句的
  function func(){};
})();
{
  var f=function(){}; //函数声明表达式允许
  function func(){}; //函数声明语句在普通闭包中，错误
};

```

<p><strong>3. 闭包内的this不指向Global对象</strong></p>

```
"use strict";
(function(){
  alert(this); //输出undefined
})();

```

<p><strong>4. 对象属性和函数形参不能重复声明</strong></p>

```
"use strict";
var o={a:1,a:1};
//这个对象定义了两个a属性，因此报错

```


```
"use strict";
function func(a,a){};
//这个函数的两个形参都是a，因此报错

```

<p><strong>5. eval拥有类似闭包的作用域</strong></p>

```
"use strict";
var a=1,b=1;
eval("var a=2");
window.eval("var b=2");
alert(a); //输出1 因为运行的a变成了eval作用域的局部变量
alert(b); //输出2 window.eval依然是全局作用域

```

<p><strong>6. callee和caller属性无法使用</strong></p>

```
"use strict";
function func(){
  return arguments.callee; //错误 callee无法使用
};
func();

```

<p><strong>7. with语句无法使用</strong></p>

```
"use strict";
with({});

```

<p><strong>8. 八进制数字常量无法使用</strong></p>

```
"use strict";
var a=0999; //十进制，可以使用
var b=0123; //八禁止，无法使用

```

<p><strong>9. 普通模式下的一些无效操作变成错误</strong></p>

```
"use strict";
var a=1;
delete a;
//错误 无法删除var声明的变量

```


```
"use strict";
var o={get a(){}};
o.a=1;
//错误 给只读属性赋值

```



<p>简单总结这么多，推荐\<a title="次碳酸钴" href="http://www.web-tinker.com/" target="_blank">次碳酸钴</a>"童鞋的博客，细致入微、内容深刻，博客入口：<a title="次碳酸钴" href="http://www.web-tinker.com/" target="_blank">http://www.web-tinker.com</a></p>
<p>关于JavaScript strict mode的详细介绍，请移步：<a href="//developer.mozilla.org/en-US/docs/JavaScript/Reference/Functions_and_function_scope/Strict_mode" rel="nofollow" target="_blank">MDN Strict_mode</a></p>



