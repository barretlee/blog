---
title: 理解 Gulp 和 Webpack
description: Gulp 和 webpack 之间的关系是十分暧昧的，却也经常被人误解，以为它俩是竞争关系，其实不然。
warning: true
categories:
  - 工具
  - 前端杂烩
tags:
  - Gulp
  - Webpack
date: 2017-04-27 12:50:00
---


Gulp 和 webpack 之间的关系是十分暧昧的，却也经常被人误解，以为它俩是竞争关系，其实不然。

![gulp & webpack](/blogimgs/2017/04/27/6c0378f8gy1ff18pl2w55j21400m8tag.jpg)<!--<source src="http://ww1.sinaimg.cn/large/6c0378f8gy1ff18pl2w55j21400m8tag.jpg">-->

<!--more-->

Gulp 是一个任务管理工具，让简单的任务更清晰，让复杂的任务易于掌控；而 webpack 的理念是，一切皆为模块，每个模块在打包的时候都会经过一个叫做 loader 的东西，它具备非常强大的精细化管理能力，主要解决的是依赖分析问题。

Gulp 的学习，搞清楚 `gulp.src`, `gulp.dest`, `gulp.task`, `gulp.watch` 四个 API 就差不多了，它的底层原理是使用 Node 的 Transform Streams，这是一个可读可写可做中间转换的 Streams 管道，由于从 src 到 dest 过程中，文件一直停留在 Streams 中，没有落地成为实体文件，所以整体运作效率非常高。

Webpack 概念很多，但搞清楚 `entry`，`output` 和 `loader` 三个关键点，基本上就可以解决简单的问题了，稍微复杂的场景主要包括对资源的合并处理、分拆处理、多次打包等，部分这样的问题可以使用插件辅助解决，但是 Webpack 的强大并不在文件处理，而是依赖分析，所以在流程操作特别复杂的情况，webpack 并不能胜任工作，往往会被作为 gulp 的一个 task，整体工作流交给 gulp 主导。

### 插件推荐

下面推荐几个 gulp 的插件吧，比较常用的：

- `gulp-load-plugins`：自动加载 package.json 中的 gulp 插件
- `gulp-rename`： 重命名
- `gulp-uglify`：文件压缩
- `gulp-concat`：文件合并
- `gulp-less`：编译 less
- `gulp-sass`：编译 sass
- `gulp-clean-css`：压缩 CSS 文件
- `gulp-htmlmin`：压缩 HTML 文件
- `gulp-babel`：使用 babel 编译 JS 文件
- `gulp-jshint`：jshint 检查
- `gulp-imagemin`：压缩 jpg、png、gif 等图片
- `gulp-livereload`：当代码变化时，它可以帮我们自动刷新页面

也推荐几个 webpack 常用的 loader 和 plugin：

- Loader 列表
  - `less-loader, sass-loader`：处理样式
  - `url-loader, file-loader`：两个都必须用上。否则超过大小限制的图片无法生成到目标文件夹中
  - `babel-loader，babel-preset-es2015，babel-preset-react`：js 处理，转码
  - `expose-loader`： 将 js 模块暴露到全局
- Plugin 列表
  - `NormalModuleReplacementPlugin`：匹配 resourceRegExp，替换为 newResource
  - `ContextReplacementPlugin`：替换上下文的插件
  - `IgnorePlugin`：不打包匹配文件
  - `PrefetchPlugin`：预加载的插件，提高性能
  - `ResolverPlugin`：替换上下文的插件
  - `DedupePlugin`：打包的时候删除重复或者相似的文件        
  - `MinChunkSizePlugin`：把多个小模块进行合并，以减少文件的大小        
  - `LimitChunkCountPlugin`：限制打包文件的个数        
  - `MinChunkSizePlugin`：根据 chars 大小，如果小于设定的最小值，就合并这些小模块，以减少文件的大小    
  - `OccurrenceOrderPlugin`：根据模块调用次数，给模块分配 ids，常被调用的 ids 分配更短的 id，使得 ids 可预测，降低文件大小，该模块推荐使用        
  - `UglifyJsPlugin`：压缩 js        
  - `CommonsChunkPlugin`：多个 html 共用一个 js 文件(chunk)
  - `HotModuleReplacementPlugin`：模块热替换么，如果不在 dev-server 模式下，需要记录数据，recordPath，生成每个模块的热更新模块    
  - `ProgressPlugin`：编译进度        
  - `NoErrorsPlugin`：报错但不退出 webpack 进程    
  - `HtmlWebpackPlugin `：生成 html        

### 拓展阅读

- http://huang-jerryc.com/2017/02/28/gulp-base/
- http://www.thkdog.com/html5/2015/05/08/webpack.html