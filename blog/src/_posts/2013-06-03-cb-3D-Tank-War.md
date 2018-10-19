---
title: 3D遥控坦克大战
categories:
  - JavaScript
  - 前端杂烩
tags:
  - tech
  - cnblogs
warning: true
date: 2013-06-03 11:55:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/06/03/3D-Tank-War.html" target="_blank">博客园</a>.</div>

<p><span>昨天参加了hack day的一个比赛，赛制大致是：24小时，自由组队2~4人，任意发挥。运气比较好，拿了第三名和最佳创意奖。</span></p>
<p><span>建议先看看这个demo，bug是有的，chrome下玩玩，测试测试就行，O(&cap;_&cap;)O~</span></p>
<p><span>　　DEMO：<a title="3D tank" href="http://qianduannotes.sinaapp.com/3dtank/html/index.html" target="_blank">http://qianduannotes.sinaapp.com/3dtank/html/index.html</a></span></p>
<p>&nbsp;基本效果:</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/06/03/03235624-efc5a0a6284d45ce867229cc73a5d3f0.png" data-source="http://images.cnitblog.com/blog/387325/201306/03235624-efc5a0a6284d45ce867229cc73a5d3f0.png" alt="" width="573" height="300"></p>


<h3><span>关于</span></h3>
<p><span>懒得去SAE上折腾，没把那另外一半的功能补上，不过我还是介绍下这几个没补上功能吧。</span></p>
<p><span>　　<strong>1. 音效</strong>。开始音乐是比较古老的坦克大战开机音乐。</span></p>
<p><span>　　　　① 开始音效 <a title="start" href="http://qianduannotes.sinaapp.com/3dtank/test.html#begin" target="_blank">点击播放</a></span></p>
<p><span>　　　　② 发子弹 &nbsp; &nbsp;<a title="shoot" href="http://qianduannotes.sinaapp.com/3dtank/test.html#shoot" target="_blank">点击播放</a></span></p>
<p><span>　　　　③ 击中坦克&nbsp;<a title="hit" href="http://qianduannotes.sinaapp.com/3dtank/test.html#hit" target="_blank">点击播放</a></span></p>
<p><span>　　　　④ 爆炸 &nbsp; &nbsp; &nbsp;&nbsp;<a title="explode" href="http://qianduannotes.sinaapp.com/3dtank/test.html#explode" target="_blank">点击播放</a></span></p>
<p><span>　　②和③是自己录制的，呵呵，DIY的东西才好玩。</span></p>


<p><span>　　<strong>2. 登录验证</strong></span></p>
<p><span>　　<img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/06/03/03231602-a2fe0e78de744ae5a32b23132f769107.png" data-source="http://images.cnitblog.com/blog/387325/201306/03231602-a2fe0e78de744ae5a32b23132f769107.png" alt=""></span></p>
<p>　　采用的是解锁，这个创意应该是非常不错的，当登录的时候，A、B玩家下方会生成一个如上图的canvas解锁块，当然这个解锁卡也会通过socket传送到手机遥控端，手机解锁成功后方可登录。</p>
<p>　　<img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/06/03/03231922-39fd5ae76f1041e1a6cd2238b97b6a9b.png" data-source="http://images.cnitblog.com/blog/387325/201306/03231922-39fd5ae76f1041e1a6cd2238b97b6a9b.png" alt="" width="497" height="260"></p>


<p><strong>　　3. 坦克360&deg;旋转</strong></p>
<p>　　由于键盘控制只能上下左右，所以360&deg;是转不出来的..刚想截一张手机控制游戏的图，总是报错...囧（后台用的是php，socket控制信号传输，刚打开手机端网页的时候php socket报错）。<strong></strong></p>
<p>手机遥控端视图：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/06/03/04082543-27c0d64ccf184cd08477d5a2c6b87e2d.png" data-source="http://images.cnitblog.com/blog/387325/201306/04082543-27c0d64ccf184cd08477d5a2c6b87e2d.png" alt=""></p>
<p>　　这里主要利用的是手机多点触控，touchstart,touchmove,touchend这三个事件。</p>

```
function canvasAddListener() {
    canvas.addEventListener('touchstart', onTouchStart, false);
    canvas.addEventListener('touchmove', onTouchMove, false);
    canvas.addEventListener('touchend', onTouchEnd, false);
}

```

