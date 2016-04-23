---
title: JavaScript操控光标，你会么？
categories:
  - JavaScript
  - 杂物间
tags:
  - tech
  - cnblogs
warning: true
date: 2013-04-11 05:15:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/04/11/set_and_get_cursor_position.html" target="_blank">博客园</a>.</div>

<p>QQ群里经常有人问怎么设置textarea中光标的位置，所见即所得中如果选中文本。如果你也不会，请往下看：</p>
<p><strong>关键词</strong>：javascript 光标 位置 鼠标取词 createRange getSelection</p>


<h3>getPosition</h3>
<p>先上代码，你也可以测试下效果。</p>

```这是一个Demo~

<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <title>测试</title>
    <style type="text/css">
    </style>
    <script type="text/javascript">
    //<![[
       function getPosition() {
            var startPos = endPos = 0;
            var element = document.getElementById("box");
            if( document.selection ) {
                var range  = document.selection.createRange();
                var drange = range.duplicate();
                drange.moveToElementText( element );
                drange.setEndPoint( "EndToEnd", range );
                startPos = drange.text.length - range.text.length;
                endPos   = startPos + range.text.length;
            }else if( window.getSelection ) {
                startPos = element.selectionStart;
                endPos   = element.selectionEnd;
            }
            return {
                "start" : startPos,
                "end"   : endPos
            }
        }

        window.onload = function(){
            var element = document.getElementById("box");

            element.onmouseup = function(){
                var pos = getPosition(),
                    val = element.value.toString();

                console.log(val.substring(pos.start, pos.end) || "没有选中");
            }
        }
    //]]>
    </script>
</head>

<body>
    <textarea id="box">木子Vs立青，性别男，爱好女，单身。</textarea>
</body>
</html>


```

<script type="text/javascript">// <![CDATA[
function getPosition() {
  var startPos = endPos = 0;
  var element = document.getElementById("skyking-box");
  if (document.selection) {
    var range = document.selection.createRange();
    var drange = range.duplicate();
    drange.moveToElementText(element);
    drange.setEndPoint("EndToEnd", range);
    startPos = drange.text.length - range.text.length;
    endPos = startPos + range.text.length;
  } else if (window.getSelection) {
    startPos = element.selectionStart;
    endPos = element.selectionEnd;
  }
  return {
    "start": startPos,
    "end": endPos
  }
}
function log(str) {
  var lb = document.getElementById("skyking-log-box");
  lb.innerHTML = lb.innerHTML + "<br /><strong style="color: blue;">&gt;</strong> " + str;
}
function showLog() {
    var pos = getPosition(),
        val = element.value.toString();
    log(val.substring(pos.start, pos.end) || "没有选中");
};
// ]]&gt;</script>


<h3>selection <&nbsp;getSelection</h3>
<p>IE下的选择方式：判断方式（<strong>document.selection</strong>）</p>

```
//获取选取var range  = document.selection.createRange();
var drange = range.duplicate();
drange.moveToElementText( element );
drange.setEndPoint( "EndToEnd", range );//获取position
startPos = drange.text.length - range.text.length;
endPos   = startPos + range.text.length;

```

<p>比较啰嗦，这代码也没啥意思，看了就忘，所以得多看多写，熟练了就好了。</p>
<p>下面是非IE的选择方式：判断方式（<strong>window.getSelection</strong>）</p>

```
startPos = element.selectionStart;
endPos   = element.selectionEnd;

```

<p>简练多了，是吧~</p>


<h3>设置光标位置</h3>
<p>这个就比较简单了，<strong>把 start 和 end 的值设置成一样就搞定了！</strong></p>
<p>chrome下：</p>

```
element.selectionStart = 5;
element.selectionEnd = 5;
element.focus();

```

<p>IE下：</p>

```
var range = document.selection.createRange();
range.collapse(true);
range.moveEnd('character', 5);
range.moveStart('character', 5);
element.focus();

```

<p>给他们一个focus的目的就是为了聚焦到textarea上去，以便清晰看到光标已经成功设置了。</p>
<p>Demo我就不写了，相信应该有了大概的了解。</p>


<h3>写个Class，方便使用</h3>

```chrome下测试没问题，IE下，哎。。搞了半天，还是不兼容

var getObj = function ( id ) {
    //获取对象
    var ele = document.getElementById(id);
    //返回结果
    return {
        element: ele,
        startPos: 0,
        endPos: 0,
        init: function(){
            var _this = this;
            if( !("__proto__" in {}) ){
                this.element.attachEvent("onmouseup", _this.getPos);
            }else{
                this.element.addEventListener("mouseup", _this.getPos, false);
            }
            return this;
        },
        getPos: function () {
            var _this = this;
            if( document.selection ) {
                try{
                    var range  = document.selection.createRange();
                    var drange = range.duplicate();
                    drange.moveToElementText( _this.element );
                    drange.setEndPoint( "EndToEnd", range );
                    this.startPos = drange.text.length - range.text.length;
                    this.endPos   = this.startPos + range.text.length;
                }catch(e){

                }
            }else if( window.getSelection ){
                try{
                    this.startPos = this.element.selectionStart;
                    this.endPos   = this.element.selectionEnd;
                }catch(e){
                    //throw new Error("getPos error");
                }
            }
            return this;
        },
        setPos: function ( m, n ) {
            var arg2 = n || m;
            if( document.selection ) {
                var range = document.selection.createRange();
                range.collapse(true);
                range.moveEnd('character', arg2);
                range.moveStart('character', m);
                this.element.focus();
            }else if( window.getSelection ){
                this.startPos = this.element.selectionStart = m;
                this.endPos   = this.element.selectionEnd = arg2;
                this.element.focus();
            }
        },
        getStr: function( m, n ){
            this.getPos( m, n );
            return this.element.value.toString().slice(this.startPos, this.endPos);
        }
    };
};


```

<p>很受伤，下次接着弄。<em>你也可以试试哈~</em></p>
<p>函数调用方式：</p>
<p>1. 初始化init()</p>

```
var t = getObj("box").init();

```

<p>2. setPos()</p>

```
//选中从m到n之间的内容
t.setPos(m, n);
//一个参数就是设置光标位置
t.setPos(m);

```

<p>3. getPos()</p>

```
//这个算是一个内置函数，每次选择都自动调用了，可以不管
t.getPos();

```

<p>4. getStr()</p>

```
//获取选中的字符串
t.getStr();

```

<p>5. invoke()</p>

```
//执行你送入的函数
function yourFun(){}
//这个方法还没加进去，感觉用处也不大，原理就是使用call
t.invoke(yourFun);

```



<p>主要是不很了解IE的API，纠结了半天，又不愿意去看别人写的文档，先晾在这里，下次不全~</p>
<p><strong>本文未完，待续...</strong></p>