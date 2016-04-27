---
title: 前端编码规范之JavaScript
categories:
  - JavaScript
  - 前端杂烩
tags:
  - tech
  - cnblogs
warning: true
date: 2013-08-14 11:55:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/08/14/javascript-spec.html" target="_blank">博客园</a>.</div>

<p>　　上次浅谈了下<a href="http://www.cnblogs.com/hustskyking/p/css-spec.html" target="_blank">关于CSS的编码规范</a>，大部分童鞋持赞同意见，仍存在一些童鞋不太理解这些规范的意义。</p>
<p>　　如果是个人或者小作坊开发，其实这些所谓的编码规范也没啥意思，因为大家写好的代码直接就给扔到网上去了，很少有打包、压缩、校检等过程，别人来修改你代码的情况也比较少。但是，对于一定规模的团队来说，这些东西还是挺有必要的！<strong><span>一个是保持代码的整洁美观，同时良好的代码编写格式和注释方式可以让后来者很快地了解你代码的大概思路，提高开发效率。</span></strong></p>
<p>　　那么这次，继续<span><strong>抛砖引玉</strong></span>，说说Javascript一些需要引起注意的地方（这些东西也是团队开发的时候大家集思广益总结出来的）。</p>
<h3>不规范写法举例</h3>
<p><strong>1.&nbsp;句尾<span>没有分号</span></strong></p>

```
var isHotel = json.type == "hotel" ? true : false

```

<p><strong>2.<span>&nbsp;变量命名</span>各种各样</strong></p>

```
var is_hotel;
var isHotel;
var ishotel;

```

<p><strong>3.&nbsp;<span>if</span> 缩写</strong></p>

```
if (isHotel)
    console.log(true)
else
    console.log(false)

```

<p><strong>4.&nbsp;使用<span> eval</span></strong></p>

```
var json = eval(jsonText);

```

<p><strong>5.&nbsp;<span>变量未定义</span>到处都是</strong></p>

```
function() {
    var isHotel = 'true';
    .......

    var html = isHotel ? '<p>hotel</p>' : "";
}

```

<p><strong>6.&nbsp;<span>超长函数</span></strong></p>

```
function() {
    var isHotel = 'true';
    //....... 此处省略500行
    return false;
}

```

<p><strong>7.&nbsp;..........</strong></p>


<p><span>书写不规范的代码让我们难以维护，有时候也让我们头疼。</span></p>


<p><span><strong><span>（禁止）、（必须）<span><span>等字眼，在这里</span><span>只是表示强调，未严格要求</span>。</span></span></strong></span></p>
<h3>前端规范之JavaScript</h3>
<p><strong>&nbsp;1.&nbsp;<span>tab</span>键用<span>（必须）<span>用</span></span><span>四个空格</span>代替</strong></p>
<p>这个原因已经在<a href="http://www.cnblogs.com/hustskyking/p/css-spec.html" target="_blank">前端编码规范之CSS</a>说过了，不再赘述。</p>


<p><strong>2. 每句代码后<span>（必须）</span>加"<span>;</span>"</strong></p>
<p>&nbsp;这个是要引起注意的，比如：</p>

```
a = b        // 赋值
(function(){
    //....
})()         // 自执行函数

```

<p>&nbsp;未加分号，结果被解析成</p>

```
a = b(function(){//...})()  //将b()()返回的结果赋值给a

```

<p>&nbsp;这是截然不同的两个结果，所以对于这个问题必须引起重视！！！</p>


<p><strong>3.&nbsp;变量、常量、类的<span>命名</span>按<span>（必须）</span>以下规则执行：</strong></p>
<p>　　<strong>1）<span>&nbsp;变量</span>：<code>必须</code>采用<span><code>骆驼峰</code></span>的命名且首字母小写</strong></p>

```
 // 正确的命名
  var isHotel,
      isHotelBeijing,
      isHotelBeijingHandian;

  // 不推荐的命名
  var is_Hotel,
      ishotelbeijing,
      IsHotelBeiJing;

```

<p>　　<strong>2）<span>&nbsp;常量</span>：<code>必须</code>采用<span>全大写的</span>命名，且单词以<code>_</code>分割</strong>，常量通常用于ajax请求url，和一些不会改变的数据</p>

```
// 正确的命名
  var HOTEL_GET_URL = 'http://map.baidu.com/detail',
      PLACE_TYPE = 'hotel';

```

<p>　　<strong>3）<span>&nbsp;类</span>：<code>必须</code>采用<span><code>骆驼峰</code></span>的命名且<span>首字母大写</span></strong>，如：</p>

```
 // 正确的写法
  var FooAndToo = function(name) {
      this.name = name;
  }

```



<p><strong>4.&nbsp;<span>空格</span>的使用</strong></p>
<p><strong>　　1）<span><code>if</code></span><span>中的空格，先上例子</span></strong></p>

```
 //正确的写法
  if (isOk) {
      console.log("ok");
  }

  //不推荐的写法
  if(isOk){
      console.log("ok");
  }

```

