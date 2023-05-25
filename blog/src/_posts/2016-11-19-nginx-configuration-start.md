---
title: Nginx 配置简述
description: 不论是本地开发，还是远程到 Server 开发，还是给提供 demo 给人看效果，我们时常需要对 Nginx 做配置，Nginx
  的配置项相当多，配置起来也比较麻烦。不过，我们往往只是需要一个静态 Server，或者一个反向代理 Server，这对 Nginx 来说小菜一碟。
warning: true
categories:
  - 网络交互
  - 网络技术
tags:
  - Nginx
date: 2016-11-19 23:51:46
---


不论是本地开发，还是远程到 Server 开发，还是给提供 demo 给人看效果，我们时常需要对 Nginx 做配置，Nginx 的配置项相当多，如果考虑性能配置起来会比较麻烦。不过，我们往往只是需要一个静态 Server，或者一个反向代理 Server，这对 Nginx 来说小菜一碟。

本文将给大家介绍 Nginx 配置的基本知识，不想细看的同学可以直接跳到最后一个例子。

![Nginx](/blogimgs/2016/11/19/6c0378f8gw1f9yyq7qehrj20p00dwt94.jpg)<!--<source src="http://ww4.sinaimg.cn/large/6c0378f8gw1f9yyq7qehrj20p00dwt94.jpg">-->

<!--more-->

### 简介

Nginx 的安装就不解释了，方便起见，建议在各平台可以直接执行对应安装命令：

```sh
# CentOS
yum install nginx;
# Ubuntu
sudo apt-get install nginx;
# Mac
brew install nginx;
```

一般可以在 `/etc/nginx/nginx.conf` 中配置，启动参数为：

```sh
# 启动
nginx -s start;
# 重新启动，热启动，修改配置重启不影响线上
nginx -s reload;
# 关闭
nginx -s stop;
# 修改配置后，可以通过下面的命令测试是否有语法错误
nginx -t;
```

`-s`，signal，意思就是向 nginx 发送 `start|reload|stop` 命令，还是很好理解的。先看一个最简单的 `nginx.conf` 配置：

```nginx
events {
    # 需要保留这一个段落，可以为空
}
http {
    server {
        listen 127.0.0.1:8888;
        location / {
            root /home/barret/test/;
        }
    }
}
```

启动后，访问 <htttp://127.0.0.1:8888> ，如果 `/home/barret/test/` 下有 `index.html` 文件就会展示 `index.html` 的内容，否则返回 `404`。

### Nginx 配置一个 Web 服务器

以下对配置 Web 服务器的参数做简单说明，包括如何配置端口、域名，如何处理请求，如何响应请求。

**1、 虚拟主机和请求的分发**

域名和端口的配置
```nginx
listen 127.0.0.1:8000;
listen *:8000;
listen localhost:8000;
# IPV6
listen [::]:8000;
# other params
listen 443 default_serer ssl;
listen 127.0.0.1 default_server accept_filter=dataready backlog=1024
```

主机名配置
```nginx
server_name www.barretlee.com barretlee.com
server_name *.barretlee.com
server_name ~^\.barret\.com$
```

URI 匹配
```nginx
location = / {
    # 完全匹配  =
    # 大小写敏感 ~
    # 忽略大小写 ~*
}
location ^~ /images/ {
    # 前半部分匹配 ^~
    # 可以使用正则，如：
    # location ~* \.(gif|jpg|png)$ { }
}
location / {
    # 如果以上都未匹配，会进入这里
}
```

2、 文件路径的定义

根目录设置
```nginx
location / {
    root /home/barret/test/;
}
```

别名设置
```nginx
location /blog {
    alias /home/barret/www/blog/;
}
location ~ ^/blog/(\d+)/([\w-]+)$ {
    # /blog/20141202/article-name  
    # -> /blog/20141202-article-name.md
    alias /home/barret/www/blog/$1-$2.md;
}
```

首页设置
```nginx
index /html/index.html /php/index.php;
```

