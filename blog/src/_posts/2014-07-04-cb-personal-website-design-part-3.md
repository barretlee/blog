---
title: 个人网站架构设计(三) - 从设计到前端到后台
categories:
  - 前端杂烩
tags:
  - tech
  - cnblogs
date: 2014-07-04 06:06:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2014/07/04/personal-website-design-part-3.html" target="_blank">博客园</a>.</div>

<p>网站地址：<a href="http://barretlee.com">http://barretlee.com</a></p>
<p>在五月份，写过两篇博客，提到了要给自己做个网站，当时人在实习，没太多的时间，只是把大概的思路捋了一番，顺道也买了个云主机（配置比较低，内存才500M）。接着返校处理毕业事宜，于是六月也随着同学之间挥泪告别的声音渐渐远去。七月，家里呆着，中旬回公司。想必这也是我近几年最长的一次假期了=。 =</p>
<h3><span>一、先说设计</span></h3>
<h4>1. 阮一峰的博客</h4>
<p>目前我的博客设计是 fork 了 BeiYuu 的主题，然后七改八改，除了主页 BeiYuu 还认得出是他的之外，其他页面已经动了很大的手术，而这些手术灵感都是源自阮一峰阮大大（我的博客地址是&lt;barretlee.com&gt;，正文部分基本是抄袭他的设计，虽然代码是我重新敲的...）。</p>
<p>阮教授自2003年开始经营他的博客ruanyifeng.com，到目前为止已有十一载，期间肯定也是改版了N次。在多次的改版之后，整个网站，结构上，几乎没有太多的冗余，内容上，更不用说，每一篇都是深入浅出、鞭辟入里，绝对可以给32个赞，想表达的内容全部十分清晰地呈现给了读者，阮大大的文字功底，我辈望尘莫及。</p>
<p>他的博客涉及面广，而且网站的设计上也是花够了心思，在观察他的博客设计时，想到了一些问题。</p>
<ul>
<li>读者进入页面，他最关注的是什么？</li>
<li>通过什么方式来突出文章的重点和亮点？</li>
<li>网站主页展示哪些元素？</li>
<li>如何去表述一个比较新的技术点或者观点？</li>
</ul>
<p>自己的鄙见我就不发表了，不过上面提到的几个问题都是值得去思考的。</p>
<h4>2. 张鑫旭的博客</h4>
<p>张鑫旭大哥，也是通过博客认识的，后来才发现，我与他同是华中科技大学[校友]，再后来又发现，我竟然与他是同一个技术团队（学校&middot;网络应用研发中心）的成员[队友]，再后来还发现，我竟然早就跟他在同一个群里[朋友]。</p>
<p>很多人提到张鑫旭的博客，都说\就是那个喜欢张含韵的人的博客啦"，我倒是问过他，他说测试图片前几张正好是张含韵，顺手选中拿出来。。他的博客也是十分有特色的：</p>
<ul>
<li>专注点很集中 - 前端，而且是小而美的研究，很赞</li>
<li>文风 - 很能扯淡，喜欢的人竖拇指，不喜欢的人觉得罗里吧嗦</li>
</ul>
<p>思考的两个问题：</p>
<ul>
<li>如何让别人一眼发现，\哦，这是那个xxx的博客"？</li>
<li>博客先是记录自己，然后变成服务他人。</li>
</ul>
<h4>3. 简书</h4>
<p>简书的口号就是\找回文字的力量"，我不太喜欢文字（基本没看过小说），所以没有仔细品味简书里面的东西，但却对他网站视觉的设计很感兴趣。简洁大方，有书的味道，整个体验很有质感。</p>
<p>我是个程序猿，不算射鸡湿。如果文章呈现的内容太多，我会hold不住整体的布局，所以会比较中意简洁的设计，简洁的另一个好处就是突出正文，内容很直观的被呈现出来。</p>
<p>以上我列举了三个网站，不用想，肯定又会去抄他们了，囧。。。但其实我参考的网站有十几个，把十几个网站（我觉得）突出的地方整合进了自己的设计，请不要喷我这个不懂设计的程序猿。</p>
<h3>二、从设计到前端实现</h3>
<p>正常的流程是设计-&gt;设计稿-&gt;切图，我跳过了设计稿，直接开始敲代码，貌似自己对代码的亲切度比PSD图片更高（所以为什么总说撸代码呢...）。</p>
<p>设计很简单，故意弱化设计以强化内容，希望能够取长补短。</p>
<h4>1. 正文的设计与实现</h4>
<p>正文的设计参考了简书，但是简书是一个以文字为中心的网站，图片都很少出现。而对于一个博客来说，有几个元素十分重要：代码、引用块、图片、表格、list列表等等。所以这些元素的展示要自己来设计。</p>
<p>细节上的东西，只要进入网站就能看到，所以在这里就不赘述太多。代码的高亮使用的是 prettify 的 light 主题，对它做了微调。</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/07/04/041833036684651.jpg" data-source="http://images.cnitblog.com/i/387325/201407/041833036684651.jpg" alt=""></p>
<p>代码块滚动条的样式也修改了下：</p>

