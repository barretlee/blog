---
title: 如何快速上手一款 IDE - VSC 配置指南和插件推荐
description: >-
  VSCode 刚出来的时候并不是特别看好，因为 Sublime 和 Atom 的插件生态已经做起来了，成千上万个可供选择，VSC
  从零开始，除了自身提供的几个内置插件外几乎没有多余的选择，没想到短短一年多的时间，发展如此快。
warning: true
categories:
  - 工具
tags:
  - VSC
date: 2017-04-21 12:23:28
---
VSCode 刚出来的时候并不是特别看好，因为 Sublime 和 Atom 的插件生态已经做起来了，成千上万个可供选择，VSC 从零开始，除了自身提供的几个内置插件外几乎没有多余的选择，没想到短短一年多的时间，发展如此快，下图是我在其他平台也比较常用的几个插件，我安装了挺多，大概二三十个。

![VSC](/blogimgs/2017/04/21/006tKfTcgy1feu3asuhi8j31400p0jxr.jpg)<!--<source src="//ww3.sinaimg.cn/large/006tKfTcgy1feu3asuhi8j31400p0jxr.jpg">-->

<!--more-->

当初看中 Atom 放下 Sublime 的主要原因是 Atom 可以让用户自定义界面，而且我学会了在 Atom 上写插件，觉得很爽，而且我也确实自定义了很多靠近自己使用习惯的内容。

如今投奔 VSC，原因是我发现自己并没有太多自定义 Editor 界面的需求，而且经常搞出一堆性能问题，潜进去解决这些问题太费时间了，尤其是 Atom 打开一个大文件慢的要命的问题，超过 1M 差不多就会把界面搞挂，这让我不可忍受。

VSC，怎么说呢，M$ 的大腿还是很粗的，同样底层用着 Electron，VSC 的水平要高 Atom 好几个档次，差距太大...

### 关于编辑器的个性化

Sublime Text，Visual Studio Code，Atom，WebStorm 等编辑器，前三者的使用门槛都不高，最后一个由于自身过于强大，很多人对它都有点畏惧，这和对 VIM 的畏惧是不一样的，使用 Windows 的同学基本都会使用鼠标，VIM 是一款让你脱离鼠标的编辑器，需要记忆的快捷键比较多，它的插件配置也过于灵活，以至于很多人难以坚持使用它。

选择并坚持使用一个 IDE，我们会很关注它的使用效率，包括界面的美观和功能的完善度，比如支持换肤、能够调试多种语言、具备友好的控制台等等，这些特征 Atom、VSC 和 WebStorm 都具备。编辑器本没有什么好坏之分，你用得爽就最好了，我有一个朋友使用最简洁的记事本写过几个月程序，这也并不影响他的程序质量。

不过，在我看来， WebStorm 过于臃肿了，而且还不是免费的；Sublime 在插件机制上对前端也没有亲和力；Atom 的整体性能还达不到我理想中的要求；VIM 的理念过于深入，灵活性强到普通人都接受不了。从 Atom 到 VSC，我看重的只有 VSC 打开大文件效率这一点，而且作为一名优秀的编辑器，它该具备的都已经具备了，比如繁荣的插件生态，以及持续的版本迭代，这足以给我巨大的信心和勇气使用它。

从一个 IDE 转移到另一个，最让我们头疼的事情莫过于使用习惯，好在 ST、VSC、Atom 已经统一了这种习惯，比如使用 `Command + Shift + P` 调出 Pannel，便可以在这里做任何你想得到的事情。

### 拿到 VSC 的第一件事

安装 VSC 后，我心里想的第一件事请就是，如何像使用 Atom 一样让我使用 VSC，毕竟我在 Atom 上配置了许多个性化的内容。一个编辑器的配置大体包括这三块：

- **IDE 配置**，调整字体、颜色、行高、行溢出等；
- **快捷键配置**，比如多行编辑、预览设置、折行设置等；
- **插件配置**，安装 IDE 辅助功能，而每个插件也包含上述两部分配置；

拿到 VSC 的第一件事请就是增加了两个快捷键，让我可以快速打开 IDE 配置界面和快捷键配置界面，快捷键的配置可以在这里找到：

![VSC 快捷键](/blogimgs/2017/04/21/006tKfTcgy1feu3zq0epwj30dg07bdgr.jpg)<!--<source src="//ww2.sinaimg.cn/large/006tKfTcgy1feu3zq0epwj30dg07bdgr.jpg">-->

进入之后，搜索 `setting` 和 `keyboard` 就可以进行设置了，打开 IDE 配置的快捷键我调整为 `Command + ,`，打开快捷键配置界面的快捷键我调整为 `Command + Shift + ,`，这个配置给我带来了很大的便利，配合关键字搜索，我几乎可以在十几秒内完成任何一个功能的快捷键配置和界面的修改。比如我需要在编码界面上增加一个尺子，提醒自己代码一行不要写太长，按下了 `Command + ,`，然后搜索 `ruler`，得到了这个：

