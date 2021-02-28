---
title: 如何向开源社区提问题
categories:
  - 剪贴板
  - 观点和感想
tags:
  - tech
  - cnblogs
  - 学会提问
date: 2013-04-22 04:24:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/04/22/how-to-ask-quertion.html" target="_blank">博客园</a>.</div>



<p>大家提问题前，请仔细阅读下这篇文章。高质量的提问，不光有助于问题的快速解决，还能赢得社区的尊重。</p>
<hr>
<h1>如何向开源社区提问题</h1>
<p>使用软件产品，或多或少都会遇到问题。对于商业产品，我们可以咨询客服寻求帮助。对于公司自己研发的产品，我们可以直接请教专家同事。但对于开源软件，在遇到问题时，如何才能及时有效地寻求帮助呢？</p>
<p>本文以开源类库&nbsp;<a href="http://seajs.org/">Sea.js</a>&nbsp;为例，说说我心目中的最佳实践。</p>
<h3><a class="anchor" name="-1" href="//github.com/seajs/seajs/blob/master/CONTRIBUTING.md#-1"></a>提问前</h3>
<p>遇到问题时，心里都很着急。在决定向开源社区提交问题前，最好先做做以下功课：</p>
<h4><a class="anchor" name="-2" href="//github.com/seajs/seajs/blob/master/CONTRIBUTING.md#-2"></a><strong>尝试从官方文档中找到答案</strong></h4>
<p>确保自己阅读过至少一次官方文档。这样在遇到问题时，如果能回忆起只言片语，就可以再去读一遍相关文档，问题往往也就解决了。</p>
<h4><a class="anchor" name="google-" href="//github.com/seajs/seajs/blob/master/CONTRIBUTING.md#google-"></a><strong>Google 是你的朋友</strong></h4>
<p>对于成熟的开源项目，你遇到的问题，很可能别人也遇到过。这时通过 Google、StackOverflow 等网站的搜索服务，可以帮你快速定位并解决问题。永远记住，地球上的你并不孤单，包括你遇到的问题。</p>
<h4><a class="anchor" name="-bug-" href="//github.com/seajs/seajs/blob/master/CONTRIBUTING.md#-bug-"></a><strong>挖掘 Bug 宝藏</strong></h4>
<p>开源软件一般都会有自己的 Bug 管理方案，比如 WebKit、V8、jQuery、Sea.js 等等。从它们的官网上找到 Bug 管理地址，然后通过搜索看看有无你遇到的问题。对于活跃社区来说，这一招经常很管用。比如 jQuery 的&nbsp;<a href="http://bugs.jquery.org/">Bug Tracker</a>，通过右上角的 Search Tickets 可以找到非常多有用的信息。一个运作良好的 Bug 库，经常是一座巨大的宝藏。Sea.js 是直接通过&nbsp;<a href="//github.com/seajs/seajs/issues">GitHub Issues</a>&nbsp;来管理，你可以在 Issues 中找到很多信息。</p>
<h4><a class="anchor" name="-3" href="//github.com/seajs/seajs/blob/master/CONTRIBUTING.md#-3"></a><strong>求助身边的朋友</strong></h4>
<p>如果你使用的开源软件，在朋友圈或同事圈里也有人使用，那么抬起你的脚、或拿起你的电话，真挚诚恳的探讨不会遭遇拒绝，而会增进友谊。不要犹豫，你的内心渴望面对面交流，你的朋友也是。</p>
<p>如果以上 4 步都无法解决你遇到的问题，也别犹豫，立马向开源社区提交问题就好。</p>
<h3><a class="anchor" name="-4" href="//github.com/seajs/seajs/blob/master/CONTRIBUTING.md#-4"></a>提问时</h3>
<p>提问有很多种，比如你认识作者，直接面对面请教就行。下面探讨的是如何通过互联网的方式来问问题。</p>
<h4><a class="anchor" name="-5" href="//github.com/seajs/seajs/blob/master/CONTRIBUTING.md#-5"></a><strong>平和对等的心态</strong></h4>
<p>很多开源软件都是免费的，作者往往是业余时间出于兴趣在维护，没有义务回答社区问题。提问时，不要把自己摆在顾客的位置，比如</p>
<blockquote>
<p>项目马上要上线了，请务必帮忙解决 这是我的邮箱，请及时联系我</p>
</blockquote>
<p>另外，也不要把自己摆在乞食者的位置，比如</p>
<blockquote>
<p>冰天雪地跪求解答 救命啊，我的网站挂了</p>
</blockquote>
<p>在开源社区，一切皆是朋友。无论对方是 Linux 内核的作者，还是某个 jQuery 插件的作者，你和作者都是对等的。你的提问是在帮助开源软件完善。平和对等的心态，可以让你的问题赢得更多人的阅读和思考。</p>
<h4><a class="anchor" name="-6" href="//github.com/seajs/seajs/blob/master/CONTRIBUTING.md#-6"></a><strong>通过正确的途径提交</strong></h4>
<p>如果遇到问题的开源软件有专门的 Bug 管理系统，请最好到这些指定系统中提交。比如，对于前端开发工程师来说，下面这些 Tracker 系统很重要。</p>
<ul>
<li><a href="http://bugs.jquery.com/report">jQuery Tickets</a></li>
<li><a href="//bugs.webkit.org/">WebKit Bugzilla</a></li>
<li><a href="//bugzilla.mozilla.org/">Mozilla Bugzilla</a></li>
</ul>
<p>还有各个开源类库的 Issues 库，比如 Sea.js 的是：<a href="//github.com/seajs/seajs/issues">seajs/issues</a></p>
<p>最不好的途径是</p>
<ul>
<li>
<p>QQ 、阿里旺旺、微信等群组。这些群组主要是用来工作或休闲的。对开源项目来说，在这些地方提问，作者一般不会关注，效率非常低。</p>
</li>
<li>
<p>微博、Facebook 等社交网络。不少人在微博上通过 at 或私信询问 Sea.js 问题，这些我经常看不到。看到了，也不情愿回复。微博是扯淡、交流情感的地方，一般是写代码写累了，才去逛逛，很少会有在社交网络上回答技术问题的心情。</p>
</li>
</ul>
<p>通过正确的途径提交问题，一般可以让你的问题得到及时准确的回复。</p>
<h4><a class="anchor" name="-7" href="//github.com/seajs/seajs/blob/master/CONTRIBUTING.md#-7"></a><strong>使用明确、有意义的标题</strong></h4>
<p>抱着平和对等的心态，找到合适的途径后，就得静下心来将遇到的问题写成文字。书写文字不是一件简单的事情，我们可以从遵循一些简单的规则开始。</p>
<p>首先是标题要简洁清晰，要言之有物。比如</p>
<blockquote>
<p>我遇到了一个 Ajax 问题 Sea.js 在我的浏览器上运行不了</p>
</blockquote>
<p>上面的标题很糟糕，光看标题作者无法知道发生了什么事。当开源社区的问题很多时，上面这类标题，经常会让作者直接忽视或将优先级降到很低。更妥当的标题是</p>
<blockquote>
<p>Ajax 请求未返回正确的 responseXML Sea.js 2.0 在 IE6 上运行时抛错</p>
</blockquote>
<p>明确、有意义的标题，可以帮助作者确定问题具体是什么类型、预估需要多少时间解决、是否现在马上解决等。一个好的标题，也有利于社区知识的沉淀和后期搜索。标题有如一个人的颜面衣着，虽然不是关键，但在嘈杂的信息社区中，这很重要。</p>
<h4><a class="anchor" name="-8" href="//github.com/seajs/seajs/blob/master/CONTRIBUTING.md#-8"></a><strong>遵循良好的模板</strong></h4>
<p>如果社区提供了问题模板，一定要仔细看下。比如 Google Code 社区，当你创建一个问题时，会自动提供以下模板：</p>

