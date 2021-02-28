---
title: 系列 - 树莓派外接蓝牙音箱（四）
description: 为啥第四篇写的是外接蓝牙音箱？那是因为我在阅读文章的时候，不小心看到了通过命令行进行蓝牙操作
warning: true
author: 小胡子哥
categories:
  - 硬件开发
tags:
  - 树莓派
date: 2018-06-18 10:24:25
---

为啥第四篇写的是外接蓝牙音箱？那是因为我在阅读文章的时候，不小心看到了通过命令行进行蓝牙操作：

```bash
sudo bluetoothctl;
power on
scan on
agent on
pair MAC
trust MAC
connect MAC
```

尝试了一次，这些命令瞬间便记住了，但记住了还不够呀，需要找个场景试验下——外接一个蓝牙音箱，让树莓派的音频流在音箱中播放。感觉这个操作会有点意思，为了增加点难度，再设计一个按钮开关，通过按压操作来连接或断开蓝牙音箱。

### 可视化操作

树莓派并不是一个无界面的纯终端，首先，我们来看看如何通过 VNC 进行可视化操作：

```bash
# 给板子装客户端
sudo apt-get install tightvncserver
# 开启一个 VNC 流，代号为 1
tightvncserver :1
```

然后在 Mac 上安装 VNC Viewer 客户端，然后连接 `IP:1`，IP 为树莓派的地址：

![](/blogimgs/2018/06/2018-06-12-20-34-53.png)

在这个系列中，我会尽可能少地进行可视化操作，毕竟这种操作的意义不大，板子的性能本身就不高，额外开一个可视化的操作界面，会比较卡。

### 蓝牙连接（界面操作）

如果你钟爱界面化操作，可以安装一个蓝牙管理软件：

```bash
sudo apt-get install pi-bluetooth blueman
```

安装好了以后，可以在 `Preferences -> Bluetooth Manager`，找到蓝牙列表：

![](/blogimgs/2018/06/2018-06-18-23-04-53.png)

打开浏览器，在线播放一首音乐，你会发现，咦，为啥没有声音？原因在这里：

![](/blogimgs/2018/06/2018-06-17-03-03-22.png)

在音量控制处右键，会看到一个列表：

- Anlog，是通过耳机线出声，耳机插上板子就有声音了，音质比较差
- HDMI，需要通过 USB 接口连接播放器
- 下面几个是连接的蓝牙设备，必须勾上才会出声

事实上，我勾上了蓝牙设备，依然没有声音，没具体折腾为啥，但在音量控制面板中的第一个 Tab 勾选下对应设备就好了：

![](/blogimgs/2018/06/2018-06-17-03-02-32.png)

在调试引脚时，发现再一次没声音了，摸索了好几次，发现这么处理可以解决问题，屡试不爽：

```bash
# 先把 GPIO 引脚上的线给拔了，不拔可能会影响蓝牙驱动的加载？不知道，先拔了
# 如果之前插着线，重启，重新加载驱动
sudo reboot
# 再看看是否有报错，比如 Sap driver initialization failed.
service bluetooth status
# 如果有错误，重新启动下，可以选择 root
service bluetooth restart
# 然后重新连接蓝牙，一般声音就来了
```

不知道是否是驱动在 Linux 内核加载的时候存在问题还是有其他问题，没有深究，先这么凑合着处理吧。

### 蓝牙连接（硬件控制）

下面我们增加一个外部控制开关来实现，通过外部开关控制外投音频的音量（静音和打开）。

![](/blogimgs/2018/06/2018-06-18-12-08-12.png)

当开关 S1 拨下时，LED1 会亮起，此时 S 端（PIN12/GPIO18）为低电位。我们只需要读取 P12 的信号就可以知道开关是否被按下了，程序如下：

```js
const execSync = require('child_process').execSync;
const Gpio = require('rpio2').Gpio;

// 初始化 PIN12
const button = new Gpio(12);
button.open(Gpio.INPUT);

button.on('rising', () => {
  execSync('pactl set-sink-volume 1 100%');
  console.log('open sound');
});

button.on('falling', () => {
  execSync('pactl set-sink-volume 1 0%');
  console.log('mute');
});

process.on("SIGINT", () => {
  button.close();
  console.log('shutdown!');
  process.exit(0);
});
```

程序并不优雅，但是要实现的功能大致就是这个意思。这段程序看似没有问题，不知道是系统问题还是 rpio2 这个库的问题，在接收上升沿和下降沿信号时经常让板子宕机，这个问题还需要好好研究下。

---

花了好几个小时来回折腾，完成了这个实验性的小玩具，生活中我肯定不会用它，因为它过于简陋。这里我还给自己加了一道拓展题，如何识别多次按钮点击，然后根据点击的次数执行不同任务，结果写出来的程序，当按钮按下时，系统总是奔溃，就没有继续了，感兴趣的读者可以尝试下~


