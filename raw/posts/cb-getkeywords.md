---
title: Javascript综合应用小案例
categories:
  - JavaScript
  - 杂物间
tags:
  - tech
  - cnblogs
warning: true
date: 2013-05-04 02:38:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/05/04/getkeywords.html" target="_blank">博客园</a>.</div>

<p>按需求弄了一个 <strong>取词</strong> 以及 <strong>标红</strong> 的小应用。</p>
<p><a href="http://qianduannotes.sinaapp.com/getKeyword/" target="_blank"><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/05/04/o_%e8%a7%86%e5%9b%be.png" data-source="http://images.cnblogs.com/cnblogs_com/hustskyking/477032/o_%e8%a7%86%e5%9b%be.png" alt="" width="716" height="388"></a></p>
<p>先上demo ：<a title="取词&&标红 demo" href="http://qianduannotes.sinaapp.com/getKeyword/" target="_blank">http://qianduannotes.sinaapp.com/getKeyword/</a></p>
<p>很多平时常用的东西，都用上了，所以拿出来说说。</p>


<p><strong>一、代码</strong></p>
<div class="cnblogs_Highlighter">
<pre class="brush:javascript;collapse:true;;gutter:false;">var GetKeywords = {
  str: "",
  limit: 11,
  keywords:[],

  init : function(){
    var box = this._("article"),
      _this = this;

    //获取已经存在的关键词
    this.getAllKeyWord();

    //让rmKeyWord函数全局化
    window.rmkeyWord = this.rmkeyWord;

    //取词事件
    box.onmouseup = function(evt){
      var evt = evt || window.event,
        target = evt.target || evt.srcElement;

      //如果鼠标是在button上弹起，则忽略
      if(target.id == "btn") return;
      GetKeywords.str = _this.getSelectionText();

      if(_this.str.length == 0) return;
      if(_this._("btn")) {
        _this.removeBtn();
        if(GetKeywords.str == "") return;
        _this.createBtn(evt);
        return;
      }
      _this.createBtn(evt);
    }
  },

  //工具函数
  _: function(obj){
    return document.getElementById(obj);
  },

  //获取选中文本
  getSelectionText: function(){
    if(window.getSelection) {
      return window.getSelection().toString();
    } else if(document.selection && document.selection.createRange) {
      return document.selection.createRange().text;
    }
    return '';
  },

  //创建按钮
  createBtn: function(evt){
    var button = document.createElement("div"),
      evt = evt || window.event,
      x = evt.pageX || evt.x,
      y = evt.pageY || evt.y,
      i, j, len,
      cssList = "",
      _this = this,
      csses = {
        "height" : "30px",
        "line-height" : "30px",
        "position": "absolute",
        "top": y + 10 + "px",
        "left": x + 10 + "px",
        "cursor": "pointer",
        "border": "1px solid #000",
        "background": "#EEE",
        "padding": "2px 8px",
        "border-radius": "3px"
      };
    for(i in csses){
      if(csses.hasOwnProperty(i)){
        cssList += i + ":" + csses[i] + ";";
      }
    }
    button.style.cssText = cssList;
    button.innerHTML = "添加到关键词列表";
    button.setAttribute("id", "btn");

    this._("article").appendChild(button);

    button.onclick = function(){
      if(_this.str.length &gt; _this.limit){
        alert("关键词长度最长为11，可以通过设置GetKeywords.limit来控制长度。");
        _this.removeBtn();
        return;
      }

      for(j = 0, len = GetKeywords.keywords.length; j &lt; len; j++){
        if(GetKeywords.keywords[j] == _this.str){
          alert("已经存在该关键词了~");
          _this.removeBtn();
          return;
        }
        continue;
      }
      _this.keywords.push(_this.str);
      _this.setRed(_this.str);
      _this.addTo();
      _this.removeBtn();
    };
  },

  //删除按钮
  removeBtn: function(){
    var btn = this._("btn");
    btn.parentNode.removeChild(btn);
  },

  //加入到关键词里列表
  addTo: function(){
    var word = this._("wordList");
    word.innerHTML += "&lt;span&gt;&lt;font&gt;" + this.str + "&lt;/font&gt;&lt;a href='#' onclick='rmkeyWord(this);'&gt;&lt;/a&gt;&lt;/span&gt;";
  },

  //关键词标红
  setRed: function(str){
    var content = this._("article"),
      temp = '(' + str + ')';
      reg = new RegExp(temp,'g');

    content.innerHTML = content.innerHTML.replace(reg, "&lt;span style='color:red;'&gt;$1&lt;/span&gt;");
  },

  //删除标红
  rmRed: function(str){
    var content = this._("article"),
      temp = "(&lt;span[^&lt;]*" + str + "&lt;/span&gt;)";
      reg = new RegExp(temp,'gi');
    content.innerHTML = content.innerHTML.replace(reg, str);
  },

  //获取已经存在的关键词（也可以用来获取所有关键词）
  getAllKeyWord: function (){
    var spans = this._("wordList").getElementsByTagName("span"),
      key = [], i = 0, len;
    for(len = spans.length; i &lt; len; i++){
      var font = spans[i].getElementsByTagName("font")[0];
      var temp = font.innerText || font.textContent;
      this.setRed(temp);
      key.push(temp);
    }
    this.keywords = key;
  },

  //删除关键词
  rmkeyWord: function (obj){
    var target = obj.parentNode,
      word = obj.previousSibling.innerHTML,
      i = 0, len;
    GetKeywords.rmRed(word);
    for(len = GetKeywords.keywords.length; i &lt; len; i++){
      if(GetKeywords.keywords[i] == word){
        GetKeywords.keywords.splice(i,i);
      }
      continue;
    }
    target.parentNode.removeChild(target);
    return;
  }
}

