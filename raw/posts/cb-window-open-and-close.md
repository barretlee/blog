---
title: 打开窗口，关闭窗口
categories:
  - JavaScript
tags:
  - tech
  - cnblogs
warning: true
date: 2013-04-10 04:06:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/04/10/window-open-and-close.html" target="_blank">博客园</a>.</div>

<p><strong>关键词</strong><span>：window.open() window.close() showModalDialog() 兼容性 测试等。</span></p>
<p>　　　　本文默认你对以上函数参数有基本了解。</p>
<h3>window.open</h3>
<p>　　window.open如果没有加第三个参数，则浏览器一般都会在新的标签页打开（除非你设置了新建窗口打开）</p>
<p>　　而有的时候，我们需要他弹出来。就想这个一样：</p>
<p>　　<img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/04/10/10152902-23e3b118ba574a799ec021740f524b44.png" data-source="http://images.cnitblog.com/blog/387325/201304/10152902-23e3b118ba574a799ec021740f524b44.png" alt="" width="369" height="416"></p>
<p>　　上述方式是：</p>

```
window.open(/*URL*/"",/*Name*/"",/*args*/"width=300,height=400");

```

<p>　　但是搜狗是不会挺你的话的，他不会新建一个你设定的窗口打开，而是在一个新的标签页打开。</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/04/10/10153253-8b065b78f11e4696a8e1bac972f17892.png" data-source="http://images.cnitblog.com/blog/387325/201304/10153253-8b065b78f11e4696a8e1bac972f17892.png" alt=""></p>
<p>　　这个，你就认了吧！如果不服气，你可以用下面的函数来解决。</p>


<h3>showModalDialog</h3>
<p>　　试了下，chrome、FF、IE下都能跳出一个模态框口出来。</p>

```
window.showModalDialog("","","dialogHeight=200,dialogWidth=300");

```

<p>　　<em>注意:这里的第三个参数有一些不同，加了个前缀dialog。</em></p>
<p>　　不过搜狗又有点变态了，</p>
<p>　　1.&nbsp;如果你的第一个参数不写，即为空时，弹不出来。</p>
<p>　　2. 如果第一个参数的URL地址和window.location不是同一个域内（<a title="同域 跨域" href="http://www.cnblogs.com/hustskyking/archive/2013/03/31/CDS-introduce.html" target="_blank">什么是同域</a>），则会这样：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/04/10/10154058-49b2fbb3642249068a966f24e85ec794.png" data-source="http://images.cnitblog.com/blog/387325/201304/10154058-49b2fbb3642249068a966f24e85ec794.png" alt=""></p>
<p>　　会弹出一个存在安全隐患的提示，这个也是个烦人的东西，修改IE的安全项应该可以解决问题。这里不多说。</p>


<h3>window.close</h3>
<p>　　这个不用说，大家问题遇到最多的就是这个东西的bug。</p>

```
window.close()

```

<p>　　如果单单是这一句话，IE（搜狗等）会弹出这么一个提示：</p>
<p>　　<img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/04/10/10154422-fc71b242e25a4b8c8c750d3abf6094fb.png" data-source="http://images.cnitblog.com/blog/387325/201304/10154422-fc71b242e25a4b8c8c750d3abf6094fb.png" alt=""></p>
<p>　　FF和chrome无反应。如果加点东西：</p>

```
//第一步，如果该窗口是被他爸爸打开的，先断绝父子关系
window.opener = null;
//window.close()只允许关系自己打开的窗口
//用一个空页面替换掉现在的页面
var a = window.open("", "_self");
//然后关闭自己打开的页面
a.close();

```

<p>　　效果还行，把chrome的页面给关闭了，IE的弹出框也没了，不过可恶的FF依然没有反应！！！抓狂！！！！</p>


<h3>干掉FireFox</h3>
<p>　　我们退而求其次，既然关不掉你，我就把你换成一个空页面算了！</p>

```
window.location.href="about:blank";

```

<p>　　之所以window.close在firefox不能使用，是因为firefox默认不能关闭用户打开的网页。知道原因有个毛用，还是没办法把他kill掉。。。</p>


<p>　　有人说：</p>
<blockquote>
<p>我们可以这样设置firefox：　　打开firefox,在地址栏输入about:config　　找到dom.allow_scripts_to_close_windows这项并改为true。</p>

</blockquote>
<p>　　这样就可以解决Firefox的问题了，但是，难道你打算让用户这么去干?</p>


<p>不过还是恳请大神们找一个完美解决window.close的方案，坐等！！！</p>
<p><strong>提供测试代码，省得你再打一次~</strong></p>

```
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <title>测试</title>
    <script type="text/javascript">
    //<![[
        function a(){
            //window.opener = null
            var b = window.open("","asdfs","width=300,height=400");
            //window.showModalDialog("http://www.baidu.com","","dialogHeight=200,dialogWidth=300");
            b.location.href = "./jQueryDemo.html";
            //alert(a.name)
            b.opener.getElmentById("i").focus();
            //window.close();
            //第一步，如果该窗口是被他爸爸打开的，先断绝父子关系
            //window.opener = null; 
            //window.close()只允许关系自己打开的窗口
            //用一个空页面替换掉现在的页面
            //var a = window.open("", "_self");
            //然后关闭自己打开的页面
            //a.close();
        }
    //]]>
    </script>
</head>

<body>
    <ul onclick="a()">
        <li>11111</li>
        <li>22222</li>
        <li>33333</li>
        <li>44444</li>
    </ul>
    <input type="text" id="i">
</body>
</html>

```


