---
title: 让音乐响起来
categories:
  - JavaScript
  - 前端杂烩
  - 网络交互
tags:
  - tech
  - cnblogs
  - webaudio
warning: true
date: 2014-02-20 12:47:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2014/02/20/webAudio-listen.html" target="_blank">博客园</a>.</div>

<p>本系列文章主要是介绍 Web Audio API 的相关知识，由于该技术还处在 web 草案阶段（很多标准被提出来，至于取舍需要等待稳定版文档来确定，草案阶段的文档很多都会被再次编辑甚至重写、全部删除等，不适合作为正式参考），很多 API 都是未确定的，目前支持 Web Audio API 的浏览器是较新版的 Google Chrome 和 FireFox，其他浏览器暂时还没有兼容。</p>
<p>现在的网络硬件环境还没有达到普遍语音通信的条件，但是 web语音通信 一定会成为后期 web 研究的一个重要话题，凭着一点个人兴趣，拿出来研究研究~</p>
<p>本文主要介绍 Web Audio API 的相关特性，以及音频源的获取方式。</p>
<p>本文地址：<a href="http://www.cnblogs.com/hustskyking/p/webAudio-listen.html">http://www.cnblogs.com/hustskyking/p/webAudio-listen.html</a>，转载请注明源地址。</p>
<h3>一、Web Audio</h3>
<p>在 <code>&lt;audio&gt;</code> 标签的到来之前，Flash 以及其他的插件相继打破 web 的宁静，而如今 audio 被送到了 web 开发之中，我们再也不需要引用各种插件来播放声音了。</p>
<h4>1. Web Audio API 的特性</h4>
<p>Web Audio API 是 JavaScript 中主要用于在网页应用中处理音频请求的一个高级应用接口，这个 API 目的是用于让最新技术与传统的游戏音频引擎的综合处理相兼容，也即尽力提供一些桌面音频处理程序的要求。</p>
<ul>
<li>查看音频播放期间调度事件发生的确切时间；</li>
<li>支持各种类型的音频过滤波器以实现各种效果，包括回声、消除噪音等；</li>
<li>支持利用合成声音（Sound synthesis）创建电子音乐；</li>
<li>支持3D位置音频模拟效果，比如某种声音随着游戏场景而移动；</li>
<li>支持外部输入的声音与 WebRTC 进行集成（调用 WebRTC ，在你的设备中增添吉他声），或者在 WebRTC 中调用其他地方传输过来的声音；</li>
<li>利用音频数据分析创造良好的可视化声音等。</li>
</ul>
<h4>2. AudioContent 简介</h4>
<p>Web Audio API 可以用来操作或者播放网页以及应用中的 audio 资源，在一个 Audio上下文环境（AudioContext）中，有各种 Audio节点（AudioNode），如：</p>
<table>
<thead>
<tr><th>Interface</th><th>description</th></tr>
</thead>
<tbody>
<tr>
<td>AudioContext</td>
<td>包含表示连接中间件 AudioNodes 的音频信号曲线图</td>
</tr>
<tr>
<td>AudioNode</td>
<td>表示 audio源，audio输出以及 中间处理模块，他处在 AudioContext 的上下文中</td>
</tr>
<tr>
<td>AudioDestinationNode</td>
<td>他是 AudioNode 的一个子类，表示所有被渲染音频流到达的最终地点</td>
</tr>
<tr>
<td>AudioBuffer</td>
<td>表示 audio资源 的一个临时缓存，可表示一个音频剪辑</td>
</tr>
<tr>
<td>AudioBufferSourceNode</td>
<td>从 AudioBuffer 中生成 audio 的 AudioNode 节点</td>
</tr>
<tr>
<td>ScriptProcessorNode</td>
<td>一个可以直接被 JS 操作的 AudioNode 节点</td>
</tr>
<tr>
<td>GainNode</td>
<td>音频增益节点</td>
</tr>
<tr>
<td>OscillatorNode</td>
<td>一个可产生固定频率的 audio 源</td>
</tr>
</tbody>
</table>
<p>还有其他的 API 可以查看<a href="http://www.w3.org/TR/webaudio/#APIOverview" target="_blank">http://www.w3.org/TR/webaudio/#APIOverview</a>.</p>
<p>使用 AudioContext 实例，我们可以将生成的一个或者多个音频流连接到声音的输出位置，这个连接并不一定是直接送到输出端，期间可以使用 AudioNodes 作为中继器和处理器，让这些声音信号有一个更好的效果。</p>
<p>单个 AudioContext 实例可以支持多音频的输入，所以对于一个 audio 应用我们只需要创建一个实例就行了。很多诸如创建一个 AudioNode 节点、解码音频文件等方法都是 AudioContext 的内置方法。创建一个 AudioContext 上下文也十分简单：</p>

```
var context;
try{
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
}
catch(e) {
    alert('请更新至最新版的 Chrome 或者 Firefox');
}

```

<h3>二、音频流的获取</h3>
<h4>1. 标签引入</h4>
<p>标签引入是最直接的方式，</p>

```
<audio autoplay src="http://qianduannotes.duapp.com/file/tankWar.mp3">
    浏览器不支持 audio 标签。
</audio>

```

