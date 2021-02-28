---
title: Unix/Linux 系统中的 Operation Not Permitted 问题
description: 多次在 Mac 使用过程中遇到 Operation Not Permitted 问题，之前都是略过，今天好好摸索了一把，搞明白了道理，记录下来。
warning: true
categories:
  - 网络安全
  - Linux
  - 苹果
tags:
  - Operation Not Permitted
date: 2016-04-06 12:20:20
---

多次在 Mac 使用过程中遇到 Operation Not Permitted 问题，之前都是略过，今天好好摸索了一把，搞明白了道理，记录下来。

<!--more-->

好几次整理移动硬盘数据的时候，都遇到了 `Operation Not Permitted` 问题，文件移动不了，也删除不掉，第一次遇到没理会，第二次是打开虚拟机，在 Windows 中操作这些问题文件，今天又遇到了，决定消灭它。

### OS X EI Capitan 的 SIP

Apple 在 OS X 10.11 以后的版本中默认启动了一项系统保护程序，叫做 System Integrity Protection，也被唤作 rootless（寓意让 root 弱一点），该程序意在保护电脑不被恶意程序攻击，但是对于我们这群程序员，很多保护是多余的，甚至给我们带来了很多麻烦。

SIP 会锁定几个系统文件目录：

```
/System
/sbin
/usr （/usr/local 除外）
```

在 SIP 的保护下，部分软件、功能、脚本都会失效，我们可以通过如下步骤关闭 SIP：

- 重启电脑，按下 `Command + R` 直到听到开机声音，此时电脑会进入恢复模式（Recovery Mode）
- 当 OSX 工具出现在屏幕中时，下拉工具（Utilities）菜单，选择终端（Terminal）
- 键入 `csrutil disable`，回车
- 电脑重启后，SIP 就关闭了

恢复 SIP 的方式同上，只不过终端中键入 `csrutil enable`。通过 `csrutil status` 可以检测系统当前 SIP 的启动状态：

```bash
$ csrutil status
System Integrity Protection status: enabled.
```

### Linux 下的 file flags

可能你也遇到过在 Linux 下删除文件报错：

```bash
root@ubuntu:/home/barret/work# rm -f 1.md 
rm: cannot remove ‘1.md’: Operation not permitted
```

这个时候可以通过 `lsattr` 命令看看该文件是否被打了 flags：

```bash
root@ubuntu:/home/barret/work# lsattr 1.md
----i--------e-- ./1.md
```

如果文件上存在 `i` 标记，那肯定是删不掉的，同样这个文件也不能被编辑。可以进入 root 模式，去除这个标记：

```bash
root@ubuntu:/home/barret/work# chattr -i 1.md
```

给保护文件添加标记的方式：

```bash
root@ubuntu:/home/barret/work# chattr +i 1.md
```

也比较简单。

### 小结

文本算是一个经验性的小科普，希望对你有帮助。



