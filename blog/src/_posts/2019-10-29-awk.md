---
title: 换一种视角理解 awk 命令
description: awk 是使用频度非常高的一个超级有用的命令，如果你做过应用的线上运维，想必已经是十分熟悉了，但是对大多数人来说，它仍然是个陌生的东西，即便看过很多次文档，依然记不住它的模样，还是得翻文档、查 Google。下面我就带着你，换一种视角重新理解下 awk。
warning: false
author: 小胡子哥
tags:
  - awk
categories:
  - 工具
  - 运维技术
date: 2019-10-29 14:49:00
---

awk 是使用频度非常高的一个超级有用的命令，如果你做过应用的线上运维，想必已经是十分熟悉了，但是对大多数人来说，它仍然是个陌生的东西，即便看过很多次文档，依然记不住它的模样，还是得翻文档、查 Google。下面我就带着你，换一种视角重新理解 awk。

![AWK](/blogimgs/2019/10/29/awk.jpg)

它是什么？我觉得它就是一个表单筛选工具，往下看。

### 一个例子

下面是我截取 `cat /etc/passwd` 的部分内容，

```txt
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
```

保存为 `1.txt`，然后执行如下命令：

```bash
cat 1.txt | awk -F : ' BEGIN { print "No. R1 R3 R4"; count = 0 } $3 > 5 && $3 < 50 && $1 !~ /root/ { count += 1; print NR, $1, $3, $4} END { print "total " count " lines" } '
```

输入的内容是：

```txt
No. R1 R3 R4
7 man 6 12
8 lp 7 7
9 mail 8 8
10 news 9 9
total 4 lines
```

看起来好像很复杂的样子，下面我们进行分解动作，一步一步带你认识 awk 的世界。

### 获取表单

例子里的数据是结构化的，每一行有 7 条数据，使用 `:` 连接符合并成一行，总共 10 行，所以你看到的就是一个无表头的 10 行 7 列数据，我们可以通过如下命令对表单进行整理：

```bash
cat 1.txt | awk -F : ' { print $1, $2, $3, $4, $5, $6, $7 } '
```

`-F` 是分隔符标识，默认 awk 命令以空格作为分隔符，在这个例子中，我们需要告诉程序 `:` 为列分隔符。这条命令执行的结果是：

```txt
root x 0 0 root /root /bin/bash
daemon x 1 1 daemon /usr/sbin /usr/sbin/nologin
bin x 2 2 bin /bin /usr/sbin/nologin
sys x 3 3 sys /dev /usr/sbin/nologin
sync x 4 65534 sync /bin /bin/sync
games x 5 60 games /usr/games /usr/sbin/nologin
man x 6 12 man /var/cache/man /usr/sbin/nologin
lp x 7 7 lp /var/spool/lpd /usr/sbin/nologin
mail x 8 8 mail /var/mail /usr/sbin/nologin
news x 9 9 news /var/spool/news /usr/sbin/nologin
```

`$0` 会打印整行数据，`$1` 表示第一列数据，同理，我们将七列数据都打印了出来，`$1` 到 `$7` 都是 `print` 函数的入参，事实上，它与这种写法是一个意思：

```bash
cat 1.txt | awk -F : ' { print($1, $2, $3, $4, $5, $6, $7) } '
```

### 添加表头

由于我们提供的数据没有表头，我们给它加上：

```bash
cat 1.txt | awk -F : ' BEGIN { print("No.", "R1", "R2", "R3", "R4", "R5", "R6", "R7") } { print(NR, $1, $2, $3, $4, $5, $6, $7) } '
```

在原来的基础上，我们增加了 `BEGIN { }` 段落，为此我们就给内容提供了表头：

```txt
No. R1 R2 R3 R4 R5 R6 R7
1 root x 0 0 root /root /bin/bash
2 daemon x 1 1 daemon /usr/sbin /usr/sbin/nologin
3 bin x 2 2 bin /bin /usr/sbin/nologin
4 sys x 3 3 sys /dev /usr/sbin/nologin
5 sync x 4 65534 sync /bin /bin/sync
6 games x 5 60 games /usr/games /usr/sbin/nologin
7 man x 6 12 man /var/cache/man /usr/sbin/nologin
8 lp x 7 7 lp /var/spool/lpd /usr/sbin/nologin
9 mail x 8 8 mail /var/mail /usr/sbin/nologin
10 news x 9 9 news /var/spool/news /usr/sbin/nologin
```

`NR` 是行号的意思，为了让它好看一点，我们使用 `printf` 函数进行格式化打印：

```bash
cat 1.txt | awk -F : ' BEGIN { printf("%8s %5s %5s %5s %5s %5s %15s %20s\n", "No.", "R1", "R2", "R3", "R4", "R5", "R6", "R7") } { printf("%5s %8s %5s %5s %5s %5s %15s %20s\n", NR, $1, $2, $3, $4, $5, $6, $7) } '
```

打印的结果：

