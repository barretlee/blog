---
title: JavaScript多文件下载
categories:
  - JavaScript
  - 前端杂烩
  - 网络交互
tags:
  - tech
  - cnblogs
  - 多文件下载
warning: true
mark: hot
date: 2014-02-12 09:50:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2014/02/12/multiple-download-with-javascript.html" target="_blank">博客园</a>.</div>

<p>对于文件的下载，可以说是一个十分常见的话题，前端的很多项目中都会有这样的需求，比如 highChart 统计图的导出，在线图片编辑中的图片保存，在线代码编辑的代码导出等等。而很多时候，我们只给了一个链接，用户需要右键点击链接，然后选择\另存为"，这个过程虽说不麻烦，但还是需要两步操作，倘若用户想保存页面中的多个链接文件，就得重复操作很多次，最常见的就是英语听力网站上的音频下载，手都要点麻！</p>
<p>本文的目的是介绍如何利用 javascript 进行多文件的下载，也就是当用户点击某个链接或者按钮的时候，同时下载多个文件。这里的\同时"用的不是很准确，在现代浏览器中可以实现多文件的并行下载，而在一些老版本浏览器，如IE8-，此类的浏览器就只能进行单个文件的下载，但是我们可以让多个文件依次保存下来，算是串行下载吧~</p>
<p>若要要无视实现细节，可以直接跳到第三部分，或者戳：</p>
<p>代码封装：<a href="//github.com/barretlee/javascript-multiple-download/blob/master/lib.js" target="_blank">lib.js</a></p>
<p>DEMO：<a href="http://rawgithub.com/barretlee/javascript-multiple-download/master/test/test.html" target="_blank">javascript-multiple-download</a>&nbsp;(HTTPS，第三个有bug，具体原因下面有说明)</p>
<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<a href="http://qianduannotes.duapp.com/demo/javascript-multiple-download/test/test.html" target="_blank">javascript-multiple-download</a>&nbsp;(HTTP，测试正常)</p>


<p>本文地址：<a href="http://www.cnblogs.com/hustskyking/p/multiple-download-with-javascript.html" target="_parent">http://www.cnblogs.com/hustskyking/p/multiple-download-with-javascript.html</a>，转载请保留原文地址。</p>
<h3>一、文件类型介绍及其特点</h3>
<h4>1. 一般类型</h4>
<p>平时比较常见的有 txt、png、jpg、zip、tar 等各种文件格式，这些文件格式中，一部分浏览器是会直接打开链接显示内容的，而另外一部分，浏览器不识别响应头，或者不能解析对应的格式，于是当做文件直接下载下来了。如：</p>

```
<a href="http://barretlee.com/test.rar">file</a>

```

<p>这句代码，若直接点开链接，浏览器将会直接下载该文件。</p>
<h4>2. dataURL类型</h4>
<p>dataURL 也是十分常见的类型，他可以作为 src 或者 url() 的参数送进去。比较常见的有如下几种：</p>

```
文本： data:text/plain;这里是正文内容。
图片： data:image/jpg;base64,/9j/4AAQSkZJRgABAQEA....
       data:image/png;base64,/9j/4AAQSkZJRgABAQEA....

```

<p>base64 是用的比较广泛的一种数据格式。</p>

```
Base64格式
data:[][;charset=][;base64],
Base64 在CSS中的使用：
.demoImg{ background-image: url("data:image/jpg;base64,/9j/4QMZRXhpZgAASUkqAAgAAAAL...."); }
Base64 在HTML中的使用：
<img width="40" height="30" src="data:image/jpg;base64,/9j/4QMZRXhpZgAASUkqAAgAAAAL....">      

```

<h4>3. Blob 流</h4>
<p>Blob 对象表示不可变的、包含原始数据的类文件对象。具体的内容可以参阅<a href="//developer.mozilla.org/en-US/docs/Web/API/Blob" target="_blank">MDN文档</a>。</p>
<p>他的使用也是特别的方便，如：</p>

