---
title: 谈谈D2
categories:
  - 笔记本
  - 观点和感想
  - 前端杂烩
tags:
  - tech
  - cnblogs
date: 2014-11-01 11:32:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2014/11/01/communication-in-d2.html" target="_blank">博客园</a>.</div>

<p>很多参与了 <a href="http://d2forum.alibaba-inc.com/">D2</a> 的人还不知道 D2 是个什么东西，印象中就是很多很多前端工程师汇聚在一起，交流技术。D2 是 D2前端技术论坛的简称，英文名 Designer < Developer Frontend Technology Forum。下面的介绍比较官方：</p>
<blockquote>
<p>D2 由「淘宝网」发起，每届由 D2 前端技术论坛组委会（下简称 D2 组委会）组织，不同公司轮流承办。
<strong>D2 前端技术论坛的基本宗旨：</strong></p>
<ul>
<li>Designer+Developer：让左右大脑相互碰撞，激起更多的火花。</li>
<li>基于商业实践：不脱离日常工作，帮助商业取得更好的成功。</li>
<li>开放：不会把任何想法、任何作品据为私有，一切都更开放。</li>

</ul>
<p><strong>D2 前端技术论坛的讨论范围：</strong></p>
<ul>
<li>互联网前端技术与产品：前端技术的应用，开发中的实际案例。</li>
<li>前端开发的行业发展：展望整个行业的发展方向，引领前端开发最新方向。</li>

</ul>
<p><strong>D2 前端技术论坛的最终目标：</strong></p>
<ul>
<li>创造业内交流平台</li>
<li>引导、规范行业发展</li>
<li>影响前端技术发展</li>

</ul>

</blockquote>
<p>今年的 D2 由阿里巴巴承办，参与人数有一千多人。前端盛事，群英荟萃，火花不断。谈D2，这个话题有点大了，本文主要说一说 D2 会场的气氛和分享内容的甄选角度，同时也谈一谈自己对前端发展的看法。</p>
<h3 id="d2_1"><a class="headeranchor-link" name="user-content-d2_1" href="#d2_1"></a>一、D2现场</h3>
<p>本届D2在上周六举办，隔了一个星期才来总结，记忆都有些淡了，不过大体的感受还是有的。与会登记人数有 1067 人，其中男性 884 人，女性 183 人，晚上酒会参加人数 118+ 人。这个规模，可以试想一下是个什么样的场面。与会者主要都是参与前端开发的工程师，也有少数还未毕业的学生。</p>
<p>对于参与者，D2 只设了一道坎，那就是在 <a href="//github.com/soulteary/Get-D2-2014-Ticket">github</a> 上 fork 项目，然后 pull request，提交内容中附带个人的博客地址或者微博等相关信息，方便审核者对你有一个简单的了解。我觉得这也是很有必要的。</p>
<p>各大公司都派出了自己的代表，但更多还是自发前往杭州。在盛会上，我看到了不少群友/同学/朋友/同事，由于当日着一身中国风服饰，加上出门前自拍了一张放到网上，会场很多朋友认出了我（其实，前端圈子还是蛮小的嘛~）。所以我相信，参与了 D2 的你，也一定看到了不少往日熟悉的身影。</p>
<p>本次 D2 有两个会场，主会场可容纳八九百人，分会场能够容纳一百多人，分会场的第一个分享被两三百人挤爆了，后续大家都默默的驻守在主会场，所以分会场后几场还是有些相对萧条的。</p>
<p>主会场</p>
<p><a href="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/11/01/011126593624339.jpg" data-source="http://images.cnitblog.com/blog/387325/201411/011126593624339.jpg"><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/11/01/011126593624339.jpg" data-source="http://images.cnitblog.com/blog/387325/201411/011126593624339.jpg" alt="主会场"></a></p>
<p>分会场</p>
<p><a href="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/11/01/011126361907584.jpg" data-source="http://images.cnitblog.com/blog/387325/201411/011126361907584.jpg"><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/11/01/011126361907584.jpg" data-source="http://images.cnitblog.com/blog/387325/201411/011126361907584.jpg" alt="分会场"></a></p>
<p>酒会场</p>
<p><a href="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/11/01/011128021596319.jpg" data-source="http://images.cnitblog.com/blog/387325/201411/011128021596319.jpg"><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/11/01/011128021596319.jpg" data-source="http://images.cnitblog.com/blog/387325/201411/011128021596319.jpg" alt="酒会场"></a></p>
<p>引用<a href="http://weibo.com/dh20156">@dh20156</a> 的一句话：</p>
<blockquote>
<p>举办一场千人会议确实不容易，但只要<code>主题明确</code>，<code>计划妥当</code>，<code>流程清晰</code>，<code>执行到位</code>，还是可以愉快玩耍的!</p>

