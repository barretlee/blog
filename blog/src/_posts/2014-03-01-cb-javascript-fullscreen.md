---
title: 让你的页面瞬间全屏
categories:
  - JavaScript
  - 前端杂烩
tags:
  - tech
  - cnblogs
warning: true
date: 2014-03-01 03:11:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2014/03/01/javascript-fullscreen.html" target="_blank">博客园</a>.</div>

<p><span>@update 文章下方有更新，提到了更多全屏的知识以及错误的矫正。</span></p>
<p><span>页面全屏是一个体验非常棒的功能，他可以让你的视觉焦点聚集在你想关注的元素块上。很多浏览器都支持全屏，按下 F11，哦了！ 页面全屏了~&nbsp;但是本文要说的并不是这种全屏。当页面中有个小 DEMO 或者小游戏要展示的时候，用户期望，这个 DEMO 或者游戏可以在全屏下展示，本文就教你如何来展示。</span></p>
<p>如果你是非 IE 浏览器进入的该页面，你可能已经看到了页面上发生了一点小变化，多个东西：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/03/01/010309260367360.png" data-source="http://images.cnitblog.com/i/387325/201403/010309260367360.png" alt=""></p>
<p>没错，多了个\进入全屏"的按钮，这就是本文要介绍的内容！</p>
<p>本文地址：<a href="http://www.cnblogs.com/hustskyking/p/javascript-fullscreen.html">http://www.cnblogs.com/hustskyking/p/javascript-fullscreen.html</a>，转载请注明源地址。</p>
<h3>一、全屏策略</h3>
<h4>1. 原理</h4>
<p>一些浏览器提供了元素全屏的接口，这些接口的调用特别简单：</p>

```
// 进入全屏
element.requestFullScreen();
// 退出全屏
document.exitFullscreen(); 

```

<p>这是 w3c 规范统一的接口，但是浏览器总是那么调皮，内部实现的时候会加上自己厂商的前缀，如：</p>

```
// 小狐
element.mozRequestFullScreen();
// Chrome
document.webkitCancelFullScreen();

```

<p>这里有两点需要引起注意，W3C 中的退出全屏是 <code>exitFullscreen</code>，而小狐跟 Chrome 使用的是 <code>cancelFullScreen</code>，这里在作判断的时候不要弄错了；再一点就是当我们退出全屏的时候，并不是使用 element 作为退出的对象了，而是使用 document。</p>
<h4>2. 兼容处理</h4>
<p>原理是很简单，但是针对浏览器的兼容性写起来还是挺麻烦的，幸好 Chrome 换用 blink内核 之后没有继续加上一个 <code>-blink-</code>，否则开发者心里会有无数个草泥马奔腾的！</p>
<p>对于进入全屏：</p>

```
function launchFullScreen(element) {
   if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
}

```

<p>对于退出全屏：</p>

```
function cancelFullScreen() {
   if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
}  

```

<h4>3. 浏览器兼容性</h4>
<p><span>IE 用户就甭看了，刚测试，IE11 不兼容</span>（需要加前缀 ms）。对于浏览器的兼容情况，请戳<a href="//developer.mozilla.org/en/DOM/Using_full-screen_mode#AutoCompatibilityTable" target="_blank">这里</a>。目前 Firefox 兼容，不过有点离谱。他会弹出一个让你全屏的提示，此时确实是全屏的，但当你点击提示中的\允许"时，屏幕又退出了全屏，真是让人匪夷所思。我测试的版本（27.0.1）有这个问题，当然，这是浏览器本身的问题，不用纠结。</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/03/01/010319363967428.png" data-source="http://images.cnitblog.com/i/387325/201403/010319363967428.png" alt="" width="553" height="195"></p>
<p>Chrome 对于新特性的支持永远是站在前排，不得不佩服 google 开发工程师的牛掰！</p>
<h3>二、3 个 bug</h3>
<h4>1. window 失去焦点</h4>
<p>当全屏一个元素块的时候，原始状态该元素块可能没有 padding 或者 margin 值，为了让他显示的稍微养眼一些，我们可能会给他主动加上 padding 值，然后在退出全屏的时候在拿到设置的值。但此时，一个 bug 出现鸟，当我们点击全屏页面中的 a 标签，或者触发了某个 <code>window.open</code> 之后，浏览器会失去焦点，跳到新开的页面中，而全屏的页面会退出全屏，搞笑的是我们开始设置的 padding 值他不给我们去掉，这个是令人十分神伤的，<span>不过没关系，有 bug 咱们就打补丁！</span></p>