```
pre::-webkit-scrollbar {width:10px;height:10px;background:#F6F6F6;border-top:1px solid #CCC;padding-top:1px;}
pre::-webkit-scrollbar-thumb {background:#EEE;border-radius:5px;border:1px solid #CCC;border-bottom:0px;}
pre::-webkit-scrollbar-thumb:hover {background:#DDD;}
pre::-webkit-scrollbar {width:10px;height:10px;background:#CCC;}
pre::-webkit-scrollbar-thumb {background:#999;border-radius:5px;}
pre::-webkit-scrollbar-thumb:hover {background:#666;}
pre::-webkit-scrollbar-corner {background:#CCC;}
pre::-webkit-color-swatch {border:none;}

```

<p>效果是这样的：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/07/04/041833144027230.jpg" data-source="http://images.cnitblog.com/i/387325/201407/041833144027230.jpg" alt=""></p>
<p>整个设计都是扁平化，没有圆角，看起来感觉还算舒服，下面是引用块的样式呈现：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/07/04/041833217461008.jpg" data-source="http://images.cnitblog.com/i/387325/201407/041833217461008.jpg" alt=""></p>
<p>由于一些代码是可以直接运行的，所以也给可运行代码加上了一个运行的 button：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/07/04/041833297309613.jpg" data-source="http://images.cnitblog.com/i/387325/201407/041833297309613.jpg" alt=""></p>
<p>在IE下，是使用一个 about:blank 的空白页打开代码文件，如果浏览器支持 blob 流，将会使用 blob 流打开：</p>

```
if (!operation.isIE()) {
    window.open(URL.createObjectURL(new Blob([code], {
        type: "text/html; charset=UTF-8"
    })));
} else {
    var d = window.open("about:blank").document;
    d.write(code);
    d.close();
}

```