<p><span>&nbsp;</span></p>
<p><strong>　　4. 重新开始游戏和打死坦克添加效果等</strong></p>


<p><em>以上都是没有公开显示出来的效果，下次弄好了再上传吧，嘻嘻。</em></p>


<h3>先说说前台</h3>
<p>前台主要采用的是css3和js（这是废话）。</p>
<p><strong>1. css3构建一个3D游戏场地</strong></p>
<p>效果：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/06/03/04000040-cee0817672774eb8bdd6a3a2e14e22f4.png" data-source="http://images.cnitblog.com/blog/387325/201306/04000040-cee0817672774eb8bdd6a3a2e14e22f4.png" alt="" width="339" height="338"></p>

```
.box {
    width:500px;
    height:500px;
    position:relative;
    -webkit-transform-style: preserve-3d;
    /*-webkit-transform: rotateY(40deg);*/
    -webkit-transition:all 1s ease-in-out;
}
.inBox {
    width:300px;
    height:300px;
    overflow: hidden;
    text-align: center;
    box-shadow: 0px 0px 2px white;
    background:rgba(255,255,255,.2);
    /*background:#779443;*/
    position:absolute;
    top:100px;
    left:100px;
    color:white;
}
.box-forward {
    -webkit-transform: rotateY(0deg) translateZ(150px);
}
.box-back {
    -webkit-transform: rotateY(180deg) translateZ(150px);
}
.box-left {
    -webkit-transform: rotateY(270deg) translateZ(150px);
}
.box-right {
    -webkit-transform: rotateY(90deg) translateZ(150px);
}
.box-top {
    -webkit-transform:rotateX(90deg) translateZ(150px);
}
.box-bottom {
    -webkit-transform:rotateX(-90deg) translateZ(150px);
}

```

<p>上面是css部分，比赛过程中，参看了下张鑫旭大哥的文章（之前这块还不是很了解的），<a title="好吧，CSS3 3D transform变换，不过如此！" href="http://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/" target="_blank">文章链接</a>。就不细说了。</p>
<p>下面是HTML部分：</p>

```
<div class="w">
    <div class="box">
        <div class="inBox box-forward" data-num="upF rightF downF leftF" data-v="1"><div></div></div>
        <div class="inBox box-back" data-num="upF leftF downF rightF" data-v="2"><div></div></div>
        <div class="inBox box-left" data-num="upF forwardF downF backF" data-v="3"><div></div></div>
        <div class="inBox box-right" data-num="upF backF downF forwardF" data-v="4"><div></div></div>
        <div class="inBox box-top" data-num="backF rightF forwardF leftF" data-v="5"><div></div></div>
        <div class="inBox box-bottom" data-num="backF leftF forwardF rightF" data-v="6"><div></div></div>
    </div>
</div>

```



<p><strong>2. JS这块，写了比较多。</strong></p>

