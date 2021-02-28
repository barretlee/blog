---
title: 细说 Data URI
categories:
  - 前端杂烩
  - 网络交互
tags:
  - tech
  - cnblogs
date: 2015-08-12 09:38:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2015/08/12/data-uri.html" target="_blank">博客园</a>.</div>

<p><span>Data URL 早在 1995 年就被提出，那个时候有很多个版本的 Data URL Schema 定义陆续出现在 </span><a href="//zh.wikipedia.org/zh-cn/VRML">VRML</a><span> 之中，随后不久，其中的一个版本被提上了议案&mdash;&mdash;将它做个一个嵌入式的资源放置在 HTML 语言之中。从 </span><a href="http://www.ietf.org/rfc/rfc2397.txt">RFC</a><span> 文档定稿的时间来看（1998年），它是一个很受欢迎的发明。</span></p>
<p>Data URIs 定义的内容可以作为小文件被插入到其他文档之中。URI 是 <code>uniform resource identifier</code> 的缩写，它定义了接受内容的协议以及附带的相关内容，如果附带的相关内容是一个地址，那么此时的 URI 也是一个 URL (<code>uniform resource locator</code>)，如：</p>

```
ftp://10.1.1.10/path/to/filename.ext
http://example.com/source/id

```

<p>协议后面的内容，可以告诉客户端一个准确下载资源的地址，而 URI 并不一定包含一个地址信息，如(<a href="data:image/gif;base64,R0lGODlhEAAOALMAAOazToeHh0tLS/7LZv/0jvb29t/f3//Ub//ge8WSLf/rhf/3kdbW1mxsbP//mf///yH5BAAAAAAALAAAAAAQAA4AAARe8L1Ekyky67QZ1hLnjM5UUde0ECwLJoExKcppV0aCcGCmTIHEIUEqjgaORCMxIC6e0CcguWw6aFjsVMkkIr7g77ZKPJjPZqIyd7sJAgVGoEGv2xsBxqNgYPj/gAwXEQA7" target="_blank">demo</a>)：</p>

```
data:image/gif;base64,R0lGODlhEAAOALMAAOazToeHh0tLS/7LZv/0jvb29t/f3//Ub//ge8WSLf/rhf/3kdbW1mxsbP//mf///yH5BAAAAAAALAAAAAAQAA4AAARe8L1Ekyky67QZ1hLnjM5UUde0ECwLJoExKcppV0aCcGCmTIHEIUEqjgaORCMxIC6e0CcguWw6aFjsVMkkIr7g77ZKPJjPZqIyd7sJAgVGoEGv2xsBxqNgYPj/gAwXEQA7

```

<p>其协议为 data，并告诉客户端将这个内容作为 <code>image/gif</code> 格式来解析，需要解析的内容使用的是 base64 编码。它直接包含了内容但并没有一个确定的资源地址。</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/08/12/120937188795030.png" data-source="http://images0.cnblogs.com/blog2015/387325/201508/120937188795030.png" alt=""></p>
<h3 id="_1"><a class="headeranchor-link" name="user-content-_1" href="#_1"></a>格式</h3>
<p>Data URI 的格式十分简单，如下所示：</p>

```
data:[<mime type="">][;charset=<charset>][;base64],<encoded data="">

```
</encoded></charset></mime>
<ul>
<li>
<p>第一部分是 <code>data:</code> 协议头，它标识这个内容为一个 data URI 资源。</p>
</li>
<li>
<p>第二部分是 MIME 类型，表示这串内容的展现方式，比如：<code>text/plain</code>，则以文本类型展示，<code>image/jpeg</code>，以 jpeg 图片形式展示，同样，客户端也会以这个 MIME 类型来解析数据。</p>
</li>
<li>
<p>第三部分是编码设置，默认编码是 <code>charset=US-ASCII</code>, 即数据部分的每个字符都会自动编码为 <code>%xx</code>，关于编码的测试，可以在浏览器地址框输入分别输入下面两串内容，查看效果：
</p>

```
// output: &auml;&frac12; &aring;&yen;&frac12; -> 使用默认的编码展示，故乱码
data:text/html,你好
// output: 你好 -> 使用 UTF-8 展示
data:text/html;charset=UTF-8,你好
// output: 浣犲ソ -> 使用 gbk 展示（浏览器默认编码 UTF-8，故乱码）
data:text/html;charset=gbk,你好
// output: 你好 -> UTF-8 编码，内容先使用 base64 解码，然后展示
data:text/html;charset=UTF-8;base64,5L2g5aW9 

```

</li>
<li>
<p>第四部分是 <a href="http://en.wikipedia.org/wiki/Base64">base64</a> 编码设定，这是一个可选项，base64 编码中仅包含 0-9,a-z,A-Z,+,/,=，其中 = 是用来编码补白的。</p>
</li>
<li>
<p>最后一部分为这个 Data URI 承载的内容，它可以是纯文本编写的内容，也可以是经过 base64编码 的内容。</p>
</li>
</ul>
<p>很多时候我们使用 data URI 来呈现一些较长的内容，如一串二进制数据编码、图片等，采用 base64 编码可以让内容变得更加简短。而对图片来说，在 gzip 压缩之后，base64 图片实际上比原图 gzip 压缩要大，体积增加大约为三分之一，所以使用的时候需要权衡。</p>
<h3 id="_2"><a class="headeranchor-link" name="user-content-_2" href="#_2"></a>兼容性</h3>
<p>由于出现时间较早，目前主流的浏览器基本都支持 data URI：</p>
<ul>
<li>Firefox 2+</li>
<li>Opera 7.2+</li>
<li>Chrome (所有版本)</li>
<li>Safari (所有版本)</li>
<li>Internet Explorer 8+</li>
</ul>
<p>但是部分浏览器对 data URI 的使用存在限制：</p>
<ul>
<li>
<p>长度限制，长度超长，在一些应用下会导致内存溢出，程序崩溃
</p>

