---
title: 新应用上线 Snippet
description: 'Snippet 是一款代码收集工具，经过一天三夜的开发终于上线了。应用地址：http://snippets.barretlee.com ，源码地址：//github.com/barretlee/snippets'
warning: true
categories:
  - 工具
tags:
  - snippets
date: 2015-09-29 07:15:05
---


Snippet 是一款代码片段收集工具，经过一天三夜的开发终于上线了。

![Snippet应用](/blogimgs/2015/09/29/20150902_2774c376.jpg)

- 应用地址：[snippets.barretlee.com](http://snippets.barretlee.com)
- 源码地址：[barretlee/snippets](//github.com/barretlee/snippets)


由于使用原生 JS 开发，效果利用 CSS3 实现，所以如果想有一个好的视觉体验，请使用 Chrome/FireFox 预览（后续会持续优化）。

<!--more-->

### 基本功能

代码片段收集工具？你说的是 gist 么？这东西有用？昨天我在社交平台发上线预告的时候，有几个朋友提出来疑问。二话不多说，先去看[线上效果](http://snippets.barretlee.com)。

本应用使用 [Jekyll](//jekyllrb.com) 构建，托管在 [github](//github.com/barretlee/snippets) 上，提供了如下基本功能：

- Snippet 按照文件夹储存分类呈现
- 整合在一起之后，单页面预览所有 Snippet
- 提供了快捷的**搜索功能**
- 每个 Snippet 对应 github 直接编辑的地址
- 提供了一个添加  Snippet 的快捷入口
- Snippet 的语法就是 markdown ，当然也可以跟写博客似的写 snipet，嵌入 demo，嵌入说明等。

所以只要有 github 权限，可以直接编辑代码，立即生效。

### 使用说明

一个小东西，硬生生开发了十几个小时。我对很多小细节扣的比较多，虽然自己不是设计出身，但是要求自己设计出来的东西能看、好看，所以常常走简约路线，复杂的设计搞不定。为了体验更好一些，我在页面上添加了几个小功能：

**1. 添加 snippet**

![add snippet](/blogimgs/2015/09/29/20150902_469e5db8.jpg)

进入页面之后，你可能看清楚了，左上角位置有个不是很明显的加号，点进去就会跑到 github 页面，由于是我的仓库，只有我能够直接编辑，其他人如果想添加代码段，需要 fork 过去之后，提交 PR，后续我会开发一个工具，方便其他人直接提交代码。

![github add snippet](/blogimgs/2015/09/29/snippet.gif)

新建文件夹十分方便，输入 `/foldName` 然后回车，github 就会自动建立一个文件夹，当然，如果文件夹存在，就会是进入文件夹。

**2. 搜索 snippet**

![search snippet](/blogimgs/2015/09/29/20150902_94f84521.jpg)

当我做完之后，发现找到一个自己收藏的 snippet 可真难，于是很自然的开发了一个搜索工具，搜索的范围是所有 snippet 的 title 名称，如果匹配到了就展示出来（当然，需要你点击 Enter 按钮）。

**3. 编辑 snippet**

![edit snippet](/blogimgs/2015/09/29/20150902_d775b963.jpg)

这个快捷入口直达该 snippet 的编辑地址，可以线上编辑，commit 之后立即生效。

![github editor](/blogimgs/2015/09/29/20150902_f7fa36e1.jpg)

这也是我为什么不使用 hexo 本地构建而使用 Jekyll 让 github 自动构建的目的（hexo 写插件用的语言是 nodejs，而 jekyll 是 ruby，所以各有利弊，本博客使用的就是 hexo 构建）。如果你喜欢这个 snippet ，可以点击编辑按钮左侧的小红心，哈哈~

### 后续开发

整个应用的开发，相对还是比较仓促的，存在比较多大的问题，所以后续有空也会不断优化它，直到我和大家用的都爽~ 那么，后续需要做的事情有：

- 响应式预览页面
- 收集 snippet 的工具
- 补充更多类型 snippet，提升完整度
- github 访问较慢，托管到 [gitcafe](//gitcafe.com) 或者 [coding](//coding.net/)

好了，如果大家喜欢这个应用，就去 [github](//github.com/barretlee/snippets) 上 start/fork 并且提交你的 snippet 吧！！

### 贡献代码

如果你想贡献代码，可以执行如下操作：

- fork [barretlee/snippets](//github.com/barretlee/snippets.git) 仓库
- 然后执行如下命令

```
git clone //github.com/{YOUR_GITHUB_NAME}/snippets.git
cd snippets
git chechout -b gh-pages
cd snippets
# 选择你想提交的文件类型，比如 html
cd html
touch {YOUR_CONTRIBUTE_FILE_NAME}.snippet
```

其中，`{YOUR_CONTRIBUTE_FILE_NAME}.snippet` 的格式为：

```
---
title: {NAME}
---

{CONTENT}
```

可以使用 markdown 语法。
- 提交代码

```
git add --all
git commit -m "add file html/{YOUR_CONTRIBUTE_FILE_NAME}.snippet"
git push origin gh-pages
```

- 然后在你的 [PR](//github.com/{YOUR_GITHUB_NAME}/snippets/pulls) 页面提交一个 PR 到 `barretlee/snippets` 的仓库