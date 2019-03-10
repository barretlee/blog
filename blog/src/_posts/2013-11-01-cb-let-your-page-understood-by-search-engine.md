---
title: SEO：让搜索引擎对你的网站更有亲和力(译)
categories:
  - 前端杂烩
  - 翻译
tags:
  - tech
  - cnblogs
  - 译文
warning: true
date: 2013-11-01 03:40:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/11/01/let-your-page-understood-by-search-engine.html" target="_blank">博客园</a>.</div>

<p><span>人可以通过查看网站信息了解网站的内容，但是搜索引擎只对标签感兴趣，对内容的识别能力是很低的，如何让蜘蛛通过标签认识你的文章内容呢~</span></p>
<blockquote>
<p>原文网址：<a href="http://schema.org/docs/gs.html">http://schema.org/docs/gs.html</a>本文地址：<a href="http://www.cnblogs.com/hustskyking/p/let-your-page-understood-by-search-engine.html">http://www.cnblogs.com/hustskyking/p/let-your-page-understood-by-search-engine.html</a>译者：<a href="http://www.cnblogs.com/hustskyking/" target="_blank">Barret Lee</a>日期：2013-11-01</p>

</blockquote>
<p>许多站长应该对HTML标签十分熟悉，HTML标签告诉浏览器如何去呈现标签的内容，比如<code>&lt;h1&gt;阿凡达&lt;/h1&gt;</code>，告诉浏览器用大标题的形式显示\阿凡达"。但是，HTML标签本身并没有给出任何信息标识其中的内容，因此搜索引擎也无法智能地将相关的信息呈现给用户。</p>
<p><a href="http://schema.org" target="_blank">Schema.org</a>提供了一些相关的词汇，开发者可以用这些词汇嵌入到HTML内容中来强化内容，以便更容易被Google、Microsoft、Yandex以及Yahoo等搜索引擎识别。</p>


<h3>一、如何使用元数据(microdata)来表示内容</h3>
<h4>1.为什么使用元数据</h4>
<p>人去阅读文章可以马上理解网页的相关内容，但是机器理解能力是十分有限的，给你的网页HTML添加一些额外的标签，让这些标签去告诉搜索引擎，\嘿，我描述的是一部电影，一个景点，一位名人或者一首音乐"，这样你就能让搜索引擎理解文章内容，并且让他在搜索结果中可以显示更多相关的内容。<strong>元数据</strong>是HTML5中的一些标签，他可以让你实现上述功能。</p>
<h4>2.itemscope和itemtype</h4>
<p>先举个简单的例子，比如你要显示\阿凡达"这部电影，包括这部电影的导演、类型，介绍，你的HTML代码可能会写成这样：</p>

```
<div>
    <h1>阿凡达</h1>
    <span>导演: James Cameron (生于16-08-1954)</span>
    <span>科幻电影</span>
    <a href="/path/to/obj.html">Trailer</a>
</div>

```

<p>刚开始我们来表示这一块是一个关于电影阿凡达的章节，我们需要给HTML添加itemscope属性</p>

```
<div itemscope="">
    <h1>阿凡达</h1>
    <span>导演: James Cameron (生于16-08-1954)</span>
    <span>科幻电影</span>
    <a href="/path/to/obj.html">Trailer</a>
</div>

```

<p>通过添加itemscope属性，搜索引擎就知道了这个div块表示的是一个特定的内容。为了让这个内容更加具体，我们可以继续添加一个itemtype属性</p>

```
<div itemscope="" itemtype="http://schema.org/Movie">
    <h1>阿凡达</h1>
    <span>导演: James Cameron (生于16-08-1954)</span>
    <span>科幻电影</span>
    <a href="/path/to/obj.html">Trailer</a>
</div>

```

<p>这样蜘蛛就知道了这块的内容是介绍一部电影了。</p>
<h4>3.itemprop</h4>
<p>我们还能为搜索引擎提供什么其他的信息？电影有一些属性，如主演，导演，评分等。为了表示这些属性，我们可以使用itemprop：</p>
<div class="highlight">

```
<div itemscope="" itemtype="http://schema.org/Movie">
    <h1 itemprop="name">阿凡达</h1>
    <span>导演: <span itemprop="director">James Cameron</span> (生于16-08-1954)</span>
    <span itemprop="genre">科幻电影</span>
    <a href="/path/to/obj.html" itemprop="trailer">Trailer</a>
</div>

```

</div>
<h4>4.内嵌一个itemscope</h4>
<p>有时候作为一个itemprop的属性也可以单独出来成为itemscope，比如导演，他是属于Person，Person也有很多诸如名字，生日等属性。</p>
<div class="highlight">

```
<div itemscope="" itemtype="http://schema.org/Movie">
    <h1 itemprop="name">阿凡达</h1>
    <div itemprop="director" itemscope="" itemtype="http://schema.org/Person">
        导演: <span itemprop="name">James Cameron</span> (生于 <span itemprop="birthDate">16-08-1954</span>
    </div>
    <span itemprop="genre">科幻电影</span>
    <a href="/path/to/obj.html" itemprop="trailer">Trailer</a>
</div>

```

