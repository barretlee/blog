---
title: 在Javascript中模仿接口（一）
categories:
  - JavaScript
  - 杂物间
tags:
  - tech
  - cnblogs
warning: true
date: 2012-09-22 12:27:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2012/09/22/3049800.html" target="_blank">博客园</a>.</div>

<p><strong>&nbsp;本文从ITeye导入</strong></p>


<p>在JavaScript中模仿接口&mdash;&mdash;本文摘自《JavaScript设计模式》</p>


<p><strong>一、用注释描述接口</strong></p>

```
/*
    interface Composite {
        function add(child);
        function remove(child);
        function getChild(index);
    }

    interface FormItem {
        function save();
    }
*/

var CompositeForm = function(id, method, action){
    //......
};

//Implement the Composite interface.
CompositeForm.prototype.add = function(child){
    //......
}
CompositeForm.prototype.remove = function(child){
    //......
}
CompositeForm.prototype.getChild = function(index){
    //......
}

///Implement the FormItem interface.
CompositeForm.prototype.save = function(){
    //......
}

```

<p>这种模仿并不是很好，他们有为确保CompositeForm真正实现正确的方法集而进行检查，</p>
<p>也不会跑出错误以高质程序员程序中的问题。</p>


<p><strong>二、用属性检查模仿接口</strong></p>

```
/*
        interface Composite {
            function add(child);
            function remove(child);
            function getChild(index);
        }

        interface FormItem {
            function save();
        }
    */

    var CompositeForm = function(id, method, action){
        this.implementsInterfaces = ['Composite', 'FormItem'];
        //......
    }

    function addForm(formInstance){
        if(!implements(formInstance, 'Composite', 'FormItem')){
            throw new Error("Object does not implement a required interface");
        }
        //......
    }

    //The implements function, which checks to see if an object delcares that it
    //implements the required interfaces.

    function implements(object){
        for(var i = 0; i < arguments.length; i++){
            var interfaceName = arguments[i];
            var interfaceFound = false;
            for(var j = 0; j < object.implementsInterface.length; j++){
                if(object.implementsInterface[j] == interfaceName){
                    interfaceFound = true;
                    break;
                }
            }
            if(!interfaceFound){
                return false; //An interface was not found.
            }
        }
        return true; //All interface were found.
    }

```

<p>在这个例子中，CompositeForm宣传自己实现了Composite和FormItem这两个接口，其做法是吧这链各个接口的</p>
<p>名称加入一个名为implement上Interfaces的数组。</p>


<p><strong>三、用鸭式辨型模仿接口</strong></p>



```
//Interfaces

var composite = new Interface('Composite', ['add', 'remove', 'getChild']);
var FormItem = new Interface('FormItem', ['save']);

//CompositeForm class
var CompositeForm = function(id, method, action){
    //........
}

function addForm(formInstancd){
    ensureImplements(formInstance, Composite, FormItem);
    //........
}

```

<p><span>&nbsp;</span></p>
<p>待续......</p>

