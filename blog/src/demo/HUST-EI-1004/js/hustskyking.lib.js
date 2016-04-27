/**
* You can use this lib to do anything without permission.
* This is a lib for brifing js coding.
*
* @author hustskyking -> Front-End lover
* @date 2012-10-10
*
* Summerize:
*	 Function.prototype.method -> Chain call
*	 DomReady {Object} -> domReady(){function(){}}
*	 UserData {Object} -> localStotage
*	 XHR {Object} -> xmlHttpRequset
*/



/**
* Function -- get new prototype
* @this {Function}
* @return {Function}
*/
Function.prototype.method = function(name, fn) {
	if( !this.prototype[name] ) {
		this.prototype[name] = fn;
	}
	return this;
};

;(function() {
	
  /**
   * Example:
   *
   *	$("#obj")
   *	$(".obj")
   *	$(p)
   */
	function Els() {
		this.elements = []; 
		var element; 
		if(typeof arguments[0] === "string") { 
			element = arguments[0]; 
			//for Id
			if (element.slice(0, 1) == '#') { 
				element = document.getElementById(element.slice(1)); 
				this.elements.push(element); 
			//for Class
			}else if(element.slice(0,1)=='.') { 
				element = element.slice(1); 
				var es = document.body.getElementsByTagName('*'); 
				for (var i = 0, j = es.length; i < j; i++) { 
					if (element.indexOf(es[i].className) != -1) { 
						this.elements.push(es[i]); 
					} 
				} 
			//for Tag
			}else { 
				this.elements = document.getElementsByTagName(element); 
			} 
		}else { 
			element = this; 
			this.elements.push(element); 
		} 
	}

	/**
	*	prototype function
	*	
	*	example:
	*		$("#obj").setStyle("color", "red").fade(0.3, 1000).hide();
	*		$(".obj").addEvent("click", callback, false);
	*/

	/*
		DOM:
			* each
			* setStyle
			* show
			* hide
			* fade
	*/

	//@return {Object} each
	//@param {Function}
	Els.method('each', function(callback){
		for(var i = 0, l = this.elements.length; i < l; i++) {  
			callback.call(this, this.elements[i]); 
		}
		return this; 
	})

	//@this {Function} setStyle
	//@param prop {String}
	//@param val {String}
	//@return {Object}
	.method('setStyle', function(prop, val) {
		this.each(function(el) {
			el.style[prop] = val;
		});
		return this;
	})

	//@this {Function} show
	//@return {Object}
	.method('show', function() {
		var that = this;
		this.each(function(el) {
			that.setStyle('display', 'block');
		});
		return this;
	})
	
	//@this {Function} hide
	//@return {Object}
	.method('hide', function() {
		var that = this;
	    this.each(function(el) {
			that.setStyle('display', 'none');
		});
		return this;
	})

	//@this {Function} fade
	//@param opa {Number[float]}
	//@param t {Number}
	//@param callback {Function}
	//@return {Object}
	.method('fade', function(opa, t, callback) {
		var that = this;
		this.each(function() {
		    var f = 10;
		    if( t < f ) { 
		    	return ;
			}
		    var delta = 1 - opa;
		    var step = delta / t;
		    var count = 0;
		    var flag = setInterval(function() {
		        var left = t - count;
		        if(count >= t) {
		            clearInterval(flag);
		            if( !!callback ) { 
		            	callback(); 
		        	}
		        } else if( left < f ) {
		            that.setStyle('opacity', opa);
		            that.setStyle('filter', 'alpha(opacity=' + opa * 100 + ')');
		            clearInterval(flag);
		            if( !!callback ) { 
		            	callback(); 
		        	}
		        } else {
		            var des = 1.0 - count * step;
		            that.setStyle('opacity', des);
		            that.setStyle('filter', 'alpha(opacity=' + des * 100 + ')');
		            count = count + f;
		        }
		    }, f);
		});
	})

	/*
		Event:
			* addEvent
			* deleteEvent
	*/

	//this {Function}
	.method('addEvent', function(type, callback) {
		var add = function(el){
			if( window.addEventListener ) {
				el.addEventListener(type, callback, false);
			}else if( window.attachEvent ) {
				el.attachEvent('on' + type, callback);
			}
		};
		this.each(function(el) {
			add(el);
		});
	})

	//this {Function}
	.method('deleteEvent', function(type, callback) {
		var add = function(el) {
			if(window.addEventListener) {
				el.addEventListener(type, callback, false);
			}else if( window.attachEvent ) {
				el.attachEvent('on' + type, callback);
			}
		};
		this.each(function(el) {
			add(el);
		});
	});

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

	//namespace
	window.installHelper = function(scope, interface) {
		scope[interface] = function() {
			return new Els(arguments[0]);
		};
	};

	//default namespace is 'window'.
	installHelper(window, "$");
})();



/**
 * https://github.com/cms/domready/blob/master/domready.js
 * I'm sorry I remove the copyright notice and the permission notice.
 */
