---
title: 巧妙交换值
categories:
  - JavaScript
  - 前端杂烩
tags:
  - hack
  - tips
date: 2014-04-26 00:00:00
---


    a = 1, b = 2;
    a = [b, b = a][0];
    a // 2
    b // 1
    
很巧妙的替换了 a 和 b 的值。
