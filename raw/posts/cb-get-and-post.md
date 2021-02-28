---
title: 浅谈HTTP中Get与Post的区别
categories:
  - 网络交互
  - 剪贴板
tags:
  - tech
  - cnblogs
  - http
warning: true
date: 2013-05-05 08:40:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/05/05/get-and-post.html" target="_blank">博客园</a>.</div>

<p>　Http定义了与服务器交互的不同方法，最基本的方法有4种，分别是GET，POST，PUT，DELETE。URL全称是资源描述符，我们可以这样认为：一个URL地址，它用于描述一个网络上的资源，而HTTP中的GET，POST，PUT，DELETE就对应着对这个资源的<span>查，改，增，删</span>4个操作。到这里，大家应该有个大概的了解了，GET一般用于<span>获取/查询</span>资源信息，而POST一般用于<span>更新</span>资源信息。</p>
<p>　　<span><strong>1</strong>.根据HTTP规范，GET用于信息获取，而且应该是安全的和幂等的。</span></p>
<p>　　(1).所谓安全的意味着该操作用于获取信息而非修改信息。换句话说，GET 请求一般不应产生副作用。就是说，它仅仅是获取资源信息，就像数据库查询一样，不会修改，增加数据，不会影响资源的状态。</p>
<p>　　<em>&nbsp;注意：这里安全的含义仅仅是指是非修改信息。</em></p>
<p>　　(2).幂等的意味着对同一URL的多个请求应该返回同样的结果。这里我再解释一下<span><strong>幂等</strong></span>这个概念：</p>

```　　幂等（idempotent、idempotence）是一个数学或计算机学概念，常见于抽象代数中。　　幂等有一下几种定义：　　对于单目运算，如果一个运算对于在范围内的所有的一个数多次进行该运算所得的结果和进行一次该运算所得的结果是一样的，那么我们就称该运算是幂等的。比如绝对值运算就是一个例子，在实数集中，有abs(a)=abs(abs(a))。　　对于双目运算，则要求当参与运算的两个值是等值的情况下，如果满足运算结果与参与运算的两个值相等，则称该运算幂等，如求两个数的最大值的函数，有在在实数集中幂等，即max(x,x)&nbsp;=&nbsp;x。
```

<p>看完上述解释后，应该可以理解GET幂等的含义了。</p>
<p>　　但在实际应用中，以上2条规定并没有这么严格。引用别人文章的例子：比如，新闻站点的头版不断更新。虽然第二次请求会返回不同的一批新闻，该操作仍然被认为是安全的和幂等的，因为它总是返回当前的新闻。从根本上说，如果目标是当用户打开一个链接时，他可以确信从自身的角度来看没有改变资源即可。</p>
<p>　　<span><strong>2</strong>.根据HTTP规范，POST表示可能修改变服务器上的资源的请求。</span>继续引用上面的例子：还是新闻以网站为例，读者对新闻发表自己的评论应该通过POST实现，因为在评论提交后站点的资源已经不同了，或者说资源被修改了。</p>


<p>　　上面大概说了一下HTTP规范中GET和POST的一些原理性的问题。但在实际的做的时候，很多人却没有按照HTTP规范去做，导致这个问题的原因有很多，比如说：</p>
<p>　　<span><strong>1</strong></span>.很多人贪方便，更新资源时用了GET，因为用POST必须要到FORM（表单），这样会麻烦一点。</p>
<p>　　<span><strong>2</strong></span>.对资源的增，删，改，查操作，其实都可以通过GET/POST完成，不需要用到PUT和DELETE。</p>
<p>　　<span><strong>3</strong></span>.另外一个是，早期的Web MVC框架设计者们并<span>没有有意识地将URL当作抽象的资源来看待和设计</span>，所以导致一个比较严重的问题是传统的Web MVC框架基本上都只支持GET和POST两种HTTP方法，而不支持PUT和DELETE方法。</p>
<p>&nbsp;　　<em>简单解释一下MVC：MVC本来是存在于Desktop程序中的，M是指数据模型，V是指用户界面，C则是控制器。使用MVC的目的是将M和V的实现代码分离，从而使同一个程序可以使用不同的表现形式。</em></p>
<p>　　以上3点典型地描述了老一套的风格（没有严格遵守HTTP规范），随着架构的发展，现在出现REST(Representational State Transfer)，一套支持HTTP规范的新风格，这里不多说了，可以参考《RESTful Web Services》。</p>


