---
title: 如何设计一个支持方法链式调用的JavaScript库
categories:
  - JavaScript
  - 杂物间
tags:
  - tech
  - cnblogs
warning: true
date: 2012-09-18 09:37:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2012/09/18/3049801.html" target="_blank">博客园</a>.</div>

<p><strong>本文从ITeye导入</strong></p>


<p>可以先了解下&nbsp;<a class="titlelink" href="http://www.cnblogs.com/hustskyking/archive/2012/09/18/3049802.html">javascript链式调用的实现方式</a></p>



```
//设计一个支持方法链式调用的JavaScript库

/*
    常见于大多数JavaScript库中的特性
 &mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;
       特性          |                       说明
 &mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;
       事件          |   添加和删除事件监听器，对时间对象进行规范内化处理
       DOM          |   类名管理，样式管理
       Ajax         |   多XMLHttpRequest进行规范化处理
 &mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;

    注：可以对私有的_$构造函数进行扩充
*/
Function.prototype.method = function(name, fn){
    this.prototype[name] = fn;
    return this;
};

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

    /*
        Events
            * addEvent
    */

    _$.method('addEvent', function(type, fn){
            var add = function(el){
            if(window.addEventListener){
                el.addEventListener(type, fn, false);
            }else if(window.attachEvent){
                el.attachEvent('on' + type, fn);
            }
            this.each(function(el){
                add(el);
            });
        }).

    /*
        otherFun
            * each
            * setStyle
            * show
    */

        method('otherFun', function(fn){
            for(var i = 0, len = this.element.length; i < len; i++){
                fn.call(this, this.element[i]);
            }
            return this;
        }).
        method('setStyle', function(prop, val){
            this.each(function(el){
                el.style[prop] = val;
            });
            return this;
        }).
        method('show', function(){
            var that = this;
            this.each(function(el){
                that.setStyle('display', 'none');
            });
            return this;
        });

    window.installHelper = function(scope, interface){
        scope[interface] = function(){
            return new _$(arguments);
        };
    };
})();

/*
    //处理库中$的冲突问题

    用户可能会这样使用：
    installHelper(window, "$");

    $('example').show();

    也可以将功能添加到实现定义好的命名空间对象中：
    window.com = window.com || {};
    com.example = com.example || {};
    com.example.util = com.example.util || {};

    installHelper(com.example.util, '$');
    (function(){
        var get = com.example.util.get;
        get('example').show();
    })();
*/

```


