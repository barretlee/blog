---
title: JSON
categories:
  - JavaScript
  - 杂物间
tags:
  - tech
  - cnblogs
warning: true
date: 2013-03-28 11:27:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/03/28/2986357.html" target="_blank">博客园</a>.</div>

<p><strong>JSON</strong>(JavaScript Object Notation) 是一种轻量级的数据交换格式。 易于人阅读和编写。同时也易于机器解析和生成。 它基于<a href="http://www.crockford.com/javascript">JavaScript Programming Language</a>,&nbsp;<a href="http://www.ecma-international.org/publications/files/ecma-st/ECMA-262.pdf">Standard ECMA-262 3rd Edition - December 1999</a>的一个子集。 JSON采用完全独立于语言的文本格式，但是也使用了类似于C语言家族的习惯（包括C, C++, C#, Java, JavaScript, Perl, Python等）。 这些特性使JSON成为理想的数据交换语言。</p>
<p>JSON建构于两种结构：</p>
<ul>
<li>\名称/值"对的集合（A collection of name/value pairs）。不同的语言中，它被理解为<em>对象（object）</em>，纪录（record），结构（struct），字典（dictionary），哈希表（hash table），有键列表（keyed list），或者关联数组 （associative array）。</li>
<li>值的有序列表（An ordered list of values）。在大部分语言中，它被理解为数组（array）。</li>
</ul>
<p>这些都是常见的数据结构。事实上大部分现代计算机语言都以某种形式支持它们。这使得一种数据格式在同样基于这些结构的编程语言之间交换成为可能。</p>
<p>JSON具有以下这些形式：</p>
<p>对象是一个无序的\"名称/值"对"集合。一个对象以\{"（左括号）开始，\}"（右括号）结束。每个\名称"后跟一个\:"（冒号）；\"名称/值" 对"之间使用\,"（逗号）分隔。</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/03/28/object.gif" data-source="http://json.org/object.gif" alt="" width="598" height="113"></p>
<p>数组是值（value）的有序集合。一个数组以\["（左中括号）开始，\]"（右中括号）结束。值之间使用\,"（逗号）分隔。</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/03/28/array.gif" data-source="http://json.org/array.gif" alt="" width="598" height="113"></p>
<p>值（<em>value</em>）可以是双引号括起来的字符串（<em>string</em>）、数值(number)、<code>true</code>、<code>false</code>、&nbsp;<code>null</code>、对象（object）或者数组（array）。这些结构可以嵌套。</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/03/28/value.gif" data-source="http://json.org/value.gif" alt="" width="598" height="278"></p>
<p>字符串（<em>string</em>）是由双引号包围的任意数量Unicode字符的集合，使用反斜线转义。一个字符（character）即一个单独的字符串（character string）。</p>
<p>字符串（<em>string</em>）与C或者Java的字符串非常相似。</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/03/28/string.gif" data-source="http://json.org/string.gif" alt="" width="598" height="413"></p>
<p>数值（<em>number</em>）也与C或者Java的数值非常相似。除去未曾使用的八进制与十六进制格式。除去一些编码细节。</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/03/28/number.gif" data-source="http://json.org/number.gif" alt="" width="598" height="266"></p>
<p>空白可以加入到任何符号之间。 以下描述了完整的语言。</p>
<p><strong>原文链接：http://json.org/json-zh.html</strong></p>