```
var aFileParts = ['<a id="a"><b id="b">hey!</b></a>'];
var oMyBlob = new Blob(aFileParts, {type : 'text/html'}); // the blob

```

<p>Blob 接收两个参数，一个是数组类型的数据对象，他可以是 ArrayBuffer、ArrayBufferView、Blob、String 等诸多类型；第二个参数是 MINE 类型设置。而本文我们要用到的是 <code>URLcreateObjectURL()</code> 这个函数，他的作用是将一个 URL 所代表的内容转化成一个 <a href="//developer.mozilla.org/en-US/docs/Web/API/DOMString" target="_blank">DOMString</a>，产生的结果是一个 文件对象 或者 Blob 对象。</p>
<h4>4. 二进制流</h4>
<p>我们利用 File API 读取文件的时候，拿到的是数据的二进制流格式，这些类型可以直接被 ArrayBuffer 等接收，本文中没有用到，就不细说了。</p>
<h3>二、JavaScript 多文件下载</h3>
<p>HTML5 中 a 标签多了一个属性&mdash;&mdash;download，用户点击链接浏览器会打开并显示该链接的内容，若在链接中加了 download 属性，点击该链接不会打开这个文件，而是直接下载。虽说是比较好用，但低版本浏览器不兼容，这个在本节的 2 和 3 中将会讲到解决方案。</p>
<p>在这里，我们可以利用&nbsp;<span>属性检测</span>&nbsp;UA 来判断浏览器类型：</p>

```
h5Down = document.createElement("a").hasOwnProperty("download");
var h5Down = !/Trident|MSIE/.test(navigator.userAgent); // Trident 标识 IE11

```

<h4>1. a 标签 download 属性的使用</h4>
<p><strong>注：FF5.0 / Safari5.0 / Opera11.1 / IE9.0 不支持 download 属性</strong></p>
<p>利用 download 属性可以直接下载单个文件，若想点击一次下载多个文件，就得稍加处理下了：</p>

```
function downloadFile(fileName, content){
    var aLink = document.createElement("a"),
        evt = document.createEvent("HTMLEvents");

    evt.initEvent("click");
    aLink.download = fileName;
    aLink.href = content;

    aLink.dispatchEvent(evt);
}

```

<p>download 属性的作用除了让浏览器忽略文件的 MIME 类型之外，还会把该属性的值作为文件名。你可以在 chrome 控制台运行这句程序：</p>

```
downloadFile("barretlee.html", "./");

```

<p>浏览器会提示是否保留（下载）该 html 文件。之前我们提到文件类型还可能是 dataURL 或者是 Blob 流，为了让程序也支持这些数据类型，稍微修改下上面的函数：</p>

```
function downloadFile(fileName, content){
    var aLink = document.createElement('a');
      , blob = new Blob([content])
      , evt = document.createEvent("HTMLEvents");

    evt.initEvent("click");

    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.dispatchEvent(evt);
}

```

<p><code>new Blob([content])</code>，现将文件转换成一个 Blog 流，然后，使用 <code>URL.createObjectURL()</code> 将其转换成一个 DOMString。这样我们就支持 data64 和其他数据类型的 content 了~</p>
<h4>2. window.open 之后 execCommand("SaveAs")</h4>
<p>上面也提到了，尽管 download 属性是十分便利的 H5 利器，但低版本 IE 根本不赏脸，要说方法，IE 还是有很多方式去转换的，比如 ADOBE.STREAM 的 activeX 对象可以把文件转换成文件流，然后写入到一个要保存的文件中。这里要谈到的是略微方便一点的方式：先把内容写到一个新开的 window 对象中，然后利用 execCommand 执行保存命令，就相当于我们在页面上按下 Ctrl+S，这样页面内的信息都会 down 下来。</p>

```
// 将文件在一个 window 窗口中打开，并隐藏这个窗口。
var win = window.open("path/to/file.ext", "new Window", "width=0,height=0");
// 在 win 窗口中按下 ctrl+s 保存窗口内容
win.document.execCommand("SaveAs", true, "filename.ext");
// 使用完了，关闭窗口
win.close();

```