</div>


<h3>二、使用 schema.org 提供的属性</h3>
<h4>1.schema.org 提供的类型和属性</h4>
<p>并不是所有的网页都是关于电影和人物介绍的，除了上面我们说到的Movies和Person之外，<a href="http://schema.org">schema.org</a>还提供了一系列的类型，以及这些类型对应的属性。</p>
<p>用的最多的是Thing这个类型，他有四个属性，name、description、url、image。这个类型对很多内容都实用。下面是一些常用的类型和属性：</p>
<ul>
<li>Creative works: <a href="http://schema.org/CreativeWork" target="_blank">CreativeWork</a>, <a href="http://schema.org/Book" target="_blank">Book</a>, <a href="http://schema.org/Movie" target="_blank">Movie</a>, <a href="http://schema.org/MusicRecording" target="_blank">MusicRecording</a>, <a href="http://schema.org/Recipe" target="_blank">Recipe</a>, <a href="http://schema.org/TVSeries" target="_blank">TVSeries</a> ...</li>
<li>Embedded non-text objects: <a href="http://schema.org/AudioObject" target="_blank">AudioObject</a>, <a href="http://schema.org/ImageObject" target="_blank">ImageObject</a>, <a href="http://schema.org/VideoObject" target="_blank">VideoObject</a></li>
<li><a href="http://schema.org/Event" target="_blank">Event</a></li>
<li><a href="http://schema.org/Organization" target="_blank">Organization</a></li>
<li><a href="http://schema.org/Person" target="_blank">Person</a></li>
<li><a href="http://schema.org/Place" target="_blank">Place</a>, <a href="http://schema.org/LocalBusiness" target="_blank">LocalBusiness</a>, <a href="http://schema.org/Restaurant" target="_blank">Restaurant</a> ...</li>
<li><a href="http://schema.org/Product" target="_blank">Product</a>, <a href="http://schema.org/Offer" target="_blank">Offer</a>, <a href="http://schema.org/AggregateOffer" target="_blank">AggregateOffer</a></li>
<li><a href="http://schema.org/Review" target="_blank">Review</a>, <a href="http://schema.org/AggregateRating" target="_blank">AggregateRating</a></li>
</ul>
<p>这里有一个对类型的列表，<a href="http://schema.org/docs/full.html" target="_blank">戳我</a>。//<span class="barretSay"><strong>Barret Say</strong>：schema给出的列表是规范统一的，对于你要用到的类，他基本上都有定义，不要自己构造他没有提到的类型。试想一下，如果每个人都给自己的内容定义多个类型，那搜索引擎该根据哪个标准来分类了，其结果就跟没有分类是一样的。</span></p>
<h4>2.期望的类型，文字和URL地址</h4>
<p>使用schema.org来标记你的网页时，有几点要注意：</p>
<ul>
<li><strong>除了隐藏的文字，标记越多越好</strong>， 一般来说，给你的文章做越多这样的标记，搜索引擎就越对你的文字有亲和力。但是一定要注意，只标记那些人们看得见的文字，不要标记那些隐藏的文字。</li>
<li><strong>使用类型标注而不是文字</strong>，很多地方我们可以使用itemscope去标注他的内容，尽量少让那些干巴巴的文字放置在哪里。</li>
<li><strong>使用URL属性</strong>，比如我的博客首页有很多文章列表，对列表中的每一篇文章都应用URL的itemscope标记，这样效果会比较好</li>
</ul>
<h4>3.测试你的标记</h4>
<p>Google提供了许多相关的测试工具来测试这些schema标记语法，比如这个：<a href="//support.google.com/webmasters/answer/146645?hl=zh-Hans" target="_blank">google webmasters</a>，你可以用这些工具来检测格式是不是正确。</p>


<h3>三、进阶话题：机器可理解的版本信息</h3>
<p>许多页面可以用itemscope，itemtype以及itemprop来定义，但是有的时候，如果不加另外的注释，搜索引擎是很难理解某些属性的：</p>
<ul>
<li>日期, 时间等: 使用时间标签 datetime</li>
<li>枚举以及引用等: 使用链接标签 href</li>
<li>缺失以及隐含的信息: 使用meta标签 content.</li>
</ul>
<h4>1.时间，日期</h4>

```
<time datetime="2011-04-01">04/01/11</time>
<time datetime="2011-05-08T19:30">May 8, 7:30pm</time>
<time itemprop="cookTime" datetime="PT1H30M">1 1/2 hrs</time>

```

<p>关于这些时间日期格式化的规范，请参看：<a href="http://en.wikipedia.org/wiki/ISO_8601">ISO 8601 date/time standard</a>。</p>
<h4>2.枚举以及引用等</h4>


<h4>3.缺失以及隐含的信息</h4>
<p>因后面几个用的比较少，如果要做具体了解，请移步<a href="http://schema.org/docs/gs.html" target="_blank">原网页</a>。</p>