![VSC - Ruler](/blogimgs/2017/04/21/006tKfTcgy1feu45ds8j5j31400p0q8r.jpg)<!--<source src="//ww3.sinaimg.cn/large/006tKfTcgy1feu45ds8j5j31400p0q8r.jpg">-->

左边是系统默认配置，可不更改，右侧是用户个性化配置，可以覆盖默认配置，我增加了一行：

```javascript
"editor.rulers": [80, 100]
```

于是我的界面上多了两条标尺线：

![标尺线](/blogimgs/2017/04/21/006tKfTcgy1feu46u3rfzj31400p0dmy.jpg)<!--<source src="//ww2.sinaimg.cn/large/006tKfTcgy1feu46u3rfzj31400p0dmy.jpg">-->

我用了大概一个小时，将自己最常用的快捷键配置好了，比如我最喜欢的多行编辑，换成了自己熟悉的快捷键（Gif图片）：

![多行编辑配置](/blogimgs/2017/04/21/006tKfTcgy1feu6aa5k7lg30jv08hti7.gif)<!--<source src="//ww3.sinaimg.cn/large/006tKfTcgy1feu6aa5k7lg30jv08hti7.gif">-->

不管自己用了多久的 Atom 或者 ST，当这些基础配置完成之后，会觉得转投另一个 IDE 并非什么痛苦的事情。

### 接下来就是插件配置

考虑一个 IDE，我会首先看看它是否有类似于 `Sync` 的插件，我有几台电脑，不可能每次换电脑都让我重新配置一次，我可经不起这个折腾，实际上，Atom 和 VSC 都提供了 `Sync` 插件，比如 VSC 的 `Settings Sync`，可以轻松将 IDE 的所有配置一键备份到 github 上，也可以将 github 上的配置一键拉取下来，然后重启 IDE 便可以共享同样的配置了。这个配置并不复杂，考虑到新手同学，我来简单介绍下它的使用：

- 在左侧的 sidebar 选中最后一个，搜索 `Sync`，不出意外，你会从前几个中找到下载量很高的那个 `Settings Sync`；
- 安装后，摁下 `Command + Shift + P` 打开控制面板，搜索 Sync，选择 `update/upload` 可以上传你的配置，选择 `Download` 会下载远程配置；
- 如果你之前没有使用过 Sync，在上传配置的时候，会让你在 Github 上创建一个授权码，允许 IDE 在你的 gist 中创建资源；下载远程配置，你可以直接将 gist 的 id 填入；
- 下载后等待安装，然后重启即可

为了界面美观，你可以下载 `vscode-icons` 和 `xx-theme` 主题，只要你想得到的，在插件市场中搜索，都可以先下载下来，然后通过控制面板搜索关键词进行配置，一些常用插件，也可以通过之前配置的 `Command + ,` 和 `Command + Shift + ,` 来调整符合你喜欢的使用方式i。


### 推荐一些插件

VSC 内置了许多插件，需要我们配置的其实已经不太多了，我用的比较频繁的几个插件是：

- `ESLint`，检查代码格式
- `Insert Date String`，插入诸如 `2017-04-21 11:21:46` 这个字符串，我写博客经常要用
- `Git History`，查看代码的编辑历史
- `Prettify JSON`，格式化 JSON 文件
- `Markdown Preview`，预览 Markdown 文件
- `Code Runner`，运行程序
- `Terminal`，打开 zsh 控制台
- `View In Browser`，打开 html 文件
- `Document This`，自动生成注释
- `File Peek`，类似于 Go To Definition，点击后定位文件
- `Image Preview`，在行号左侧的小槽中展示图片的预览，MD 中也可以 hover 预览

以上是用的比较多的，还装了几十个使用频度比较低的插件，主要包括 Snippet 和文件高亮配置，可以在这里查看：<https://gist.github.com/barretlee/a5170eb6ca1805f66687063d2e3a4983>，你也可以通过 `Settings Sync` 将这个配置下载下来，id 就是后面半截：`a5170eb6ca1805f66687063d2e3a4983`。

### 在命令行打开 VSC

在安装好 VSC 后，直接配置 `.bash_profile` 或者 `.zshrc` 文件：

```bash
alias vsc='/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code';
VSC_BIN='/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin';
PATH=$VSC_BIN:$PATH;
export PATH;
```

然后让配置生效，在控制台执行：

```bash
# 如果没有安装 zsh，可能是 ~/.bash_profile
source ~/.zshrc 
```

这个时候就可以在全局打开了：

```bash
# -a 的意思是不要新开窗口，在当前已经打开的 vsc 中打开文件
vsc path/to/file.ext -a 
```

有同学提到，VSC 的面板上搜索 `install` 就可以在命令行安装 `code` 这个命令了，不过我更喜欢使用 `vsc` 来打开文件，这也算是折腾吧 ；）

### 小结

一款好的 IDE 能够帮助我们预防很多程序上愚蠢的问题，也能够聚合一系列小工具，避免我们频繁地切换工作区间。VSC 只是众多选择中的一个，熟悉其他编辑器的套路也是一样的。

「磨刀不误砍柴工」，花费点时间在工具的研究上，可以提升我们的开发和写作效率，提倡大家在这方面进行长时间的折腾。