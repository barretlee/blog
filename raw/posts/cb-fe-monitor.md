---
title: 前端代码异常日志收集与监控
categories:
  - JavaScript
  - 前端杂烩
  - 网络交互
tags:
  - tech
  - cnblogs
mark: hot
date: 2015-08-20 12:20:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2015/08/20/fe-monitor.html" target="_blank">博客园</a>.</div>

<p>在复杂的网络环境和浏览器环境下，自测、QA测试以及 Code Review 都是不够的，如果对页面稳定性和准确性要求较高，就必须有一套完善的代码异常监控体系，本文从前端代码异常监控的方法和问题着手，尽量全面地阐述错误日志收集各个阶段中可能遇到的阻碍和处理方案。</p>
<h3 id="_2"><a class="headeranchor-link" name="user-content-_2" href="#_2"></a>收集日志的方法</h3>
<p>平时收集日志的手段，可以归类为两个方面，一个是逻辑中的错误判断，为主动判断；一个是利用语言给我们提供的捷径，暴力式获取错误信息，如 <code>try..catch</code> 和 <code>window.onerror</code>。</p>
<p><strong>1. 主动判断</strong></p>
<p>我们在一些运算之后，得到一个期望的结果，然而结果不是我们想要的</p>

```
// test.js
function calc(){
  // code...
  return val;
}
if(calc() !== "someVal"){
  Reporter.send({
    position: "test.js::<function>calc"
    msg: "calc error"
  });
}

```
</function>
<p>这种属于逻辑错误/状态错误的反馈，在接口 <code>status</code> 判断中用的比较多。</p>
<p><strong>2. <code>try..catch</code> 捕获</strong></p>
<p>判断一个代码段中存在的错误：</p>

```
try {
  init();
  // code...
} catch(e){
  Reporter.send(format(e));
}

```

<p>以 <code>init</code> 为程序的入口，代码中所有同步执行出现的错误都会被捕获，这种方式也可以很好的避免程序刚跑起来就挂。</p>
<p><strong>3. <code>window.onerror</code></strong></p>
<p>捕获全局错误：</p>

```
window.onerror = function() {
  var errInfo = format(arguments);
  Reporter.send(errInfo);
  return true;
};

```

<p>在上面的函数中返回 <code>return true</code>，错误便不会暴露到控制台中。下面是它的参数信息：</p>

```
/**
 * @param {String}  errorMessage   错误信息
 * @param {String}  scriptURI      出错的文件
 * @param {Long}    lineNumber     出错代码的行号
 * @param {Long}    columnNumber   出错代码的列号
 * @param {Object}  errorObj       错误的详细信息，Anything
 */
window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
    // code..
}

```

<p><code>window.onerror</code> 算是一种特别暴力的容错手段，<code>try..catch</code> 也是如此，他们底层的实现就是利用 C/C++ 中的 <code>goto</code> 语句实现，一旦发现错误，不管目前的堆栈有多深，不管代码运行到了何处，直接跑到顶层或者 <code>try..catch</code> 捕获的那一层，这种一脚踢开错误的处理方式并不是很好。</p>
<h3 id="_3"><a class="headeranchor-link" name="user-content-_3" href="#_3"></a>收集日志存在的问题</h3>
<p>收集日志的目的是为了及时发现问题，最好日志能够告诉我们，错误在哪里，更优秀的做法是，不仅告诉错误在哪里，还告诉我们，如何处理这个错误。终极目标是，发现错误，自动容错，这一步是最难的。</p>
<h4 id="1-script-error"><a class="headeranchor-link" name="user-content-1-script-error" href="#1-script-error"></a>1. 无具体报错信息，Script error.</h4>
<p>先看下面的例子，test.html</p>

```
<!-- http://barret/test.html -->
<script>
  window.onerror = function(){
    console.log(arguments);
  };
</script>
<script src="http://barret/test.js"></script>

```

<p>test.js</p>

```
// http://barret/test.js
function test(){
  ver a = 1;
  return a+1;
}
test();

```

<p>我们期望收集到的日志是下面这样具体的信息：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/08/20/200018292699298.png" data-source="http://images0.cnblogs.com/blog2015/387325/201508/200018292699298.png" alt=""></p>
<p>为了对资源进行更好的配置和管理，我们通常将静态资源放到异域上</p>

```
<!-- http://barret/test.html -->
<script>
  window.onerror = function(){
    console.log(arguments);
  };
</script>
<script src="http://localhost/test.js"></script>

```

