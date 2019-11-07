---
title: 带你开发和调试 VS Code 源码
description: 小胡子哥的个人网站
warning: true
author: 小胡子哥
tags:
  - VSCode
categories:
  - 前端杂谈
  - 工具
date: 2019-11-01 17:43:00
---
[上文](https://www.barretlee.com/blog/2019/10/23/vscode-study-01-start/) 给大家介绍了如何在本地从源码启动 VS Code，笔者在更换电脑后重新安装依赖时又遇到了文中插曲里提到的问题，VS Code 依赖的很多资源都在 Github 上，而且有好几个模块都需要下载源码重新编译，安装依赖失败的概率还是略大的。

如果依赖的包构建失败，不用担心，等到启动的时候它会提示详细错误：

```
[92850:1031/221458.947969:INFO:CONSOLE(17)] 
"Error: The module '~/vscode/node_modules/spdlog/build/Release/spdlog.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION 73. This version of Node.js requires
NODE_MODULE_VERSION 69. Please try re-compiling or re-installing
```

如上，是 `spdlog` 安装失败了，可以通过 `yarn add spdlog` 重新安装，如果一直报错，请注意 Node.js 的版本，我使用的是 `v10.6.0`，编译的是 tag 为 `1.39.2` 的 VS Code 源码，没遇到问题。

> 测试过几次，当我切换 VS Code 的版本（git tag）时，似乎 spdlog 和 vscode-sqlite3 这两个包的安装总是存在问题，按照上述方式重新安装和编译下就行了。

### Main 和 Renderer

倘若你之前没有 Electron 的开发经验，这个段落不容错过。

> 如果你可以建一个网站，你就可以建一个桌面应用程序。 Electron 是一个使用 JavaScript, HTML 和 CSS 等 Web 技术创建原生程序的框架，它负责比较难搞的部分，你只需把精力放在你的应用的核心上即可。

Electron 是个什么东西？官方对它的定义是：“使用 JavaScript, HTML 和 CSS 构建跨平台的桌面应用”。

![Electron Structure](/blogimgs/2019/11/01/electreon-structure.png)

打开 Electron 的 [文档](https://electronjs.org/docs)，从文档目录中，你大致就能够知道 Electron 可以做什么。Electron 有两大模块，`Main Process` 和 `Renderer Process`，暴露出来的上层 API 并不多，我数了一下，约摸 30 个。搞懂这 30 个 API 可能不是什么难事，但是在搞清楚 API 之前，我们需要先知道这两大模块之间是如何交互和协作的，以帮助我们更好地理解。

打开官方的 quick start demo：

```bash
$ git clone https://github.com/electron/electron-quick-start
# 进入仓库
$ cd electron-quick-start
# 安装依赖库
$ npm install
# 运行应用
$ npm start
```

你会看到两个核心文件，一个是 `main.js`，另外一个是 `index.html`，你完全可以这么理解：前者跑的是 Main Process，它的执行环境是一个 `Node` 环境；后者跑的是 Renderer Process，它的执行环境是一个 `Chromium + Node` 环境，也就是说，我们写的 `index.html` 中可以去调用 Node.js 的模块，这也是 Electron 与普通浏览器的主要差别。

Main 进程中可以通过 `BrowserWindow` 实例化多个 Renderer 进程，且每个 Renderer 进程相关独立，在复杂的项目中会涉及到了很多通信问题，比如 Main-Renderer 通讯，Renderer-Main 通讯，Renderer-Renderer 通讯，VS Code 中就有很多这类问题的优秀解决方案，不过不在我们今天的讨论范畴中。

Main 和 Renderer 之间的关系，可以用这种图来形容（[图片来源](http://jlord.us/essential-electron/)）：

![Main and Renderer](/blogimgs/2019/11/01/main-and-renderer.png)

对于 Electron，先了解这么多知识，如果你期望了解更多，可以移步 [Electron 官方文档](https://electronjs.org/docs)。


### 初识 VS Code

很多同学对 VS Code 已经熟悉得不能再熟悉了，谈不上初识，不过我们这里说的“初识”是针对它的架构和源码，相信对大多数人来说，它依然是陌生的。

先看看项目的整体目录结果，过滤了几个次要项：

```
.
├── azure-pipelines.yml
├── build/
├── extensions/
├── gulpfile.js
├── out/
├── package.json
├── product.json
├── resources/
├── scripts/
├── src/
│   ├── main.js
│   └── vs
│       ├── base/
│       ├── code/
│            ├── browser/
│                 ├── workbench.ts
│                 └── workbench/workbench.html
│            ├── electron-browser/
│                 ├── workbench.js
│                 └── workbench/workbench.html
│            └── electron-main/
│                 ├── main.ts
│                 └── window.ts
│       ├── editor/
│       ├── platform/
│       ├── server/
│       └── workbench/
└── test/
```

上面这一坨看起来有点多，不过捋清楚了，也就好理解了，下面我们就一个一个地解释下：

- `azure-pipelines.yml`，看名字就知道是啥意思，它是一个 CI/CD 的配置，自动测试、构建、打包
- `build/`，这里面放的是 VS Code 项目的构建工具，相对来说还是比较复杂的，主要是因为它顾及了 Linux/Mac/Windows 三个平台
- `extensions/`，VS Code 的内置模块，包含各种语言高亮的 LSP 相关模块
- `gulpfile.js`，构建脚本，暂时不用细看，可以关注 `package.json` 的 scripts，里面放着一些程序的快捷启动方式，而且针对内存溢出做了防御，如 `--max_old_space_size=4095`
- `out/`，构建的结果都放在这个目录下
- `package.json`，需要着重看看 `main` 和 `scripts` 两个字段
- `product.json`，如果你想根据 VS Code 进行二次开发，建立自己的品牌，建议搞懂这个文件，因为你需要修改它
- `resource/`，打包构建生成安装包（exe/dmg/deb 等）的时候需要依赖的额外资源
- `scripts/`，开发过程各种会用到的脚本，用的比较多的可能是 `./scripts/code.sh`
- `test/`，放的是各种自动化、冒烟、UI 测试脚本，这里值得学习和研究下
- `src/`，核心源码，入口是 `main.js`
	- Main Process 的实际调用路径是 `main.js -> vs/code/electron-main/main.ts -> vs/code/electron-main/window.ts`，在 `window.ts` 启动了一个 `BrowserWindow` 加载了 `vs/code/electron-browser/workbench/workbench.html`
    - Renderer Process 的实际路径是 `vs/code/electron-browser/workbench/workbench.html -> vs/code/electron-browser/workbench/workbench.js`，核心逻辑在 `workbench.js` 中
    - 而 src 下还有一个核心目录 `browser`，它是 Web 版本的启动入口

VS Code 的复杂度，有好几块，分别是构建、IoC 机制、RPC 设计、ExtensionHost 环境等，再加上 Electron 本身的各种坑，后续我们可以一一进行探讨。


### 调试

在玩转 VS Code 架构设计之前，我们需要先搞清楚代码的大致执行流程，还要学会在遇到问题时调试它的代码，光靠通扫几遍源码你是很难完全理解的。

VS Code 的使用文档写的非常棒，但是架构和设计文档只能从代码中自己探索，这是可以理解的，VS Code 目前还在高速发展中，内部架构设计调整也十分频繁，而且他们可能倡导的是“代码即文档”，通过一些规范化约束来帮助开发者理解架构设计。

不过没关系，既然开源了，就自己研究好了。下面我们先看看如何对 VS Code 的各块代码进行有效调试。

说到调试，有几个基础知识不得不提一提，不解释清楚，很多同学是无法理解为什么在工具上点几下就会进入调试的。

#### Node.js 调试

Electron 的 `Main Process` 本质就是一个 Node.js 进程，你可以执行如下命令看看 Electron 的 bin 文件内容：

```
npm install -g electron
head -n 5 $(where electron | head -n 1)
```

打印出来的结果是：

```js
#!/usr/bin/env node

var electron = require('./')

var proc = require('child_process')
```

对 Node.js 的调试，可以看看我四年前写的 [《NodeJS 的代码调试和性能调优》](https://www.barretlee.com/blog/2015/10/07/debug-nodejs-in-command-line/)，时间有点久了，不过调试原理并没有啥变化。

> 简单来说，就是启动 Node 时增加了一个 `--debug-brk` 入参（新版是 `--inspect-brk`），开启一个可供外部断点调试的端口，然后在外部使用各类工具连接端口，发送指令进行调试。

#### Chrome 调试

Chromium 在启动的时候有一个可选参数 `--remote-debugging-port`, 加上这个参数以后，它会开启远程调试模式，如：

```
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome -remote-debugging-port=9222
```

> 如果你的 Chrome 已经启动，上面的命令不会有效果，可以考虑下载一个 Google Chrome Canary

通过 `http://127.0.0.1:9222/json` 可以看到当前 Chrome 打开了哪些页面，并且它还会把 DevTools 的 ws 地址也展示出来：

```json
[{
   "description": "",
   "devtoolsFrontendUrl": "/devtools/inspector.html?ws=127.0.0.1:9222/devtools/page/3CFC...",
   "id": "3CFC338A39A4CF1F31F0CB499D94C071",
   "title": "新标签页",
   "type": "page",
   "url": "chrome://newtab/",
   "webSocketDebuggerUrl": "ws://127.0.0.1:9222/devtools/page/3CFC..."
}]

```

我们来做一个小小的实验，上面打开了一个 Chrome，并且展示了一个空标签页，我们尝试使用 websocket 连接它，然后控制它：

```js
const wsUrl = "ws://127.0.0.1:9222/devtools/page/3CFC...";
let ws = new WebSocket(wsUrl);
ws.onmessage = data => console.log(data);
ws.onclose = () => console.log('closed');
ws.onopen = () => console.log('opened');
```

随便找个浏览器的控制台执行这段脚本，会看到打印出来了 `opened`，然后我们尝试让这个 “新标签页” 跳转到我的博客首页，发送几句命令：

```js
// 开启网络功能
ws.send(`{
  "id":1,
  "method":"Network.enable"
}`)；
// 跳转页面
ws.send(`{
  "id": 1,
  "method": "Page.navigate",
  "params": { "url": "https://www.barretlee.com" }
}`);
```

你会看到，通过命令行打开的 Chrome 的默认页已经自动跳转到了 `https://www.barretlee.com`，看到这里你应该已经可以理解了，所谓的调试，其实就是通过连接 Chrome 内部的 DevTools 工具，然后利用 RPC 的方式进行通讯，事实上，这里用到的是 [Remote Debugging Protocol](https://chromedevtools.github.io/devtools-protocol/) 进行的通讯。

> 大名鼎鼎的 [Puppeteer](https://github.com/GoogleChrome/puppeteer) 就是基于这层协议做的封装。

好了，为了让你理解 VS Code 的调试原理，已经做了很多铺垫了，事实上，在 VS Code 上进行调试的操作是十分简单的，下面就带着你一起演示下。


### 软件调试

使用 VS Code 打开 VS Code 的源码，点开左侧 sidebar 的 Debug Tab，你会看到调试区域存在很多个调试选项：

![VSCode Debug Panel](/blogimgs/2019/11/01/vscode-debug-panel.png)

这里的所有调试配置，都对应着项目中 `.vscode/launch.json` 的内容，我之前写过一篇关于 `launch.json` 的 [文章](https://www.barretlee.com/blog/2019/03/18/debugging-in-vscode-tutorial/)，在这里我们又有机会用到了。

软件的调试分为两个部分，一个是 Main 进程的调试，一个是 Renderer 进程的调试。

> 开始调试之前，请先把 VS Code Dev 的监听模式打开，项目目录下执行 `yarn watch`

#### Main 进程调试

先进入到一个 Main 进程会执行到的代码区域，打一个断点，如 `vs/code/electron-main/main.ts:404:0`，然后选择 `launch.json` 中的 `Launch VS Code (Main Process)` 配置：

```json
{
  "type": "node",
  "request": "launch",
  "name": "Launch VS Code (Main Process)",
  "runtimeExecutable": "${workspaceFolder}/scripts/code.sh",
  "windows": {
    "runtimeExecutable": "${workspaceFolder}/scripts/code.bat",
  },
  "runtimeArgs": [
    "--no-cached-data"
  ],
  "outFiles": [
    "${workspaceFolder}/out/**/*.js"
  ]
}
```

启动的默认端口是 `5875`，点击开始调试按钮，或者按下快捷键 `F5`，便会进入调试模块，在 VS Code 上也有体现：

![VSCode Node Debugging](/blogimgs/2019/11/01/vscode-node-debugging.png)

可以看到我们打点的位置也已经亮了起来，阻塞了 VS Code Dev 的启动：

![VSCode Node Debugging Demo](/blogimgs/2019/11/01/vscode-node-deubgging-demo.png)

好了，现在可以开始你的 Main 进程代码探索之旅了。

> 需要注意，在调试 Main Process 的时候，不要把断点打到 Renderer 进程里去了，否则你永远也进不了断点；也不要打到 Main Process 不会执行的代码区域，这就要求你对 VS Code 的目录结构有一定的了解了，可以参考“初识 VS Code”章节的介绍

另外，再给你留了一道作业题：

> 尝试使用其他工具，如 node-inspector 或者 Webstorm 调试 Main 进程。


#### Renderer 进程的调试

Renderer 进程的调试，本质就是通过外部工具连接 Electron 中 Chromium 打开的一个 DevTools Server，使用 WebSocket 建立连接，然后发送和接受各种指令。

选择 `launch.json` 中的 `Launch VS Code`，它的内容是：

```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Launch VS Code",
  "windows": {
    "runtimeExecutable": "${workspaceFolder}/scripts/code.bat"
  },
  "osx": {
    "runtimeExecutable": "${workspaceFolder}/scripts/code.sh"
  },
  "linux": {
    "runtimeExecutable": "${workspaceFolder}/scripts/code.sh"
  },
  "timeout": 20000,
  "env": {
    "VSCODE_EXTHOST_WILL_SEND_SOCKET": null
  },
  "breakOnLoad": false,
  "urlFilter": "*workbench.html*",
  "runtimeArgs": [
    "--inspect=5875",
    "--no-cached-data"
  ],
  "webRoot": "${workspaceFolder}"
}
```

同样，开启调试后，找个 Renderer 进程会执行到的代码块进行断点，如 `vs/code/workbench/workbench.desktop.main.ts`，如果你的 VS Code Dev 已经启动了，可以在 VS Code Dev 的界面中按下 `cmd+r`，它会自动刷新 Renderer 进程（刷新页面），重新进入你的断点：

![VSCode Chrome Debugging](/blogimgs/2019/11/01/vscode-chrome-deubgging.png)

怎么样，看到这里，是不是对开发 VS Code 的源码已经有信心了。

> 需要注意的是，如果你是通过 `./script/code.sh` 在控制台手动启动的 VS Code Dev，`launch.json` 中的 `Attach to VS Code` 是无效的，因为在启动的时候，不会默认添加 --remote-debugging-port 入参


### 构建脚本调试

知道了如何对软件本身的代码进行调试，大部分情况下已经够用了，但是如果你在启动 VS Code 的时候失败了，报了个错，或者当你打包 VS Code 的时候，抛出个异常，需要怎么排查问题呢？

这里，我们可以了解下构建脚本的调试，虽说构建脚本我们可以随时写一句 `console.log` 打印日志，但是 VS Code 的 `build` 脚本是非常多，而且每一次的构建都特别漫长，还是更加推荐你使用它提供的构建脚本调试能力进行 Debug，在 `launch.json` 中有一个 `Gulp Build` 配置：

```json
{
  "type": "node",
  "request": "launch",
  "name": "Gulp Build",
  "program": "${workspaceFolder}/node_modules/gulp/bin/gulp.js",
  "stopOnEntry": true,
  "args": [
    "hygiene"
  ]
}
```

通过这个配置启动 gulp，这样就可以对构建脚本进行断点了，由于配置中加了 `stopOnEntry`，当进入调试的时候，第一行就会断住：


![VSCode Gulp Debugging](/blogimgs/2019/11/01/debug-grulp.png)

你也可以去掉这个参数，不过需要你在执行 gulp 之前在程序中提前断一个点：

![VSCode Gulp Debugging](/blogimgs/2019/11/01/debug-gulp-file.png)


### 小结

好了，VS Code 源码的调试教程就写到这里，希望你读完这篇文章以后，可以自己动手去尝试，很多比较细节的点我没有写全面，所以实践过程中你可能还会遇到一些坑，当你躺平了这些坑，相信你就可以完全理解这些调试的基本原理了。

后续将带着大家看一看 VS Code 的整体执行链路，其实上次我已经写过一篇类似的 [文章](https://www.barretlee.com/blog/2019/08/03/vscode-source-code-reading-notes/)了，行文比较粗糙，下次将带着大家一边调试一边看代码和执行链路。