<h4>2. 侧边栏的设计与实现</h4>
<p><strong>1) 侧边栏-未展开</strong></p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/07/04/041800594809334.jpg" data-source="http://images.cnitblog.com/i/387325/201407/041800594809334.jpg" alt=""></p>
<p>从上图可以看到，侧边栏都是一些功能按钮，从上往下依次是：显示隐藏文章目录，页面主题和字体设置，关于作者，反馈信息，RSS订阅。</p>
<p><span>为啥要搞个侧边栏，还放那么多的功能按钮？就拿司徒正美的博客来说，我在群里吐槽了他博客风格好几次（被骂回来了...理由是每个人审美观不一样），你可以去瞅瞅他的页面，代码字体实在是太小了，每次看他的博客都会把字号和行高调大一点，后来直接写个脚本放在收藏夹，进入他的网页一键处理。</span></p>
<p>这个例子说明，每个人的口味不一样。一个网站，倘若冷暖色调，字体大小等可以自定义的话就更棒了，我没做那么复杂，就是给文章加了个黑色主题。</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/07/04/041801196217820.jpg" data-source="http://images.cnitblog.com/i/387325/201407/041801196217820.jpg" alt=""></p>
<p>通过这个按钮可以进行相应的设置。然后是侧边栏下面的几个按钮：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/07/04/041801255273825.jpg" data-source="http://images.cnitblog.com/i/387325/201407/041801255273825.jpg" alt=""></p>
<p>\跟我对话"点击之后会在右下角往上蹦出一个浮层：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/07/04/041801309658987.jpg" data-source="http://images.cnitblog.com/i/387325/201407/041801309658987.jpg" alt=""></p>
<p>这个浮层是可拖动的。</p>
<p><strong>2) 侧边栏-展开</strong></p>
<p>做了个未展开的侧边栏其实也差不多了，后来发现我的页面中好像并没有\文章归档"，\最新文章"，\最近评论"等这些对一个博客来说很常见的元素，于是乎，抄袭了下豆瓣FM的设计，弄了下面的东西：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/07/04/041801372622578.jpg" data-source="http://images.cnitblog.com/i/387325/201407/041801372622578.jpg" alt=""></p>
<p>这块效果还挺难做的，主要是滚动不好处理。左侧是一个 fixed 定位，容器的高度是死的，也就是 <code>$(window).height()</code> 的高度，blabla.. 细节我不说了，如果你感兴趣可以去思考下如何实现类似豆瓣FM左侧的功能块。我后来是监听鼠标滚动设置负margi-top值来模拟页面滚动。并且这个监听是在整个 document 而不是仅仅是 左侧的 box 上。</p>
<p>整体效果实现并不复杂，麻烦的是一些细节处理。</p>
<h4>2. 底部的设计与实现</h4>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/07/04/041801445126326.jpg" data-source="http://images.cnitblog.com/i/387325/201407/041801445126326.jpg" alt=""></p>
<p>底部的设计我最纠结的是内容，到底放点什么东西。跟文章相关度最高的，一是相关文章，二是评论，所以也就只把这两样放上了。</p>
<h3>三、后台设计和数据库</h3>
<p>开始想过后台用 wordpress 或者其他的框架系统来构建，但是这些东西提供的接口比较冗余，而且功能复杂，没有全盘研究过他们的源码，最后决定自己写一套后端框架以及前后端接口，工作量立马就上去了... 我也是想趁此机会回顾下 php 和 mysql 的知识，太久不用都生疏了。</p>
<h4>1. 旧博客写入数据库</h4>
<p>以前的博客都是使用 Markdown 语法写的，Markdown 的优点就是简洁清晰，但是在解析的时候总是会有这样那样的问题，并且很多 Markdown 解析工具都不支持给元素添加 id 或者 class，这让人很纠结。所以存入数据的文章已经解析成 HTML 了。</p>
<p>Github pages 支持 jekyll 语法，jekyll 允许使用 Markdown，使用 jekyll 语法写的文章内容中多了很多 `{{xxx.xxx}}`</p>
<p>对头部的解析也没啥好办法，就是使用正则来匹配：</p>

```
$html = file_get_contents($path);
$reg = "/---\n\s*layout:\s*[\s\S]+?\ntitle:\s*(?<title>[\s\S]+?)\n"
  . "description:\s*(?<description>[\s\S]+?)\ncategory:\s*"
  . "(?<category>[\s\S]+?)\n(tags:\s*(?<tags>[\s\S]+?)\n)?---\n(?<content>[\s\S]+)/";

preg_match_all($reg, $html, $match);

```
</content></tags></category></description></title>
<p>由于文章并没有集中放在一个文件夹，写了个遍历文件夹的 travel 函数：</p>

```
function traverse($path = '.') {
    $current_dir = opendir($path);
    while(($file = readdir($current_dir)) !== false) {
        $sub_dir = $path . DIRECTORY_SEPARATOR . $file;
        if($file == '.' || $file == '..') {
            continue;
        } else if(is_dir($sub_dir)) {
            //echo 'Directory ' . $file . ':<br>';
            traverse($sub_dir);
        } else {
            //echo 'File in Directory ' . $path . ': ' . $file . '<br>';
            dealFile($path . DIRECTORY_SEPARATOR . $file);
        }
    }
}   

```