<p>而拿到的结果却是：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/08/20/200018372534203.png" data-source="http://images0.cnblogs.com/blog2015/387325/201508/200018372534203.png" alt=""></p>
<p>翻开 Chromium 的 WebCore <a href="http://trac.webkit.org/browser/branches/chromium/1453/Source/WebCore/dom/ScriptExecutionContext.cpp#L293">源码</a>，可以看到：</p>
<p><a href="http://trac.webkit.org/browser/branches/chromium/1453/Source/WebCore/dom/ScriptExecutionContext.cpp#L293" target="_blank"><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/08/20/200018447228952.png" data-source="http://images0.cnblogs.com/blog2015/387325/201508/200018447228952.png" alt=""></a></p>
<p>跨域情况下，返回的结果是 <code>Script error.</code>。</p>

```
// http://trac.webkit.org/browser/branches/chromium/1453/Source/WebCore/dom/ScriptExecutionContext.cpp#L333
String message = errorMessage;
int line = lineNumber;
String sourceName = sourceURL;
// 已经拿到了所有的错误信息，但如果发现是非同源情况，`sanitizeScriptError` 中复写错误信息
sanitizeScriptError(message, line, sourceName, cachedScript);

```

<p><a href="http://trac.webkit.org/browser/branches/chromium/648/Source/WebCore/dom/ScriptExecutionContext.cpp?rev=77122#L301">旧版</a> 的 WebCore 中只判断了 <code>securityOrigin()-&gt;canRequest(targetURL)</code>，新版中还多了一个 <code>cachedScript</code> 的判断，可以看出浏览器对这方面的限制越来越严格。</p>
<p>在本地测试了下：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/08/20/200018530976144.png" data-source="http://images0.cnblogs.com/blog2015/387325/201508/200018530976144.png" alt=""></p>
<p>可见在 <code>file://</code> 协议下，<code>securityOrigin()-&gt;canRequest(targetURL)</code> 也是 <code>false</code>。</p>
<p><strong>为何<code>Script error.</code>?</strong></p>
<p>简单报错： <code>Script error</code>，目的是避免数据泄露到不安全的域中，一个简单的例子：</p>

```
<script src="bank.com/login.html"></script>

```

<p>上面我们并没有引入一个 js 文件，而是一个 html，这个 html 是银行的登录页面，如果你已经登录了 <code>bank.com</code>，那 login 页面就会自动跳转到 <code>Welcome xxx...</code>，如果未登录则跳转到 <code>Please Login...</code>，那么 JS 报错也会是 <code>Welcome xxx... is not defined</code>，<code>Please Login... is not defined</code>，通过这些信息可以判断一个用户是否登录他的银行帐号，给 hacker 提供了十分便利的判断渠道，这是相当不安全的。</p>
<p><strong><code>crossOrigin</code>参数跳过跨域限制</strong></p>
<p>image 和 script 标签都有 crossorigin 参数，它的作用就是告诉浏览器，我要加载一个外域的资源，并且我信任这个资源。</p>

```
<script src="http://localhost/test.js" crossorigin=""></script>

```

<p>然而，却报错了：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/08/20/200019005666192.png" data-source="http://images0.cnblogs.com/blog2015/387325/201508/200019005666192.png" alt=""></p>
<p>这是意料之中的错误，跨域资源共享策略要求，服务器也设置 <code>Access-Control-Allow-Origin</code> 的响应头：</p>

```
header('Access-Control-Allow-Origin: *');

```

<p>回头看看我们 CDN 的资源，</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/08/20/200019081911756.png" data-source="http://images0.cnblogs.com/blog2015/387325/201508/200019081911756.png" alt=""></p>
<p>Javascript/CSS/Image/Font/SWF 等这些静态资源其实都已经早早地加上了 CORS 响应头。</p>
<h4 id="2"><a class="headeranchor-link" name="user-content-2" href="#2"></a>2. 压缩代码无法定位到错误的具体位置</h4>
<p>线上的代码几乎都是经过打包压缩的，几十上百的文件压缩后打包成一个，而且只有一行。当我们收到 <code>a is not defined</code> 的时候，如果只在特定场景下才报错，我们根本无法定位到这个被压缩的 <code>a</code> 是个什么东西，那么此时的错误日志就是无效的。</p>
<p>第一个想到的办法是利用 sourceMap，利用它可以定位到压缩代码某一点在未压缩代码的具体位置。下面是 sourceMap 引入的格式，在代码的最后一行加入：</p>

```
//# sourceMappingURL=index.js.map

```

<p>以前使用的是 "//@" 作为开头，现在使用 "//#"，然而对于错误上报，这玩意儿没啥用。JS 不能拿到他真实的行数，只能通过 Chrome DevTools 这样的工具辅助定位，而且并不是每个线上资源都会添加 sourceMap 文件。sourceMap 的用途目前还只能体现在开发阶段。</p>
<p>当然，如果理解了 sourceMap 的 VLQ编码和位置对应关系，也可以将拿到的日志进行二次解析，映射到真实路径位置，这个成本比较高，貌似暂时也没人尝试过。</p>
<p>那么，有什么办法，可以定位错误的具体位置，或者说有什么办法可以缩小我们定位问题的难度呢？</p>
<p>可以这样考虑：打包的时候，在每两个合并的文件之间加上 1000 个空行，最后上线的文件就会变成</p>

