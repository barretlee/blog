---
title: 再探@font-face及webIcon制作
categories:
  - 前端杂烩
tags:
  - tech
  - cnblogs
  - webicon
  - font-face
warning: true
date: 2014-01-27 01:50:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2014/01/27/manufacture-font-face-in-web.html" target="_blank">博客园</a>.</div>

<p>@font-face 不能说他是什么新东西了，在 CSS2.0 规范中就有了这玩意儿，IE4.0 开始就已经出现，只是当时用的不是特别广泛，后来在 CSS2.1 草案中又被删掉。随着 web 的急速发展，@font-face 价值越来越凸显，然后再次被纳入 CSS3 草案中。@font-face 是个什么东西，本文不做过多说明，不太清楚的童鞋可以看这里 <a href="http://www.w3schools.com/css/css3_fonts.asp" target="_blank">http://www.w3schools.com/css/css3_fonts.asp</a>。需要强调的是他的书写格式：</p>

```
@font-face {
    font-family: <yourwebfontname>;
    src: <source> [<format>][,<source> [<format>]]*;
    [font-weight: <weight>];
    [font-style: <style>];
}

```
</style></weight></format></format></yourwebfontname>
<p>举个例子：</p>

```
@font-face {
    font-family: Gentium;
    src: url(http://example.com/fonts/Gentium.woff) format("woff");
}

p { font-family: Gentium, serif; }

```

<p>format 是一个可选参数，他的作用是提示该资源 URI 所引用的字体格式，关于字体格式，可以看下面列表：</p>
<table>
<thead>
<tr><th>format 格式</th><th>Font 格式</th><th>后缀名</th></tr>
</thead>
<tbody>
<tr>
<td>truetype</td>
<td>TrueType</td>
<td>.ttf</td>
</tr>
<tr>
<td>opentype</td>
<td>OpenType</td>
<td>.ttf, .oft</td>
</tr>
<tr>
<td>truetype-aat</td>
<td>TrueType with Apple Advanced Typography extensions</td>
<td>.ttf</td>
</tr>
<tr>
<td>embedded-opentype</td>
<td>Embedded OpenType</td>
<td>.eot</td>
</tr>
<tr>
<td>svg</td>
<td>SVG Font</td>
<td>.svg, .svgz</td>
</tr>
</tbody>
</table>
<p>这堆麻烦的字体格式的出现，是因为各种浏览器对他们的支持程度不一样：</p>
<table>
<thead>
<tr><th>浏览器</th><th>支持类型</th></tr>
</thead>
<tbody>
<tr>
<td>IE6,7,8</td>
<td>仅支持 Embedded OpenType(.eot) 格式。</td>
</tr>
<tr>
<td>Firefox 3.5</td>
<td>支持 TrueType、OpenType(.ttf, .otf) 格式。</td>
</tr>
<tr>
<td>Firefox 3.6</td>
<td>支持 TrueType、OpenType(.ttf, .otf) 及 WOFF 格式。</td>
</tr>
<tr>
<td>Chrome,Safari,Opera</td>
<td>支持 TrueType、OpenType(.ttf, .otf) 及 SVG Font(.svg) 格式。</td>
</tr>
</tbody>
</table>
<p>各浏览器具体的支持情况，可以戳<a href="http://caniuse.com/#feat=fontface" target="_blank">这里</a>。除了可以利用 font-face 引入各种炫酷的字体，还一个比较大的用途是使用它们替换网页图标。下面就说一说 @font-face 在 web 开发中比较有用的 webIcon。</p>
<p>本文地址：<a href="http://www.cnblogs.com/hustskyking/p/manufacture-font-face-in-web.html" target="_blank">http://www.cnblogs.com/hustskyking/p/manufacture-font-face-in-web.html</a></p>
<h3>一、fontCreator 制作 webIcon</h3>
<p>这部分说的比较啰嗦，算是一个webicon制作教程吧~ 制作的图片取自张鑫旭大哥的<a href="http://www.zhangxinxu.com/wordpress/2013/12/%E9%91%AB%E8%A1%A8%E6%83%85%E5%8C%85/" target="_blank">鑫表情包</a>~</p>
<p>首先说一说什么是 web icon，可以看看这个页面，<a href="http://fortawesome.github.io/Font-Awesome/" target="_blank">http://fortawesome.github.io/Font-Awesome/</a>，随便瞄准网页上的一个图标，（chrome浏览器）点击右键审查元素，可以看到页面上的图标都没有使用图片，而是用的特殊的字体：</p>