```

var $ = document.querySelectorAll.bind(document);

/**
* @description core part
* @author hustskyking
*/
var faces = $(".inBox"),
    bloodA = $(".bloodA div")[0],
    bloodB = $(".bloodB div")[0],

    box = $(".box")[0],
    upF = $(".box-top")[0],
    downF = $(".box-bottom")[0],
    leftF = $(".box-left")[0],
    rightF = $(".box-right")[0],
    forwardF = $(".box-forward")[0],
    backF = $(".box-back")[0],

    cSize = upF.clientWidth,
    datas = {
        "upF": upF,
        "downF": downF,
        "leftF": leftF,
        "rightF": rightF,
        "forwardF": forwardF,
        "backF": backF
    },
    stopN = 0,
    tanks = {},
    randomTank = 2,
    tankLimit  = 20,
                    //a   w   d  s   j      ←   ↑   →  ↓   p
    debug_keySet = [[65, 87, 68, 83, 74], [37, 38, 39, 40, 80]];

/**
* @Class Tank
* @attrs width, height, currentX, currentY, speedX, speedY, angleX, angleY, plusy, plusx
*        container, dataset, stopN, tank, tankId, life, bulletBox, color, timerLimit, timer, gap,
         sTime
*/
var Tank = function(setting){
    var opts = setting || {};
    this.container = opts.container || forwardF;
    this.dataset   = this.container.getAttribute('data-num').split(" ");
    this.belong = 0;
    this.grade  = 0;
    this.debug  = false;
    this.width  = opts.width || 14;
    this.height = opts.height || 18;
    this.stopN  = "keyup" + (window.stopN++);
    this.gap    = opts.gap || 30;
    this.speed  = opts.speed || 3;
    this.ax     = 0;
    this.ay     = 0;
    this.cx     = opts.cx || (cSize - this.width) / 2;
    this.cy     = opts.cy || (cSize - this.height) / 2;
    this.sx     = 0;
    this.sy     = 0;

    this.tank   = null;
    this.tankId = "";
    this.life   = 100;
    this.color  = opts.color || "#0047B3";

    this.bulletBox = [];
    this.bColor = opts.bColor || "#0047B3";
    this.timerLimit= 400;
    this.gunAngle  = 0;
    this.timer     = null;
    this.sTime     = 0;
}

Tank.prototype = {
    init: function(tankId, debug){
        if(tankId){
            this.tankId = tankId;
            this.belong = (Number(tankId) > 2 ? 2 :Number(tankId));
        }else{
            throw new Error("必须设置tank ID");
        }

        var this_ = this;

        //绘制坦克
        this.paintTank();

        if(debug){
            this.debug = true;
            this.keySet = debug.keySet;
            window.addEventListener("keydown", function(){
                this_.move_debug();
            }, false);
        }

        window.addEventListener(this.stopN, function(){
            clearInterval(this_.timer);
        }, false);

    },
    paintTank: function(){
        var tank = document.createElement("span");
        var circle = document.createElement("span");
        var gun = document.createElement("span");

        gun.setAttribute("class", "gun");
        tank.setAttribute("class", "tank");
        circle.setAttribute("class", "circle");
        tank.setAttribute("id", "tank" + this.tankId);

        gun.style.borderColor = this.color;
        circle.style.borderColor = this.color;
        tank.style.cssText = "width:" + this.width + "px;height:" + this.height +
                             "px;top:" + this.cy + "px;left:" + this.cx + "px;border-color:"
                             + this.color;

        tank.appendChild(gun);
        tank.appendChild(circle);

        this.container.getElementsByTagName("div")[0].appendChild(tank);

        this.tank = tank;

        return tank;
    },
    switchPainter: function(N){
        //N  1->up 2->right 3->down 4->down
        this.ay %= 360;
        var r = false,
            a = 0;
        if (this.ay > 180) {
            this.ay -= 360;
            r = true;
        }
        if (this.ay < -180) this.ay += 360;
        this.container = datas[this.dataset[N]];
        this.dataset   = this.container.getAttribute('data-num').split(" ");
        this.container.getElementsByTagName("div")[0].appendChild(this.tank);
        if(this.belong >= 2) return;

        box.style.cssText = "-webkit-transform: rotateY(" + (this.ay + (r ? -a : a)) + "deg);";
    },
    setAngle: function(x, y, ang){
        this.sx = x;
        this.sy = y;
        this.gunAngle = 90 - ang / Math.PI * 180;
        $("#tank" + this.tankId)[0].style.cssText += "-webkit-transform: rotate(" + this.gunAngle + "deg);";
    },
    move: function(ang){
        this.setAngle(Math.cos(ang), -Math.sin(ang), ang);

        this.stopAni();
        this.ani();
    },
    direction_debug: function(){
        switch(event.keyCode) {
            case this.keySet[0]:
                return "left";
            case this.keySet[1]:
                return "up";
            case this.keySet[2]:
                return "right";
            case this.keySet[3]:
                return "down";
            case this.keySet[4]:
                return "shooter";
        }
    },
    move_debug: function(){
        this.stopAni();
        switch(this.direction_debug()) {
            case "up":
                console.log("up");
                this.setAngle(0, -1, Math.PI / 2);
                this.gunAngle_debug = 0;
                break;
            case "down":
                console.log("down");
                this.setAngle(0, 1, Math.PI / 2 * 3);
                this.gunAngle_debug = 180;
                break;
            case "left":
                console.log("left");
                this.setAngle(-1, 0, Math.PI);
                this.gunAngle_debug = 90;
                break;
            case "right":
                console.log("right");
                this.setAngle(1, 0, Math.PI * 2);
                this.gunAngle_debug = -90;
                break;
            case "shooter":
                console.log("shooter");
                this.shooter();
            default:
                return;
        }
        this.ani();
    },
    ani: function(){
        var this_ = this;
        this.timer = setInterval(function(){
            this_.detective();
            // this_.detectiveTank();  

            this_.cx += this_.sx * this_.speed;
            this_.cy += this_.sy * this_.speed;

            this_.detective();

            this_.tank.style.top = this_.cy + "px";
            this_.tank.style.left = this_.cx + "px";

        }, this.gap);
    },
    stopAni: function(){
        var event = document.createEvent('HTMLEvents');
        event.initEvent(this.stopN, true, true);
    　　event.eventName = this.stopN;
        window.dispatchEvent(event);
    },
    detective: function(){
        if(this.cx - this.width >= cSize){  //right
            this.ay += -90;
            this.ax += 0;
            this.switchPainter(1);
            this.cx = 1;
        }
        if(this.cx + this.width <= 0){="" left="" this.ay="" +="90;" this.ax="" this.switchpainter(3);="" this.cx="cSize" this.width="" -="" 1;="" }="" if(this.cy="" <="0){" top="" this.sy="0;" this.cy="4;">= cSize){  //bottom
            this.sy = 0;
            this.cy = cSize - this.width - 8;
        }
    },

    detectiveTank: function(){

        if(this.cx - this.width >= cSize){  //right
            this.ay += -90;
            this.ax += 0;
            this.switchPainter(1);
            this.cx = 1;
        }
        if(this.cx + this.width <= 0){="" left="" this.ay="" +="90;" this.ax="" this.switchpainter(3);="" this.cx="cSize" this.width="" -="" 1;="" }="" if(this.cy="" <="0){" top="" this.sy="0;" this.cy="4;">= cSize){  //bottom
            this.sy = 0;
            this.cy = cSize - this.width - 8;
        }
    },

    shooter: function(){
        if((new Date()).getTime() - this.sTime < this.timerLimit) return;
        var bullet = new Bullet(this.gunAngle, this.cx, this.cy, this.tankId);
        this.container.getElementsByTagName("div")[0].appendChild(bullet.bullet);
        bullet.move();
        this.sTime = (new Date()).getTime();
    },
    destroy: function(){
        this.stopAni();
        this.shooterTimer && clearInterval(this.shooterTimer);
        this.moveTimer && clearInterval(this.moveTimer);
        if(this.tankId >= 2 && randomTank <= 180="" tanklimit)="" createrandomtank();="" delete="" tanks[this.tankid];="" this.tank.parentnode="" &&="" this.tank.parentnode.removechild(this.tank);="" this;="" }="" **="" *="" @bullet="" tank="" @attrs="" bullet,="" timer,="" gap,="" x,="" yadsjsw="" var="" bullet="function(gA," y,="" tankid){="" this.bullet="document.createElement("span");" this.timer="null;" this.gap="30;" this.passed="0;" a="Math.cos(gA" math.pi="" -="" 2),="" b="Math.sin(gA" 2);="" if(math.abs(a)=""> 1) a = a > 0 ? Math.floor(a) : Math.ceil(a);
    if(Math.abs(b) > 1) b = b > 0 ? Math.floor(b) : Math.ceil(b);
    this.a = a;
    this.b = b;

    this.x = x + 6;
    this.y = y + 7;
    this.bullet.setAttribute("class", "bullet");
    this.bullet.style.top = -10 + "px";
    this.bullet.style.left = -10 + "px";
    this.bullet.style.borderColor = tanks[tankId].bColor;
    this.tankId = tankId;
    this.container = $("#tank" + this.tankId)[0].parentNode.parentNode;
    this.belong = tanks[this.tankId].belong;
}
Bullet.prototype = {
    bSwitchPainter: function(N){
        this.container = this.bullet.parentNode.parentNode;
        this.dataset   = this.container.getAttribute('data-num').split(" ");
        this.container = datas[this.dataset[N]];
        this.dataset   = this.container.getAttribute('data-num').split(" ");
        this.container.getElementsByTagName("div")[0].appendChild(this.bullet);
        this.passed++;
        if(this.passed == 4){
            this.destroy();
        }
    },
    detective: function(){
        if(this.x - 2 >= cSize){      //right
            this.bSwitchPainter(1);
            this.x = 1;
        }
        if(this.y - 2 >= cSize){      //bottom
            this.destroy();
        }
        if(this.x + 2 <= 2="" 0){="" left="" this.bswitchpainter(3);="" this.x="cSize" +="" 3;="" }="" if(this.y="" <="0){" top="" this.destroy();="" },="" move:="" function(){="" var="" this_="this;" this.timer="setInterval(function(){" this_.detective();="" this_.x="" *="" 5;="" this_.y="" this_.checkhit();="" this_.bullet.style.top="this_.y" "px";="" this_.bullet.style.left="this_.x" this.gap);="" checkhit:="" for="" (var="" i="" in="" tanks)="" {="" if="" (i="=" this.tankid)="" continue;="" (tanks[i].belong="=" this.belong)="" tx="tanks[i].cx," ty="tanks[i].cy," bc="this.container.getAttribute("data-v")," tc="tanks[i].container.getAttribute("data-v")," w="14;" ((bc="=" tc)="" &&="" (this.x="" w)=""> tx - w) && (this.y < ty + w) && (this.y > ty - w) ) {
                console.log(i, tanks[i].life);
                this.hit(tanks[i]);
                this.destroy();
            }
        }
    },
    hit: function(tTank){
        tTank.life -= 20;
        if(tTank.belong == 0){
            console.log("1掉血");
            bloodA.style.bottom = 300 * tTank.life / 100 + "px";
            if(tTank.life == 0){
                setTimeout(function(){
                    $(".pujieL")[0].style.display = "block";
                }, 2000);
            }
        }else if(tTank.belong == 1){
            console.log("2掉血");
            bloodB.style.bottom = 300 * tTank.life / 100 + "px";
            if(tTank.life == 0){
                setTimeout(function(){
                    $(".pujieR")[0].style.display = "block";
                }, 2000);
            }
        }else {
            var add = 5;
            if(tanks[this.tankId].belong == 0){
                if(tTank.life == 0){
                    add = 20;
                    //window.addTankGrade(0);
                }
                tanks[this.tankId].grade += add;
                $("#gradeA")[0].innerHTML = tanks[this.tankId].grade;
            }else{
                if(tTank.life == 0){
                    add = 20;
                    //window.addTankGrade(1);
                }
                tanks[this.tankId].grade += add;
                $("#gradeB")[0].innerHTML = tanks[this.tankId].grade;
            }
        }

        if(tTank.life <= 0){="" ttank.destroy();="" console.log("destroyed");="" }="" },="" destroy:="" function(){="" clearinterval(this.timer);="" if="" (typeof="" tanks[this.tankid]="" !="undefined" )="" {="" var="" tankarr="tanks[this.tankId].bulletBox;" tankarr.splice(tankarr.indexof(this),1);="" this.bullet.parentnode="" &&="" this.bullet.parentnode.removechild(this.bullet);="" *="" function="" createtank(color){="" tank="document.createElement("span");" circle="document.createElement("span");" gun="document.createElement("span");" gun.setattribute("class",="" "gun");="" tank.setattribute("class",="" "tank");="" circle.setattribute("class",="" "circle");="" gun.style.bordercolor="color;" circle.style.bordercolor="color;" tank.style.csstext="width:14px;height:18px;position:relative;border-color:" +="" color;="" tank.appendchild(gun);="" tank.appendchild(circle);="" return="" tank;="" addtankgrade(n){="" box,="" color,="" if(n="=" 0)="" box="$("#tankBoxA")[0];" color="#8500FF" ;="" }else{="" box.appendchild(tank);="" createrandomtank(obj)="" obj="obj" ||="" {cx:="" 150,="" cy:="" color:"#ecff0b",="" bcolor:"#ecff0b",="" speed:="" 1,="" container:="" backf};="" rtank="new" tank(obj);="" rtank.init(string(randomtank));="" rtank.shootertimer="null;" if(math.random()=""> 0.8){
            rTank.shooter();
        }
    }, 200);

    rTank.moveTimer = null;
    rTank.moveTimer = setInterval(function(){
        if(Math.random() > 0.4){
            var ang = Math.PI * 2 * Math.random();
            rTank.move.call(rTank, ang);
        }
    }, 1200);
    tanks[randomTank] = rTank;
    randomTank++;
}

function run_debug(){
    tanks[0] = new Tank({cx: 50, cy: 220, color:"red", bColor:"red"});
    tanks[0].init('0', {
        keySet:debug_keySet[0]
    });
    tanks[1] = new Tank();
    tanks[1].init('1', {
        keySet:debug_keySet[1]
    });

    createRandomTank({cx: 250, cy: 220, color:"#ECFF0B", bColor:"#ECFF0B", speed: 1, container: backF});
    createRandomTank({cx: 220, cy: 220, color:"#ECFF0B", bColor:"#ECFF0B", speed: 1, container: backF});
    createRandomTank({cx: 190, cy: 220, color:"#ECFF0B", bColor:"#ECFF0B", speed: 1, container: backF});
    createRandomTank({cx: 160, cy: 220, color:"#ECFF0B", bColor:"#ECFF0B", speed: 1, container: backF});
    createRandomTank({cx: 130, cy: 220, color:"#ECFF0B", bColor:"#ECFF0B", speed: 1, container: backF});
    createRandomTank({cx: 100, cy: 220, color:"#ECFF0B", bColor:"#ECFF0B", speed: 1, container: backF});
}

/*
window.onload = function(){
    var layer = document.createElement("div");
    layer.setAttribute("id", "layer");

    var stripe = document.createElement("div");
    stripe.setAttribute("id", "stripe");

    stripe.style.top = (document.clientHeight - 250) / 2 + "px";

    document.body.appendChild(layer);
    document.body.appendChild(stripe);
}*/
$("#gradeA")[0].innerHTML = $("#gradeB")[0].innerHTML = 0;

//run_debug();

function showMsg(msgContent){
    var box = document.createElement("div");
    var msg = document.createElement("div");
    box.setAttribute("id", "showMsgBox");
    msg.setAttribute("id", "msgBox");
    with(box.style){
        position = "absolute";
        top = 0;
        left = 0;
        bottom = 0;
        right = 0;
    }
    with(msg.style){
        margin = "0 auto";
        width = "500px";
        height = "400px";
        marginTop = "100px";
        padding = "55px";
        fontSize = "30px";
        fontFamily = "微软雅黑";
        lineHeight = "40px";
    }

    msg.innerHTML = msgContent || "空";
    box.appendChild(msg);
    document.body.appendChild(box);
}

showMsg("<b>[测试版本]</b>本版本只实现了一半的功能，最终版本是手机控制，并且有音效、登录验证、坦克可以360&deg;旋转，因为需要配置环境，没有公开。左右边界可以穿过，为3D效果。5枪可以搞定一个坦克。" +
"<p>按键 ctrl+alt+J 开始</p><p>①：WSAD 控制上下左右，J发子弹</p><p>②：↑↓←→ 控制上下左右，p发子弹</p>")

window.onkeydown = function(){
    if(event.ctrlKey && event.altKey && event.keyCode == 74){
        $("#showMsgBox")[0].style.display = "none";
        $("#msgBox")[0].style.display = "none";
        run_debug();
    }
}

3D Tank JavaScript
```
</=></=></=></=></=>
<p>拆开分析下：</p>
<p>　　<strong>① Tank对象</strong></p>
<p>DIY坦克（还行，哈哈哈~）：</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/06/03/04000220-9eec8435edc64f18a644e960407fc644.png" data-source="http://images.cnitblog.com/blog/387325/201306/04000220-9eec8435edc64f18a644e960407fc644.png" alt=""></p>

