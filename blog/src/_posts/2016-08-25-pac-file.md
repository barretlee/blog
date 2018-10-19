---
title: 详解代理自动配置 PAC
description: PAC，一个自动代理配置脚本，包含了很多使用 JavaScript 编写的规则，它能够决定网络流量走默认通道还是代理服务器通道，控制的流量类型包括：HTTP、HTTPS 和 FTP。
warning: true
categories:
  - 网络交互
  - 网络安全
tags:
  - 翻墙
  - proxy
  - pac
date: 2016-08-25 01:31:50
---

最近一直在做跨域中华局域网的工作，了解了很多代理知识和基础概念，很零散，也很细碎。希望通过一段时间的学习，能够自由地穿梭在国际互联网和中华局域网之间。后续会写一系列文章记录我了解到的知识点，本文要说的是我们平时接触比较多的 PAC，全名为 proxy auto-config。

![Why Machinima's Warner Brothers round could be a bridge to nowhere](/blogimgs/2016/08/25/6c0378f8gw1f75co9fseuj20p00dwwhk.jpg)<!--<source src="http://ww4.sinaimg.cn/large/6c0378f8gw1f75co9fseuj20p00dwwhk.jpg">-->

<!--more-->

### 什么是 PAC

PAC，一个自动代理配置脚本，包含了很多使用 JavaScript 编写的规则，它能够决定网络流量走默认通道还是代理服务器通道，控制的流量类型包括：HTTP、HTTPS 和 FTP。

它是一段 JavaScript 脚本：

```javascript
function FindProxyForURL(url, host) {
  return "DIRECT";
}
```

上面就是一个最简洁的 PAC 文件，意思是所有流量都直接进入互联网，不走代理。

### PAC 语法和函数

上面函数中，`url` 字段就是我们在浏览器地址栏输入的待访问地址，`host` 为该地址对应的 hostname，`return` 语句有三种指令：

- `DIRECT`，表示无代理直接连接
- `PROXY host:port`，表示走 `host:port` 的 proxy 服务
- `SOCKS host:port`，表示走 `host:port` 的 socks 服务

而返回的接口可以是多个代理串联：

```javascript
return "PROXY 222.20.74.89:8800; SOCKS 222.20.74.89:8899; DIRECT";
```

上面代理的意思是，默认走 `222.20.74.89:8800` 的 proxy 服务；如果代理挂了或者超时，则走 `222.20.74.89:8899` 的 socks 代理；如果 socks 也挂了，则无代理直接连接。从这里可以看出 PAC 的一大优势：自动容灾。

PAC 提供了几个内置的函数，下面一一介绍下：

**dnsDomainIs**

类似于 `==`，但是对大小写不敏感，

```javascript
if (dnsDomainIs(host, "google.com") || 
    dnsDomainIs(host, "www.google.com")) {
  return "DIRECT";
}
```

**shExpMatch**

Shell 正则匹配，`*` 匹配用的比较多，可以是 `*.example.com`，也是可以下面这样，

```javascript
if (shExpMatch(host, "vpn.domain.com") ||
    shExpMatch(url, "http://abcdomain.com/folder/*")) {
  return "DIRECT"; 
}
```

**isInNet**

判断是否在网段内容，比如 `10.1.0.0` 这个网段，`10.1.1.0` 就在网段中，

```javascript
if (isInNet(dnsResolve(host), "172.16.0.0", "255.240.0.0")) {
  return "DIRECT";
}
```

**myIpAddress**

返回主机的 IP，

```javascript
if (isInNet(myIpAddress(), "10.10.1.0", "255.255.255.0")) {
  return "PROXY 10.10.5.1:8080";
}
```

**dnsResolve**

通过 DNS 查询主机 ip，

```javascript
if (isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||
    isInNet(dnsResolve(host), "172.16.0.0",  "255.240.0.0") ||
    isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0") ||
    isInNet(dnsResolve(host), "127.0.0.0", "255.255.255.0")) {
  return "DIRECT";
}
```

**isPlainHostName**

判断是否为诸如 `http://barret/`，`http://server-name/` 这样的主机名，

```javascript
if (isPlainHostName(host)) {
  return "DIRECT";
}
```

**isResolvable**

判断主机是否可访问，

```javascript
if (isResolvable(host)) {
  return "PROXY proxy1.example.com:8080";
}
```

**dnsDomainLevels**

返回是几级域名，比如 `dnsDomainLevels(barretlee.com)` 返回的结果就是 1，

```javascript
if (dnsDomainLevels(host) > 0) {
  return "PROXY proxy1.example.com:8080";
} else {
  return "DIRECT";
}
```

**weekdayRange**

周一到周五，

```javascript
if (weekdayRange("MON", "FRI")) {
  return "PROXY proxy1.example.com:8080";
} else {
  return "DIRECT";
}
```

**dateRange**

一月到五月，

```javascript
if (dateRange("JAN", "MAR"))  {
  return "PROXY proxy1.example.com:8080";  
} else {
  return "DIRECT";
}
```

**timeRange**

八点到十八点，

```javascript
if (timeRange(8, 18)) {
  return "PROXY proxy1.example.com:8080";
} else {
  return "DIRECT";  
}
```

**alert**

据说这个函数可以用来调试，不过我在 Chrome 上测试并未生效，

```javascript
resolved_host = dnsResolve(host);
alert(resolved_host);
```


### PAC 文件的安装和注意事项

在 Windows 系统中，通过「Internet选项 -> 连接 -> 局域网设置 -> 使用自动配置脚本」可以找到配置处，下放的地址栏填写  PAC 文件的 URI，这个 URI 可以是本地资源路径(file:///)，也可以是网络资源路径(http://)。

Chrome 中可以在「chrome://settings/ -> 显示高级设置 -> 更改代理服务器设置」中找到 PAC 填写地址。

**需要注意的几点：**

- PAC 文件被访问时，返回的文件类型（Content-Type）应该为：`application/x-ns-proxy-autoconfig`，当然，如果你不写，一般浏览器也能够自动辨别
- `FindProxyByUrl(url, host)` 中的 host 在上述函数对比时无需转换成小写，对大小写不敏感
- 没必要对 `dnsResolve(host)` 的结果做缓存，DNS 在解析的时候会将结果缓存到系统中

### 更多阅读

- [代理自动配置 - wikipedia](https://zh.wikipedia.org/wiki/%E4%BB%A3%E7%90%86%E8%87%AA%E5%8A%A8%E9%85%8D%E7%BD%AE)
- [Web Proxy Autodiscovery Protocol](https://en.wikipedia.org/wiki/Web_Proxy_Autodiscovery_Protocol)
- [Navigator Proxy Auto-Config File Format](https://web.archive.org/web/20070602031929/http://wp.netscape.com/eng/mozilla/2.0/relnotes/demo/proxy-live.html)
- [WPAD 的原理及实现](https://www.ibm.com/developerworks/cn/linux/1309_quwei_wpad/)
- [findproxyforurl](http://findproxyforurl.com/)