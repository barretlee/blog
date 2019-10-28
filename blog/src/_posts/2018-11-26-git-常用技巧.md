---
title: git 常用技巧
description: 小胡子哥的个人网站
warning: true
author: 小胡子哥
tags:
  - git
categories:
  - 前端杂烩
date: 2018-11-26 23:29:00
---
git 的版本管理思路，十分简单：使用一个类似链表的结构，将每次修改记录串联起来。每次提交都会产生一个 SHA1 的唯一标示符，我们可以利用 git 提供的命令行工具对“链表”中的每次修改进行编辑、删除、插入、移动等等多种操作。下面就介绍几种十分有用也比较常用的操作方法，为了方便理解，表述上可能不够准确。

下面是一个提交了 4 次的分支效果，每个节点的意思是 `节点名(commit 信息 - SHA1)`：

```
A(add A - 510fdc) -> B(add B - 0406b6) -> C(add C - 39a9c2) -> D(add D - 3131e0)<当前>
```

### 修改最近一次的提交信息

将上次提交的信息（add D），修改为 `push D`，可以通过 commit 的 amend 指令进行修改，如下：

```bash
git commit --amend
# 执行命令后，会进入到一个交互窗口，可以在交互窗口内修改上次的提交信息
```

### 利用 rebase 对提交进行各种修改

rebase 的常用操作分为这么几步：

1. 选择操作的起点位置，`git rebase -i SHA1`
2. 指定每个节点的操作方式，`保留/删除/修改/...`，进入操作
3. 进入下一步操作/终止操作，`git rebase --continue`，`git rebase --abort`

比如我们要将节点 B 的 commit 信息（add B），修改为 `push B`，那么按照上述的操作指南，可以执行（**第一步**）：

```bash
# 第一步，进入 B 之前的节点，A
git rebase -i 510fdc # 510fdc 是 A 节点的 SHA1
```

此时会进入一个交互窗口，内容大致为：

```bash
pick B 0406b6
pick C 39a9c2
pick D 3131e0
```

**你需要看懂这个结构**，不过也不用紧张，它很简单。由于我们将操作指针指向了 A，所以它会展示 A 以后的所有提交记录，根据链表顺序排列，依次展示节点 B、C、D，前面的一个英文单词是操作指令，总共有这么几种指令：

- `pick`，保留节点，不做任何变更
- `edit`，保留节点，修改内容
- `drop`，删除节点，删除本次提交
- `reword`，保留节点，修改提交信息
- `squash`，保留节点修改，并且与上一个节点合并，也就是两次提交并做一次
- `fixup`，保留节点修改，忽略本次提交信息
- `exec`，run command (the rest of the line) using shell

用的比较多的是前三个，可以只关注前三个。我们需要修改下交互窗口的内容，改为（**第二步**）：

```diff
+ edit B 0406b6
- pick B 0406b6
pick C 39a9c2
pick D 3131e0
```

上面是 diff，实际内容是：

```bash
edit B 0406b6
pick C 39a9c2
pick D 3131e0
```

此时会进入一个临时 git 分支，大致是这样：

```bash
branch(0406b6): 
```

由于你告诉了 git 要对 B 节点就行修改，所以它就停在了 B 处理，等着你修改，此时，你可以通过 amend 命令修改提交信息：

```bash
branch(0406b6): git commit --amend
# 进入交互窗口，将 commit 信息修改为 push B
```

操作完成后，执行（**第三步**）：

```bash
git rebase --continue
```

由于你告诉 git 只需要操作一个节点，所以它会回到最初的位置<当前>，否则的话，它会继续进入下一个临时 git 分支。当然，如果你进入第三步以后，突然又不想修改了，可以执行：

```bash
git rebase --skip 
```

跳过对本节点的修改。

以上就是 rebase 的基本使用方法，那么留下几个思考题，读者可以自行操作：

- 通过 rebase 删除 C 节点（drop）
- 通过 rebase 合并 A 和 B 节点的修改（squash）
- 交换 B 和 C 的提交顺序

### 将一个分支的修改合并到另一个分支

通过 `git cherry-pick SHA1` 这个指令可以可以完成目标，

```
master: A(add A - 510fdc) -> B(add B - 0406b6) -> C(add C - 39a9c2)<当前>
                                     \
dev:                             D(add D - 4569c2) -> E(add E - 087342)
```

如果我们想把 dev 分支 D 节点的修改合并到 master 分支，可以执行：

```bash
# 首先确保自己在 master 分支上，git branch master
git cherry-pick 4569c2 # 4569c2 为 D 节点的 SHA1
```

### 快速定位一个 bug 在哪次修改上

假设我们在本地提交了一堆 commit，正准备 push 到仓库之前，发现有一个 bug，但是记不起来是哪一次 commit 造成的了，怎么办？我们需要通过 `reset/rebase/stash` 等操作回滚到上一个状态进行测试，但是这样会很麻烦，而且效率不一定很高，git 为我们提供了更加便捷的工具 `git bisect`，通过二分法找 bug。它提供的命令也很直白：

```bash
git bisect start                 # 进入二分查找
git bisect good [good-commit-id] # 设置没问题的版本 SHA1，排查起点
git bisect bad [bad-commit-id]   # 设置有问题的版本 SHA1，排查终点
# 此时 git 就会自动进入到中间版本状态
```

进入中间版本状态，测试后，如果有问题，就标记为 bad，如果没有问题，就标记为 good，如下：

```bash
git bisect bad  # 有问题
git bisect good # 没问题
```

当你找到问题以后，可以执行 reset 回到初始状态：

```bash
git bisect reset
```

然后通过上面介绍的 rebase edit 操作对错误分支进行修改。

---

（未完待续）