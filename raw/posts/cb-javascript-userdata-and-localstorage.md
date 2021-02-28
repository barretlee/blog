---
title: JavaScript本地储存（2）：userData和localStorage
categories:
  - JavaScript
  - 杂物间
tags:
  - tech
  - cnblogs
warning: true
date: 2013-03-28 11:25:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/03/28/javascript-userdata-and-localstorage.html" target="_blank">博客园</a>.</div>

<p>　　<a title="JavaScript本地储存（1）：cookie在前端" href="http://www.cnblogs.com/hustskyking/archive/2013/03/27/2984328.html" target="_blank">上文</a>对cookie的知识进行了归纳，同时也提到了cookie的大小是有限制的。</p>
<blockquote>
<p><span>cookie 是有大小限制的，每个 cookie 所存放的数据不能超过4kb，如果 cookie 字符串的长度超过4kb，则该属性将返回空字符串。&mdash;&mdash;<a title="JavaScript本地储存（1）：cookie在前端" href="http://www.cnblogs.com/hustskyking/archive/2013/03/27/2984328.html" target="_blank">上文</a>提要</span></p>
</blockquote>
<p>　　<span>如果我们需要在客户端储存比较大容量的数据，怎么办？下面给大家介绍userData和localStorage的基本知识和一些应用。先说明下为什么把两个东西扯到一起说，因为后面写了个对象，把UserData和localStorage包装到了一起O(&cap;_&cap;)O~</span></p>


<h3><span>Conception [基本概念]</span></h3>
<p><span>　　毫无疑问，无论是UserData还是localStorage都是储存在客户端磁盘的一段文本，但是两者也有很大的差异性。</span></p>
<p><strong>　　1.UserData</strong></p>
<p>　　单单说UserData是不太准确的，要实现本地储存得说\UserData Behavior"。</p>
<blockquote>
<p>　<span>UserData Behavior</span></p>
<span>&mdash;&mdash; Enables the object to persist data in user data.　　</span></blockquote>
<p>　　这是来自<a title="MS UserData" href="http://msdn.microsoft.com/zh-cn/vstudio/ms531424" target="_blank">微软</a>的解释。意思是允许对象在用户页面保存数据。它适用于win32和Unix的MS IE5.0版本以上平台。</p>
<table class="clsStd">
<tbody>
<tr><th>Security Zone</th><th>Document Limit (KB)</th><th>Domain Limit (KB)</th></tr>
<tr>
<td>Local Machine</td>
<td>128</td>
<td>1024</td>
</tr>
<tr>
<td>Intranet</td>
<td>512</td>
<td>10240</td>
</tr>
<tr>
<td>Trusted Sites</td>
<td>128</td>
<td>1024</td>
</tr>
<tr>
<td>Internet</td>
<td>128</td>
<td>1024</td>
</tr>
<tr>
<td>Restricted</td>
<td>64</td>
<td>640</td>
</tr>
</tbody>
</table>
<p>　　上表是UserData的大小限制，也是从微软那里拷贝过来的，大家应该知道IE浏览器有可以设置安全等级</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/03/28/28222651-d8a98f6c104a45b2a2e3bb404811f269.png" data-source="http://images.cnitblog.com/blog/387325/201303/28222651-d8a98f6c104a45b2a2e3bb404811f269.png" alt="IE安全设置"></p>
<p>　　表格里的几个英文单词就对应着看吧，~\(≧▽≦)/~</p>
<p><strong>　　2.localStorage</strong></p>
<blockquote>
<p><span>Web storage is being standardized by the World Wide Web Consortium (W3C). It was originally part of the HTML 5 specification, but is now in a separate specification. It is supported by Internet Explorer 8, Mozilla-based browsers ,Safari 4, Google Chrome 4, and Opera 10.50. As of 14 March 2011 Opera and IE9 supports the storage events.</span></p>
</blockquote>
<p>　　上面一串*<%￥...是来自<a title="wiki localStorage" href="http://en.wikipedia.org/wiki/Web_storage" target="_blank">wiki</a>的说明，跟localStorage一起的还有sessionStorage，这里就只说说localStorage。上文大意（英语水平低就是可怜）：网页储存被W3C标准化，原来本属于HTML5标准的一部分，现在已经被独立出来了。它适用于IE 8+，FF 2+，Safari 4+，chrome 4+， Opera 10.50+。</p>
<p>　　<strong>P.S.：</strong>sessionStorage用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此sessionStorage不是一种持久化的本地存储，仅仅是会话级别的存储。</p>
<p><span>　　</span>标准建议对于每个domain，localStorage大小为<strong>5M</strong>，达到限制时浏览器可以去问用户是否允许增加存储空间。</p>
<p>　 &nbsp; 这是<a title="test" href="http://hi.baidu.com/erik168/item/85490cce5ccb7ad9ee183bdf" target="_blank">网友</a>的对\浏览器具体能保存多少个字符"的一个测试。</p>
<blockquote>
<p><strong>测试结果：</strong></p>
<p>　对英文字符和中文字符来说，测试结果并无变化，所以存储格式可能为UTF16。</p>
<p>　以下为测试数据(key有5个字符):</p>
<p>　　　　IE 9&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &gt;&nbsp;4999995 + 5 = 5000000</p>
<p>　　　　firefox&nbsp;8.0.2&nbsp;&gt;&nbsp;5242875 + 5 = 5242880</p>
<p>　　　　chrome &nbsp;16.0 &nbsp;&gt;&nbsp;2621435 + 5 = 2621440</p>
<p>　　　　safari &nbsp;5.1 &nbsp;&nbsp;&gt;&nbsp;2621435&nbsp;+ 5 = 2621440</p>
<p>　　　　opera &nbsp; 11.60&nbsp;&gt;&nbsp;1966068&nbsp;+ 5 = 1966073</p>
<p>&nbsp;</p>
</blockquote>


