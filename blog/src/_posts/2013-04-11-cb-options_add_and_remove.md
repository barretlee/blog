---
title: 摸透select和他的儿子们options
categories:
  - JavaScript
tags:
  - tech
  - cnblogs
  - options
warning: true
date: 2013-04-11 01:59:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/04/11/options_add_and_remove.html" target="_blank">博客园</a>.</div>

<p><strong>关键词：</strong>select option options selectedIndex remove add</p>
<p>关于select的→<a href="http://www.w3.org/2003/01/dom2-javadoc/org/w3c/dom/html2/HTMLSelectElement.html" target="_blank">API</a>，自己去看，不多说了。</p>


<h3>select < option < optgroup</h3>
<p>optgroup就是起到一个分组的作用。</p>

```
<!--common-->
<select id="s1">
    <option value="--s--" selected="selected">----select----</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
</select>
<!--multiple-->
<select multiple id="s2">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
</select>
<!--multiple+group-->
<select multiple id="s3">
    <optgroup label="g1">
        <option value="1" selected="selected">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
    </optgroup>
    <optgroup label="g2">
        <option value="4">4</option>
        <option value="5">5</option>
    </optgroup>
</select>

```

<p><em>注：optgroup的属性用的是label，别搞错了。</em></p>
<p>上面三个一次效果图为</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/04/11/11133800-b58b53b315564d8489ebd6795a915864.png" data-source="http://images.cnitblog.com/blog/387325/201304/11133800-b58b53b315564d8489ebd6795a915864.png" alt=""></p>
<p>样式可以改，这个不多说。</p>


<h3>selectedIndex</h3>
<p>　　写的时候别向我一样犯2，我经常写成selectIndex，然后纠结哪里错了。。</p>
<p>　　前面展示了两类，后者为multiple，按住Ctrl键可以多选，但是selectedIndex只能选中一个，所以multiple的select不适合用（尽管是允许用的）。</p>

```
var s1 = document.getElementById("s1")；
s1.onchange = function(){
        //如果你要写成this.options.selectedIndex，这也是没问题的  
        console.log( this.selectedIndex );
}

```



<h3>添加option</h3>
<p><strong>1.比较老的方法（兼容性不知道）：</strong></p>

```
var p = new Option("text","value",false,true);
s1[s1.options.length] = p;

```

<p>new Option第一个参数顾名思义就行了，第三个指的是defaultSelected属性，就是默认选中，第四个指的是selected属性，就是要不要选中。</p>
<p>兼容性不太清楚，不建议使用，而且四个参数过几天又忘了顺序或者涵义了。</p>
<p><strong>2.标准化的一些函数调用创建option</strong></p>

```
var p = document.createElement("option");         //创建一个Element
p.value = "add";  //添加属性 推荐p.setAttribute("value", "add");
p.appendChild(document.createTextNode("add"));    //添加text
s1.insertBefore(p, /*这里随便写的*/s1.firstChild);  //插入

```

<p><em>P.S：我在chrome下测试，上述最后一句代码改成insertAfter报错，所以大家在使用的时候尽量用insertBefore。</em></p>


<h3>删除option</h3>

```
var p = s1.item(2); //可以使用item来选择,也可以
                    //s1.getElementsByTagName("option")[2];
p.parentElement.removeChild(p); //删除节点

```



<h3>z-index bug IE6</h3>
<p>还有一个bug忘了说了，补上！</p>
<p>在IE6下，select的z-index属性总是比其他的元素也高，也就是说，只要你搞一个模拟弹框，就会发现一个select傻傻的浮到弹框之上，或者遮罩层出现一个闪亮的select元素，颇为恶心。</p>
<p><strong>解决方案：</strong></p>
<p>　　1. 极度屌丝，极度方便，极度省事，极度。。。。。<strong>把他隐藏</strong>！！！！，关闭弹出框之后<strong>再显示</strong></p>
<p>　　2. <strong>iframe包裹</strong></p>

```
    <iframe>
　　　　<select name="me">
　　　　　　<option value="name">木子Vs立青</option>
　　　　　　<option value="sex">male</option>
　　　　　　<option value="age">20</option>
　　　　</select>
　　</iframe>

```

<p>　　只要这个iframe的z-index比你弹出层的z-index小就行了。</p>


<h3>Reference</h3>
<p>　　1.《JavaScript权威指南（第六版）》</p>
<p>　　2.&nbsp;<a href="http://www.cnblogs.com/Darren_code/archive/2012/03/05/z-index.html#darren_7" target="_blank">聂微东</a></p>