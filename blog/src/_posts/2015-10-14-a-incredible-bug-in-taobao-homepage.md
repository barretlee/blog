---
title: 记一次淘宝首页奇葩的渲染问题
description: '很多问题都是浏览器渲染页面时, 因为渲染引擎的 bug 导致的问题, 不常见, 更加难以写 demo 演示, 它们只在特定的复杂场景下, 程序计算存在误差或者漏洞的时候出现, 尤其是涉及到边界判断的时候。'
warning: true
categories:
  - 前端杂烩
tags:
  - 渲染
  - bug
mark: hot
date: 2015-10-14 12:27:18
---

或许你曾经在 chrome 浏览器上碰到过这样让人瞠目结舌的问题: 

- Hover触发一个层展示, hover离开后, 这个层还遗留残影
- 浏览器没有清理一个元素渲染的上一个状态, 导致页面多出一个错位的跟该元素一模一样的影子
- 交互时突然出现一个方形色块, 覆盖在元素上
- 或者还有更奇葩的...

<!-- more -->

以上列举到的三个问题, 我在维护淘宝首页的时候都遇到过。这些都是浏览器渲染页面时, 因为渲染引擎的 bug 导致的问题, 不常见, 更加难以写 demo 演示, 它们只在特定的复杂场景下, 程序计算存在误差或者漏洞的时候出现, 尤其是涉及到边界判断的时候。

### 问题复现

很难得有机会让我碰到一个可以复现的, 我把它记录下来了。如下图所示, hover 到学习模块的边界位置时: 

![problem](/blogimgs/2015/10/14/TB1lEgeJVXXXXamXpXXXXXXXXXX-1012-437.gif)<!--<source src="//img.alicdn.com/tps/TB1lEgeJVXXXXamXpXXXXXXXXXX-1012-437.gif">-->

手动 hover 和模拟 hover 都有一样的问题, 没有多想, 立马加上了一句话修复了这个问题: 

```css
.channel2 .channel-item {
    transform: translateZ(0);
}
```

这个不是直觉, 多次遇到这种奇葩问题, 我第一想到的便是使用 3D 加速将这个渲染层隔离渲染, 80% 以上的概率能够解决问题, 而解决问题的关键在于找准加这句代码的 DOM 元素。

### 探索 bug

这个层在我的代码中肯定是不存在的, 我们只能用 bug 来形容这个问题。因为元素刚好贴在 `.channel2` 的边界, 猜测应该跟层渲染有关, 于是打开了控制台 `ESC -> Rendering -> Show layer borders`, 看到了这个: 

![detail](/blogimgs/2015/10/14/TB1HCApJVXXXXaqXXXXXXXXXXXX-1012-437.gif)<!--<source src="//img.alicdn.com/tps/TB1HCApJVXXXXaqXXXXXXXXXXXX-1012-437.gif">-->

仔细观察, 可以看到, 这个粉色块在瓦片边界和父元素边界之中, 可以断定, 这几个瓦片在渲染的时候存在问题。

---

这里需要补充下关于瓦片的知识。瓦片, 英文里头称之为 tile, 它是 webkit/blink 渲染页面时的中间过程, 将整个页面分成多个大小一样的瓦片, 并发渲染每个瓦片的内容。一个元素开启 3D 硬件加速之后, 会变成一个独立的层, 这个层的渲染也会被分割成瓦片, 可以想象成一个子页面。

瓦片和瓦片之间的边界计算是处理的难点, 因为渲染的内容不能错位。

---

其实让我找到问题根本原因的是, rendering 块的颜色, 平时在网页上开启 `show layer borders` 看到的是半透明的绿色块, 而这里显示的是粉色块, 搜索了下不同色块代表的含义, 没找到具体的文档说明, 但是找到了 [代码](http://code.google.com/p/chromium/codesearch#chromium/src/cc/debug/debug_colors.cc&q=debug%20borders&sq=package:chromium&l=270): 

```
// Missing resize invalidations are in salmon pink.
SkColor DebugColors::MissingResizeInvalidations() {
  return SkColorSetARGB(255, 255, 155, 170);
}
```

对应的就是这个颜色, “缺失调整验证”, 在 chromium 的源码仓库中搜了上面的代码, 找到了 [具体说明](http://github.com/SaschaMester/delicium/blob/b7bc83c3b107b30453998daadaeee618e417db5a/cc/playback/raster_source_helper.cc#L58-L103): 

```
if (!deflated_content_rect.Contains(canvas_playback_rect)) {
  if (clear_canvas_with_debug_color) {
    // Any non-painted areas outside of the content bounds are left in
    // this color.  If this is seen then it means that cc neglected to
    // rerasterize a tile that used to intersect with the content rect
    // after the content bounds grew.
    canvas->save();
    canvas->translate(-canvas_bitmap_rect.x(), -canvas_bitmap_rect.y());
    canvas->clipRect(gfx::RectToSkRect(content_rect),
                     SkRegion::kDifference_Op);
    canvas->drawColor(DebugColors::MissingResizeInvalidations(),
                      SkXfermode::kSrc_Mode);
    canvas->restore();
  }
}
```

这里能看的肯定就是注释啦, 没有太多上下文, 看的挺头痛！大致翻译了下上下几段注释: 

> 1. 即使完全覆盖, 对于触碰到渲染层边界的栅格化处理, 我们依然需要,在上次记录没有覆盖到的纹理下方和纹理化线性过滤的上方,栅格化处理背景颜色。
> 2. 内容的最后的纹理可能只有部分被栅格覆盖
> 3. 在内容边界外没有被渲染到的部分将使用 MissingResizeInvalidations 颜色, 如果这个块能够被看见, 那就意味着程序忽视处理了内边边界增长之后栅格化与内容相交的瓦片。

从第三句大致可以了解到, 因为元素的边界增长导致了这个渲染 bug, 回头看了下元素的边界状态, 果然...

### 直接原因

我们看看 hover 上去之后, 层边界的变化: 

![border](/blogimgs/2015/10/14/TB1I7P2JVXXXXc4XFXXXXXXXXXX-1012-437.gif)<!--<source src="//img.alicdn.com/tps/TB1I7P2JVXXXXc4XFXXXXXXXXXX-1012-437.gif">-->

很明显, 这里的高度溢出了, 但是没有处理, 看了下这个元素的 css, 确实高度上没有做处理, 在元素上添加 

```css
.channel-item {
  overflow: hidden；
}
```

同样可以解决问题。

最后的解决手段: 

![resolve](/blogimgs/2015/10/14/TB18MgrJVXXXXXzXXXXXXXXXXXX-1012-437.gif)<!--<source src="//img.alicdn.com/tps/TB18MgrJVXXXXXzXXXXXXXXXXXX-1012-437.gif">-->

层渲染的问题我还是比较喜欢使用 3d 硬件加速来处理, 而 `overflow:hidden` 这样的 css 布局处理上, 我是不太推荐的, 搞不好就把哪个重要的内容隐藏掉了。

### 类似问题处理方案

如果以后大家遇到类似的问题, 可以打开 chrome 的层和瓦片分析工具, 看看渲染出来的块有没有异常色块, 尤其是粉色块。也可以观察交互过程中, 元素的边界有没有变化。

CSS 在浏览器中的渲染是我们触及比较少的知识, 如果想迅速找到问题, 必须对浏览器的渲染原理有所了解, 并且能够熟练的使用 chrome 提供的调试工具, 这是基础。