```
What steps will reproduce the problem?
该问题的重现步骤是什么？
1.
2.
3.

What is the expected output? What do you see instead?
你期待的结果是什么？实际看到的又是什么？

What version of the product are you using? On what operating system?
你正在使用产品的哪个版本？在什么操作系统上？

Please provide any additional information below.
如果有的话，请在下面提供更多信息。

```



<p>遵循这个模板去描述问题，经常能省很多事。作者一般也非常欢迎通过模板提交的问题。如果社区没有提供模板，也可以自己遵循以上模板来提交。</p>
<p>下面针对问题内容，具体说说一些需要注意的点。</p>
<h4><a class="anchor" name="-9" href="//github.com/seajs/seajs/blob/master/CONTRIBUTING.md#-9"></a><strong>语法正确、格式清晰</strong></h4>
<p>虽然我们不是作家，但正确的语法、清晰的格式，可以让读者赏心悦目，也就更有心情帮你一起思考解决问题。</p>
<p>对于很多需要代码来描述的问题，要尤其注意格式，比如</p>

```
seajs.use('jquery',function($){$(document).ready(function() { /* ... */ })});

```

<p>可读性不如</p>
<div class="highlight">

```
seajs.use('jquery', function($) {
  $(document).ready(function() {
    // ...
  });
});

```

