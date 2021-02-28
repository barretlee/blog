---
title: vim操作全面讲解
categories:
  - 工具
  - 剪贴板
tags:
  - tech
  - cnblogs
  - VIM
warning: true
date: 2013-06-11 08:25:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/06/11/linux-learning-details.html" target="_blank">博客园</a>.</div>

<p><strong>目录</strong></p>
<p><a href="#skyking-1">第一讲</a></p>
<ul>
<li>
<ul>
<li><a href="#skyking-1-1">移动光标</a></li>
<li><a href="#skyking-1-2">VIM的进入和退出</a></li>
<li><a href="#skyking-1-3">文本编辑之删除</a></li>
<li><a href="#skyking-1-4">文本编辑之插入</a></li>
<li><a href="#skyking-1-5">小结</a></li>
</ul>
</li>
</ul>
<p><a href="#skyking-2">第二讲</a></p>
<ul>
<li>
<ul>
<li><a href="#skyking-2-1">删除类命令</a></li>
<li><a href="#skyking-2-2">其他删除类命令</a></li>
<li><a href="#skyking-2-3">关于命令和对象</a></li>
<li><a href="#skyking-2-4">对象命令的特殊情况</a></li>
<li><a href="#skyking-2-5">撤消类命令</a></li>
<li><a href="#skyking-2-6">小结</a></li>
</ul>
</li>
</ul>
<p><a href="#skyking-3">第三讲</a></p>
<ul>
<li>
<ul>
<li><a href="#skyking-3-1">置入类命令</a>&nbsp;</li>
<li><a href="#skyking-3-2">替换类命令</a>&nbsp;</li>
<li><a href="#skyking-3-3">更改类命令&nbsp;</a></li>
<li><a href="#skyking-3-4">使用c指令的其他更改类命令&nbsp;</a></li>
<li><a href="#skyking-3-5">小结&nbsp;</a></li>
</ul>
</li>
</ul>
<p><a href="#skyking-4">第四讲</a></p>
<ul>
<li>
<ul>
<li><a href="#skyking-4-1">定位及文件状态&nbsp;</a></li>
<li><a href="#skyking-4-2">搜索类命令&nbsp;</a></li>
<li><a href="#skyking-4-3">配对括号的查找&nbsp;</a></li>
<li><a href="#skyking-4-4">修正错误的方法之一&nbsp;</a></li>
<li><a href="#skyking-4-5">小结</a></li>
</ul>
</li>
</ul>
<p><a href="#skyking-5">第五讲</a></p>
<ul>
<li>
<ul>
<li><a href="#skyking-5-1">VIM 内执行外部命令的方法&nbsp;</a></li>
<li><a href="#skyking-5-2">关于保存文件的更多信息&nbsp;</a></li>
<li><a href="#skyking-5-3">一个具有选择性的保存命令&nbsp;</a></li>
<li><a href="#skyking-5-4">提取和合并文件&nbsp;</a></li>
<li><a href="#skyking-5-5">小结&nbsp;</a></li>
</ul>
</li>
</ul>
<p><a href="#skyking-6">第六讲</a></p>
<ul>
<li>
<ul>
<li><a href="#skyking-6-1">打开类命令</a>&nbsp;</li>
<li><a href="#skyking-6-2">光标后插入类命令&nbsp;</a></li>
<li><a href="#skyking-6-3">另外一个置换类命令的版本设置类命令的选项</a>&nbsp;</li>
<li><a href="#skyking-6-4">小结</a></li>
</ul>
</li>
</ul>
<p><a href="#skyking-7">第七</a><a href="#skyking-7">讲</a><a href="#skyking-7"> 在线帮助命令</a>&nbsp;</p>
<p><a href="#skyking-8">第八</a><a href="#skyking-8">讲</a><a href="#skyking-8"> 创建一个启动脚本</a></p>


