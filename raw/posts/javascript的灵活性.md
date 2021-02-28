---
title: javascript的灵活性
categories:
  - JavaScript
  - 杂物间
tags:
  - tech
  - cnblogs
warning: true
date: 2012-09-17 09:32:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2012/09/17/3049803.html" target="_blank">博客园</a>.</div>


<p>如果你偏爱过程式编程，你可以这样：</p>

```
/*Start and stop animations using functions.*/
function startAnination() {
    ....
}
function stopAnination(){
    ....
}

```

<p>这种做法很简单，但是你无法创建可以保存状态并且具有一些仅对其内部状态进行操作的方法的动画对象。</p>
<p>下面的代码定义了一个类，你可以用它创建这种对象：</p>

```
/*Anim class.*/
 var Anim = function(){
    ....
 };
 Anim.prototype.start = function(){
    ....
 };
 Anim.prototype.stop = function(){
    ....
 };

 /*Usage.*/
 var myAnim = new Anim();
 myAnim.start();
 ....
 myAnim.stop();

```

<p>上述代码定义了一个名为Anim的类，并把两个方法赋给该类的prototype的属性。</p>
<p>如果你更喜欢把类的定义封装在一条声明中，则可以改用下面的代码：</p>

```
/*Anim class, with a slightly different syntax for declaring methods*/
var Anim = function(){
    ....
 };
 Anim.prototype = {
    start : function(){
        ....
    };
    stop : function(){
        ....
    };
};

```

<p>这在传统的面向对象程序员看来肯呢过更眼熟一点，他们习惯于看到类的方法声明内嵌在类的</p>
<p>声明之中。要是你以前用过这样的编程风格，可能想尝试下下面的是里。</p>

```
/*Add method to the Function object that can be used to declare methods*/
Function.prototype.methed = function(name, fn){
    this.prototype[name] = fn;
};

/*Anim class, with ,methods created using a conbenience ,method.*/
var Anim = function(){
    ....
};
Anim.method('start', function(){
    .....
});
Anim.method('stop', function(){
    ....
});

```

<p>Function.protytype.method用于为类添加新方法。他有两个参数，第一个是字符串，表示新方法</p>
<p>的名称；第二个是用作新方法的函数。</p>


<p>你可以进一步修改Function.prototype.method, 使其可被链式调用。这只需要在他返回this</p>
<p>值即可：</p>

```
/*This version alllows the calls to be chained.*/
Function.prototype.method = function(name, fn){
    this.prototype[name] = fn;
    return this;
};

/*Anim class, with methods created using a convenience and chaining.*/
var Anim = function(){
    ....
};
Anim.
    method('start', function(){
        ....
    }).
    method('stop', function(){
        ....
    });

```



<p>
              </p>