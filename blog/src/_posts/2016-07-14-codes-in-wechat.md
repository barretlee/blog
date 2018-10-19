---
title: 在公众号中优雅地呈现代码
description: 这几天有不少朋友在我的微信公众号留言，问我是如何在公众号页面中整齐摆放代码的，今天就分享下我的方法，事实上我也折腾了好一会儿。
warning: true
categories:
  - 工具
  - 前端杂烩
tags:
  - 微信公众号
date: 2016-07-14 00:00:01
---

> 下文不用看了，直接戳这里吧：<a href="http://md.barretlee.com/" target="_blank">http://md.barretlee.com/</a>，我开发了一个在线工具。

这几天有不少朋友在我的微信公众号留言，问我是如何在公众号页面中整齐摆放代码的，今天就分享下我的方法，事实上我也折腾了好一会儿。

![//unsplash.com/photos/KR84RpMCb0w by Khara Woods](/blogimgs/2016/07/14/6c0378f8gw1f5spwap82oj20p00dwacl.jpg)<!--<source src="//ww1.sinaimg.cn/large/6c0378f8gw1f5spwap82oj20p00dwacl.jpg">-->

<!--more-->

### 长话短说

> Markdown 解释器在转换代码片段时，没有在换行的时候添加 `<br>` 标签，而是直接输出一个换行符 `\n`，微信编辑页在保存或者预览时，将部分换行符给过滤了。

下文主要讲的是很多公众号维护者遇到的代码展示问题，以及处理这些问题的几个思路。

### 自动批量将代码转为图片

观察了很多技术类公众号，绝大多数为了保证良好可视效果，直接采用代码截图，这种做法很简洁，但也存在几个问题：

- 需要人肉截图和上传图片，对公众号维护者来说很麻烦
- 页面中代码截图太多，也影响阅读，尤其是弱网下的读者
- 截图控制不好，会出现多余内边距，或者因为尺寸问题，不得已做缩放处理

以上对维护者和用户来说，都是很不爽的，如果一定要使用图片，我倒是建议维护者开发一个组件，将页面中的代码段自动转为图片，思路如下：

- 将代码片段渲染出来，使用 `highlight.js` 高亮代码
- 将高亮的代码绘制到 canvas 中
- 导出 base64 图片，或者通过 `a[download]` 将图片下载下来保存到本地

之前月影姐姐开发了一个 `code-to-image`，感兴趣的同学可以去 github 上搜索下。

我有考虑过写这个程序，不过后来找到了一个更加有用的办法。

### Markdown Here

`Markdown Here` 是一款 Chrome 插件，顾名思义，就是将你写的 Markdown 直接转为 HTML 代码，我做了一个演示图片：

![markdown here](/blogimgs/2016/07/14/6c0378f8gw1f5sr5vq6sng20f70c844o.gif)<!--<source src="//ww1.sinaimg.cn/mw690/6c0378f8gw1f5sr5vq6sng20f70c844o.gif">-->

图中的编辑框并不是一个 `textarea` 控件，试想下这个控件中怎么玩也玩不出渲染好的 HTML 代码来，事实上，它是一个可编辑的普通元素，即加了一个 `contenteditable` 属性，你可以按照下面的步骤测试下：

- 打开一个新的 Tab
- URL 中输入：`data:text/html,<html contenteditable>`
- 然后去一个网页中全选所有内容，在上面的 URL 页面中粘贴

是不是把粘贴的内容是具备样式的？再用 Chrome Devtools 看看每个元素，你会发现，原来的样式被继承下来并且作为内敛样式嵌入。

微信公众号的编辑框也是 contenteditable 的，所以你可以通过 Markdown Here 插件将 Markdown 文本直接转换为代码。只可惜，可是在点击保存和预览的时候，内容又被微信的脚本重新解析了一次，过滤了部分内敛属性，一些转行符也被它给忽略了，如下在微信编辑框中展示正常的代码：

![正常代码](/blogimgs/2016/07/14/6c0378f8gw1f5spemu4oxj20x608ijs2.jpg)<!--<source src="//ww1.sinaimg.cn/large/6c0378f8gw1f5spemu4oxj20x608ijs2.jpg">-->

在点击预览后，展示效果为：

![错乱代码](/blogimgs/2016/07/14/6c0378f8gw1f5spfr9y53j20kc0gowfi.jpg)<!--<source src="//ww1.sinaimg.cn/large/6c0378f8gw1f5spfr9y53j20kc0gowfi.jpg">-->

变成一行了，原因是代码中部分转行符号被过滤掉了。

### 处理办法

可以通过几行正则，将 Markdown 转换的源码做小小的修改，部分换行符 `\n` 替换成 `<br>` 标签就行了。我的个人博客采用的是 hexo 构建的，它渲染出来的代码在换行处已经有了换行标签：

![棒棒的代码效果](/blogimgs/2016/07/14/6c0378f8gw1f5sprhj1v5j214c0ziafp.jpg)<!--<source src="//ww1.sinaimg.cn/large/6c0378f8gw1f5sprhj1v5j214c0ziafp.jpg">-->

把博客代码直接粘贴过来的效果是：

```javascript
function syntaxHighlighting() {
  var n = 33;
  var s = "hello, こんにちは";
  console.log(s);
}
```

是不是感觉还不错？那么，写正则替换微信编辑器渲染源码，修复过滤换行符问题这么神圣的事情，就交给读者了！
