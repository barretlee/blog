### 小胡子哥的个人网站

<a href="https://www.barretlee.com" target="_blank"><img src="https://img.alicdn.com/imgextra/i3/O1CN01tDYnfz23AWT1ag79p_!!6000000007215-2-tps-1200-1200.png" width="150" /></a>

博客地址: <https://www.barretlee.com>.

Master 分支为博客系统的构建代码, gh-pages 分支为部署代码.


### Makefile 使用说明

还未做优化, 博客的 hexo 主题暂未发布.

```
====================A common Makefile for blog system=======================
Copyright (C) 2015 barret.china@gmail.com
The following targets are support:

 i --init             - init, run npm install
 r --run              - start local serve at http://0.0.0.0:4000
 d --deploy           - deploy project to gitcafe & github
 b --backup (P=)      - backup dates, push to git
                         make backup P=1; P->PUSH
 h --help             - show help info
 n --new (N=|P=)      - init new post
                         make new N=postname; N->NEW
                         make new N=postname P=1; P->PUBLISH

To make a target, do make [target], short for make [t]
============================== Version0.1 ==================================
```

### 博客说明

博客在 `gh-pages` 分支上，`master` 分支博客静态资源的生成程序。博客基于 [hexo](https://hexo.io) 构建，在 Github Action 自动化部署。