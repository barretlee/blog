var q=null;window.PR_SHOULD_USE_CONTINUATION=!0;(function(){function c(e){function o(e){var t=e.charCodeAt(0);if(t!==92)return t;var n=e.charAt(1);return(t=i[n])?t:"0"<=n&&n<="7"?parseInt(e.substring(1),8):n==="u"||n==="x"?parseInt(e.substring(2),16):e.charCodeAt(1)}function c(e){if(e<32)return(e<16?"\\x0":"\\x")+e.toString(16);e=String.fromCharCode(e);if(e==="\\"||e==="-"||e==="["||e==="]")e="\\"+e;return e}function l(e){for(var t=e.substring(1,e.length-1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g),e=[],n=[],r=t[0]==="^",a=r?1:0,s=t.length;a<s;++a){var i=t[a];if(/\\[bdsw]/i.test(i))e.push(i);else{var i=o(i),l;a+2<s&&"-"===t[a+1]?(l=o(t[a+2]),a+=2):l=i;n.push([i,l]);l<65||i>122||(l<65||i>90||n.push([Math.max(65,i)|32,Math.min(l,90)|32]),l<97||i>122||n.push([Math.max(97,i)&-33,Math.min(l,122)&-33]))}}n.sort(function(e,t){return e[0]-t[0]||t[1]-e[1]});t=[];i=[NaN,NaN];for(a=0;a<n.length;++a)s=n[a],s[0]<=i[1]+1?i[1]=Math.max(i[1],s[1]):t.push(i=s);n=["["];r&&n.push("^");n.push.apply(n,e);for(a=0;a<t.length;++a)s=t[a],n.push(c(s[0])),s[1]>s[0]&&(s[1]+1>s[0]&&n.push("-"),n.push(c(s[1])));n.push("]");return n.join("")}function t(e){for(var t=e.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g),n=t.length,r=[],a=0,s=0;a<n;++a){var i=t[a];i==="("?++s:"\\"===i.charAt(0)&&(i=+i.substring(1))&&i<=s&&(r[i]=-1)}for(a=1;a<r.length;++a)-1===r[a]&&(r[a]=++u);for(s=a=0;a<n;++a)i=t[a],i==="("?(++s,r[s]===void 0&&(t[a]="(?:")):"\\"===i.charAt(0)&&(i=+i.substring(1))&&i<=s&&(t[a]="\\"+r[s]);for(s=a=0;a<n;++a)"^"===t[a]&&"^"!==t[a+1]&&(t[a]="");if(e.ignoreCase&&d)for(a=0;a<n;++a)i=t[a],e=i.charAt(0),i.length>=2&&e==="["?t[a]=l(i):e!=="\\"&&(t[a]=i.replace(/[A-Za-z]/g,function(e){e=e.charCodeAt(0);return"["+String.fromCharCode(e&-33,e|32)+"]"}));return t.join("")}for(var u=0,d=!1,n=!1,r=0,a=e.length;r<a;++r){var s=e[r];if(s.ignoreCase)n=!0;else if(/[a-z]/i.test(s.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi,""))){d=!0;n=!1;break}}for(var i={b:8,t:9,n:10,v:11,f:12,r:13},h=[],r=0,a=e.length;r<a;++r){s=e[r];if(s.global||s.multiline)throw Error(""+s);h.push("(?:"+t(s)+")")}return RegExp(h.join("|"),n?"gi":"g")}function N(e){function n(e){switch(e.nodeType){case 1:if(r.test(e.className))break;for(var t=e.firstChild;t;t=t.nextSibling)n(t);t=e.nodeName;if("BR"===t||"LI"===t)a[l]="\n",i[l<<1]=s++,i[l++<<1|1]=e;break;case 3:case 4:t=e.nodeValue,t.length&&(t=o?t.replace(/\r\n?/g,"\n"):t.replace(/[\t\n\r ]+/g," "),a[l]=t,i[l<<1]=s,s+=t.length,i[l++<<1|1]=e)}}var r=/(?:^|\s)nocode(?:\s|$)/,a=[],s=0,i=[],l=0,t;e.currentStyle?t=e.currentStyle.whiteSpace:window.getComputedStyle&&(t=document.defaultView.getComputedStyle(e,q).getPropertyValue("white-space"));var o=t&&"pre"===t.substring(0,3);n(e);return{a:a.join("").replace(/\n$/,""),c:i}}function b(e,t,n,r){t&&(e={a:t,d:e},n(e),r.push.apply(r,e.e))}function a(o,g){function m(e){for(var t=e.d,n=[t,"pln"],r=0,a=e.a.match(v)||[],s={},i=0,l=a.length;i<l;++i){var o=a[i],c=s[o],u=void 0,d;if(typeof c==="string")d=!1;else{var h=y[o.charAt(0)];if(h)u=o.match(h[1]),c=h[0];else{for(d=0;d<w;++d)if(h=g[d],u=o.match(h[1])){c=h[0];break}u||(c="pln")}if((d=c.length>=5&&"lang-"===c.substring(0,5))&&!(u&&typeof u[1]==="string"))d=!1,c="src";d||(s[o]=c)}h=r;r+=o.length;if(d){d=u[1];var f=o.indexOf(d),p=f+d.length;u[2]&&(p=o.length-u[2].length,f=p-d.length);c=c.substring(5);b(t+h,o.substring(0,f),m,n);b(t+h+f,d,C(c,d),n);b(t+h+p,o.substring(p),m,n)}else n.push(t+h,c)}e.e=n}var y={},v;(function(){for(var e=o.concat(g),t=[],n={},r=0,a=e.length;r<a;++r){var s=e[r],i=s[3];if(i)for(var l=i.length;--l>=0;)y[i.charAt(l)]=s;s=s[1];i=""+s;n.hasOwnProperty(i)||(t.push(s),n[i]=q)}t.push(/[\S\s]/);v=c(t)})();var w=g.length;return m}function e(e){var t=[],n=[];e.tripleQuotedStrings?t.push(["str",/^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/,q,"'\""]):e.multiLineStrings?t.push(["str",/^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/,q,"'\"`"]):t.push(["str",/^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/,q,"\"'"]);e.verbatimStrings&&n.push(["str",/^@"(?:[^"]|"")*(?:"|$)/,q]);var r=e.hashComments;r&&(e.cStyleComments?(r>1?t.push(["com",/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,q,"#"]):t.push(["com",/^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\n\r]*)/,q,"#"]),n.push(["str",/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/,q])):t.push(["com",/^#[^\n\r]*/,q,"#"]));e.cStyleComments&&(n.push(["com",/^\/\/[^\n\r]*/,q]),n.push(["com",/^\/\*[\S\s]*?(?:\*\/|$)/,q]));e.regexLiterals&&n.push(["lang-regex",/^(?:^^\.?|[!+-]|!=|!==|#|%|%=|&|&&|&&=|&=|\(|\*|\*=|\+=|,|-=|->|\/|\/=|:|::|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|[?@[^]|\^=|\^\^|\^\^=|{|\||\|=|\|\||\|\|=|~|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\s*(\/(?=[^*/])(?:[^/[\\]|\\[\S\s]|\[(?:[^\\\]]|\\[\S\s])*(?:]|$))+\/)/]);(r=e.types)&&n.push(["typ",r]);e=(""+e.keywords).replace(/^ | $/g,"");e.length&&n.push(["kwd",RegExp("^(?:"+e.replace(/[\s,]+/g,"|")+")\\b"),q]);t.push(["pln",/^\s+/,q," \r\n\t "]);n.push(["lit",/^@[$_a-z][\w$@]*/i,q],["typ",/^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/,q],["pln",/^[$_a-z][\w$@]*/i,q],["lit",/^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i,q,"0123456789"],["pln",/^\\[\S\s]?/,q],["pun",/^.[^\s\w"-$'./@\\`]*/,q]);return a(t,n)}function g(e,t){function a(e){switch(e.nodeType){case 1:if(i.test(e.className))break;if("BR"===e.nodeName)s(e),e.parentNode&&e.parentNode.removeChild(e);else for(e=e.firstChild;e;e=e.nextSibling)a(e);break;case 3:case 4:if(c){var t=e.nodeValue,n=t.match(l);if(n){var r=t.substring(0,n.index);e.nodeValue=r;(t=t.substring(n.index+n[0].length))&&e.parentNode.insertBefore(o.createTextNode(t),e.nextSibling);s(e);r||e.parentNode.removeChild(e)}}}}function s(e){function i(e,t){var n=t?e.cloneNode(!1):e,r=e.parentNode;if(r){var r=i(r,1),a=e.nextSibling;r.appendChild(n);for(var s=a;s;s=a)a=s.nextSibling,r.appendChild(s)}return n}for(;!e.nextSibling;)if(e=e.parentNode,!e)return;for(var e=i(e.nextSibling,0),t;(t=e.parentNode)&&t.nodeType===1;)e=t;r.push(e)}var i=/(?:^|\s)nocode(?:\s|$)/,l=/\r\n?|\n/,o=e.ownerDocument,n;e.currentStyle?n=e.currentStyle.whiteSpace:window.getComputedStyle&&(n=o.defaultView.getComputedStyle(e,q).getPropertyValue("white-space"));var c=n&&"pre"===n.substring(0,3);for(n=o.createElement("LI");e.firstChild;)n.appendChild(e.firstChild);for(var r=[n],u=0;u<r.length;++u)a(r[u]);t===(t|0)&&r[0].setAttribute("value",t);var d=o.createElement("OL");d.className="linenums";for(var h=Math.max(0,t-1|0)||0,u=0,f=r.length;u<f;++u)n=r[u],n.className="L"+(u+h)%10,n.firstChild||n.appendChild(o.createTextNode(" ")),d.appendChild(n);e.appendChild(d)}function t(e,t){for(var n=t.length;--n>=0;){var r=t[n];f.hasOwnProperty(r)?window.console&&console.warn("cannot override language handler %s",r):f[r]=e}}function C(e,t){if(!e||!f.hasOwnProperty(e))e=/^\s*</.test(t)?"default-markup":"default-code";return f[e]}function m(e){var t=e.g;try{var n=N(e.h),r=n.a;e.a=r;e.c=n.c;e.d=0;C(t,r)(e);var a=/\bMSIE\b/.test(navigator.userAgent),t=/\n/g,s=e.a,i=s.length,n=0,l=e.c,o=l.length,r=0,c=e.e,u=c.length,e=0;c[u]=i;var d,h;for(h=d=0;h<u;)c[h]!==c[h+2]?(c[d++]=c[h++],c[d++]=c[h++]):h+=2;u=d;for(h=d=0;h<u;){for(var f=c[h],p=c[h+1],g=h+2;g+2<=u&&c[g+1]===p;)g+=2;c[d++]=f;c[d++]=p;h=g}for(c.length=d;r<o;){var m=l[r+2]||i,y=c[e+2]||i,g=Math.min(m,y),v=l[r+1],w;if(v.nodeType!==1&&(w=s.substring(n,g))){a&&(w=w.replace(t,"\r"));v.nodeValue=w;var b=v.ownerDocument,S=b.createElement("SPAN");S.className=c[e+1];var x=v.parentNode;x.replaceChild(S,v);S.appendChild(v);n<m&&(l[r+1]=v=b.createTextNode(s.substring(g,m)),x.insertBefore(v,S.nextSibling))}n=g;n>=m&&(r+=2);n>=y&&(e+=2)}}catch(e){"console"in window&&console.log(e&&e.stack?e.stack:e)}}var n=["break,continue,do,else,for,if,return,while"],r=[[n,"auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],s=[r,"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],i=[r,"abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient"],l=[i,"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var"],r=[r,"debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],o=[n,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],u=[n,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],n=[n,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"],d=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)/,y=/\S/,h=e({keywords:[s,l,r,"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END"+o,u,n],hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),f={};t(h,["default-code"]);t(a([],[["pln",/^[^<?]+/],["dec",/^<!\w[^>]*(?:>|$)/],["com",/^<\!--[\S\s]*?(?:--\>|$)/],["lang-",/^<\?([\S\s]+?)(?:\?>|$)/],["lang-",/^<%([\S\s]+?)(?:%>|$)/],["pun",/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),["default-markup","htm","html","mxml","xhtml","xml","xsl"]);t(a([["pln",/^\s+/,q," \t\r\n"],["atv",/^(?:"[^"]*"?|'[^']*'?)/,q,"\"'"]],[["tag",/^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],["atn",/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],["pun",/^[/<->]+/],["lang-js",/^on\w+\s*=\s*"([^"]+)"/i],["lang-js",/^on\w+\s*=\s*'([^']+)'/i],["lang-js",/^on\w+\s*=\s*([^\s"'>]+)/i],["lang-css",/^style\s*=\s*"([^"]+)"/i],["lang-css",/^style\s*=\s*'([^']+)'/i],["lang-css",/^style\s*=\s*([^\s"'>]+)/i]]),["in.tag"]);t(a([],[["atv",/^[\S\s]+/]]),["uq.val"]);t(e({keywords:s,hashComments:!0,cStyleComments:!0,types:d}),["c","cc","cpp","cxx","cyc","m"]);t(e({keywords:"null,true,false"}),["json"]);t(e({keywords:l,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:d}),["cs"]);t(e({keywords:i,cStyleComments:!0}),["java"]);t(e({keywords:n,hashComments:!0,multiLineStrings:!0}),["bsh","csh","sh"]);t(e({keywords:o,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),["cv","py"]);t(e({keywords:"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["perl","pl","pm"]);t(e({keywords:u,hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb"]);t(e({keywords:r,cStyleComments:!0,regexLiterals:!0}),["js"]);t(e({keywords:"all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,true,try,unless,until,when,while,yes",hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),["coffee"]);t(a([],[["str",/^[\S\s]+/]]),["regex"]);window.highlightOne=function(e,t,n){var r=document.createElement("PRE");r.innerHTML=e;n&&g(r,n);m({g:t,i:n,h:r});return r.innerHTML};window.highlight=function(o){function c(){for(var e=window.PR_SHOULD_USE_CONTINUATION?d.now()+250:Infinity;h<u.length&&d.now()<e;h++){var t=u[h],n=t.className;if(n.indexOf("highlight")>=0){var n=n.match(p),r,a;if(a=!n){a=t;for(var s=void 0,i=a.firstChild;i;i=i.nextSibling)var l=i.nodeType,s=l===1?s?a:i:l===3?y.test(i.nodeValue)?a:s:s;a=(r=s===a?void 0:s)&&"CODE"===r.tagName}a&&(n=r.className.match(p));n&&(n=n[1]);a=!1;for(s=t.parentNode;s;s=s.parentNode)if((s.tagName==="pre"||s.tagName==="code"||s.tagName==="xmp")&&s.className&&s.className.indexOf("highlight")>=0){a=!0;break}a||((a=(a=t.className.match(/\blinenums\b(?::(\d+))?/))?a[1]&&a[1].length?+a[1]:!0:!1)&&g(t,a),f={g:n,h:t,i:a},m(f))}}h<u.length?setTimeout(c,250):o&&o()}for(var e=[document.getElementsByTagName("pre"),document.getElementsByTagName("code"),document.getElementsByTagName("xmp")],u=[],t=0;t<e.length;++t)for(var n=0,r=e[t].length;n<r;++n)u.push(e[t][n]);var e=q,d=Date;d.now||(d={now:function(){return+new Date}});var h=0,f,p=/\blang(?:uage)?-([\w.]+)(?!\S)/;c()};window.PR={createSimpleLexer:a,registerLangHandler:t,sourceDecorator:e,PR_ATTRIB_NAME:"atn",PR_ATTRIB_VALUE:"atv",PR_COMMENT:"com",PR_DECLARATION:"dec",PR_KEYWORD:"kwd",PR_LITERAL:"lit",PR_NOCODE:"nocode",PR_PLAIN:"pln",PR_PUNCTUATION:"pun",PR_SOURCE:"src",PR_STRING:"str",PR_TAG:"tag",PR_TYPE:"typ"}})();