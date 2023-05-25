---
title: BitTorrent DHT 协议简述
description: 小胡子哥的个人网站
warning: true
author: 小胡子哥
tags:
  - DHT
  - BitTorrent
categories:
  - 网络交互
date: 2017-06-16 16:24:00
---
BitTorrent DHT 协议原理还是比较好理解的，内容不多，本文把基本的介绍、规则和路由表维护规则做了简述，方便理解。官方文档：<http://www.bittorrent.org/beps/bep_0005.html>

![bitTorrent](/blogimgs/2017/06/16/6c0378f8gy1fgn4e4xjodj20rs0flaap.jpg)<!--<source src="http://ww1.sinaimg.cn/large/6c0378f8gy1fgn4e4xjodj20rs0flaap.jpg">-->

<!--more-->


### Brif（简介）

DHT, distributed sloppy hash tabl.

1. BT 协议像 TCP/IP 协议一样是一个协议簇
2. DHT 协议是在 UDP 通信协议的基础上使用 Kademila（俗称 Kad 算法）算法实现
3. Tracker 服务器保存和 torrent 文件相关的 peer 的信息
4. 一个 peer 节点是一个实现了 BT 协议并且开启了 TCP 监听端口的 BT 客户端或者服务器
5. 一个 node 节点是一个实现了 DHT 协议并且开启了 UDP 监听端口的 BT 客户端或者服务器
6. DHT 由很多 node 节点以及这些 node 节点保存的 peer 地址信息组成
7. 一个 BT 客户端包括了一个 DHT node 节点，通过这些节点来和 DHT 网络中的其它节点通信来获取 peer 节点的信息，然后再通过 BT 协议从 peer 节点下载文件
8. DHT 协议通过从附近的 node 节点获取 peer 信息，而不是从 tracker 服务器获取 peer 信息，这就是所谓的 trackerless.


### Principle（规则）

1. Node 节点必须保存一份 Routing Table（路由表） 和 DHT 网络中一小部分节点交流的信息
2. Node 在发起种子下载请求时，会根据 IP 生成 token 标识自己在下载
2. 当某个 Node 节点想找某个种子的 peer 信息时，通过 Kad 获取最近 Node 节点信息，带上 token 后进行通讯
3. 下一个最近 Node 节点中有 peer 信息则直接验证 token 返回，否则继续传播这个信息
4. token 有效时间是 10 分钟


### Routing Table（路由表）

1. 每一个节点都维护一个路由表保存一些已知的通信好的节点
2. 一个活跃的节点就是能在 15 分钟之内响应过请求或者在 15 分钟之内发送过请求的节点
3. 路由表可以被划分为 buckets（桶），每一个 bucket 包含一个子部分的 nodeID 空间
4. buckets 可以装 node 节点信息
5. 通讯不好的节点会从 buckets 中被剔除
6. 刚初始化的节点中路由表为空
7. 一般会通过解析一个 .torrent 文件来获取 peer 信息，从而构建路由表

还有 KPRC 协议，比较细节，就没有详述了。
