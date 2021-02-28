---
title: VSCode 是怎么运行起来的？
description: 小胡子哥的个人网站
warning: true
author: 小胡子哥
tags:
  - VSCode
categories:
  - 前端杂谈
  - 工具
date: 2019-08-03 23:52:00
---
之前有基于 VSCode 做二次开发的经验，约摸全投入持续了 5 个多月，开发了一个 [Editor](https://isv.taobao.com/ide)，算是超级魔改吧，虽然保留了 VSCode 的样子，但是整个板块都有比较大的调整，新增了 Webview 预览面板、Devtool 调试工具、顶部控制区、插件市场等等。

当时由于需求的实现不需要了解全部的 VSCode 源码，但是也把大部分的源码啃得差不多了，包括：

- 整个项目的工程部分，包括项目结构、软件构建、插件构建、持续集成等等
- Workbench 部分的所有逻辑，整个窗体 UI 部分的实现
- 插件的实现，插件市场的逻辑，当时单独做了一个新的插件市场体系，插件的下载在自己的服务器管理
- Language Service Protocol 的基本原理

但是也有很多内容没有掌握，应该说没有太多兴趣和时间了解，包括：

- 功能模块的测试和 UI 自动化测试
- CommandRegistry 的内部机制，对应的是 IPCServer 的交互逻辑
- IoC 实现的详细逻辑
- SharedProcess 的基础逻辑
- ExtensionHost 的运行机制

这两天突然来了兴致，把之前没了解的部分源码通读了一遍，当然，仍然有一些疑惑，也仍然有一些不感兴趣的部分，后续空了会有更多的梳理，下面先贴上这两天的阅读笔记。其实我应该画图来帮助读者理解，不过以下主要是个人笔记，就懒得整理了，感兴趣的读者将就着看。

> 阅读的版本是 `v1.37.0`，是目前 VSCode 源码仓库 master 分支最新的代码。

### InstantiationService

基本就是 IoC 的实现原理，以及 Service 的全局管理机制。


#### 服务注册为可被使用的 Decorator

提供了一个泛型装饰器 `createDecorator`，入参是 ServiceName 和 IService，后者是泛型入参：

```typescript
function createDecorator<IService>('service'): ServiceIdentifier<IService> {}
```

内部对 `service` 的实际处理是：

- 记录，下次请求，若存在直接从缓存送出
- 记录的方式是：生成一个装饰器，装饰器的作用只判断入参是否是一个 `parameter`，意思是在类中 `method` 不允许被它装饰；并将装饰器的 toString 函数置为 `service` 这个 String

返回的 `ServiceIdentifier`，格式为：

```typescript
export interface ServiceIdentifier<T> {
    (...args: any[]): void;
    type: T;
}
```

#### 全局服务管理

- 注册一个管理服务的容器 `ServiceCollection`，它是一个 Map 类型，储存格式为：`<ServiceIdentifier, instanceOrDescriptor>[]`
- 然后将服务容器挂在到全局 `instantiationService` 服务上，实际上是挂在 `instantiationService` 的私有成员变量 `_services` 上
- 同时也通过 `this._services.set(IInstantiationService, this)` 把自己装进了服务容器


#### 服务的调用

- 提供了一个 `Trace` 方法，记录了每次调用的耗时
- **此处看的比较粗糙，InstantiationService.invokeFunction**，通过分析 Service 的依赖，把所有的依赖项目都加载进来
- 其中考虑到了循环依赖的问题，直接报错，检测方式是递归查询深度超过 100
- 最终通过 `IdleValue` 类返回了一个 Proxy 对象，只有真正用到的时候才执行返回服务实例

### 入口分析

看看 VSCode 在启动前和启动时都做了哪些事情。

#### Code Application 启动之前

VSCode 的入口启动文件是 `./out/main.js`，对应源文件目录是 `./src/vs/main.ts`。

- `vs/base/common/performance`，通过数组记录，每两项为一个数据单元，`[name, timestamp, ...]`，兼容 amd/cmd
- `vs/base/node/languagePacks`，将大量 fs 操作 Promise 化后，提供一个查、写 `NLSConfiguration` 的方法，兼容 amd/cmd
- `./bootstrap`
  - `injectNodeModuleLookupPath`，注入一个 node_modules 的查询路径
  - `enableASARSupport`，同上，注入 `.asar` 路径
  - `uriFromPath`，一个兼容 win/mac 的将 path 路径转换成磁盘 uri 的方法
- AMD 方式加载入口文件
  - `./bootstrap-amd`
    - AMD Loader 配置，`github:Microsoft/vscode-loader`,
    - 将 Electron 的 fs 替换成 Node 原生的 fs
  - `vs/code/electron-main/main`
    - `main`
      - `setUnexpectedErrorHandler`，避免 Electron 底层报错，上层进行劫持
      - `validatePaths` 入参验证
    - `startup -> createServices,doStartup`
      - 初始化一个日志服务，`bufferLogService`
      - 初始化两个重要的服务：`instantiationService, instanceEnvironment`
        - 通过 `ServiceCollection` 记录所有注册的服务，它是一个单纯的 Map，记录的是 `<ServiceIdentifier, instanceOrDescriptor>[]`
        - 初始化的服务包括：`environmentService/logService/configurationService/lifecycleService/stateService/requestService/themeMainService/signService`
        - 将 `ServiceCollection` 挂载到 `instantiationService`，作为 `_services` 私有成员
        - 同时将 `instantiationService` 挂在到 `_services` 私有成员上，相当于依然使用 `ServiceCollection` 管理
      - 完成 `environmentService/configurationService/stateService` 的初始化
      - 初始化 `mainIpcServer`，并连接 `sharedIpcServer`
        - 创建一个 `mainIpcServer`，入参是 `environmentService` 中记录的 `mainIPCHandle` 地址
        - 如果创建失败，非 `EADDRINUSE` 错误，检查是否已经存在了一个 IPCHandler，如果存在则直接连接，连接失败会重试 1 次
      - 初始化 **CodeApplication**，将 mainIpcServer 和 instanceEnvironment 作为依赖服务挂载上去
      - 调用 CodeApplication 的 `startup` 方法启动
    - 过程中如果有报错，则直接退出


#### Code Application 启动

入口文件是 `./src/vs/code/electron-main/app.ts`，对应的类为 `CodeApplication`，实例化的时候做了两件事情

- 注册一些与 Electron 相关的事件，大多都是禁用一些底层、涉及安全或影响 VSCode 上层交互的事件
- 执行 `startup` 启动
  - 启动一个 `ElectronIPCServer`
    - 通过 `ipcMain` 监听 `ipc:hello` 事件，通过 `webContents.id` 标记 Client 身份 
    - 每次有一个新的 Client 进来都开始监听 `ipc:message` 和 `ipc:disconnect` 事件
  - 获取 MachineId（其实就是 Mac Address 的 hash 处理，降级方案是 uuid），启动一个 `SharedProcess`
    - 创建一个不展示（show: false）的 `BrowserWindow`，启用了 `nodeIntegration`
    - 加载 `vs/code/electron-browser/sharedProcess/sharedProcess.html?config=${config}`，通过 url 传参
    - 新 BrowserWindow 的 ipcRenderer 与 ipcMain 进行三次握手
      - ipcMain 将 `sharedIPCHandle` 的值传递给 `SharedProcess`
      - `SharedProcess` 创建一个 IPCServer
      - 通过一个新的 CollectionService 生成服务容器，将各种服务通过新注册的 ipc channel 对接到 `IPCServer`
    - `MainProcess` 连接到 `SharedProcess` 的 IPCServer
  - 将 Application 的附加 Service 作为 childService 添加到全局 `CollectionService` 容器
  - **这里没看太懂**，如果存在 `driverHandle`，则新建一个 Dirver 的 IPCServer
  - **这里没看太懂**，注入了一个 `ProxyAuth` 模块，不知道哪里会用到，内容很简单，就是一个输入账号密码的 `BrowserWindow` 弹窗
  - 然后调用 `openFirstWindow` 打开 VSCode 主界面
    - 注册了主进程 IPC 服务：`launchService`
    - 注册了 Electron IPC 服务：`updateChannel/issueChannel/workspaceChannel/windowsChannel/menubarChannel/urlChannel/storageChannel` 等
    - 通过 `windowsMainService(windowManager)` 打开界面
    
### MainIpcServer

IPCServer 的大致原理，细节非常多，下面只是列了提纲，主要是实现了一套序列化和反序列化的协议，以及 `call` 调用和 `listen` 监听的两大逻辑。

#### 创建 Server

- 建立 `net server`，通过 `mainIPCHandle` 文件句柄进行监听
- 基于 `netSocket` 封装了 `NodeSocket`，并绑定了通讯协议 `Protocol`
- 创建失败，说明 socket 已经存在，直接连接 Server

```
/-------------------------------|------\
|             HEADER            |      |
|-------------------------------| DATA |
| TYPE | ID | ACK | DATA_LENGTH |      |
\-------------------------------|------/
```

#### 连接 Server

- 连接到 `net socket` 后，将 `netSocket` 同上包装两层，`NodeSocket + Protocol `
- 指定 `ctx` 为 `main`，创建 `IPCClient`，`IPCClient` 既是一个  `client` 也是一个 `server`，共享一个 socket，通过 Protocol 协议进行通讯
  - 创建 `ChannelClient`，维护一个通讯的 handlers 管理器
    - 发起一个远程命令执行请求，将 `requestId` 和 `responseHandler` 写入管理器，通过 `protocal.send` 将请求发出
    - 监听 `protocal.onMessage`，通过 `requestId` 匹配 `responseHandler` 处理结果
  - 创建 `ChannelServer`，指定 ctx 为 `main`（写入 ctx 的值）
    - 通过 `onRawMessage` 监听消息，解析 header 和 body 后，选择对应的 `channel`，执行 `channel.call`，执行结果通过 `protocal.send` 返回
    

### 小结

以上的分析过程，对读者的作用可能并不大，主要是逻辑过于冗长，防止自己读着读着开始迷失，把觉得比较核心的逻辑记录了下来。

如果读者想了解 VSCode 的全盘代码，有几处是必须全部理解的：

1. InstantiationService 设计
2. IPC Protocol 设计
3. ExtensionHost 设计
4. Workbench Layout 设计
5. VSCode 的打包机制
6. Electron 的几乎所有 API

后续空闲，我还会结合单测和自动化测试，熟悉 VSCode 整体架构，等有了内容再来分享。
    
    