```
Opera 下限制为 4100 个字符，目前已经去掉了这个限制
IE 8+ 下限制为 32,768 个字符（32kb），IE9 之后移除了这个限制

```

</li>
<li>
<p>在 IE 下，data URI 只允许被用到如下地方：</p>
<ul>
<li>object (images only)</li>
<li>img、input type=image、link</li>
<li>CSS 中允许使用 URL 声明的地方,如 background</li>
</ul>
</li>
<li>在 IE 下，Data URI 的内容必须是经过编码转换的，如 "#"、"%"、非 US-ASCII 字符、多字节字符等，必须经过编码转换</li>
</ul>
<p><strong>低版本IE的解决之道 - MHTML</strong></p>
<p>MHTML 就是 MIME HTML，是 "Multipurpose Internet Mail Extensions HyperText Markup Language" 的简称，它就像一个带着附件的邮件一般，如下所示：</p>

```
/** FilePath: http://example.com/test.css */
/*!@ignore
Content-Type: multipart/related; boundary="_ANY_SEPARATOR"

--_ANY_SEPARATOR
Content-Location:myidBackground
Content-Transfer-Encoding:base64

iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
--_ANY_SEPARATOR--
*/

.myid {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==");
  *background-image: url(mhtml:http://example.com/test.css!myidBackground);
}

```

<p><span>上方的一串注释就像是一个附件，这个附件内容是一个名叫 </span><code>myidBackground</code><span> 的 </span><code>base64</code><span> 编码图片，在一个 class 叫做 </span><code>myid</code><span> 的 css 中用到了它。这里有几点需要注意：</span></p>
<ul>
<li><code>_ANY_SEPARATOR</code> 可以是任意内容</li>
<li>在"附件"结束位置需要加上结束符 <code>_ANY_SEPARATOR</code>，否则在 Vista 和 Win7 的 IE7 中会<a href="http://www.phpied.com/the-proper-mhtml-syntax/">出错</a>。</li>
<li>附件代码注意不要被压缩工具给干掉了</li>
</ul>
<p><strong>这里存在一个坑：部分系统兼容模式下的 IE8 也认识 css 中的 hack 符号 <code>*</code>，但是不支持 <code>mhtml</code>，所以上面的内容不会生效。处理方案估计就只有使用 IE 的条件注释了。</strong></p>
<h3 id="https"><a class="headeranchor-link" name="user-content-https" href="#https"></a>HTTPS 下的安全提示</h3>
<p>HTTPS 打开页面，当在 IE6、7 下使用 data URIs 时，会看到如下提醒：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/08/12/120937285514109.png" data-source="http://images0.cnblogs.com/blog2015/387325/201508/120937285514109.png" alt=""></p>
<p>MS 的解释是：</p>
<blockquote>
<p>您正在查看的网站是个安全网站。它使用了 SSL （安全套接字层）或 PCT（保密通讯技术）这样的安全协议来确保您所收发信息的安全性。 
当站点使用安全协议时，您提供的信息例如姓名或信用卡号码等都经过加密，其他人无法读取。然而，这个网页同时包含<strong>未使用该安全协议的项目</strong>。 </p>

</blockquote>
<p>很明显，IE 嗅到了"未使用安全协议的项目"。</p>
<p>浏览器在解析到一个 URI 的时候，会首先判断协议头，如果是以 <code>http(s)</code> 开头，它便会建立一个网络链接下载资源，如果它发现协议头为 <code>data:</code>，便会将其作为一个 Data URI 资源进行解析。</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/08/12/120937376765288.png" data-source="http://images0.cnblogs.com/blog2015/387325/201508/120937376765288.png" alt=""></p>
<p>但是从 chrome 的瀑布流，我们可以做这样的猜测：</p>
<p>图中每个 Data URI 都发起了请求，不过状态都是 <code>data(from cache)</code>，禁用缓存之后，依然如此。所以可以断定，浏览器在下载源码解析成 DOM 的时候，会将 Data URI 的资源解析出来，并缓存在本地，最后 Data URI 每个对应位置都会发起一次请求，只是这个请求还未建立链接，就被发现存在缓存的浏览器给拍死了。</p>
<h3 id="_3"><a class="headeranchor-link" name="user-content-_3" href="#_3"></a>安全阀门</h3>
<p>Data URI 在 IE 下有诸多安全限制，事实上，很多 xss 注入也可以将 data URI 的源头作为入口，使用 data URI 绕过浏览器的过滤。</p>

```
// 绕过浏览器过滤
http://example.com/text.php?t="><script src="data:text/html,<script>alert(" xss")<="" script=""><!--

```
</script>
<p>这里可以很大程度的发散，很有意思，值得读者去深究。</p>
<h3 id="_4"><a class="headeranchor-link" name="user-content-_4" href="#_4"></a>扩展阅读</h3>
<ul>
<li><a href="http://www.ietf.org/rfc/rfc2397.txt">RFC 2397</a> RFC文档</li>
<li><a href="//developer.mozilla.org/zh-CN/docs/data_URIs">MDN - data_URIs</a> MDN文档</li>
<li><a href="//msdn.microsoft.com/en-us/library/cc848897(VS.85).aspx">MSDN - data Protocal</a> MSDN文档</li>
<li><a href="http://www.nczonline.net/blog/2009/10/27/data-uris-explained/">NC - data_uris_explained</a></li>
<li><a href="http://www.phpied.com/mhtml-when-you-need-data-uris-in-ie7-and-under/">phpied - MHTML</a></li>
</ul>