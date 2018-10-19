---
title: 网站的SEO以及它和站长工具的之间秘密
description: 博客迁移没有注意 URL 地址的变化，引起百度和 google 这两只爬虫引擎找不到路。近段时间研究了下国内最大搜索引擎百度和国际最大搜索引擎google的站长工具，说下感受。
category:
  - 观点和感想
  - 前端杂烩
tags:
  - 爬虫
  - SEO
warning: true
date: 2015-09-02 15:50:55
---

博客迁移没有注意 URL 地址的变化，导致百度和 google 这两只爬虫引擎短时间内找不到路。近段时间研究了下国内最大搜索引擎百度和国际最大搜索引擎google的站长工具，说下感受。

- 百度的站长工具地址：<http://zhanzhang.baidu.com/dashboard/index>
- google 的站长工具地址: <http://www.google.com/webmasters/tools/home>

最近墙的比较厉害，google 不一定能访问进去（我平时用的 [GreenVPN](http://gjsq.link/)，还挺不错的，速度快，支持的国家也多）。

站长工具的作用是为了辅助开发者，针对自己的网站做出更加合理的网页布局和代码优化，以便让 spider 更好地理解网页，从而将最准确的信息送达到用户的荧屏上。它对搜索引擎和开发者是双赢的。

Web 发展极快，由于客户端厂商纷纭加之开发者没把重点放在 web 标准上，直到 2014 年的 10 月底才有了[统一的标准](http://www.w3.org/TR/2014/REC-html5-20141028/)。用户输入关键词，搜索引擎要在 0.1s 内将网络上的资源汇聚起来，这个过程中计算的开销、数据整合的开销是极大的，如果我们开发的网页不能让 spider 准确理解，最后的结果就是，写的东西很难出现在用户面前。

### 搜索引擎对网页的理解

摸索两个站长工具，感触最深的是结构化数据(Structured Data)，结构化数据不是把文章段落分清楚、标题写清楚，实际上你文章段落分的再清晰，爬虫机器也不知道你在表达什么，所以数据结构化是给爬虫看而不是给人看的。HTML 标签的数量很有限，有限的几个标签没办法表达网页上每一个元素的含义，比如一个小的图标、一个广告位、一个蒙层等，于是网页上出现了很多 class 名、id 名来标记一个元素。这些内容的统一让爬虫理解的略微透彻了一些，比如:

```
.banner: 一张banner广告位
.sidebar: 侧边导航栏
.nav: 主导航
.icon: 页面小图标
.post: 一篇文章
.post-title: 文章标题
```

然而搜索引擎聚合的网页太多，当这些五花八门的 class 出来之后，它又开始迷茫了，难以较好的聚合分类。所以出现一个叫做 Schema 的东西，它用来表示一个结构化数据结构，可以看下面一个 schema 示例：

```html
<div itemscope itemtype="http://schema.org/Person">   
  <span itemprop="name">李靖</span>   
  <img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/09/02/avatar.png" data-source="http://barretlee.com/avatar.png" itemprop="image" />    
  <span itemprop="jobTitle">攻城师</span>   
  <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">     
    <span itemprop="streetAddress">文一西路969号</span>     
    <span itemprop="addressLocality">浙江杭州</span>
    <span itemprop="postalCode">310000</span>   
  </div>   
  <span itemprop="telephone">(0571) 123-4567</span>   
  <a href="mailto:barret.china@gmail.com" itemprop="email">barret.china@gmail.com</a>
  李靖的主页:  <a href="http://barretlee.com" itemprop="url">barretlee.com</a>    
</div> 
```

在一个需要表达的块上加上 `itemscope` 属性和一个 `itemtype` 属性，itemtype 是有固定值的，具体可以参阅 [schema.org](http://schema.org/) 的说明。然后在块内添加详细的说明，使用 `itemprop` 标注。整个操作十分简单，略微麻烦的是需要对照 schema 的官方网站填写规定的 `itemprop` 字段。

结构化数据，通常也可以称之为元数据，这些数据附着在网页文本信息内，厘清了页面上每个部件的功能、属性和意义。当机器进入网页的时候，能够像人一样，一眼瞄出要表达的内容。关于 schema ，以前翻译过一篇文章 [SEO：让搜索引擎对你的网站更有亲和力](http://www.barretlee.com/blog/2013/11/01/cb-let-your-page-understood-by-search-engine/)。

### SEO和站长工具的之间秘密

除非搜索引擎能够猜到你要搜索的具体的 URL 地址，一般地，它都会从自己的数据索引库中扒拉数据。对于权重高、更新频率高、原创内容多的网站，搜索引擎会十分勤快的爬最新内容。那么，如何让搜索引擎知道网站上有多少网页便成了一件重要的事情。

我们经常会听到一个叫做"网站地图"的东西。有些网站会在自己的站点中添加一个页面，这个页面包括了整站的重要入口，那么这个页面就是该页面的网站地图。这些地图是给人看的，如果只想给爬虫引擎看，可以将所有的链接按照一定的格式放到 `sitemap.xml` 文件中，然后把这个文件放到网站的根目录下，如 <http://www.barretlee.com/sitemap.xml>。

而最重要的还是 `robots.txt` 这个文件，它是所有引擎约定俗成的一个文件，比如我的网站中用到的 <http://www.barretlee.com/robots.txt> ，其内容为：

```txt
Sitemap: http://www.barretlee.com/sitemap.xml
User-agent: *
Allow: /
```

它告诉搜索引擎，网站地址的位置、允许蜘蛛爬取的内容等，它是一个协议。最近，貌似还多了一个 `humans.txt`，也是一个比较有意思的文件，可以在这里了解它：<http://www.humanstxt.org.cn/>，它可以描述一些站点和团队的故事。

SEO上，站长工具主要分为两个方面，一个是对网页的抓取，一个是对网页的分析。

网页的抓取在百度站长工具中体现的比较多，而网页的分析，诸如数据标注、结构化数据等，百度做的还比较搓，目前还在内测阶段，需要发送邮件才能申请权限。看到百度站长工具页面上的几个数据标注示意图，揣测应该比 google 弱一百倍，所以我还是重点说说 google 的吧。

#### 网页的抓取

这块上，两个站长工具都是强调让开发者把网站地图显式的暴露给搜索引擎，提供了各种分析网站地图准确性合理性的工具，搜索引擎如果发现你的网站上一个地址时有时无，就会觉得你不可信有点飘渺。所以一旦网页因为改造或迁移导致页面链接丢失，可以在站长工具中填写这些死链。

不要贪婪的让搜索引擎不停的爬取你的网站，如果它多次过来发现内容是一样的，它也会很伤心的离开。而如果它发现每次过来爬你的内容都能找到很有意思的、从来没发现过的东西，它会对你越来越感兴趣，甚至日久天长它会给你定型、定位，然后权重会越来越高。在站长工具上都是可以设置的。

#### 网页的分析

google 的数据化标记做的实在是太赞了！输入网址，它会打开你的网页，设置你要标记的类型，比如文章。选中页面上的元素然后标记。比如选中文章的标题，选中之后有一个菜单，在菜单上选择 title，选中作者名字，然后菜单上选择 author，一个页面标记完了之后，他会分析整站的所有页面，如果结构相似，也会自动标记其他页面。

整个标记完成之后，google 就知道你整个网站的信息架构了，下次要做的就是对这些信息内容做匹配和分类。所以我们可以看到，个人博客在 google 中的搜索是极其靠前的，因为页面的信息结构简单，即便你不去标记，它爬取多次之后也能自己理解。

对比百度和 google ，两者如同屌丝和高富帅。不过高富帅总是要越墙才能看到，所以我平时使用的依然是百度分析。百度分析和百度站长工具还是不一样的。百度对网页流量的分析和搜索词汇的分析还是挺精准，也很有参考价值。

### 小结

本文对 SEO 相关的东西做了一个简要的概述，同时也概括了搜索引擎做的一些工作，知识量有限，难以面面俱到，如有错误还请斧正。