<p><span>vim 是一个具有很多命令的功能非常强大的编辑器。限于篇幅，在本教程当中</span><span>就不详细介绍了。本教程的设计目标是</span><span>讲述一些必要的基本命令</span><span>，而掌握好这些命令，您就能够很容易将vim当作一个通用的万能编辑器来使用了。</span></p>
<p>完成本教程的内容大约需要<span>25-30</span>分钟，取决于您训练的时间。</p>
<p>每一节的命令操作将会更改本文。推荐您复制本文的一个副本，然后在副本上进行训练(如果您是通过"vimtutor"来启动教程的，那么本文就已经是副本了)。</p>
<p><span> 切记一点∶本教程的设计思路是在使用中进行学习的。</span>也就是说，您需要通过执行命令来学习它们本身的正确用法。如果您只是阅读而不操作，那么您可能会很快遗忘这些命令的！</p>
<p>好了，现在请确定您的Shift-Lock(大小写锁定键)还没有按下，然后按键盘上的字母键 j 足够多的次数来移动光标，直到第一节的内容能够完全充满屏幕。</p>
<h3><a id="skyking-1" name="skyking-1" href="#">&nbsp;</a>      第一讲&nbsp;</h3>
<p><strong>第一节∶移动光标</strong><a id="skyking-1-1" name="skyking-1-1" href="#">&nbsp;</a></p>
<p><span>※※ 要移动光标，请依照说明分别按下 h、j、k、l 键。 ※※</span></p>
<p>      ^       k        提示∶ h 的键位于左边，每次按下就会向左移动。       &lt; h  l &gt;      l 的键位于右边，每次按下就会向右移动。      j         j 键看起来很象一支尖端方向朝下的箭头。      v</p>
<p>  1. 请随意在屏幕内移动光标，直至您觉得舒服为止。</p>
<p>  2. 按下下行键(j)，直到出现光标重复下行。</p>
<p>---&gt; 现在您应该已经学会如何移动到下一讲吧。</p>
<p>  3. 现在请使用下行键，将光标移动到第二讲。</p>
<p><em><strong>提示∶</strong>如果您不敢确定您所按下的字母，请按下&lt;ESC&gt;键回到正常(Normal)模式。然后再次从键盘输入您想要的命令。</em></p>
<p><em><strong>提示∶</strong>光标键应当也能正常工作的。但是使用hjkl键，在习惯之后您就能够快速地在屏幕内四处移动光标了。</em></p>
<p><strong>第二节∶VIM的进入和退出<a id="skyking-1-2" name="skyking-1-1" href="#">&nbsp;</a></strong></p>
<p><span>!! 特别提示∶敬请阅读完整本一节的内容，然后才能执行以下所讲解的命令。</span></p>
<p>  1. 请按&lt;ESC&gt;键(这是为了确保您处在正常模式)。</p>
<p>  2. 然后输入∶<span>     :q! &lt;回车&gt;</span></p>
<p>---&gt; 这种方式的退出编辑器绝不会保存您进入编辑器以来所做的改动。     如果您想保存更改再退出，请输入∶       <span>:wq  &lt;回车&gt;</span></p>
<p>  3. 如果您看到了命令行提示符，请输入能够带您回到本教程的命令，那就是∶</p>
<p><span>   vimtutor &lt;回车&gt;</span></p>
<p>     通常情况下您也可以用这种方式∶</p>
<p><span>   vim tutor &lt;回车&gt;</span></p>
<p>---&gt; 这里的 'vim' 表示进入vim编辑器，而 'tutor'则是您准备要编辑的文件。</p>
<p>  4. 如果您自信已经牢牢记住了这些步骤的话，请从步骤1执行到步骤3退出，然     后再次进入编辑器。接着将光标移动到第一讲第三节来继续我们的教程讲解。</p>


<p><strong>第三节∶文本编辑之删除<strong><a id="skyking-1-3" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></p>
<p><span>** 在正常(Normal)模式下，可以按下 x 键来删除光标所在位置的字符。**</span></p>
<p>  1. 请将光标移动到本节中下面标记有 ---&gt; 的那一行。</p>
<p>  2. 为了修正输入错误，请将光标移至准备删除的字符的位置处。</p>
<p>  3. 然后按下 x 键将错误字符删除掉。</p>
<p>  4. 重复步骤2到步骤4，直到句子修正为止。</p>
<p>---&gt; The ccow jumpedd ovverr thhe mooon.</p>
<p>  5. 好了，该行已经修正了，下一节内容是第一讲第四节。</p>
<p><em><strong>特别提示</strong>∶在您浏览本教程时，不要强行记忆。记住一点∶在使用中学习。</em></p>


<p><strong>第四节∶文本编辑之插入<strong><a id="skyking-1-4" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></p>
<p><span>  ** 在正常模式下，可以按下 i 键来插入文本。**</span></p>
<p>  1. 请将光标移动到本节中下面标记有 ---&gt; 的第一行。</p>
<p>  2. 为了使得第一行内容雷同于第二行，请将光标移至文本第一个字符准备插入     的位置。</p>
<p>  3. 然后按下 i 键，接着输入必要的文本字符。</p>
<p>  4. 所有文本都修正完毕，请按下 &lt;ESC&gt; 键返回正常模式。重复步骤2至步骤4以便修正句子。</p>
<p>---&gt; There is text misng this .---&gt; There is some text missing from this line.</p>
<p>  5. 如果您对文本插入操作已经很满意，请接着阅读下面的小结。</p>


<p><strong>            第一讲小结<strong><a id="skyking-1-5" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></p>
<p>  1. 光标在屏幕文本中的移动既可以用箭头键，也可以使用 hjkl 字母键。   h (左移) j (下行)       k (上行)     l (右移)</p>
<p>  2. 欲进入vim编辑器(从命令行提示符)，请输入∶<span>vim 文件名 &lt;回车&gt;</span></p>
<p>  3. 欲退出vim编辑器，请输入以下命令放弃所有修改∶</p>
<p><span> &lt;ESC&gt;   :q!  &lt;回车&gt;</span></p>
<p>     或者输入以下命令保存所有修改∶</p>
<p><span> &lt;ESC&gt;   :wq  &lt;回车&gt;</span></p>
<p>  4. 在正常模式下删除光标所在位置的字符，请按∶ x</p>
<p>  5. 在正常模式下要在光标所在位置开始插入文本，请按∶</p>
<p><span>  i     输入必要文本 &lt;ESC&gt;</span></p>
<p>特别提示∶按下 &lt;ESC&gt; 键会带您回到正常模式或者取消一个不期望或者部分完成的命令。</p>
<p>好了，第一讲到此结束。下面接下来继续第二讲的内容。</p>


