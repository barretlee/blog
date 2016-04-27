(function(window, DOC, undefined){
    // Game
    var Game = {
        debug: true, 
        settings: {
            width: 600,
            height: 1200,
            iWidth: 400,
            iHeight: 800
        },
        v0: 100,
        nowPos: {x:100, y:-200, z:80},
        ball: DOC.querySelector("#ball"),
        speed: {},
        log: function(msg){
            if(!this.debug) return;
            console.log(msg);
        },
        // 初始化
        init: function(pos, speed){
            this.nowPos = pos || {x:100, y:-200, z:80};
            this.speed = speed || {vx: 100, vy: 220};

            this.setPos(this.nowPos);
            this.move(2);
        },
        // render位置，绘图
        setPos: function(pos, other){
            // var perspective = 600;
            var css = "-webkit-transform: " +
                      // "perspective(" + perspective + "px) " +
                      "translateX(" + pos.x + "px) " +
                      "translateY(" + pos.y + "px) " +
                      "translateZ(" + pos.z + "px);" + 
                      (other || "");
            this.ball.style.cssText = css;
        },
        // 对手视觉，坐标转换
        exchangePos: function(pos){
            return {
                x: this.settings.width - pos.x,
                y: this.settings.height - pos.y,
                z: pos.z
            }
        },
        // 运动轨迹函数
        trail: function(pos, speed, t){
            var t = t / 1000;
            return {
                x: pos.x + speed.vx * t,
                y: pos.y - speed.vy * t,
                z: pos.z + this.v0 * t - 1 / 2 * 10 * t * t
            }
        },
        // 出界判断
        outRange: function(){
            if(this.nowPos.x <  this.settings.iWidth || 
                Math.abs(this.nowPos.y) < this.settings.iHeight){
                return false;
            }
            return true;
        },
        // 移动动画
        move: function(t, flag){
            var t = t || 2;
            var self = this, time = 0, origin = self.nowPos;

            function ani(){
                // console.log(time, t * 1000)
                if(time >= t * 1000) {
                    if(self.outRange()) console.log("%cout of range", "color:red");
                    // 反弹
                    self.rebound();
                    return;
                }
                time += 1000 / 60;
                setTimeout(function(){
                    self.nowPos = self.trail(origin, self.speed, time);
                    self.setPos(self.nowPos, flag && "background:yellow;");
                    ani();
                }, 1000/60);
            }
            ani();
        },
        // 反弹
        rebound: function(speed){
            if(!this.reboundFlag){
                // 下次接受信息记得再次设置为 false
                this.reboundFlag = true;
                // 反弹标记，true
                this.move(2, true);
            }
        }
    };

    window.Game = Game;

    function socket(){
        var connection = new WebSocket('ws://localhost:1740');
        connection.onopen = function(){};
        connection.onclose = function(){};
        connection.onmessage = function(){};
        connection.onerror = function(){};
    }
})(window, document, undefined);