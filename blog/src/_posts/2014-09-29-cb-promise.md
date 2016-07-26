---
title: 细嗅Promise
categories:
  - JavaScript
  - 前端杂烩
tags:
  - tech
  - cnblogs
  - 异步
  - Promise
mark: hot
date: 2014-09-29 08:39:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2014/09/29/promise.html" target="_blank">博客园</a>.</div>

<p id="_1">读完这篇文章，预计会消耗你 40 分钟的时间。<a class="headeranchor-link" name="user-content-_1" href="#_1"></a></p>
<p>Ajax 出现的时候，刮来了一阵异步之风，现在 Nodejs 火爆，又一阵异步狂风刮了过来。需求是越来越苛刻，用户对性能的要求也是越来越高，随之而来的是页面异步操作指数般增长，如果不能恰当的控制代码逻辑，我们就会陷入无穷的回调地狱中。</p>
<p>ECMAScript 6 已经将异步操作纳入了规范，现代浏览器也内置了 Promise 对象供我们进行异步编程，那么此刻，还在等啥？赶紧学习学习 Promise 的内部原理吧！</p>
<h3 id="promise_1"><a class="headeranchor-link" name="user-content-promise_1" href="#promise_1"></a>第一章 了解 Promise</h3>
<h4 id="_2"><a class="headeranchor-link" name="user-content-_2" href="#_2"></a>一、场景再现</h4>
<p>由于 javascript 的单线程性质，我们必须等待上一个事件执行完成才能处理下一步，如下：</p>

```
// DOM ready之后执行
$(document).ready(function(){
    // 获取模板
    $.get(url, function(tpl){
        // 获取数据
        $.get(url2, function(data){
            // 构建 DOMString
            makeHtml(tpl, data, function(str){
                // 插入到 DOM 中
                $(obj).html(str);
            });
        });
    });
});

```

<p>为了减少首屏数据的加载，我们将一些模板和所有数据都放在服务器端，当用户操作某个按钮时，需要将模板和数据拼接起来插入到 DOM 中，这个过程还必须在 DOMReady 之后才能执行。这种情况是十分常见的，如果异步操作再多一些，整个代码的缩进让人看着很不舒服，为了优雅地处理这个问题，ECMAScript 6 引入了 Promise 的概念，目前一些现代浏览器已经支持这些新东西了！</p>
<h4 id="_3"><a class="headeranchor-link" name="user-content-_3" href="#_3"></a>二、模型</h4>
<p>为了让代码流程更加清晰，我们假想着能够按照下面的流程来跑程序：</p>

```
new Promise(ready).then(getTpl).then(getData).then(makeHtml).resolve();

```

<p>先将要事务按照执行顺序依次 push 到事务队列中，push 完了之后再通过 resolve 函数启动整个流程。</p>
<p>整个流程的操作模型如下：</p>

```
promise(ok).then(ok_1).then(ok_2).then(ok_3).reslove(value)------+
         |         |          |          |                       |
         |         |          |          |        +=======+      |
         |         |          |          |        |       |      |
         |         |          |          |        |       |      |
         +---------|----------|----------|--------→  ok() ←------+
                   |          |          |        |   ↓   |
                   |          |          |        |   ↓   |
                   +----------|----------|--------→ ok_1()|
                              |          |        |   ↓   |
                              |          |        |   ↓   |
                              +----------|--------→ ok_2()|
                                         |        |   ↓   |
                                         |        |   ↓   |
                                         +--------→ ok_3()-----+
                                                  |       |    |
                                                  |       |    ↓
@ Created By Barret Lee                           +=======+   exit

```

<p>在 resolve 之前，promise 的每一个 then 都会将回调函数压入队列，resolve 后，将 resolve 的值送给队列的第一个函数，第一个函数执行完毕后，将执行结果再送入下一个函数，依次执行完队列。一连串下来，一气呵成，没有丝毫间断。</p>
<h4 id="_4"><a class="headeranchor-link" name="user-content-_4" href="#_4"></a>三、简单的封装</h4>
<p>如果了解 Promise，可以移步下方，看看对 Promise 的封装：</p>
<p>Github: <a href="//github.com/barretlee/myPromise" target="_blank">//github.com/barretlee/myPromise</a>DEMO: <a href="http://barretlee.github.io/myPromise/index.html" target="_blank">http://barretlee.github.io/myPromise/index.html</a></p>
<p>如果还不是很了解，可以往下阅读全文，了解一二。</p>
<h3 id="promise_2"><a class="headeranchor-link" name="user-content-promise_2" href="#promise_2"></a>第二章 Promise 原理</h3>
<h4 id="promise_3"><a class="headeranchor-link" name="user-content-promise_3" href="#promise_3"></a>一、什么是 Promise ？</h4>
<p>那么，什么是 Promise ？</p>
<p>Promise 可以简单理解为一个事务，这个事务存在三种状态：</p>
<ol>
<li>已经完成了 resolved</li>
<li>因为某种原因被中断了 rejected</li>
<li>还在等待上一个事务结束 pending</li>