<h3><a id="skyking-2" name="skyking-2" href="#">&nbsp;</a><span>第二讲</span></h3>
<p><strong>第一节∶删除类命令<strong><a id="skyking-2-1" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></p>
<p><span>** 输入 dw 可以从光标处删除至一个单字/单词的末尾。**</span></p>
<p>  1. 请按下 &lt;ESC&gt; 键确保您处于正常模式。</p>
<p>  2. 请将光标移动到本节中下面标记有 ---&gt; 的那一行。</p>
<p>  3. 请将光标移至准备要删除的单词的开始。</p>
<p>  4. 接着输入 dw 删除掉该单词。</p>
<p><em><strong>  特别提示:&nbsp;</strong>您所输入的 dw 会在您输入的同时出现在屏幕的最后一行。如果您输入有误，请按下 &lt;ESC&gt; 键取消，然后重新再来。</em></p>
<p>---&gt; There are a some words fun that don't belong paper in this sentence.</p>
<p>  5. 重复步骤3至步骤4，直至句子修正完毕。接着继续第二讲第二节内容。</p>


<p><strong>第二节∶其他删除类命令<strong><strong><a id="skyking-2-2" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></p>
<p><span>** 输入 d$ 从当前光标删除到行末。**</span></p>
<p>  1. 请按下 &lt;ESC&gt; 键确保您处于正常模式。</p>
<p>  2. 请将光标移动到本节中下面标记有 ---&gt; 的那一行。</p>
<p>  3. 请将光标移动到该行的尾部(也就是在第一个点号"."后面)。</p>
<p>  4. 然后输入 d$ 从光标处删至当前行尾部。</p>
<p>---&gt; Somebody typed the end of this line twice. end of this line twice.</p>
<p>  5. 请继续学习第二讲第三节就知道是怎么回事了。</p>


<p><strong>第三节∶关于命令和对象<strong><strong><a id="skyking-2-3" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></p>
<p><span>删除命令 d 的格式如下∶</span></p>
<p>  [number]   d object      或者     d   [number]   object</p>
<p>  其意如下∶    <span>number - 代表执行命令的次数(可选项，缺省设置为 1 )。</span><span>    d - 代表删除。</span><span>    object - 代表命令所要操作的对象(下面有相关介绍)。</span></p>
<p>  一个简短的对象列表∶    w - 从当前光标当前位置直到单字/单词末尾，包括空格。    e - 从当前光标当前位置直到单字/单词末尾，但是 *不* 包括空格。    $ - 从当前光标当前位置直到当前行末。</p>
<p><em><strong>特别提示∶</strong>对于勇于探索者，请在正常模式下面仅按代表相应对象的键而不使用命令，则将看到光标的移动正如上面的对象列表所代表的一样。</em></p>


<p><strong><span>第四节∶对象命令的特殊情况<strong><strong><a id="skyking-2-4" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></span></strong></p>
<p><span>** 输入 dd 可以删除整一个当前行。 **</span></p>
<p>  鉴于整行删除的高频度，VIM 的设计者决定要简化整行删除，仅需要在同一行上  击打两次 d 就可以删除掉光标所在的整行了。</p>
<p>  1. 请将光标移动到本节中下面的短句段落中的第二行。  2. 输入 dd 删除该行。  3. 然后移动到第四行。  4. 接着输入 2dd (还记得前面讲过的 number-command-object 吗？) 删除两行。</p>
<p>      　　1)  Roses are red,      　　2)  Mud is fun,      　　3)  Violets are blue,      　　4)  I have a car,      　　5)  Clocks tell time,      　　6)  Sugar is sweet      　　7)  And so are you.</p>
<p><strong>第五节∶撤消类命令<strong><strong><a id="skyking-2-5" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></p>
<p><span>** 输入 u 来撤消最后执行的命令，输入 U 来修正整行。**</span></p>
<p>  1. 请将光标移动到本节中下面标记有 ---&gt; 的那一行，并将其置于第一个错误     处。  2. 输入 x 删除第一个不想保留的字母。  3. 然后输入 u 撤消最后执行的(一次)命令。  4. 这次要使用 x 修正本行的所有错误。  5. 现在输入一个大写的 U ，恢复到该行的原始状态。  6. 接着多次输入 u 以撤消 U 以及更前的命令。  7. 然后多次输入 CTRL-R (先按下 CTRL 键不放开，接着输入 R 键) ，这样就     可以执行恢复命令，也就是撤消掉撤消命令。</p>
<p>---&gt; Fiix the errors oon thhis line and reeplace them witth undo.</p>
<p>  8. 这些都是非常有用的命令。下面是第二讲的小结了。</p>


