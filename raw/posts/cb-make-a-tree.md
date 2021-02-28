---
title: JS动态构建一棵目录树
categories:
  - JavaScript
  - 杂物间
tags:
  - tech
  - cnblogs
  - tree
warning: true
date: 2013-04-22 11:17:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/04/22/make-a-tree.html" target="_blank">博客园</a>.</div>

<p>在使用frameset布局的时候，经常会用到目录树，我们可以把一棵树写死，但是更多的情况是，这棵树需要随时被改动，所以我们期望的是他能够被动态的构建。</p>
<p>MVC，算是了解一点，那本文就把这棵树根据M-V-C给拆开分解吧。</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/04/22/22110251-818c9f213e1241cf8c88b5a769638ede.png" data-source="http://images.cnitblog.com/blog/387325/201304/22110251-818c9f213e1241cf8c88b5a769638ede.png" alt=""></p>
<p><a title="DEMO" href="http://qianduannotes.sinaapp.com/test/tree.html" target="_blank">点击链接demo→</a></p>
<p>下面就来看看这棵树是怎么构建的。　</p>
<p>　</p>
<h3>Module [数据层]</h3>

```
var tree = {
            "id": 0,
            "a1": {
                "id": 1,
                "name": "a1",
                "children": {
                    "b1": "b1_1",
                    "b2": "b1_2",
                    "b3": "b1_3"
                }
            },
            "a2": {
                "id": 1,
                "name": "a2",
                "children": {}
            },
            "a3": {
                "id": 1,
                "name": "a3",
                "children": {
                    "b1": "b3_1",
                    "b2": "b3_2",
                    "b3": "b3_3"
                }
            }
        };

```

<p>这是一颗两层的目录树，用ID来表示层级关系，name来表示改层的名字（也就是节点Text内容吧）。</p>


<h3>Control [控制层]</h3>

```
var Tree = function ( module ){
    function createNodeList( obj ) {
        //创建ul节点和documentFragmeng中间变量
        var n = document.createElement("ul"),
            docfrag = document.createDocumentFragment();

        //判断obj是根节点还是孩子节点
        if(obj.id == 0) {
            n.setAttribute("class", "tree_0");

            for(var key in obj) {
                if(key == "id") continue;
                //将节点插入
                var c = document.createElement("li"),
                    span = document.createElement("span");
                span.appendChild(document.createTextNode( obj[key].name ));
                c.appendChild(span);
                docfrag.appendChild( c );
            }
        }else if(obj.id && obj.id == 1) {
            n.setAttribute("class", "tree_1");

            for(var key in obj) {
                if(key == "id" || key == "name" || !obj.children) continue;
                for( var item in obj.children){
                    //将节点插入
                    var c = document.createElement("li");
                    c.appendChild(document.createTextNode( obj.children[item] ));
                    docfrag.appendChild( c );
                }
            }
        }
        n.appendChild( docfrag );
        //返回开始构建的ul节点
        return n;
    }

    //隐藏及显示 工具函数
    function toggle(c){
        c.style.display = ((c.style.display == "none") ? "" : "none");
    }

    function createTree( obj ) {
        var root, child, count = 0;

        root = createNodeList( obj );
        for(var key in obj){
            if(obj[key] == "id" || !obj[key].children) continue;
            child = createNodeList(obj[key]);
            root.children[count].appendChild( child );
            //count来判断插入的位置
            count++;
        }
        return root;
    }

    var T = createTree(module);
    var list = T.children;
    for(var i = 0, len = list.length; i < len; i++){
        list[i].getElementsByTagName("span")[0].onclick = function(){
            var obj = this.nextSibling;
            toggle(obj);
        }
    }
    return T;
}

```

<p>这里边创建了三个函数，其中</p>

```
createNodeList() //适用于构建一个树子节点

```

<p>其中使用documentFragment作为一个节点缓存器，先把节点放置到documentFragment中，然后统一插入到ul，这也是比较常用的使用方式。</p>

```
createTree() //构建一棵树

```

<p>基本整棵树的构建就是分为这两步，前者负责创建一个子节点，后者构建一棵树。</p>
<p>在这颗树中绑定了click事件，让其可以折叠，当然也可以在Tree这个类里绑定更多的方法，这个就靠自己发挥了。</p>


<h3>View [视图层]</h3>

```
window.onload = function(){
    var T = new Tree(tree);
    document.getElementsByTagName("body")[0].appendChild(T);
}

```



<p>整棵树的构建，主要用到的是DOM元素的处理，这个必须牢牢掌握！</p>