</ol>
<p>上文中我们举了一个栗子，获取模板和数据之后再将拼合的数据插入到 DOM 中，这里我们将整个程序分解成多个事务：</p>

```
事务一：     获取模板
               ↓
事务二：     获取数据
               ↓
事务三： 拼合之后插入到 DOM

```

<p>在事务一结束之前，也就是模板代码从服务器拉取过来之前，事务二和事务三都处于 pending 状态，他们必须等待上一个事务结束。而事务一结束之后会将自身状态标记为 resolved，并把该事务中处理的结果移交给事务二继续处理（当然，这里如果没有数据返回，事务二就不会获得上一个事务的数据），依次类推，直到最后一个事务操作结束。</p>
<p>在事务操作的过程中，若遇到错误，比如事务一获取数据存在跨域问题，那事务就会操作失败，此时它会将自身的状态标记为 rejected，由于后续事务都是承接前一事务的，前一事务已经宣告工程已经玩不成了，那么后续的所有事务都会将自己标记为 rejected，其标记理由（reason）就是出错事务的报错信息（这个报错信息可以使用 try...catch 来捕获，也可以通过程序自身来捕获，如 ajax 的 onerror 事件、ajax 返回的状态码为 404 等）。</p>
<p><strong>小结：Promise 就是一个事务的管理器。他的作用就是将各种内嵌回调的事务用流水形式表达，其目的是为了简化编程，让代码逻辑更加清晰。</strong></p>
<p>由于整个程序的实现比较难理解，对于 Promise，我们将分为两部分阐述：</p>
<ul>
<li>无错误传递的 Promise，也就是事务不会因为任何原因中断，事务队列中的事项都会被依次处理，此过程中 Promise 只有 pending 和 resolved 两种状态，没有 rejected 状态。</li>
<li>包含错误的 Promise，每个事务的处理都必须使用容错机制来获取结果，一旦出错，就会将错误信息传递给下一个事务，如果错误信息会影响下一个事务，则下一个事务也会 rejected，如果不会，下一个事务可以正常执行，依次类推。</li>
</ul>
<h4 id="promise-promise"><a class="headeranchor-link" name="user-content-promise-promise" href="#promise-promise"></a>二、无错误传递的 Promise（简化版的 Promise）</h4>
<p>首先，我们需要用一个变量（status）来标记事务的状态，然后将事务（affair）也保存到 Promise 对象中。</p>

```
var Promise = function(affair){
    this.state = "pending";
    this.affair = affair || function(o) { return o; };
    this.allAffairs = [];
};

```

<p>Promise 有两个重要的方法，一个是 then，另一个是 resolve：</p>
<ul>
<li>then，将事务添加到事务队列（allAffairs）中</li>
<li>resolve，开启流程，让整个操作从第一个事务开始执行</li>
</ul>
<p>在操作事务之前，我们会先把各种事务依次放入事务队列中，这里会用到 then 方法：</p>

```
Promise.prototype.then = function (nextAffair){
    var promise = new Promise();
    if (this.state == "resloved"){
        // 如果当前状态是已完成，则这个事务将会被立即执行
        return this._fire(promise, nextAffair);
    }else{
        // 否则将会被加入队列中
        return this._push(promise, nextAffair);
    }
};

```

<p>如果整个操作已经完成了，那 then 方法送进的事务会被立即执行，</p>

```
Promise.prototype._fire = function (nextPromise, nextAffair){
    var nextResult = nextAffair(this.result);
    if (nextResult instanceof Promise){
        nextResult.then(function(obj){
            nextPromise.resolve(obj);
        });
    }else{
        nextPromise.resolve(nextResult);
    }
    return nextPromise;
};

```

<pre><span>被立即执行之后会返回一个结果，这个结果会被传递到下一个事务中作为原料，但是这里需要考虑两种情况：</span></pre>
<ol>
<li>异步，如果这个结果也是一个 Promise，则需要等待这个 Promise 执行完毕再将最终的结果传到下一个事务中。</li>
<li>同步，如果这个结果不是 Promise，则直接将结果传递给下一个事务。</li>
</ol>
<p>第一种情况还是比较常见的，比如我们在一个事务中有一个子事务队列需要处理，此时必须等待子事务完成才能回到主事务队列中。</p>

