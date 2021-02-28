---
title: 在线调试方案的思考与实践
categories:
  - 前端杂烩
tags:
  - tech
  - cnblogs
date: 2015-08-24 10:29:00
mark: hot
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2015/08/24/debug-suggest.html" target="_blank">博客园</a>.</div>

<p>本文的要点不在移动端调试上，移动端调试无非就是调试页面和调试工具之间存在分离，消除这种分离并创建连结就能解决移动端的调试问题。重点阐述的是所见即所得的调试模式下会遇到的阻碍。</p>
<p>当我们打开网页，发现一个模块没有正确地渲染或者空白时，如果控制台有报错，会直接根据报错定位到源码位置开始 debug；如果控制台没有报错，则会根据模块名或者模块特征的一个值，通过全局搜索找到这个模块的位置，然后在调试工具中断点，单步调试，找到问题所在，此时我们可能会这样做：</p>
<p><strong>情形一：</strong></p>
<p>小A同学打开控制台，发现断点调试不好写代码，于是将压缩的源码复制一份保存到本地，格式化，然后将线上资源通过代理工具代理到本地文件。</p>
<p><strong>情形二：</strong></p>
<p>小B同学早早的为自己配了一份本地开发环境，于是他遇到问题之后，直接去源码中定位错误位置，由于使用的是预处理语言，所以需要先打包编译之后再在本地预览效果。</p>
<p><strong>情形三：</strong></p>
<p>小C同学的调试方式是小A和小B的综合版本，将线上的资源代理到本地 build 目录文件，在 src 目录下修改之后编译打包到 build，然后预览。</p>
<h3 id="_2"><a class="headeranchor-link" name="user-content-_2" href="#_2"></a>代理调试的烦恼</h3>
<p>而对于比较复杂的线上环境，代理也会遇到很多障碍，比如：</p>
<p><strong>线上资源 combo</strong></p>
<p>出现错误的脚本地址为 <code>http://example.com/path/??a.js,b.js,c.js</code>，它对应着 <code>a.js</code>,<code>b.js</code>,<code>c.js</code> 三个脚本文件，如果我们使用 Fiddler/Charles 这样的经典代理工具调试代码，就必须给这些工具编写插件，或者在替换配置里头加一堆判断或者正则，成本高，门槛高。</p>
<p><strong>线上代码压缩</strong></p>
<p>打包压缩，这是上线之前的必经流程。由于我们在打包的环节中并没有考虑为代码添加 sourceMap，而线上之前对应 <code>index-min.js</code> 的 <code>index.js</code> 也因为安全方面的原因给干掉了，这给我们调试代码造成了极大的不便利。</p>
<p><strong>代码依赖较多，拉取代码问题</strong></p>
<p>很多时候，我们的页面依赖了多个 asserts 资源，而这些资源各自分布在多个仓库之中，甚至分布在不同的发布平台上，为了能够在源码上清晰的调试代码，我们不得不将所有的资源下载到本地，期间一旦存在下载代码的权限问题，整个调试进度就慢下来，这是十分不能忍受的事情。比如某系统构建的页面，页面上的模块都是以仓库为维度区分的，一个页面可能对应了5-50个仓库，下载代码实为麻烦。</p>
<p>最可怕的调试是，本地没有对应的测试环境、代理工具又不满足我们的需求，然后就只能，<code>编辑代码-&gt;打包压缩-&gt;提交代码-&gt;查看效果-&gt;编辑代码-&gt;...</code>，如果你的项目开发是这种模式，请停下来，思考调试优化方案，正所谓磨刀不误砍柴工。</p>
<h3 id="_3"><a class="headeranchor-link" name="user-content-_3" href="#_3"></a>开启懒人调试模式</h3>
<p>当看到线上出现问题（可能是其他同学负责页面的问题），脑中浮出这样的场景：</p>

```
  我："嘿，线上有问题啦！我要调试代码！"
电脑："好的，主人。请问是哪个页面？"（弹出浮层）
  我：浮层中输入URL。
电脑："请问是哪个地方出问题了？"
  我：（指着电脑）"模块A和模块B。"
电脑：正在下载A、B资源...正在将上线A、B映射到本地...自动打开A、B对应文件夹
  我：编辑代码，然后实时预览效果。

```