</blockquote>
<p>因为刚毕业，接触前端时间也不是很长，之前对 D2 没什么了解，这也是我第一次参加 D2，真切的感受到了会场的活跃。我觉得，<strong>更重要的是，会场之后的活跃！</strong></p>
<h3 id="_1"><a class="headeranchor-link" name="user-content-_1" href="#_1"></a>二、分享内容的甄选</h3>
<p>下面是本届 D2 分享的内容列表，及相关 PPT 链接：</p>
<ul>
<li><a href="http://vdisk.weibo.com/s/C30SUspJtfdET">《指尖上的数据》</a></li>
<li><a href="http://vdisk.weibo.com/s/C30SUspJtfe1v">《支付宝前后端分离的思考与实践》</a></li>
<li><a href="http://vdisk.weibo.com/s/C30SUspJtfe4O">《nodejs一小步 前端开发一大步》</a></li>
<li><a href="http://vdisk.weibo.com/s/C30SUspJtfe1b">《Listen to the buzz of Angular.JS》</a></li>
<li><a href="http://vdisk.weibo.com/s/C30SUspJtfdhI">《第三方开发前端实践》</a></li>
<li><a href="http://vdisk.weibo.com/s/C30SUspJtfe20">《企业级 NPM 服务在阿里的实践》</a></li>
<li><a href="http://vdisk.weibo.com/s/C30SUspJtfdi5">《面向多端的蘑菇街前端技术架构》</a></li>
<li><a href="http://vdisk.weibo.com/s/C30SUspJtex-X">《航旅无线H5技术体系成长之路》</a></li>
<li><a href="http://vdisk.weibo.com/s/C30SUspJtf4sv">《京东前端工业化实践之路》</a></li>
<li><a href="http://vdisk.weibo.com/s/C30SUspJtfe1a">《淘宝前端工程与自动化体系》</a></li>
<li><a href="http://johnhax.net/2014/es6-js-future/">《透过ES6看JS未来》</a></li>
<li><a href="http://vdisk.weibo.com/s/C30SUspJtesC9">《架构与IBM前端 》</a></li>
<li><a href="http://vdisk.weibo.com/s/C30SUspJtf7lO">《豆瓣的前端发展思路》</a></li>