```
(function(){var longCode.....})(); // file 1

// 1000 个空行

(function(){var longCode.....})(); // file 2

// 1000 个空行

(function(){var longCode.....})(); // file 3

// 1000 个空行

(function(){var longCode.....})(); // file 4

var _fileConfig = ['file 1', 'file 2', 'file 3', 'file 4']

```

<p>如果报错在第 3001 行，</p>

```
window.onerror = function(msg, url, line, col, error){
  // line = 3001
  var lineNum = line;
  console.log("错误位置：" + _fileConfig[parseInt(lineNum / 1000) - 1]);
  // -> "错误位置：file 3"
};

```

<p>可以计算出，错误出现在第三个文件中，范围就缩小了很多。</p>
<h4 id="3-error"><a class="headeranchor-link" name="user-content-3-error" href="#3-error"></a>3. error 事件的注册</h4>
<p>多次注册 error 事件，不会重复执行多个回调：</p>

```
var fn = window.onerror = function() {
  console.log(arguments);
};
window.addEventListener("error", fn);
window.addEventListener("error", fn);

```

<p>触发错误之后，上面代码的结果为：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/08/20/200019171131048.png" data-source="http://images0.cnblogs.com/blog2015/387325/201508/200019171131048.png" alt=""></p>
<p><code>window.onerror</code> 和 <code>addEventListener</code> 都执行了，并只执行了一次。</p>
<h4 id="4"><a class="headeranchor-link" name="user-content-4" href="#4"></a>4. 收集日志的量</h4>
<p>没有必要将所有的错误信息全部送到 Log 中，这个量太大了。如果网页 PV 有 1kw，那么一个必现错误发送的 log 信息将有 1kw 条，大约一个 G 的日志。我们可以给 <code>Reporter</code> 函数添加一个采样率：</p>

```
function needReport (sampling){
  // sampling: 0 - 1
  return Math.random() 
}
```

<p>这个采样率可以按需求来处理，可以同上，使用一个随机数，也可以使用 cookie 中的某个字段（如 nickname）的最后一个字母/数字来判定，也可以将用户的 nickname 进行 hash 计算，再通过最后一位的字母/数字来判断，总之，方法是很多的。</p>
<h3 id="_4"><a class="headeranchor-link" name="user-content-_4" href="#_4"></a>收集日志布点位置</h3>
<p>为了更加精准的拿到错误信息，有效地统计错误日志，我们应该更多地采用主动式埋点，比如在一个接口的请求中：</p>

```
// Module A Get Shops Data
$.ajax({
  url: URL,
  dataType: "jsonp",
  success: function(ret) {
    if(ret.status === "failed") {
      // 埋点 1
      return Reporter.send({
        category: "WARN",
        msg: "Module_A_GET_SHOPS_DATA_FAILED"
      });
    }
    if(!ret.data || !ret.data.length) {
      // 埋点 2
      return Reporter.send({
        category: "WARN",
        msg: "Module_A_GET_SHOPS_DATA_EMPTY"
      });
    }
  },
  error: function() {
    // 埋点 3
    Reporter.send({
      category: "ERROR",
      msg: "Module_A_GET_SHOPS_DATA_ERROR"
    });
  }
});

```

<p>上面我们精准地布下了三个点，描述十分清晰，这三个点会对我们后续排查线上问题提供十分有利的信息。</p>
<p><strong>关于 <code>try..catch</code> 的使用</strong></p>
<p>对于 <code>try..catch</code> 的使用，我的建议是：能不用，尽量不要用。JS代码都是自己写出来的，哪里会出现问题，会出现什么问题，心中应该都有个谱，平时用到 <code>try..catch</code> 的一般只有两个地方：</p>

```
// JSON 格式不对
try{
  JSON.parse(JSONString);
}catch(e){}

// 存在不可 decode 的字符
try{
  decodeComponentURI(string);
}catch(e){}

```

<p>类似这样的错误都是不太可控的。可以在使用到 <code>try..catch</code> 的地方思考是否可以使用其他方式做兼容。感谢 EtherDream 的<a href="http://www.cnblogs.com/hustskyking/p/fe-monitor.html#3253158">补充</a>。</p>
<p><strong>关于 <code>window.onerror</code> 的使用</strong></p>
<p>可以尝试如下代码：</p>