```
window.onblur = function(){
    cancelFullsreen();
    changeThePadding();
};

```

<p>有人会想到，我们在点击 a 链接的时候先 changeThePadding()，再让 a 标签跳走，这种方式是不合理的，因为除了 a 链接会让页面失去焦点之外还有其他的可能（如 window.open）。</p>
<p><span>@update</span> 因为 bug 3 的存在，这里不能这样改，需要利用浏览器的全屏探测：</p>

```
$(document).on('webkitfullscreenchange mozfullscreenchange msfullscreenchange fullscreenchange', function(){
    if (!document.fullscreenElement &&    // alternative standard method
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement ) {
        // 在这里处理 bug        changeThePadding();
} });

```

<h4>2. 一个貌似可以重现的 bug</h4>
<p>所谓的可以重现就是，把代码逻辑抽离出来，写个 demo 还能看到 bug。反正我试过好几次，这个 bug 都出现了，懒得写一个 DEMO 重现他。他出现的位置是：我的滚动条是自己设置的样式，当全屏之后，滚动条本应该在页面的最右侧，但是我测试的时候他偶尔会离最右侧有十几个像素，我也不知道为什么。但是当我打开 DevTools 的时候，这十几个像素又奇妙的被缝合了~</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/03/01/010322023845093.png" data-source="http://images.cnitblog.com/i/387325/201403/010322023845093.png" alt=""></p>
<p>后来一想，管你呢，这肯定是 google 的工程师没有留意到的位置！既然开打 DevTools 可以修复，那就说明触发 window.resize 也能解决这个问题，好吧，那就这样试试吧：</p>

```
newCancelFullscreen = function(){
    cancelFullscreen();
    window.onresize();
};

```

<p>果然有效，bug 搞定！</p>
<h4>3. 全屏之后，部分浏览器会在该页面失去焦点</h4>
<p>这就相当于，全屏之后，触发了 window.blur();</p>
<h3>三、小结</h3>
<p>除了上面提到的两个 bug，还有一个值得注意的是，如果你全屏的那个元素块很高但却没有设置</p>

```
element { overflow:auto; }

```

<p>之类的东西，你会发现滚烂你的鼠标也滚不出那块区域。</p>
<p>本文介绍了如何使用 javascript 将页面中的某个元素调至全屏，并指出了再使用过程中的两个 bug，希望引起注意！</p>
<h3>四、参考资料</h3>
<ul>
<li><a href="http://baidufe.com/" target="_blank">http://baidufe.com/</a> Alien的笔记</li>
</ul>


<h4><span>@update 2014/03/01 12:00</span></h4>
<p>1. Trident 内核的 IE 浏览器是支持的，可以用&nbsp;element.msRequestFullscreen()，退出用&nbsp;<span>msExitFullscreen()</span></p>
<p>2. 对于全屏的元素可以使用伪元素给他加样式：</p>

```
:-webkit-full-screen #myvideo {
  width: 100%;
  height: 100%;
}

```

<p>3. 浏览器提供的两个方便开发的东西：</p>
<p><a href="//developer.mozilla.org/en-US/docs/Web/API/document.mozFullScreenElement" target="_blank">fullscreenElement</a>：如果这个属性为空，则浏览器处于非全屏状态，否则就是处于全屏。</p>
<p><a href="//developer.mozilla.org/en-US/docs/Web/API/document.mozFullScreenEnabled" target="_blank">fullscreenEnabled</a>：这个属性告诉你浏览器 document 是否可以全屏。</p>
<p>4. 也可以使用 keydown 来控制全屏，如：</p>

```
document.addEventListener("keydown", function(e) {
  if (e.keyCode == 13) {
    toggleFullScreen();
  }
}, false);

```

<p>对于 toggleFullScreen 函数：</p>

```

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

Toggle FullScreen
```

<p>5. 全屏事件</p>
<p>看到这句代码你可能就懂了：</p>

```
$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange',fn);

```

<p>当全屏状态改变时会触发上面的 fullscreenchange 事件，所以 <a href="#2885642"><span><span>#15</span> p2227</span></a> 给我提出的问题就可以得到解决了。</p>


<p><span>文章可能还存在错误的地方，还请多多斧正！</span></p>