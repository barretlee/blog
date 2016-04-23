---
title: JavaScript本地储存（1）：cookie在前端
categories:
  - JavaScript
  - 杂物间
tags:
  - tech
  - cnblogs
warning: true
date: 2013-03-27 12:13:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/03/27/javascript-cookie.html" target="_blank">博客园</a>.</div>

<style><!--
.tbArg{}
  .tbArg td { padding:2px;}
.tbArg tr:nth-child(2n) { background:#eee}
.tbArg tr:first { font-size:16px;}
--></style>
<p>　　以前心里总是默念着这句：\知道资源在哪儿就是成功的一半"。对于很多知识的学习，好像也一直停留在知道它在哪儿的地步，看来现在需要有所改变了！</p>
<p>　　<strong>那就从cookie开始吧~</strong></p>
<blockquote>
<p>　　<strong>Cookie</strong><span>（复数形态Cookies），中文名称为</span><strong>小型文本文件</strong><span>或</span><strong>小甜饼</strong><sup id="cite_ref-1" class="reference"></sup><span>，指某些</span>网站<span>为了辨别用户身份、<span>进行session跟踪</span>而储存在用户本地终端（Client Side）上的数据（通常经过</span>加密<span>）。定义于RFC2109（已废弃），最新取代的规范是<a title="rfc2965.txt" href="http://www.ietf.org/rfc/rfc2965.txt" target="_blank">RFC2965</a>。</span></p>
</blockquote>
<h3>Clasification [分类]</h3>
<p>　　说到底，cookie就是保存在客户端的一段<strong>字符串</strong>（注意：不是数组）。</p>
<p>　　cookie可以手动设置，也可以由服务器产生，当客户端（浏览器）向服务器发送请求，服务器会反馈一些信息给客户端，这些信息的key/value值被浏览器作为文件保存在客户端特定的文件夹中。</p>
<p>　　<strong>1.内存Cookie</strong></p>
<p>　　　　<span>内存Cookie由</span>浏览器<span>维护，保存在</span>内存<span>中，浏览器关闭后就消失了，其存在时间是短暂的。</span></p>
<p><span>　　<strong>2.磁盘Cookie</strong></span></p>
<p>&nbsp;　　　&nbsp;<span>硬盘Cookie保存在</span>硬盘<span>里，有一个过期时间，除非用户手工清理或到了过期时间，硬盘Cookie不会被删除，其存在时间是长期的。</span></p>


<h3>Arguments [参数]</h3>
<table class="tbarg" border="1" cellspacing="5" cellpadding="5"><caption>&nbsp;</caption>
<tbody>
<tr>
<td width="120"><span><strong>属&nbsp; 性&nbsp; 名</strong></span></td>
<td><span><strong>描&nbsp;&nbsp;&nbsp; 述</strong></span></td>
</tr>
<tr>
<td><span>String name</span></td>
<td><span>该Cookie的名称。Cookie一旦创建，名称便不可更改</span></td>
</tr>
<tr>
<td><span>Object value</span></td>
<td><span>该Cookie的值。如果值为Unicode字符，需要为字符编码。如果值为二进制数据，则需要使用BASE64编码</span></td>
</tr>
<tr>
<td><span>int maxAge</span></td>
<td><span>该Cookie失效的时间，单位秒。如果为正数，则该Cookie在maxAge秒之后失效。如果为负数，该Cookie为临时Cookie，关闭浏览器即失效，浏览器也不会以任何形式保存该Cookie。如果为0，表示删除该Cookie。默认为–1</span></td>
</tr>
<tr>
<td><span>boolean secure</span></td>
<td><span>该Cookie是否仅被使用安全协议传输。安全协议。安全协议有HTTPS，SSL等，在网络上传输数据之前先将数据加密。默认为false</span></td>
</tr>
<tr>
<td><span>String path</span></td>
<td><span>该Cookie的使用路径。如果设置为\/sessionWeb/"，则只有contextPath为\/sessionWeb"的程序可以访问该Cookie。如果设置为\/"，则本域名下contextPath都可以访问该Cookie。注意最后一个字符必须为\/"</span></td>
</tr>
<tr>
<td><span>String domain</span></td>
<td><span>可以访问该Cookie的域名。如果设置为\.google.com"，则所有以\google.com"结尾的域名都可以访问该Cookie。注意第一个字符必须为\."</span></td>
</tr>
<tr>
<td><span>String comment</span></td>
<td><span>该Cookie的用处说明。浏览器显示Cookie信息的时候显示该说明</span></td>
</tr>
<tr>
<td><span>int version</span></td>
<td><span>该Cookie使用的版本号。0表示遵循Netscape的Cookie规范，1表示遵循W3C的RFC 2109规范</span></td>
</tr>
</tbody>
</table>


<h3>Detail [参数详解]</h3>
<p>　　<strong>1。key/value</strong></p>

```
1 document.cookie  = 'username=木子Vs立青'

```

<p>　　很简单吧，cookie是document的一个属性，在控制台，console.log(document.cookie)可以看到该域名下的cookie值。设置方式就是<strong>key=value</strong>.</p>
<p>　　如何已经存在了username这个key，再次如上操作就是修改value值了。</p>
<p>　　<strong>2.maxAge</strong></p>

```
1 var date = new Date();
2
3 date.setDate(date.getDate()+30);
4 date.toGMTString();
5
6 document.cookie = "name=value;expires=date"

```

<p>　　expires这个参数是用来设置cookie有效期的，如果将expires设置成一个过去的时间（相对本机系统时间），相应的cookie就被删除，当然也可以手动来删除cookie~</p>
<p>　　上面给出的例子是以天为单位计算的，如果要改成其他的计时方式，可以修改第三行date.setDate(date.getDate()+30)，为30天。比如要改成按小时计算：date.setHours(date.getHours()+30)，为30小时。</p>
<p>　　<strong>3.path</strong></p>

```
1 document.cookie = "name=value;expires=date;path=path"

```

<p>&nbsp;　　这里的path如何理解？比如在http://www.cnblogs.com/hustskyking/下创建一个cookie（即path=/hustskyking/），那么在http://www.cnblogs.com/hustskyking/下所有子目录都是可以访问这个cookie的；再比如path=/，意思就是在http://www.cnblogs.com/下的任何子目录都是访问到这个cookie的。</p>
<p>　　<strong>4.domain</strong></p>

```
1 document.cookie = "name=value;path=path;expires=date;domain=domain"

```

<p>　　这里要说的是同域访问，比如在a.example.com和b.example.com下共享c.example.com下的cookie文件，只需如此这般...</p>

```
1 document.cookie = "name=value;path=path;expires=date;domain=example.com"

```

<p>　　你应该懂了~</p>
<p>　　<strong>5.secure</strong></p>
<p>&nbsp;　　我们知道在网络中建立连接传输数据有两种常见的方式，一个钟是http，另一种是https，后者是加密传输。大家从上面也可以看出，cookie很容易被窃取，通过下面这个方式可以为cookie加一把安全锁。</p>

```
1 document.cookie = "username=木子Vs立青;secure"

```

<p>　　加了secure（默认值为空），之后，cookie提交到服务器时使用的是https传输。当然这只是加了一层防护，不等于我爱罗的绝对防御~</p>


<h3>Attention [注意事项]</h3>
<p>　　<strong>1.value值保护</strong></p>

```
1 document.cookie = name + "="+ escape (value);

```

<p>　　我们通常会用escape将value进行编码，取回的时候用unescape()函数就行了。</p>
<p>　　<strong>2.重要信息就不要放到cookie值中了~</strong></p>


<h3>Class [封装cookie方法的类]</h3>
<p><span>　　<strong>1、创建Cookie对象</strong></span></p>

```
1 //因为是作为类名或者命名空间的使用，所以和Math对象类似，这里使用Cookie来表示该对象
2 var Cookie = new Object();

```

<p><strong>　　2、实现设置Cookie的方法</strong></p>

```
 1 //name是要设置cookie的名称；value是设置cookie的值，option包括了其它选项，是一个对象作为参数
 2 Cookie.setCookie = function(name, value, option) {
 3   //用于存储赋值给document.cookie的cookie格式字符串
 4   var str = name+"="+escape(value);
 5   if(option) {
 6     //如果设置了过期时间
 7      if(option.expireDays) {
 8       var date = new date();
 9       var ms = option.expireDays*24*3600*1000;
10       date.setTime(date.getTime()+ms);
11       str += "; expires="+date.toGMTString();
12     }
13     if(option.path) str += "; path="+path;//设置访问路径
14      if(option.domain) str += "; domain="+domain;//设置访问主机
15      if(option.secure) str += "; true";//设置安全性
16   }
17   document.cookie = str;
18 }

```

<p><strong><span>　　3、实现取Cookie的方法</span></strong></p>

```
 1 //name是指定cookie的名称，从而根据名称返回相应的值
 2 Cookie.getCookie = function(name) {
 3   var cookieArray = document.cookie.split("; ");//得到分割的cookie名值对
 4   var cookie = new Object();
 5   for(var i=0; i
<p><strong><span>　　4、实现删除Cookie的方法</span></strong></p>

```
 1 //name是指定cookie的名称，从而根据这个名称删除相应的cookie。在实现中，删除cookie是通过调用setCookie来完成的，将option的expireDays属性指定为负数即可
 2 Cookie.deleteCookie = function(name) {
 3   this.setCookie(name, "", {expireDays:-1});//将过期时间设置为过去来删除一个cookie
 4 }
 5 //通过下面的代码，整个Cookie对象创建完毕后，可以将其放到一个大括号中来定义：
 6 var Cookie = {
 7    setCookie:function(){},
 8    getCookie:function(){},
 9    deleteCookie:function(){}
10 }
11
12 //通过这种形式，可以让Cookie的功能更加清晰，它作为一个全局对象，大大方便了对Cookie的操作
13 Cookie.setCookie("user", "terry");
14 Cookie.deleteCookie("user");

```



<h3>Substitution [cookie的替代品]</h3>
<p>　　<span>cookie 是有大小限制的，每个 cookie 所存放的数据不能超过4kb，如果 cookie 字符串的长度超过4kb，则该属性将返回空字符串。</span></p>
<p><span>　　如果我们需要在客户端储存比较大容量的数据，怎么办？选择cookie肯定是不明智的，下次会给大家详细说明userData和localStorage。</span></p>
<p>　　<a title="MSDN userData" href="http://msdn.microsoft.com/zh-cn/vstudio/ms531424" target="_blank">userData</a>(windows+IE平台):&nbsp;<strong>128Kb</strong></p>
<p><strong>　　</strong><a title="wiki localStorage" href="http://en.wikipedia.org/wiki/Web_storage" target="_blank">localStorage</a>(现代浏览器):&nbsp;<strong>&nbsp;5M</strong></p>


<h3><span>&nbsp;Related blog [相关博文]</span></h3>
<p><span>　　<a class="titlelink" href="http://www.cnblogs.com/hustskyking/archive/2013/03/28/javascript-userdata-and-localstorage.html">JavaScript本地储存（2）：userData和localStorage</a></span></p>
<p><span>　　<a class="titlelink" href="http://www.cnblogs.com/hustskyking/archive/2013/03/30/javascript-applicationcache.html">Javascript本地储存（3）：离线web应用</a></span></p>


<h3>Reference [参考资料]</h3>
<p>　　1.<a title="百度文库cookie" href="http://baike.baidu.com/view/835.htm" target="_blank">百度文库</a></p>
<p>　　2.<a title="wiki cookie" href="http://zh.wikipedia.org/wiki/Cookie" target="_blank">wiki</a></p>
<p>　　3.<a title="聂微东博客 js操作cookie" href="http://www.cnblogs.com/Darren_code/archive/2011/11/24/Cookie.html" target="_blank">聂微东博客</a></p>
<p><strong>　　</strong>4.<a title="alixixi" href="http://www.alixixi.com/web/a/2008050746872.shtml" target="_blank">alixixi</a></p>