<ul>
<li><code>()</code>中的判断条件前后都<span>(<code>必须)</code></span>加空格</li>
<li><code>()</code>里的判断前后<span>(<code>禁止)</code></span>加空格，如：正确的写法:&nbsp;<code>if (isOk)</code>；不推荐的写法:&nbsp;<code>if ( isOk )</code></li>
</ul>
<p><strong>　　2）<span><code>switch</code></span><span>中的空格, 先上例子</span></strong></p>

```
//正确的写法
  switch(name) {
      case "hotel":
          console.log(name);
          break;

      case "moive":
          console.log(name);
          break;

      default:
          // code
  }

  //不推荐的写法
  switch (name) {                     // switch 后不应该有空格, 正确的写法: switch(name) { // code
      case "hotel":
          console.log(name);
      break;                          // break; 应该和console.log对齐
      case "movie":                   // 每个case之前需要有换行
          console.log(name);
      break;                          // break; 应该和console.log对齐

      default:
          // code
  }

```

<p>&nbsp;　　<strong>3）<span><code>for</code></span>中的空格，先上例子</strong></p>

```
 // 正确的写法
  var names = ["hotel", "movie"],
      i, len;

  for (i=0, len=names.length; i < len; i++) {
      // code
  }

  // 不推荐的写法
  var names = ["hotel", "movie"],
      i, len;

  for(i = 0, len = names.length;i < len;i++) {          // for后应该有空格，每个`;`号后需要有空格，变量的赋值不应该有空格
      // code
  }

```

<ul>
<li><strong><span><code>for</code></span></strong>后<strong><span>（<code>必须）</code></span></strong>加空格</li>
<li>每个<span><code>;</code></span>后<strong><span>（<code>必须）</code></span></strong>加空格</li>
<li><strong><span><code>()</code></span></strong>中<code>禁止</code>用<strong><span><code>var</code></span></strong>声明变量; 且变量的赋值&nbsp;<strong><span><code>=&nbsp;</code></span></strong>前后<strong><span>（<code>禁止）</code></span></strong>加空格</li>
</ul>
<p><strong>　　4）<span><code>function</code>&nbsp;</span>中的空格, 先上例子</strong></p>

```
 // 正确的写法
  function call(name) {

  }

  var cell = function () {

  };

  // 不推荐的写法
  var call = function(name){
      // code
  }

```

<ul>
<li>参数的反括号后<span><strong>（<code>必须）</code></strong></span>加空格</li>
<li><strong><span><code>function</code>&nbsp;</span></strong>后<span><strong>（<code>必须）</code></strong></span>加空格</li>
</ul>
<p><strong>　　5）<span><code>var</code>&nbsp;</span>中空格及定义，先上例子</strong></p>

```
 // 一个推荐的var写法组
  function(res) {
      var code = 1 + 1,
          json = JSON.parse(res),
          type, html;

      // code
  }

```

<ul>
<li>声明变量<strong><span>&nbsp;</span></strong><code><strong><span>=</span></strong>&nbsp;</code>前后<strong><span>（<code>必须）</code></span></strong>添加空格</li>
<li>每个变量的赋值声明以<code>,</code>结束后<span><strong>（<code>必须）</code></strong></span>换行进行下一个变量赋值声明</li>
<li><span><strong><code>（推荐）</code></strong></span>将所有不需要进行赋值的变量声明放置最后一行，且变量之间不需要换行</li>
<li><strong><span><code>（推荐）</code></span></strong>当一组变量声明完成后，空一行后编写其余代码</li>
</ul>


<p><strong>5.&nbsp;在同一个函数内部，<span>局部变量的声明</span><code>必须</code>置于顶端</strong></p>
<p>因为即使放到中间，js解析器也会提升至顶部<span>（hosting）</span></p>

```
 // 正确的书写
 var clear = function(el) {
     var id = el.id,
         name = el.getAttribute("data-name");

     .........
     return true;
 }

 // 不推荐的书写
 var clear = function(el) {
     var id = el.id;

     ......

     var name = el.getAttribute("data-name");

     .........
     return true;
 }

```

<p>&nbsp;推荐阅读：<a href="http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html" target="_blank">JavaScript-Scoping-and-Hoisting</a></p>


<p><strong>6.&nbsp;块内函数<code>必须</code>用局部变量声明</strong></p>

```
// 错误的写法
 var call = function(name) {
     if (name == "hotel") {
         function foo() {
             console.log("hotel foo");
         }
     }

     foo && foo();
 }

 // 推荐的写法
 var call = function(name) {
     var foo;

     if (name == "hotel") {
         foo = function() {
             console.log("hotel foo");
         }
     }

     foo && foo();
 }

```

<p><span>引起的bug：第一种写法<code>foo</code>的声明被提前了; 调用<code>call</code>时：第一种写法会调用<code>foo</code>函数，第二种写法不会调用<code>foo</code>函数</span></p>
<p><em>注：不同浏览器解析不同，具体请移步汤姆大叔<a href="http://www.cnblogs.com/TomXu/archive/2012/01/30/2326372.html" target="_blank">深入解析Javascript函数篇</a></em></p>