<p><strong><span>第二讲小结<strong><strong><a id="skyking-2-6" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></span></strong></p>
<p><span>1. 欲从当前光标删除至单字/单词末尾，请输入∶dw</span></p>
<p>  2. 欲从当前光标删除至当前行末尾，请输入∶d$</p>
<p>  3. 欲删除整行，请输入∶dd</p>
<p>  4. 在正常模式下一个命令的格式是∶</p>
<p>       [number]   command   object     或者     command  [number]   object     其意是∶       <span>number - 代表的是命令执行的次数</span><span>       command - 代表要做的事情，比如 d 代表删除</span><span>       object - 代表要操作的对象，比如 w 代表单字/单词，$ 代表到行末等等。</span><span>   $ (to the end of line), etc.</span></p>
<p>  5. 欲撤消以前的操作，请输入∶u (小写的u)     欲撤消在一行中所做的改动，请输入∶U (大写的U)     欲撤消以前的撤消命令，恢复以前的操作结果，请输入∶CTRL-R</p>
<h3><a id="skyking-3" name="skyking-3" href="#">&nbsp;</a>       第三讲</h3>
<p><strong>第一节∶置入类命令<strong><strong><a id="skyking-3-1" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></p>
<p><span>        ** 输入 p 将最后一次删除的内容置入光标之后 **</span></p>
<p>  1. 请将光标移动到本节中下面示范段落的首行。</p>
<p>  2. 输入 dd 将该行删除，这样会将该行保存到vim的缓冲区中。</p>
<p>  3. 接着将光标移动到准备置入的位置的上方。记住∶是上方哦。</p>
<p>  4. 然后在正常模式下(&lt;ESC&gt;键进入)，输入 p 将该行粘贴置入。</p>
<p>  5. 重复步骤2至步骤4，将所有的行依序放置到正确的位置上。</p>
<p>     　　d) Can you learn too?     　　b) Violets are blue,     　　c) Intelligence is learned,     　　a) Roses are red,</p>


<p><strong><span>第二节∶替换类命令<strong><strong><strong><a id="skyking-3-2" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></span></strong></p>
<p><span>** 输入 r 和一个字符替换光标所在位置的字符。**</span></p>
<p>  1. 请将光标移动到本节中下面标记有 ---&gt; 的第一行。</p>
<p>  2. 请移动光标到第一个错误的适当位置。</p>
<p>  3. 接着输入 r ，这样就能将错误替换掉了。</p>
<p>  4. 重复步骤2和步骤3，直到第一行已经修改完毕。</p>
<p>---&gt;  Whan this lime was tuoed in, someone presswd some wrojg keys!---&gt;  When this line was typed in, someone pressed some wrong keys!</p>
<p>  5. 然后我们继续学校第三讲第三节。</p>
<p><em><strong>特别提示∶</strong></em>切记您要在使用中学习，而不是在记忆中学习。</p>


<p><strong>第三节∶更改类命令<strong><strong><strong><a id="skyking-3-3" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></strong></p>
<p><span>    ** 要改变一个单字/单词的部分或者全部，请输入 cw **</span></p>
<p>  1. 请将光标移动到本节中下面标记有 ---&gt; 的第一行。</p>
<p>  2. 接着把光标放在单词 lubw 的字母 u 的位置那里。</p>
<p>  3. 然后输入 cw 就可以修正该单词了(在本例这里是输入 ine 。)</p>
<p>  4. 最后按 &lt;ESC&gt; 键，然后光标定位到下一个错误第一个准备更改的字母处。</p>
<p>  5. 重复步骤3和步骤4，直到第一个句子完全雷同第二个句子。</p>
<p>---&gt; This lubw has a few wptfd that mrrf changing usf the change command.---&gt; This line has a few words that need changing using the change command.</p>
<p><em>提示∶请注意 cw 命令不仅仅是替换了一个单词，也让您进入文本插入状态了。</em></p>


<p><strong>第四节∶使用c指令的其他更改类命令<strong><strong><strong><a id="skyking-3-4" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></strong></p>
<p><span>** 更改类指令可以使用同删除类命令所使用的对象参数。**</span></p>
<p>  1. 更改类指令的工作方式跟删除类命令是一致的。操作格式是∶</p>
<p>       [number]   c   object    或者     c [number]   object</p>
<p>  2. 对象参数也是一样的，比如 w 代表单字/单词，$代表行末等等。</p>
<p>  3. 请将光标移动到本节中下面标记有 ---&gt; 的第一行。</p>
<p>  4. 接着将光标移动到第一个错误处。</p>
<p>  5. 然后输入 c$ 使得该行剩下的部分更正得同第二行一样。最后按 &lt;ESC&gt; 键。</p>
<p>---&gt; The end of this line needs some help to make it like the second.---&gt; The end of this line needs to be corrected using the  c$  command.</p>