<p>这里需要注意的是，存入数据库之前要处理一些单双引号/UTF-16字符，否则存入的时候会出错。</p>

```
function remSpecialChars($string) {
    $string = stripslashes($string);
    $string = preg_replace("/'/","<#039;",$string);
    $string = preg_replace('/"/','<quot;',$string);
    return $string;


```

<p>取出的时候还原单双引号：</p>

```
function addSpecialChars($string) {
    //  $string = htmlspecialchars($string);
    $string = preg_replace("/<#039;/","'",$string);
    $string = preg_replace('/<quot;/','"',$string);
    return $string;
}

```

<h4>2. 网页各个模块的处理</h4>
<p>网页中，正文、底部和边栏需要数据，所以数据的查询主要是针对这三块。</p>
<p><span>目前这三块数据是后台直接同时输出的，稍微想想就知道这个效率并不高，后续肯定会改成异步接口。封装之后，获取并渲染一篇文章就变得异常轻松了：</span></p>

```
include 'page.class.php';

$page = new PageInitor();

# 正文内容
$post = $page->getPageByTitleEn($_GET['title']);
# 底部和侧边内容
$otherData = $page->getPostOtherData();

```

<p>后台数据的渲染都是：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/07/04/041859003714166.jpg" data-source="http://images.cnitblog.com/i/387325/201407/041859003714166.jpg" alt=""></p>
<p>如果改成前端异步获取，那前端又得写一套模板渲染数据，这里感觉流程上存在冗余，后期肯定会改进。</p>
<h4>3. 内容的解析</h4>
<p>文章内容的编写还是使用Markdown，尽管他在某些地方不能满足我的需求。内容的解析使用的是 michelf 的 php-markdown 开源框架：</p>

```
$cotent = file_get_contents($path);
$html = Markdown::defaultTransform($content);

```

<p>使用起来也是十分方便，但是上面的函数只能解析一些基础的 Markdown 格式，诸如图片、表格等解析不出来。这需要引入：</p>

```
# Get Markdown class
use \Michelf\Markdown;
use \Michelf\MarkdownExtra;

# 然后使用
MarkdownExtra::defaultTransform($content)

```

<p>使用 MarkdownExtra 的类来解析， MarkdownExtra 是继承 <code>\Michelf\_MarkdownExtra_TmpImpl</code> 的。</p>
<h3>四、服务器的设置和维护</h3>
<p>目前使用 apache 作为服务器已经够用了，需要缓存的页面也并不多，就是几个列表页和搜索页，所以这方面可以采用技术成熟的 memcache 来处理，只不过后期在同一台服务器上会搭建多个网站，每个网站对应的域名不一样，并且有些网站的后台会使用 nodeJS 来编写，所以还是需要 Nginx 来配置 Virtual Host，Apache 也可以实现 Vhost 的配置，我在本地测试的时候就是使用的 apache 的 Vhost，这里也简单说说 vhost 的配置。</p>
<h4>1. apache 的 vhost 配置</h4>
<p>配置步骤如下：</p>
<ol>
<li>在 httpd.conf 中开启 vhost 模块，并 include 其配置文件 httpd-vhosts.conf</li>
<li>在 httpd-vhosts.conf 写入</li>
</ol>

```
# 这是配置 localhost 这个"域名"
<virtualhost *:80="">
    ServerAdmin i@localhost
    DocumentRoot "E:/wamp/www"
    ServerName localhost
    ServerAlias localhost
    ErrorLog "logs/localhost.log"
    CustomLog "logs/localhost-access.log" common
</virtualhost>

# 这是配置 test.barretlee.com 这个域名
<virtualhost *:80="">
    ServerAdmin test@barretlee.com
    DocumentRoot "E:/wamp/www/barretlee"
    ServerName test.barretlee.com
    ErrorLog "logs/test.barretlee.com-error.log"
    CustomLog "logs/test.barretlee.com-access.log" common
</virtualhost>

```

