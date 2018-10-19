---
title: IOS边缘回弹的禁止
categories:
  - JavaScript
  - 前端杂烩
tags:
  - IOS
  - touchmove
  - scroll
date: 2014-04-27 00:00:00
---


IOS的浏览器里头，文档滚到顶部或者底部，还是可以继续滚动，对于全屏的应用来说，这个多余的体验是十分不好的。如下：

<img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/04/27/958be2f6-cdf2-11e3-8266-4adf0ab7da7d.jpg" data-source="//cloud.githubusercontent.com/assets/2698003/2810913/958be2f6-cdf2-11e3-8266-4adf0ab7da7d.jpg" />

比较靠谱的方式是：

    document.addEventListener("touchmove", function(evt){
      evt.preventDefault();
    }, true);
    
禁用 touchmove，方法很靠谱，不过还是谨慎点用。呵呵。
