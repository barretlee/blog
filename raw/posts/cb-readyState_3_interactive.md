---
title: 利用XMLHttpRequest响应头部的Date来做倒计时
categories:
  - JavaScript
  - 网络交互
tags:
  - tech
  - cnblogs
  - XMLHttpRequest
warning: true
date: 2013-04-13 01:46:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/04/13/readyState_3_interactive.html" target="_blank">博客园</a>.</div>

<p><strong>关键词：</strong>倒计时 XMLHttpRequest readyState Date AJAX</p>


<h3>Problem [问题描述]</h3>
<p>先看看这个：（搜狗团购网站）</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/04/13/13132807-90d20866286944e282a80251a51c1893.png" data-source="http://images.cnitblog.com/blog/387325/201304/13132807-90d20866286944e282a80251a51c1893.png" alt=""></p>
<p>还剩多久多久，这个东西你是怎么做的。</p>


<h3>不推荐方案</h3>
<p><strong>脑残方案一：</strong></p>
<p><strong>　　</strong>把截止时间保存到cookie中，然后与现在时间做差值，进行比较。</p>
<p>　　<strong>方案评价：</strong></p>
<p>　　　　1. 如果用户cookie没开怎么办？</p>
<p>　　　　2. cookie不宜过多，cookie过期管理等麻烦！</p>


<p><strong>脑残方案二：</strong></p>
<p><strong>　　</strong>把服务器的本地时间作为参数送到客户端，然后js相关处理</p>
<p>　　<strong>方案评价：</strong></p>
<p>　　　　 因网络延迟等原因存在误差</p>


<p><strong>屌丝看完变高富帅^_^</strong></p>
<p>　 &nbsp;先给你看一张图：（向服务器请求的某个任意文件）</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/04/13/13133549-bdff65e110bc4489bcb7a88fcf7ec6dd.png" data-source="http://images.cnitblog.com/blog/387325/201304/13133549-bdff65e110bc4489bcb7a88fcf7ec6dd.png" alt=""></p>
<p>好像有的同学瞬间就懂了。</p>


<p>是的，在请求头中就包含了服务器的标准时间。那么下一步就是怎么获取这个Date。</p>


<h3>XMLHttpRequert</h3>
<p>我们知道在XMLHttpRequest中用readyState来表示相应状态。</p>
<table class="table-view log-set-param">
<tbody>
<tr>
<td>
<div class="para">0 （未初始化）</div>
</td>
<td>
<div class="para">对象已建立，但是尚未初始化（尚未调用open方法）</div>
</td>
</tr>
<tr>
<td>
<div class="para">1 （初始化）</div>
</td>
<td>
<div class="para">对象已建立，尚未调用send方法</div>
</td>
</tr>
<tr>
<td>
<div class="para">2 （发送数据）</div>
</td>
<td>
<div class="para">send方法已调用，但是当前的状态及http头未知</div>
</td>
</tr>
<tr>
<td>
<div class="para">3 （数据传送中）</div>
</td>
<td>
<div class="para">已接收部分数据，因为响应及http头不全，这时通过responseBody和responseText获取部分数据会出现错误，</div>
</td>
</tr>
<tr>
<td>
<div class="para">4 （完成）</div>
</td>
<td>
<div class="para">数据接收完毕，此时可以通过通过responseBody和responseText获取完整的回应数据</div>
</td>
</tr>
</tbody>
</table>
<p>大家可能很少用到readyState为3这个状态，那么这个问题，就要用到他了。</p>


<h3>Solution [解决方案]</h3>

```
<script type="text/javascript">
 var xhr = new XMLHttpRequest();
 xhr.open('get', 'testServer.txt', true); //这里的testServer.txt，其实我没有创建，完全可以不需要这个文件，我们只是要时间罢了
 xhr.onreadystatechange = function(){
     if(xhr.readyState == 3){ //状态3响应
      var header = xhr.getAllResponseHeaders(); //获得所有的头信息
      console.log(header);//会弹出一堆信息
      console.log(xhr.getResponseHeader('Date')); //弹出时间，那么可以利用获得的时间做倒计时程序了。
     }
 }
 xhr.send(null);
</script>

```

<p>上面看着懂大概的意思就行哈~</p>
<p><em>注：上述代码IE9以下版本不兼容，不清楚的童鞋自己百度AJAX兼容性等关键词。</em></p>


<h3>Reference [参考资料]</h3>
<p>　　1. <a href="http://blog.csdn.net/dxx1988/article/details/6948658" target="_blank">Exodia</a></p>
<p>　　2. <a href="http://baike.baidu.com/view/6987234.htm" target="_blank">百度文库</a></p>
<p>　　</p>