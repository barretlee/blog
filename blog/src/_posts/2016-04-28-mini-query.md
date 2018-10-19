---
title: 元素选择器 - Mini Query
description: 寥寥几行代码，实现一个简单的元素选择器，兼容低版本 IE。
warning: true
categories:
  - 工具
  - 前端杂烩
  - JavaScript
tags:
  - Mini Query
date: 2016-04-28 12:00:00
---


寥寥几行代码，实现一个简单的元素选择器，兼容低版本 IE。

<!--more-->

自 IE8 开始已经开始支持 querySelector 和 querySelectorAll 这两个十分有用的选择器函数，如果不考虑低版本浏览器，它们已经可以基本满足日常需求了。而在兼容低版本浏览器中，可以采用一些 hack 手段。

原理比较简单：通过 CSS Rule 给我们的目标元素添加特殊属性，然后遍历所有元素找到具备特殊属性的元素，当然，找到之后，移除这些特殊属性。

```javascript
var firstStyleSheet = document.styleSheets[0] || document.createStyleSheet();
  firstStyleSheet.addRule(query, 'Barret:Lee');
for (var i = 0, len = document.all.length; i < len; i++) {
  var item = document.all[i];
  item.currentStyle.Barret && res.push(item);
}
firstStyleSheet.removeRule(0);
```

比如我们要获取 `.box .item a.pink` 元素，上面的代码是这么做的,

- 给所有的 `.box .item a.pink` 元素添加 `{ Barret: Lee; }` 这个 CSS 的样式
- 遍历所有元素找到包含 Barret 这个 CSS 属性的元素
- 移除属性

IE8 有些调皮，需要修复点小问题，源码地址：

- git clone <http://github.com/barretlee/MiniQuery>
- `npm install mini-query`

代码预览：

```javascript
function $(query) {
  var res = [];
  if (document.querySelectorAll) {
    res = document.querySelectorAll(query);
  } else {
    var firstStyleSheet = document.styleSheets[0] || document.createStyleSheet();
    query = query.split(',');
    for(var i = 0, len = query.length; i < len; i++) {
      firstStyleSheet.addRule(query[i], 'Barret:Lee');
    }
    for (var i = 0, len = document.all.length; i < len; i++) {
      var item = document.all[i];
      item.currentStyle.Barret && res.push(item);
    }
    firstStyleSheet.removeRule(0);
  }
  if(res.item) { /* Fuck IE8 */
    var ret = [];
    for(var i = 0, len = res.length; i < len; i++){
      ret.push(res.item(i));
    }
    res = ret;
  }
  return res;
};
```
