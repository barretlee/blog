---
title: 前端工程架构探讨
categories:
  - 前端杂烩
tags:
  - tech
  - cnblogs
date: 2015-05-03 12:56:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2015/05/03/fe-project.html" target="_blank">博客园</a>.</div>


回忆一下我们在工程开发中对目录结构的定义，一般分为两种，单页面多模块，多页面多模块。在单页面多模块的工程结构里，我们会考虑模块的复用性，比如：如何将公共的东西（样式、函数等）提取出来方便其他模块复用。在多页面多模块的场景中，也是一样，不过除了把全局共用的样式和方法提取到公共目录外，我们还会将多个地方都会用到的模块作为通用模块处理。

### 一、通常开发模式的问题探讨

下图是一个单页面多模块的工程目录结构图：

```bash
.
├── Gruntfile.js
├── package.json
├── build
└── src
    ├── base
    │   ├── base.sass
    │   └── global.js
    ├── mods
    │   ├── preference
    │   │   ├── index.js
    │   │   ├── index.sass
    │   │   └── index.xtpl.html
    │   ├── promo
    │   ├── qr
    │   └── response
    └── index.js
```

我们把源码放在 src 文件夹里面，公共的文件（iconfont 、sprite 图片、CSS 和 JS 等）放到 base 目录下，页面中的每个模块都会在 mods 下新建一个文件夹，使用 `index.js` 来管理模块的渲染。

```javascript
// index.js
define(function(require){
    var Lazyload = require('lazyload');
    var Preference = require('./mods/preference/index');
    var Qr = require('./mods/qr/index');
    var Promo = require('./mods/promo/index');
    var Response = require('./mods/response/index');

    new Response();
    if(xxx){
        new Promo();
    }
    Lazyload(function(){
        new Qr();
        new Preference();
    });
});
```

这样的工程结构是十分通用，结构也比较清晰的，不过在模块的管理上，这里会存在两个问题：

- AB模块存在较多的共用代码，我们有两种方式处理，一是将公共部分提取出来放到 base 目录下，二是 B 模块直接根据相对路径引用 A 模块。一旦业务上有需求，说 A 模块要下线，那下线之后，第一种方案放置在 base 目录下的代码就不合理了，第二种方案中 B 模块就不能用了，需要将 A 模块的东西部分迁移到 B 模块。
- 问题 1 的逆过程：线上目前存在 A 模块，业务上需求需要添加跟 A 模块相似的 B 模块，如果想直接复用 A 模块的代码，一种方式是更小颗粒地分拆 A 模块，然后 B 使用相对路径引用 A，另一种方式是将 A 的共用代码提取出来放到 base 下。两种处理方式都有一定的工作量，而且还会出现问题 1 提到的问题。

其实说到底还是模块的耦合度过高，只要模块之间存在交集，一个模块的改动就可能会影响到其他模块。多人开发中，这里还存在其他方面的问题：

- 并不是每个开发者对接手的项目都有一个全局的把控，下线一个模块时，会不太敢删除 base 目录下跟该模块相关的东西，甚至都不太敢删除这个模块，只是在 `index.js` 中注释了这个模块的初始化。日积月累，冗余代码便会渗入到项目的各个地方...
- 修改一个模块需要编译打包所有的代码，这样的调试效率十分低下，而且这个模块出错，就可能造成整个程序的崩溃。
- 代码历史版本管理的颗粒度不够，比如我修改了 A、B、C 三个模块，依次上线了三次，现在要回滚修改 A 的操作，如何处理？如果 ABC 三个模块都能够利用代码管理工具管理代码，那回滚就方便多了。

### 二、模块化处理

去耦合的方式就是让模块之间共用的东西减少，当模块之间不存在共用内容时，耦合度基本就是零了。

```bash
.
├── init.js
├── build
└── src
    ├── preference <git>
    │   ├── index.js
    │   ├── index.sass
    │   └── index.xtpl.html
    ├── promo <git>
    ├── qr <git>
    └── response <git>
```

如上图所示，与之前的结构相比，已经少了很多东西：

- `index.js` 初始化模块的东西不见了，多了一个 `init.js`
- `base` 目录不见了
- 每个模块都变成了一个 git 仓库

#### 1. 脚本的初始化

先看看 `init.js` 在干啥：

```javascript
// init.js
var $mods = $("[tb-mods]");
$mods.each(functon($mod){
    if($mod.attr("finish") !== FINISH_TAG) {
        $mod.attr("finish", FINISH_TAG);
        // 需要懒加载便懒加载
        if($mod.attr("lazyload")){
            Lazyload($mod);
            return;
        }
        // 否则直接初始化
        S.use($mod.attr("path"), function(S, Mod){
            new Mod($mod);
        });
    }
});

function Lazyload(){
    // code here..
}
```

`init.js` 不再对模块进行精确初始化，文档从上往下遍历，找到模块便直接初始化，如果需要懒加载就加入到懒加载队列，开发者不用理会页面上有多少模块，更不用理会各个模块叫做什么名字。

`index.js` 中 require 很多很多模块，每次添加一个模块或者删除模块都要改动这个文件，而是用 `init.js` 不会存在这个问题。

#### 2. 模块的版本控制

```html
<!-- index.xtpl.html -->
<div tb-mods="" lazyload="" path="tb/promo/1.0.0"></div>
<div tb-mods="" lazyload="" path="tb/qr/2.0.0"></div>
<div tb-mods="" lazyload="" path="tb/preference/2.2.1"></div>
<div tb-mods="" path="tb/response/3.0.2"></div>
```

