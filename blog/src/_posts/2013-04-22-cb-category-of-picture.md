---
title: 最受欢迎的几种图片格式及其常见用法
categories:
  - 剪贴板
  - 杂物间
tags:
  - tech
  - cnblogs
warning: true
date: 2013-04-22 06:18:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/04/22/category-of-picture.html" target="_blank">博客园</a>.</div>

<p><span>　　从某种程度上说，判断一个网页设计师是否优秀，可以从其在WEB开发（或网页设计）中是否合理的采用各种图片格式得出结论。事实上，或许所有人都知道图片存在GIF,JPG和PNG等格式，但并非所有人都知道它们之间的具体区别和使用技巧。</span><span>　　接下来，将给大家介绍：WEB开发中几种最受欢迎图片格式的前世今生以及如何正确的使用它们。</span></p>
<h3>JPEG</h3>
<p><span>　　JPEG格式是一种大小与质量相平衡的压缩图片格式。通俗一点讲，就是：高的压缩比=低的图片质量=小的文件大小。反之，低的压缩比=高的图片质量=大的文件大小。由于JPEG文件无法保持100 ％的原始图像的像素数据，所以它不被认为是一种无损图像格式。</span></p>
<p><strong>用途：</strong><span>　　由于这种极其敏感的平衡特性，JPEG非常适合被应用在那些允许轻微失真的像素色彩丰富的图片（照片）场合。反之，JPEG格式图片并不适合做简单色彩（色调少）的图片，比如LOGO，各种小图标（ICONS）。</span></p>


<h3>GIF</h3>
<p><span>　　GIF格式，是为使图片能够应用在在线（online）应用程序上所特别开发的图片格式。Gif，有时也被成为\Giff"，是一种无损，8位图片格式。\无损"是指100%的保持原始图片的像素数据信息。专业名词\8位"是指，所能表现的颜色深度&mdash;&mdash;一个8位图像仅最多只能支持256种不同颜色（一个多余256种颜色的图片若用gif图片保存会出现失真）。</span></p>
<p><strong>用途：</strong><span>　　由于8位颜色深度的限制，Gif不适合应用于各种色彩过于丰富的照片存储场合。但它却非常适合应用在以下场合：</span></p>
<ul>
<li><span>Logo</span></li>
<li><span>小图标（Icon）</span></li>
<li><span>用于布局的图片（例如某个布局角落，边框等等）</span></li>
<li><span>仅包含不超过256种色彩的简单，小型图片场合</span></li>

</ul>
<p><strong>透明特性：</strong><span>　　GIF支持基本的透明特性，这意味着你能够使图片的某些像素\不可见"。在其被放置到网页中时，我们就可以看到通过这些不可见区域看到此图片后面的背景颜色（图片）。此特性非常有用：如果你需要将某个gif图片的内容置于所有图片的上层，你可以将其设置为透明。</span></p>
<p><strong>压缩特性：</strong><span>　　GIF格式采用LZW算法进行压缩，此算法是Unisys申请的一项专利。在很久很久之前，如果你想使用GIF格式，那么就意味着你需要向Unisys付费申请专利许可。不过值得高兴的是，此项专利技术已于2003年6月20日过期，我们现在可以免费的使用GIF了！</span></p>
<p><strong>隔行扫描：</strong><span>　　GIF同时也支持隔行扫描。隔行扫描能够令图片在浏览器中更快的加载和显示。此特性对于那些慢网速的浏览者来说尤其实用。</span></p>
<p><strong>动画GIF：</strong><span>　　一个动态的GIF文件，是由若干帧图片所联结而成的动态图片。在显示时，这些动态帧被反复的绘制读取出来从而形成了简单的动画效果。合理的运用GIF动画能够为网页增添动静结合的效果，而过度的使用则会使网页杂乱无章。</span></p>


<h3><strong>PNG</strong></h3>
<p><span>　　PNG，读\ping"，初始时被作为GIF的免费替代格式所开发，采用公共专利压缩算法。PNG格式也是一种无损压缩，但与GIF格式不同的是，PNG同时支持8位和24位的图像。</span></p>
<p><strong>8位PNG图像：</strong><span>　　一个8位PNG图片，支持透明背景且像素颜色不能超过256种。除了压缩算法不同之外，此8位PNG格式与GIF格式极其相似；</span></p>
<p><strong>用途：</strong><span>　　8位PNG图片的用途与GIF格式基本相同，</span></p>
<ul>
<li><span>Logo</span></li>
<li><span>小图标（Icon）</span></li>
<li><span>用于布局的图片（例如某个布局角落，边框等等）</span></li>
<li><span>仅包含不超过256种色彩的简单，小型图片场合</span></li>

</ul>


<p><strong>24位PNG图像：</strong><span>　　24位PNG，支持160万种不同的像素颜色且支持Alpha透明效果，这就意味着，无论透明度设置为多少，PNG图片均能够与背景很好的融合在一起。</span></p>
<p><strong>对PNG的支持：</strong><span>　　由于PNG格式的广泛使用和开发者更加重视网页的WEB标准，不同浏览器对PNG的支持就显得相当重要了。不过，幸运的是，目前市场上主流的浏览器对PNG格式都有很好的支持，这包括：IE*, Firefox, Safari, Opera, and Konqueror。</span><span>　　但不幸的是，IE6及IE6以下的浏览器对PNG透明背景的支持并不好。不过我们仍可以通过其他方法来解决这个问题，详情请查看如何在IE6中正常显示透明PNG。</span></p>

