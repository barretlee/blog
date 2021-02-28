---
title: OAuth认证原理及HTTP下的密码安全传输
categories:
  - 前端杂烩
  - 网络安全
tags:
  - tech
  - cnblogs
warning: true
date: 2013-11-26 02:58:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/11/26/authentication-in-web.html" target="_blank">博客园</a>.</div>

<p>很多人都会问这样一个问题，我们在登录的时候，密码会不会泄露？随便进一个网站，登录时抓包分析，可以看到自己的密码都是明文传输的，在如此复杂的web环境下，我们没有百分的把握保证信息在传输过程中不被截获，那不使用明文如何告诉服务器自己的身份呢？</p>
<p>在一些高度通信安全的网络中，数据传输会使用HTTPS作为传输协议，但是通常情况下我们没必要使用HTTPS传输，虽说安全，但传输数据都需要加密解密，很费时。我们可以使用一些加密方式（如md5）对密码进行加密，如果仅仅只对密码加密那肯定是没有任何作用，所以可以在密码中加入一些其他的字符，合并之后使这个密码成为一个临时密码~</p>

```
<label>username:</label><input id="uid" type="text">
<label>password:</label><input id="pwd" type="password">
<input type="submit">
<script type="text/javascript">
    var t = new Date*1,
        uid = $("#uid").val(),
        pwd = $("#pwd").val(),
        delta = encrypt($("#pwd").val() + t);

    $.post("./login.php",{
        uid: $("#uid").val(),
        pwd: delta,
        tid: t
    }, function(data){
        //do something.
    })
</script>

```

<p>在上面，提交表单的时候，pwd并不是真实的密码，他是pwd与t混合再加密的字符串。这样的字符串即便是被人截获也是一个无效的数据，即便是截获并知道了破解方式，我们还可以在后台给他设定一个时效限制。</p>

```
<?php
    define("uid", "user-A");
    define("pwd", "user-A-pwd");

if(time() - $_POST['tid'] > 60*2 ||
    $_POST['uid'] !== uid ||
    decrypt(pwd . $_POST['tid']) !== $_POST['pwd']){
    die("error");
}
?>

```

<p>如果下面三个条件有一个不满足就报错</p>
<ul>
<li>时间超过2分钟</li>
<li>uid不匹配</li>
<li>pwd与t的组合密码不匹配</li>
</ul>
<p>当然，上面提到的encrypt和decrypt都是约定好的加密和解密方式，通常会使用md5加密。</p>
<p>这样的加密传输方式，需要客户端和服务器端的时间比较准确。如果要考虑时间不准确问题以及hacker动作迅速的问题，那就得用token来验证了。</p>
<p>所谓的token，其实就是在登录之前向服务器发送一个请求，获取准入的一个临时密码，这个临时密码是由服务器给出，所以不存在上面所说的时间不准确问题，同时这个token也是一个随机的字符串，只能单次使用，hacker很难获取，即便获取也无法使用，因为下一步登录所需的信息他没有。</p>
<p>很多童鞋都用过人人、QQ、微博的开发平台，其中OAuth认证也就是这个原理。就拿人人开发平台的认证来说，他的认证流程是这样的：&nbsp;</p>
<p><img src="//img.alicdn.com/tfs/TB1oyqGa_tYBeNjy1XdXXXXyVXa-300-300.png" data-original="/blogimgs/2013/11/26/26144042-63a32b86b7574f06adb31c99a39b4316.png" data-source="http://images.cnitblog.com/blog/387325/201311/26144042-63a32b86b7574f06adb31c99a39b4316.png" alt="renren"></p>
<p>通过你在平台申请的API KEY向//graph.renren.com/oauth/authorize请求一个临时密码，也就是token code，然后利用token code向//graph.renren.com/oauth/token请求用户数据。整个流程十分简单。</p>
<p>这是一个简单的demo，获取你的头像和姓名。<a href="http://qianduannotes.duapp.com/renren/enter.html" target="_blank">人人OAuth认证demo</a></p>
<p>使用token的弊端是需要额外发送一次请求，过程稍微复杂。有些公司VPN通道就是利用token做密码，为了保证高安全性，他们使用的是一个信息与服务器同步硬件设备，和银行发的动态口令一样，每次登陆都需要输入这个口令，那这个口令也就是token，不过他不是网络传输获取，所以安全性更高。</p>

