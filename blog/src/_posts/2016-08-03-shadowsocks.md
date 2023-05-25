---
title: Shadowsocks 原理简介及安装指南
warning: true
categories:
  - 工具
  - 网络交互
tags:
  - Shadowsocks
date: 2016-08-03 21:08:40
description: 对 Shadowsocks 早有耳闻，当时我还在用 HTTP 代理、VPN 服务等翻墙，感觉它是个比较高大上的东西，也一直没有碰它。最近 GreenVPN 抽风，Mac 一直连接不上，害得我折腾了很久，最后还是买了一台国外的 VPS，于是开始折腾起 Shadowsocks，部署之前，对它做了一个简单的了解，下面先介绍下。
---


对 Shadowsocks 早有耳闻，当时我还在用 HTTP 代理、VPN 服务等翻墙，感觉它是个比较高大上的东西，也一直没有碰它。最近 GreenVPN 抽风，Mac 一直连接不上，害得我折腾了很久，最后还是买了一台国外的 VPS，于是开始折腾起 Shadowsocks，部署之前，对它做了一个简单的了解，下面先介绍下。

<!--more-->

![Shadowsocks](/blogimgs/2016/08/03/6c0378f8gw1f6gx28ymtqj20p00dwdg3.jpg)<!--<source src="http://ww2.sinaimg.cn/large/6c0378f8gw1f6gx28ymtqj20p00dwdg3.jpg">-->

### 一道隐形的墙

众所周知，天朝局域网通过 [GFW](http://zh.wikipedia.org/wiki/%E9%87%91%E7%9B%BE%E5%B7%A5%E7%A8%8B) 隔离了我们与外界的交流，当然，这个隔离并非完全隔离，而是选择性的，天朝不希望你上的网站就直接阻断。每一个网络请求都是有数据特征的，不同的协议具备不同的特征，比如 HTTP/HTTPS 这类请求，会很明确地告诉 GFW 它们要请求哪个域名；再比如 TCP 请求，它只会告诉 GFW 它们要请求哪个 IP。

GFW 封锁包含多种方式，最容易操作也是最基础的方式便是域名黑白名单，在黑名单内的域名不让通过，IP 黑白名单也是这个道理。如果你有一台国外服务器不在 GFW 的黑名单内，天朝局域网的机器就可以跟这一台机器通讯。那么一个翻墙的方案就出来了：境内设备与境外机器通讯，境内想看什么网页，就告诉境外的机器，让境外机器代理抓取，然后送回来，我们要做的就是保证境内设备与境外设备通讯时不被 GFW 怀疑和窃听。

ssh tunnel 是比较具有代表性的防窃听通讯隧道，通过 ssh 与境外服务器建立一条加密通道，此时的通讯 GFW 会将其视作普通的连接。由于大家都这么玩，GFW 着急了，于是它通过各种流量特征分析，渐渐的能够识别哪些连接是 ssh 隧道，并尝试性的对隧道做干扰，结果还是玩不过 GFW，众多隧道纷纷不通。

### Shadowsocks 及其部署

如果你理解了上面那道隐形的墙的原理，那 Shadowsocks 的原理就可以用一句简单的描述来理解了：它发出的 TCP 包，没有明显包特征，GFW 分析不出来，当作普通流量放过了。

**1. 基本原理**

具体而言，Shadowsocks 将原来 ssh 创建的 Socks5 协议拆开成 Server 端和 Client 端，两个端分别安装在境外服务器和境内设备上。

```
+------+     +------+     +=====+     +------+     +-------+
| 设备  | <-> |Client| <-> | GFW | <-> |Server| <-> | 服务器 |
+------+     +------+     +=====+     +------+     +-------+ 
```

Client 和 Server 之间可以通过多种方式加密，并要求提供密码确保链路的安全性。

**2. 服务器端部署**

Shadowsocks 封装后对用户而言就是一个程序指令，以 Ubuntu 为例，首先安装 pip，

```bash
apt-get install python-pip
pip install shadowsocks
```

注意 pip 的安装现在要求 python 版本大于等于 2.6，然后通过 pip 安装 shadowsocks。启动 shadowsocks 有两种方式，一种是通过一行命令直接启动：

```bash
ssserver -p PORT -k PASSWORD -m rc4-md5 --log-file /tmp/ss.log -d start
```

另一种是使用 config 文件启动，如先配置好文件（/etc/shadowsocks.json）：

```json
{
  "server": "YOUR_SERVER_IP",
  "server_port": 8388,  
  "local_address": "127.0.0.1",  
  "local_port": 1080,  
  "password": "PASSWORD",
  "timeout": 300,  
  "method":"aes-256-cfb",  
}
```

然后通过 ssserver 启动：

```bash
ssserver -c /etc/shadowsocks.json -d start
```

更加具体的配置说明，请戳 [这里](https://github.com/breakwa11/shadowsocks-rss/wiki/config.json) 和 [这里](https://github.com/breakwa11/shadowsocks-rss/wiki/Server-Setup)。

**3. 客户端配置**

Mac 客户端的下载地址：

- [Github](https://github.com/shadowsocks/shadowsocks-iOS/releases)
- [墙内地址](http://getchrome.sinaapp.com/)，下方右侧

配置位置：

![配置1](/blogimgs/2016/08/03/6c0378f8gw1f6gwkqh7y0j20ok0g2jwd.jpg)<!--<source src="http://ww3.sinaimg.cn/large/6c0378f8gw1f6gwkqh7y0j20ok0g2jwd.jpg">-->

配置方式：

![配置2](/blogimgs/2016/08/03/6c0378f8gw1f6gwjoe3k9j20so0i275z.jpg)<!--<source src="http://ww2.sinaimg.cn/large/6c0378f8gw1f6gwjoe3k9j20so0i275z.jpg">-->

相关说明：[Shadowsocks for OSX 帮助](https://github.com/shadowsocks/shadowsocks-iOS/wiki/Shadowsocks-for-OSX-%E5%B8%AE%E5%8A%A9)

iPhone 设备可以选择 shadowrocket 客户端，需要 6 元购买，它的好处是，能够持续保持连接，休眠状态也不会断开，并且内置了规则，一些需要翻墙的域名才会自动翻墙。

### 小结

刚开始在配置 ss-serser 的时候，我遇到了些问题，本地死活代理不成功，后来通过下面这种方式调试了下：

**1.客户端通过 telnet ip port 确认 ss-server 是否正常开启**

如果没有正常开启，有可能是设定的端口没有开放，

```bash
iptables -A INPUT -p tcp --dport 8388 -j ACCEPT
```

执行上述命令，将 8388 修改为你设定的端口即可。

**2.如果第一步中连接正常，可以查看下 ss-server 的日志**

```bash
ssserver -c /etc/shadowsocks.json --log-file /tmp/ss.log -d start
```

启动的时候添加 `--log-file` 参数，然后通过 `tail -f /tmp/ss.log` 查看实时日志，一般可以看出一点端倪。

本文的普及就到这里了，希望对你有些帮助。