```
//html
<i class="fa fa-flag"></i>

//css
.fa-flag:before {
    content: "\f024";
}

```

<p>从网页资源列表中可以查看到该网页使用了多种字体：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/01/27/270144014223595.jpg" data-source="http://images.cnitblog.com/blog/387325/201401/270144014223595.jpg" alt=""></p>
<p>也可以去看看我写的一个 <a href="http://qianduannotes.duapp.com/demo/testFont/index.html" target="_blank">DEMO</a></p>
<h4>1. 编码与webIcon</h4>
<p>编码和字体没有关系，但编码和字符是一一对应的，比如 "\u674e" 对应的是 \李"，"\u9756" 对应的是\靖"。而字体在这里有个什么对应关系呢？不同的字体中显示同一个 unicode 编码，看到的效果是不一样的，我们可以让正楷的 "李" 对应 "\u674e"，也可以用行楷对应，当然我们也可以用一张图片来对应。Web Icon 也就是用图片来对应一些 unicode 码。</p>
<p>但是这里存在一个问题，我们用一张图片来对应 \李" 字，倘若想输入一个正常的\李"字，该怎么去对应呢？ Unicode 包含 0-0x10FFFF 共 1114112 个码位，而汉字占用的码位并不多，只有几千个，在制作 webIcon 时可以选择避开常用的字符集。当然， Unicode 编码也给我们提供了码位的专用区（Pricate Use Area），区间是 E000-F8FF，所以我们可以在这个字符集中放肆 DIY 属于我们自己的字体。</p>
<h4>2. fontCreator 介绍与字体制作</h4>
<p>Web Icon 的制作，网上有很多在线工具，不过这些在线工具都是从已有的图片中选择对应关系，约束性比较大，fontCreator 是一款比较优秀的字体制作工具，它能够很智能的将我们导入的图片转换成黑白色的位图，我们可以编辑和修改各个位图区域，按照自己的意愿 DIY。</p>
<p>打开 fontCreator，新建一个字体：&nbsp;<img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/01/27/270144130009357.jpg" data-source="http://images.cnitblog.com/blog/387325/201401/270144130009357.jpg" alt="" width="924" height="548"></p>
<p>为了方便演示，我只保留了 A-Z 的字符，其他的全部删除了。</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/01/27/270144347032127.jpg" data-source="http://images.cnitblog.com/blog/387325/201401/270144347032127.jpg" alt="" width="222" height="435"></p>
<p>选中 A ，右击选择导入图片：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/01/27/270144495005073.jpg" data-source="http://images.cnitblog.com/blog/387325/201401/270144495005073.jpg" alt="" width="479" height="403"></p>
<p>选择 generate，生成字符内容，然后双击 A，进行细节的编辑（放大，平移）：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/01/27/270145012668077.jpg" data-source="http://images.cnitblog.com/blog/387325/201401/270145012668077.jpg" alt="" width="495" height="384"></p>
<p>依次处理其他几个字母。Ctrl+S 保存为 barret.ttf。P.S：由于导入表情调整大小位置过于繁琐，我只做了 A-I 这几个码位对应的符号，测试的时候使用字母 A-I 测试即可~</p>
<h4>3. 本地测试</h4>
<p>为了方便本地测试，我们先安装这个字体：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/01/27/270145140786598.jpg" data-source="http://images.cnitblog.com/blog/387325/201401/270145140786598.jpg" alt=""></p>
<p>打开记事本，选择字体为 barret，字号调大一点，输入 BCDEF 等字符，看看效果：&nbsp;<img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/01/27/270145230473292.jpg" data-source="http://images.cnitblog.com/blog/387325/201401/270145230473292.jpg" alt=""></p>
<p>是不是惊呆了，呵呵~</p>
<p>字体文件下载：<a href="http://files.cnblogs.com/hustskyking/barret.rar" target="_blank">barret.ttf</a></p>
<h4>4. 网页测试</h4>
<p>网页测试之前，需要先转化下格式，至于原因在前言部分我已经说了。我们拿到的是 ttf 的字体格式，为了兼容所有的浏览器，必须修改进行格式转换。</p>
<p>进入<a href="http://www.fontsquirrel.com/tools/webfont-generator" target="_blank">http://www.fontsquirrel.com/tools/webfont-generator</a>，选择字体，点击 Agreement，然后点击下载字体：&nbsp;<img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/01/27/270145334695039.jpg" data-source="http://images.cnitblog.com/blog/387325/201401/270145334695039.jpg" alt="" width="619" height="251"></p>
<p>转换的拿到的是下面四个文件：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/01/27/270145469692715.jpg" data-source="http://images.cnitblog.com/blog/387325/201401/270145469692715.jpg" alt=""></p>
<p>用下面一段代码测试下结果：</p>