<h3>&nbsp;Grammar [语法介绍]</h3>
<p><strong>　　1.userData</strong></p>

```
XML       <prefix: customtag="" id="sID">
HTML     　<element id="sID">
Scripting  object .style.behavior = "url('#default#userData')"
object .addBehavior ("#default#userData")

```
</element></prefix:>
<p>　　上面介绍了几种语言中userData的用法，当然这也是从<a title="MSDN UserData" href="http://msdn.microsoft.com/zh-cn/vstudio/ms531424" target="_blank">MSDN</a>拿过来的（呵呵，真心好用）。那这里我们重点放在前端常用的位置上，也就是标红了的HTML中。</p>
<p>　　　　1）<span><strong>属性:</strong></span></p>
<p><span>　　　　　　expires &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;设置或者获取 userData behavior 保存数据的失效日期。</span></p>
<p><span>　　　　　　XMLDocument &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;获取 XML 的引用。</span></p>
<p><span>　　　　2）<strong>方法:</strong></span></p>
<p><span>　　　　　　getAttribute() &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;获取指定的属性值。</span></p>
<p><span>　　　　　　load(object) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;从 userData &nbsp;存储区载入存储的对象数据。</span></p>
<p><span>　　　　　　removeAttribute() &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;移除对象的指定属性。</span></p>
<p><span>　　　　　　save(object) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 将对象数据存储到一个 userData 存储区。</span></p>
<p><span>　　　　　　setAttribute() &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 设置指定的属性值。</span></p>
<p><span>　　具体如何实现，请转到最下面封装的一个对象中~</span></p>
<p><strong>　　2.localStorage</strong></p>
<p>　　　　1）<strong>方法：</strong></p>
<p>　　　　　　localStorage.getItem(key) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;获取指定key本地存储的值</p>
<p>　　　　　　localStorage.setItem(key,value) &nbsp;将value存储到key字段</p>
<p>　　　　　　localStorage.removeItem(key) &nbsp; &nbsp;删除指定key本地存储的值</p>