</div>
<p>GitHub 的 Markdown 语法可以很好地支持代码排版、语法高亮等，建议书写代码时，一定要先阅读下说明：<a href="http://github.github.com/github-flavored-markdown/">GitHub Flavored Markdown</a>。这能让你的内容看起来很专业，社区也就更有意愿会去帮助你，否则糟糕的排版，经常带来的是发帖之后的石沉大海。</p>
<h4><a class="anchor" name="-10" href="//github.com/seajs/seajs/blob/master/CONTRIBUTING.md#-10"></a><strong>描述事实、而不是猜测</strong></h4>
<p>事实是指，依次进行了哪些操作、产生了怎样的结果。比如</p>
<blockquote>
<p>我在 Windows XP 下用 IE6 打开&nbsp;<a href="http://seajs.org/">seajs.org</a>&nbsp;后，点击\5 分钟上手 Sea.js"，这时浏览器弹出脚本错误提示，例子显示不正确。</p>
</blockquote>
<p>上面是一段比较好的事实描述（更好的是把错误提示也截图上来），而不要像下面这样猜测：</p>
<blockquote>
<p>Sea.js 在 IE6 下运行不正常，我怀疑是源码第 213 行有问题。</p>
</blockquote>
<p>上面的描述，会让作者一头雾水、甚至很恼火。尽量避免猜测性描述，除非你能先描述事实，在事实描述清楚之后，再给出合理的猜测是欢迎的。</p>
<p>对于前端项目来说，如果能提供可重现错误的在线可访问代码，那是最好不过的。一旦你这么用心去做了，作者往往也会很用心地立马帮你解决。</p>
<h4><a class="anchor" name="-11" href="//github.com/seajs/seajs/blob/master/CONTRIBUTING.md#-11"></a><strong>描述目标、而不是过程</strong></h4>
<p>经常会有这种情况，提问者在脑袋里有个更高层次的目标，他们在自以为能达到目标的特定道路上卡住了，然后跑来问该怎么走。比如</p>
<blockquote>
<p>Sea.js 的 parseMap 方法在遇到 map 的多个配置项同时匹配同一个路径时，应该允许用户指定是全部生效还是仅第一个匹配的配置项生效。</p>
</blockquote>
<p>上面这个问题的背后，提问者实际上想解决的是如何通过 Sea.js 来做版本管理。提问者选择了通过 map 的方式来实现，但这过程中遇到了问题，因此跑过来继续怎么走。然而，如果只是描述过程，往往会把作者也绕进去。</p>
<p>实际情况却是，提问者选择的路本身就是一条崎岖之路，对于要解决的问题，实际上有更好的方式。这种情况下，描述清楚目标，讲清楚要干什么非常重要。</p>
<p>在描述自己是怎么做之前，一定要先描述要做什么。提问题时，What 往往比 How 更重要。</p>
<h4><a class="anchor" name="-12" href="//github.com/seajs/seajs/blob/master/CONTRIBUTING.md#-12"></a><strong>要有具体场景</strong></h4>
<p>无论在开源社区，还是微博、知乎等平台上，有一种非常常见的问题：</p>
<blockquote>
<p>如何维护 JavaScript 代码？ 如何使用 Sea.js 进行模块化开发？</p>
</blockquote>
<p>这类问题还有很多，每每遇到，只能笑笑，然后悄悄地忽略掉。因此这类问题很难回答，就如下面这些问题一样：</p>
<blockquote>
<p>如何才能让生命有意义？ 如何打败淘宝？</p>
</blockquote>
<p>这类提问者，一般比较浮躁，经常对问题本身也没有经过思考。踏实的提问者，不会让问题浮在空中无法回答，而会在具体场景中让问题落地：</p>
<blockquote>
<p>我的项目有 20 多个 JS 文件，接下来还会急剧增加。目前遇到以下问题......（省略五百字）...... 请问如何维护？</p>
</blockquote>
<h4><a class="anchor" name="-13" href="//github.com/seajs/seajs/blob/master/CONTRIBUTING.md#-13"></a><strong>仔细检查、确保准确</strong></h4>
<p>是人都会犯错误，特别是在如此快节奏的互联网环境下。好不容易把问题描述清楚时，不要急着立刻提交。在提交前，至少保证从头到尾再仔细阅读一遍，比如语法错误、错别字、标点符号、排版等等。做到这些，不光是尊重别人，也是尊重自己。</p>
<h3><a class="anchor" name="-14" href="//github.com/seajs/seajs/blob/master/CONTRIBUTING.md#-14"></a>提问后</h3>
<p>提交问题后，建议通过邮件等方式订阅回复。互联网上最有效的沟通方式是异步沟通，不要期待作者马上回复，也不要心烦意乱着急地等待。出去看看天，数数云朵，你会逐步明白什么是风轻云淡。</p>
<h4><a class="anchor" name="-15" href="//github.com/seajs/seajs/blob/master/CONTRIBUTING.md#-15"></a><strong>尽可能补充信息</strong></h4>
<p>在接收到回复时，仔细阅读。最经常的情况是，社区回复的，经常不是你想要的。比如</p>
<blockquote>
<p>根据你的描述，问题无法重现。能否提供具体使用环境和重现步骤？</p>
</blockquote>
<p>这时要淡定。仔细看看自己提交的问题描述是否足够清晰，如果有可补充的信息，尽量补充，以帮助作者能尽快定位问题。比如</p>
<blockquote>
<p>很抱歉，我前面有一步描述不正确，实际情况是我是在 IETester 中运行的......</p>
</blockquote>
<p>谦和淡定的交流，不光能帮助你解决问题，还有助于你结交更多朋友。</p>
<h4><a class="anchor" name="-16" href="//github.com/seajs/seajs/blob/master/CONTRIBUTING.md#-16"></a><strong>适当的总结</strong></h4>
<p>当问题终于解决时，建议对问题进行总结。可以编辑原帖，也可以通过博客等方式总结。你的总结，会让遇到同样问题的朋友们受益，并且对自己的技能也是一种提高。前端业界，无论国内还是国外，有很多牛人之所以成为牛人，很大程度上都是因为有总结思考的好习惯。</p>
<h4><a class="anchor" name="-17" href="//github.com/seajs/seajs/blob/master/CONTRIBUTING.md#-17"></a><strong>不要忘记感谢</strong></h4>
<p>最后，记得感谢。很多开源软件的作者，都是利用业余时间在创作代码。你的感谢，汇集许许多多大家的感谢，会让开源社区充满爱与力量。</p>
<h3><a class="anchor" name="-18" href="//github.com/seajs/seajs/blob/master/CONTRIBUTING.md#-18"></a>延伸阅读</h3>
<ul>
<li><a href="http://www.chiark.greenend.org.uk/~sgtatham/bugs-cn.html">如何有效地报告 Bug</a></li>
<li><a href="http://www.wapm.cn/smart-questions/smart-questions-zh.html">提问的智慧</a></li>
<li><a href="http://code.google.com/p/cpyug/wiki/ZenForAsk">回答的智慧</a></li>
</ul>
<hr>
<p>最后的最后，如果你认可这篇文章，欢迎以各种形式转载。你的传播，能让整个开源社区更美好。</p>


<p>本文转自：<a href="//github.com/seajs/seajs/blob/master/CONTRIBUTING.md" target="_blank">github</a></p>