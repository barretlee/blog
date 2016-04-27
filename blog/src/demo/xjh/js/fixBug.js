/**
*=======================================
* @Author Barret Lee
* @Date 2013/04/23
* @e-mail jingmingjun92@163.com
* @Blog http://hustskyking.cnblogs.com
*=======================================
*/
function sizer(){
	var h = document.documentElement.clientHeight,
		w = document.documentElement.clientWidth,
		box = document.getElementById("con_r"),
		container = document.getElementById("container"),
		con_tb = document.getElementById("con_tb"),
		menu = document.getElementById("menu");
	container.style.height = parseInt(h) - 89 + "px";
	con_tb.style.width = w - 220 + "px";
}

sizer();

var timer = null;
window.onresize = function(){
	clearTimeout(timer);
	timer = setTimeout(sizer, 50);
}