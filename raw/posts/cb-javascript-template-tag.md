---
title: 换个标签写前端模板
categories:
  - JavaScript
  - 前端杂烩
tags:
  - tech
  - cnblogs
warning: true
date: 2014-04-13 02:21:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2014/04/13/javascript-template-tag.html" target="_blank">博客园</a>.</div>

<p>前端模板中，我们通常使用 script/textarea 来存放模板代码，然后使用 innerHTML/value 属性来获取模板内容进行解析和拼装。</p>

```
<script type="text/x-template" id="tpl">
    <h1><%=data.title%></h1>
    <p><%=data.content%></p>
</script>
<script>
    var htmlTpl = document.getElementById("tpl").innerHTML;
    tplEngine(htmlTpl, {
        title: "This is title",
        content: "This is content"
    });
</script>

```

<p>关于 tplEngine 这个 Javascript 模板引擎，之前也写了篇 <a href="http://www.cnblogs.com/hustskyking/p/principle-of-javascript-template.html" target="_blank">文章</a> 介绍过，这里就不赘述了。除了使用 script 标签，textarea 也可以达到同样的效果，但是本文叙述的重点并不是如何去解析一个 JavaScript 模板。</p>
<p>W3C工作组在 HTML 中加入了一个新的标签 &mdash;&mdash;TEMPLATE。他提供了一个可以定义 HTML 代码片段的机制，下面就来详细说说这个 TEMPLATE 标签。</p>
<p>本文地址：http://www.cnblogs.com/hustskyking/p/javascript-template-tag.html，转载请注明源地址。</p>
<h3>一、先看 DEMO</h3>
<p>运行下面的 demo，或许你已经知道了一些东西了。</p>

```
<ul id="list">
    <!-- TEMPLATE 模板 -->
    <template id="tpl">
        <li><span></span> - <span></span></li>
    </template>
</ul>
<button id="btn">见证奇迹的时刻→</button>
<script>
    var datas = [
        {name:"李靖", age:"21"},
        {name:"Barret Lee", age:"21"}
    ];
    btn.onclick = function(){
        for(var i = 0, len = datas.length; i < len; i++){
            var data = datas[i];
            // 获取模板代码
            var htmlTpl = tpl.content.cloneNode(true);
            // 插入数据
            var spans = htmlTpl.querySelectorAll("span");
            spans[0].textContent = data.name;
            spans[1].textContent = data.age;
            // 插入到 DOM 中
            list.appendChild(htmlTpl);
        }
    };
</script>

```

<p>这里使用的 template 标签，标签的内容没有被解析，我们并没有也使用 innerHTML 这种暴力手段获取模板内容。</p>
<h3>二、template 标签特性</h3>
<ol>
<li>这个标签可以被定义在任何位置：head 中、body中、甚至是一个 frame 中。</li>
<li>标签内容不会显示出来</li>
<li>Template 标签不被当做 document 的一部分，你可以去试试弹出 <code>document.getElementById("tpl").length</code>, 或者看看他其他的属性，得到的结果都是 undefined。</li>
<li>标签内容在被应用之前，都是 inactive 状态，也就是说模板中的 img、audio、script 标签都不会执行（加载）</li>
</ol>
<h3>三、浏览器对 template 标签的解析</h3>
<p>每一个 template 元素都会和一个 DocumentFragment 对象关联，当一个 template 元素被创建时，浏览器会运行如下操作：</p>
<ol>
<li><span class="translator" title="Let doc be the template element's ownerDocument's appropriate template contents owner document.">让文档（doc）是模板元素的ownerDocument的相应的模板内容拥有者文档（owerDocument）。</span></li>
<li><span class="translator" title="Create a DocumentFragment object whose ownerDocument is doc.">创建一个 DocumentFragment 对象，这个对象的拥有者文档（owerDocument）为 doc</span></li>
<li><span class="translator" title="Set the template element's template contents to the newly created DocumentFragment object.">将模板文档的 content 内容放到上述新创建的 DocumentFragment 中</span></li>
</ol>
<p>上面的过程我是翻译 w3c 的规范文档，读起来相当晦涩，如果你了解 <a href="http://www.zhihu.com/question/22326250/answer/21686102" target="_blank">shadowDOM</a>,那理解起来就轻松了，template 在解析是，其内容被解析成一个 shadowDOM，我们只能使用 content 属性来获取到这个 shadowDOM 的内容。</p>
<h3>四、兼容性与需要注意的地方</h3>
<p>很可惜，这玩意儿虽然好用，但 IE 目前还不支持，当然 Chrome 32+ | Firefox 25+ 都提供了支持。</p>
<h4>1. 克隆节点而不是直接使用</h4>
<p>从上面的 demo 中，可以发现，获取 template 标签的内容，其方式是：</p>

