---
title: JavaScript模板引擎原理，几行代码的事儿
categories:
  - JavaScript
  - 前端杂烩
tags:
  - tech
  - cnblogs
  - 模板引擎
warning: true
mark: hot
date: 2013-12-03 04:35:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/12/03/principle-of-javascript-template.html" target="_blank">博客园</a>.</div>

<h3>一、前言</h3>
<p>什么是模板引擎，说的简单点，就是一个字符串中有几个变量待定。比如：</p>

```
var tpl = 'Hei, my name is <%name%>, and I\'m <%age%> years old.';

```

<p>通过模板引擎函数把数据塞进去，</p>

```
var data = {
    "name": "Barret Lee",
    "age": "20"
};

var result = tplEngine(tpl, data);
//Hei, my name is Barret Lee, and I'm 20 years old.

```

<p>那这玩意儿有什么作用呢？其实他就是一个预处理器（preprocessor），搞php开发的童鞋对Smarty必然是十分熟悉，Smarty是一个php模板引擎，tpl中待处理的字符通过数据匹配然后输出相应的html代码，加之比较给力的缓存技术，其速度和易用性是非常给力的！JS Template也是一样的，我们的数据库里保存着数以千万计的数据，而每一条数据都是通过同一种方式输入，就拿上面的例子来说，我们不可能在数据库里存几千条"Hei, my name..."，而是只保存对应的name和age，通过模板输出结果。</p>
<p>JS模板引擎应该做哪些事情？看看下面一串代码：</p>

```
var tpl = '<% for(var i = 0; i < this.posts.length; i++) {' +　
    'var post = posts[i]; %>' +
    '<% if(!post.expert){ %>' +
        '<span>post is null</span>' +
    '<% } else { %>' +
        '<a href="#"><% post.expert %> at <% post.time %></a>' +
    '<% } %>' +
'<% } %>';
```

<p><span>一个基本的模板引擎至少可以保证上面的代码可以正常解析。如送入的数据是：</span></p>

```
var data = {
    "posts": [{
        "expert": "content 1",
        "time": "yesterday"
    },{
        "expert": "content 2",
        "time": "today"
    },{
        "expert": "content 3",
        "time": "tomorrow"
    },{
        "expert": "",
        "time": "eee"
    }]
};

```

<p>&nbsp;可以输出：</p>

```
<a href="#">content 1 at yesterday</a>
<a href="#">content 2 at today</a>
<a href="#">content 3 at tomorrow</a>
<span>post is null</span>

```

<p><span>先戳这个</span><a href="http://qianduannotes.duapp.com/demo/javascript-template.html" target="_blank">demo</a>看看<span>。</span>&nbsp;</p>
<p>下面就具体说说这个模板引擎的原理是啥样的。</p>


<h3>二、JS模板引擎的实现原理</h3>
<h4><strong>1.正则抠出要匹配的内容</strong></h4>
<p>针对这一串代码，通过正则获取内容</p>

```
var tpl = 'Hei, my name is <%name%>, and I\'m <%age%> years old.';
var data = {
    "name": "Barret Lee",
    "age": "20"
};

```

<p>&nbsp;最简单的方式就是通过replace函数了：</p>


```
var result = tpl.replace(/<%([^%>]+)?%>/g, function(s0, s1){
    return data[s1];
});

```

<p>&nbsp;通过正则替换，我们很轻松的拿到了result，你可以去试一试，他正式我们想要的结果。但是这里又有了一个问题，改一下data和tpl，</p>

```
var tpl = 'Hei, my name is <%name%>, and I\'m <%info.age%> years old.';
var data = {
    "name": "Barret Lee",
    "info": { age": "20"}
};

```

<p>&nbsp;再用上面的方式去获取结果，呵呵，不行了吧~ 这里data["info.age"]本身就是undefined，所以我们需要换一种方式来处理这个问题，那就是将它转换成真正的JS代码。如：</p>

```
return 'Hei, my name is ' + data.name + ', and I\'m ' + data.info.age' + ' years old.'

```

<p>&nbsp;但是接着又有一个问题来了，当我们的代码中出现for循环和if的时候，上面的转换明显是不起作用的，如：</p>

```
var tpl = 'Posts: ' +
          '<% for(var="" i="0;" <="" post.length;="" i++)="" {'+="" '<a="" href="#"><% post[i].expert="" %="">' +
          '<% }="" %="">'

```

<p>&nbsp;如果继续采用上面的方式，得到的结果便是：</p>

```
return 'Posts: ' +
       for(var i = 0; i < post.length; i++) { +
         '<a href="#">' + post[i].exper + '</a>' +
       }

```

<p>&nbsp;这显然不是我们愿意看到的，稍微观察一下上面的结构，如果可以返回一个这样的结果也挺不错哦：</p>

