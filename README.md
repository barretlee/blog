### 小胡子个人网站

<a href="http://www.barretlee.com" target="_blank"><img src="./blog/src/blogimgs/avatar150.png" width="150" /></a>

博客地址: <http://www.barretlee.com>.

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

博客在 `gh-pages` 分支上，`master` 分支博客静态资源的生成程序。博客基于 [hexo](https://hexo.io) 构建，用到的相关 `hexo` 组件如下所示：

```
"hexo": "^3.3.7",
"hexo-admin2": "*",
"hexo-all-minifier": "^0.5.2",
"hexo-deployer-ftpsync": "^0.1.1",
"hexo-deployer-git": "0.0.4",
"hexo-deployer-heroku": "0.0.3",
"hexo-deployer-rsync": "~0.1.1",
"hexo-generator-archive": "^0.1.2",
"hexo-generator-category": "^0.1.2",
"hexo-generator-feed2": "*",
"hexo-generator-index": "^0.1.2",
"hexo-generator-search": "^2.1.1",
"hexo-generator-sitemap": "~1.0.1",
"hexo-generator-tag": "^0.1.1",
"hexo-lazyload-image2": "*",
"hexo-migrator-rss": "~0.1.2",
"hexo-renderer-ejs": "^0.1.0",
"hexo-renderer-marked": "^0.2.4",
"hexo-renderer-stylus": "^0.3.0",
"hexo-server": "^0.1.3",
"hexo-tag-imgurl": "^0.0.3"
```

为了能够满足我自己的需求，在本地对其中部分 `generator` 插件做了改造。

由于 `github` 的访问速度在国内比较慢，所以网站部署在 `coding.net` 上，这个可以在 `blog/_config.yml` 文件下看到具体配置。