</ul>
<p>具体也可以在<a href="http://d2forum.alibaba-inc.com/">官网</a>上查看。</p>
<p>事实上，本次D2总共提交了三四十个分享主题，上述这些主题都是经过前端资深专家的慎重思考和筛选之后确定的。从分享的标题中，我们可以提炼出这些字眼：数据、架构、体系、实践、发展、nodejs、工程。很显然，前端开发已经告别了刀根火种的猿人时代，对前端技术的讨论方向并未局限在某个知识点上，更多的是工程化实践和自动化系统的构建，这也是各大互联网公司发展起来后一个必然的趋势。</p>
<p>Nodejs 的出现为前端工程师在服务器端开辟了一块领域，有人说我们抢了后端同学的饭碗。并非如此，Nodejs 作为一个中间层出现在前后端之间，厘清了各端之间的职责，为web发展提供了更加清晰的思路，这一点毋庸置疑。但是这次没听到<a href="http://weibo.com/xicilion">@响马大叔</a> 的 <a href="//github.com/xicilion/fibjs">fibjs</a> 分享，还是有些遗憾。</p>
<p>各大公司为了抢占市场份额，业务方向也是由点及面的扩散，业务增多不能单靠增加工程师的数量来跟上业务需求，只能让技术跟上时代的脚步。</p>
<p>会场是有姑娘的，找姑娘交流技术也是本次参加 D2 的一个重要使命，所以请原谅我不能为大家一一分享上述每个主题的细节内容。认认真真听进去的只有百度FEX的张可竞分享的《指尖上的数据》。主题很文艺，内容也是很贴切，下面就简单复述下介绍的内容，并谈谈自己的感受。</p>
<p>移动互联网的迅速崛起，让前端工程师们有点猝不及防。在移动设备上，人们通过手指的触摸来了解这个大千世界，张可竞从手指触摸的细节和数据在移动终端呈现的形态上着手，做了深入的分析，最后回到技术上，他提到了这么几个点：</p>
<ul>
<li>设备的适配问题</li>
<li>手机的性能问题</li>
<li>技术框架</li>
<li>...</li>

</ul>
<p>这些都是移动开发中的疼点，也是值得每一个开发者去探究的问题。去年我给老外做过一次外包，在设计上就已经很明显的感觉到国内外移动互联网技术差异，其实技术都在那里，只是国内的技术潮流还在婴幼儿阶段跃跃欲试，含苞待放。</p>
<h3 id="_2"><a class="headeranchor-link" name="user-content-_2" href="#_2"></a>三、我对前端发展的看法</h3>
<p>很多人对 ECMAScript 6 持消极态度，说把 JavaScript 搞的太复杂了，越来越像 Ruby/Python/Java 了，一门语言的丰富，不仅仅是对语言本身的拓展，这些内容取决于市场的需求。而且本次 D2 讨论的话题是不是和 ES6 引入了模块化、异步编程等相关内容十分契合呢！</p>
<p>HTML5规范历时8年，也在近期宣布制定完成。如今的 web 发展步入了一个平稳阶段，我认为后续我们需要思考的，包含如下问题：</p>
<ul>
<li>信息安全问题</li>
<li>实时通讯问题</li>
<li>应用开发问题</li>
<li>....</li>

</ul>
<h3 id="_3"><a class="headeranchor-link" name="user-content-_3" href="#_3"></a>四、小结</h3>
<p>最后还是一如既往地做个小结，三个点。</p>
<p><strong>1. 移动端内容过少</strong></p>
<p>移动互联网技术是个重要的议题，据我所知，目前阿里很大一部分的流量来自于移动终端。而本次重点对移动端技术的介绍偏少。希望下次 D2 能够有些拓展！</p>
<p><strong>2. 听分享不是重点</strong></p>
<p>过来听分享会不是重点。分享效果取决于分享者的演讲能力以及他们对分享内容研究的深度。而二者兼备的人并不多，加上受众并不全是资深的工程师，很多内容是难以一时消化的。</p>
<p>前端峰会的目的，前面也说了：创造业内交流平台，引导、规范行业发展，影响前端技术发展。我觉得，最实际的意义是多认识几个人，以后遇到问题多几个人可以一起探讨、交流。</p>
<p><strong>3. 无障碍体验区</strong></p>
<p>除了几个会场，还有一些分区，其中一个叫做『无障碍体验』，现代人都讲求"民主"、"平等"，技术上也是一样，我们应该更多地关注社会弱势群体。目前阿里巴巴建立了无障碍兴趣小组，我们会在业余时间针对阿里巴巴页面做一些信息无障碍的优化以及推广，也希望更多公司加入进来，提高产品易用性，让信息无障碍深入人心。</p>
<p>最后，让我们一起来期待明年的<strong>D2盛典</strong>吧！</p>