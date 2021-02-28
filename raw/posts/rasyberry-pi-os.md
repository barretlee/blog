---
title: 系列 - 树莓派装机（二）
description: 本节将给大家介绍，如何从树莓派上进入到自己熟悉的远程开发模式。
warning: true
author: 小胡子哥
categories:
  - 硬件开发
tags:
  - 树莓派
date: 2018-06-14 10:24:25
---

似乎市面上的文章都是教大家如何在 Windows 环境下玩树莓派，Mac 下的文章零零散散的，稍微少了些，我打算所有的环节都在 Mac 上完成，记录下每一次探索遇到的坑。本节将给大家介绍，如何从树莓派上进入到自己熟悉的远程开发模式。

### 散热装置

在开搞之前，我觉得还是需要给树莓派贴上几块散热片，再把风扇装上；否则，插上电源，啥也不干，板子便会发烫。

**散热片**
![](/blogimgs/2018/06/2018-06-12-16-04-22.jpg)

我买的这个板子，CPU 自带散热，所以这三块散热片应该分别装在 WiFi/蓝牙模块、以太网卡和内存片（背面）上。

**小风扇**
![](/blogimgs/2018/06/2018-06-12-16-04-41.jpg)

小风扇两个引脚与树莓派的引脚相连，黑色接地，红色接 Vcc 5.0V。然后放进壳子里，就是这样啦：

![](/blogimgs/2018/06/2018-06-12-16-23-58.jpg)

小风扇无声地转起来了。

### 系统安装

首先，通过 Mac 自带的 Disk 工具格式化储存卡：

![](/blogimgs/2018/06/2018-06-12-16-44-53.jpg)

注意，这里的格式是 MS-DOS(FAT)，能否设置成其他格式，没研究，格式化完成以后卸载分区：

```bash
# 找到磁盘对应的 Filesystem 名（DISKNAME）
df -h
# 卸载分区，这里的 DISKNAME 长得像 /dev/disk2s1 
diskutil unmout DISKNAME
# 找到磁盘，看磁盘大小区分
diskutil list
# list 命令结果
/dev/disk2 (external, physical):
   #:     TYPE NAME                          SIZE       IDENTIFIER
   0:     FDisk_partition_scheme             *15.9 GB   disk2
   1:     DOS_FAT_32 BARRET-PI               15.9 GB    disk2s1
```

然后先去官网下载 raspberrypi 的 [操作系统](https://www.raspberrypi.org/downloads/raspbian/)，直接下载系统貌似略慢，可以下载 torrent，然后使用迅雷下载。

下载下来的是一个 zip 包，解压后，执行下方命令，将镜像写入到磁盘：

```bash
# dd 命令用于转换或者复制一个文件
# bs 是 benchmark 测试
# if 是镜像地址
# of 是写入磁盘区间
sudo dd bs=4m if=2018-04-18-raspbian-stretch.img of=/dev/rdisk2
# 磁盘写入完成以后
diskutil unmountDisk /dev/disk2
```

整个写入操作，花了 8 分多钟——真是够慢——只能说店家送的这个 SD 卡略烂吧。给树莓派插上 SD 卡，然后插上电源，注意观察红灯和绿灯的闪灯，红灯应该只一直亮着，绿灯在前几十秒亮着，等到系统加载成功，绿色会快速闪动然后灭掉。如果你的等不是这么闪的，那么有可能遇到了这么几种情况：

- 你的树莓派板子坏了，概率比较小
- 你的板子跟系统不匹配，重新找个系统吧，最好去官网下载
- 你的 SD 卡与板子不兼容，这里是所有可以用的 SD 卡[列表](https://elinux.org/RPi_SD_cards)

### 连接系统

在 Mac 下通过网线连接树莓派，你需要这个转换器：

![](/blogimgs/2018/06/2018-06-12-17-12-51.jpg)

树莓派提供了 DHCP 服务，我们可以让 Mac 连接到树莓派局域网，依次打开 `System Preferences -> Sharing -> Internet Sharing`，勾选 `Thunderbolt Ethernet` 后在勾选 `Internet Sharing`，此时你的 Mac 就会自动连接树莓派了，然后找到树莓派对应的 IP，通过 ssh 连接上去就行了。

**「然后找到树莓派对应的 IP，通过 ssh 连接上去就行了」，注意，这里有很多坑...**

可能是因为缓存的原因吧，在 Mac 上执行 `arp -a` 不一定能找到 raspberry 设备；所以，我建议你还是去下载一个 IP 扫描的工具，它会清楚地告诉你 IP 是多少：

![](/blogimgs/2018/06/2018-06-18-22-41-49.png)

`ssh pi@192.168.2.2` 你会发现连接不上，提示 `Connection refused`，网上找了下，不少人被坑：

>  树莓派最新的 raspberry 系统（2016.11.25日更新的系统）默认是关闭 ssh 功能的，如果可以连接屏幕，进入系统开启即可。
> 如果只能连 ssh，先将 sd 卡取出，插入电脑，在 boot 分区新建个ssh文件夹即可，包括完整版和 lite 版。

好吧，只能说，“板子，我服你~”。最后看到了这个界面，心情就舒畅多了：

![](/blogimgs/2018/06/2018-06-12-18-13-07.png)

### 自动 WiFi 链接

执行 `iwlist scan` 对于没有无线网卡驱动的板子，会提示错误，当然也可能是没有打开 WiFi，可以通过 `sudo ifup wlan0` 开启。

自动 WiFi 链接分为两步，首先将 `/etc/network/interfaces` 中的手动连接修改成自动，修改方式：

```diff
- iface wlan0 inet manual
- wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
+ iface wlan0 inet dhcp
+ wpa_conf /etc/wpa_supplicant/wpa_supplicant.conf
```

第二步，在 `/etc/wpa_supplicant/wpa_supplicant.conf` 中设置需要连接的 WiFi 名和密码：

```bash
nework={
[TAB]ssid="WIFI_NAME"
[TAB]psk="WIFI_PASSWORD"
[TAB]priority=1
}
nework={
[TAB]ssid="WIFI_NAME_2"
[TAB]psk="WIFI_PASSWORD_2"
[TAB]priority=2
}
```

这里的 `[TAB]` 为 tab 符号输入；可以设置多个 WiFi，其中 priority 为优先级，**直接在文件后加入这些配置，原有的内容不要动**。

这里需要注意的是，如果你的板子正通过网线与电脑连接，此时 eth0 已经处于链接状态，wlan0 是无法连接的；需要你断开网线，然后重启板子，才能连接 WiFi。

---

好吧，今天就折腾到这里，下一节，我们来看一看如何通过外接的蓝牙音箱播放树莓派音乐。
