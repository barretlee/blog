---
title: HTML5学习随笔（1）
categories:
  - JavaScript
  - 杂物间
tags:
  - tech
  - cnblogs
warning: true
date: 2013-05-24 01:30:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/05/24/canvas-clock.html" target="_blank">博客园</a>.</div>

<p><strong>关键词：</strong>HTML5， canvas， 时钟， 入门</p>
<p><strong>学习内容：</strong>通过制作canvas时钟了解canvas主要方法的使用</p>
<p><strong>DEMO：</strong><a href="http://qianduannotes.sinaapp.com/test/canvas.html" target="_blank">http://qianduannotes.sinaapp.com/test/canvas.html</a></p>


<h3>时钟设计</h3>
<p><strong>1. Design：</strong></p>
<p><img title="时钟" src="http://images.cnblogs.com/cnblogs_com/hustskyking/464217/o_%e6%97%b6%e9%92%9f.png" alt="时钟"></p>
<p><strong>2. colors：</strong></p>
<p>&nbsp; &nbsp; 表盘：<span>#ABCDEF</span>　　　　dialColor</p>
<p>&nbsp; &nbsp; 秒钟：<span>red</span>　　　　　　　 sColor</p>
<p>&nbsp; &nbsp; 秒钟原点： <span>gray</span>　　　　 sDotColor</p>
<p><strong>3. size：</strong></p>
<p>&nbsp; &nbsp; 画布：400*400　　　　 panel</p>
<p>&nbsp; &nbsp; 表盘：R = 160　　　　 &nbsp;dialR</p>
<p>&nbsp; &nbsp; 时针刻度：5*7　　　　　hW hH</p>
<p>&nbsp; &nbsp; 分针刻度：5*3　　　　　mW mH</p>
<p>&nbsp; &nbsp; 时针：10*130　　　　　hHW hHH</p>
<p>&nbsp; &nbsp; 分针：5*147　　　　　 &nbsp;mHW mHH</p>
<p>&nbsp; &nbsp; 秒钟：3*160　　　　　 &nbsp;sHW sHH</p>
<p>　 秒钟原点：r = 5　　　　 sDotR</p>
<p><strong>4. position</strong></p>
<p>&nbsp; &nbsp; 表盘中心：200*200　　 dialT dialL</p>
<p>&nbsp; &nbsp; 秒钟原点中心： 120　　 &nbsp;sDotP</p>


<h3>代码</h3>

```
var clock = document.getElementById('clock');
var cxt = clock.getContext('2d');      //设置2D制图环境

function draw(){

//清楚画布
cxt.clearRect(0, 0, 400, 400);
var now = new Date();
var sec = now.getSeconds();
var min = now.getMinutes();
var hour = now.getHours();
//小时必须是浮点类型(小时+分数转换成小时)
hour = hour+min/60;
hour = hour>12?hour-12:hour;

//表盘
cxt.beginPath();
cxt.lineWidth = 10;
cxt.strokeStyle = "#ABCDEF";
cxt.arc(200, 200, 160, 0, 360, false);
cxt.stroke();
cxt.closePath();
//刻度
//时刻度
for(var i = 0;i