<p>如果浏览器不支持 audio 标签，便会将其当做一个普通元素来解析，中间一行字也就会被显示出来。而支持 audio 标签的浏览器会忽略标签内任何文本。我们还可以为他加上 autoplay 、loop 等属性，使音频在进入页面之后立即循环播放。</p>

```
<audio autoplay="autoplay" controls="controls" src="http://qianduannotes.duapp.com/file/tankWar.mp3">
    浏览器不支持 audio 标签。
</audio>

```

<p>controls 属性是用来控制显示音频文件的控制部分的。默认未设置 controls 属性。</p>
<h4>2. <span>webRTC mediaStream</span>&nbsp;Media Capture <span>(多谢<a href="http://www.cnblogs.com/hehe123/" target="_blank">@Hehe123</a>提醒,RTC属于通信了，此处只是获取 media 流)</span></h4>
<p>利用 getUserMedia 拿到本地的音频流。</p>

```
// 前缀处理
window.AudioContext = window.AudioContext ||
                  window.webkitAudioContext;
navigator.getUserMedia =  navigator.getUserMedia ||
                      navigator.webkitGetUserMedia ||
                      navigator.mozGetUserMedia ||
                      navigator.msGetUserMedia;

var context = new AudioContext();

navigator.getUserMedia({audio: true}, function(stream) {
  // 获取本地流送入 AudioContext
  var microphone = context.createMediaStreamSource(stream);

  // filter为一个中间处理器，用来过滤音频
  var filter = context.createBiquadFilter();

  // microphone -> filter -> destination.
  microphone.connect(filter);
  filter.connect(context.destination);
}, function(){
    console.log("出了点问题~ 是否在服务器环境下运行？");
});

```

<p>这里需要注意的是，使用 webRTC 需要在服务器环境下，你可以搭建一个本地服务器，也可以把代码上传到远程服务器上测试。</p>
<h4>3. FileSystem</h4>
<p>选择本地文件，读取音频流，拿到 Blob 流地址，送入 audio 中</p>

```
<input type="file" onchange="return run(this.files);"><br><br>
<audio controls id="audio"></audio>
<script type="text/javascript">
    function run(files){
        var blob = window.webkitURL.createObjectURL(files[0]);
        audio.src = blob;
        audio.autoplay = "autoplay";
    }
</script>

```

<h4>4. 移动设备，还可以使用如下方式</h4>
<p>1）HTML Media Capture</p>

```
<input type="file" accept="audio/*;capture=microphone">

```

<p>2）device 元素</p>

```
<device type="media" onchange="update(this.data)"></device>
<audio autoplay>
<script>
  function update(stream) {
    document.querySelector('audio').src = stream.url;
  }
</script>

```
</audio>
<h4>5. 从键盘获取</h4>
<p>本质并不是从键盘获取，而是通过键盘获取到我们设定的频率值，然后通过程序创建一段音频。如下面的程序：</p>
<p><span>下面例子中可以按键盘上中间的一排按键（A到K）来发出不同的声音。</span></p>

```
var AudioContext=AudioContext||webkitAudioContext;
var context=new AudioContext;
//为每个键盘位对应一个频率
var s={65:256,83:288,68:320,70:341,71:384,72:426,74:480,75:512};
//为每个频率创建一个Oscillator
for(var i in s)
  value=s[i],
  s[i]=context.createOscillator(),
  s[i].frequency.value=value,
  s[i].start();
//键盘按下时将相应频率的Oscillator连接到输出源上
addEventListener("keydown",function(e){
  if(e=s[e.keyCode])e.connect(context.destination);
});
//键盘松开时将相应频率的Oscillator的连接取消
addEventListener("keyup",function(e){
  if(e=s[e.keyCode])e.disconnect();
});

```

<p>这段代码引自次碳酸钴的<a href="http://www.web-tinker.com/article/20497.html" target="_blank">博客</a>.</p>
<h3>三、小结</h3>
<p>本文是个介绍性的文章，提到了 Web Audio API 的相关知识，以及如何在你的 web 程序中引入 音频流。没有写相关 demo，感兴趣的童鞋可以复制代码自己去测试，在后续文章中会给出测试 DEMO。</p>
<h3>四、参考文章</h3>
<ul>
<li><a href="http://www.csdn.net/article/2013-07-10/2816178-Web-Audio-API-Firefox" target="_blank">http://www.csdn.net/article/2013-07-10/2816178-Web-Audio-API-Firefox</a> CSND</li>
<li><a href="//hacks.mozilla.org/2013/07/web-audio-api-comes-to-firefox/">//hacks.mozilla.org/2013/07/web-audio-api-comes-to-firefox/</a> Mozilla</li>
<li><a href="http://www.html5rocks.com/en/tutorials/webaudio/intro/#toc-context" target="_blank">http://www.html5rocks.com/en/tutorials/webaudio/intro/#toc-context</a> html5rocks</li>
<li><a href="http://www.w3.org/TR/webaudio/" target="_blank">http://www.w3.org/TR/webaudio/</a> W3 Group</li>
<li><a href="http://www.web-tinker.com/article/20497.html" target="_blank">http://www.web-tinker.com/article/20497.html</a>&nbsp;次碳酸钴</li>
</ul>