GetKeywords.init();</pre>
</div>


<p><span>以上是所有js代码，比较长，下面将列举一些比较突出的点（望高人多多指点）。</span></p>


<p><strong>二、代码分析</strong></p>
<p><strong>1.获取文本</strong></p>

```
getSelectionText: function(){
    if(window.getSelection) {
        return window.getSelection().toString();
    } else if(document.selection && document.selection.createRange) {
        return document.selection.createRange().text;
    }
    return '';
}

```

<p>这个在以前（<a class="titlelink" href="http://www.cnblogs.com/hustskyking/archive/2013/04/11/set_and_get_cursor_position.html" target="_blank">JavaScript操控光标，你会么？</a>）的文章里也说过，就不赘述了。</p>


<p><strong>2.创建控制框</strong></p>

```
createBtn: function(evt){
    var button = document.createElement("div"),
        //...
        csses = {
            "height" : "30px",
            "line-height" : "30px",
            "position": "absolute",
            "top": y + 10 + "px",
            "left": x + 10 + "px",
            "cursor": "pointer",
            "border": "1px solid #000",
            "background": "#EEE",
            "padding": "2px 8px",
            "border-radius": "3px"
        };
    for(i in csses){
        if(csses.hasOwnProperty(i)){
            cssList += i + ":" + csses[i] + ";";
        }
    }
    button.style.cssText = cssList;
    button.innerHTML = "添加到关键词列表";
    button.setAttribute("id", "btn");
　　//...
}

```

<p>这里有一点我想说说，在写js的时候，会经常涉及到对DOM对象style的处理，如果不想额外加入一个plugins.css之类的文件，可以像上面一样，将样式放置在一个对象中，然后利用for in将其写入，本来开始我用的是</p>

```
obj.style[i] = csses[i];

```