```
Promise.prototype.resolve = function (obj){
    if (this.state != "pending") {
        throw "流程已完成，不能再次开启流程！";
    }
    this.state = "resloved";
    // 执行该事务，并将执行结果寄存到 Promise 管理器上
    this.result = this.affair(obj);
    for (var i = 0, len = this.allAffairs.length; i < len; ++i){
        // 往后执行事务
        var affair = this.allAffairs[i];
        this._fire(affair.promise, affair.affair);
    }
    return this;
};

```

<p>resolve 接受一个参数，这个数据是交给第一个事务来处理的，因为第一个事务的启动可能需要点原料，这个数据就是原料，它也可以是空。该事物处理完毕之后，将操作结果（result）寄存在 Promise 对象上，方便引用，然后将结果（result）作为原料送入下一个事务。依次类推。</p>
<p>我们看到 then 方法中还调用了一个 _push ，这个方法的作用是将事务推进事务管理器（Promise）。</p>

```
Promise.prototype._push = function (nextPromise, nextAffair){
    this.allAffairs.push({
        promise: nextPromise,
        affair: nextAffair
    });
    return nextPromise;
};

```

<p>以上操作，我们就实现了一个简单的事务管理器，可以测试下下面的代码：</p>

```
// 初始化事务管理器
var promise = new Promise(function(data){
    console.log(data);
    return 1;
});
// 添加事务
promise.then(function(data){
    console.log(data);
    return 2;
}).then(function(data){
    console.log(data);
    return 3;
}).then(function(data){
    console.log(data);
    console.log("end");
});
// 启动事务
promise.resolve("start");

```

<p>可以看到依次输出的结果为：</p>

```
> start
> 1
> 2
> 3
> end

```

<p>由于上述实现十分简陋，链式调用没做太好的处理，请读者自行完善：）</p>
<p>下面是一个异步操作演示：</p>

```
var promise = new Promise(function(data){
    console.log(data);
    return "end";
});
promise.then(function(data){
    // 这里需要返回一个 Promise，让主事务切换到子事务处理
    return (function(data){
        // 创建一个子事务
        var promise = new Promise();
        setTimeout(function(){
            console.log(data);
            // 一秒之后才启动子事务，模拟异步延时
            promise.resolve();
        }, 1000);
        return promise;
    })(data);
});
promise.resolve("start");

```

<pre><span>可以看到依次输出的结果为：</span></pre>

```
> start
> end （1s之后输出）

```

<p>将函数写的稍微好看点：</p>

```
function delay(data){
    // 创建一个子事务
    var promise = new Promise();
    setTimeout(function(){
        console.log(data);
        // 一秒之后才启动子事务，模拟异步延时
        promise.resolve();
    }, 1000);
    return promise;
}
// 主事务
var promise = new Promise(function(data){
    console.log(data);
    return "end";
});
promise.then(delay);
promise.resolve("start");

```

<h4><span>三、包含错误传递的 Promise</span></h4>
<p>真的很羡慕你能看到这么详细的文章，当然，后面会更加精彩！</p>
<p>没有错误处理的 Promise 只能算是一个半成品，虽说可以通过在最外层加一个 try..catch 来捕获错误，但没法具体定位是哪个事务发生的错误。并且这里的错误不仅仅包含 JavaScript Error，还有诸如 ajax 返回的 data code 不是 200 的情况等。</p>
<p>先看一个浏览器内置 Promise 的实例（该代码可在现代浏览器下运行）：</p>

```
new Promise(function(resolve, reject){
    resolve("start");
}).then(function(data){
    console.log(data);
    throw "error";
}).catch(function(err){
    console.log(err);
    return "end";
}).then(function(data){
    console.log(data)
});

```

<pre><span>Promise 的回调和 then 方法都是接受两个参数：</span></pre>

```
new Promise(function(resolve, reject){
    // ...
});

promise.then(
    function(value){/* code here */},
    function(reason){/* code here */}
);

```

<p>事务处理过程中，如果有值返回，则作为 value，传入到 resolve 函数中，若有错误产生，则作为 reason 传入到 reject 函数中处理。</p>
<p>在初始化 Promise 对象时，若传入的回调中没有执行 resolve 或者 reject，这需要我们主动去启动事务队列。</p>

