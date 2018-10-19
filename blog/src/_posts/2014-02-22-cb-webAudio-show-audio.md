---
title: 看得到的音频流
categories:
  - JavaScript
  - 前端杂烩
  - 网络交互
tags:
  - tech
  - cnblogs
  - webaudio
warning: true
date: 2014-02-22 08:45:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2014/02/22/webAudio-show-audio.html" target="_blank">博客园</a>.</div>

<p><a href="http://www.cnblogs.com/hustskyking/p/webAudio-listen.html" target="_blank">上文</a>介绍了 Web Audio API 的相关知识，以及如何在你的 web 程序中引入 音频流，内容都是介绍性的，所以没有写太多 DEMO。本文重点讲解如何利用 Web Audio API 中的中间节点拿到音频信号的信息，并将信息转化成信号图绘制到 canvas 中。</p>
<p>从上文中我们了解到，AudioContext 是音频播放和处理的一个环境，大概的流程是这个样子：</p>

```
  +---------------+------------------------------------+
  | AudioContext  |                                    |
  +---------------+                                    |
  |        +-------+    +-------+    +-------+         |
  |        |       |    |       |    |       |         |
==========>| Source|===>|Lots of|===>|  Dest | Output  |
Multi Input|       |    |       |    |       |===========>
==========>|  Node |===>| Nodes |===>|  Node |         |
  |        |       |    |       |    |       |         |
  |        +-------+    +-------+    +-------+         |
  |                         |                          |
  |                         |    Created By Barret Lee |
  +-------------------------|--------------------------+
                            |         +-------------+
                            +========>| Other Tools |
                              signal  +-------------+

```

<p>在 AudioContext 中，通过一个结点（AudioNode）来接受输入源，中间的一些结点可以过滤、放大、去杂等处理 Source Node 的信号，处理之后可以送到 AudioContext 的输出结点，然后启用 <code>source.start()</code> 播放音频信息；也可以将处理的信息送到外部交给其他对象来处理，比如本文要谈到的，将信号交给 Canvas 来处理，这样就能看到音频信号的波形图了。</p>
<p>本文地址：<a href="http://www.cnblogs.com/hustskyking/p/webAudio-show-audio.html" target="_blank">http://www.cnblogs.com/hustskyking/p/webAudio-show-audio.html</a>，转载请注明源地址。</p>
<p><strong>注：较新版 Google Chrome 和 Firefox 才能运行本文中的 DEMO。</strong></p>
<h3>一、节点的连接</h3>
<p>先说一说，各个节点在 AudioContext 中的连接是如何用代码实现的:</p>

```
// 创建一个 AudioContext 环境
var context = new AudioContext();

function playSound() {
    // 创建一个 Source 节点
    var source = context.createBufferSource();
    // 拿到输入源（狗吠）
    source.buffer = dogBarkingBuffer;
    // 将 source 节点链接到 destination 节点（输出节点）
    source.connect(context.destination);
    // currentTime 设定为 0，开始播放
    source.start(0);
}

```

<p>上面的连接十分简单，直接将 source 节点连接到 destination 节点，相当于没有经过人任何处理，直接输出了，而下面的方式是创建一个中间节点，对信号做一些处理，不过在拿到 Source 的方式上跟上面有些不一样：</p>

```
var audio = document.getElementsByTagName("audio")[0];
// context 为一个 AudioContext 环境
// 从 audio 元素中拿到输入源，也就是上图所看到的 Mutil Input
var source = context.createMediaElementSource(audio);
// 建立一个处理延时节点
var delayNode = context.createDelay();
// sourceNode -> delayNode -> destinationNode
source.connect(delayNode);
delayNode.connect(context.destination);

```

<p>这里需要注意的是，destination 是 AudioContext 实例的固有属性，他就是信号的最终汇聚的位置，也是信号的输出位置。下面是一个简单的 DEMO 代码：</p>

```
<audio src="http://qianduannotes.duapp.com/file/tankWar.mp3" id="origin"></audio>
<audio src="http://qianduannotes.duapp.com/file/tankWar.mp3" id="audio"></audio>
<input type="button" onclick="origin.play()" value="原始音质 播放">
<input type="button" onclick="origin.pause()" value="原始音源 暂停"><br>
<input type="button" onclick="audio.play()" value="滤波音质 播放">
<input type="button" onclick="audio.pause()" value="滤波音源 暂停">
<script type="text/javascript">
    var AudioContext = AudioContext || webkitAudioContext;
    var context = new AudioContext();
    var source = context.createMediaElementSource(audio);
    // 低通滤波节点（高频信号被过滤，听到的声音会很沉闷）
    var FilterNode = context.createBiquadFilter("lowpass");
    // sourceNode -> FilterNode -> destinationNode
    source.connect(FilterNode);
    FilterNode.connect(context.destination);
</script>

```

