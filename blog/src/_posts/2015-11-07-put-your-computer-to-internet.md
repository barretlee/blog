---
title: 将你家里的电脑连上广域网
description: 很多人买电脑半年一年之后，都会遇到这样一个问题：硬盘已经装不下？尤其是有些爱折腾的朋友喜欢安装多个系统，或者爱把各种美剧批量下载到本地，渐渐地，也只好去网上搜罗个硬盘。现在四五百就能买到一个 1TB 的硬盘，也不算很贵，可是电脑边上总挂着一坨东西，不仅不方便也不好看。
warning: true
categories:
  - 网络技术
tags:
  - DDNS
date: 2015-11-07 12:12:14
---


很多人买电脑半年一年之后，都会遇到这样一个问题：硬盘已经装不下？尤其是有些爱折腾的朋友喜欢安装多个系统，或者爱把各种美剧批量下载到本地，渐渐地，也只好去网上搜罗个硬盘。现在四五百就能买到一个 1TB 的硬盘，也不算很贵，可是电脑边上总挂着一坨东西，不仅不方便也不好看。

<!--more-->

有同事给我推荐 [NAS](http://baike.baidu.com/link?url=pbVuGISpwCNstrRLd-ZC_z52uG0pg369bw58rDyQgS8sNgggh33mUcl6LkDrOqNBCyLM7OBfFiwENkfwUeZ-o9DJ6w_H5CRh2CDq1H3qOny)，我觉得是相当不错的一个方案，包括硬盘在内，一般用户配置可以控制在 2000-5000 人民币。喜欢折腾的也可以考虑 GEN8，价格在 1500-3000 人民币，得自己搞系统，NAS 对小白用户很和谐的地方是，DMZ 有一个中央系统，并且提供了 Web 控制界面，相当于以 NAS 硬盘作为储存中心，WebOS 上操作。

如果我选了 NAS/GEN8 估计也不会写这篇文章了。既然家里有闲置的电脑，而自己也有硬盘，就没有必要再去购买其他网络设备搭建远程操控环境了~


### 解决 DDNS 的问题

能够从万千网络中定位一台机器，估计也就只有 IP 了，家里安装的是电信的宽带，不像教育网分配了固定的网段，电信这种拨号方式上网的方式每次分配到的 IP 是动态变化的。为了能够拿到 IP，我们必须把变化的 IP 存在一个位置去，有三种方案：

- 如果你有一台服务器（如阿里云主机），你可以将本地 IP 每隔一分钟告知云主机，让与主机记住 IP 地址
- 如果你有一个域名，你可以将域名解析服务器迁移到 DNSPod 提供的 NS，然后新增一个子域名添加 A 记录到任意 IP，接着通过 DNSPod 提供的接口实时修改 A 记录的 IP 地址
- 如果你既没有服务器，也没有自己的域名，可以在花生壳上注册一个域名，然后在你的路由器上（如果支持）配置花生壳，如果你的路由器不支持花生壳动态域名配置，你得下载一个花生壳的客户端，在客户端上配置。最终的结果同上，花生壳提供给你的免费域名会指向你的本地 IP。

我的博客托管在 github 提供的静态文本服务中，之前买的主机也到期了，所以就选择了方案二。

__1. 先拿到本地 IP__

在命令行输入 `ifconfig/ipconfig` 只能拿到路由器 DHCP 分配的地址，如 192.168.0.110，想拿到 IP，必须跟外网打交道，比如：`curl ipinfo.io`。

```
➜  ddns git:(master) ✗ curl ipinfo.io
{
  "ip": "115.*.*.*",
  "hostname": "No Hostname",
  "city": "Hangzhou",
  "region": "Zhejiang Sheng",
  "country": "CN",
  "loc": "30.*,120.*",
  "org": "*"
}%
```

如上所示，通过 ipinfo.io 提供的服务，我们可以很方便拿到外网。

__2. 推到 DNSPod__

如果你在其他域名提供商购买的域名，你需要将你的域名解析从提供商迁移到 DNSPod，这方面的迁移网上资料很多，可以搜索一下。DNSPod 相比其他提供商的域名解析服务，要更加优质，而且提供了 D监控，实时为你的域名解析保驾护航，有问题会及时邮件、短信警报。

接着在你的 DNSPod 上添加一个二级域名，比如我就随便搞了一个 `proxy.barretlee.com`，将它 A记录到任意地址，如 8.8.8.8。

![DNSPod proxy.barretlee.com](/blogimgs/2015/11/07/20151106_9132f343.jpg)

这一步完成之后，你就可以通过 DNSPod 提供的接口修改 A 记录了。具体用到了三个接口：

1) `//dnsapi.cn/Domain.List`

```bash
curl -k //dnsapi.cn/Domain.List -d "login_email=YOUR_REGISTER_EMAIL&login_password=YOUR_PASSWORD&format=json"
```

我在后面加了一个参数 `format=json`，默认是 xml 格式。在这里可以拿到 Domain 信息，比如我就拿到了在 DNSPod 上的两个域名信息，一个是 barret.cc 的具体信息，一个是 barretlee.com 的具体信息。这里有用的是 barretlee.com 中的 id 字段，我拿到的值为 25348135。

2) `//dnsapi.cn/Record.List`

```bash
curl -k //dnsapi.cn/Record.List -d "login_email=YOUR_REGISTER_EMAIL&login_password=YOUR_PASSWORD&format=json&domain_id=25348135"
```

通过这个接口，可以拿到 barretlee.com 所有子域名的信息，`proxy.barretlee.com` 对应的 record 的 id 字段值为 126112527。