```
promise.resolve();
promise.reject();

```

<p>上面两种都是可以启动一个队列的。这里跟第二章第二节的 resolve 函数用法类似。Promise 对象还提供了 catch 函数，起用法等价于下面所示：</p>

```
promise.catch();
// 等价于
promise.then(null, function(reason){});

```

<p>还有两个 API：</p>

```
promise.all();
promise.race();

```

<p>后续再讲。先看看这个有错误处理的 Promise 是如何实现的。</p>

```
function Promise(resolver){
    this.status = "pending";
    this.value = null;
    this.handlers = [];
    this._doPromise.call(this, resolver);
}

```

<p>_doPromise 方法在实例化 Promise 函数时就执行。如果送入的回调函数 resolver 中已经 resolve 或者 reject 了，程序就已经启动了，所以在实例化的时候就开始判断。</p>

```
_doPromise: function(resolver){
    var called = false, self = this;
    try{
        resolver(function(value){
            // 如果没有 call 则继续，并标记 called 为 true
            !called && (called = !0, self.resolve(value));
        }, function(reason){
            // 同上
            !called && (called = !0, self.reject(reason));
        });
    } catch(e) {
        // 同上，捕获错误，传递错误到下一个 then 事务
        !called && (called = !0, self.reject(e));
    }
},

```

<p>只要 resolve 或者 reject 就会标记程序 called 为 true，表示程序已经启动了。</p>

```
resolve: function(value) {
    try{
        if(this === value){
            throw new TypeError("流程已完成，不能再次开启流程！");
        } else {
            // 如果还有子事务队列，继续执行
            value && value.then && this._doPromise(value.then);
        }
        // 执行完了之后标记为完成
        this.status = "fulfilled";
        this.value = value;
        this._dequeue();
    } catch(e) {
        this.reject(e);
    }
},
reject: function(reason) {
    // 标记状态为出错
    this.status = "rejected";
    this.value = reason;
    this._dequeue();
},

```

<p>可以看到，每次 resolve 的时候都会用一个 try..catch 包裹来捕获未知错误。</p>

```
_dequeue: function(){
    var handler;
    // 执行事务，直到队列为空
    while (this.handlers.length) {
        handler = this.handlers.shift();
        this._handle(handler.thenPromise, handler.onFulfilled, handler.onRejected);
    }
},

```

<p>无论是 resolve 还是 reject 都会让程序往后奔流，直到结束所有事务，所以这两个方法中都有 _dequeue 函数。</p>

```
_handle: function(thenPromise, onFulfilled, onRejected){
    var self = this;

    setTimeout(function() {
        // 判断下次操作采用哪个函数，reject 还是 resolve
        var callback = self.status == "fulfilled"
                       ? onFulfilled
                       : onRejected;
        // 只有是函数才会继续回调
        if (typeof callback === "function") {
            try {
                self.resolve.call(thenPromise, callback(self.value));
            } catch(e) {
                self.reject.call(thenPromise, e);
            }
            return;
        }
        // 否则就将 value 传递给下一个事务了
        self.status == "fulfilled"
                        ? self.resolve.call(thenPromise, self.value)
                        : self.reject.call(thenPromise, self.value);
    }, 1);
},

```

<p>这个函数跟上一节提到的 _fire 类似，如果 callback 是 function，就会进入子事务队列，处理完了之后退回到主事务队列。最后一个 then 方法，将事务推进队列。</p>

```
then: function(onFulfilled, onRejected){
    var thenPromise = new Promise(function() {});

    if (this.status == "pending") {
        this.handlers.push({
            thenPromise: thenPromise,
            onFulfilled: onFulfilled,
            onRejected: onRejected
        });
    } else {
        this._handle(thenPromise, onFulfilled, onRejected);
    }

    return thenPromise;
}

```

<p>如果第二节没有理解清楚，这一节也会让人头疼，这一部分讲的比较粗糙。</p>
<h3 id="_5"><a class="headeranchor-link" name="user-content-_5" href="#_5"></a>第三章 异步编程</h3>
<h4 id="jquery-defferred"><a class="headeranchor-link" name="user-content-jquery-defferred" href="#jquery-defferred"></a>一、jQuery 中的 Defferred 对象</h4>
<p>或许你在面试的时候，有面试官问你：</p>
<blockquote>
<p><code>$.ajax()</code> 执行后返回的结果是什么？</p>
</blockquote>
<p>在 jQuery1.5 版本就已经引入了 Defferred 对象，当时为了引入这个东西，整个 jQuery 都被重构了。Defferred 跟 Promise 类似，它表示一个还未完成任务的对象，而 Promise 确切的说，是一个代表未知值的对象。</p>

