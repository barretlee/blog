---
title: 去掉IE11中input右侧的关闭叉叉
categories:
  - 前端杂烩
tags:
  - CSS
date: 2014-11-17 00:00:00
---


在 IE11 下，浏览器自作多情在 text input 组件上加一个 close 叉叉：

![image](/blogimgs/2014/11/17/825ef988-6e3e-11e4-900a-5fadd3465d94.png)<!--<source src="//cloud.githubusercontent.com/assets/2698003/5064209/825ef988-6e3e-11e4-900a-5fadd3465d94.png">-->

这么整：

    input::-ms-clear { display: none; } 
    
这种伪元素类似于 web component.
