---
title: Ubuntu下Rhythmbox mp3音乐乱码
categories:
  - 杂物间
tags:
  - messy
  - 乱码
  - Ubuntu
date: 2014-04-27 00:00:00
---


linux系统遇到点乱码问题是很正常的，你碰到的问题，别人一般会已经碰到过，甚至已经有了很好的解决方案。

今天遇到的问题是：Rhythmbox mp3音乐乱码

处理方案：

    sudo vim /etc/profile  # 类似 windows 下的环境变量
    # 添加
    export GST_ID3_TAG_ENCODING=GBK:UTF-8:GB18030
    export GST_ID3V2_TAG_ENCODING=GBK:UTF-8:GB18030
    
![Rhythmbox mp3音乐乱码](/blogimgs/2014/04/27/cd93a704-ce17-11e3-9b5d-a00b8c0f6c03.jpg)<!--<source src="//cloud.githubusercontent.com/assets/2698003/2811361/cd93a704-ce17-11e3-9b5d-a00b8c0f6c03.jpg">-->

重启电脑，没想到不用重启的方法，`source ~/.profile` 没效果。