```
var Tank = function(setting){
    var opts = setting || {};
    this.container = opts.container || forwardF;
    this.dataset   = this.container.getAttribute('data-num').split(" ");
       //....
}

Tank.prototype = {
    init: function(tankId, debug){
        //....

        if(debug){
            this.debug = true;
            this.keySet = debug.keySet;
            window.addEventListener("keydown", function(){
                this_.move_debug();
            }, false);
        }

        window.addEventListener(this.stopN, function(){
            clearInterval(this_.timer);
        }, false);

    },
    paintTank: function(){
       //....
    },
    switchPainter: function(N){
        //....
    },
    direction_debug: function(){
        //....
    },
    move_debug: function(){
        //....
    },
    ani: function(){
        //....
    },
    stopAni: function(){
        var event = document.createEvent('HTMLEvents');
        event.initEvent(this.stopN, true, true);
    　　event.eventName = this.stopN;
        window.dispatchEvent(event);
    },
    detective: function(){
        //....
    },

    detectiveTank: function(){

       //....
    },

    shooter: function(){
       //....
    },
    destroy: function(){
       //....
    }
}

```

<p>　　</p>
<p>　　难点在于一些边界的判断，但是好好考虑下也不算什么难点咯~这些代码中应该看到了很多debug之类的变量和函数，因为我写了两种模式，一种是手机端玩，一中是电脑键盘控制（debug模式）。</p>


