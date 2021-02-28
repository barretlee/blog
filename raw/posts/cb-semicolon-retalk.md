---
title: Javascript分号，加还是不加？
categories:
  - JavaScript
  - 前端杂烩
tags:
  - tech
  - cnblogs
warning: true
date: 2014-03-16 03:51:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2014/03/16/semicolon-retalk.html" target="_blank">博客园</a>.</div>

<p>关于这个问题，网上已经有很多人讨论过了，我先说说自己对这个问题的回答：加！（但非必须）</p>
<p>有些人写代码，懒得加分号，除非是迫不得已才勉强放一个分号上去。如果你可以保证你写的代码不出现任何 bug，那当然是没有问题，但是很多 JSer 新人，对一些隐含的问题并不是特别清楚，很容易在不知不觉中写出一堆 bug，我们先来了解下 JS 词法语法解析的时候，哪些情况下会自动插入分号。</p>
<h3>一、自动插入分号的规则</h3>
<p><span><strong>注：鼠标滑过文字可以看到翻译原文</strong></span></p>
<p>1. <span class="translator" title="When, as the program is parsed from left to right, a token (called the offending token) is encountered that is not allowed by any production of the grammar, then a semicolon is automatically inserted before the offending token if one or more of the following conditions is true:">程序从左到右解析，当纳入下一个 token 无法匹配任何语法：</span></p>
<ul>
<li><span class="translator" title="The offending token is separated from the previous token by at least one LineTerminator.">如该 token 跟之前的 token 之间有至少一个 LineTerminal 行终结符违反分割</span></li>
<li><span class="translator" title="The offending token is }.">该 token 为 `}` 符号时</span></li>
</ul>
<p>2. <span class="translator" title="When, as the program is parsed from left to right, the end of the input stream of tokens is encountered and the parser is unable to parse the input token stream as a single complete ECMAScript Program, then a semicolon is automatically inserted at the end of the input stream.">程序从左到右解析，当纳入下一个（或几个） token 不能产生一条合法的语句的时候，会在这个地方插入一个分号。</span></p>

<p>
3. <span class="translator" title="When, as the program is parsed from left to right, a token is encountered that is allowed by some production of the grammar, but the production is a restricted production and the token would be the first token for a terminal or nonterminal immediately following the annotation \[no LineTerminator here]" within the restricted production (and therefore such a token is called a restricted token), and the restricted token is separated from the previous token by at least one LineTerminator, then a semicolon is automatically inserted before the restricted token.">程序从左到右解析，当纳入的 token 能够产生一条合法语句，但是这条语句是受限产生式时，在该受限 token 前面自动插入分号。</span>
</p>
<p>上面提到的一些内容来自 ECMAScript5.1 第七章第九节，可以戳<a href="http://barretlee.com/ST/ES5.1/#sec-7.9.1" target="_blank">这里</a>，翻译的不太通顺，实在是太难翻译了= =</p>
<h3>二、一些不加分号会出问题的场景</h3>
<p><strong>场景一：</strong></p>

```
s = a + b
(x + y).doSomething()

```

<p>我们期望这是这是两条语句，结果会被解析成：</p>

```
s = a + b(x + y).doSomething();

```

<p>b 在这里成了一个函数了。</p>
<p><strong>场景二：</strong></p>

```
x
++
y

```

<p>这个 ++ 符号会给谁？答案是：</p>

```
x; ++y;

```

<p>这样的代码当然是很少遇到，但是遇到这种情况：</p>
<p><strong>场景三：</strong></p>

```
return
true

```

<p>我们期望返回 true，结果：</p>

```
return;
true;

```

<p>给我们返回了 undefined。</p>
<p><strong>场景四：</strong></p>

```
s = function(x){return x}
(1 + 2).toString()

```

<p>他被解析成了</p>

```
s = function(x){return x}(1 + 2).toString()

```

<p><code>function(x){return x}(1 + 2)</code> 这个作为一个整体，1+2 作为参数送入函数，该函数的返回值为 3，然后执行 3.toString()，这样的问题藏的比较深，不容易被发现。</p>
<h3>三、规避问题</h3>
<p>有些语句是以 <code>[</code> 或者 <code>(</code> 开头，就像上面提到的场景一和场景四，这些 token 很容易和上一条没有加分号的语句合并到一起，如果你不太喜欢加分号，可以这样来处理：</p>

```
s = function(x){return x}
;(1 + 2).toString()

```

<p>这也是为什么我们会经常看到别人的代码中写出这样的函数：</p>

```
;(function(){
    // ...
})();

```

<p>在 function 的前面加了一个分号，目的就是为了防止整个函数的返回值作为参数送入上一条语句之中。</p>
<p>对于场景三，要特别说明一下，除了 return 之外，还有 break 和 continue 语句，break 和 continue 类似 C 语言中的 goto ，他是可以在后面添加 tag 的，如果 tag 和 这些关键词之间存在 <a href="http://barretlee.com/ST/ES5.1/#sec-7.3" target="_blank">LineTerminal </a>，这些 tag 就会被忽略，如：</p>

```
break
tag

```

<p>我们期望程序会调到 tag 所指向的程序段，但结果被解析成</p>

```
break;
tag;

```

<h3>四、小结</h3>
<p>看到上面的一些列问题，相信大家心里还是有自己的答案了，如果你有信心代码里头不出现因为不写分号而导致的错误，那分号的取舍其实是无所谓的。</p>