var domReady = (function() {

    var w3c = !!document.addEventListener,
        loaded = false,
        toplevel = false,
        fns = [];
    
    if (w3c) {
        document.addEventListener("DOMContentLoaded", contentLoaded, true);
        window.addEventListener("load", ready, false);
    }else {
        document.attachEvent("onreadystatechange", contentLoaded);
        window.attachEvent("onload", ready);
        
        try {
            toplevel = window.frameElement === null;
        } catch(e) {}
        if ( document.documentElement.doScroll && toplevel ) {
            scrollCheck();
        }
    }

    function contentLoaded() {
        (w3c)?
            document.removeEventListener("DOMContentLoaded", contentLoaded, true) :
            document.readyState === "complete" && 
            document.detachEvent("onreadystatechange", contentLoaded);
        ready();
    }
    
    // If IE is used, use the trick by Diego Perini
    // http://javascript.nwbox.com/IEContentLoaded/
    function scrollCheck() {
        if (loaded) {
            return;
        }
        
        try {
            document.documentElement.doScroll("left");
        }
        catch(e) {
            window.setTimeout(arguments.callee, 15);
            return;
        }
        ready();
    }
    
    function ready() {
        if (loaded) {
            return;
        }
        loaded = true;
        
        var len = fns.length,
            i = 0;
            
        for( ; i < len; i++) {
            fns[i].call(document);
        }
    }
    
    return function(fn) {
        // if the DOM is already ready,
        // execute the function
        return (loaded)? 
            fn.call(document):      
            fns.push(fn);
    }
})(); 


/*LocalStorage in diffrent browser.*/

/** 
* @class 定义userdata的操作 
*
*	example
*		UserData.save("name", "hustskyking");
*		var name = UserData.load("name");
*		//console.log(name);//None, because of the limited of browser.
*		alert(name);
*
*/ 
var UserData = { 
	// Define an obj.
	o : null, 
	// Set the default expires.
	defExps : 365, 

	// Initial userdata
	init : function() { 
		if(!UserData.o) { 
			try{ 
				UserData.o = document.createElement('input'); 
				UserData.o.type = "hidden"; 
				//UserData.o.style.behavior = "url('#default#userData')" ; 
				UserData.o.addBehavior ("#default#userData"); 
				document.body.appendChild(UserData.o); 
			}catch(e){ 
				return false; 
			} 
		}; 
		return true; 
	}, 

	//save userdata to file. f-file name，c-file content，e-expires 
	save : function(f, c, e){ 
		if(window.localStorage){
			window.localStorage.setItem(f, c);
			return ;
		}else if(UserData.init()) { 
			var o = UserData.o; 
			o.load(f); 
			// Save the content as attribute.
			if(c) {
				o.setAttribute("code", c); 
			}
			// Set expires.
			var d = new Date(), e = (arguments.length == 3) ? e : UserData.defExps; 
			d.setDate(d.getDate() + e); 
			o.expires = d.toUTCString(); 
			o.save(f); 
		} 
	}, 

	// Read from the file, return a String. f-file name
	load : function(f){ 
		if(window.localStorage) {
			return window.localStorage.getItem(f);
		}else if(UserData.init()) { 
			var o = UserData.o; 
			// read file 
			o.load(f); 
			// return the file content
			return o.getAttribute("code"); 
		}
	}, 

	// Check the existence. f-file name
	exist : function(f){
		if(window.localStorage) {
			var item = window.localStorage.getItem(f);
			return item != null;
		}
		return UserData.load(f) != null; 
	}, 

	// Delete the userdata. f-file name
	remove : function(f){
		if(window.localStorage) {
			window.localStorage.remove(f);
		}else {
			UserData.save(f, false, -UserData.defExps); 
		}
	} 
}; 



/** 
* @class 定义XHR的操作 
*
*	example:
*		XHR.request('POST', 'http://qianduannotes.sinaapp.com/XHRTest.php', {}, function(a){
*			console.log(a);
*		});
*
*/ 
var XHR = { 
	//Create a XHR Object.
	o : function() {
		var o = null;
	    if (window.XMLHttpRequest) { //Mozilla 浏览器 
	        o = new XMLHttpRequest(); 
	        if (o.overrideMimeType) {//设置MIME类别 
	            o.overrideMimeType("text/xml"); 
	        } 
	    } 
	    else if (window.ActiveXObject) { //IE浏览器 
	        try { 
	            o = new ActiveXObject("Msxml2.XMLHTTP"); 
	        } catch (e) { 
	            try { 
	                o = new ActiveXObject("Microsoft.XMLHTTP"); 
	            } catch (e) { 
	            	throw new Error("Your browser does not suppose XHR.");
	            } 
	        } 
	    } 
	    return o;
	},

	//callback function
	_rsc : function (obj, callback) { 
	    return function () { 
	        if (obj.readyState == 4 && obj.status == 200) { 
                callback.call(this, obj.responseText); 
	        } 
	    }
    },

    //GET | POST
	request : function(type, url, data, callback){
		var xho = this.o();
		if(!xho) return;
		xho.onreadystatechange = this._rsc(xho, callback);
		if(typeof data == "array" && !data){
			var dataSend = "";
			for(i in data){
				dataSend = dataSend + 'i' + '=' + data[i] + '&';
			}
			var data = dataSend.slice(0, dataSend.length - 1);	
			url = url.indexOf("?") == -1 ? (url + "?" + data) : (url + data);
		}
		xho.open(type, url, true);
		if(type.toUpperCase() == "POST"){
			xho.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
		}
		xho.send();
	}
};