<p>这个过程十分明了，不过这里会存在一个问题，并不是程序的问题，而是浏览器的问题，如果我们用 搜狗浏览器 或者 360浏览器 打开新窗口的话，他会新开一个标签页，而不是新开一个窗口，更可恶的是部分浏览器拦截 window.open 的窗口（这个可以设置）。所以只好另觅他法了。</p>
<h4>3. iframe 中操作</h4>
<p>既然新开一个窗口那么麻烦，我就在本窗口下完成工作~</p>

```
function IEdownloadFile(fileName, contentOrPath){
    var ifr = document.createElement('iframe');

    ifr.style.display = 'none';
    ifr.src = contentOrPath;

    document.body.appendChild(ifr);

    // 保存页面 -> 保存文件
    ifr.contentWindow.document.execCommand('SaveAs', false, fileName);
    document.body.removeChild(ifr);
}

```

<p>一般的链接我们可以直接给 iframe 添加 src 属性，然后执行 saveAs 命令，倘若我们使用的是 data64 编码的文件，这个怎么办？</p>

```
var isImg = contentOrPath.slice(0, 10) === "data:image"；

// dataURL 的情况
isImg && ifr.contentWindow.document.write("<img src="" +
        contentOrPath + "">");

```

<p>这个也比较好处理，直接把文件写入到 iframe 中，然后在执行保存。</p>
<h3>三、代码的封装与接口介绍</h3>
<h4>1. 代码的封装以及相关 DEMO</h4>
<p>封装：<a href="//github.com/barretlee/javascript-multiple-download/blob/master/lib.js" target="_blank">lib.js</a></p>
<p>DEMO：<a href="http://rawgithub.com/barretlee/javascript-multiple-download/master/test/test.html" target="_blank">javascript-multiple-download</a>&nbsp;(HTTPS，第三个有bug)</p>
<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<a href="http://qianduannotes.duapp.com/demo/javascript-multiple-download/test/test.html" target="_blank">javascript-multiple-download</a>&nbsp;(HTTP，测试正常)</p>
<p>Bug 说明，经过一番细节处理之后，基本兼容各个浏览器，我把代码放在 //raw.github.com 上托管，可能因为是 https 传输，第三个测试中报错了，报错的具体内容是：<span>HTTPS 安全受到 http://rawgithub.com/barretlee/javascript-multiple-download/master/file/test.jpg 的威胁</span>，而 test.txt 文件没有报错。放到 http 协议下测试运行结果是可观的。（<span>这点我没有去深究，肯定是有深层安全方面原因的，难道就因为他是 jpg图片格式？ </span>&nbsp; 谢&nbsp;<a href="//www.imququ.com/" target="_blank">@屈屈</a><span>&nbsp;</span>提醒，跨协议传输存在安全问题）后面的 demo 我放在 BAE 上，没有问题，不过没测试 safari 和 opera。</p>
<h4>2. 接口的调用</h4>
<p>提供了三个接口，支持单文件下载，多文件下载，多文件下载自定义命名。</p>
<p>1）单文件下载</p>

```
Downer("./file/test.txt");

```

<p>2）多文件下载</p>

```
Downer(["./file/test.txt","./file/test.txt"]);

```

<p>3）多文件下载自定义命名</p>

```
Downer({
    "1.txt":"./file/test.txt",
    "2.jpg":"./file/test.jpg"
}); 

```

<p>文件的 URL 如 <code>./file/test.jpg</code> 都可以改成 base64 或者其他格式,如：</p>

