---
title: 百万数据如何在前端快速流畅显示？
categories:
  - JavaScript
  - 前端杂烩
  - 网络交互
tags:
  - tech
  - cnblogs
  - 大数据
mark: hot
warning: true
date: 2014-03-25 12:54:00
---

如果要在前端呈现大量的数据，一般的策略就是分页。前端要呈现百万数据，这个需求是很少见的，但是展示千条稍微复杂点的数据，这种需求还是比较常见，只要内存够，javascript 肯定是吃得消的，计算几千上万条数据，js 效率根本不在话下，但是 DOM 的渲染浏览器扛不住，CPU 稍微搓点的电脑必然会卡爆。

本文的策略是，显示三屏数据，其他的移除 DOM。


### 一、 策略

下面是我简单勾画的一个草图，我们把一串数据放到一个容器当中，这串数据的高度（Data List）肯定是比 Container 的高度要高很多的，如果我们一次性把数据都显示出来，浏览器需要花费大量的时间来计算每个 data 的位置，并且依次渲染出来，整个过程中 JS 并没有花费太多的时间，开销主要是 DOM 渲染。

```
                          /==============> Data List
        |     ....     | /
        +--------------+/
+=======|=====data=====|========+
|       +--------------+        |
|       |     data     |        |
|       +--------------+        |\
|       |     data     |        | \
|       +--------------+        |  \======> Container
+=======|=====data=====|========+
        +--------------+
        |     ....     |        Created By Barret Lee
```

为了解决这个问题，我们让数据是显示一部分，这一部分是 Container 可视区域的内容，以及上下各一屏（一屏指的是 Container 高度所能容纳的区域大小）的缓存内容。如果 Container 比较高，也可是只缓存半屏，缓存的原因是，在我们滚动滚动条的时候，js 需要时间来拼凑字符串（或者创建 Node ），这个时候浏览器还来不及渲染，所以会出现临时的空白，这种体验是相当不好的。


### 二、Demo

demo 在 IE 7、8 有 bug，请读者自己修复吧~

代码：

```html
<title>百万数据前端快速流畅显示</title>
<style type="text/css">
#box {position: relative; height: 300px; width: 200px; border:1px solid #CCC; overflow: auto}
#box div { position: absolute; height: 20px; width: 100%; left: 0; overflow: hidden; font: 16px/20px Courier;}
</style>

<div id="box"></div>

<script type="text/javascript">
var total = 1e5
  , len = total
  , height = 300
  , delta = 20
  , num = height / delta
  , data = [];

for(var i = 0; i < total; i++){
  data.push({content: "item-" + i});
}

var box = document.getElementById("box");
box.onscroll = function(){
  var sTop = box.scrollTop||0
    , first = parseInt(sTop / delta, 10)
    , start = Math.max(first - num, 0)
    , end = Math.min(first + num, len - 1)
    , i = 0;

  for(var s = start; s <= end; s++){
    var child = box.children[s];
    if(!box.contains(child) && s != len - 1){
      insert(s);
    }
  }

  while(child = box.children[i++]){
    var index = child.getAttribute("data-index");
    if((index > end || index < start) && index != len - 1){
      box.removeChild(child);
    }
  }

};

function insert(i){
  var div = document.createElement("div");
  div.setAttribute("data-index", i);
  div.style.top = delta * i + "px";
  div.appendChild(document.createTextNode(data[i].content));
  box.appendChild(div);
}

box.onscroll();
insert(len - 1);
</script>
```
可以戳这个 [demo](http://rawgithub.com/barretlee/9744160/raw/a71dd5561a910b48063cc81e8ee7b042cfeb1574/gistfile1.html)，或者看这里 <http://gist.github.com/barretlee/9744160>

### 三、算法说明

#### 1. 计算 start 和 end 节点

```
        |              |
+=======|==============|========+——
|    ↓——+--------------+        | ↑
| delta |              |        |
|    ↑——+--------------+        | height
|       |              |        |
|       +--------------+        | ↓
+=======|==============|========+——
        |              |
```

Container 可以容纳的 Data 数目为 `num = height / delta`，Container 顶部第一个节点的索引值为

```javascript
 var first = parseInt(Container.scrollTop / delta);
```

由于我们上下都有留出一屏，所以

```javascript
var start = Math.max(first - num, 0);
var end = Math.min(first + num, len - 1);
```

#### 2. 插入节点

通过上面的计算，从 start 到 end 将节点一次插入到 Container 中，并且将最后一个节点插入到 DOM 中。

```javascript
// 插入最后一个节点
insert(len - 1);
// 插入从 start 到 end 之间的节点
for(var s = start; s <= end; s++){
  var child = Container.children[s];
  // 如果 Container 中已经有该节点，或者该节点为最后一个节点则跳过
  if(!Container.contains(child) && s != len - 1){
    insert(s);
  }
}
```

这里解释下为什么要插入最后一个节点，插入节点的方式是：

```javascript
function insert(i){
  var div = document.createElement("div");
  div.setAttribute("data-index", i);
  div.style.top = delta * i + "px";
  div.appendChild(document.createTextNode(data[i].content));
  Container.appendChild(div);
}
```

可以看到我们给插入的节点都加了一个 top 属性，最后一个节点的 top 是最大的，只有把这个节点插入到 DOM 中，才能让滚动条拉长，让人感觉放了很多的数据。

#### 3. 删除节点

为了减少浏览器的重排（reflow），我们可以隐藏三屏之外的数据。我这里为了方便，直接给删除掉了，后续需要再重新插入。

```javascript
while(child = Container.children[i++]){
  var index = child.getAttribute("data-index");
  // 这里记得不要把最后一个节点给删除掉了
  if((index > end || index < start) && index != len - 1){
    Container.removeChild(child);
  }
}
```

当 DOM 加载完毕之后，触发一次 `Container.onscroll()`，然后整个程序就 OK 了。

### 四、小结

本文主要是叙述大数据加载的一点基本原理，程序可能有 bug，也有很多地方可以优化，了解下算法就行了。