<p>不知道为什么，在IE下报错了，后来便用cssText代替。</p>
<p>效果：</p>
<p><a href="http://qianduannotes.sinaapp.com/getKeyword/" target="_blank"><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/05/04/o_%e6%b7%bb%e5%8a%a0%e5%88%b0%e5%88%97%e8%a1%a8.png" data-source="http://images.cnblogs.com/cnblogs_com/hustskyking/477032/o_%e6%b7%bb%e5%8a%a0%e5%88%b0%e5%88%97%e8%a1%a8.png" alt="添加到列表" width="610" height="312"></a></p>


<p><strong>3.标红</strong></p>

```
//关键词标红
setRed: function(str){
    var content = this._("article"),
        temp = '(' + str + ')';
        reg = new RegExp(temp,'g');

    content.innerHTML = content.innerHTML.replace(reg, "<span>$1</span>");
}

```

<p>这里主要就是正则表达式的事情了，正则的话，推荐两篇文章</p>
<ul>
<li>一篇是司徒正美的，讲的比较全面，比较系统。<a href="http://www.cnblogs.com/rubylouvre/archive/2009/11/02/1594731.html" target="_blank">点我链接过去→</a></li>
<li>一篇是30分钟搞定正则，这个讲说是对所有语言，JS的话正则这一块还不是特别完善和强大。<a href="http://manual.phpv.net/regular_expression.html" target="_blank">点我链接过去→</a></li>
</ul>
<p>哈哈，相信用过正则的人不需要我来解释这个<span>$1</span>了吧，他的意思就是匹配到的第一个。</p>
<p>当然，删除标红和这个原理是差不多的。</p>

```
//删除标红
rmRed: function(str){
    var content = this._("article"),
        temp = "(<span[^<]*" +="" str="" "<="" span="">)";
        reg = new RegExp(temp,'gi');

    content.innerHTML = content.innerHTML.replace(reg, str);
}

```
</span[^<]*">
<p>这里是写完这篇blog才发现的一个bug， IE下如果rmRed中的正则是'g',貌似该函数会无效，在IE8控制台下查看，NND，输出innerHTML中的标签全部变成大写了，无奈，只好改成'gi'。</p>


<p><strong>4.获取所有关键词和删除关键词</strong></p>

```
//获取已经存在的关键词（也可以用来获取所有关键词）
getAllKeyWord: function (){
    //...
},

//删除关键词
rmkeyWord: function (obj){
    //...
    GetKeywords.rmRed(word);
    for(len = GetKeywords.keywords.length; i < len; i++){
        if(GetKeywords.keywords[i] == word){
            GetKeywords.keywords.splice(i,i);
        }
        continue;
    }
    //...
}

```

<p>这个地方，有一个疑问，在调用的时候，使用this.keywords没反应，但是改成GetKeywords就行了，还没研究具体原因是什么~</p>


<p><strong>5.初始化</strong></p>

```
GetKeywords.init();

```

<p>init()为总入口，进去之后，先获取已经存在的关键词，然后标红，接着绑定onmouseup事件。</p>


<p><strong>三、然后</strong></p>
<p>当然咯，这个案例的ajax部分还没写，弄完之后还得给后台送过去。。好吧，明天接着弄吧。</p>
<p>写这玩意儿还是花了点功夫，不过鄙人写代码的水平还在初级阶段，望大神们不要吐槽，多提宝贵意见，谢谢！</p>
<p>然后，还是那个demo，<a title="取词&&标红 demo" href="http://qianduannotes.sinaapp.com/getKeyword/" target="_blank">http://qianduannotes.sinaapp.com/getKeyword/</a></p>
<p>顺便，推广下，团队做的一个网站，主要技术是爬虫，高峰期PV稳定在120W以上，找工作的童鞋可以多去踩踩~</p>
<p><strong><a title="海投网" href="http://xjh.haitou.cc/" target="_blank">宣讲会查询系统&mdash;&mdash;海投网</a>&nbsp;</strong></p>


<p>P.S：刚让队友测试，还是发现了不少bug，果然考虑问题还是不全面啊~还要继续加油。。。</p>