<p>在这里我们需要解决这样几个问题</p>
<ul>
<li>将页面对应的所有仓库/资源罗列在用户面前</li>
<li>下载资源的权限提示和权限处理</li>
<li>线上资源解 combo，然后映射到本地</li>
</ul>
<p>当然调试之后，可以还有一个操作：</p>

```
 我："哈，已经修复了，帮我提交代码~"
电脑：正在diff代码...收到确认提交信号，提交到预发环境...收到已经预览信号...正在发布代码...收到线上回归信号...流程结束

```

<p>除了 debug 代码，我们需要做的就只是用眼睛看效果是否 ok，整个流程优化下来，体验是很赞的！</p>
<h3 id="_4"><a class="headeranchor-link" name="user-content-_4" href="#_4"></a>解决代理遇到的问题</h3>
<p>上面我们提到了三个问题，平时开发遇到最头疼的一个是 combo，曾经我们页面上的代码加一个 <code>?_xxx</code> 参数就能够直接开始调试模式，那是因为程序的入口只有一个，而且所有脚本的依赖也打包到一个叫做 <code>deps.js</code> 文件中，加上调试参数之后，可以将原来 combo 加载的文件: <code>http://example.com/path/??a-min.js,b-min.js,c-min.js</code>，按照非 combo 的方式加载：</p>

```
http://example.com/path/a.js
http://example.com/path/b.js
http://example.com/path/c.js

```

<p>上面的代码可以轻松地代理到本地，但是有的系统生成的代码并没有 <code>deps.js</code> 文件，它是将脚本直接输出到页面上：</p>

```
<script src="http://example.com/path/??a-min.js,b-min.js,c-min.js"></script>

```

<p><strong>解决 combo 问题</strong></p>
<p>此时通过 Fiddler/Charles 工具比较难满足需求，对于这个问题有两个处理方案：</p>
<p><strong>1). 浏览器请求全部代理到本地的一个服务</strong></p>
<p>首先写一个本地服务：</p>

```
var http = require('http');
// npm i http-proxy --save
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});

var server = http.createServer(function(req, res) {
  console.log(req.url);
  if(req.url.indexOf("??") > -1){
    // combo资源让 3400 端口的服务处理
    proxy.web(req, res, { target: 'http://127.0.0.1:3400' });
  } else {
    // 直接返回
    proxy.web(req, res, { target: req.url });
  }
}).listen(3399, function(){
    console.log("在端口 3399 监听浏览器请求");
});

```

<p>代码的意思是，利用 http-proxy 这个 npm 包，代理浏览器的请求，浏览器上使用 switchSharp 设置本地代理为 <code>http://127.0.0.1:3399</code>，当请求过来，先判断 url，如果 url 中包含了 <code>??</code> 则将其作为 combo 资源处理，代理给本地的另一个服务 <code>http://127.0.0.1:3400</code>，这个服务收到请求后会将 combo 内容分解成多个，全部请求完之后再吐出来。</p>
<p><strong>2). 使用本地服务请求 html 代码，替换 html 代码内容</strong></p>
<p>使用强制手段（源码替换）将代码解 combo，比如源码页面为：</p>

```
<!-- html code -->
<script src="http://example.com/path/??a-min.js,b-min.js,c-min.js"></script>
<!-- html code -->

```

<p>使用本地服务请求这个url，然后转换成：</p>

```
<!-- html code -->
<script src="http://example.com/path/a.js"></script>
<script src="http://example.com/path/b.js"></script>
<script src="http://example.com/path/c.js"></script>
<!-- html code -->

```

<p>实现这个操作的代码：</p>

```
var http = require('http');
// npm i request --save;
var request = require('request');
http.createServer(function(req, res){
    var path = req.url.slice(req.url.indexOf("path=") + 5);
    console.log(path);
    if(!path) {
        res.write("path is empty");
        res.end();
        return;
    }
    request(path, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            // 代码替换
            body = body.replace('<script src="http://example.com/path/??a-min.js,b-min.js,c-min.js"></script>',
                '<script src="http://example.com/path/a.js"></script>\
                <script src="http://example.com/path/b.js"></script>\
                <script src="http://example.com/path/c.js"></script>'
            );
            res.write(body);
            res.end();
        }
    });
}).listen(3399, function(){
    console.log("listening on port 3399");
});

```

