---
title: Javascript综合应用小案例（续）
categories:
  - JavaScript
  - 杂物间
tags:
  - tech
  - cnblogs
warning: true
date: 2013-05-05 12:41:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/05/05/getKeywords-2.html" target="_blank">博客园</a>.</div>

<p><a class="titlelink" href="http://www.cnblogs.com/hustskyking/archive/2013/05/04/getkeywords.html">上一篇文章</a>，弄了一个 <strong>取词&nbsp;</strong>和 <strong>标红</strong> 功能的小应用，但是存在一些bug，今天修修补补，顺便也把ajax部分补上了~</p>
<p><a href="http://qianduannotes.sinaapp.com/getKeyword/" target="_blank"><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/05/05/04235938-51987cdb332f4539bbfbeeb88d093e1c.png" data-source="http://images.cnitblog.com/blog/387325/201305/04235938-51987cdb332f4539bbfbeeb88d093e1c.png" alt="" width="850" height="408"></a></p>


<p>Demo地址：<span>：</span><a title="取词&&标红 demo" href="http://qianduannotes.sinaapp.com/getKeyword/" target="_blank">http://qianduannotes.sinaapp.com/getKeyword/</a></p>


<p>代码部分：</p>
<div class="cnblogs_Highlighter">
<pre class="brush:javascript;collapse:true;;gutter:false;">var GetKeywords = {
  str: "",
  limit: 11,
  keywords:[],
  url: "./tool.php",

  //page id
  getId: function(){
    this.id = this._("wp").getAttribute("data-page");
  },

  init : function(){
    var box = this._("article"),
      _this = this;

    //获取已经存在的关键词
    this.getAllKeyWord();
    //获取页面ID
    this.getId();
    //让rmKeyWord函数全局化
    window.rmkeyWord = this.rmkeyWord;

    //取词事件
    box.onmouseup = function(evt){
      var evt = evt || window.event,
        target = evt.target || evt.srcElement;

      //如果鼠标是在button上弹起，则忽略
      if(target.id == "btn") return;
      GetKeywords.str = _this.getSelectionText();

      if(_this.str.length == 0){
        _this.removeBtn();
        return;
      }
      if(_this._("btn")) {
        _this.removeBtn();
        if(GetKeywords.str == "") return;
        _this.createBtn(evt);
        return;
      }
      _this.createBtn(evt);
    }

    var types = document.getElementsByTagName("input");
    for(var j = 0, len = types.length; j &lt; len; j++){
      (function(j){
        types[j].onchange = function(){
          _this.sendData(j + 1, "change");
        }
      })(j);
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

      _this.sendData(_this.str);

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

    res = GetKeywords.sendData(word, "del");

    GetKeywords.rmRed(word);
    for(len = GetKeywords.keywords.length; i &lt; len; i++){
      if(GetKeywords.keywords[i] == word){
        GetKeywords.keywords.splice(i,i);
      }
      continue;
    }
    target.parentNode.removeChild(target);
    var evt = arguments.callee.caller.arguments[0];
    try{
      evt.preventDefault();
    }catch(e){
      window.event.returnValue = false;
    }
  },

  //ajax
  sendData: function(data, action){
    var xmlhttp,
      action = action || "add",
      _this = this;
    if (window.XMLHttpRequest){
      xmlhttp = new XMLHttpRequest();
    }else{
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", this.url + "?" + action + "=" + data + "<id=" + this.id, true);
    xmlhttp.onreadystatechange = function(){
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
        _this.sendSuccess(xmlhttp.responseText);
      }
    }
    xmlhttp.send();

  },

  sendSuccess:function(data){
    window.console && window.console.log && window.console.log(data);
  }
}

GetKeywords.init();
</pre>
</div>
<p>　　</p>
<p><strong>一、ajax部分</strong></p>

```
sendData: function(data, action){
    var xmlhttp,
        action = action || "add",
        _this = this;
    if (window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", this.url + "?" + action + "=" + data + "<id=" + this.id, true);
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            _this.sendSuccess(xmlhttp.responseText);
        }
    }
    xmlhttp.send();

},

sendSuccess:function(data){
    window.console && window.console.log && window.console.log(data);
}

```

<p>感觉这里真心就没什么好说的，因为这玩意儿涉及到数据的提交、删除、和更新，所以GET的状态也分为add、del、change。</p>
<p>默认的提交状态是add，代码中已经标红。</p>


<p><strong>二、删除关键词</strong></p>
<p>上次也说了这个部分，但是里边用到了一个splice，在这里稍微详细描述下。</p>

```
rmkeyWord: function (obj){
    var target = obj.parentNode,
        word = obj.previousSibling.innerHTML,
        i = 0, len;

    res = GetKeywords.sendData(word, "del");

    GetKeywords.rmRed(word);
    for(len = GetKeywords.keywords.length; i < len; i++){
        if(GetKeywords.keywords[i] == word){
            GetKeywords.keywords.splice(i,i); //删除第i个元素
        }
        continue;
    }
    target.parentNode.removeChild(target);
    var evt = arguments.callee.caller.arguments[0];
    try{
        evt.preventDefault();
    }catch(e){
        window.event.returnValue = false;
    }
},

```

<p><span>splice() 方法用于插入、删除或替换数组的元素。</span></p>
<p><span><span>这个方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。</span></span></p>

```
arrayObject.splice(index,howmany,element1,.....,elementX)

```

<table class="dataintable">
<tbody>
<tr><th>参数</th><th>描述</th></tr>
<tr>
<td>index</td>
<td>
<p>必需。规定从何处添加/删除元素。</p>
<p>该参数是开始插入和（或）删除的数组元素的下标，必须是数字。</p>
</td>
</tr>
<tr>
<td>howmany</td>
<td>
<p>必需。规定应该删除多少元素。必须是数字，但可以是 "0"。</p>
<p>如果未规定此参数，则删除从 index 开始到原数组结尾的所有元素。</p>
</td>
</tr>
<tr>
<td>element1</td>
<td>可选。规定要添加到数组的新元素。从 index 所指的下标处开始插入。</td>
</tr>
<tr>
<td>elementX</td>
<td>可选。可向数组添加若干元素。</td>
</tr>
</tbody>
</table>
<p>1）插入</p>

```
ArrayObj.splice(2, 0, "addObj");

```

<p>即为在数组第三个位置插入一个名为\addObj"的字符串。</p>


<p>2）删除</p>

```
ArrayObj.splice(2, 2);

```

<p>即为删除从第三个开始的连续两个数组元素。</p>


<p>3）插入</p>

```
ArrayObj.splice(2, 1，"replaceObj");

```

<p>即为替换第三个元素（也可以说是删除从第三个元素开始的连续一个元素，然后添加一个名为\replaceObj"的字符串）。</p>


<p>来一个综合应用的：</p>

```
ArrayObj.splice(2, 2，"replaceObj_1"，"replaceObj_2");

```

<p>&nbsp;即为删除从第三个元素开始的连续两个元素，然后在刚才删除的位置，添加名为\replaceObj_1"，\replaceObj_2"的两个字符串。相信应该已经比较清楚了吧~O(&cap;_&cap;)O~</p>
<p><em>注：splice() 方法与 slice() 方法的作用是不同的，splice() 方法会直接对数组进行修改。</em></p>


<p><strong>三、遇到的问题</strong></p>
<p><strong>1. this指定的对象</strong></p>
<p>对象方法中this并不一定指向对象本身，即使写了</p>

```
f: function(){
    var _this = this; //然后在闭包中使用_this
    function name(){
        _this.doSomething();//这是的_this也不一定是对象本身
    }
}    

```

<p>这是_this也不一定是指向该对象，[object global]，有可能指向的是这个对象~</p>


<p><strong>2. event的兼容性</strong></p>
<p>相信evt = evt || window.event，大家都明白，但是在FF下：</p>

```
function test(evt){
    var evt = evt || window.event;
    //...
}

```

<p>在调用test()的时候，如果没有加参数，evt为undefined，使用过程需要test(evt);当然也可以这样:</p>

```
function test(){
    var evt = argument.callee.caller.argument[0];
    //...
}

```



<p><strong>4. for-in的问题</strong></p>

```
for(i in csses){
    if(csses.hasOwnProperty(i)){
        cssList += i + ":" + csses[i] + ";";　　　　 //button.style[i] = csses[i];　　 } } button.style.cssText = cssList;

```

<p>开始的时候，我用的是注释里的方法button.style[i] = csses[i]，但在IE下报错了，后来就用的上面方式实现，具体为什么我也不知道。。</p>


<p><strong>5. 标签解析的问题</strong></p>
<p>IE载入DOM之后，会把所有的标签解析成大写的，这个至少在IE7和8是如此，IE9以上没测试，就不知道了~</p>


<p><strong>6. JS一些常见的浏览器兼容问题</strong></p>
<p>这里提到的有：</p>
<ul>
<li>evt || window.event</li>
<li>evt.target || evt.srcElement</li>
<li>evt.x || evt.pageX || evt.layerX</li>
<li>evt.preventDefault() Vs window.event.returnValue = false</li>
<li>XMLHttpRequest ||&nbsp;ActiveXObject("Microsoft.XMLHTTP")</li>
<li>obj.innerText || obj.textContent</li>
<li>window.getSelection ||　document.selection</li>
</ul>


<p><strong>四、参考</strong></p>
<ul>
<li><a title="splice" href="http://www.w3school.com.cn/js/jsref_splice.asp" target="_blank">W3School splice</a></li>
</ul>


<p><strong>五、结语</strong></p>
<p><strong>我</strong>认为，对象里的数据，能单独提取出来尽量单独提出来，不要把所有的常量都当做字面量放置在有需求的地方，用一个变量缓存的话，修改起来也十分方便。对象里的方法，能分离的分离，尽量不要一个嵌套着一个，搞不好就是一个泄露内存的闭包，分离出来，作为对象的直接方法，既可以方便多次利用，又不至于搞的太复杂。</p>
<p>好吧，要学的东西真的很多很多，但是只要把看到的不明白弄明白，然后准备好下一个不明白到来，这样就行了。</p>