```
'Posts: '
for(var i = 0; i < post.length; i++) {
    '<a href="#">' + post[i].exper + '</a>'
}

```

<p>&nbsp;但是我们需要得到的是一个字符串，而不是上面这样零散的片段，因此可以把这些东西装入数组中。</p>
<h4>2.装入数组</h4>

```
var r = [];
r.push('Posts: ' );
r.push(for(var i = 0; i < post.length; i++) {);
r.push('<a href="#">');
r.push(post[i].exper);
r.push('</a>');
r.push(});

```

<p>&nbsp;有人看到上面的代码就要笑了，第三行和最后一行代码的逻辑明显是不正确的嘛，那肿么办呢？呵呵，很简单，不放进去就行了呗，</p>

```
var r = [];
r.push('Posts: ' );
for(var i = 0; i < post.length; i++) {
    r.push('<a href="#">');
    r.push(post[i].exper);
    r.push('</a>');
}

```

<p>&nbsp;这样的逻辑就十分完善了，不存在太多的漏洞，但是这个转化的过程是如何实现的？我们必须还是要写一个解析的模板函数出来。</p>
<h4>3.分辨js逻辑部分</h4>

```
var r = [];
tpl.replace(/<%([^%>]+)?%>/g, function(s0, s1){
    //完蛋了，这里貌似又要回到上面那可笑的逻辑有错误的一步啦... 该怎么处理比较好？
});

```

<p>&nbsp;完蛋了，这里貌似又要回到上面那可笑的逻辑有错误的一步啦... 该怎么处理比较好？我们知道，JS给我们提供了构造函数的\类"，</p>

```
var fn = new Function("data",
    "var r = []; for(var i in data){ r.push(data[i]); } return r.join(' ')");
fn({"name": "barretlee", "age": "20"}); // barretlee 20

```

<p>&nbsp;知道了这个就好办了，我们可以把逻辑部分和非逻辑部分的代码链接成一个字符串，然后利用类似fn的函数直接编译代码。而<code>/&lt;%([^%&gt;]+)?%&gt;/g</code>，这一个正则只能把逻辑部分匹配出来，要想把所有的代码都组合到一起，必须还得匹配非逻辑部分代码。replace函数虽然很强大，他也可以完成这个任务，但是实现的逻辑比较晦涩，所以我们换另外一种方式来处理。</p>
<p>先看一个简单的例子：</p>

```
var reg = /<%([^%>]+)?%>/g;
var tpl = 'Hei, my name is <%name%>, and I\'m <%age%> years old.';
var match = reg.exec(tpl);
console.log(match);

```

<p>&nbsp;看到的是：</p>

```
[
    0: "<%name%>",
    1: name,
    index: 16,
    input: "Hei, my name is <%name%>, and I'm <%age%> years old."
    length: 2
]

```

<p>&nbsp;这。。。我们可是想得到所有的匹配啊，他竟然只获取了name而忽略了后面的age，好吧，对正则稍微熟悉点的童鞋一定会知道应该这样处理：</p>

```
var reg = /<%([^%>]+)?%>/g;
while(match = reg.exec(tpl)) {
    console.log(match);
}

```

<p>&nbsp;关于正则表达式的内容就不在这里细说了，有兴趣的同学可以多去了解下match,exec,search等正则的相关函数。这里主要是靠match的index属性来定位遍历位置，然后利用while循环获取所有的内容。</p>
<h4>4.引擎函数</h4>
<p>所以我们的引擎函数雏形差不多就出来了：</p>

```
var tplEngine = function(tpl, data){
    var reg = /<%([^%>]+)?%>/g,
            code = 'var r=[];\n',
            cursor = 0;  //主要的作用是定位代码最后一截
    var add = function(line) {
        code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n';
    };

    while(match = reg.exec(tpl)) {
        add(tpl.slice(cursor, match.index)); //添加非逻辑部分
        add(match[1]);  //添加逻辑部分 match[0] = "<%" +="" match[1]="" "%="">";
        cursor = match.index + match[0].length;
    }

    add(tpl.substr(cursor, tpl.length - cursor)); //代码的最后一截 如:" years old."

    code += 'return r.join("");'; // 返回结果，在这里我们就拿到了装入数组后的代码
    console.log(code);

    return tpl;
};

```

<p>&nbsp;这样一来，测试一个小demo:</p>

```
 var tpl = '<% for(var="" i="0;" <="" this.posts.length;="" i++)="" {'="" +　="" 'var="" post="posts[i];" %="">' +
        '<% if(!post.expert){="" %="">' +
            '<span>post is null</span>' +
        '<% }="" else="" {="" %="">' +
            '<a href="#"><% post.expert="" %=""> at <% post.time="" %=""></%></%></a>' +
        '<% }="" %="">' +
    '<% }="" %="">';
tplEngine(tpl, data);

```