<p>比如请求 <code>http://127.0.0.1:3399/?path=http://www.taobao.com</code>，即可拿到淘宝首页的源码，然后对拿到的代码做替换。</p>
<p><strong>解决代码压缩问题</strong></p>
<p>对于这个问题，建议在线上放两份源码，一份是压缩源码，一份是未压缩源码，当页面 <code>url</code> 存在 <code>debug</code> 参数的时候，返回未压缩版本，正常返回压缩版本。当然，也可以采用上述方式处理问题。</p>
<p>不过，更合理的方式应该是 <code>sourceMap</code>，前端没有秘密，压缩代码只是增加了 hacker 的攻击成本，并不妨碍有能力的 hacker 借系统漏洞入侵。所以可以为源码提供一份 <a href="http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html">sourceMap 文件</a>。</p>

```
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('javascript', function() {
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
      //.pipe(xx())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

```

<p>关于 sourceMap 的 gulp 插件配置，详情可以<a href="//www.npmjs.com/package/gulp-sourcemaps">戳这里</a>。不仅仅是 JavaScript，CSS 也有 source maps，这个信息可以在 Chrome 控制台的设置选项中看到：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/08/24/242227387805954.png" data-source="http://images0.cnblogs.com/blog2015/387325/201508/242227387805954.png" alt=""></p>
<p><strong>代码的拉取</strong></p>
<p>如果一个项目只有你知道如何修改，那这个项目的技术设计就有点糟糕了，为了让众人都能处理你项目中的问题，一定要需要一个简洁的模式为开发者快速搭建测试环境，文档是一方面，如果有个一键操作的命令，那就更棒了！</p>

```
# 启动脚本
start: createFile getMod getPage

# 创建目录
createFile:
  @[ -d module ] || mkdir module
  @[ -d page ] || mkdir page

# 拉取模块仓库，这里有几十个，比较费时，请耐心等待...
getMod:
  cd module; \
  for i in $(MODS); do \
    [ -d $(MODPATH)$$i ] || git clone $(MODPATH)$$i; \
    git co -b master;\
    git co -b $(MODSV);
  done

# 拉取页面仓库，tbindex
getPage:
  cd page; \
  @[ -d tbindex ] || git clone $(PAGEPATH)$PAGE;

```

<p>上面是一个 <code>MakeFile</code> 的部分代码，作用是创建开发目录，拉取分支信息，然后开始服务器，打开浏览器，使用 IDE 打开目录，万事就绪，只等主人敲代码。</p>
<p>整个流程就一两分钟，完成开发之前所有的准备工作。这个脚本不仅仅是给自己使用，如果其他人也需要参与开发，一个命令就能让参与者进入开发模式，加上文档说明，省却了很多沟通成本。</p>
<h3 id="_5"><a class="headeranchor-link" name="user-content-_5" href="#_5"></a>在线调试实践(一个系统的调试工具)</h3>
<p>输入需要调试的页面URL（如 <a href="http://www.taobao.com">http://www.taobao.com</a>）：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/08/24/242227502024677.png" data-source="http://images0.cnblogs.com/blog2015/387325/201508/242227502024677.png" alt=""></p>
<p>插件会分析 DOM，遍历拿到页面所有被引用到的仓库：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2015/08/24/242227584832841.png" data-source="http://images0.cnblogs.com/blog2015/387325/201508/242227584832841.png" alt=""></p>
<p>选择需要调试的模块（颗粒度细分到了html/js/css），点击调试按钮，可以看到调试页面的资源都会引用本地下载的文件。</p>
<h3 id="_6"><a class="headeranchor-link" name="user-content-_6" href="#_6"></a>小结</h3>
<p>优化流程、优化架构是我们矢志不渝坚持的方向，本文主要阐述，编辑代码到调试线上效果的过程，提出了解决 combo 和代码压缩等问题的方案和建议。希望可以给不擅长代理调试的同学一点启示。</p>