<p>上面的代码，AudioContext 获取 audio 源的原理是这样的：</p>
<ol>
<li>audio有一个内置的输出通道</li>
<li>AudioContext 通过 createMediaElementSource 将 audio 的输出直接拉去到新的环境中，之前 audio 环境被破坏</li>
<li>拉去的 source 没有 start 函数，他会一直监听 audio 的操控，当 play 函数被触发的时候，开始播放音频。也可以认为，play 函数触发了 start （老版浏览器中是 noteOn）</li>
</ol>
<p>下面是一个演示图：</p>

```
 +----------+------------------------------+
 | audio    |                              |
 +----------+                              |
 |     +--------+      //  +-------------+ |
 |     | Source |=====//==>| Destination | |
 |     +--------+  | //    +-------------+ |
 |                 |                       |
 +-----------------|-----------------------+
                   |   Created By Barret Lee
          +--------|-----+--------------------------+
          |        ↓                                |
          |     +--------+    +-------+    +------+ |
          |     | Source |===>| Nodes |===>| Dest | |
          |     +--------+    +-------+    +------+ |
          |                          +--------------+
          |                          | AudioContext |
          +--------------------------+--------------+

```

<h3>二、两个中间节点的介绍</h3>
<h4>1. ScriptProcessorNode</h4>
<p>我们可以直接使用 JavaScript 操控这个节点，他的作用是产生、传递、分析一段音频。他有一个 bufferSize 属性和一个 onaudioprocess 事件。初始化一个 ScriptProcessorNode：</p>

```
var processor=context.createScriptProcessor(4096, 1, 1);

```

<p>他接收三个参数，第一个是 bufferSize 的大小，取值范围是 <code>Math.pow(2, N) ( 8&le;N&le;14 )</code>，第二个参数是送入的 channel 数，第三个参数是输出的 channel 数。信息不会自动通过这个节点需要我们自己将输入的信号复制到输出位置去：</p>

```
processor.onaudioprocess = function(e){
    //获取输入和输出的数据缓冲区
    var input = e.inputBuffer.getChannelData(0);
    var output = e.outputBuffer.getChannelData(0);

    //将输入数缓冲复制到输出缓冲上
    for(var i = 0, len = input.length; i < len; i++){
        output[i] = input[i];
    }
}

```

<p>这样处理的原因是因为多个输入要对应对个输出，也有可能是多对一或者一对多，所以这些信息的设定必须要人为去控制。</p>
<p>关于 ScriptProcessorNode 的介绍，具体请移步<a href="http://www.w3.org/TR/webaudio/#ScriptProcessorNode-section" target="_blank">http://www.w3.org/TR/webaudio/#ScriptProcessorNode-section</a></p>
<h4>2. AnalyserNode</h4>
<p>通过这个节点我们可以对信号进行频域和时域上的分析，学过 通信原理 的同学对这些属于应该是十分熟悉的。</p>

```
interface AnalyserNode : AudioNode {

    // Real-time frequency-domain data 
    void getFloatFrequencyData(Float32Array array);
    void getByteFrequencyData(Uint8Array array);

    // Real-time waveform data 
    void getByteTimeDomainData(Uint8Array array);

    attribute unsigned long fftSize;
    readonly attribute unsigned long frequencyBinCount;

    attribute double minDecibels;
    attribute double maxDecibels;

    attribute double smoothingTimeConstant;

};

```

<p>上面是这个节点的接口信息，不要感到奇怪，对接口的描述，都是使用这种方式，从上面我们可以看到，他有三个方法，四个属性。fftSize 是指频率分析下的快速傅里叶变换大小，他的值被限定在 32-2048 的 2 的整数次方。</p>
<p>关于 AnalyserNode 的介绍，具体请移步<a href="http://www.w3.org/TR/webaudio/#AnalyserNode-section" target="_blank">http://www.w3.org/TR/webaudio/#AnalyserNode-section</a></p>
<h3>三、音频信息的提取</h3>
<p>利用上面介绍的两个节点可以十分轻松的提取到音频信息，如使用 ScriptProcessorNode，在他的 onaudioprocess 触发的时候，可以拿到 input 信息，此时也就是音频信息流。</p>