```
<style type="text/css">
@font-face {
    font-family: 'barretregular';
    src: url('./font/barret-webfont.eot');
    src: url('./font/barret-webfont.eot?#iefix') format('embedded-opentype'),
         url('./font/barret-webfont.woff') format('woff'),
         url('./font/barret-webfont.ttf') format('truetype'),
         url('./font/barret-webfont.svg#barretregular') format('svg');
    font-weight: normal;
    font-style: normal;

}
div {
    font-family: "barretregular";
    font-size:50px;
}
</style>

<div>
    B​C​D​E​F​G​H​I
</div>

```

<p>也可以直接戳这个 <a href="http://qianduannotes.duapp.com/demo/testFont/index.html" target="_blank">DEMO</a></p>
<p>字体文件下载：<a href="http://files.cnblogs.com/hustskyking/font.rar" target="_blank">barret.ttf and others</a></p>
<h3>二、@font-face细节</h3>
<p>根据 CSS3 草案中的描述，'@font-face' 规则允许使用链接到需要时自动激活的字体。这使得用户可以使用在线的字体，而不仅仅拘泥于使用用户端系统内的字体。font-face，拆开来理解，字体的面孔。不管是什么样的面孔，对应的还是同一个码位，而网页设计者需要使用不同的字体来匹配当前的设计。</p>
<h4>1. local()</h4>
<p>上面的教程中我给出了两个测试，一个是本地测试，一个是网页测试，本地测试之前需要先安装字体，如果本地已经有 barret 这个字体了，那我们的程序便没有必要在重新去网络上下载这个字体了。这是 CSS 程序应该这样写：</p>

```
@font-face {
    font-family: 'barretregular';
    src: local("barret"),
         url('./font/barret.ttf');
}

```

<p>在解析的时候，会先从本地查找是否有 barret 字体，如果没有就忽略 local 语句，如果有的话就直接应用，忽略后面的 url 参数。除了获取本地字体的作用之外，他还有另外一个 hack 用途，看下面这段程序：</p>

```
@font-face {
    font-family: 'barretregular';
    src: url('./font/barret-webfont.eot');
    src: local("☺"),
         url('./font/barret-webfont.eot?#iefix') format('embedded-opentype'),
         url('./font/barret-webfont.woff') format('woff'),
         url('./font/barret-webfont.ttf') format('truetype'),
         url('./font/barret-webfont.svg#barretregular') format('svg');
}

```