<p>&nbsp;返回的结果让人很满意：</p>

```
var r=[];
r.push("");
r.push(" for(var i = 0; i < this.posts.length; i++) {var post = posts[i]; ");
r.push("");
r.push(" if(!post.expert){ ");
r.push("<span>post is null</span>");
r.push(" } else { ");
r.push("<a href="\"#\"">");
r.push(" post.expert ");
r.push(" at ");
r.push(" post.time ");
r.push("</a>");
r.push(" } ");
r.push("");
r.push(" } ");
r.push("");
return r.join(""); 

```

<p>&nbsp;不过我们并需要for，if，switch等这些东西也push到r数组中去，所以呢，还得改善下上面的代码，如果在line中发现了包含js逻辑的代码，我们就不应该让他进门：</p>

```
regOut = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
var add = function(line, js) {
    js? code += line.match(regOut) ? line + '\n' : 'r.push(' + line + ');\n' :
        code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n';
};

```

<p>&nbsp;所以我们只剩下最后一步工作了，把data扔进去！</p>
<h4>5.把data扔进去</h4>
<p>没有比完成这东西更简单的事情啦，通过上面对Function这个函数的讲解，大家应该也知道怎么做了。</p>

```
return new Function(code).apply(data);

```

<p>&nbsp;使用apply的作用就是让code中的一些变量作用域绑定到data上，不然作用域就会跑到global上，这样得到的数据索引就会出问题啦~ 当然我们可以再优化一下：</p>

```
return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);

```

<p>&nbsp;把回车换行以及tab键都给匹配掉，让代码更加干净一点。那么最终的代码就是：</p>

```
var tplEngine = function(tpl, data) {
    var reg = /<%([^%>]+)?%>/g,
        regOut = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
        code = 'var r=[];\n',
        cursor = 0;

    var add = function(line, js) {
        js? (code += line.match(regOut) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while(match = reg.exec(tpl)) {
        add(tpl.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(tpl.substr(cursor, tpl.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
};

```

<h3>三、应用场景</h3>
<p>毕竟是前端代码，所以写出来是要为前端服务的，平时我们处理的一般是一个html的模板，通常的情况下，模板代码是放在script标签或者textarea中，所以首先是要获取到这里头的东西，然后再来做解析。</p>

```
var barretTpl = function(str, data) {

    //获取元素
    var element = document.getElementById(str);
    if (element) {
        //textarea或input则取value，其它情况取innerHTML
        var html = /^(textarea|input)$/i.test(element.nodeName) ? element.value : element.innerHTML;
        return tplEngine(html, data);
    } else {
        //是模板字符串，则生成一个函数
        //如果直接传入字符串作为模板，则可能变化过多，因此不考虑缓存
        return tplEngine(str, data);
    }
    var tplEngine = function(tpl, data) {
        // content above
    };
};

```


<p>这样一来就更加简单了，使用方式就是 <code>barretTpl(str, data)</code>， 这里的str可以是模板代码，也可以是一个DOM元素的id~ 可以看看这两段代码：<a href="//gist.github.com/barretlee/7765698" target="_blank">//gist.github.com/barretlee/7765698</a>, <a href="//gist.github.com/barretlee/7765587" target="_blank">//gist.github.com/barretlee/7765587</a></p>
<p>也可以直接戳这个<a href="http://qianduannotes.duapp.com/demo/javascript-template.html" target="_blank">demo</a>。</p>


<h3>四、优化以及功能拓展</h3>
<p>总共就三四十行代码，完成的东西肯定是一个简洁版的，不过对于一个简单的页面而言，这几行代码已经足够使用了，如果还想对他做优化，可以从这几个方面考虑：</p>
<ul>
<li>优化获取的模板代码，比如去掉行尾空格等</li>
<li>符号转义，如果我们想输出<code>&lt;span&gt;hehe&lt;/span&gt;</code>类似这样的源代码，在push之前必须进行转义</li>
<li>代码缓存，如果一个模板会经常使用，可以将它用一个数组缓存在barretTpl闭包内</li>
<li>用户自己设置分隔符</li>
</ul>


<h3>五、参考资料</h3>
<p>[1]&nbsp;<a href="http://tech.pro/tutorial/1743/javascript-template-engine-in-just-20-lines" target="_blank">http://tech.pro/tutorial/1743/javascript-template-engine-in-just-20-lines</a>&nbsp;&nbsp;Krasimir Tsonev&nbsp;</p>
<p>[2]&nbsp;<a href="http://tangram.baidu.com/BaiduTemplate/" target="_blank">http://tangram.baidu.com/BaiduTemplate/</a>&nbsp; JS template</p>