<p><strong>　　②子弹对象</strong></p>

```
/**
* @Bullet Tank
* @attrs bullet, timer, gap, x, yadsjsw
*/
var Bullet = function(gA, x, y, tankId){
           //....
};Bullet.prototype = {
    move: function(){
         //....
    },
    checkHit: function(){
         //....
    },
    hit: function(tTank){
        //....
    },
    destroy: function(){
        clearInterval(this.timer);
        if (typeof tanks[this.tankId] != 'undefined') {
            var tankArr = tanks[this.tankId].bulletBox;
            tankArr.splice(tankArr.indexOf(this),1);
        }
        this.bullet.parentNode && this.bullet.parentNode.removeChild(this.bullet);
    }
}

```



<p>&nbsp;　　和坦克一样，都有一个destroy函数，销毁对象。</p>


<p><strong>　　③ 构建AI对象</strong></p>

```
function createRandomTank(obj) {
    var obj = obj || {cx: 150, cy: 150, color:"#ECFF0B", bColor:"#ECFF0B", speed: 1, container: backF};
    var rTank = new Tank(obj);
    rTank.init(String(randomTank));
    rTank.shooterTimer = null;
    rTank.shooterTimer = setInterval(function(){
        if(Math.random() > 0.8){
            rTank.shooter();
        }
    }, 200);

    rTank.moveTimer = null;
    rTank.moveTimer = setInterval(function(){
        if(Math.random() > 0.4){
            var ang = Math.PI * 2 * Math.random();
            rTank.move.call(rTank, ang);
        }
    }, 1200);
    tanks[randomTank] = rTank;
    randomTank++;
}

```



