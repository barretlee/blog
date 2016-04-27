---
title: JavaScript跨域（2）：JSONP跨域
categories:
  - JavaScript
  - 杂物间
tags:
  - tech
  - cnblogs
  - 跨域
warning: true
date: 2013-04-03 10:02:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/04/03/CDS_jsonp.html" target="_blank">博客园</a>.</div>

<p>　　祭祖归来，继续细说跨域~</p>
<p>　　话说<a title="什么是跨域" href="http://www.cnblogs.com/hustskyking/archive/2013/03/31/CDS-introduce.html" target="_blank">上次</a>我们讲到了啥玩意儿是跨域，至于怎么跨域还没开始动笔。今天就说说JSONP跨域。</p>
<p>　　JSONP（JSON with padding）是<a class="titlelink" href="http://www.cnblogs.com/hustskyking/articles/2986357.html">JSON</a>的一种\使用模式"，它是非官方协议<span>允许在服务器端集成Script tags返回至客户端，通过javascript callback的形式实现跨域访问（这仅仅是JSONP简单的实现形式）。</span></p>
<p>　　P.S：</p>
<p>　　　　1.楼主懂一点点php，所以DEMO中的后台语言就用PHP来演示。</p>
<p>　　　　2.为了方便测试，楼主弄了SAE和BAE。</p>


<h3>Prelude [前奏]</h3>
<p>　　如果我们请求一个JSON数据：（SAE地址：<span>http://qianduannotes.sinaapp.com/test/testData_1.json</span>）</p>

```
//一个简单的json数据
{
    "name" : "Barret Lee",
    "sex"    : "男",
    "hobby": "女"
}

```

<p>　　报个什么错，大家应该知道了吧~&nbsp;</p>
<blockquote>
<p><span>Origin<span><strong>&nbsp;null&nbsp;</strong></span>is not allowed by Access-Control-Allow-Origin</span></p>
</blockquote>
<p>　　先解释下这个null是个什么东东。很多人在测试的时候是在没有诸如apache、IIS环境下运行的程序，也就是在本地运行，此时origin就是null，所有<span>Access-Control-Allow-Origin这个东西不允许源null请求数据。当然如果你测试的时候在apache下运行，那这里的null就会变成你的IP了~</span></p>


<h3><span>Then [接着]</span></h3>
<p><span>　　JSONP，我们开始入题吧~&nbsp;</span></p>
<p><span>　　先说说后台返回个什么东西：（SAE地址：<span>http://qianduannotes.sinaapp.com/test/CDS_jsonp.json</span>）</span></p>

```
<?php
    $fun = $_GET["woo"];  //先假设woo对应的是 trigger ；
    $ctt = "Barret Lee";
    echo $fun . "(" . $ctt . ")";
?>

```

<p>　　后台数据解析之后就是这样的：</p>

```
trigger(木子Vs立青)

```

<p>　　有人就要开始惊叹了，肿么是 木子Vs立青&nbsp;，没有引号包住？？是的，没有引号，当$ctt是一个json数据的时候，我们得到的结果就是：</p>

```
trigger(JSON)

```

<p>　　然后用一些熟知的方法来解析这些JSON（下次会讲解如何解析JSON）。</p>
<p>　　说了半天还是没讲客户端的操作，O(&cap;_&cap;)O~ &nbsp;不急不急。</p>

```
<script type="text/javascript" src="http://qianduannotes.sinaapp.com/test/CDS_jsonp.php?woo=trigger"></script><script type="text/javascript">    function trigger(obj){　　　　//注：这里只是随便写的一个函数，obj是为解析的。　　　　//obj = parse(obj);　　　　document.getElementById("container").innerHTML = obj;　　}</script>

```

<p>　　习惯上jsonp请求时，会使用jsonp为参数，即<span>jsonp=trigger</span>，我觉得都无所谓啦，只要你用的爽就行。</p>
<p>　　如果你想传更多参数，那也是一样的：</p>

```
<script type="text/javascript" src="http://qianduannotes.sinaapp.com/test/CDS_jsonp.php?woo=trigger<a=va<b=vb<c=vc"></script>

```



<h3>Attention [注意事项]</h3>
<p>　　1.第一也是最重要的：JSONP不提供错误处理。如果动态插入的代码正常运行，你可以得到返回，但是如果失败了，那么什么都不会发生。你无法获得一个404的错误，也不能取消这个请求。</p>
<p>　　2.另外一个重要的缺点是如果使用了不信任的服务会造成很大的安全隐患。</p>


<h3>Reference [参考资料]</h3>
<p>　　1.<a title="wiki jsonp" href="http://zh.wikipedia.org/zh-cn/JSONP" target="_blank">wiki</a></p>
<p>　　2.<a title="百度百科 jsonp" href="http://baike.baidu.com/view/2131174.htm" target="_blank">百度百科</a></p>
<p>　　3.<a title="jsonp" href="http://developer.51cto.com/art/201105/264791.htm" target="_blank">51CTO</a></p>