```
Downer({     //这是一个很长的 dataURI，我用负的text-indent隐藏了，可直接复制    "data64.jpg" : "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAYADsDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9NgKKK8w8beO/EMVzGdJ08W2jW2t2WnXGpLdx+e7PPEkii3eJgYj5mwsJFkzkquAC3VFc0lFf10/UOlz1CivO9H+LEmreP7jw8mlBrLfPDa6nC1y0cksX30Z2t1hGCHBEcsjAqQVHOJPCfjnxFc+HNU1rxPpmh6Vp9mt232i01WWXmGV0IdXt0CrhD8+45xnaM4A00uZ9rgtZcq3vb5noFLXCfDz4j3vjbT9XM+hSabqdhtItWFxGswZCybTc28DjJDAkx7fRjzi/qmv6zH8LdR1m6sP+Ef12PSprprPzkufssyxMwXeBtfBA5xg0OLi2n/Vwh+8aUep1gFLXGeKhqmj+FtGmt9fvvtVvfWMc9w0VsWvUkuI43WUeVtAIcnMYQggYI6Hs6lqwk7pPuNrkPEHwn8N+KNRkvdQh1BpZJY7ho7fVru3haWPbslMUcqpvXYhD7d2VU54FFFNNxd1uPyJIfhb4dt/EkOuxwXy6hBNJPD/xNLryImkz5myHzPLUNkllC4J5IyAaWP4W+GY7+/uzp7yy3sc8UiTXc0kUazHdMIo2cpDvPLeWFyeTRRRd9wH6B8NNB8NyapJZx38kmpxrFePe6pdXbTKAQMmaRjkAkZHOMDOAKmbwLp9n8Pp/CGkr/Zmm/wBnyadbjLS+QjIUB+ZstjPdsn1oopOTfUa91prdf1+hFrfhnWNb0HSLCTVrGOaC6tbi+mXT323CwyrJtiXzv3RZkXljJgZ4PWuooopNtkpWVkf/2Q==" });

```

<p>&nbsp;这里只做到了 chrome 兼容，IE 下懒得去看了，这个需求很少见！</p>
<h3>四、服务器支持与后端实现</h3>
<h4>1. 后端实现</h4>
<p>不使用前端，直接后端实现的原理，就是在响应头中加入一些特殊的标记，如前端发送这样的请求：</p>

```
function download(path) {
    var ifrm = document.getElementById(frame);
    ifrm.src = "download.php?path="+path;
}

```

<p>后端的响应为</p>

```
<?php
   header("Content-Type: application/octet-stream");
   header("Content-Disposition: attachment; filename=".$_GET['path']);
   readfile($_GET['path']);
?>

```

<p>告诉浏览器这是一个流文件，作为附件方式发送给你，请忽略 MINE type，直接保存。</p>
<h4>2. 服务器配置</h4>
<p>若后台是 apche 作为服务器，可以配置 htaccess 文件：</p>

```
<filesmatch "\.(zip|rar)$"="">
Header set Content-Disposition attachment
</filesmatch>

```

<p>意思是只要请求的是 zip 或者 rar 类型的文件，那么就添加一个 <code>Content-Disposition:attachment</code> 的响应头。这样就可以在 php 代码中省略麻烦的操作。</p>
<h3>五、小结</h3>
<p>由于行文仓促，文中会有不少错误，对多文件下载有更好的提议，希望提出来共同分享！</p>
<p>实现多文件下载的方式肯定不止上面提到的几种，而且我这里封装的代码并没有在FF safari opera 中实现，因为他们还没兼容 download 属性，具体情况可以查看 <a href="http://caniuse.com/#feat=download" target="_blank">caniuse</a>&nbsp;。建议在项目中把这样的事情交给后端，几句代码可以搞定。</p>
<h3>六、参考资料</h3>
<ul>
<li><a href="http://www.alloyteam.com/2014/01/use-js-file-download/" target="_blank">在浏览器端用JS创建和下载文件</a> AlloyTeam</li>
<li><a href="http://thezedienblog.blogspot.com/2013/05/starting-file-download-with-javascript.html" target="_blank">Starting file download with Javascript</a> Ahzaz's Blog</li>
<li><a href="//developer.mozilla.org/en-US/docs/Web/API/Blob" target="_blank">Blob 流</a> MDN</li>
</ul>

