---
title: 玩转正则之highlight高亮
categories:
  - JavaScript
  - 前端杂烩
tags:
  - tech
  - cnblogs
  - 正则
warning: true
date: 2013-10-07 05:16:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/10/07/javascript-regexp.html" target="_blank">博客园</a>.</div>

<p>　　程序员在编写代码的时候少不了和字符串以及\查询"打交道，两者的交集中有一个叫做正则表达式的的东西，这家伙用好了可以提高编程效率，用不好的话...你可以先去好好学一学。</p>
<p>　　关于正则的使用，举个简单的例子：</p>

```
var m = location.href.match(/(\w+:)\/{0,3}([^\/]+)(?:(\/[^\?#]*))?(?:(\?[^#]+|.+))?(?:(#.*))?/);
var res = {
    protocol: m[1],
    host: m[2],
    path: m[3],
    search: m[4],
    hash: m[5]
};
console.log(res);

```

<p>　　憋了几分钟= =||，我也觉得这个正则不是特别好理解（红黑相间了，应该稍微清晰点），有些朋友可能不知道（?:content）是什么意思，还有类似（?!content）和(?=content)分组和前瞻的知识，建议去问问<a title="javascript 正则" href="http://www.baidu.com/s?wd=javascript+%E6%AD%A3%E5%88%99" target="_blank">度哥</a>和<a title="javascript 正则" href="//www.google.com.hk/search?q=javascript+%E6%AD%A3%E5%88%99" target="_blank">谷娘</a>。</p>


<h3><strong>一. 正则应用<strong>小</strong>DEMO示例</strong></h3>
<p>下面是一串随手写的代码，放在textarea中：</p>
<p><textarea id="barret-codes" readonly="readonly">/**
* @author barret lee
* @date   2013-10-06
* @email  barret.china@gmail.com
*/

//outer var
var a = "this id outer string";

//closure
function b() {
  //inner var
  var a = "this is inner string";
  var g = a.replace(/this is inner string/g, function() {
    return new Function("/*clousure*/this.a")();
  });

  /**
  * @description closure - regExp test
  * @author barret lee
  */
  function c() {
    return {
      a: a,
      g: g
    }
  }

  return c;
}

var s = b()(); //s.a, s.g
</textarea></p>


<p>正则匹配，处理上面那堆字符串的小DEMO：</p>
<div>
<div id="barret-container">&nbsp;</div>
<div id="barret-note"><a onclick="showBtn.autorun();return false;" href="javascript:void(0);">点击开始演示</a></div>
</div>




<p><strong>博客园引入个js文件还真罗嗦，有时候会报XSS（跨站脚本攻击）相关的错误，（如果木有正常显示，刷新下试试）。</strong></p>
<p><strong>如果还是没有，可以看另外一个demo：<a href="http://qianduannotes.sinaapp.com/highlight/" target="_blank">SAE/highlight</a></strong></p>
<p>跟着提示，下一步下一步多点几下，可以看出效果还是可以滴。主要是这里的正则略微的麻烦，处理一个色变得琢磨老半天。</p>
<p><em>P.S：上面这玩意儿只是一个小测试，代码相当不健壮，拿着学习正则练手～</em></p>


<h3><strong>二. 需要注意的地方</strong></h3>

```
//step config
var config = {
    regs: [
        /^\s+|\s+$/g,
        /(["'])(?:\\.|[^\\\n])*?\1/g,
        /\/(?!\*|span).+\/(?!span)[gim]*/g,
        /(\/\/.*|\/\*[\S\s]+?\*\/)/g,
        /(\*\s*)(@\w+)(?=\s*)/g,
        /\b...\b/g
    ],　　//...};

```

<p>这些正则我是分开来写的，主要是为了做上面那个demo，方便单步显示。但是把这些正则分开写是相当不合理的，放在textarea中的是一串没有任何标签的字符串，为了着色，每处理一个正则都会在codes中插入一些标签（我这里用的是span），当我们处理下一个正则的时候就必须得考虑上一步加入的标签，这样会很大程度提高开发难度，最好的做法是把这些正则都放到一坨，然后用|隔开：</p>

```
var reg = (/^\s+|\s+$/)|(/(["'])(?:\\.|[^\\\n])*?\1/)|(/\/(?!\*|span).+\/(?!span)[gim]*/)|(/(\/\/.*|\/\*[\S\s]+?\*\/)/)|(/(\*\s*)(@\w+)(?=\s*)/)|(/\b(break|continue|do|for|in|function|if|else|return|switch|throw|try|catch|finally|var|while|with|case|new|typeof|instance|delete|void|Object|Array|String|Number|Boolean|Function|RegExp|Date|Math|window|document|navigator|location|true|false|null|undefined|NaN)\b)

```

<p>这样放的好处是可以直接</p>

```
codes.replace(reg, function(){
    var args = arguments;
    //...
});

```

<p>一次性处理，不用担心插入标签影响最后的结果，因为标签是同一时间插入的，不会有干扰。</p>
<p>代码高亮插件highlight的基本原理也差不多，只不过他的容错机制和代码健壮性这块做的更加完善，我在代码里头加了一个配置文件，</p>

```
var colors = {
    string: "#FFA0A0",
    reg: "#16E916",
    note: "#888",
    tag: "orange",
    keywords: "#B0B0FF"
};

```

<p>按照自己的喜好，也可以加以修改，类似这样的扩展，我们在写代码的时候稍微注意下，多留几个接口就好了。（不过这些活儿干起来都还挺辛苦的～）</p>
<p>没有做成插件，也没这个必要，知道基本原理然后动手实践下就差不多了。</p>


<h3><strong>三. 小结</strong></h3>
<p>类似很多的前端模板，<a href="//github.com/aui/artTemplate/blob/master/template.js" target="_blank">artTemplate</a>，<a href="//github.com/wangxiao/BaiduTemplate/blob/master/baiduTemplate.js" target="_blank">baiduTemplate</a>等都是对正则表达式的绝伦应用，很值得去看看源码，好好钻研人家都考虑了那些容易出错的点，源码都不长，两三百行。了解一个大概比较容易，但是当自己动手的时候总会发现很多细节问题处理不好，我那上面几个正则就倒弄了半天= =</p>
<p>另外一个配色方案，随便弄的，戳这里<a href="http://qianduannotes.sinaapp.com/highlight/" target="_blank">SAE/highlight</a>。</p>
<p>正则表达式，用起来还是挺方便的。正则技能，你值得拥有～</p>


<script type="text/javascript" src="http://files.cnblogs.com/hustskyking/reg-demo.js?v=1"></script>