```
document.getElementById("tpl").content

```

<p>但是我并不是直接将 content 赋值给 htmlTpl，而是：</p>

```
htmlTpl = tpl.content.cloneNode(true);

```

<p>为什么要这么做呢？如果你不是用 cloneNode，而是直接将内容 appendChild 到 DOM 树中，documentFragment 内的内容就会被清空，上面我们说了 template 标签内容就是一个 documentFragment 的 shadowDOM，所以应该使用 cloneNode 或者 importNode 方法将内容复制到 DOM 中，这样才能保证这个 shadowDOM 内容不被清空，从而可以复用（你可以把上面 demo 的 cloneNode 函数去掉，看看结果如何）。</p>
<h4>2. 不支持 template 标签的降级处理</h4>
<p>其实也没有比较好的降级处理方案，如果你在 template 中放了 script 或者 img 节点，这些内容都会被解析出来，你阻止不了，所以如果你的程序要兼容所有的浏览器，暂时就不要用了。当然，你可以做这样的判断：</p>

```
if (!"content" in document.createElement("template")){
    // code here..
    return;
}

```

<h4>3. 模板中嵌入模板</h4>
<p>在 script 标签中嵌入一个 script 标签，这个几乎是不可能的事情吧，但是 template 可以：</p>

```
<template id="ulList">
    <li>
        <strong><%=content%></%=content%></strong>
        <template>
            <div>
                <p><%=detail%></%=detail%></p>
            </div>
        </template>
    </li>
</template>

```

<p>至于插入之后是个什么效果，读者可以自己去浏览器中查看。这种插入方式是有使用场景的，很多时候我们都是给需要应用模板的元素设置一个 id 或者 class ，方便找到他们，而这种直接插入的方式，我们可以利用模板代码直接找到需要应用模板的元素，如：</p>

```
var tpl = ulList.getElementsByTagName("template")[0]; // 获取模板
var toBox = tpl.parentNode; // 直接定位要插入的位置
toBox.appendChild(tpl.content.cloneNode(true)); // 插入

```

<h3>五、拓展 web components</h3>
<p>Web Components 是一些规范，旨在以浏览器原生的方式向外提供组件，它的规范如下:</p>
<ul>
<li>模板（Templates）可以将不必立即渲染的元素，不必立即执行的脚本放入这里。</li>
<li>装饰器（Decorators）</li>
<li>Shadow DOM</li>
<li>自定义元素（Custom Elements），实现自定义html标签，及属性。拥有同原生组件一样的生命周期</li>
<li>Imports, 指定引入的组件文档及类型</li>
</ul>
<p>其实本文提到的内容就是 web components 的冰山一角，感兴趣的童鞋可以去读一读相关的内容。</p>
<ul>
<li><a href="http://www.html5rocks.com/zh/tutorials/webcomponents/imports/" target="_blank">http://www.html5rocks.com/zh/tutorials/webcomponents/imports/</a> HTML Imports</li>
<li><a href="http://www.w3.org/TR/components-intro/" target="_blank">http://www.w3.org/TR/components-intro/</a> w3c components</li>
<li><a href="http://www.html5rocks.com/zh/search?q=web+components" target="_blank">http://www.html5rocks.com/zh/search?q=web+components</a> search</li>
</ul>
<h3>六、小结</h3>
<p>本文稀里哗啦说了一大串，主要是简单介绍 web components 中的 template 标签，用以替换模板代码容器 script/textarea，web components 肯定是 web 发展的一个大头，尤其是移动开发上，很有必要深入研究。</p>
<h3>七、参考资料</h3>
<ul>
<li><a href="http://www.whatwg.org/specs/web-apps/current-work/multipage//scripting-1.html#the-template-element" target="_blank">http://www.whatwg.org/specs/web-apps/current-work/multipage//scripting-1.html#the-template-element</a> W3C</li>
<li><a href="//developer.mozilla.org/en-US/docs/Web/HTML/Element/template" target="_blank">//developer.mozilla.org/en-US/docs/Web/HTML/Element/template</a> MDN</li>
<li><a href="http://www.c-sharpcorner.com/UploadFile/370e35/template-tag-in-html5/" target="_blank">http://www.c-sharpcorner.com/UploadFile/370e35/template-tag-in-html5/</a> Sunny Kumar</li>
</ul>