页面上的 DOM 就是标识，存在 DOM 属性标识就执行这个标识对应的脚本，执行顺序就是 DOM 的摆放顺序。

每个模块代码都使用单个 git 仓库管理，这样能够更好地追踪单个模块的修改记录和版本，也可以解决上面提出的问题（依次修改 ABC 模块，并上线了三次，如果需要回滚 A 模块，则 BC 模块的修改也要跟着滚回去）。

#### 3. ABTest 需求

修改一个模块后，只需要修改他在 DOM 的版本号即可上线。如果遇到 ABTest 的需求，那也十分好办了：

```html
<!-- index.xtpl.html -->
{{#if condition}}
<div tb-mods="" lazyload="" path="tb/promo/1.0.0"></div>
{{else}}
<div tb-mods="" path="tb/promo/2.0.0"></div>
{{/if}}
<div tb-mods="" lazyload="" path="tb/qr/2.0.0"></div>
<div tb-mods="" path="tb/response/3.0.2"></div>
```

`tb/promo` 目前有两个版本，1.0.0 和 2.0.0，需求是两个版本以 50% 的概率出现，直接在 `index.xtpl.html` 做如上修改，程序是十分清晰的。

#### 4. 公共文件的处理

那么，公共的代码跑哪里去了？其实我们并不希望有公共的代码产生，上一节中已经提出了耦合给我们带来的维护问题，但是一个项目中必然会有大量可复用的东西，尤其是当页面出现很多相似模块的时候。

**1）模块的复用**

一个模块的渲染，需要两样东西，`渲染壳子（模板） + 数据`，渲染的壳子可能是一样的，只是数据源不一样，很多情况下我们可以复用一套 CSS 和 JS 代码，通过下面的方式：

```html
<!-- index.xtpl.html -->
<div tb-mods="" lazyload="" path="tb/promo/1.0.0" source="data/st/json/v2"></div>
<div tb-mods="" lazyload="" path="tb/promo/1.0.0" source="data/wt/json/v1"></div>
```

在两个相似模块中，我们使用的是同一套 js - `tb/promo/1.0.0`，但是使用了两个不同的数据源 `data/st/json/v2`, `data/wt/json/v1`。

```javascript
// init.js
$mods.each(functon($mod){
    if($mod.attr("finish") !== FINISH_TAG) {
        //...
        S.use($mod.attr("path"), function(S, Mod){
            // 将数据源传入
            new Mod($mod, $mod.attr("source"));
        });
        //...
    }
});
```

在初始化脚本中，我们将模块需要用到的数据源传入到模块初始化程序中，这样页面就成功的复用了 `tb/promo/1.0.0` 的资源。

**2）CSS 的复用问题使用 less 的 mixin 处理**

```css
@a: red;
@b: white;
.s1(){
    color: @a;
    background: @b;
}
.s2 {
    color: @a;
    background: @b;
}
```

LESS 是 CSS 的预处理语言，上面的代码打包之后，`.s1` 是不存在的，只有 `.s2` 会被打包出来，但是两者都可以 mixin 到其他类中：

```css
.s {
    .s1;
    .s2;
}
```

利用这个特点，我们可以把共用的 css 都包装成类似 `.s1` 的 less 代码，模块中需要的时候就 mixin，不需要的话，放在那里也没关系，不会造成代码冗余。

**3）JavaScript 的代码复用问题**

页面级别的 JS 代码其实并不多，比如我们平时用的比较频繁的有 Slide、Lazyload、Tab、Storage 等，但这些东西都是以组件的形式引入到页面中。仔细想一想，JS 中哪些代码是需要页面共用的？相对整个项目的文件大小，共用的部分又有多少？

我们使用的基础库方法并不全面，比如：没有对 URL 解析的 `unparam` 方法，而这个方法用的也比较多，希望放到公共部分中去。回头想想，这样的小函数实现起来有啥难度么，三四行代码就能写出来的东西，建议放到组件内部搞定。这会造成一定的代码冗余，但是带来的解耦收益与费力写几行代码的成本相比，这完全是可以接受的。

页面共用的统计代码、错误收集代码、数据缓存方案、组件通讯代码等，这些量比较大、使用颇为频繁的内容，可以封装成组件，以组件形式引入进来。

这里还需要很多思考...

#### 5. 模块之间的通讯

模块之间的通讯最让人纠结的是，A 模块想跟 B 模块说话，但是 B 模块还没有初始化出来。所以我们需要引入一个中间人 S，每个模块初始化成功之后都去问一问 S，有没有人给我留言。

```javascript
// B 给 A 留言，如果 A 存在，则直接将 msg 发给 A
// 如果不存在则送入 S 的消息队列
S.tell("A", {
    from : "B",
    msg: {}
});

// A 模块初始化的时候，获取其他模块的留言
S.getMessage("A"， function(msg){
    // dosomething...
});
```

### 三、小结

还有很多东西不在主题的讨论范围内，就不一一列举出来了。

项目开发参与的人越多，代码就越难维护，约束只是一时的，编程方式、编码格式等的约束并不能从根本上解决问题，一旦约束的点未覆盖，结构就会开始散乱，最后必然又会迎来一次整体的重构。

方法和结果不能改变习惯，所以我们应该从模式出发。










</git></git></git></git>