<p>因为网上对这方面的配置有详细说明，我也不是行家，就不细说了。</p>
<h4>2. Rewrite模块</h4>
<p>其实就是网页的静态化，我们看到的php页面是：</p>

```
 /index.php?id=23

```

<p>但是我们更希望通过这种方式来获取页面：</p>

```
/index.php/23

```

<p>URL 需要进行重写，算是内部重定向吧。这方面的工作可以交给 Nginx 来处理，也可以交给 Apache，由于我本地目前还只配置了 Apache，所以先看看 Apache 的配置方式：</p>
<p><strong>1) 使用了Vhost</strong></p>

```
<virtualhost *:80="">
    ServerAdmin test@barretlee.com
    DocumentRoot "E:/wamp/www/barretlee"
    ServerName test.barretlee.com
    ErrorLog "logs/test.barretlee.com-error.log"
    CustomLog "logs/test.barretlee.com-access.log" common

    <directory e:\wamp\www\barretlee="">
        Options FollowSymLinks
        AllowOverride None
        Order deny,allow
        Allow from all

        RewriteEngine on
        RewriteRule ^blog/(\d+)/(\d+)/(.*).html$ index.php?title=$3<year=$1<month=$2
        RewriteRule ^static/(.*)$ static/$1
    </directory>
</virtualhost>

```

<p>如果使用了 Vhost，可以在配置里写上 <code>RewriteEngine on</code>，然后加上需要的 RewriteRule 规则就行了。</p>
<p><strong>2) 没有使用 Vhost</strong></p>
<p>在网页所在文件的根目录下，新建一个 <code>.htaccess</code> 文件，里头写上：</p>

```
RewriteEngine on
RewriteBase /barretlee
RewriteRule ^blog/(\d+)/(\d+)/(.*).html$ index.php?title=$3<year=$1<month=$2
RewriteRule ^static/(.*)$ static/$1

```

<p>重定向的内容就行了。</p>
<p>第二种方式会存在一个问题，如果你的资源请求在 /barretlee 的上一层或者上几层，那么这里的正则就会匹配不到了，所以建议使用 Vhost 来配置自己的 Apache。</p>
<h3>五、后期优化和改进</h3>
<p>上面说了这么多，都是这七天来建站的总结，目前的状态是，博客系统已经搭建完毕，但是没有写博客和管理博客的后台，这又是件头疼的事情，不过还好，后台之后自己看得见，就随意一些。也没有归档页面、分类页等页面，这些页面的设计也是伤脑细胞的。</p>
<p>整个网站，博客系统只是一个部分，还有其他的问答平台、好文的爬虫抓取、每月期刊、每周好文推送、邮件系统等等，工程量还蛮大，这对我来说也是一个挑战，可以尽情发挥自己的技能，也是个深度学习的好机会！</p>
<p>页面的加载，首屏时间不能忍受，如果文章篇幅比较大，大约需要1.5到3s才渲染完毕，这个值有点不能忍受。优化方向有：</p>
<ul>
<li>PJAX，页面采用 pushState + AJAX，减少请求，不支持 pushState 的页面采用 hash bang 兼容处理。</li>
<li>bigPipe，如果文章内容比较多，或者其他的模块有所增加，会采用 bigPipe 分拨往前端扔数据。</li>
<li>前后端统一模板，之前也提到了这个问题，后端渲染的时候使用的后端模板，如果前端要异步加载，则需要重新写一套模板来解析合并数据，这两个模板的相似度是很高的，如果可以复用将减少很多工作量。</li>
<li>静态数据的缓存问题</li>
<li>ETag等对页面的标记缓存问题</li>
</ul>
<h3>六、小结</h3>
<p>我最怕的是事情没有一个开始，现在既然已经开始了，我想，离结束也就不远了。</p>

