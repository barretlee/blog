---
title: 解读jQuery中extend函数
categories:
  - JavaScript
  - 杂物间
tags:
  - tech
  - cnblogs
warning: true
date: 2013-07-20 01:59:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/07/20/extend-in-jQuery.html" target="_blank">博客园</a>.</div>


```
$.extend.apply( null, [ true, { "a" : 1, "b" : 2 } ] );//console.log(window.a);//window.location.reload();
$.extend.apply( null, [ true, { "a" : 1, "b" : 2 } ].concat( { "c" : 3, "d" : 4 } ) );
//console.log(window.a)

```

<p><strong>一、问题：</strong></p>
<p>　　1. null在这里是干啥？</p>
<p>　　2. window.a分别是什么？</p>


<p><strong>二、我们先一起来了解下jQuery中的extend函数</strong></p>
<p>&nbsp;在jQuery-V1.2.6中：</p>

```

jQuery.extend = jQuery.fn.extend = function() {
    // copy reference to target object
    var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options;

    // Handle a deep copy situation
    if ( target.constructor == Boolean ) {
        deep = target;
        target = arguments[1] || {};
        // skip the boolean and the target
        i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target != "object" && typeof target != "function" )
        target = {};

    // extend jQuery itself if only one argument is passed
    if ( length == i ) {
        target = this;
        --i;
    }

    for ( ; i < length; i++ )
        // Only deal with non-null/undefined values
        if ( (options = arguments[ i ]) != null )
            // Extend the base object
            for ( var name in options ) {
                var src = target[ name ], copy = options[ name ];

                // Prevent never-ending loop
                if ( target === copy )
                    continue;

                // Recurse if we're merging object values
                if ( deep && copy && typeof copy == "object" && !copy.nodeType )
                    target[ name ] = jQuery.extend( deep,
                        // Never move original objects, clone them
                        src || ( copy.length != null ? [ ] : { } )
                    , copy );

                // Don't bring in undefined values
                else if ( copy !== undefined )
                    target[ name ] = copy;

            }

    // Return the modified object
    return target;
};

jQuery - v1.2.6 extend
```



<p>在jQuery-V1.8.2中：</p>

```

jQuery.extend = jQuery.fn.extend = function() {
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
        deep = target;
        target = arguments[1] || {};
        // skip the boolean and the target
        i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
        target = {};
    }

    // extend jQuery itself if only one argument is passed
    if ( length === i ) {
        target = this;
        --i;
    }

    for ( ; i < length; i++ ) {
        // Only deal with non-null/undefined values
        if ( (options = arguments[ i ]) != null ) {
            // Extend the base object
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];

                // Prevent never-ending loop
                if ( target === copy ) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))){
                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && jQuery.isArray(src) ? src : [];

                    } else {
                        clone = src && jQuery.isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[ name ] = jQuery.extend( deep, clone, copy );

                // Don't bring in undefined values
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};

jQuery - V1.8.2 extend
```



<p>&nbsp;比较两个版本的jQuery，extend函数总体构架上基本没有变化，高版本中写代码更加规范了，很多var变量都前置（这是比较好的编码习惯，当然，也是为了方便压缩工具对代码进行压缩）。</p>
<p>jQuery.fn.extend就是把extend函数绑定到他的原型链中。这样一来，既可以作为静态函数在$上直接引用($.extend)，也可以在$(obj)上使用extend。</p>
<ul>
<li><a href="http://api.jquery.com/jQuery.extend/" target="_blank">jQuery.extend() API文档</a></li>
<li><a href="http://api.jquery.com/jQuery.fn.extend/" target="_blank">jQuery.fn.extend() API文档</a></li>
</ul>
<p><em>注意，如果函数没有在原型链上绑定，是不能被\继承"的！</em></p>


<p>代码大概的意思就是：</p>

```
　　第一个参数是boolean类型 ---------> 深度递归复制
               |
               |
               ---------> 如果只有一个参数（除第一个boolean）---------> 将函数的this环境extend进去
                                       |
                                       |
                                       ---------> 将后面的参数extend到\第一个"参数中 ---------> 返回\第一个"参数

```



<p><strong>三、问题解释</strong></p>
<ul>
<li><strong>&nbsp;第一个问题中，</strong></li>
</ul>

```
$.extend.apply( null, [ true, { "a" : 1, "b" : 2 } ] );

```

<p>extend作为一个静态函数被调用，null被绑定，但是因为满足\只有一个"参数（boolean除外）的条件 ， 将函数的this环境（window）extend进去，return的对象就是window对象，所以得到的结果是</p>

```
window 
<p><span>即，window.a = 1</span></p>
<p>&nbsp;<img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/07/20/20134313-96862ff8cfa84a72a7ef6ab81b6d66a6.jpg" data-source="http://images.cnitblog.com/blog/387325/201307/20134313-96862ff8cfa84a72a7ef6ab81b6d66a6.jpg" alt=""></p>


<ul>
<li><strong><span>第二个问题中，</span></strong></li>
</ul>

```
$.extend.apply( null, [ true, { "a" : 1, "b" : 2 } ].concat( { "c" : 3, "d" : 4 } ) );

```

<p>相当于传入三个参数，第一个是true，第二个是 匿名对象{ "a" : 1, "b" : 2 }，第三个是匿名对象{ "c" : 3, "d" : 4 }, 此时的this环境是null（因为将函数绑定到null上面了）。</p>
<p>那么结果就是{ "a" : 1, "b" : 2,&nbsp;"c" : 3, "d" : 4 }, 此刻并不能在window中索引到a这个属性</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/07/20/20134220-8b0da1f1b68c41d190e65c9925dca2c4.jpg" data-source="http://images.cnitblog.com/blog/387325/201307/20134220-8b0da1f1b68c41d190e65c9925dca2c4.jpg" alt=""></p>
<p>如要想要访问，那便是null.a，但这种访问方式肯定是不对的。</p>
<p>由于没有变量来接收这个返回的值，所以被作为垃圾给回收了。</p>


<p>有兴趣的童鞋可以试试这个：</p>

```
$.extend.apply( $, [ true, { "a" : 1, "b" : 2 } ] );
$.extend.apply( $, [ true, { "a" : 1, "b" : 2 } ].concat( { "c" : 3, "d" : 4 } ) );

```

<p>把$作为当前的环境，看看a被绑定在那个元素上了~</p>


<p><strong>&nbsp;四、小结</strong></p>
<p>　　jQuery是一个非常优秀的JS库，也是前辈们学习JS后经验的总结和思想的结晶，从jQuery1.2版本到现在的2.0版本，代码风格上、函数处理方式上有比较明显的改变，很值得花些功夫去研究。学习的过程中多看看ta们的编码风格、编码规范，了解库的整体构架和实现原理，这样应该会有比较大的提升~</p>
<p>　　我觉得前端这方面想独树一帜，就必须在代码中体现自己的思想。</p>