<p>　　说完原理性的问题，我们再从<span>表面现像上面看看GET和POST的区别</span>：</p>
<p>　　<span><strong>1</strong></span>.GET请求的数据会附在URL之后（就是把数据放置在HTTP协议头中），以?分割URL和传输数据，参数之间以<相连，如：login.action?name=hyddd<password=idontknow<verify=%E4%BD%A0%E5%A5%BD。如果数据是英文字母/数字，原样发送，如果是空格，转换为+，如果是中文/其他字符，则直接把字符串用BASE64加密，得出如：%E4%BD%A0%E5%A5%BD，其中％XX中的XX为该符号以16进制表示的ASCII。</p>
<p>　　POST把提交的数据则放置在是HTTP包的包体中。</p>
<p>　　<span><strong>2</strong></span>."GET方式提交的数据最多只能是1024字节，理论上POST没有限制，可传较大量的数据，IIS4中最大为80KB，IIS5中为100KB"？？！</p>
<p>　　以上这句是我从其他文章转过来的，其实这样说是错误的，不准确的：</p>
<p>　　(1).首先是"GET方式提交的数据最多只能是1024字节"，因为GET是通过URL提交数据，那么GET可提交的数据量就跟URL的长度有直接关系了。而实际上，<span>URL不存在参数上限的问题，HTTP协议规范没有对URL长度进行限制</span>。这个限制是特定的浏览器及服务器对它的限制。IE对URL长度的限制是2083字节(2K+35)。对于其他浏览器，如Netscape、FireFox等，理论上没有长度限制，其限制取决于操作系统的支持。</p>
<p>　　注意这是限制是整个URL长度，而不仅仅是你的参数值数据长度。[见参考资料5]</p>
<p>　　(2).理论上讲，<span>POST是没有大小限制的，HTTP协议规范也没有进行大小限制</span>，说\POST数据量存在80K/100K的大小限制"是不准确的，POST数据是没有限制的，起限制作用的是服务器的处理程序的处理能力。</p>
<p>　　对于ASP程序，Request对象处理每个表单域时存在100K的数据长度限制。但如果使用Request.BinaryRead则没有这个限制。</p>
<p>　　由这个延伸出去，对于IIS 6.0，微软出于安全考虑，加大了限制。我们还需要注意：</p>
<p>　　　　 1).IIS 6.0默认ASP POST数据量最大为200KB，每个表单域限制是100KB。　　　　 2).IIS 6.0默认上传文件的最大大小是4MB。　　　　 3).IIS 6.0默认最大请求头是16KB。　　IIS 6.0之前没有这些限制。[见参考资料5]</p>
<p>　　所以上面的80K，100K可能只是默认值而已(注：关于IIS4和IIS5的参数，我还没有确认)，但肯定是可以自己设置的。由于每个版本的IIS对这些参数的默认值都不一样，具体请参考相关的IIS配置文档。</p>
<p>　　<span><strong>3</strong></span>.在ASP中，服务端获取GET请求参数用Request.QueryString，获取POST请求参数用Request.Form。在JSP中，用request.getParameter(\"XXXX\")来获取，虽然jsp中也有request.getQueryString()方法，但使用起来比较麻烦，比如：传一个test.jsp?name=hyddd<password=hyddd，用request.getQueryString()得到的是：name=hyddd<password=hyddd。在PHP中，可以用$_GET和$_POST分别获取GET和POST中的数据，而$_REQUEST则可以获取GET和POST两种请求中的数据。值得注意的是，JSP中使用request和PHP中使用$_REQUEST都会有隐患，这个下次再写个文章总结。</p>
<p>　　<span><strong>4</strong></span>.POST的安全性要比GET的安全性高。注意：这里所说的安全性和上面GET提到的\安全"不是同个概念。上面\安全"的含义仅仅是不作数据修改，而这里安全的含义是真正的Security的含义，比如：通过GET提交数据，用户名和密码将明文出现在URL上，因为(1)登录页面有可能被浏览器缓存，(2)其他人查看浏览器的历史纪录，那么别人就可以拿到你的账号和密码了，除此之外，使用GET提交数据还可能会造成Cross-site request forgery攻击。</p>
<p>　　总结一下，<span>Get</span>是向服务器发索取数据的一种<span>请求</span>，而<span>Post</span>是向服务器提交数据的一种<span>请求</span>，在FORM（表单）中，Method默认为"GET"，实质上，GET和POST只是发送机制不同，并不是一个取一个发！</p>


<p><strong>参考资料</strong>：</p>
<p>[1].http://hi.baidu.com/liuzd003/blog/item/7bfecbfa6ea94ed8b58f318c.html</p>
<p>[2].http://www.blogjava.net/onlykeke/archive/2006/08/23/65285.aspx</p>
<p>[3].http://baike.baidu.com/view/2067025.htm</p>
<p>[4].http://www.chxwei.com/article.asp?id=373</p>
<p>[5].http://blog.csdn.net/somat/archive/2004/10/29/158707.aspx</p>


<p>本文转自：<a href="http://www.cnblogs.com/hyddd/archive/2009/03/31/1426026.html" target="_blank">hyddd</a></p>