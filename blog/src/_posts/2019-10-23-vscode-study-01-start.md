---
title: 让 VSCode 在本地 Run 起来
description: 小胡子哥的个人网站
warning: true
author: 小胡子哥
tags:
  - ' VSCode'
categories:
  - 前端杂谈
  - 工具
date: 2019-10-23 19:38:00
---
Visual Studio Code 是微软推出的一款轻量级编辑器，与它一起在市场争锋的相似软件还有 Atom 和 Sublime Text，面世第二年的它只占据 7% 左右的市场，后来在短短三年时间雄踞了半壁江山，不可谓不哇塞。

![vscode-snapshot](/blogimgs/2019/10/23/vscode-snapshot.png)

发育如此强势的软件，背后到底是如何设计的，未来一段时间，我将带着你一点一点拨开她的面纱，再撩开她的裙摆。

### 下载源码

Visual Studio Code 简称 VSCode，需要注意的是，平时我们使用的 VSCode 那是产品，而下面我们要介绍的是源码，产品是源码的构建结果；源码使用的 [MIT License](https://github.com/microsoft/vscode/blob/master/LICENSE.txt)，而产品使用的是这个 [MICROSOFT SOFTWARE LICENSE TERMS](https://code.visualstudio.com/License)，如果你想把 VSCode 用于商用，建议从源码构建出新的产品，而不是直接使用人家官网上提供下载链接的 VSCode Product。

- 官网地址是 <https://code.visualstudio.com/>
- 源码在这里：<https://github.com/microsoft/vscode>。

我们先把源码 down 下来：

```
git clone --depth 1 https://github.com/microsoft/vscode.git
```

由于 VSCode 项目过于活跃，提交量非常庞大，到目前为止，已经有 `56,092` 次提交了，建议在下载源码的时候加了一句 `--depth 1`，意思就是只现在最近一次 commit 的代码。

30s 后……71M，不慢。


### 安装依赖

在安装依赖之前，我们不妨稍微分析下 VSCode 的项目结构，

```bash
➜  vscode (master) tree -L 1
.
├── CONTRIBUTING.md
├── LICENSE.txt
├── README.md
├── ThirdPartyNotices.txt
├── azure-pipelines.yml
├── build/
├── cglicenses.json
├── cgmanifest.json
├── extensions/
├── gulpfile.js
├── package.json
├── product.json
├── remote/
├── resources/
├── scripts/
├── src/
├── test/
├── tsfmt.json
├── tslint.json
└── yarn.lock
```

未来我们需要重点关注的是 `src/` 和 `extensions/` 两个目录，前者放的是 VSCode 的核心源码，后者放的是 VSCode 的内置插件。

眼神再晃动一下，应该还会看到几个熟悉的关键词，`build/`,`gulpfile.js`,`package.json`,`tslint.json` 和 `yarn.lock`，由此，我们基本可以断定，这个仓库是一个用 TypeScript 开发，用 yarn 管理依赖，用 gulp 进行打包的 Node.js 项目，事实上她也是一个 [Electron](https://electronjs.org/) 项目。

好了，目录就看到这里，接着开始安装漫长的依赖安装：

```bash
➜  vscode (master) yarn
```

执行 yarn 后，VSCode 会干三件事情：

- preinstall 脚本中对 yarn 的版本做判断
	- 要求必须 >=1.10.1
    - 并且只允许使用 yarn 来安装依赖，npm 安装会弹个错误
- 安装 package.json 中描述的各个依赖
	- 很多依赖都需要重新编译，而编译过程经常会失败
    - 失败了怎么办？看错误提示，如果流程没中断，就让它一直跑下去
    - 一直卡着，好像不跑了怎么办？`ctrl-c` 终止进程后重新执行 `yarn`
- postinstall 挨个安装 build/remote/test/extensions 等目录中的依赖
	- extension 的安装比较特殊，安装的过程中又会执行 `updateGrammar` 脚本
    
整个安装过程十分的慢，可以考虑泡杯咖啡打开电视剧……   

执行了 yarn 整个安装并没有结束，剩下几步 VSCode 会在你执行 gulp 相关脚本的时候做检测，倘若资源不存在便会安装，由于很多资源都在墙外，我们还是分解下动作，分步手动下载：

**1. 把 Electron 安装下来：**

```bash
➜  vscode (master) yarn electron
```

如果下载太慢，建议在命令行开下代理：

```bash
➜  vscode (master) proxychains4 yarn electron
```

这里附加一个小插曲，

> 安装到半途时更换了下代理，应该是 gulp-vinyl-zip 这个包处理 buffer 异常，导致下次下载断点续传 buffer 位置对不上，然后每次执行 yarn electron 就直接退出进程，应该是个 bug；解决办法是，在这个包的 `open()` 方法里打个 log，把 path 打印出来，然后把打印出来的资源删掉就行了。

一小时后……

我已经不能忍了，电视剧都看了一集了，还是没下载完，其实 `electron-v6.0.12-darwin-x64` 这个文件只有 66.2M。

为了完成 electron 的安装，不得不附加第二个插曲，

> 还是得翻源码解决问题：之前可以通过全局配置 ELECTRON_MIRROR 的地址来选择 Electron 下载源，而最新版 VSCode 的 Electron 是直接从 github 上下载的，从 gulp-atom-electron 这个包的源码里断点找到了 asset 和 assetPath，手动将 asset 下载下来后放到 assetPath，解决了问题。

**2. 把内置的几个依赖插件安装下来：**

```bash
➜  vscode (master) yarn download-builtin-extensions
```

历时差不多一个小时，终于把依赖下载完成了，这是我安装依赖花的时间最长的一次，家里的网络还是比不上厂里自带翻墙功能的网络，衰……


### 构建程序

由于启动一次构建花费的时间太长，1~5min 不等（看机器性能和人品），所以我建议你使用 `yarn watch` 来构建，它会完成一次构建并监听文件的变化，后续不用重新构建。

构建完成以后，就可以执行命令打开 VSCode 的界面了，不过在打开之前，我意外地在 package.json 的 scripts 中发现，VSCode 竟然已经有 Web 版本了！！！

![VSCode Web](/blogimgs/2019/10/23/vscode-web.png)

这比我之前的预期要早了很多，很早就听说他们内部团队在搞 Web 版本了，没想到这么快就要面世了。社区上有一个基于 VSCode 搞的 Web 版，叫 [Code-Server](https://github.com/cdr/code-server)，Star 量有好几万，估计官方的 Web 版出来以后，code-server 就要凉凉了。

哦，把 web 版本跑起来的方式是：

```bash
# gulp watch 完成后执行
➜  vscode (master) yarn web
```

会自动弹开一个地址：<http://localhost:8080/>，目前 Web 版的功能还不完备，比如插件部分就没有适配，应该还在研发状态，连 inside 版本都没进。这也算是我写这个教程的第一个意外惊喜吧，看来我得重新研究下 VSCode 的源码了。

执行如下脚本，可以打开 VSCode 的客户端：

```bash
➜  vscode (master) ./scripts/code.sh
```

然后你就可以看到这样的界面了：


![VSCode Client](/blogimgs/2019/10/23/vscode-client.png)

如果你是 windows 系统，执行的脚本应该是 `./script/code.bat`。


### 小结

好了，本文的扫盲就到这里。

本文主要通过傻瓜式地教学，给大家演示了下，如何将源码变成我们熟悉的 VSCode 客户端，相信同学们在动手的过程中还会遇到各种依赖安装问题，不要灰心，实在不行就 `rm -rf node_modules`，然后重试。

下回再给大家讲述 [如何开发和调试 VSCode 的源码](https://www.barretlee.com/blog/2019/11/01/vscode-study-02-debugging/)。
