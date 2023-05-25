---
title: KV Storage，Web 上第一个内置模块
description: 小胡子哥的个人网站
warning: true
author: 小胡子哥
tags:
  - 译文
  - JavaScript
  - STD
categories:
  - 翻译
  - JavaScript
date: 2019-03-13 21:58:00
---
> 原文地址：[KV Storage, the Web's First Built-in Module](https://developers.google.com/web/updates/2019/03/kv-storage)
> 原文时间：2019年3月
> 翻译计划：<https://github.com/barretlee/translation-plan>
> 翻译人员：[小胡子哥](https://www.barretlee.com/about/)

在过去十年中，浏览器供应商和网络性能专家一直在说 [localStorage 很慢](https://hacks.mozilla.org/2012/03/there-is-no-simple-solution-for-local-storage/)，网络开发者应该停止使用它。

说实在的，确实如此，localStorage 是一个阻止主线程的同步 API，当你使用它的时候它可能会影响页面之间的交互。

问题在于 localStorage API 的设计十分简单，唯一能够替代 localStorage 的异步方案只有 IndexedDB，而它却因为 API 易用性设计较差鲜为人知。

因此开发者需要在难用的 IndexedDB 和有性能问题的 localStorage 中作出抉择。虽然有些库提供了 localStorage API 的简洁性，同时又采用异步调用来解决性能问题，但是在网页应用中，一个库本身的文件大小所包含的网络下载开销和 JS 解析开销也会影响到性能。

是否可以有这么一个库，既提供异步调用的 Storage API，性能方面又比较良好，并且我们使用它的时候还不需要支付文件大小开销呢？

答案是 Yes！Chrome 正在实验一个 build-in 模块的新功能，我们计划发布了第一个名为 `KV Storage` 的 build-in 模块，它就具备异步的 key/value Storage API。

在我介绍 KV Storage 之前，先给大家介绍下什么是 build-in 模块。

### 什么是 build-in 模块？

build-in 模块和普通的 JavaScript 模块一样，只不过它无需下载，原生内置在浏览器中。

与传统的 Web API 一样，内置模块必须经过标准化和具有明确定义的规范化；但与传统 Web API 不同的是，它们不会暴露在全局范围内，可以通过 `import` 方式获取。这样会带来一些优势：

- 在初始化一个新的 JavaScript 上下文的时候（如打开一个新 Tab、Worker 或 Service Worker）不会增加任何开销；
- 在模块被 import 之前不会占用任何内存和 CPU；
- 不存在与其他代码全局变量重名的风险；

要导入 build-in 模块，需要使用前缀 `std:`，后面紧接着 build-in 模块的名字。在支持 build-in 模块的浏览器中，你可以通过如下方式导入一个 KV Storage 模块：

```js
import {storage, StorageArea} from 'std:kv-storage';
```

### KV Storage 模块

KV Storage 模块的 API 与 localStorage 是相似的，只不过它的 API 有点像 JavaScript 的 `Map`，提供的是 `get()`，`set()` 和 `delete()`，而非  `getItem()`，`setItem()` 和 `removeItem()`，另外它还有几个 localStorage 不具备方法，如 `keys()`，`values()` 和 `entries()`，与 Map 相似，它的 key 没有限定必须为 string 类型，可以是任何结构化可序列化类型。

但是与 `Map` 不同的是，KV Storage 返回的结果是 `promise` 或 `async iterators` 类型，详细的 API 介绍，可以戳 [这里](https://wicg.github.io/kv-storage/#storagearea)。

你可能注意到了上面的代码，包含 `storage` 和 `StorageArea` 两个导出对象，`storage` 是一个 `StorageArea` 类的实例，名为 `default`，也会是开发者未来在代码中用的最频繁的一个导出对象。`StorageArea` 类是为需要额外隔离的场景提供的，比如三方库中的储存数据为了避免与 `default` 实例产生冲突的时候就需要重新创建一个实例。`StorageArea` 数据被储存在 IndexedDB 数据库中，取名为 `kv-storage:${name}`，这里的 `name` 是 `StorageArea` 的实例名称。下面就是一个如何使用 KV Storage 的例子：

```js
import {storage} from 'std:kv-storage';

const main = async () => {
  const oldPreferences = await storage.get('preferences');

  document.querySelector('form').addEventListener('submit', () => {
    const newPreferences = Object.assign({}, oldPreferences, {
      // Updated preferences go here...
    });

    await storage.set('preferences', newPreferences);
  });
};

main();
```

_这里需要注意的是，KV Storage 目前只有 Chrome 74+ 版本才支持，你需要在实验室打开对应的开关：chrome://flags/#enable-experimental-web-platform-features._

### 浏览器不支持 KV Storage 时如何处理？

如果你熟悉在浏览器中使用原生 JavaScript 模块，你可能知道（至少到目前为止）导入除 URL 以外的任何内容都会产生错误。而 `std：kv-storage` 就不是有效的 URL。

那么，这里我们抛出一个问题：我们是否需要等待所有的浏览器都支持 build-in 模块的时候才开始在代码中使用它呢？

答案当然是 NO！你现在就可以配合 `import maps` 在你的代码中使用 build-in 模块！

**import maps**

[import maps](https://github.com/WICG/import-maps) 本质上是一种机制，开发人员可以通过该机制将 `import` 的包别名为一个或多个备用标识。这非常有用，它提供了一种方法，可以让浏览器在运行时更改代码中 `import` 的内容。

这就为 build-in 模块提供了一种 polyfill 的机制，具体如下所示：

```html
<!-- 定义好 import map -->
<script type="importmap">
{
  "imports": {
    "/path/to/kv-storage-polyfill.mjs": [
      "std:kv-storage",
      "/path/to/kv-storage-polyfill.mjs"
    ]
  }
}
</script>

<!-- 在 import 执行时会读取 map 配置-->
<script type="module">
  import {storage} from '/path/to/kv-storage-polyfill.mjs';

  // 使用 `storage` ...
</script>
```

上面的代码中，`/path/to/kv-storage-polyfill.mjs` 被映射到了两种不同的资源 `std:kv-storage` 和一个 URL 地址 `/path/to/kv-storage-polyfill.mjs`，当浏览器解析到 import 时，如果浏览器支持 `std:kv-storage`，那么就会直接加载它，否则便会降级使用 `/path/to/kv-storage-polyfill.mjs`。

这里的妙处就在于，不支持 build-in 模块的浏览器在执行这句代码的时候，真正引用的是 `/path/to/kv-storage-polyfill.mjs`，这并非一种回退降级机制，所以说，build-in 是渐进增强的一种方案。

### 如果浏览器连 `type=module` 都不支持呢？

为了说明今天可以使用内置模块同时仍然支持旧版浏览器，我已经整合了一个包含上述所有技术的[Demo](https://rollup-built-in-modules.glitch.me/)：

- 支持 modules、import maps 和 build-in 的浏览器不会加载任何不需要的代码
- 支持 modules 和 import maps，但是不支持 build-in 的浏览器需要加载 [KV Storage Polyfill](https://github.com/GoogleChromeLabs/kv-storage-polyfill)（通过浏览器的 module loader 加载机制）
- 完全不支持的浏览器会通过 `<script nomodule>` 的方式加载 polyfill

你可以通过打开 Devtool->sources 查看是否存在 `kv-storage` 来验证 build-in 模块是否被成功加载了：

![upload successful](/blogimgs/2019/03/13/kv-storage-build-in-module.png)


### 给我们反馈

这篇文章带着大家认识了 build-in 模块，相信你已经有点激动了！我们殷切期望开发者能够立即尝试使用 KV Storage，并给我们提出反馈意见。

如果你的网站正在使用 `localStorage`，你可以尝试切换到 KV Storage API，另外，你可以在 [KV Storage origin trial](https://developers.chrome.com/origintrials/#/trials/active) 上注册，这样你就可以立马让你的切换生效了！让你所有的用户享受更好的性能吧，使用 Chrome 74+ 用户不会支付额外的 polyfill 下载开销。

---

### 译者有话说

这篇文章要阐述的内容还是挺易懂的，只不过逐字逐句翻译起来，反而读起来有点懵逼了。以前我基本都是看几篇文章把知识点消化以后，自己整理，不过为了翻译的「原滋原味」，还是忍了。

Chrome 拿出 12 年的一篇旧文，非说 localStorage 存在不好的性能问题，然后把 KV Storage 搬出来，这个逻辑虽然牵强了些，不过还是可以理解它的初衷——在 build-in module 这块进行初步的尝试。

其实未来这块会存在很多的问题，我稍微列几个：

- 不同的浏览器如何保证底层实现是一致的？
- 为了更好的性能，是否 build-in 模块采用 C++ 编写，这样的模块在 Devtool 中还会展示出来么？
- 如何管理和更新 build-in 模块，这种方式确实存在很多优势，未来可以想象一定会有很多的 build-in modules，当某个库出现 bug 时如何更新？开发者如何知道当前浏览器是否支持某个 build-in 模块？
- 这种能力是否可以开放给开发者，而不是浏览器厂商来把持，毕竟厂商把持着，其动态性是很差的，开发者也会有具体的业务诉求来复用这个通道。

目前 std 也还在 stage 1 阶段，未来是否能够保留下来，或者保留下来是否有很大的变化，我们还不知道。不过从这种特性来看，Web 的前途还是不错的。