```
processor.onaudioprocess = function(e){
    //获取输入和输出的数据缓冲区
    var input = e.inputBuffer.getChannelData(0);

    doSomething(input);
};

```

<p>上面这种方式拿到数据的效率是比较低的，一般可以直接使用 AnalyserNode 节点。这个节点中一个获取缓冲数据区的方法叫做 getByteTimeDomainData，这个方法的设计是十分偏底层的，或者对 JSer 来说，这个借口的设计并不合理，可以看看：</p>

```
//以fftSize为长度创建一个字节数组作为数据缓冲区
var output = new Uint8Array(analyser.fftSize);
// 将获取得到的数据赋值给 output
analyser.getByteTimeDomainData(output);

```

<p>这里是把 output 作为引用传进 getByteTimeDomainData 函数中，相信大家应该没有在 JS 中遇到过这样的写法吧~ （我觉得在该 web 标准定稿的时候，这里一定会做修改！）</p>
<h3>四、信号图的绘制</h3>
<p>上面我们已经拿到了信号数据了，绘制工作其实就是 canvas 的事情啦~</p>

```
var width = canvas.width,
    height = canvas.height,
    g = canvas.getContext("2d");

// 将坐标原点移动到(0.5, height / 2 + 0.5)的位置
g.translate(0.5, height / 2 + 0.5);

```

<p>然后绘制图形：</p>

```
processor.onaudioprocess=function(e){
    //获取输入和输出的数据缓冲区
    var input = e.inputBuffer.getChannelData(0);
    var output = e.outputBuffer.getChannelData(0);
    //将输入数缓冲复制到输出缓冲上
    for(var i=0; i
<p>下面是整个 DEMO 的代码，效果预览：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2014/02/22/222051302848233.jpg" data-source="http://images.cnitblog.com/blog/387325/201402/222051302848233.jpg" alt=""></p>
<p>代码：</p>

```

<canvas id="canvas" width="400" height="100"></canvas>
<audio id="audio" autoplay src="http://qianduannotes.duapp.com/file/tankWar.mp3"></audio>
<br>
<input type="button" onclick="audio.play()" value="播放">
<input type="button" onclick="audio.pause()" value="暂停">
<script>
var AudioContext=AudioContext||webkitAudioContext;
var context=new AudioContext;
//从元素创建媒体节点
var media=context.createMediaElementSource(audio);
//创建脚本处理节点
var processor=context.createScriptProcessor(4096,1,1);
//Canvas初始化
var width=canvas.width,height=canvas.height;
var g=canvas.getContext("2d");
g.translate(0.5,height/2+0.5);
//连接：媒体节点→控制节点→输出源
media.connect(processor);
processor.connect(context.destination);
//控制节点的过程处理
processor.onaudioprocess=function(e){
  //获取输入和输出的数据缓冲区
  var input=e.inputBuffer.getChannelData(0);
  var output=e.outputBuffer.getChannelData(0);
  //将输入数缓冲复制到输出缓冲上
  for(var i=0;i<input.length;i++)output[i]=input[i];
  //将缓冲区的数据绘制到Canvas上
  g.clearRect(-0.5,-height/2-0.5,width,height);
  g.beginPath();
  for(var i=0;i<width;i++)
    g.lineTo(i,height/2*output[output.length*i/width|0]);
  g.stroke();
};
</script>

DEMO
```

<p>该段代码引自次碳酸钴的<a href="http://www.web-tinker.com/article/20498.html" target="_blank">博客</a>。</p>
<h3>五、小结</h3>
<p>本文着重讲述了 AudioContext 内部节点之间的交互原理，以及如何使用节点获取数据，关于图形的绘制是 canvas 的操作，不是本系列文章的重点，所以一笔带过。</p>
<p>如果文中有叙述不正确的地方，还请斧正！</p>
<h3>六、参考资料</h3>
<ul>
<li><a href="http://www.w3.org/TR/webaudio/" target="_blank">http://www.w3.org/TR/webaudio/</a> W3C Group</li>
<li><a href="http://www.web-tinker.com/" target="_blank">http://www.web-tinker.com/</a> 次碳酸钴</li>
</ul>

