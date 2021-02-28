---
title: unix下的文件操纵
warning: true
categories:
  - 工具
  - Linux
tags:
  - lsof
  - linux
descrition: unix/linux 下的命令太多了，花时间系统去学肯定十分枯燥，平时有需求用到某些命令的时候就会将这个命令所有的功能都看看，这次是为了关掉某个端口的进程，学习了下 lsof 和 kill 命令。
date: 2015-09-07 22:24:17
description:
---


unix/linux 下的命令太多了，花时间系统去学肯定十分枯燥，平时有需求用到某些命令的时候就会将这个命令所有的功能都看看，这次是为了关掉某个端口的进程，学习了下 lsof 和 kill 命令。

<!--more-->

在 sublime 中配置了开启 node 的快捷方式，`Command + B` 可以直接执行正在编辑的 js 文件。多次由于操作不当，报错：

```
Error: listen EADDRINUSE
    at exports._errnoException (util.js:746:11)
    at Server._listen2 (net.js:1156:14)
    at listen (net.js:1182:10)
    at Server.listen (net.js:1267:5)
    ...
```

意思就是端口被占用 `EADDRINUSE`，即 "Error: Address in use"，这里为啥唤作 address 而不是 port 被占用，还是有说法的。

在 linux/unix 下，任何事物都以文件的形式存在，通过文件不仅仅可以访问常规数据，还可以访问网络连接和硬件。如 TCP/UDP 套接字，应用程序都会在系统目录下为期分配一个文件描述符，这个描述符就是程序和系统交互的接口。

### lsof 命令

`lsof` 是 *nix 下常用的一个命令，全称为 "list open file"，列举被打开的文件描述符的相关信息，包括：

- `-u` 用户，如 root
- `-c` 进程名，如 chrome
- `-g` gid
- `-p` pid
- `-a` and 的意思，满足多个条件过滤
- `-i` 端口号

还有几个就不列举了，对一般用户来说并不常用。一次命令的执行，程序会吐出这些信息：

```
➜  blogsys ✗ lsof -i :4001
COMMAND     PID      USER   FD   TYPE NODE NAME
Google    57881 barretlee  113u  IPv4 TCP localhost:52445->localhost:newoak (ESTABLISHED)
node      68004 barretlee   11u  IPv6 TCP *:newoak (LISTEN)
node      68004 barretlee   18u  IPv6 TCP localhost:newoak->localhost:52445 (ESTABLISHED)
```

中间还有一个 DEVICE 和 SIZE，被我删掉了。从上面可以看到包含如下信息：

- COMMAND 对应我们上面提到的 -c
- PID     对应 -p
- USER    对应 -u
- NAME    被打开文件的名字
- FD、TYPE、NODE 就不细说了，可以看下面两篇参考文章

通过前面的参数，可以筛选被打开的文件。

### 关闭开启的端口

通过 lsof 的端口查找参数找到 pid 或者 command：

```bash
lsof -i :4001
```

比如我们找到的 command 是 node， pid 为 73220，则可以通过下面的方式关闭端口：

```
kill -p 73220
pkill node
```

另外还有 killall、xkill 等命令，可以阅读 [4 Ways to Kill a Process – kill, killall, pkill, xkil](http://www.thegeekstuff.com/2009/12/4-ways-to-kill-a-process-kill-killall-pkill-xkill/)

### 参考文章

- [linux lsof详解](http://blog.csdn.net/guoguo1980/article/details/2324454)
- [linux 系统监控、诊断工具之 lsof 用法简介](http://blog.csdn.net/jkh753/article/details/10060423)
- [4 Ways to Kill a Process – kill, killall, pkill, xkil](http://www.thegeekstuff.com/2009/12/4-ways-to-kill-a-process-kill-killall-pkill-xkill/)