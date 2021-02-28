---
title: 五种开源协议的比较(BSD,Apache,GPL,LGPL,MIT) – 整理
categories:
  - 剪贴板
tags:
  - tech
  - cnblogs
warning: true
date: 2013-08-13 10:17:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/08/13/license.html" target="_blank">博客园</a>.</div>

<p>当Adobe、Microsoft、Sun等一系列巨头开始表现出对"开源"的青睐时，"开源"的时代即将到来！</p>
<p>最初来自：sinoprise.com/read.php?tid-662-page-e-fpage-1.html（遗憾的是这个链接已经打不开了），我基本未改动，只是进行了一些排版和整理。参考文献：<a href="http://www.fsf.org/licensing/licenses/">http://www.fsf.org/licensing/licenses/</a></p>
<p>现今存在的开源协议很多，而经过Open Source Initiative组织通过批准的开源协议目前有58种（<a href="http://www.opensource.org/licenses/alphabetical">http://www.opensource.org/licenses/alphabetical</a>）。我们在常见的开源协议如BSD, GPL, LGPL,MIT等都是OSI批准的协议。如果要开源自己的代码，最好也是选择这些被批准的开源协议。</p>
<p>这里我们来看四种最常用的开源协议及它们的适用范围，供那些准备开源或者使用开源产品的开发人员/厂家参考。</p>
<p><strong>BSD开源协议（</strong><a href="http://www.fsf.org/licensing/licenses/index_html#OriginalBSD">original BSD license</a><strong>、</strong><a id="FreeBSD" name="FreeBSD" href="http://www.freebsd.org/copyright/freebsd-license.html">FreeBSD license</a><strong>、</strong><a id="OriginalBSD" name="OriginalBSD" href="http://www.xfree86.org/3.3.6/COPYRIGHT2.html#6">Original BSD license</a><strong>）</strong></p>
<p>BSD开源协议是一个给于使用者很大自由的协议。基本上使用者可以"为所欲为",可以自由的使用，修改源代码，也可以将修改后的代码作为开源或者专有软件再发布。</p>
<p>但"为所欲为"的前提当你发布使用了BSD协议的代码，或则以BSD协议代码为基础做二次开发自己的产品时，需要满足三个条件：</p>
<ol>
<li>如果再发布的产品中包含源代码，则在源代码中必须带有原来代码中的BSD协议。</li>
<li>如果再发布的只是二进制类库/软件，则需要在类库/软件的文档和版权声明中包含原来代码中的BSD协议。</li>
<li>不可以用开源代码的作者/机构名字和原来产品的名字做市场推广。</li>

</ol>
<p>BSD 代码鼓励代码共享，但需要尊重代码作者的著作权。BSD由于允许使用者修改和重新发布代码，也允许使用或在BSD代码上开发商业软件发布和销售，因此是对商业集成很友好的协议。而很多的公司企业在选用开源产品的时候都首选BSD协议，因为可以完全控制这些第三方的代码，在必要的时候可以修改或者二次开发。</p>
<p><strong>Apache Licence 2.0（</strong><a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</a>、<a href="http://www.apache.org/LICENSE-1.1">Apache License, Version 1.1</a>、<a href="http://www.apache.org/LICENSE-1.0">Apache License, Version 1.0</a><strong>）</strong></p>
<p>Apache Licence是著名的非盈利开源组织Apache采用的协议。该协议和BSD类似，同样鼓励代码共享和尊重原作者的著作权，同样允许代码修改，再发布（作为开源或商业软件）。需要满足的条件也和BSD类似：</p>
<ol>
<li>需要给代码的用户一份Apache Licence</li>
<li>如果你修改了代码，需要再被修改的文件中说明。</li>
<li>在延伸的代码中（修改和有源代码衍生的代码中）需要带有原来代码中的协议，商标，专利声明和其他原来作者规定需要包含的说明。</li>
<li>如果再发布的产品中包含一个Notice文件，则在Notice文件中需要带有Apache Licence。你可以在Notice中增加自己的许可，但不可以表现为对Apache Licence构成更改。</li>

</ol>
<p>Apache Licence也是对商业应用友好的许可。使用者也可以在需要的时候修改代码来满足需要并作为开源或商业产品发布/销售。</p>
<p><strong>GPL（</strong><a id="GNUGPL" name="GNUGPL" href="http://www.fsf.org/licensing/licenses/gpl.html">GNU General Public License</a><strong>）</strong></p>
<p>我们很熟悉的Linux就是采用了GPL。GPL协议和BSD, Apache Licence等鼓励代码重用的许可很不一样。GPL的出发点是代码的开源/免费使用和引用/修改/衍生代码的开源/免费使用，但不允许修改后和衍生的代码做为闭源的商业软件发布和销售。这也就是为什么我们能用免费的各种linux，包括商业公司的linux和linux上各种各样的由个人，组织，以及商业软件公司开发的免费软件了。</p>
<p>GPL协议的主要内容是只要在一个软件中使用(\使用"指类库引用，修改后的代码或者衍生代码)GPL 协议的产品，则该软件产品必须也采用GPL协议，既必须也是开源和免费。<strong>这就是所谓的"传染性"</strong>。GPL协议的产品作为一个单独的产品使用没有任何问题，还可以享受免费的优势。</p>
<p>由于GPL严格要求使用了GPL类库的软件产品必须使用GPL协议，对于使用GPL协议的开源代码，商业软件或者对代码有保密要求的部门就不适合集成/采用作为类库和二次开发的基础。</p>
<p>其它细节如再发布的时候需要伴随GPL协议等和BSD/Apache等类似。</p>
<p><strong>LGPL（</strong><a id="LGPL" name="LGPL" href="http://www.fsf.org/licensing/licenses/lgpl.html">GNU Lesser General Public License</a><strong>）</strong></p>
<p>LGPL是GPL的一个为主要为类库使用设计的开源协议。和GPL要求任何使用/修改/衍生之GPL类库的的软件必须采用GPL协议不同。LGPL允许商业软件通过类库引用(link)方式使用LGPL类库而不需要开源商业软件的代码。这使得采用LGPL协议的开源代码可以被商业软件作为类库引用并发布和销售。</p>
<p>但是如果修改LGPL协议的代码或者衍生，则所有修改的代码，涉及修改部分的额外代码和衍生的代码都必须采用LGPL协议。因此LGPL协议的开源代码很适合作为第三方类库被商业软件引用，但不适合希望以LGPL协议代码为基础，通过修改和衍生的方式做二次开发的商业软件采用。</p>
<p>GPL/LGPL都保障原作者的知识产权，避免有人利用开源代码复制并开发类似的产品</p>
<p><strong>MIT（<a href="http://www.opensource.org/licenses/mit-license.php">MIT</a>）</strong></p>
<p>MIT是和BSD一样宽范的许可协议,作者只想保留版权,而无任何其他了限制.也就是说,你必须在你的发行版里包含原许可协议的声明,无论你是以二进制发布的还是以源代码发布的.</p>
<p id="gulink">本文来自：<a title="五种开源协议的比较(BSD,Apache,GPL,LGPL,MIT) – 整理" href="http://www.awflasher.com/blog/archives/939">http://www.awflasher.com/blog/archives/939</a></p>