<p>代码中包含 local("☺")，local 中是一个笑脸，很显然，这绝对不是一个字体名字，那他的作用是什么呢？前面我们说了，低版本IE 只支持 eot 文件格式的字体，上面的代码中用到了两个 src，低版本IE会应用第一个 src 的结果，但是，他的解析不会在第一个 src 位置停止，而是继续往后读，看到后面的 src 会发送一个无效的 http 请求。若在 url 前加一个 local 可以阻断这个 http 请求的发送。</p>
<h4>2. unicode-range</h4>
<p>他的作用是定义字体支持的 Unicode 字符范围，以 "U+" 或者 "u+" 开头，默认是 "U+0-10FFFF"。</p>
<p>unicode-range 有三种形式：</p>
<ol>
<li>点，e.g. U+416</li>
<li>分段，e.g. U+400-U+4ff</li>
<li>通配符，e.g. U+4??(U+400-U+4FF)</li>
</ol>
<p>举几个例子：</p>
<ol>
<li>大小写字符以及标点符号

```
unicode-range: U+0021-U+007B;

```

</li>
<li>大小写字符和数字

```
unicode-range:
    U+0030-U+0039, / 0-9 *
    U+0041-U+005A, / Uppercase A-Z /
    U+0061-U+007A; / Lowercase a-z /

```

</li>
<li>小写字母，大写字母 T，和 "." 号

```
unicode-range:
    U+0054-U+0054, / T /
    U+0061-U+007A, / a-z /
    U+002E-U+002E; / . (period) */

```

</li>
</ol>


<p>这玩意儿有啥用途呢？</p>
<blockquote>
<p><code>@font-face</code> 有相关属性 <code>unicode-range</code>，可用类似这样的一段 CSS 来指定以中文字体显示弯引号（这是 CSS3 特性，支持还不广泛，但对于这种非关键样式来说够用了）：</p>

```
@font-face {
    font-family: "Chinese Quotes";
    src: local("Some Chinese Font");
    unicode-range: U+2018-2019, U+201C-201D;
}
body {
    font-family: "Chinese Quotes", "Some Latin Font",
                 "Some Chinese Font", generic-family;
}

```

<p>同理，这一招也可以用于破折号、间隔号等和西文标点共享码位的中文标点。</p>
</blockquote>
<p>可以戳知乎上的<a href="http://www.zhihu.com/question/20597706" target="_blank">这一贴</a>。</p>
<h3>三、优缺点</h3>
<p>优点有一大堆，图标的颜色可以随意修改，大小也是可以随便控制的，不需要折腾图片与文字的对齐问题，因为他本身就是文字，还可以使用阴影、文字渐变等 CSS3 的效果，总之就像操作一般字体一样处理他们，该有的特点都有。</p>
<p>缺点也是十分明显的，慢速网络以及翻墙代理下情况特别糟糕。外国很多网站的页面都使用了网络字体，而网络字体下载是需要时间的，有些字体可能还比较大，在下载完毕之前，页面有文字的地方都没有渲染出来，体验不好的情况需要等待三五秒中。不过这种情况还是可以优化的，先用一般字体顶替样式，等下载完毕了再利用 JS 来重新渲染，不过这个代码比较高，而且也不好判断何时下载完成了。</p>
<h3>四、小结</h3>
<p>本文的目的是展示 web icon 的从无到有的一个过程，一些网站提供了很多不错的 webIcon 字库，如果有需求可以直接去网站上下载，自己制作的话成本太高。</p>
<h3>五、参考资料</h3>
<ul>
<li><a href="http://www.w3.org/TR/css3-fonts/#the-font-face-rule" target="_blank">http://www.w3.org/TR/css3-fonts/#the-font-face-rule</a> W3.ORG</li>
<li><a href="http://www.w3help.org/zh-cn/causes/RF1001" target="_blank">http://www.w3help.org/zh-cn/causes/RF1001</a> W3Help</li>
<li><a href="http://www.php100.com/manual/css3_0/@font-face.shtml" target="_blank">http://www.php100.com/manual/css3_0/@font-face.shtml</a> Font-Face</li>
<li><a href="http://www.fontsquirrel.com/fontface/generator" target="_blank">http://www.fontsquirrel.com/fontface/generator</a> Tool</li>
</ul>

