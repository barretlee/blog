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
        if(this.cx + this.width <= 0){      //left
            this.ay += 90;
            this.ax += 0;
            this.switchPainter(3);
            this.cx = cSize + this.width - 1;
        }
        if(this.cy <= 0){                   //top
            this.sy = 0;
            this.cy = 4;
        }
        if(this.cy + this.width >= cSize){  //bottom
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
        if(this.cx + this.width <= 0){      //left
            this.ay += 90;
            this.ax += 0;
            this.switchPainter(3);
            this.cx = cSize + this.width - 1;
        }
        if(this.cy <= 0){                   //top
            this.sy = 0;
            this.cy = 4;
        }
        if(this.cy + this.width >= cSize){  //bottom
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
        if(this.tankId >= 2 && randomTank <= tankLimit) createRandomTank();
        delete tanks[this.tankId];
        this.tank.parentNode && this.tank.parentNode.removeChild(this.tank);
        delete this;
    }
}


/**
* @Bullet Tank
* @attrs bullet, timer, gap, x, yadsjsw
*/
var Bullet = function(gA, x, y, tankId){  
    this.bullet = document.createElement("span");
    this.timer  = null;
    this.gap    = 30;
    this.passed = 0;

    var a = Math.cos(gA / 180 * Math.PI - Math.PI / 2), 
        b = Math.sin(gA / 180 * Math.PI - Math.PI / 2);
    if(Math.abs(a) > 1) a = a > 0 ? Math.floor(a) : Math.ceil(a);
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
        if(this.x + 2 <= 0){          //left
            this.bSwitchPainter(3); 
            this.x = cSize + 3;
        }
        if(this.y + 2 <= 0){          //top
            this.destroy();
        }
    },
    move: function(){
        var this_ = this;
        this.timer = setInterval(function(){
            this_.detective();
            this_.x += this_.a * 5;
            this_.y += this_.b * 5;
            this_.checkHit();
            this_.bullet.style.top = this_.y + "px";
            this_.bullet.style.left = this_.x + "px";
        }, this.gap);
    },
    checkHit: function(){
        for (var i in tanks) { 
            if (i == this.tankId) continue;
            if (tanks[i].belong == this.belong) continue;  

            var tx = tanks[i].cx,
                ty = tanks[i].cy,
                bc = this.container.getAttribute("data-v"),
                tc = tanks[i].container.getAttribute("data-v"),
                w = 14;

            if ((bc == tc) && (this.x < tx + w) && (this.x > tx - w) && (this.y < ty + w) && (this.y > ty - w) ) {
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

        if(tTank.life <= 0){
            tTank.destroy();
            console.log("destroyed");
        }
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

/*
function createTank(color){
    var tank = document.createElement("span");
    var circle = document.createElement("span");
    var gun = document.createElement("span");

    gun.setAttribute("class", "gun");
    tank.setAttribute("class", "tank");
    circle.setAttribute("class", "circle");

    gun.style.borderColor = color;
    circle.style.borderColor = color;
    tank.style.cssText = "width:14px;height:18px;position:relative;border-color:" + color;

    tank.appendChild(gun);
    tank.appendChild(circle);

    return tank;
}


function addTankGrade(N){
    var box, color, tank;
    if(N == 0) {
        box = $("#tankBoxA")[0];
        color = "#8500FF";
    }else{
        box = $("#tankBoxB")[0];
        color = "#6D6D27";
    }
    tank = createTank(color);
    box.appendChild(tank);

}
*/
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
        background = "rgba(255,255,255,.6)";
    }
    with(msg.style){
        margin = "0 auto";
        width = "500px";
        height = "400px";
        marginTop = "100px";
        padding = "55px";
        paddingBottom = "110px";
        fontSize = "30px";
        fontFamily = "微软雅黑";
        lineHeight = "40px";
        background = "#D1D1D1";
        borderRadius = "12px";
    }

    msg.innerHTML = msgContent || "空";
    box.appendChild(msg);
    document.body.appendChild(box);
}

showMsg("<b style='color:white'>[测试版本]</b>本版本只实现了一半的功能，最终版本是手机控制，并且有音效、登录验证、坦克可以360°旋转，因为需要配置环境，没有公开。左右边界可以穿过，为3D效果。5枪可以搞定一个坦克。" + 
"<p style='color:yellow;text-align:center'>按键 ctrl+alt+J 开始</p><p>①：WSAD 控制上下左右，J发子弹</p><p>②：↑↓←→ 控制上下左右，p发子弹</p>")

window.onkeydown = function(){
    if(event.ctrlKey && event.altKey && event.keyCode == 74){
        $("#showMsgBox")[0].style.display = "none";
        $("#msgBox")[0].style.display = "none";
        $("#beginSound")[0].setAttribute("autoplay", "true");
        run_debug();
    }
}
