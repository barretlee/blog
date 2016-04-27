---
title: ￥符号，少了一横
categories:
  - 前端杂烩
tags:
  - css
date: 2014-08-29 00:00:00
---


跟钱有关的问题。

数值前加一个 ￥ 符号，可是视觉同学一定要使用两横的 dollar 符号。咋弄？

这个符号在不同字体下呈现的效果是不一样的，微软雅黑下是两横，不过显示的并不好看，正确的处理方式应该是：

    <style>i {font-family:"Microsoft Yahei";}</style>
    <i>&yen;</i>
    
