---
title: 解密 VS Code 断点调试的原理
description: 小胡子哥的个人网站
warning: 'false'
author: Barret李靖
tags:
  - VSCode
categories:
  - 前端杂谈
  - 工具
date: 2019-11-15 13:25:00
---
VS Code 相关系列的文章，近段时间已经写过三篇（[启动过程](https://www.barretlee.com/blog/2019/08/03/vscode-source-code-reading-notes/)，[安装](https://www.barretlee.com/blog/2019/10/23/vscode-study-01-start/)，[开发和调试](https://www.barretlee.com/blog/2019/11/01/vscode-study-02-debugging/)）了，后续还会在研究和学习的过程中持续输出，希望对感兴趣的读者带来一些帮助。

> 我的文章风格一般都是持续挖掘底层原理，打破砂锅问到底，一直挖掘到大众能都理解的深度才会罢休，所以在做介绍的时候偶尔会跑个题讲讲其他相关的技术，主要也是为了给读者理解做好铺垫。

平时我们经常会使用 Chrome 进行 JS 的断点调试，你是否有去思考过，为什么我打下一个断点，程序就会停下来，为什么在 VS Code 上不需要 Chrome Devtool 也能够断点，它背后是如何实现的？这就是文本要带你搞懂的东西。

### Node.js 的调试

VS Code 上可以调试很多语言，安装对应的调试包即可，本文以 Node.js 为例，读者可以依葫芦画瓢，尝试下其他语言的调试，原理搞明白了，剩下的很多都是体力活。

首先，我们来看一看 Node.js 是如何被调试的，事实上本博客已经介绍过好多次了，这一次再更深入地探讨一下。

#### 连接 Node.js 的 Debugger

在 6.3 版本以前的 Node.js，调试工具是比较单一的，社区比较活跃的调试工具叫 `node-inspector`，这玩意儿是个什么原理呢，为啥可以实现调试，我们可以通过几行简单的代码实现一个功能单一的 `node-inspector`，如下方是待调试的代码：

```js
// file: test.js
let http = require('http');

const server = http.createServer((req, res) => {
  res.write('hello\n');
  setTimeout(() => {
    debugger;
    res.end('world');
  }, 0);
});

server.listen(8888, () => {
  console.log('start server');
});
```

通过 `node --debug test.js` 启动程序，我们启动了一个 8888 端口的 HTTP Server。

> 此处请通过 nvm 将 node 的版本号切换到 6.3 以下，如 `v6.2.2` 这个版本，后面会讲旧版 Node 和 v6.3+ 版本 Node 的区别。

然后通过如下方式发起请求：

```bash
➜ curl 127.0.0.1:8888
```

你会看到命令行只输出了 `hello\n`，然后就进入了 pending 状态，我们来分步理解下，为啥会这样：

- 通过 `--debug` 参数启动 Node.js，程序会开启一个内置的 `Debugger` 模块
- 由于我们没有指定参数，`--debug=PORT`，默认使用的是 5858 端口，此时的 `Debugger` 模块会监听 5858 端口
- 在发起请求的时候，遇到 `debugger` 关键词，程序会暂停执行，直到收到“继续到下一步”的指令

> Demo 的源码地址：[barretlee/node-legacy-debug](https://github.com/barretlee/node-legacy-debug)

我们可以编写一个程序看看 `Debugger` 模块具体干了什么：

```js
// File: debugClient.js
const net = require('net');

const socket = net.createConnection(5858, '127.0.0.1');
socket.on('data', (data) => {
  console.log(data.toString())
});

process.stdin.on('data', (data) => {
  const json = data.toString();
  const msg = `Content-Length: ${Buffer.byteLength(json, 'utf8')}\r\n\r\n${json}`;
  socket.write(msg, 'utf8');
});
```

我们通过 `Net` 模块连接到刚才程序在 5858 端口开启的监听，刚连接上的时候，它会打印如下信息：

```
Type: connect
V8-Version: 5.0.71.52
Protocol-Version: 1
Embedding-Host: node v6.2.2
Content-Length: 0
```

意思是告诉你，你尝试与 Debugger 模块连接，已经连接成功了，当前 debug 的程序所使用的 V8 版本号是 `5.0.71.52`，使用的协议版本是 `1`，Node 的版本号是 `v6.2.2`，这个信息其实就是在告诉你，该使用什么协议与调试程序进行通讯，`v6.2.2` 的版本所用到的协议是 [V8 Debugger Protocol](https://github.com/buggerjs/bugger-v8-client/blob/master/PROTOCOL.md)。

> 为了打印全面的信息，注意操作的次序，先使用 debug 模块启动程序 test.js，然后启动 debugClient.js，最后再执行 curl 发起请求。

在 curl 发起请求的时候，Debugger 会给 debugClient 发送一个消息：

```json
Content-Length: 283

{"seq":0,"type":"event","event":"break","body":{"invocationText":"#<Timeout>._onTimeout()","sourceLine":9,"sourceColumn":4,"sourceLineText":"    debugger;","script":{"id":59,"name":"/path/to/test.js","lineOffset":0,"columnOffset":0,"lineCount":18}}}
```

刚才的 `curl` 不是进入 pending 了么，我们尝试给 Debugger 发一个指令（参考[协议内容](https://github.com/buggerjs/bugger-v8-client/blob/master/PROTOCOL.md#request-continue---continuerequest_)），告诉它进入下一个断点，内容为：

```json
{"seq":1,"type":"request","command":"continue"}
```

在 debugClient 中我们监听了 `process.stdin`，所以可以直接将上述内容粘贴到命令行回车即可，同时你也会看到 Debugger 发过来的反馈：

```json
{"seq":1,"request_seq":1,"type":"response","command":"continue","success":true,"running":true}
```

告诉你，已经成功进入到了下一个断点，此时，你也会看到 curl 已经把 `world` 给输出了。

上面的程序，你可以在命令行输入其他指令，比如在暂停的时候查询 req 的 url 的值：

```json
{"seq":2,"type":"request","command":"evaluate","arguments":{"expression":"req.url"}}
```

你会收到如下回复：

```json
Content-Length: 177

{"seq":3,"request_seq":2,"type":"response","command":"evaluate","success":true,"body":{"handle":150,"type":"string","value":"/","length":1,"text":"/"},"refs":[],"running":false}
```

在你的脑海中是不是已经出现了平时调试 Node.js 的画面了，没错，它的原理就是这样的。

#### node-inspector，调试代理

调试原理大概已经弄明白了，但是我相信没有几个人愿意通过上面的方式来调试程序，因为那实在是太麻烦了，不仅得知道各种指令的名称，还得知道指令的参数、协议的规范、sequence 的计数等等，因此就有了 `node-inspector`，它可以帮助我们在 Chrome Devtool 上可视化地调试 Node.js 程序，那么它干了什么事情呢？

```txt
                                   +-----------------+
                                   |  Node Program   |
                                   +---------+-------+
                                             ^
                                             |
+-----------------+                +---------+-------+
|  Chrome Devtool |                | Node.js Debugger|
+--------+--------+                +---------+-------+
         |                                   ^
         |                                   |
       CRDP                                 V8DP
         |      +-------------------+        |
         +----->+   node inspector  +--------+
                +-------------------+

CRDP: Chrome Remote Debugging Protocol
V8DP: V8 Debugging Protocol
```

简单来说，`node inspector` 通过 Chrome 的 `Remote Debugging Protocol` 与 Chrome Devtool 建立了通道，然后通过 `V8 Debugging Protocol` 与程序的 `Debugger` 模块建立了连接，于是开发者就可以在 Chrome 上通过可视化操作来实现 Node.js 的调试了，所以我称它为“调试代理”，就是一个协议中转服务。

由于 `node-inspector` 很大程度提升了 Node 的调试体验，在 v6.3 的时候，Node.js 官方直接把这个能力给整合了进去。你会看到使用 v6.3+ 的 Node.js 中调试程序时，它会打印一个适配了 CRDP 协议的 webscoket 链接：

```
➜ node --inspect test.js
Debugger listening on ws://127.0.0.1:9229/db309268-623a-4abe-b19a-c4407ed8998d
For help see https://nodejs.org/en/docs/inspector
```

我们可以直接在 Chrome Devtool 上配置这个地址进入可视化调试，于是整个链路就变成了：

```txt
 +------------------+       +----------------+
 |                  |       |                |
 |  Chrome Devtool  |       |  Node Program  |
 |                  |       |           +-----------+
 +--------+---------+       +-----------+  Debugger |
          |                             +-----+-----+
          |                                   ^
          |               CRDP                |
          +-----------------------------------+
```

少了调试代理的接入，开发者使用起来会轻松很多，而且 CRDP 规范在社区使用非常频繁，实现上有很多代码可以参考。

讲到这里，如果我们要自己实现一个可视化调试的界面，是不是就有点清晰了，：

```txt
+-----------------+        +----------------+
|                 |        |                |
|     My IDE      |        |  Node Program  |
|      +----------+---+    |           +----+------+
+------| Debug Client |    +-----------+  Debugger |
       +----------+---+                +-----+-----+
                  |                          ^
                  |            CRDP          |
                  +--------------------------+
```

只需要实现下图的 `Debug Client` 部分，以及 `Debug Client` 与 IDE 的视图进行联动，就可以实现自定义的可视化的调试了。

> 如果你的需求是自定义 Node.js 的可视化调试，本文看到这里就可以结束了，相信你利用上面学到的知识完全有能力去实现一个调试界面。但是在 VS Code 中，我们有必要再展开更多的篇幅。


### Debug Adaptor Protocol

实现一个 Debug Client 其实成本挺高的，你需要吃透所有的调试协议，如 V8 Debugging Protocol，包含了几十个指令，每个指令都需要进行通讯适配和 UI 适配，这还只是一种语言，如果你的 IDE 面向多种语言，你就需要适配多种调试协议，不同协议之前的差异可能还挺大的，这些工作完全会让你崩溃。

另外，站在社区的角度，这种建设是可以被抽象的，试想一下，Atom 调试 Node.js 需要自己实现一个 Debug Client，Sublime Text 如此、VS Code 如此，你自建 IDE 也是如此，是不是完全没必要，因此就有了 `Debug Adaptor Protocol`，它是微软提出的一套 [通用调试协议](https://microsoft.github.io/debug-adapter-protocol/)，目前已经成为了社区的事实标准。

那这个 DAP 在调试的哪一层呢？我们可以看看这张图（[来源](https://microsoft.github.io/debug-adapter-protocol/overview)）：

![DAP](/blogimgs/2019/11/15/dap.png)

在 IDE 上仅实现一次对 DAP 协议的通讯和 UI 适配，就可以调试所有的语言，你需要做的只有：

- 社区有目标语言的 DAP 实现么，如果有，直接拿过来用，可以快速适配，搞定调试
- 如果没有，利用上面我们学到的知识，实现一个 DA，贡献给社区

这套协议规范了 5 块内容：

- `Base Protocol`，描述了请求、响应、事件、出错等通讯格式
- `Events`，描述了初始化、完成配置、输出、断点、停止等十几种事件标准
- `Request`，描述了调试的各种指令的请求格式
- `Response`，描述了调试的各种指令的响应格式
- `Types`，描述了以上各种内容中涉及到的类型和接口描述

原则上，规范中提到的内容都需要在 DA 中实现，即便语言的底层引擎中没有这种能力，也应该抛一个错误出来，这样才能保证一致性。


### 实现一个 Node.js 的调试器

为了搞懂上面提到的几个协议，我动手写了一个 DEMO，实现了一个最简单的操作：展示当前 Debug 的堆栈信息，如下图所示：

![Debug Demo](/blogimgs/2019/11/15/debug-tracker.png)

> 仓库地址是：[barretlee/node-debug](https://github.com/barretlee/node-debug)

可以下载下来跑一下，下载依赖后启动即可：

```
npm run init;
npm run start;
open http://127.0.0.1:4445
```

这个 Demo 的完成度很低，而且关键环节都是 Mock 的，只是为了帮助自己理解整个过程，理解以后就没有继续去完善细节了，感兴趣的同学可以研究下。

我没有自己去实现完整一个 Node.js Debug Adaptor，倒不是因为复杂，直接去研究了下 VS Code 开源了两个 Adaptor，分别是：

- [vscode-node-debug](https://github.com/microsoft/vscode-node-debug.git)，这个是对 v6.3 以下版本的实现
- [vscode-node-debug2](https://github.com/microsoft/vscode-node-debug2.git)，这个是对 v6.3 及以上版本的实现

根据连接时返回的 `Embedding-Host` 信息来选择使用哪个版本，VS Code 好像会默认安装这两个包。整体思路跟我上面提到的是一样的。


### VS Code 的具体实现

调试程序有两种方式，一种是调试已经启动的程序，另一种是调试未启动的程序，前者 VS Code 会直接 `attach` 上去，后者会先 fork 一个进程 `launch` 程序，这里只稍微介绍 VS Code 实际操作过程中的几个知识点：

#### 程序启动时没有带 debug 参数

如果 Node.js 程序在启动的时候没有带 `--debug` 或者 `--inspect` 参数，默认情况下 Node.js 的 Debugger 模块是不会启动的，这种情况下并非就不能调试了，我们可以手动来启动调试模块：

```bash
# 找到对应的 Node.js 进程的 PID
➜ ps -aux | grep 'node'
# 给这个 PID 发送 SIGUSR1 信号
➜ kill -SIGUSR1 NODE_PID
```

#### stopOnEntry 

在 fork 一个 Node.js 进程进行调试的时候，有两类入参：

- `--debug` 和 `--inspect`，默认执行程序
- `--debug-brk` 和 `--inspect-brk`，默认在第一行直接断点

一般来说我们都会选择第一种，如果你的程序会直接执行完成，速度很快，可以考虑第二种方式进行调试。


#### VS Code 连接 Node.js 调试进程的方式

VS Code 调试 Node.js 的 Debug Adaptor 核心内容在 [vscode-chrome-debug-core](https://github.com/microsoft/vscode-chrome-debug-core) 这个包中，它实际上是一个 Chrome Remote Debugging Protocol 的具体实现，_内部逻辑很多，看起来有点吃力_。


### 小结

好吧，先写到这里，还有很多细节问题就不一一叙述了，价值不大，写这篇文章做了不少前期工作，对 DAP 和 Node.js 的 Debugger 研究了好几个晚上，不过总算是搞的比较明白了，如果你在测试的时候遇到什么疑问，欢迎在 [下方](#comment) 留言。