<p><strong>第三讲小结<strong><strong><strong><a id="skyking-3-5" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></strong></p>
<p><span>1. 要重新置入已经删除的文本内容，请输入小写字母 p。该操作可以将已删除</span>     的文本内容置于光标之后。如果最后一次删除的是一个整行，那么该行将置     于当前光标所在行的下一行。</p>
<p>  2. 要替换光标所在位置的字符，请输入小写的 r 和要替换掉原位置字符的新字     符即可。</p>
<p>  3. 更改类命令允许您改变指定的对象，从当前光标所在位置直到对象的末尾。     比如输入 cw 可以替换当前光标到单词的末尾的内容；输入 c$ 可以替换当     前光标到行末的内容。</p>
<p>  4. 更改类命令的格式是∶</p>
<p>  [number]   c object        或者  c   [number]   object</p>
<p>下面我们继续学习下一讲。</p>


<h3><a id="skyking-4" name="skyking-4" href="#">&nbsp;</a>第四讲</h3>
<p><strong>第一节∶定位及文件状态<strong><strong><strong><a id="skyking-4-1" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></strong></p>
<p><span><span>** 输入 CTRL-g 显示当前编辑文件中当前光标所在行位置以及文件状态信息。</span>输入 SHIFT-G 则直接跳转到文件中的某一指定行。**</span></p>
<p><em><strong>  提示∶</strong>切记要先通读本节内容，之后才可以执行以下步骤!!!</em></p>
<p>  1. 按下 CTRL 键不放开然后按 g 键。然后就会看到页面最底部出现一个状态信     息行，显示的内容是当前编辑的文件名和文件的总行数。请记住步骤3的行号。</p>
<p>  2. 按下 SHIFT-G 键可以使得当前光标直接跳转到文件最后一行。</p>
<p>  3. 输入您曾停留的行号，然后按下 SHIFT-G。这样就可以返回到您第一次按下     CTRL-g 时所在的行好了。注意∶输入行号时，行号是不会在屏幕上显示出来     的。</p>
<p>  4. 如果愿意，您可以继续执行步骤1至步骤三。</p>


<p><strong>第二节∶搜索类命令<strong><strong><strong><strong><a id="skyking-4-2" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></strong></strong></p>
<p><span>** 输入 / 以及尾随的字符串可以用以在当前文件中查找该字符串。**</span></p>
<p>  1. 在正常模式下输入 / 字符。您此时会注意到该字符和光标都会出现在屏幕底     部，这跟 : 命令是一样的。</p>
<p>  2. 接着输入 errroor &lt;回车&gt;。那个errroor就是您要查找的字符串。</p>
<p>  3. 要查找同上一次的字符串，只需要按 n 键。要向相反方向查找同上一次的字     符串，请输入 Shift-N 即可。</p>
<p>  4. 如果您想逆向查找字符串，请使用 ? 代替 / 进行。</p>
<p>---&gt; When the search reaches the end of the file it will continue at the start.</p>
<p>  "errroor" is not the way to spell error;  errroor is an error.</p>
<p><em>  提示∶如果查找已经到达文件末尾，查找会自动从文件头部继续查找。</em></p>


