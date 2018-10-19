---
title: IE6的一个小bug
categories:
  - JavaScript
  - 剪贴板
tags:
  - tech
  - cnblogs
  - 兼容性
warning: true
date: 2013-08-09 03:53:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/08/09/css-bug-in-IE6.html" target="_blank">博客园</a>.</div>


```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "//www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="//www.w3.org/1999/xhtml">
<head>
    <title></title>
    <style type="text/css">
    <!--
    p{font-size:12px;}
    p:first-letter{font-size:300%}
    -->
    </style>
</head> 
<body>
    <p>对于世界而言，你是一个人；但是对于某个人，你是他的整个世界。纵然伤心，也不要愁眉不展，因为你不知是谁会爱上你的笑容。</p>
</body>
</html>

```

<p><span>这段代码对&lt;p&gt;的首字符样式定义在IE6上看是没有效果的,而在p:first-letter和{font-size:300%}加上空格，也就是p:first-letter {font-size:300%}后，显示就正常了。&nbsp;</span><span>这个问题主要是出现在IE6浏览器中，而且这位朋友也说明了一些必要的触发条件：&nbsp;</span><span>1、IE6浏览器&nbsp;</span><span>2、选择符是带有伪类的&nbsp;</span><span>3、伪类中必须是有连接符\-"的，例如:first-letter&nbsp;</span><span>4、是否有空格的存在</span></p>


<p><span>本文转自：<a href="http://www.jb51.net/web/20615.html">http://www.jb51.net/web/20615.html</a></span></p>