3) `//dnsapi.cn/Record.Ddns`,`//dnsapi.cn/Record.Modify`

```
## 查询 proxy.barretlee.com 域名对应的 A 记录
curl -X POST //dnsapi.cn/Record.Ddns -d 'login_email=YOUR_REGISTER_EMAIL&login_password=YOUR_PASSWORD&format=json&domain_id=25348135&record_id=126112527&record_line=默认&sub_domain=proxy'

## 修改 proxy.barretlee.com 域名对应的 A 记录
curl -X POST //dnsapi.cn/Record.Modify -d 'login_email=YOUR_REGISTER_EMAIL&login_password=YOUR_PASSWORD&format=json&domain_id=25348135&record_id=126112527&sub_domain=proxy&record_line=默认&record_type=A&value=YOUR_LOCAL_IP'
```

前两个请求是 GET 方式，而这里的请求是 POST 方式，具体文档在 [这里](http://www.dnspod.cn/docs/records.html#record-modify)。有人用 [python](//gist.github.com/chuangbo/833369) 和 [php](//github.com/William-Sang/ddns) 都写了工具，我就没有重复早轮了，后面 php 那个稍微靠谱点，但是查询本地外网 IP 用了他自己提供的服务，我做了点修改（改成使用 ipinfo.io 提供的服务，稍微靠谱点），可以戳这里：

Github：<http://github.com/barretlee/ddns>

__3. 定时推__

前文提到，IP 是会变化的，为了保证 proxy.barretlee.com 能够准确解析到本机，IP 变化的时候需要快速更新 A 记录，为了简洁，可以设置定时任务，每隔 1 分钟推送一次：

```bash
# 执行
crontab -e 
# 写入任务
* * * * * php path/to/ddns/index.php
```

使用 crontab 创建一个定时任务，实时推送。可以通过 `crontab -l` 查看任务列表。

```bash
# 验证效果
ping proxy.barretlee.com
```

以上就能够通过 proxy.barretlee.com 获取到家里机器的 IP 地址了。需要注意的是，你们家电信宽带服务可能并不是通过路由拨号上网的，当你访问 proxy.barretlee.com 或者拿到的 IP 时，你会看到如下登录提示：

![login](/blogimgs/2015/11/07/20151106_b70393af.jpg)

这个时候你就致电 10000，选择人工服务器，让电信帮你设置为通过路由器登录吧~（生效时间估计得二十多分钟，需要重启猫、路由等设备）

### 让外网可以访问到路由内网的机器

上面我们只是解决了，将本机外网的 IP （也就是路由器的 IP）推到 DNSPod，而路由器上是没有装什么软件的，我们不能通过路由器访问到这个小局域网中的任何设备。需要登录到路由器进行一些设置。

一般的路由器都提供了 web 控制界面，在这里我们需要执行如下操作：

__1. 将局域网内的某个固定 IP 绑定你的电脑__

路由器也是使用 DHCP 随机分配一个 IP 给你的电脑，为了让路由器能够找到你的电脑，可以将电脑的 MAC 地址和 IP 地址对应起来：

![bind mac and ip](/blogimgs/2015/11/07/20151106_c3a4f190.jpg)

路由器一般都会有 "IP与MAC绑定这一项"，找到之后，绑定二者，如图中，我的本机 IP 目前为 192.168.0.110。

__2. 将本机 IP 作为对外设备__

DMZ 主机也是路由器自带的，通过DMZ主机功能，广域网中的设备可直接访问局域网中的DMZ主机

![DMZ](/blogimgs/2015/11/07/20151106_5f3aa844.jpg)

如果要让局域网中 IP 地址为 192.168.1.110 的主机能够被广域网中的设备直接访问，则可以开启 DMZ 主机功能，在“DMZ主机IP地址”处填入 192.168.1.110 保存即可。

这个操作相当于将路由的 IP 直接赋予给你的电脑。如果你觉得风险过大，可以通过路由提供的虚拟服务器转发端口，比如外网过来的 10002 端口转发到内网的 80 端口，也就是：

![虚拟服务器](/blogimgs/2015/11/07/20151106_1e414c34.jpg)

这样，通过 `proxy.barretlee.com:10002` 就能访问到 192.168.1.110 机器提供的 web 服务了。

### 开始远程控制之旅

__1. 防火墙__

不管是 windows 还是 mac，先查看下你的防火墙，比如你开启了 apache 服务器，就去防火墙看看，这个服务是否允许外部访问，如果不允许，就得设置过来，或者干脆直接关闭防火墙。mac 的防火墙设置在这里：

![mac 防火墙](/blogimgs/2015/11/07/20151106_57305bb6.jpg)

__2. 开启服务__

如果你只需要远程登录到 mac，可以 `enable ssh server`，相当于打开 ssh 的服务器，让机器可以被 ssh 。你也可以在电脑上安装 apache/nginx/nodejs 等等各种服务和程序，你也可以在电脑上设置 vpn server，让电脑作为代理被使用，想怎么折腾就怎么折腾。


### 小结

如果你理解整个流程都在做什么，以上操作可以在一小时内搞定。本文，简单点说，就是教你如何把自己的电脑变成一台可访问的服务器。

- 关于网速：取决于两端链接的最小网速；
- 关于稳定性：不断网的话，貌似 IP 也不会变化太快，1 分钟推一次的频率很频繁了；
- 关于安全：我只给我的电脑开了一个 ssh 的口子，除非 mac 系统本身有漏洞或者 ssh 有漏洞，想黑进来也不是件容易的事情。

好吧，写了一堆，希望给爱折腾的你提供点帮助。
