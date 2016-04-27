---
title: css中font-family的中文字体
categories:
  - 前端杂烩
tags:
  - tech
  - cnblogs
warning: true
date: 2013-05-26 10:40:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/05/26/css-font-family.html" target="_blank">博客园</a>.</div>

<p>说到css中的font-family，相信很多朋友经常用，但不知道当你遇到引用中文字体的时候你会怎么写？最近特别关注了下，发现最常用的基本有三种类型：</p>
<ol>
<li>1、直接中文；</li>
<li>2、英文形式；</li>
<li>3、unicode码；</li>

</ol>
<p>前面两种形式很好理解，unicode码是什么意思呢？下面看基本定义:</p>
<blockquote>
<p>Unicode（统一码、万国码、单一码）是一种在计算机上使用的字符编码。它为每种语言中的每个字符设定了统一并且唯一的二进制编码，以满足跨语言、跨平台进行文本转换、处理的要求。</p>

</blockquote>
<p>更多内容请查看百度百科对<a class="exterUrl" href="http://baike.baidu.com/view/40801.htm" target="_blank">Unicode</a>的介绍。介绍完方案，再谈下使用。之前在看玉伯写的一篇文章《<span class="exterUrl">中文字体在 CSS 中的写法</span>》 中提到：font-family中用到的宋体，\用 unicode 表示，不用 SimSun, 是因为 Firefox 的某些版本和 Opera 不支持 SimSun 的写法"。我在网上搜索了下相关内容，大多都是摘抄这篇文章，并没有提到具体哪个版本的Firefox和Opera会不支持英文的写法。</p>
<p>对比下，三种方法各有优缺点：中文形式的方便记忆，但在不支持中文的系统或者编码的页面则无法正常显示；英文形式的兼容了系统和编码的问题，但不方便记忆，又可能有潜在的风险；unicode码兼容行最好，但也存在记忆难的问题。</p>
<p>综合权衡下，在性能和安全第一的条件下，还是推荐使用<strong>unicode码</strong>。如果不是太严格的情况下，可以选择其他两种。</p>
<p>下面整理下常用的各种字体的不同显示形式，方便使用的时候查找：</p>
<table class="fontTable">
<thead>
<tr><th>中文名</th><th>英文名</th><th>Unicode</th></tr>
<tr><th colspan="4">Windows</th></tr>

</thead>
<tbody>
<tr>
<td><span><em>*</em>&nbsp;</span>宋体</td>
<td>SimSun</td>
<td>\5B8B\4F53</td>

</tr>
<tr>
<td><span><em>*</em>&nbsp;</span>黑体</td>
<td>SimHei</td>
<td>\9ED1\4F53</td>

</tr>
<tr>
<td><span><em>*</em></span>&nbsp;微软雅黑</td>
<td>Microsoft YaHei</td>
<td>\5FAE\8F6F\96C5\9ED1</td>

</tr>
<tr>
<td>微软正黑体</td>
<td>Microsoft JhengHei</td>
<td>\5FAE\x8F6F\6B63\9ED1\4F53</td>

</tr>
<tr>
<td>新宋体</td>
<td>NSimSun</td>
<td>\65B0\5B8B\4F53</td>

</tr>
<tr>
<td>新细明体</td>
<td>PMingLiU</td>
<td>\65B0\7EC6\660E\4F53</td>

</tr>
<tr>
<td>细明体</td>
<td>MingLiU</td>
<td>\7EC6\660E\4F53</td>

</tr>
<tr>
<td>标楷体</td>
<td>DFKai-SB</td>
<td>\6807\6977\4F53</td>

</tr>
<tr>
<td>仿宋</td>
<td>FangSong</td>
<td>\4EFF\5B8B</td>

</tr>
<tr>
<td>楷体</td>
<td>KaiTi</td>
<td>\6977\4F53</td>

</tr>
<tr>
<td>仿宋_GB2312</td>
<td>FangSong_GB2312</td>
<td>\4EFF\5B8B_GB2312</td>

</tr>
<tr>
<td>楷体_GB2312</td>
<td>KaiTi_GB2312</td>
<td>\6977\4F53_GB2312</td>

</tr>

</tbody>
<thead>
<tr><th colspan="4">Mac OS</th></tr>

</thead>
<tbody>
<tr>
<td><em>*</em>&nbsp;华文细黑</td>
<td>STHeiti Light [STXihei]</td>
<td>\534E\6587\7EC6\9ED1</td>

</tr>
<tr>
<td><em>*</em>&nbsp;华文黑体</td>
<td>STHeiti</td>
<td>\534E\6587\9ED1\4F53</td>

</tr>
<tr>
<td>华文楷体</td>
<td>STKaiti</td>
<td>\534E\6587\6977\4F53</td>

</tr>
<tr>
<td>华文宋体</td>
<td>STSong</td>
<td>\534E\6587\5B8B\4F53</td>

</tr>
<tr>
<td>华文仿宋</td>
<td>STFangsong</td>
<td>\534E\6587\4EFF\5B8B</td>

</tr>
<tr>
<td>丽黑 Pro</td>
<td>LiHei Pro Medium</td>
<td>\4E3D\9ED1 Pro</td>

</tr>
<tr>
<td>丽宋 Pro</td>
<td>LiSong Pro Light</td>
<td>\4E3D\5B8B Pro</td>

</tr>
<tr>
<td>标楷体</td>
<td>BiauKai</td>
<td>\6807\6977\4F53</td>

</tr>
<tr>
<td>苹果丽中黑</td>
<td>Apple LiGothic Medium</td>
<td>\82F9\679C\4E3D\4E2D\9ED1</td>

</tr>
<tr>
<td>苹果丽细宋</td>
<td>Apple LiSung Light</td>
<td>\82F9\679C\4E3D\7EC6\5B8B</td>

</tr>

</tbody>

</table>
<p><span>上表中标*为常用字体</span></p>


<p><span>本文转自：http://www.cnblogs.com/jiji262/archive/2012/02/13/2349851.html</span></p>