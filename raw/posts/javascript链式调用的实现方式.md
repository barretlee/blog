---
title: javascript链式调用的实现方式
categories:
  - JavaScript
  - 杂物间
tags:
  - tech
  - cnblogs
warning: true
date: 2012-09-18 08:58:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2012/09/18/3049802.html" target="_blank">博客园</a>.</div>

<p><strong>本文从ITeye导入</strong>&nbsp;</p>


<p>在我们所用到的库中，可以看到很多诸如</p>

```
$(window).addEvent('load', function(){
    $('test').show().setStyle('color', 'red').addEvent('click', function(e){
        $(this).setStyle('color', 'yellow');
    });
});

```

<p>&nbsp;的链式调用，那么这样的链式结构是怎么实现的呢，下面我们利用代码来探讨一番：</p>


<p>&nbsp;先分解下，我们队$函数已经很熟悉了，他通常返回一个HTML元素或者HTML元素的集合，如下所示：</p>

```
function $(){
    var elements = [];
    for(var i = 0, len = arguments.length; i < len; i++){
        var element = els[i];
        if(typeof element === 'string'){
            element = document.getElementById(element);
        }
        elements.push(element);
    }
    return elements;
}

```

<p>&nbsp;但是，如果把这个函数改造为一个构造器，把那些元素作为数组保存在一个实例属性中，并让所有定义在构造器函数的prototype属性所指对象中的方法都返回用以调用放方法的那个实例的引用，那么他就具有了进行链式调用的能力。</p>


<p>先别说的太远，我们首先需要把这个$函数改为一个工厂函数，他负责创建支持链式调用的对象。</p>

```
(function(){

    function _$(els){
        this.element = [];
        for(var i = 0, len = els.length; i < len; i++){
            var element = els[i];
            if(typeof element === 'string'){
                element = document.getElementById(element);
            }
            this.element.push(element);
        }
        return this;
    }
    window.$ = function(){
        return new _$(arguments);
    }
})();       

```

<p>由于所有对象都会继承其原型对象的属性和方法，所以我们可以让定义原型对象中的那几个方法都返回用以调用方法的实例对象的引用，这样既可以对那些方法进行链式调用，想好这一点，我们现在就动手在_$这个私用构造函数的prototype对象那个中添加方法，以便实现链式调用。</p>



```
(function(){

    function _$(els){
        this.element = [];
        for(var i = 0, len = els.length; i < len; i++){
            var element = els[i];
            if(typeof element === 'string'){
                element = document.getElementById(element);
            }
            this.element.push(element);
        }
        return this;
    }

    _$.prototype = {
        each: function(fn){
            for(var i = 0, len = this.element.length; i < len; i++){
                fn.call(this, this.element[i]);
            }
            return this;
        },

        setStyle: function(prop, val){
            this.each(function(el){
                el.style[prop] = val;
            });
            return this;
        },

        show: function(){
            var that = this;
            this.each(function(el){
                that.setStyle('display', 'none');
            });
            return this;
        },

        addEvent: function(type, fn){
            var add = function(el){
                if(window.addEventListener){
                    el.addEventListener(type, fn, false);
                }else if(window.attachEvent){
                    el.attachEvent('on' + type, fn);
                }
            };
            this.each(function(el){
                add(el);
            });
        }
    };

    window.$ = function(){
        return new _$(arguments);
    }
})();

```



<p>&nbsp;看看该类每个方法的最后一行，你会发现他们都是以"return this;"结束，这样将用以调用方法的对象传给调用链上的下一个方法。</p>
<p>
              </p>