```
$.ajax({
    url: url
}).done(function(data, status, xhr){
    //...
}).fail(function(){
    //...
});

```

<p>回忆下第二章第一节中的 Promise，是不是如出一辙，只是 jQuery 还提供了更多的语法糖：</p>

```
$.ajax({
    url: url,
    success: function(data){
        //...
    },
    error: funtion(){
        //...
    }
});

```

<p>他允许将 done 和 fail 两个函数的回调放在 ajax 初始化的参数 success 和 fail 上，其原理还是一样的，同样，还有这样的东西：</p>

```
$.when(taskOne, taskTwo).done(function () {
    console.log("都执行完毕后才会输出我！");
}).fail(function(){
    console.log("只要有一个失败，就会输出我！")
});

```

<p><span>当 taskOne 和 taskTwo 都完成之后才执行 done 回调，这个浏览器内置的 Promise 也有对应的函数：</span></p>

```
Promise.all([true, Promise.resolve(1), ...]).then(function(value){
    //....
});

```

<p>浏览器内置的 Promise 还提供了一个 API：</p>

```
Promise.race([true, Promise.resolve(1), ...]).then(function(value){
    //....
}, function(reason){
    //...
});

```

<p>只要 race 参数中有一个 resolve 或者 reject，then 回调就会出发。</p>
<h4 id="_6"><a class="headeranchor-link" name="user-content-_6" href="#_6"></a>二、基于事件响应的异步模型</h4>
<p><a href="http://weibo.com/shyvo">@朴灵</a> 写的 <a href="//github.com/JacksonTian/eventproxy">EventProxy</a> 就是基于事件响应的异步模型，按理说，这个实现的逻辑是最清晰的，不过代码量稍微多一点。</p>

```
function taskA(){
    setTimeout(function(){
        var result = "A";
        E.emit("taskA", result);
    }, 1000);
}

function taskB(){
    setTimeout(function(){
        var result = "B";
        E.emit("taskB", result);
    }, 1000);
}

E.all(["taskA", "taskB"], function(A, B){
    return A + B;
});

```

<p>我没有看他的源码，但是想想，应该是这个逻辑。只需要在消息中心管理各个 emit 以及消息注册。这里的错误处理值得思考下。</p>
<p>在半年前，也写过一篇关于异步编程的文章：<a href="http://www.cnblogs.com/hustskyking/p/javascript-asynchronous-programming.html">JavaScript异步编程原理</a>，感兴趣的可以去读一读。</p>
<h3 id="_7"><a class="headeranchor-link" name="user-content-_7" href="#_7"></a>第四章 小结</h3>
<h4 id="_8"><a class="headeranchor-link" name="user-content-_8" href="#_8"></a>一、小结</h4>
<p>文章比较长，阅读了好几天别人写的东西，自己提笔还是比较轻松的，本文大概花费了 6 个小时撰写。</p>
<p>本文主要解说了 Promise 的应用场景和实现原理，如果你能够顺畅的读完全文并且之处文中的一些错误，说明你已经悟到了：）</p>
<p>Promise 使用起来不难，但是理解其原理还是有点偏头痛的，所以下面列举的几篇相关阅读也建议读者点进去看看。</p>
<h4 id="_9"><a class="headeranchor-link" name="user-content-_9" href="#_9"></a>二、相关阅读</h4>
<ul>
<li><a href="http://www.html5rocks.com/zh/tutorials/es6/promises/">JavaScript Promises</a></li>
<li><a href="http://mweb.baidu.com/p/promise-introduction.html">Promise 初探</a></li>
<li><a href="http://mweb.baidu.com/p/javascript-async-0.html">JavaScript中的异步梳理（0）</a></li>
<li><a href="http://mweb.baidu.com/p/javascript-async-2-promises-a.html">JavaScript中的异步梳理（2）&mdash;&mdash;使用Promises/A</a></li>
<li><a href="http://www.web-tinker.com/article/20154.html">jQuery的Deferred对象</a></li>
<li><a href="http://blog.qivhou.com/translation/2013/08/20/promise-deferred-objects-in-javascript-pt2-practical-use/">JavaScript中的Promise和Deferred对象 第二部分：实战</a></li>
<li><a href="//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">MDN</a></li>
<li><a href="http://www.cnblogs.com/hustskyking/p/javascript-asynchronous-programming.html">JavaScript异步编程原理</a></li>
</ul>