<p><strong>第三节∶配对括号的查找<strong><strong><strong><strong><strong><a id="skyking-4-3" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></strong></strong></strong></p>
<p><span>** 按 % 可以查找配对的括号 )、]、}。**</span></p>
<p>  1. 把光标放在本节下面标记有 --&gt; 那一行中的任何一个 (、[ 或 { 处。</p>
<p>  2. 接着按 % 字符。</p>
<p>  3. 此时光标的位置应当是在配对的括号处。</p>
<p>  4. 再次按 % 就可以跳回配对的第一个括号处。</p>
<p>---&gt; This ( is a test line with ('s, ['s ] and {'s } in it. ))</p>
<p><em>提示∶在程序调试时，这个功能用来查找不配对的括号是很有用的。</em></p>


<p><strong><span>第四节∶修正错误的方法之一<strong><strong><strong><strong><strong><a id="skyking-4-4" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></strong></strong></span></strong></p>
<p><span>** 输入 :s/old/new/g 可以替换 old 为 new。**</span></p>
<p>  1. 请将光标移动到本节中下面标记有 ---&gt; 的那一行。</p>
<p>  2. 输入<span> :s/thee/the &lt;回车&gt; </span>。请注意该命令只改变光标所在行的第一个匹配     串。</p>
<p>  3. 输入<span> :s/thee/the/g</span>  则是替换全行的匹配串。</p>
<p>---&gt; the best time to see thee flowers is in thee spring.</p>
<p>  4. 要替换两行之间出现的每个匹配串，请输入 :#,#s/old/new/g (#,#代表的是两行的行号)。输入 :%s/old/new/g 则是替换整个文件中的每个匹配串。</p>


<p><strong><span>第四讲小结<strong><strong><strong><strong><strong><a id="skyking-4-5" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></strong></strong></span></strong></p>
<p><span>1.<span> Ctrl-g</span> 用于显示当前光标所在位置和文件状态信息。Shift-G 用于将光标跳</span>     转至文件最后一行。先敲入一个行号然后按 Shift-G 则是将光标移动至该行     号代表的行。</p>
<p>  2. 输入 / 然后紧随一个字符串是则是在当前所编辑的文档中向后查找该字符串。     输入问号 ? 然后紧随一个字符串是则是在当前所编辑的文档中向前查找该字     符串。完成一次查找之后按 n 键则是重复上一次的命令，可在同一方向上查     找下一个字符串所在；或者按 Shift-N 向相反方向查找下该字符串所在。</p>
<p>  3. 如果光标当前位置是括号(、)、[、]、{、}，按 % 可以将光标移动到配对的     括号上。</p>
<p>  4. 在一行内替换头一个字符串 old 为新的字符串 new，请输入<span>  :s/old/new</span>     在一行内替换所有的字符串 old 为新的字符串 new，请输入<span>  :s/old/new/g</span>     在两行内替换所有的字符串 old 为新的字符串 new，请输入<span>  :#,#s/old/new/g</span>     在文件内替换所有的字符串 old 为新的字符串 new，请输入<span>  :%s/old/new/g</span>     进行全文替换时询问用户确认每个替换需添加 c 选项，请输入<span> :%s/old/new/gc</span></p>
<h3><a id="skyking-5" name="skyking-5" href="#">&nbsp;</a>第五讲</h3>
<p><strong>第一节∶在 VIM 内执行外部命令的方法<strong><strong><strong><strong><strong><a id="skyking-5-1" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></strong></strong></strong></p>
<p><span>** 输入 :! 然后紧随著输入一个外部命令可以执行该外部命令。**</span></p>
<p>  1. 按下我们所熟悉的 : 命令设置光标到屏幕底部。这样就可以让您输入命令了。</p>
<p>  2. 接着输入感叹号 ! 这个字符，这样就允许您执行外部的 shell 命令了。</p>
<p>  3. 我们以 ls 命令为例。输入 !ls &lt;回车&gt; 。该命令就会列举出您当前目录的     内容，就如同您在命令行提示符下输入 ls 命令的结果一样。如果 !ls 没起     作用，您可以试试 :!dir 看看。</p>
<p>---&gt;<em><strong> 提示∶</strong> 所有的外部命令都可以以这种方式执行。</em></p>
<p>---&gt;<em><strong> 提示∶</strong> 所有的 : 命令都必须以 &lt;回车&gt; 告终。</em></p>


<p><strong><span>第二节∶关于保存文件的更多信息<strong><strong><strong><strong><strong><strong><a id="skyking-5-2" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></strong></strong></strong></span></strong></p>
<p>      <span>** 要将对文件的改动保存到文件中，请输入 :w FILENAME 。**</span></p>
<p>  1. 输入 :!dir 或者 :!ls 获知当前目录的内容。您应当已知道最后还得敲     &lt;回车&gt; 吧。</p>
<p>  2. 选择一个尚未存在文件名，比如 TEST 。</p>
<p>  3. 接着输入 <span>:w TEST</span>  (此处 TEST 是您所选择的文件名。)</p>
<p>  4. 该命令会以 TEST 为文件名保存整个文件 (VIM 教程)。为了确保正确保存，     请再次输入 :!dir 查看您的目录列表内容。</p>
<p><em>---&gt; <strong>请注意∶</strong>如果您退出 VIM 然后在以文件名 TEST 为参数进入，那么该文件内</em><em>     容应该同您保存时的文件内容是完全一样的。</em></p>
<p>  5. 现在您可以通过输入 <span>:!rm TEST</span> 来删除 TEST 文件了。</p>


<p><strong>第三节∶一个具有选择性的保存命令<strong><span><strong><strong><strong><strong><strong><strong><a id="skyking-5-3" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></strong></strong></strong></span></strong></strong></p>
<p><span>** 要保存文件的部分内容，请输入 :#,# w FILENAME **</span></p>
<p>  1. 再来执行一次<span> :!dir</span> 或者<span> :!ls</span> 获知当前目录的内容，然后选择一个合适的     不重名的文件名，比如 TEST 。</p>
<p>  2. 接着将光标移动至本页的最顶端，然后按<span> CTRL-g</span> 找到该行的行号。别忘了     行号哦。</p>
<p>  3. 接着把光标移动至本页的最底端，再按一次<span> CTRL-g</span> 。也别忘了这个行好哦。</p>
<p>  4. 为了只保存文章的某个部分，请输入<span> :#,# w TEST</span> 。这里的 #,# 就是上面     要求您记住的行号(顶端行号,底端行号)，而 TEST 就是选定的文件名。</p>
<p>  5. 最后，用<span> :!dir</span> 确认文件是否正确保存。但是这次先别删除掉。</p>


<p><strong><span>第四节∶提取和合并文件<strong><span><strong><strong><strong><strong><strong><strong><a id="skyking-5-4" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></strong></strong></strong></span></strong></span></strong></p>
<p><span>** 要向当前文件中插入另外的文件的内容，请输入 :r FILENAME **</span></p>
<p>  1. 请键入<span> :!dir</span> 确认您前面创建的 TEST 文件还在。</p>
<p>  2. 然后将光标移动至当前页面的顶端。</p>
<p>特别提示∶ 执行步骤3之后您将看到第五讲第三节，请届时再往下移动回到这里来。</p>
<p>  3. 接着通过<span> :r TEST</span> 将前面创建的名为 TEST 的文件提取进来。</p>
<p>特别提示∶您所提取进来的文件将从光标所在位置处开始置入。</p>
<p>  4. 为了确认文件已经提取成功，移动光标回到原来的位置就可以注意有两份第     五讲第三节，一份是原本，另外一份是来自文件的副本。</p>


<p><strong>第五讲小结<strong><span><strong><strong><strong><strong><strong><strong><a id="skyking-5-5" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></strong></strong></strong></span></strong></strong></p>
<p><span>1.<span> :!command</span> 用于执行一个外部命令 command。</span></p>
<p>     请看一些实际例子∶   <span>:!dir</span>  -  用于显示当前目录的内容。    <span>:!rm FILENAME</span>  -  用于删除名为 FILENAME 的文件。</p>
<p>  2. <span>:w FILENAME</span>  可将当前 VIM 中正在编辑的文件保存到名为 FILENAME 的文     件中。</p>
<p>  3. <span>:#,#w FILENAME</span> 可将当前编辑文件第 # 行至第 # 行的内容保存到文件     FILENAME 中。</p>
<p>  4.<span> :r FILENAME</span> 可提取磁盘文件 FILENAME 并将其插入到当前文件的光标位置     后面。</p>


<h3><a id="skyking-6" name="skyking-6" href="#">&nbsp;</a>       第六讲</h3>
<p><strong>第一节∶打开类命令<strong><span><strong><strong><strong><strong><strong><strong><a id="skyking-6-1" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></strong></strong></strong></span></strong></strong></p>
<p><span>  ** 输入 o 将在光标的下方打开新的一行并进入插入模式。**</span></p>
<p>  1. 请将光标移动到本节中下面标记有 ---&gt; 的那一行。</p>
<p>  2. 接着输入小写的 o 在光标 *下方* 打开新的一行并进入插入模式。</p>
<p>  3. 然后复制标记有 ---&gt; 的行并按 &lt;ESC&gt; 键退出插入模式而进入正常模式。</p>
<p>---&gt; After typing  o  the cursor is placed on the open line in Insert mode.</p>
<p>  4. 为了在光标 *上方* 打开新的一行，只需要输入大写的 O 而不是小写的 o     就可以了。请在下行测试一下吧。当光标处在在该行上时，按 Shift-O可以     在该行上方新开一行。</p>
<p>Open up a line above this by typing Shift-O while the cursor is on this line.</p>


<p><strong><span>第二节∶光标后插入类命令<strong><strong><strong><strong><strong><strong><strong><strong><a id="skyking-6-2" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></strong></strong></strong></strong></strong></span></strong></p>
<p><span>** 输入 a 将可在光标之后插入文本。 **</span></p>
<p>  1. 请在正常模式下通过输入 $ 将光标移动到本节中下面标记有 ---&gt; 的第一行     的末尾。</p>
<p>  2. 接着输入小写的 a 则可在光标之后插入文本了。大写的 A 则可以直接在行     末插入文本。</p>
<p><em>提示∶输入大写 A 的操作方法可以在行末插入文本，避免了输入 i，光标定位到</em><em>      最后一个字符，输入的文本，&lt;ESC&gt; 回复正常模式，箭头右键移动光标以及</em><em>      x 删除当前光标所在位置字符等等诸多繁杂的操作。</em></p>
<p>  3. 操作之后第一行就可以补充完整了。请注意光标后插入文本与插入模式是基     本完全一致的，只是文本插入的位置定位稍有不同罢了。</p>
<p>---&gt; This line will allow you to practice---&gt; This line will allow you to practice appending text to the end of a line.</p>


<p><strong><span>第三节∶另外一个置换类命令的版本<strong><strong><strong><strong><strong><strong><strong><strong><a id="skyking-6-3" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></strong></strong></strong></strong></strong></span></strong></p>
<p><span>** 输入大写的 R 可连续替换多个字符。**</span></p>
<p>  1. 请将光标移动到本节中下面标记有 ---&gt; 的第一行。</p>
<p>  2. 移动光标到第一行中不同于标有 ---&gt; 的第二行的第一个单词的开始，即单     词 last 处。</p>
<p>  3. 然后输入大写的 R 开始把第一行中的不同于第二行的剩余字符逐一输入，就     可以全部替换掉原有的字符而使得第一行完全雷同第二行了。</p>
<p>---&gt; To make the first line the same as the last on this page use the keys.---&gt; To make the first line the same as the second, type R and the new text.</p>
<p>  4. 请注意∶如果您按 &lt;ESC&gt; 退出置换模式回复正常模式，尚未替换的文本将仍     然保持原状。</p>


<p><strong><span>第四节∶设置类命令的选项<strong><strong><strong><strong><strong><strong><strong><strong><a id="skyking-6-4" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></strong></strong></strong></strong></strong></span></strong></p>
<p><span>** 设置可使查找或者替换可忽略大小写的选项 **</span></p>
<p><span>1. 要查找单词 ignore 可在正常模式下输入 /ignore 。要重复查找该词，可以</span>     重复按 n 键。</p>
<p>  2. 然后设置 ic 选项(ic就是英文忽略大小写Ignore Case的首字母缩写词)，即     输入∶ <span>:set ic</span></p>
<p>  3. 现在可以通过键入 n 键再次查找单词 ignore。重复查找可以重复键入 n 键。</p>
<p>  4. 然后设置 hlsearch 和 incsearch 这两个选项，输入以下内容∶     <span>:set hls is</span></p>
<p>  5. 现在可以再次输入查找命令，看看会有什么效果∶     <span>/ignore</span></p>


<p><strong>第六讲 小结<strong><strong><strong><strong><strong><strong><strong><strong><a id="skyking-6-5" name="skyking-1-1" href="#">&nbsp;</a></strong></strong></strong></strong></strong></strong></strong></strong></strong></p>
<p><span>1. 输入小写的 o 可以在光标下方打开新的一行并将光标置于新开的行首，进入</span>     插入模式。     输入大写的 O 可以在光标上方打开新的一行并将光标置于新开的行首，进入     插入模式。</p>
<p>  2. 输入小写的 a 可以在光标所在位置之后插入文本。     输入大写的 A 可以在光标所在行的行末之后插入文本。</p>
<p>  3. 输入大写的 R 将进入替换模式，直至按 &lt;ESC&gt; 键退出替换模式而进入正常     模式。</p>
<p>  4. 输入<span> :set xxx</span> 可以设置 xxx 选项。</p>


<h3><a id="skyking-7" name="skyking-7" href="#">&nbsp;</a><span>第七讲∶在线帮助命令</span></h3>
<p><span>         ** 使用在线帮助系统 **</span></p>
<p>  Vim 拥有一个细致全面的在线帮助系统。要启动该帮助系统，请选择如下三种方  法之一∶  - 按下 &lt;HELP&gt; 键 (如果键盘上有的话)  - 按下 &lt;F1&gt; 键 (如果键盘上有的话)  - 输入  :help &lt;回车&gt;</p>
<p>  输入 :q &lt;回车&gt; 可以关闭帮助窗口。</p>
<p>  提供一个正确的参数给":help"命令，您可以找到关于该主题的帮助。请试验以  下参数(可别忘了按回车键哦。:)∶</p>
<p><span>   :help w &lt;回车&gt;</span><span>    :help c_&lt;T &lt;回车&gt;</span><span>    :help insert-index &lt;回车&gt;</span><span>   :help user-manual &lt;回车&gt;</span></p>


<h3><a id="skyking-8" name="skyking-8" href="#">&nbsp;</a><span>第八讲∶创建一个启动脚本</span></h3>
<p><span>       ** 启用vim的功能 **</span></p>
<p>  Vim的功能特性要比vi多得多，但大部分功能都没有缺省激活。为了启动更多的功能，您得创建一个vimrc文件。</p>
<p>  1. 开始编辑vimrc文件，这取决于您所使用的操作系统∶</p>
<p><span>     :edit ~/.vimrc    这是Unix系统所使用的命令</span><span>     :edit $VIM/_vimrc    这是Windows系统所使用的命令</span></p>
<p>  2. 接着导入vimrc范例文件∶</p>
<p><span>     :read $VIMRUNTIME/vimrc_example.vim</span></p>
<p>  3. 保存文件，命令为∶</p>
<p><span>     :write</span></p>
<p>  在下次您启动vim的时候，编辑器就会有了语法高亮的功能。您可以继续把您喜欢的其它功能设置添加到这个vimrc文件中。</p>


<h3>结语</h3>
<p>  vim 教程到此结束。本教程只是为了简明地介绍一下vim编辑器，但已足以让您很容易学会使用本编辑器了。毋庸质疑，vim还有很多很多的命令，本教程所介绍的还差得远著呢。所以您要精通的话，还望继续努力哦。下一步您可以阅读  vim手册，使用的命令是∶  <span>:help user-manual</span></p>
<p>  为了更进一步的参考和学习，以下这本书值得推荐∶</p>
<blockquote>
<p><span>Vim - Vi Improved - 作者∶Steve Oualline</span>出版社∶New Riders</p>

</blockquote>
<p>  这是第一本完全讲解vim的书籍。对于初学者特别有用。其中还包含有大量实例和图示。欲知详情，请访问 <a href="http://iccf-holland.org/click5.html" target="_blank">http://iccf-holland.org/click5.html</a></p>
<p>  以下这本书比较老了而且内容主要是vi而不是vim，但是也值得推荐∶</p>
<blockquote>
<p>Learning the Vi Editor - 作者∶Linda Lamb出版社∶O'Reilly < Associates Inc.</p>

</blockquote>
<p><span>这是一本不错的书，通过它您几乎能够了解到全部vi能够做到的事情。此书的第</span></p>
<p>  六个版本也包含了一些关于vim的信息。</p>


<p>GVIM中的教程，觉得不错，放到这里分享~ 我所做的工作就是将其格式化，让读者便于阅读 :)</p>



