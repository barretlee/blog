(function(){var K=encodeURIComponent,N=Infinity,V=setTimeout,X=isNaN,a=Math,R=decodeURIComponent;function G(t,e){return t.name=e}var b="push",M="test",z="slice",c="replace",$="load",F="floor",U="charAt",B="value",h="indexOf",H="match",W="port",Y="createElement",Z="path",J="name",Q="getTime",f="host",y="toString",w="length",o="prototype",tt="clientWidth",v="split",et="stopPropagation",it="scope",d="location",nt="search",g="protocol",rt="clientHeight",at="href",m="substring",ot="apply",st="navigator",k="join",u="toLowerCase",t;function ut(t,e){switch(e){case 0:return""+t;case 1:return 1*t;case 2:return!!t;case 3:return 1e3*t}return t}function ct(t){return"function"==typeof t}function ft(t){return void 0!=t&&-1<(t.constructor+"")[h]("String")}function l(t,e){return void 0==t||"-"==t&&!e||""==t}function dt(t){if(!t||""==t)return"";for(;t&&-1<" \n\r\t"[h](t[U](0));)t=t[m](1);for(;t&&-1<" \n\r\t"[h](t[U](t[w]-1));)t=t[m](0,t[w]-1);return t}function ht(){return a.round(2147483647*a.random())}function vt(){}function _(t,e){if(K instanceof Function)return e?encodeURI(t):K(t);A(68);return escape(t)}function p(t){t=t[v]("+")[k](" ");if(R instanceof Function)try{return R(t)}catch(t){A(17)}else A(68);return unescape(t)}var gt=function(t,e,i,n){t.addEventListener?t.addEventListener(e,i,!!n):t.attachEvent&&t.attachEvent("on"+e,i)},mt=function(t,e,i,n){t.removeEventListener?t.removeEventListener(e,i,!!n):t.detachEvent&&t.detachEvent("on"+e,i)};function lt(t,e){if(t){var i=P[Y]("script");i.type="text/javascript";i.async=!0;i.src=t;i.id=e;var n=P.getElementsByTagName("script")[0];n.parentNode.insertBefore(i,n);return i}}function q(t){return t&&0<t[w]?t[0]:""}function _t(t){var e=t?t[w]:0;return 0<e?t[e-1]:""}var pt=function(){this.prefix="ga.";this.R={}};pt[o].set=function(t,e){this.R[this.prefix+t]=e};pt[o].get=function(t){return this.R[this.prefix+t]};pt[o].contains=function(t){return void 0!==this.get(t)};function bt(t){0==t[h]("www.")&&(t=t[m](4));return t[u]()}function yt(t,e){var i,n={url:t,protocol:"http",host:"",path:"",d:new pt,anchor:""};if(!t)return n;i=t[h]("://");0<=i&&(n.protocol=t[m](0,i),t=t[m](i+3));i=t[nt]("/|\\?|#");if(0<=i)n.host=t[m](0,i)[u](),t=t[m](i);else return n.host=t[u](),n;i=t[h]("#");0<=i&&(n.anchor=t[m](i+1),t=t[m](0,i));i=t[h]("?");0<=i&&(kt(n.d,t[m](i+1)),t=t[m](0,i));n.anchor&&e&&kt(n.d,n.anchor);t&&"/"==t[U](0)&&(t=t[m](1));n.path=t;return n}function wt(t,e){function i(t){var e=(t.hostname||"")[v](":")[0][u](),i=(t[g]||"")[u](),i=1*t[W]||("http:"==i?80:"https:"==i?443:"");t=t.pathname||"";0==t[h]("/")||(t="/"+t);return[e,""+i,t]}var n=e||P[Y]("a");n.href=P[d][at];var r=(n[g]||"")[u](),a=i(n),o=n[nt]||"",s=r+"//"+a[0]+(a[1]?":"+a[1]:"");0==t[h]("//")?t=r+t:0==t[h]("/")?t=s+t:t&&0!=t[h]("?")?0>t[v]("/")[0][h](":")&&(t=s+a[2][m](0,a[2].lastIndexOf("/"))+"/"+t):t=s+a[2]+(t||o);n.href=t;r=i(n);return{protocol:(n[g]||"")[u](),host:r[0],port:r[1],path:r[2],Oa:n[nt]||"",url:t||""}}function kt(i,t){function e(t,e){i.contains(t)||i.set(t,[]);i.get(t)[b](e)}for(var n=dt(t)[v]("&"),r=0;r<n[w];r++)if(n[r]){var a=n[r][h]("=");0>a?e(n[r],"1"):e(n[r][m](0,a),n[r][m](a+1))}}function qt(t,e){if(l(t)||"["==t[U](0)&&"]"==t[U](t[w]-1))return"-";var i=P.domain;return t[h](i+(e&&"/"!=e?e:""))==(0==t[h]("http://")?7:0==t[h]("https://")?8:0)?"0":t}var Ct=0;function St(t,e,i){1<=Ct||1<=100*a.random()||zi()||(t=["utmt=error","utmerr="+t,"utmwv=5.4.6","utmn="+ht(),"utmsp=1"],e&&t[b]("api="+e),i&&t[b]("msg="+_(i[m](0,100))),j.w&&t[b]("aip=1"),_r(t[k]("&")),Ct++)}var xt=0,Tt={};function e(t){return i("x"+xt++,t)}function i(t,e){Tt[t]=!!e;return t}var s=e(),Et=i("anonymizeIp"),At=e(),It=e(),Pt=e(),Lt=e(),C=e(),S=e(),Ot=e(),jt=e(),Dt=e(),Kt=e(),Nt=e(),Vt=e(),Xt=e(),Rt=e(),Gt=e(),Mt=e(),zt=e(),$t=e(),Ft=e(),Ut=e(),Bt=e(),Ht=e(),Wt=e(),Yt=e(),Zt=e(),Jt=e(),Qt=e(),te=e(),ee=e(),ie=e(),ne=e(),re=e(),ae=e(),oe=e(),se=e(!0),ue=i("currencyCode"),ce=i("page"),fe=i("title"),de=e(),he=e(),ve=e(),ge=e(),me=e(),le=e(),_e=e(),pe=e(),be=e(),x=e(!0),ye=e(!0),we=e(!0),ke=e(!0),qe=e(!0),Ce=e(!0),Se=e(!0),xe=e(!0),Te=e(!0),Ee=e(!0),Ae=e(!0),r=e(!0),Ie=e(!0),Pe=e(!0),Le=e(!0),Oe=e(!0),je=e(!0),De=e(!0),Ke=e(!0),T=e(!0),Ne=e(!0),Ve=e(!0),Xe=e(!0),Re=e(!0),Ge=e(!0),Me=e(!0),ze=e(!0),$e=i("campaignParams"),Fe=e(),Ue=i("hitCallback"),Be=e();e();var He=e(),We=e(),Ye=e(),Ze=e(),Je=e(),Qe=e(),ti=e(),ei=e(),ii=e(),ni=e(),ri=e(),ai=e(),oi=e(),si=e();e();var ui=e(),ci=e(),fi=e(),di=i("uaName"),hi=i("uaDomain"),vi=i("uaPath");var gi=function(){function t(t,e,i){E(wr[o],t,e,i)}t("_createTracker",wr[o].r,55);t("_getTracker",wr[o].oa,0);t("_getTrackerByName",wr[o].u,51);t("_getTrackers",wr[o].pa,130);t("_anonymizeIp",wr[o].aa,16);t("_forceSSL",wr[o].la,125);t("_getPlugin",li,120)},mi=function(){function t(t,e,i){E(O[o],t,e,i)}_i("_getName",It,58);_i("_getAccount",s,64);_i("_visitCode",x,54);_i("_getClientInfo",Xt,53,1);_i("_getDetectTitle",Mt,56,1);_i("_getDetectFlash",Rt,65,1);_i("_getLocalGifPath",Jt,57);_i("_getServiceMode",Qt,59);n("_setClientInfo",Xt,66,2);n("_setAccount",s,3);n("_setNamespace",At,48);n("_setAllowLinker",Kt,11,2);n("_setDetectFlash",Rt,61,2);n("_setDetectTitle",Mt,62,2);n("_setLocalGifPath",Jt,46,0);n("_setLocalServerMode",Qt,92,void 0,0);n("_setRemoteServerMode",Qt,63,void 0,1);n("_setLocalRemoteServerMode",Qt,47,void 0,2);n("_setSampleRate",Zt,45,1);n("_setCampaignTrack",Gt,36,2);n("_setAllowAnchor",Nt,7,2);n("_setCampNameKey",$t,41);n("_setCampContentKey",Wt,38);n("_setCampIdKey",zt,39);n("_setCampMediumKey",Bt,40);n("_setCampNOKey",Yt,42);n("_setCampSourceKey",Ut,43);n("_setCampTermKey",Ht,44);n("_setCampCIdKey",Ft,37);n("_setCookiePath",S,9,0);n("_setMaxCustomVariables",te,0,1);n("_setVisitorCookieTimeout",Ot,28,1);n("_setSessionCookieTimeout",jt,26,1);n("_setCampaignCookieTimeout",Dt,29,1);n("_setReferrerOverride",de,49);n("_setSiteSpeedSampleRate",ii,132);t("_trackPageview",O[o].Fa,1);t("_trackEvent",O[o].F,4);t("_trackPageLoadTime",O[o].Ea,100);t("_trackSocial",O[o].Ga,104);t("_trackTrans",O[o].Ia,18);t("_sendXEvent",O[o].t,78);t("_createEventTracker",O[o].ia,74);t("_getVersion",O[o].qa,60);t("_setDomainName",O[o].B,6);t("_setAllowHash",O[o].va,8);t("_getLinkerUrl",O[o].na,52);t("_link",O[o].link,101);t("_linkByPost",O[o].ua,102);t("_setTrans",O[o].za,20);t("_addTrans",O[o].$,21);t("_addItem",O[o].Y,19);t("_clearTrans",O[o].ea,105);t("_setTransactionDelim",O[o].Aa,82);t("_setCustomVar",O[o].wa,10);t("_deleteCustomVar",O[o].ka,35);t("_getVisitorCustomVar",O[o].ra,50);t("_setXKey",O[o].Ca,83);t("_setXValue",O[o].Da,84);t("_getXKey",O[o].sa,76);t("_getXValue",O[o].ta,77);t("_clearXKey",O[o].fa,72);t("_clearXValue",O[o].ga,73);t("_createXObj",O[o].ja,75);t("_addIgnoredOrganic",O[o].W,15);t("_clearIgnoredOrganic",O[o].ba,97);t("_addIgnoredRef",O[o].X,31);t("_clearIgnoredRef",O[o].ca,32);t("_addOrganic",O[o].Z,14);t("_clearOrganic",O[o].da,70);t("_cookiePathCopy",O[o].ha,30);t("_get",O[o].ma,106);t("_set",O[o].xa,107);t("_addEventListener",O[o].addEventListener,108);t("_removeEventListener",O[o].removeEventListener,109);t("_addDevId",O[o].V);t("_getPlugin",li,122);t("_setPageGroup",O[o].ya,126);t("_trackTiming",O[o].Ha,124);t("_initData",O[o].v,2);t("_setVar",O[o].Ba,22);n("_setSessionTimeout",jt,27,3);n("_setCookieTimeout",Dt,25,3);n("_setCookiePersistence",Ot,24,1);t("_setAutoTrackOutbound",vt,79);t("_setTrackOutboundSubdomains",vt,81);t("_setHrefExamineLimit",vt,80)};function li(t){var e=this.plugins_;if(e)return e.get(t)}var E=function(t,e,i,n){t[e]=function(){try{return void 0!=n&&A(n),i[ot](this,arguments)}catch(t){throw St("exc",e,t&&t[J]),t}}},_i=function(e,t,i,n){O[o][e]=function(){try{return A(i),ut(this.a.get(t),n)}catch(t){throw St("exc",e,t&&t[J]),t}}},n=function(e,i,n,r,a){O[o][e]=function(t){try{A(n),void 0==a?this.a.set(i,ut(t,r)):this.a.set(i,a)}catch(t){throw St("exc",e,t&&t[J]),t}}},pi=function(t,e){return{type:e,target:t,stopPropagation:function(){throw"aborted"}}};var bi=RegExp(/(^|\.)doubleclick\.net$/i),yi=function(t,e){return bi[M](P[d].hostname)?!0:"/"!==e?!1:0!=t[h]("www.google.")&&0!=t[h](".google.")&&0!=t[h]("google.")||-1<t[h]("google.org")?!1:!0},wi=function(t){var e=t.get(Lt),i=t.c(S,"/");yi(e,i)&&t[et]()};var ki=function(){var n={},r={},i=new Ki;this.g=function(t,e){i.add(t,e)};var a=new Ki;this.e=function(t,e){a.add(t,e)};var e=!1,t=!1,o=!0;this.T=function(){e=!0};this.j=function(t){this[$]();this.set(Fe,t,!0);t=new qi(this);e=!1;a.execute(this);e=!0;r={};this.n();t.Ja()};this.load=function(){e&&(e=!1,this.Ka(),fn(this),t||(t=!0,i.execute(this),cn(this),fn(this)),e=!0)};this.n=function(){if(e)if(t)e=!1,cn(this),e=!0;else this[$]()};this.get=function(t){Tt[t]&&this[$]();return void 0!==r[t]?r[t]:n[t]};this.set=function(t,e,i){Tt[t]&&this[$]();i?r[t]=e:n[t]=e;Tt[t]&&this.n()};this.Za=function(t){n[t]=this.b(t,0)+1};this.b=function(t,e){var i=this.get(t);return void 0==i||""===i?e:1*i};this.c=function(t,e){var i=this.get(t);return void 0==i?e:i+""};this.Ka=function(){if(o){var t=this.c(Lt,""),e=this.c(S,"/");yi(t,e)||(n[C]=n[Vt]&&""!=t?Cr(t):1,o=!1)}}};ki[o].stopPropagation=function(){throw"aborted"};var qi=function(t){var e=this;this.q=0;var i=t.get(Ue);this.Ua=function(){0<e.q&&i&&(e.q--,e.q||i())};this.Ja=function(){!e.q&&i&&V(i,10)};t.set(Be,e,!0)};function Ci(t,e){e=e||[];for(var i=0;i<e[w];i++){var n=e[i];if(""+t==n||0==n[h](t+"."))return n}return"-"}var Si=function(t,e,i){i=i?"":t.c(C,"1");e=e[v](".");if(6!==e[w]||Di(e[0],i))return!1;i=1*e[1];var n=1*e[2],r=1*e[3],a=1*e[4];e=1*e[5];if(!(0<=i&&0<n&&0<r&&0<a&&0<=e))return!1;t.set(x,i);t.set(qe,n);t.set(Ce,r);t.set(Se,a);t.set(xe,e);return!0},xi=function(t){var e=t.get(x),i=t.get(qe),n=t.get(Ce),r=t.get(Se),a=t.b(xe,1);return[t.b(C,1),void 0!=e?e:"-",i||"-",n||"-",r||"-",a][k](".")},Ti=function(t){return[t.b(C,1),t.b(Ae,0),t.b(r,1),t.b(Ie,0)][k](".")},Ei=function(t,e,i){i=i?"":t.c(C,"1");var n=e[v](".");if(4!==n[w]||Di(n[0],i))n=null;t.set(Ae,n?1*n[1]:0);t.set(r,n?1*n[2]:10);t.set(Ie,n?1*n[3]:t.get(Pt));return null!=n||!Di(e,i)},Ai=function(t,e){var i=_(t.c(we,"")),n=[],r=t.get(se);if(!e&&r){for(var a=0;a<r[w];a++){var o=r[a];o&&1==o[it]&&n[b](a+"="+_(o[J])+"="+_(o[B])+"=1")}0<n[w]&&(i+="|"+n[k]("^"))}return i?t.b(C,1)+"."+i:null},Ii=function(t,e,i){i=i?"":t.c(C,"1");e=e[v](".");if(2>e[w]||Di(e[0],i))return!1;e=e[z](1)[k](".")[v]("|");0<e[w]&&t.set(we,p(e[0]));if(1>=e[w])return!0;e=e[1][v](-1==e[1][h](",")?"^":",");for(i=0;i<e[w];i++){var n=e[i][v]("=");if(4==n[w]){var r={};G(r,p(n[1]));r.value=p(n[2]);r.scope=1;t.get(se)[n[0]]=r}}return!0},Pi=function(t,e){var i=Li(t,e);return i?[t.b(C,1),t.b(Pe,0),t.b(Le,1),t.b(Oe,1),i][k]("."):""},Li=function(n){function t(t,e){if(!l(n.get(t))){var i=n.c(t,""),i=i[v](" ")[k]("%20"),i=i[v]("+")[k]("%20");r[b](e+"="+i)}}var r=[];t(De,"utmcid");t(Re,"utmcsr");t(T,"utmgclid");t(Ne,"utmgclsrc");t(Ve,"utmdclid");t(Xe,"utmdsid");t(Ke,"utmccn");t(Ge,"utmcmd");t(Me,"utmctr");t(ze,"utmcct");return r[k]("|")},Oi=function(t,e,i){i=i?"":t.c(C,"1");e=e[v](".");if(5>e[w]||Di(e[0],i))return t.set(Pe,void 0),t.set(Le,void 0),t.set(Oe,void 0),t.set(De,void 0),t.set(Ke,void 0),t.set(Re,void 0),t.set(Ge,void 0),t.set(Me,void 0),t.set(ze,void 0),t.set(T,void 0),t.set(Ne,void 0),t.set(Ve,void 0),t.set(Xe,void 0),!1;t.set(Pe,1*e[1]);t.set(Le,1*e[2]);t.set(Oe,1*e[3]);ji(t,e[z](4)[k]("."));return!0},ji=function(i,e){function t(t){return(t=e[H](t+"=(.*?)(?:\\|utm|$)"))&&2==t[w]?t[1]:void 0}function n(t,e){e?(e=r?p(e):e[v]("%20")[k](" "),i.set(t,e)):i.set(t,void 0)}-1==e[h]("=")&&(e=p(e));var r="2"==t("utmcvr");n(De,t("utmcid"));n(Ke,t("utmccn"));n(Re,t("utmcsr"));n(Ge,t("utmcmd"));n(Me,t("utmctr"));n(ze,t("utmcct"));n(T,t("utmgclid"));n(Ne,t("utmgclsrc"));n(Ve,t("utmdclid"));n(Xe,t("utmdsid"))},Di=function(t,e){return e?t!=e:!/^\d+$/[M](t)};var Ki=function(){this.filters=[]};Ki[o].add=function(t,e){this.filters[b]({name:t,s:e})};Ki[o].execute=function(t){try{for(var e=0;e<this.filters[w];e++)this.filters[e].s.call(I,t)}catch(t){}};function Ni(t){100!=t.get(Zt)&&t.get(x)%1e4>=100*t.get(Zt)&&t[et]()}function Vi(t){zi(t.get(s))&&t[et]()}function Xi(t){"file:"==P[d][g]&&t[et]()}function Ri(t){$i()&&t[et]()}function Gi(t){t.get(fe)||t.set(fe,P.title,!0);t.get(ce)||t.set(ce,P[d].pathname+P[d][nt],!0)}var Mi=new function(){var i=[];this.set=function(t){i[t]=!0};this.Xa=function(){for(var t=[],e=0;e<i[w];e++)i[e]&&(t[a[F](e/6)]=t[a[F](e/6)]^1<<e%6);for(e=0;e<t[w];e++)t[e]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"[U](t[e]||0);return t[k]("")+"~"}};function A(t){Mi.set(t)}var I=window,P=document,zi=function(t){var e=I._gaUserPrefs;if(e&&e.ioo&&e.ioo()||t&&!0===I["ga-disable-"+t])return!0;try{var i=I.external;if(i&&i._gaUserPrefs&&"oo"==i._gaUserPrefs)return!0}catch(t){}return!1},$i=function(){return I[st]&&"preview"==I[st].loadPurpose},Fi=function(t,e){V(t,e)},L=function(t){var e=[],i=P.cookie[v](";");t=RegExp("^\\s*"+t+"=\\s*(.*?)\\s*$");for(var n=0;n<i[w];n++){var r=i[n][H](t);r&&e[b](r[1])}return e},Ui=function(t,e,i,n,r,a){r=zi(r)?!1:yi(n,i)?!1:$i()?!1:!0;if(r){if(e&&0<=I[st].userAgent[h]("Firefox")){e=e[c](/\n|\r/g," ");r=0;for(var o=e[w];r<o;++r){var s=e.charCodeAt(r)&255;if(10==s||13==s)e=e[m](0,r)+"?"+e[m](r+1)}}e&&2e3<e[w]&&(e=e[m](0,2e3),A(69));t=t+"="+e+"; path="+i+"; ";a&&(t+="expires="+new Date((new Date)[Q]()+a).toGMTString()+"; ");n&&(t+="domain="+n+";");P.cookie=t}};var Bi,Hi,Wi=function(){if(!Bi){var t={},e=I[st],i=I.screen;t.Q=i?i.width+"x"+i.height:"-";t.P=i?i.colorDepth+"-bit":"-";t.language=(e&&(e.language||e.browserLanguage)||"-")[u]();t.javaEnabled=e&&e.javaEnabled()?1:0;t.characterSet=P.characterSet||P.charset||"-";try{var n;var r=P.documentElement,a=P.body,o=a&&a[tt]&&a[rt],e=[];r&&r[tt]&&r[rt]&&("CSS1Compat"===P.compatMode||!o)?e=[r[tt],r[rt]]:o&&(e=[a[tt],a[rt]]);n=0>=e[0]||0>=e[1]?"":e[k]("x");t.Wa=n}catch(t){A(135)}Bi=t}},Yi=function(){Wi();for(var t=Bi,e=I[st],t=e.appName+e.version+t.language+e.platform+e.userAgent+t.javaEnabled+t.Q+t.P+(P.cookie?P.cookie:"")+(P.referrer?P.referrer:""),e=t[w],i=I.history[w];0<i;)t+=i--^e++;return Cr(t)},Zi=function(t){Wi();var e=Bi;t.set(ve,e.Q);t.set(ge,e.P);t.set(_e,e.language);t.set(pe,e.characterSet);t.set(me,e.javaEnabled);t.set(be,e.Wa);if(t.get(Xt)&&t.get(Rt)){if(!(e=Hi)){var i,n,r;n="ShockwaveFlash";if((e=(e=I[st])?e.plugins:void 0)&&0<e[w])for(i=0;i<e[w]&&!r;i++)n=e[i],-1<n[J][h]("Shockwave Flash")&&(r=n.description[v]("Shockwave Flash ")[1]);else{n=n+"."+n;try{i=new ActiveXObject(n+".7"),r=i.GetVariable("$version")}catch(t){}if(!r)try{i=new ActiveXObject(n+".6"),r="WIN 6,0,21,0",i.AllowScriptAccess="always",r=i.GetVariable("$version")}catch(t){}if(!r)try{i=new ActiveXObject(n),r=i.GetVariable("$version")}catch(t){}r&&(r=r[v](" ")[1][v](","),r=r[0]+"."+r[1]+" r"+r[2])}e=r?r:"-"}Hi=e;t.set(le,Hi)}else t.set(le,"-")};var Ji=function(t){if(ct(t))this.s=t;else{var e=t[0],i=e.lastIndexOf(":"),n=e.lastIndexOf(".");this.h=this.i=this.l="";-1==i&&-1==n?this.h=e:-1==i&&-1!=n?(this.i=e[m](0,n),this.h=e[m](n+1)):-1!=i&&-1==n?(this.l=e[m](0,i),this.h=e[m](i+1)):i>n?(this.i=e[m](0,n),this.l=e[m](n+1,i),this.h=e[m](i+1)):(this.i=e[m](0,n),this.h=e[m](n+1));this.k=t[z](1);this.Ma=!this.l&&"_require"==this.h;this.J=!this.i&&!this.l&&"_provide"==this.h}},Qi=function(){E(Qi[o],"push",Qi[o][b],5);E(Qi[o],"_getPlugin",li,121);E(Qi[o],"_createAsyncTracker",Qi[o].Sa,33);E(Qi[o],"_getAsyncTracker",Qi[o].Ta,34);this.I=new pt;this.p=[]};t=Qi[o];t.Na=function(t,e,i){var n=this.I.get(t);if(!ct(n))return!1;e.plugins_=e.plugins_||new pt;e.plugins_.set(t,new n(e,i||{}));return!0};t.push=function(t){var e=D.Va[ot](this,arguments),e=D.p.concat(e);for(D.p=[];0<e[w]&&!D.O(e[0])&&!(e.shift(),0<D.p[w]););D.p=D.p.concat(e);return 0};t.Va=function(t){for(var e=[],i=0;i<arguments[w];i++)try{var n=new Ji(arguments[i]);n.J?this.O(n):e[b](n)}catch(t){}return e};t.O=function(t){try{if(t.s)t.s[ot](I);else if(t.J)this.I.set(t.k[0],t.k[1]);else{var e="_gat"==t.i?j:"_gaq"==t.i?D:j.u(t.i);if(t.Ma){if(!this.Na(t.k[0],e,t.k[2])){if(!t.Pa){var i=wt(""+t.k[1]);var n=i[g],r=P[d][g];var a;if(a="https:"==n||n==r?!0:"http:"!=n?!1:"http:"==r){var o;t:{var s=wt(P[d][at]);if(!(i.Oa||0<=i.url[h]("?")||0<=i[Z][h]("://")||i[f]==s[f]&&i[W]==s[W]))for(var u="http:"==i[g]?80:443,c=j.S,e=0;e<c[w];e++)if(i[f]==c[e][0]&&(i[W]||u)==(c[e][1]||u)&&0==i[Z][h](c[e][2])){o=!0;break t}o=!1}a=o&&!zi()}a&&(t.Pa=lt(i.url))}return!0}}else t.l&&(e=e.plugins_.get(t.l)),e[t.h][ot](e,t.k)}}catch(t){}};t.Sa=function(t,e){return j.r(t,e||"")};t.Ta=function(t){return j.u(t)};var tn=function(){function n(t,e,i,n){void 0==o[t]&&(o[t]={});void 0==o[t][e]&&(o[t][e]=[]);o[t][e][i]=n}function i(t,e,i){if(void 0!=o[t]&&void 0!=o[t][e])return o[t][e][i]}function e(t,e){if(void 0!=o[t]&&void 0!=o[t][e]){o[t][e]=void 0;var i=!0,n;for(n=0;n<h[w];n++)if(void 0!=o[t][h[n]]){i=!1;break}i&&(o[t]=void 0)}}function r(t){var e="",i=!1,n,r;for(n=0;n<h[w];n++)if(r=t[h[n]],void 0!=r){i&&(e+=h[n]);for(var i=[],a=void 0,o=void 0,o=0;o<r[w];o++)if(void 0!=r[o]){a="";o!=p&&void 0==r[o-1]&&(a+=o[y]()+l);for(var s=r[o],u="",c=void 0,f=void 0,d=void 0,c=0;c<s[w];c++)f=s[U](c),d=_[f],u+=void 0!=d?d:f;a+=u;i[b](a)}e+=v+i[k](m)+g;i=!1}else i=!0;return e}var a=this,o=[],h=["k","v"],v="(",g=")",m="*",l="!",_={"'":"'0"};_[g]="'1";_[m]="'2";_[l]="'3";var p=1;a.Ra=function(t){return void 0!=o[t]};a.A=function(){for(var t="",e=0;e<o[w];e++)void 0!=o[e]&&(t+=e[y]()+r(o[e]));return t};a.Qa=function(t){if(void 0==t)return a.A();for(var e=t.A(),i=0;i<o[w];i++)void 0==o[i]||t.Ra(i)||(e+=i[y]()+r(o[i]));return e};a.f=function(t,e,i){if(!en(i))return!1;n(t,"k",e,i);return!0};a.o=function(t,e,i){if(!nn(i))return!1;n(t,"v",e,i[y]());return!0};a.getKey=function(t,e){return i(t,"k",e)};a.N=function(t,e){return i(t,"v",e)};a.L=function(t){e(t,"k")};a.M=function(t){e(t,"v")};E(a,"_setKey",a.f,89);E(a,"_setValue",a.o,90);E(a,"_getKey",a.getKey,87);E(a,"_getValue",a.N,88);E(a,"_clearKey",a.L,85);E(a,"_clearValue",a.M,86)};function en(t){return"string"==typeof t}function nn(t){return!("number"==typeof t||void 0!=Number&&t instanceof Number)||a.round(t)!=t||X(t)||t==N?!1:!0}var rn=function(t){var e=I.gaGlobal;t&&!e&&(I.gaGlobal=e={});return e},an=function(){var t=rn(!0).hid;null==t&&(t=ht(),rn(!0).hid=t);return t},on=function(t){t.set(he,an());var e=rn();if(e&&e.dh==t.get(C)){var i=e.sid;i&&(t.get(Te)?A(112):A(132),t.set(Se,i),t.get(ye)&&t.set(Ce,i));e=e.vid;t.get(ye)&&e&&(e=e[v]("."),t.set(x,1*e[0]),t.set(qe,1*e[1]))}};var sn,un=function(t,e,i,n){var r=t.c(Lt,""),a=t.c(S,"/");n=void 0!=n?n:t.b(Ot,0);t=t.c(s,"");Ui(e,i,a,r,t,n)},cn=function(t){var e=t.c(Lt,"");t.b(C,1);var i=t.c(S,"/"),n=t.c(s,"");Ui("__utma",xi(t),i,e,n,t.get(Ot));Ui("__utmb",Ti(t),i,e,n,t.get(jt));Ui("__utmc",""+t.b(C,1),i,e,n);var r=Pi(t,!0);r?Ui("__utmz",r,i,e,n,t.get(Dt)):Ui("__utmz","",i,e,"",-1);(r=Ai(t,!1))?Ui("__utmv",r,i,e,n,t.get(Ot)):Ui("__utmv","",i,e,"",-1)},fn=function(t){var e=t.b(C,1);if(!Si(t,Ci(e,L("__utma"))))return t.set(ke,!0),!1;var i=!Ei(t,Ci(e,L("__utmb")));t.set(Ee,i);Oi(t,Ci(e,L("__utmz")));Ii(t,Ci(e,L("__utmv")));sn=!i;return!0},dn=function(t){sn||0<L("__utmb")[w]||(Ui("__utmd","1",t.c(S,"/"),t.c(Lt,""),t.c(s,""),1e4),0==L("__utmd")[w]&&t[et]())};var hn=0,vn=function(t){void 0==t.get(x)?mn(t):t.get(ke)&&!t.get(ui)?mn(t):t.get(Ee)&&(ln(t),hn++,1<hn&&A(137))},gn=function(t){t.get(je)&&!t.get(Te)&&(ln(t),t.set(Le,t.get(xe)))},mn=function(t){var e=t.get(Pt);t.set(ye,!0);t.set(x,ht()^Yi(t)&2147483647);t.set(we,"");t.set(qe,e);t.set(Ce,e);t.set(Se,e);t.set(xe,1);t.set(Te,!0);t.set(Ae,0);t.set(r,10);t.set(Ie,e);t.set(se,[]);t.set(ke,!1);t.set(Ee,!1)},ln=function(t){t.set(Ce,t.get(Se));t.set(Se,t.get(Pt));t.Za(xe);t.set(Te,!0);t.set(Ae,0);t.set(r,10);t.set(Ie,t.get(Pt));t.set(Ee,!1)};var _n="daum:q eniro:search_word naver:query pchome:q images.google:q google:q yahoo:p yahoo:q msn:q bing:q aol:query aol:q lycos:q lycos:query ask:q netscape:query cnn:query about:terms mamma:q voila:rdata virgilio:qs live:q baidu:wd alice:qs yandex:text najdi:q seznam:q rakuten:qt biglobe:q goo.ne:MT wp:szukaj onet:qt yam:k kvasir:q ozu:q terra:query rambler:query conduit:q babylon:q search-results:q avg:q comcast:q incredimail:q startsiden:q go.mail.ru:q search.centrum.cz:q 360.cn:q".split(" "),pn=function(t){if(t.get(Gt)&&!t.get(ui)){for(var e=!l(t.get(De))||!l(t.get(Re))||!l(t.get(T))||!l(t.get(Ve)),i={},n=0;n<qn[w];n++){var r=qn[n];i[r]=t.get(r)}(n=t.get($e))?(A(149),r=new pt,kt(r,n),n=r):n=yt(P[d][at],t.get(Nt)).d;if("1"!=_t(n.get(t.get(Yt)))||!e)if(n=bn(t,n)||yn(t),n||e||!t.get(Te)||(kn(t,void 0,"(direct)",void 0,void 0,void 0,"(direct)","(none)",void 0,void 0),n=!0),n&&(t.set(je,Cn(t,i)),e="(direct)"==t.get(Re)&&"(direct)"==t.get(Ke)&&"(none)"==t.get(Ge),t.get(je)||t.get(Te)&&!e))t.set(Pe,t.get(Pt)),t.set(Le,t.get(xe)),t.Za(Oe)}},bn=function(n,r){function t(t,e){e=e||"-";var i=_t(r.get(n.get(t)));return i&&"-"!=i?p(i):e}var e=_t(r.get(n.get(zt)))||"-",i=_t(r.get(n.get(Ut)))||"-",a=_t(r.get(n.get(Ft)))||"-",o=_t(r.get("gclsrc"))||"-",s=_t(r.get("dclid"))||"-",u=t($t,"(not set)"),c=t(Bt,"(not set)"),f=t(Ht),d=t(Wt);if(l(e)&&l(a)&&l(s)&&l(i))return!1;var h=!l(a)&&!l(o),h=l(i)&&(!l(s)||h),v=l(f);if(h||v){var g=xn(n),g=yt(g,!0);(g=wn(n,g))&&!l(g[1]&&!g[2])&&(h&&(i=g[0]),v&&(f=g[1]))}kn(n,e,i,a,o,s,u,c,f,d);return!0},yn=function(t){var e=xn(t),i=yt(e,!0);if(!(void 0!=e&&null!=e&&""!=e&&"0"!=e&&"-"!=e&&0<=e[h]("://"))||i&&-1<i[f][h]("google")&&i.d.contains("q")&&"cse"==i[Z])return!1;if((e=wn(t,i))&&!e[2])return kn(t,void 0,e[0],void 0,void 0,void 0,"(organic)","organic",e[1],void 0),!0;if(e||!t.get(Te))return!1;t:{for(var e=t.get(ne),n=bt(i[f]),r=0;r<e[w];++r)if(-1<n[h](e[r])){t=!1;break t}kn(t,void 0,n,void 0,void 0,void 0,"(referral)","referral",void 0,"/"+i[Z]);t=!0}return t},wn=function(t,e){for(var i=t.get(ee),n=0;n<i[w];++n){var r=i[n][v](":");if(-1<e[f][h](r[0][u]())){var a=e.d.get(r[1]);if(a&&(a=q(a),!a&&-1<e[f][h]("google.")&&(a="(not provided)"),!r[3]||-1<e.url[h](r[3]))){t:{for(var i=a,n=t.get(ie),i=p(i)[u](),o=0;o<n[w];++o)if(i==n[o]){i=!0;break t}i=!1}return[r[2]||r[0],a,i]}}}return null},kn=function(t,e,i,n,r,a,o,s,u,c){t.set(De,e);t.set(Re,i);t.set(T,n);t.set(Ne,r);t.set(Ve,a);t.set(Ke,o);t.set(Ge,s);t.set(Me,u);t.set(ze,c)},qn=[Ke,De,T,Ve,Re,Ge,Me,ze],Cn=function(i,n){function t(t){t=(""+t)[v]("+")[k]("%20");return t=t[v](" ")[k]("%20")}function e(t){var e=""+(i.get(t)||"");t=""+(n[t]||"");return 0<e[w]&&e==t}if(e(T)||e(Ve))return A(131),!1;for(var r=0;r<qn[w];r++){var a=qn[r],o=n[a]||"-",a=i.get(a)||"-";if(t(o)!=t(a))return!0}return!1},Sn=RegExp(/^https?:\/\/(www\.)?google(\.com?)?(\.[a-z]{2}t?)?\/?$/i),xn=function(t){t=qt(t.get(de),t.get(S));try{if(Sn[M](t))return A(136),t+"?q="}catch(t){A(145)}return t};var Tn,En,An=function(t){Tn=t.c(T,"");En=t.c(Ne,"")},In=function(t){var e=t.c(T,""),i=t.c(Ne,"");e!=Tn&&(-1<i[h]("ds")?t.set(Xe,void 0):!l(Tn)&&-1<En[h]("ds")&&t.set(Xe,Tn))};var Pn=function(t){Ln(t,P[d][at])?(t.set(ui,!0),A(12)):t.set(ui,!1)},Ln=function(t,e){if(!t.get(Kt))return!1;var i=yt(e,t.get(Nt)),n=q(i.d.get("__utma")),r=q(i.d.get("__utmb")),a=q(i.d.get("__utmc")),o=q(i.d.get("__utmx")),s=q(i.d.get("__utmz")),u=q(i.d.get("__utmv")),i=q(i.d.get("__utmk"));if(Cr(""+n+r+a+o+s+u)!=i){n=p(n);r=p(r);a=p(a);o=p(o);a=jn(n+r+a+o,s,u,i);if(!a)return!1;s=a[0];u=a[1]}if(!Si(t,n,!0))return!1;Ei(t,r,!0);Oi(t,s,!0);Ii(t,u,!0);Gn(t,o,!0);return!0},On=function(t,e,i){var n;n=xi(t)||"-";var r=Ti(t)||"-",a=""+t.b(C,1)||"-",o=Mn(t)||"-",s=Pi(t,!1)||"-";t=Ai(t,!1)||"-";var u=Cr(""+n+r+a+o+s+t),c=[];c[b]("__utma="+n);c[b]("__utmb="+r);c[b]("__utmc="+a);c[b]("__utmx="+o);c[b]("__utmz="+s);c[b]("__utmv="+t);c[b]("__utmk="+u);n=c[k]("&");if(!n)return e;r=e[h]("#");if(i)return 0>r?e+"#"+n:e+"&"+n;i="";a=e[h]("?");0<r&&(i=e[m](r),e=e[m](0,r));return 0>a?e+"?"+n+i:e+"&"+n+i},jn=function(t,e,i,n){for(var r=0;3>r;r++){for(var a=0;3>a;a++){if(n==Cr(t+e+i))return A(127),[e,i];var o=e[c](/ /g,"%20"),s=i[c](/ /g,"%20");if(n==Cr(t+o+s))return A(128),[o,s];o=o[c](/\+/g,"%20");s=s[c](/\+/g,"%20");if(n==Cr(t+o+s))return A(129),[o,s];try{var u=e[H]("utmctr=(.*?)(?:\\|utm|$)");if(u&&2==u[w]&&(o=e[c](u[1],_(p(u[1]))),n==Cr(t+o+i)))return A(139),[o,i]}catch(t){}e=p(e)}i=p(i)}};var Dn="|",Kn=function(t,e,i,n,r,a,o,s,u){var c=Vn(t,e);c||(c={},t.get(re)[b](c));c.id_=e;c.affiliation_=i;c.total_=n;c.tax_=r;c.shipping_=a;c.city_=o;c.state_=s;c.country_=u;c.items_=c.items_||[];return c},Nn=function(t,e,i,n,r,a,o){t=Vn(t,e)||Kn(t,e,"",0,0,0,"","","");var s;t:{if(t&&t.items_){s=t.items_;for(var u=0;u<s[w];u++)if(s[u].sku_==i){s=s[u];break t}}s=null}u=s||{};u.transId_=e;u.sku_=i;u.name_=n;u.category_=r;u.price_=a;u.quantity_=o;s||t.items_[b](u);return u},Vn=function(t,e){for(var i=t.get(re),n=0;n<i[w];n++)if(i[n].id_==e)return i[n];return null};var Xn,Rn=function(t){if(!Xn){var e;e=P[d].hash;var i=I[J],n=/^#?gaso=([^&]*)/;if(i=(e=(e=e&&e[H](n)||i&&i[H](n))?e[1]:q(L("GASO")))&&e[H](/^(?:!([-0-9a-z.]{1,40})!)?([-.\w]{10,1200})$/i))un(t,"GASO",""+e,0),j._gasoDomain=t.get(Lt),j._gasoCPath=t.get(S),t=i[1],lt("https://www.google.com/analytics/web/inpage/pub/inpage.js?"+(t?"prefix="+t+"&":"")+ht(),"_gasojs");Xn=!0}};var Gn=function(t,e,i){i&&(e=p(e));i=t.b(C,1);e=e[v](".");2>e[w]||!/^\d+$/[M](e[0])||(e[0]=""+i,un(t,"__utmx",e[k]("."),void 0))},Mn=function(t,e){var i=Ci(t.get(C),L("__utmx"));"-"==i&&(i="");return e?_(i):i},zn=function(t){try{var e=yt(P[d][at],!1),i=R(_t(e.d.get("utm_referrer")))||"";i&&t.set(de,i);var n=R(q(e.d.get("utm_expid")))||"";n&&(n=n[v](".")[0],t.set(fi,""+n))}catch(t){A(146)}},$n=function(t){var e=I.gaData&&I.gaData.expId;e&&t.set(fi,""+e)};var Fn=function(t,e){var i=a.min(t.b(ii,0),100);if(t.b(x,0)%100>=i)return!1;i=Yn()||Zn();if(void 0==i)return!1;var n=i[0];if(void 0==n||n==N||X(n))return!1;0<n?Bn(i)?e(Wn(i)):e(Wn(i[z](0,1))):gt(I,"load",function(){Fn(t,e)},!1);return!0},Un=function(t,e,i,n){var r=new tn;r.f(14,90,e[m](0,500));r.f(14,91,t[m](0,150));r.f(14,92,""+Hn(i));void 0!=n&&r.f(14,93,n[m](0,500));r.o(14,90,i);return r},Bn=function(t){for(var e=1;e<t[w];e++)if(X(t[e])||t[e]==N||0>t[e])return!1;return!0},Hn=function(t){return X(t)||0>t?0:5e3>t?10*a[F](t/10):5e4>t?100*a[F](t/100):41e5>t?1e3*a[F](t/1e3):41e5},Wn=function(t){for(var e=new tn,i=0;i<t[w];i++)e.f(14,i+1,""+Hn(t[i])),e.o(14,i+1,t[i]);return e},Yn=function(){var t=I.performance||I.webkitPerformance;if(t=t&&t.timing){var e=t.navigationStart;if(0==e)A(133);else return[t.loadEventStart-e,t.domainLookupEnd-t.domainLookupStart,t.connectEnd-t.connectStart,t.responseStart-t.requestStart,t.responseEnd-t.responseStart,t.fetchStart-e,t.domInteractive-e,t.domContentLoadedEventStart-e]}},Zn=function(){if(I.top==I){var t=I.external,e=t&&t.onloadT;t&&!t.isValidLoadTime&&(e=void 0);2147483648<e&&(e=void 0);0<e&&t.setPageReadyTime();return void 0==e?void 0:[e]}};var Jn=function(t){if(t.get(ye))try{var e;t:{var i=L(t.get(di)||"_ga");if(i&&!(1>i[w])){for(var n=[],r=0;r<i[w];r++){var a;var o=i[r][v]("."),s=o.shift();if(("GA1"==s||"1"==s)&&1<o[w]){var u=o.shift()[v]("-");1==u[w]&&(u[1]="1");u[0]*=1;u[1]*=1;a={Ya:u,$a:o[k](".")}}else a=void 0;a&&n[b](a)}if(1==n[w]){e=n[0].$a;break t}if(0!=n[w]){var c=t.get(hi)||t.get(Lt),n=Qn(n,(0==c[h](".")?c.substr(1):c)[v](".")[w],0);if(1==n[w]){e=n[0].$a;break t}var f=t.get(vi)||t.get(S);(i=f)?(1<i[w]&&"/"==i[U](i[w]-1)&&(i=i.substr(0,i[w]-1)),0!=i[h]("/")&&(i="/"+i),f=i):f="/";n=Qn(n,"/"==f?1:f[v]("/")[w],1);e=n[0].$a;break t}}e=void 0}if(e){var d=(""+e)[v](".");2==d[w]&&/[0-9.]/[M](d)&&(A(114),t.set(x,d[0]),t.set(qe,d[1]),t.set(ye,!1))}}catch(t){A(115)}},Qn=function(t,e,i){for(var n=[],r=[],a=128,o=0;o<t[w];o++){var s=t[o];if(s.Ya[i]==e)n[b](s);else if(s.Ya[i]==a)r[b](s);else s.Ya[i]<a&&(r=[s],a=s.Ya[i])}return 0<n[w]?n:r};var O=function(t,e,i){function n(n){return function(t){if((t=t.get(ci)[n])&&t[w])for(var e=pi(r,n),i=0;i<t[w];i++)t[i].call(r,e)}}var r=this;this.a=new ki;this.get=function(t){return this.a.get(t)};this.set=function(t,e,i){this.a.set(t,e,i)};this.set(s,e||"UA-XXXXX-X");this.set(It,t||"");this.set(At,i||"");this.set(Pt,a.round((new Date)[Q]()/1e3));this.set(S,"/");this.set(Ot,63072e6);this.set(Dt,15768e6);this.set(jt,18e5);this.set(Kt,!1);this.set(te,50);this.set(Nt,!1);this.set(Vt,!0);this.set(Xt,!0);this.set(Rt,!0);this.set(Gt,!0);this.set(Mt,!0);this.set($t,"utm_campaign");this.set(zt,"utm_id");this.set(Ft,"gclid");this.set(Ut,"utm_source");this.set(Bt,"utm_medium");this.set(Ht,"utm_term");this.set(Wt,"utm_content");this.set(Yt,"utm_nooverride");this.set(Zt,100);this.set(ii,1);this.set(ni,!1);this.set(Jt,"/__utm.gif");this.set(Qt,1);this.set(re,[]);this.set(se,[]);this.set(ee,_n[z](0));this.set(ie,[]);this.set(ne,[]);this.B("auto");this.set(de,P.referrer);zn(this.a);this.set(ci,{hit:[],load:[]});this.a.g("0",Pn);this.a.g("1",An);this.a.g("2",vn);this.a.g("3",Jn);this.a.g("4",pn);this.a.g("5",In);this.a.g("6",gn);this.a.g("7",n("load"));this.a.g("8",Rn);this.a.e("A",Vi);this.a.e("B",Xi);this.a.e("C",Ri);this.a.e("D",vn);this.a.e("E",Ni);this.a.e("F",wi);this.a.e("G",tr);this.a.e("H",dn);this.a.e("I",Gi);this.a.e("J",Zi);this.a.e("K",on);this.a.e("L",$n);this.a.e("M",n("hit"));this.a.e("N",gr);this.a.e("O",er);0===this.get(Pt)&&A(111);this.a.T();this.H=void 0};t=O[o];t.m=function(){var t=this.get(ae);t||(t=new tn,this.set(ae,t));return t};t.La=function(t){for(var e in t){var i=t[e];t.hasOwnProperty(e)&&this.set(e,i,!0)}};t.K=function(e){if(this.get(ni))return!1;var i=this,t=Fn(this.a,function(t){i.set(ce,e,!0);i.t(t)});this.set(ni,t);return t};t.Fa=function(t){t&&ft(t)?(A(13),this.set(ce,t,!0)):"object"===typeof t&&null!==t&&this.La(t);this.H=t=this.get(ce);this.a.j("page");this.K(t)};t.F=function(t,e,i,n,r){if(""==t||!en(t)||""==e||!en(e)||void 0!=i&&!en(i)||void 0!=n&&!nn(n))return!1;this.set(We,t,!0);this.set(Ye,e,!0);this.set(Ze,i,!0);this.set(Je,n,!0);this.set(He,!!r,!0);this.a.j("event");return!0};t.Ha=function(t,e,i,n,r){var a=this.a.b(ii,0);1*r===r&&(a=r);if(this.a.b(x,0)%100>=a)return!1;i=1*(""+i);if(""==t||!en(t)||""==e||!en(e)||!nn(i)||X(i)||0>i||0>a||100<a||void 0!=n&&(""==n||!en(n)))return!1;this.t(Un(t,e,i,n));return!0};t.Ga=function(t,e,i,n){if(!t||!e)return!1;this.set(Qe,t,!0);this.set(ti,e,!0);this.set(ei,i||P[d][at],!0);n&&this.set(ce,n,!0);this.a.j("social");return!0};t.Ea=function(){this.set(ii,10);this.K(this.H)};t.Ia=function(){this.a.j("trans")};t.t=function(t){this.set(oe,t,!0);this.a.j("event")};t.ia=function(n){this.v();var r=this;return{_trackEvent:function(t,e,i){A(91);r.F(n,t,e,i)}}};t.ma=function(t){return this.get(t)};t.xa=function(t,e){if(t)if(ft(t))this.set(t,e);else if("object"==typeof t)for(var i in t)t.hasOwnProperty(i)&&this.set(i,t[i])};t.addEventListener=function(t,e){var i=this.get(ci)[t];i&&i[b](e)};t.removeEventListener=function(t,e){for(var i=this.get(ci)[t],n=0;i&&n<i[w];n++)if(i[n]==e){i.splice(n,1);break}};t.qa=function(){return"5.4.6"};t.B=function(t){this.get(Vt);t="auto"==t?bt(P.domain):t&&"-"!=t&&"none"!=t?t[u]():"";this.set(Lt,t)};t.va=function(t){this.set(Vt,!!t)};t.na=function(t,e){return On(this.a,t,e)};t.link=function(t,e){if(this.a.get(Kt)&&t){var i=On(this.a,t,e);P[d].href=i}};t.ua=function(t,e){this.a.get(Kt)&&t&&t.action&&(t.action=On(this.a,t.action,e))};t.za=function(){this.v();var t=this.a,e=P.getElementById?P.getElementById("utmtrans"):P.utmform&&P.utmform.utmtrans?P.utmform.utmtrans:null;if(e&&e[B]){t.set(re,[]);for(var e=e[B][v]("UTM:"),i=0;i<e[w];i++){e[i]=dt(e[i]);for(var n=e[i][v](Dn),r=0;r<n[w];r++)n[r]=dt(n[r]);"T"==n[0]?Kn(t,n[1],n[2],n[3],n[4],n[5],n[6],n[7],n[8]):"I"==n[0]&&Nn(t,n[1],n[2],n[3],n[4],n[5],n[6])}}};t.$=function(t,e,i,n,r,a,o,s){return Kn(this.a,t,e,i,n,r,a,o,s)};t.Y=function(t,e,i,n,r,a){return Nn(this.a,t,e,i,n,r,a)};t.Aa=function(t){Dn=t||"|"};t.ea=function(){this.set(re,[])};t.wa=function(t,e,i,n){var r=this.a;if(0>=t||t>r.get(te))t=!1;else if(!e||!i||128<e[w]+i[w])t=!1;else{1!=n&&2!=n&&(n=3);var a={};G(a,e);a.value=i;a.scope=n;r.get(se)[t]=a;t=!0}t&&this.a.n();return t};t.ka=function(t){this.a.get(se)[t]=void 0;this.a.n()};t.ra=function(t){return(t=this.a.get(se)[t])&&1==t[it]?t[B]:void 0};t.Ca=function(t,e,i){this.m().f(t,e,i)};t.Da=function(t,e,i){this.m().o(t,e,i)};t.sa=function(t,e){return this.m().getKey(t,e)};t.ta=function(t,e){return this.m().N(t,e)};t.fa=function(t){this.m().L(t)};t.ga=function(t){this.m().M(t)};t.ja=function(){return new tn};t.W=function(t){t&&this.get(ie)[b](t[u]())};t.ba=function(){this.set(ie,[])};t.X=function(t){t&&this.get(ne)[b](t[u]())};t.ca=function(){this.set(ne,[])};t.Z=function(t,e,i,n,r){if(t&&e){t=[t,e[u]()][k](":");if(n||r)t=[t,n,r][k](":");n=this.get(ee);n.splice(i?0:n[w],0,t)}};t.da=function(){this.set(ee,[])};t.ha=function(t){this.a[$]();var e=this.get(S),i=Mn(this.a);this.set(S,t);this.a.n();Gn(this.a,i);this.set(S,e)};t.ya=function(t,e){if(0<t&&5>=t&&ft(e)&&""!=e){var i=this.get(ri)||[];i[t]=e;this.set(ri,i)}};t.V=function(t){t=""+t;if(t[H](/^[A-Za-z0-9]{1,5}$/)){var e=this.get(si)||[];e[b](t);this.set(si,e)}};t.v=function(){this.a[$]()};t.Ba=function(t){t&&""!=t&&(this.set(we,t),this.a.j("var"))};var tr=function(t){"trans"!==t.get(Fe)&&500<=t.b(Ae,0)&&t[et]();if("event"===t.get(Fe)){var e=(new Date)[Q](),i=t.b(Ie,0),n=t.b(Se,0),i=a[F]((e-(i!=n?i:1e3*i))/1e3*1);0<i&&(t.set(Ie,e),t.set(r,a.min(10,t.b(r,0)+i)));0>=t.b(r,0)&&t[et]()}},er=function(t){"event"===t.get(Fe)&&t.set(r,a.max(0,t.b(r,10)-1))};var ir=function(){var n=[];this.add=function(t,e,i){i&&(e=_(""+e));n[b](t+"="+e)};this.toString=function(){return n[k]("&")}},nr=function(t,e){(e||2!=t.get(Qt))&&t.Za(Ae)},rr=function(t,e){e.add("utmwv","5.4.6");e.add("utms",t.get(Ae));e.add("utmn",ht());var i=P[d].hostname;l(i)||e.add("utmhn",i,!0);i=t.get(Zt);100!=i&&e.add("utmsp",i,!0)},ar=function(t,e){e.add("utmht",(new Date)[Q]());e.add("utmac",dt(t.get(s)));t.get(fi)&&e.add("utmxkey",t.get(fi),!0);t.get(He)&&e.add("utmni",1);var i=t.get(si);i&&0<i[w]&&e.add("utmdid",i[k]("."));sr(t,e);!1!==t.get(Et)&&(t.get(Et)||j.w)&&e.add("aip",1);j.bb||(j.bb=t.get(s));(1<j.ab()||j.bb!=t.get(s))&&e.add("utmmt",1);e.add("utmu",Mi.Xa())},or=function(t,e){for(var i=t.get(ri)||[],n=[],r=1;r<i[w];r++)i[r]&&n[b](r+":"+_(i[r][c](/%/g,"%25")[c](/:/g,"%3A")[c](/,/g,"%2C")));n[w]&&e.add("utmpg",n[k](","))},sr=function(t,e){function i(t,e){e&&n[b](t+"="+e+";")}var n=[];i("__utma",xi(t));i("__utmz",Pi(t,!1));i("__utmv",Ai(t,!0));i("__utmx",Mn(t));e.add("utmcc",n[k]("+"),!0)},ur=function(t,e){t.get(Xt)&&(e.add("utmcs",t.get(pe),!0),e.add("utmsr",t.get(ve)),t.get(be)&&e.add("utmvp",t.get(be)),e.add("utmsc",t.get(ge)),e.add("utmul",t.get(_e)),e.add("utmje",t.get(me)),e.add("utmfl",t.get(le),!0))},cr=function(t,e){t.get(Mt)&&t.get(fe)&&e.add("utmdt",t.get(fe),!0);e.add("utmhid",t.get(he));e.add("utmr",qt(t.get(de),t.get(S)),!0);e.add("utmp",_(t.get(ce),!0),!0)},fr=function(t,e){for(var i=t.get(ae),n=t.get(oe),r=t.get(se)||[],a=0;a<r[w];a++){var o=r[a];o&&(i||(i=new tn),i.f(8,a,o[J]),i.f(9,a,o[B]),3!=o[it]&&i.f(11,a,""+o[it]))}l(t.get(We))||l(t.get(Ye),!0)||(i||(i=new tn),i.f(5,1,t.get(We)),i.f(5,2,t.get(Ye)),r=t.get(Ze),void 0!=r&&i.f(5,3,r),r=t.get(Je),void 0!=r&&i.o(5,1,r));i?e.add("utme",i.Qa(n),!0):n&&e.add("utme",n.A(),!0)},dr=function(t,e,i){var n=new ir;nr(t,i);rr(t,n);n.add("utmt","tran");n.add("utmtid",e.id_,!0);n.add("utmtst",e.affiliation_,!0);n.add("utmtto",e.total_,!0);n.add("utmttx",e.tax_,!0);n.add("utmtsp",e.shipping_,!0);n.add("utmtci",e.city_,!0);n.add("utmtrg",e.state_,!0);n.add("utmtco",e.country_,!0);fr(t,n);ur(t,n);cr(t,n);(e=t.get(ue))&&n.add("utmcu",e,!0);i||(or(t,n),ar(t,n));return n[y]()},hr=function(t,e,i){var n=new ir;nr(t,i);rr(t,n);n.add("utmt","item");n.add("utmtid",e.transId_,!0);n.add("utmipc",e.sku_,!0);n.add("utmipn",e.name_,!0);n.add("utmiva",e.category_,!0);n.add("utmipr",e.price_,!0);n.add("utmiqt",e.quantity_,!0);fr(t,n);ur(t,n);cr(t,n);(e=t.get(ue))&&n.add("utmcu",e,!0);i||(or(t,n),ar(t,n));return n[y]()},vr=function(t,e){var i=t.get(Fe);if("page"==i)i=new ir,nr(t,e),rr(t,i),fr(t,i),ur(t,i),cr(t,i),e||(or(t,i),ar(t,i)),i=[i[y]()];else if("event"==i)i=new ir,nr(t,e),rr(t,i),i.add("utmt","event"),fr(t,i),ur(t,i),cr(t,i),e||(or(t,i),ar(t,i)),i=[i[y]()];else if("var"==i)i=new ir,nr(t,e),rr(t,i),i.add("utmt","var"),!e&&ar(t,i),i=[i[y]()];else if("trans"==i)for(var i=[],n=t.get(re),r=0;r<n[w];++r){i[b](dr(t,n[r],e));for(var a=n[r].items_,o=0;o<a[w];++o)i[b](hr(t,a[o],e))}else"social"==i?e?i=[]:(i=new ir,nr(t,e),rr(t,i),i.add("utmt","social"),i.add("utmsn",t.get(Qe),!0),i.add("utmsa",t.get(ti),!0),i.add("utmsid",t.get(ei),!0),fr(t,i),ur(t,i),cr(t,i),or(t,i),ar(t,i),i=[i[y]()]):"feedback"==i?e?i=[]:(i=new ir,nr(t,e),rr(t,i),i.add("utmt","feedback"),i.add("utmfbid",t.get(ai),!0),i.add("utmfbpr",t.get(oi),!0),fr(t,i),ur(t,i),cr(t,i),or(t,i),ar(t,i),i=[i[y]()]):i=[];return i},gr=function(t){var e,i=t.get(Qt),n=t.get(Be),r=n&&n.Ua,a=0;if(0==i||2==i){var o=t.get(Jt)+"?";e=vr(t,!0);for(var s=0,u=e[w];s<u;s++)_r(e[s],r,o,!0),a++}if(1==i||2==i)for(e=vr(t),s=0,u=e[w];s<u;s++)try{_r(e[s],r),a++}catch(t){t&&St(t[J],void 0,t.message)}n&&(n.q=a)};var mr=function(t){G(this,"len");this.message=t+"-8192"},lr=function(t){G(this,"ff2post");this.message=t+"-2036"},_r=function(t,e,i,n){e=e||vt;if(n||2036>=t[w])pr(t,e,i);else if(8192>=t[w]){if(0<=I[st].userAgent[h]("Firefox")&&![].reduce)throw new lr(t[w]);br(t,e)||yr(t,e)}else throw new mr(t[w])},pr=function(t,e,i){i=i||("https:"==P[d][g]||j.G?"https://ssl.google-analytics.com":"http://www.google-analytics.com")+"/__utm.gif?";var n=new Image(1,1);n.src=i+t;n.onload=function(){n.onload=null;n.onerror=null;e()};n.onerror=function(){n.onload=null;n.onerror=null;e()}},br=function(t,e){var i,n=("https:"==P[d][g]||j.G?"https://ssl.google-analytics.com":"http://www.google-analytics.com")+"/p/__utm.gif",r=I.XDomainRequest;if(r)i=new r,i.open("POST",n);else if(r=I.XMLHttpRequest)r=new r,"withCredentials"in r&&(i=r,i.open("POST",n,!0),i.setRequestHeader("Content-Type","text/plain"));if(i)return i.onreadystatechange=function(){4==i.readyState&&(e(),i=null)},i.send(t),!0},yr=function(e,t){if(P.body){e=K(e);try{var i=P[Y]('<iframe name="'+e+'"></iframe>')}catch(t){i=P[Y]("iframe"),G(i,e)}i.height="0";i.width="0";i.style.display="none";i.style.visibility="hidden";var n=P[d],n=("https:"==P[d][g]||j.G?"https://ssl.google-analytics.com":"http://www.google-analytics.com")+"/u/post_iframe.html#"+K(n[g]+"//"+n[f]+"/favicon.ico"),r=function(){i.src="";i.parentNode&&i.parentNode.removeChild(i)};gt(I,"beforeunload",r);var a=!1,o=0,s=function(){if(!a){try{if(9<o||i.contentWindow[d][f]==P[d][f]){a=!0;r();mt(I,"beforeunload",r);t();return}}catch(t){}o++;V(s,200)}};gt(i,"load",s);P.body.appendChild(i);i.src=n}else Fi(function(){yr(e,t)},100)};var wr=function(){this.G=this.w=!1;this.C={};this.D=[];this.U=0;this.S=[["www.google-analytics.com","","/plugins/"]];this._gasoCPath=this._gasoDomain=this.bb=void 0;gi();mi()};t=wr[o];t.oa=function(t,e){return this.r(t,void 0,e)};t.r=function(t,e,i){e&&A(23);i&&A(67);void 0==e&&(e="~"+j.U++);t=new O(e,t,i);j.C[e]=t;j.D[b](t);return t};t.u=function(t){t=t||"";return j.C[t]||j.r(void 0,t)};t.pa=function(){return j.D[z](0)};t.ab=function(){return j.D[w]};t.aa=function(){this.w=!0};t.la=function(){this.G=!0};var kr=function(t){if("prerender"==P.webkitVisibilityState)return!1;t();return!0};var j=new wr;var qr=I._gat;qr&&ct(qr._getTracker)?j=qr:I._gat=j;var D=new Qi;(function(t){if(!kr(t)){A(123);var e=!1,i=function(){!e&&kr(t)&&(e=!0,mt(P,"webkitvisibilitychange",i))};gt(P,"webkitvisibilitychange",i)}})(function(){var t=I._gaq,e=!1;if(t&&ct(t[b])&&(e="[object Array]"==Object[o][y].call(Object(t)),!e)){D=t;return}I._gaq=D;e&&D[b][ot](D,t)});function Cr(t){var e=1,i=0,n;if(t)for(e=0,n=t[w]-1;0<=n;n--)i=t.charCodeAt(n),e=(e<<6&268435455)+i+(i<<14),i=e&266338304,e=0!=i?e^i>>21:e;return e}})();