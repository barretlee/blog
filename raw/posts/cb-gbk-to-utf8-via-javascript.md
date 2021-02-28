---
title: 利用javascript进行编码转换，GBK转UTF-8
categories:
  - JavaScript
tags:
  - tech
  - cnblogs
  - 编码转换
warning: true
date: 2013-05-30 12:58:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/05/30/gbk-to-utf8-via-javascript.html" target="_blank">博客园</a>.</div>

<p>DEMO：</p>

```
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>
<div id="a"></div>
<script>
var script=document.createElement('script');
script.src='data:text/javascript;charset=gbk,(function(){    window.b="%c4%e3%ba%c3";    document.getElementById("a").innerHTML = window.b;})()';
document.body.appendChild(script);

</script>
</body>
</html>

```

<p>群里交流，大牛们提出来的方案（薛端阳）。</p>
<p>这种方式比较奇葩，但相当便捷。 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; .</p>
<p>详情：<a href="http://www.cnblogs.com/xueduanyang/archive/2013/05/30/3108442.html" target="_blank">http://www.cnblogs.com/xueduanyang/archive/2013/05/30/3108442.html</a></p>