```
// test.js
throw new Error("SHOW ME");
window.onerror = function(){
  console.log(arguments);
  // 阻止在控制台中打印错误信息
  return true;
};

```

<span>上面的代码直接报错了，没有继续往下执行。页面中可能有好几个 script 标签，但是 </span><code>window.onerror</code><span> 这个错误监听一定要放到最前头！</span>
<h3 id="_5"><a class="headeranchor-link" name="user-content-_5" href="#_5"></a>错误的警报与提示</h3>
<p>什么时候该警报？不能有错就报。上面也说了，因为网络环境和浏览器环境因素，复杂页面我们允许千分之一的错误率。日志处理后的数据图：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/08/20/200019264726641.png" data-source="http://images0.cnblogs.com/blog2015/387325/201508/200019264726641.png" alt=""></p>
<p>图中有两根线，橙色线是今日的数据，浅蓝色线是往日平均数据，每隔 10 分钟产生一条记录，横坐标是 0-24 点的时间轴，纵坐标是错误量。可以很明显的看出，在凌晨一两点左右，服务出现了异常，错误信息是平均值的十几倍，那么这个时候就改报警了。</p>
<p>报警的条件可以设置得严苛一点，因为误报是件很烦人的事情，短信、邮件、软件等信息轰炸，有的时候还是大半夜。那么，一般满足如下条件可以报警：</p>
<ul>
<li>错误超过阈值，比如 10分钟最多允许 100 个错误，结果超过了 100</li>
<li>错误超过平均值的 10 倍，超过平均值就报警，这个逻辑显然不正确，但是超过了平均值的 10 倍，基本可以认定服务出问题了</li>
<li>在纳入对比之前，要过滤同 IP 出现的错误，比如一个错误出现在 for 循环或者 while 循环中，再比如一个用户在蹲点抢购，不停的刷新</li>
</ul>
<p><strong>友好的错误提示</strong></p>
<p>对比下面两条日志，catch 的错误日志：</p>
<blockquote>
<p>Uncaught ReferenceError: vd is not defined</p>
</blockquote>
<p>自定义的错误日志：</p>
<blockquote>
<p>"生日模块中获取后端接口信息时，eval 解析出错，错误内容为：vd is not defined."
该错误在最近 10 分钟内出现 1000 次，这个错误往日的平均出错量是 50 次 / 10 分钟</p>

</blockquote>
<h3 id="_6"><a class="headeranchor-link" name="user-content-_6" href="#_6"></a>网络错误日志工作草案</h3>
<p>W3C Web Performance工作组发布了网络错误日志工作草案。该文档定义了一个机制，允许Web站点声明一个网络错误汇报策略，浏览器等用户代理可以利用这一机制，汇报影响资源正确加载的网络错误。该文档还定义了一个错误报告的标准格式及其在浏览器和Web服务器之间的传输机制。</p>
<p>详细草案：<a href="http://www.w3.org/TR/2015/WD-network-error-logging-20150305/">http://www.w3.org/TR/2015/WD-network-error-logging-20150305/</a></p>
<h3 id="_7"><a class="headeranchor-link" name="user-content-_7" href="#_7"></a>小结</h3>
<p>功能、测试和监控是程序开发的三板斧，很多工程师可以将功能做的尽善尽美，也了解一些测试方面的知识，可是在监控这个方向上基本处于大脑空白。错误日志的收集、整理算是监控的一个小部分，但是它对我们了解网站稳定性至关重要。文中有忽略的地方希望读者可以补充，错误的地方还望斧正。</p>
<h3 id="_8"><a class="headeranchor-link" name="user-content-_8" href="#_8"></a>拓展阅读</h3>
<ul>
<li><a href="http://xbingoz.com/328.html">基于window.onerror事件 建立前端错误日志</a> by Dx. Yang</li>
<li><a href="http://www.aliued.cn/2012/10/27/%E6%9E%84%E5%BB%BAweb%E5%89%8D%E7%AB%AF%E5%BC%82%E5%B8%B8%E7%9B%91%E6%8E%A7%E7%B3%BB%E7%BB%9F-fdsafe.html">构建web前端异常监控系统–FdSafe</a> by 石破</li>
<li><a href="http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html">JavaScript Source Map 详解</a> by 阮一峰</li>
<li><a href="http://www.w3.org/TR/2010/WD-html5-20100624/webappapis.html#handler-window-onerror">HTML5标准-window.onerror</a></li>
<li><a href="http://msdn.microsoft.com/en-us/library/cc197053%28VS.85%29.aspx">MSDN-window.onerror</a></li>
<li><a href="//developer.mozilla.org/en/DOM/window.onerror">MDN-window.onerror</a></li>
<li><a href="http://www.w3.org/TR/2015/WD-network-error-logging-20150305/">网络错误日志</a></li>

</ul>

