---
title: 开启命令行下的社交
description: 前段时间把手机上的 QQ 给卸载了，希望可以把时间凝聚在更加有价值的位置，今天突然又想起了这个软件，突发奇想，在命令行下玩弄 QQ。
warning: true
categories:
  - 工具
  - 网络技术
  - Linux
  - 随笔
tags:
  - Mojo-WebQQ
  - IRC
date: 2016-02-14 10:00:00
---


最近一直在命令行下工作，除了 Google Chrome，几乎很少接触 GUI 相关的软件。前段时间把手机上的 QQ 给卸载了，希望可以把时间凝聚在更加有价值的位置，今天突然又想起了这个软件，突发奇想，在命令行下玩弄 QQ。

<!--more-->

在知乎和 V2ex 上搜了一番，在 github 上找到了一个还比较满意的开源项目，使用 perl 语言编写的，虽然不动 perl ，但是人家提供了丰富的 API 可以调用，于是就深入了解了下。

![img](/blogimgs/2016/02/14/20160202_f7aea0c0.png)

### Mojo-Webqq 的安装和使用

项目名称叫做 Mojo-Webqq，它应该算是 smartQQ 的客户端非 GUI 框架，前几年玩 Linux 的人可能对 smartQQ 比较了解，就是一个网页上跑的 QQ，不过现在已经更名为 WebQQ 了，玩耍地址：<http://web2.qq.com/>。

估计作者也是一个 Linux 玩家，所有的安装指南都是 Linux 上的说明，我用的 mac，也尝试按照 ReadMe 文档安装了下。

1.首先配置 cpan，直接在命令行输入 cpan 按照提示选择默认配置即可。

```bash
$ cpan
```

2.然后安装 cpanm 工具

```bash
$ can -i App:coanminus
```

3.使用 cpanm 在线安装 Mojo:Webqq 模块

```bash
$ cpanm -v Mojo::Webqq
```

不了解 Perl 语言，也不知道 cpanm 是个什么东西，估计跟 Nodejs 的 npm 是一样的，包管理工具。

如果期间安装失败，很可能是某个依赖包安装不成功，这个时候多留意下错误提示，然后 google 搜索怎样安装才是正确的姿势。

使用方式就比较简单了，创建一个实例跑起来：

```perl
#!/usr/bin/env perl
use Mojo::Webqq;
my ($qq,$host,$port,$post_api);

$qq = 12345678;    #修改为你自己的实际QQ号码
$host = "0.0.0.0"; #发送消息接口监听地址，修改为自己希望监听的地址
$port = 5000;      #发送消息接口监听端口，修改为自己希望监听的端口
$post_api = 'http://xxxx';  #接收到的消息上报接口，如果不需要接收消息上报，可以删除此行

my $client = Mojo::Webqq->new(qq=>$qq);
$client->login();
$client->load("ShowMsg");
$client->load("Openqq",data=>{listen=>[{host=>$host,port=>$port}], post_api=>$post_api});
$client->run();
```

上述代码保存成 xxxx.pl 文件，然后使用 perl 来运行，就会完成 QQ 登录并在本机产生一个监听指定地址端口的 http server，发送好友消息的接口调用示例：

```bash
curl http://127.0.0.1:5000/openqq/send_message?qq=xxxxx&content=hello
```

具体可以翻阅 [文档说明](//github.com/sjdy521/Mojo-Webqq/blob/master/README.md)

### IRC 相关学习

以前玩 Linux 的时候就接触过一些 IRC 的客户端，当时感觉找到了这个世界对程序员开放的窗口，各种技术 Channel，各种交流，很是激动（当然，现在不以为然）。

Google 找了下网上的推荐，一般都是使用 Weechat 或者 irssi。两个软件的安装都比较麻烦，依赖了很多软件包，不说安装和编译时间，就依赖软件包的下载时间就有半小时。

先选用的 Weechat ，安装好了之后，死活调不好中文设置，不知道这样是不是正确的：

```
/charset decode GB2312
```

反正我是没搞好，但是学会了 IRC 的基本使用。后面还是改用成 irssi，展示没有 weechat 友好，不过默认支持中文输入。

IRC 的使用，我觉得也不用太多地去看文档，进入交互命令行之后，键入 `/help`，系统会把所有的命令都打印出来，然后你感觉应该用哪个就去继续学习就行了，比如连接到一个频道，可以键入

```
/help server
```

或者 

```
/help connect
```

这些关键词都是从 `/help` 中找到的，以 weechat 为例，给出几个设置命令以供入门。

```
# 添加一个 server
/server add free node chat.freenode.net
# 自动链接到 freenode
/set irc.server.freenode.autoconnect on
# 设置 nicks，username，realname
/set irc.server.freenode.nicks “nickname”
/set irc.server.freenode.username “username”
/set irc.server.freenode.realname “realname”
```

输入框中键入 `/connect freenode` 就可连接到 freenode 的服务器,输入 `/join #javascript` 就可以加入到 #javascript 群组里了。


```
# 自动认证 nickname
/set irc.server.freenode.command "/msg nickserv identify xxxxxx"
# 自动加入群组
/set irc.server.freenode.autojoin "#channel1,#channel2"
```

对鼠标的支持：

```
# 启动鼠标支持
/moune enable
# 打开时就支持
/set weechat.look.mouse on
```

更多文档，可以在 google 中检索下。

有好多天没有码字了，今天学习的主题是 Mojo-Webqq 和 IRC，就先说这么多，后续会把每天学习和关注的知识点都记录下，方便自己，也方便他人。