重定向页面设置
```nginx
error_page    404         /404.html;
error_page    502  503    /50x.html;
error_page    404  =200   /1x1.gif;

location / {
    error_page  404 @fallback;
}
location @fallback {
    # 将请求反向代理到上游服务器处理
    proxy_pass http://localhost:9000;
}
```

try_files 设置
```nginx
try_files $uri $uri.html $uri/index.html @other;
location @other {
    # 尝试寻找匹配 uri 的文件，失败了就会转到上游处理
    proxy_pass  http://localhost:9000;
}
location / {
    # 尝试寻找匹配 uri 的文件，没找到直接返回 502
    try_files $uri $uri.html =502;
}
```

### Nginx 配置反向代理服务器

反向代理（reserve proxy）方式是指用代理服务器来接受 Internet 上的连接请求，然后将请求转发给内部网络中的上游服务器，并将上游服务器上得到的结果返回给 Internet 上请求连接的客户端，此时代理服务器对外的表现就是一个 Web 服务器。

Nginx 具备超强的高并发高负载能力，一般会作为前端的服务器直接向客户端提供静态文件服务；而业务一般还包含一些业务逻辑需要 Apache、Tomcat 等服务器来处理，故通常 Nginx 对外表现即为静态 Web 服务器也是反向代理服务器。

缺点是增加了一次请求的处理时间，优点是降低了上游服务器的负载，尽量将压力放在 Nginx 服务器上。

**1、负载均衡配置**

upstream，定义一个上游服务器集群
```nginx
upstream backend {
    # ip_hash;
    server s1.barretlee.com;
    server s2.barretlee.com;
}
server {
    location / {
        proxy_pass http://backend;
    }
}
```

**2、反向代理**

proxy_pass 将请求转发到有处理能力的端上，默认不会转发请求中的 Host 头部
```nginx
location /blog {
    prox_pass http://localhost:9000;

    ### 下面都是次要关注项
    proxy_set_header Host $host;
    proxy_method POST;
    # 指定不转发的头部字段
    proxy_hide_header Cache-Control;
    proxy_hide_header Other-Header;
    # 指定转发的头部字段
    proxy_pass_header Server-IP;
    proxy_pass_header Server-Name;
    # 是否转发包体
    proxy_pass_request_body on | off;
    # 是否转发头部
    proxy_pass_request_headers on | off;
    # 显形/隐形 URI，上游发生重定向时，Nginx 是否同步更改 uri
    proxy_redirect on | off;
}
```

### 一个简单的例子，Node.js

一个十分常见的需求：处理请求，如果是静态文件，Nginx 直接返回，否则交给 Node 服务器处理。首先创建了一个 Node 服务器：

```javascript
const http = require('http');
http.createServer((req, res) => {
    res.end('hello world');
}).listen(9000);
```

任何请求过来都返回 `hello world`，简版的 Nginx 配置如下，

```nginx
events {
    # 这里可不写东西
    use epoll;
}
http {
    server {
        listen 127.0.0.1:8888;
        # 如果请求路径跟文件路径按照如下方式匹配找到了，直接返回
        try_files $uri $uri/index.html;
        location ~* ^/(js|css|image|font)/$ {
            # 静态资源都在 static 文件夹下
            root /home/barret/www/static/;
        }
        location /app {
            # Node.js 在 9000 开了一个监听端口
            proxy_pass http://127.0.0.1:9000;
        }
        # 上面处理出错或者未找到的，返回对应状态码文件
        error_page    404            /404.html;
        error_page    502  503  504  /50x.html;
    }
}
```

首先 try_files，尝试直接匹配文件；没找到就匹配静态资源；还没找到就交给 Node 处理；否则就返回 4xx/5xx 的状态码。

### 小结

本文内容为阅读《深入理解 Nginx 模块开发和架构解析》时做的一点笔记，以前配置 Nginx 服务器总是得上网找答案，现在把这些项都理解并记到脑子里了，还是担心忘记，博客稍作记录。

十分建议读者边阅读边动手尝试，利用 `nginx -t` 测试语法，遇到问题就 Google 搜索下，上手会很快。后续有空会详细介绍 Nginx 运维知识。