<h3>Pacaking [对象封装]</h3>

```Object of userDate&&localStorage

localData = {
         hname:location.hostname?location.hostname:'localStatus',
         isLocalStorage:window.localStorage?true:false,
         dataDom:null,

         initDom:function(){ //初始化userData
             if(!this.dataDom){
                 try{
                     this.dataDom = document.createElement('input');//这里使用hidden的input元素
                     this.dataDom.type = 'hidden';
                     this.dataDom.style.display = "none";
                     this.dataDom.addBehavior('#default#userData');//这是userData的语法
                     document.body.appendChild(this.dataDom);
                     var exDate = new Date();
                     exDate = exDate.getDate()+30;
                     this.dataDom.expires = exDate.toUTCString();//设定过期时间
                 }catch(ex){
                     return false;
                 }
             }
             return true;
         },
         set:function(key,value){
             if(this.isLocalStorage){
                 window.localStorage.setItem(key,value);
             }else{
                 if(this.initDom()){
                     this.dataDom.load(this.hname);
                     this.dataDom.setAttribute(key,value);
                     this.dataDom.save(this.hname)
                 }
             }
         },
         get:function(key){
             if(this.isLocalStorage){
                 return window.localStorage.getItem(key);
             }else{
                 if(this.initDom()){
                     this.dataDom.load(this.hname);
                     return this.dataDom.getAttribute(key);
                 }
             }
         },
         remove:function(key){
             if(this.isLocalStorage){
                 localStorage.removeItem(key);
             }else{
                 if(this.initDom()){
                     this.dataDom.load(this.hname);
                     this.dataDom.removeAttribute(key);
                     this.dataDom.save(this.hname)
                 }
             }
         }
     }


```



<h3>Usage [使用说明]</h3>
<p>　　<strong>1.初始化</strong></p>

```
localData.initDom();

```

<p>　　<strong>2.设置 key/value</strong></p>

```
localData.set(key, value);

```

<p>　　<strong>3.获取 value</strong></p>

```
localData.get(key);

```

<p>　　<strong>4.删除</strong></p>

```
localData.remove(key);

```



<h3>Attention [注意事项]</h3>
<p>　　1.localStorage用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。</p>
<p>　　2.出于安全原因，只有在同一个目录和相同的协议下才能进行持久化存储。数据是未加密的，建议你不要保存过于隐私的信息。</p>
<p>下文将对<a title="web离线" href="http://www.cnblogs.com/hustskyking/archive/2013/03/30/javascript-applicationcache.html" target="_blank">web离线</a>作具体介绍。</p>


<h3>Related blog [相关博文]</h3>
<p>　　<a class="titlelink" href="http://www.cnblogs.com/hustskyking/archive/2013/03/27/javascript-cookie.html">JavaScript本地储存（1）：cookie在前端</a><span>&nbsp;</span></p>
<p>　　<a class="titlelink" href="http://www.cnblogs.com/hustskyking/archive/2013/03/30/javascript-applicationcache.html">Javascript本地储存（3）：离线web应用</a></p>


<h3>Reference [参考资料]</h3>
<p>　　1.<a title="wiki localStorage" href="http://en.wikipedia.org/wiki/Web_storage" target="_blank">wiki</a></p>
<p>　　2.<a title="MSDN UserData" href="http://msdn.microsoft.com/zh-cn/vstudio/ms531424" target="_blank">MSDN</a></p>
<p>　　3.<a title="beiYuu博客" href="http://www.cnblogs.com/beiyuu/archive/2011/07/20/js-localstorage-userdata.html" target="_blank">BeiYuu博客</a></p>
<p>　　4.<a title="test" href="http://hi.baidu.com/erik168/item/85490cce5ccb7ad9ee183bdf" target="_blank">网友</a></p>