<p><strong>7. <span>（<code>禁止）</code></span><span>使用<span>eval</span>，采取</span><span><code>$.parseJSON</code></span></strong></p>
<p><strong>&nbsp;三个原因：</strong></p>
<ul>
<li>有<span><strong>注入</strong></span>风险，尤其是ajax返回数据</li>
<li>不方便<span><strong>debug</strong></span></li>
<li><span><strong>效率低</strong></span>，eval是一个执行效率很低的函数</li>
</ul>
<p><strong>建议：</strong></p>
<p>　　使用<span><strong>new Function</strong></span>来代替eval的使用，最好就别用。</p>


<p><strong>8.&nbsp;除了<span>三目运算</span>，<span><code>if</code></span>,<span><code>else</code></span>等<span>（<code>禁止）</code></span>简写</strong></p>

```
 // 正确的书写
 if (true) {
     alert(name);
 }
 console.log(name);
 // 不推荐的书写
 if (true)
     alert(name);
 console.log(name);
 // 不推荐的书写
 if (true)
 alert(name);
 console.log(name)

```



<p><strong>9. <span>（<code>推荐）</code></span>在需要以<span><code>{}</code></span>闭合的代码段前增加换行，如：<span><code>for</code>&nbsp;<code>if</code></span></strong></p>

```
 // 没有换行，小的代码段无法区分
 if (wl && wl.length) {
     for (i = 0, l = wl.length; i < l; ++i) {
         p = wl[i];
         type = Y.Lang.type(r[p]);
         if (s.hasOwnProperty(p)) {
             if (merge && type == 'object') {
                 Y.mix(r[p], s[p]);
             } else if (ov || !(p in r)) {
                 r[p] = s[p];
             }
         }
     }
 }
 // 有了换行，逻辑清楚多了
 if (wl && wl.length) {

     for (i = 0, l = wl.length; i < l; ++i) {
         p = wl[i];
         type = Y.Lang.type(r[p]);

         if (s.hasOwnProperty(p)) {
             // 处理merge逻辑
             if (merge && type == 'object') {
                 Y.mix(r[p], s[p]);
             } else if (ov || !(p in r)) {
                 r[p] = s[p];
             }
         }
     }
 }

```

<p><span>换行可以是空行，也可以是注释</span></p>


<p><strong>10. <span>（<code>推荐）</code></span>使用<span><code>Function</code></span>进行类的定义，<span>(<code>不推荐)</code></span>继承，如需继承采用成熟的类库实现继承</strong></p>

```
// 类的实现
 function Person(name) {
     this.name = name;
 }

 Person.prototype.sayName = function() {
     alert(this.name);
 };

 var me = new Person("Nicholas");

 // 将this放到局部变量self
 function Persion(name, sex) {
     var self = this;

     self.name = name;
     self.sex = sex;
 }

```

<p>&nbsp;平时咱们写代码，基本都是小程序，真心用不上什么继承，而且继承并不是JS的擅长的语言特性，尽量少用。如果非要使用的话，注意一点：</p>

```
function A(){
    //...
}
function B(){
    //...
}
B.prototype = new A();
B.prototype.constructor = B; //原则上，记得把这句话加上

```

<p>&nbsp;继承从原则上来讲，别改变他的构造函数，否则这个继承就显得很别扭了~&nbsp;</p>


<p><strong>11. <span>(<code>推荐)</code></span>使用局部变量<span>缓存反复查找的对象</span>(包括但不限于全局变量、dom查询结果、作用域链较深的对象)</strong></p>

```
 // 缓存对象
 var getComment = function() {
     var dom = $("#common-container"),               // 缓存dom
         appendTo = $.appendTo,                      // 缓存全局变量
         data = this.json.data;                      // 缓存作用域链较深的对象

 }

```

<p>&nbsp;&nbsp;</p>
<p><strong>12.&nbsp;当需要缓存<span><code>this</code></span>时必须使用<span><code>self</code></span>变量进行缓存</strong></p>

```
// 缓存this
 function Row(name) {
     var self = this;

     self.name = name;
     $(".row").click(function() {
         self.getName();
     });
 }

```

<p>&nbsp;self是一个保留字，不过用它也没关系。在这里，看个人爱好吧，可以用<strong><span>_this</span></strong>, <span><strong>that</strong></span>, <span><strong>me</strong></span>等这些词，都行，但是团队开发的时候统一下比较好。</p>


<p><strong>13. <span>（<code>不推荐）</code></span><span>超长函数, 当函数超过<span>100</span>行，就要想想是否能将函数拆为两个或多个函数</span></strong></p>


<p><strong>14. <span>等你来填坑~</span></strong></p>


<h3><span><strong>小结</strong></span></h3>
<p><span>　　规范是死的，罗列这些东西，目的是为了让程序猿们对这些东西引起注意，平时写代码的时候注意格式，不仅仅方便了自己，也让其他阅读者看得舒服。</span></p>
<p><span>　　</span><span>可能还有一些点没有涉及到，</span><span><strong>如果你有好的建议，请提出来，我们一起打造一个良好的前端生态环境！</strong></span></p>


<p><strong>相关阅读：</strong><a href="http://www.cnblogs.com/hustskyking/p/css-spec.html" target="_blank">前端编码规范之CSS</a></p>
