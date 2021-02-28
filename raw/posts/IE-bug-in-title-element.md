---
title: IE下title没有childNodes
categories:
  - JavaScript
  - 前端杂烩
tags:
  - IEbug
  - firstChild
  - childNodes
date: 2014-08-21 00:00:00
---


**问题：**

> IE 8下 document.getElementsByTagName('title')[0].firstChild为毛是null啊 而document.getElementsByTagName('title')[0].innerHTML却有值，给title赋值却报错。

按照 w3c 的解释，title 元素下有且只有一个 text node，除 IE 外，其他浏览器都能正确打印 getTagName("title").item(0).childNodes == 1; 而 IE 他不认为 title 元素有 childNode，你可以当他是没有实现规范的 bug。IE9+ 修复了这个问题。