```txt
     No.    R1    R2    R3    R4    R5              R6                   R7
    1     root     x     0     0  root           /root            /bin/bash
    2   daemon     x     1     1 daemon       /usr/sbin    /usr/sbin/nologin
    3      bin     x     2     2   bin            /bin    /usr/sbin/nologin
    4      sys     x     3     3   sys            /dev    /usr/sbin/nologin
    5     sync     x     4 65534  sync            /bin            /bin/sync
    6    games     x     5    60 games      /usr/games    /usr/sbin/nologin
    7      man     x     6    12   man  /var/cache/man    /usr/sbin/nologin
    8       lp     x     7     7    lp  /var/spool/lpd    /usr/sbin/nologin
    9     mail     x     8     8  mail       /var/mail    /usr/sbin/nologin
   10     news     x     9     9  news /var/spool/news    /usr/sbin/nologin
```

怎么样，这个表单看起来就很自然了吧！

### 表单筛选

想象一下，拿到手里的是一个 Excel 表格，我们要对表格进行分析，比如，我要隐藏 R2、R3、R4 这几栏，十分简单，打印的时候不写出来就行了，

```bash
cat 1.txt | awk -F : ' BEGIN { printf("%8s %5s %5s %15s %20s\n", "No.", "R1", "R5", "R6", "R7") } { printf("%5s %5s %5s %15s %20s\n", NR, $1, $5, $6, $7) } '
```

结果是：

```txt
     No.    R1    R5              R6                   R7
    1  root  root           /root            /bin/bash
    2 daemon daemon       /usr/sbin    /usr/sbin/nologin
    3   bin   bin            /bin    /usr/sbin/nologin
    4   sys   sys            /dev    /usr/sbin/nologin
    5  sync  sync            /bin            /bin/sync
    6 games games      /usr/games    /usr/sbin/nologin
    7   man   man  /var/cache/man    /usr/sbin/nologin
    8    lp    lp  /var/spool/lpd    /usr/sbin/nologin
    9  mail  mail       /var/mail    /usr/sbin/nologin
   10  news  news /var/spool/news    /usr/sbin/nologin
```

再比如，我们想拿到第六列包含 var 的内容，正则过滤下就行了


```bash
cat 1.txt | awk -F : ' $6 ~ /var/ { printf("%5s %5s %5s %15s %20s\n", NR, $1, $5, $6, $7) } '
```

执行结果是：

```bash
    7   man   man  /var/cache/man    /usr/sbin/nologin
    8    lp    lp  /var/spool/lpd    /usr/sbin/nologin
    9  mail  mail       /var/mail    /usr/sbin/nologin
   10  news  news /var/spool/news    /usr/sbin/nologin
```

再来个复杂点的，我们想拿到 R4 范围在 0~5，并且不包含 Root 的数据：

```bash
cat 1.txt | awk -F : ' $4 >= 0 && $4 <= 5 && $1 !~ /root/ { printf("%5s %5s %5s %15s %20s\n", NR, $1, $5, $6, $7) } '
```

筛选结果出来了：

```bash
    2 daemon daemon       /usr/sbin    /usr/sbin/nologin
    3   bin   bin            /bin    /usr/sbin/nologin
    4   sys   sys            /dev    /usr/sbin/nologin
```

相关的筛选功能还有很多，这里就不一一枚举了，上述几个筛选其实也已经可以满足大部分的条件了。

### 增加表尾

我们想统计 R7 包含 `nologin` 信息的条目数量，展示在表尾，稍微复杂一点，这里会用到一点编程知识：

```bash
cat 1.txt | awk -F : ' BEGIN { count = 0 } { if ($7 ~ /nologin/){ count = count + 1; } printf("%5s %8s %5s %5s %5s %5s %15s %20s\n", NR, $1, $2, $3, $4, $5, $6, $7) } END { printf("total %s items with nologin", count)}'
```

看到的结果是：

```txt
    1     root     x     0     0  root           /root            /bin/bash
    2   daemon     x     1     1 daemon       /usr/sbin    /usr/sbin/nologin
    3      bin     x     2     2   bin            /bin    /usr/sbin/nologin
    4      sys     x     3     3   sys            /dev    /usr/sbin/nologin
    5     sync     x     4 65534  sync            /bin            /bin/sync
    6    games     x     5    60 games      /usr/games    /usr/sbin/nologin
    7      man     x     6    12   man  /var/cache/man    /usr/sbin/nologin
    8       lp     x     7     7    lp  /var/spool/lpd    /usr/sbin/nologin
    9     mail     x     8     8  mail       /var/mail    /usr/sbin/nologin
   10     news     x     9     9  news /var/spool/news    /usr/sbin/nologin
total 8 items with nologin
```

结尾多了一行，我们来分析下这句命令，总共分为三段：

- `BEGIN { count = 0 }`，声明计数器
- `{ if ($7 ~ /nologin/){ count = count + 1; } printf(...) }`，判断并计数
- `END { printf("total %s items with nologin", count)}`，打印结果

### 小结

以上，揭开了 awk 的面纱以后，你会发现它并没有那么复杂。当然，awk 也远不是上面我们看到的这么简单，它的使用可以变得非常复杂只不过在日常的运维过程中我们用不上而已。

把 awk 当做表单处理工具来理解，我相信你一定可以轻松记住它的所有命令，就算记不住，以后看到一长串命令也能够很快地理解它。更多资料可以看这个手册：[The GNU Awk User’s Guide](http://www.gnu.org/software/gawk/manual/gawk.html)。
