---
title: 系列 - 认识树莓派 GPIO（三）
description: 在写《系列 - 树莓派外接蓝牙音箱（四）》的时候，发现还是得先解释下 GPIO
warning: true
author: 小胡子哥
categories:
  - 硬件开发
tags:
  - 树莓派
date: 2018-06-16 10:24:25
---

本来这篇文章是不存在的，在写[《系列 - 树莓派外接蓝牙音箱（四）》](/blog/2018/06/18/rasyberry-pi-playback/)的时候，发现还是得先解释下 GPIO。

![](/blogimgs/2018/06/2018-06-17-19-55-28.jpg)

看到上图，不少同学都会一脸懵逼，各种引脚怎么连线组成电路？电路中用到的电阻、电容、电抗等等改如何使用？其实，大多数情况下，我们并不需要去设计复杂的电路，最多就是给一个元件两端增加电压时，为确保元件不短路，在串联的电路上再加一个负载电阻，如此而已。那么滤波、放大等电路的设计，一时半会儿还不会用到。

### 看图识引脚

树莓派除了有 USB、网口、HDMI 等常见的接口外，还提供了 GPIO（General Purpose Input/Output）接口，通过这个接口，我们可以很方便的控制电子元器件。本文不去分析 I2C、UART、SPI 这些略复杂的通讯协议，只去看 GPIO 在引脚上的输入和输出，以及高低点位的变化。

上图所示的几个基础引脚我们还是可以一眼看明白的，DC Power 5.0v，以及 DC Power 3.3v，它们指的是直流电电压 5.0 或 3.3 伏特，可以简单理解成电池的正极，在图中可以看出 PIN01 和 PIN17 两个引脚输出的是 3.3v 电压，PIN02 和 PIN04 输出的是 5.0v 电压；还有好几个 Ground 引脚，它们直接接地，可以理解成电池的负极。

PIN 引脚标号和 GPIO 标号是不一样的，不要把  GPIO12 理解成了是 PIN12，PINX 是物理位置，GPIOX 是引脚号码。图中引脚 Name 用灰色括号标注的内容是我们暂不去理解的 I2C、SPI 等协议会用到的引脚。

![](/blogimgs/2018/06/2018-06-17-22-19-11.png)

上图是 Raspberry Pi  3 Model B+ 的板子，右侧 40 个引脚，与第一张 GPIO Header 图是一一对应的。

### 串口编程

在树莓派系统中，已经实现了文件到 GPIO 引脚的对应，也就是说，只要我们去修改系统中指定的文件和文件状态，就可以修改 GPIO 引脚的电位状态。

SSH 远程到树莓派，进入 `/sys/class/gpio/` 目录，可以看到目录中有两个关键的文件：

- `export`，enable 控制某个引脚
- `unexport`，disbale 控制某个引脚

它们可以用来控制引脚的状态。比如，我们要控制 GPIO14 引脚，可以将它的状态设置为 out（分为 in 和 out 两种模式，in 是接受电位信号，out 是输出电位信号），然后将它设置为高电位（1 为高电位，0 为低电位）。

```bash
# enable GPIO14
echo 14 > /sys/class/gpio/export
# 注意观察，在 /sys/class/gpio/ 目录下多了一个文件夹 gpio14
# 将其设置为 out 模式
echo out > /sys/class/gpio/gpio14/direction
# 将其设置为高电位
echo 1 > /sys/class/gpio/gpio14/value
```

### 电位测试

在系列第一篇中，有提到，我买了一堆感应器，其中有一个叫做 `TWO-COLOR Module`，大小双色模块，

![](/blogimgs/2018/06/2018-06-17-22-33-44.png)

上方是共阴模块，下方是共阳模块，共阳的意思就是 B/R/G 都接负极，C 接正极；它的电路结构如下：

![](/blogimgs/2018/06/2018-06-17-22-28-27.png)

现在我们来测试下 GPIO14 引脚的电位输出，PIN06 是 Ground，也就是接地负极；而 GPIO14（PIN08 引脚） 由于之前的操作，我们已经将它设置成了高电位。将 C 与 Ground 连接，R 与 GPIO14 连接后，R（红灯）会亮，我们试试：

![](/blogimgs/2018/06/2018-06-17-22-38-39.jpg)

然后将 GPIO14 设置为低电位，测试等是否灭掉：

```bash
# 将 gpio14 设置为高电位
echo 1 > /sys/class/gpio/gpio14/value
```

此时二极管两侧电压为 0，灯灭，测试完成；最后我们把 gpio14 引脚关掉：

```bash
echo 14 > /sys/class/gpio/unexport
```

### 程序控制引脚

既然 Linux 串口 Bash 编程可以控制 GPIO 引脚的信号，自然也可以用高级语言去控制。下面我们使用 Nodejs 写一个小 Demo —— 让双色模块的红灯和绿灯，每隔 1s 交替闪动。

简单画一下电路图：

![](/blogimgs/2018/06/2018-06-17-22-56-34.png)

GPIO18 和 GPIO23 引脚分别连接共阴双色模块的红色（R）和绿色（G）二极管，然后开始编程。Python 非常适合进行串口编程，而且社区上有很多 Python 库，但本系列会尽量不使用 Python，而是 Nodejs；Nodejs 在这个领域的社区沉淀还不是很多，通过一段时间的摸索，也期望可以沉淀些有用的模块出来。

为方便测试，就直接使用了月影封装的 rpio2 模块，他的 API 设计得比较符合人性：

```js
const Gpio = require('rpio2').Gpio;
// 初始化 PIN12，与 R 连接，设置为输出高电位
const r = new Gpio(12);
r.open(Gpio.OUTPUT, Gpio.HIGH);
// 初始化 PIN 16，与 G 连接，设置为输出低电位
const g = new Gpio(16);
g.open(Gpio.OUTPUT, Gpio.LOW);

async function wait(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, (seconds || 1) * 1E3);
  });
}

async function main() {
  console.log('start!');
  let counter = 10;
  while(counter--) {
    await wait();
    r.toggle();
    g.toggle(); 
  }
}

main().then(() => {
  r.close();
  g.close();
  console.log('shutdown!');
});
```

代码比较好理解，每隔 1s 交替闪灯，总共闪 10 次。Demo 效果预览：

<video src="/blogimgs/2018/06/raspberry-two-colors.mp4" controls height="500"></video>

---

对于 GPIO 的介绍就到这里，基础的使用实在是太简单了，本文可以勾起一些对硬件完全不了解的同学的好奇心和求知欲，不过对我这个电信出身的同学而言，就没啥值得兴奋的了。