<p>　　机器人是个麻烦的东西，这块虽然不难，销毁他们的时候费了不少力气~~~主要是那么timer要跟着一起销毁。</p>


<p><strong>　　④ 构建对象说明</strong></p>

```
tanks[0] = new Tank({cx: 50, cy: 220, color:"red", bColor:"red"});
tanks[0].init('0', {
    keySet:debug_keySet[0]
});

```

<p>　　这里需要说明一下，只要init后面加了第二个参数，就是调试模式，也就是说键盘是可以控制运行的。</p>
<p>　　设置了一个全局变量</p>

```
                //a   w   d  s   j      ←   ↑   →  ↓   p
debug_keySet = [[65, 87, 68, 83, 74], [37, 38, 39, 40, 80]];

```



<p><strong>3. socket这块</strong></p>
<p>　　整个平台信息的交互就是以他为核心，socket这个东西还算比较新，所以学习的时候也没找到太多的资料，只能对着w3c的一些文档边试边做。</p>

```
var socket;
function ws_init() {
    var host = "ws://192.168.86.1:1111/";
    // var host = "ws://202.114.20.79:1111/";
    try {
        socket = new WebSocket(host);
        logMsg('WebSocket - status '+socket.readyState);
        socket.onopen    = function(msg) { logMsg("Welcome - status "+this.readyState); send('display'); };
        socket.onclose   = function(msg) { logMsg("Disconnected - status "+this.readyState); };
        socket.onmessage = function(msg) { //.... };
    } catch(ex) {
        logMsg(ex);
    }
}
function send(msg) {
    try　{
        socket.send(msg + '=');
    } catch(ex) {
        logMsg(ex);
    }
}

```

<p>　　socket在前端部分是非常简单的，就是三个事件onopen, onclose, onmessage来驱动，重点还是后台操作，真心麻烦！</p>


<h3><strong>后台部分</strong></h3>
<p>后台用的是php，本来打算使用nodeJS，不是十分熟练，24个小时的赛制花太长时间去学习也不现实，所以就用了比较熟悉的php来建立socket连接，还算成功吧。</p>
<p>这个部分以后有时间说。先碎觉~~</p>


<p>最后，别忘了这个DEMO哦，&nbsp;<a title="3D tank" href="http://qianduannotes.sinaapp.com/3dtank/html/index.html" target="_blank">http://qianduannotes.sinaapp.com/3dtank/html/index.html</a></p>



