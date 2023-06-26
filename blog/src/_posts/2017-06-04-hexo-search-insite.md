---
title: 为 Hexo 博客增加一个站内搜索
description: ' 最近两个周末在 Hexo 博客的构建上做了不少事情，我会分成几篇文章一一叙述，首先来说一说 Hexo 的一个插件 `hexo-generator-search`，利用它可以给博客增加一个站内搜索'
warning: true
author: 小胡子哥
tags:
  - 前端杂谈
categories:
  - 前端杂谈
date: 2017-06-04 12:30:00
---
这个页面的右上角就可以看到效果（如果你是通过 PC 打开的话~）。

最近两个周末在 Hexo 博客的构建上做了不少事情，我会分成几篇文章一一叙述，首先来说一说 Hexo 的一个插件 `hexo-generator-search`，利用它可以给博客增加一个站内搜索，如下图所示：

![问答](/blogimgs/2017/06/04/hexo-blog-search-plugin.png)

上面这个样式是我自己写的，但是用到了插件生成的 xml 文件，下面我来简述下如何安装和使用它。

### 安装

安装分为两步，首先通过 npm 将插件安装到本地：

```bash
npm install hexo-generator-search --save
```

然后在全局（`_config.yml`）配置：

```yml
search:
  path: search.xml
  field: post
```

- `path`，生成的路径，上述配置后可以通过 `/search.xml` 访问到文件
- `field`，用来配置全局检索的区间，可以是 `post/page/all`

### 使用

并不是安装好这个插件就完事儿了，这个插件做的事情只是把配置文件中提到的检索区域内容打包进 `search.xml`，剩下的工作还是需要自己来做的，我写了一个栗子，也就是本博客正在使用的效果，想偷懒的同学可以拿过去使用：

- [hexo-search-plugin-snippets](https://github.com/barretlee/hexo-search-plugin-snippets)

代码比较粗糙，也是直接从网上拿过来做了些细节改动，初始化代码引入好了之后，初始化方法：

```js
if ($('.local-search').size() && !isMobile.any()) {
  $.getScript('path/to/search.js', function() {
    searchFunc("/search.xml", 'local-search-input', 'local-search-result');
  });
}
```

细节问题自己去研究研究吧~