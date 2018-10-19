---
title: git版本管理策略及相关技巧(A)
categories:
  - 前端杂烩
tags:
  - tech
  - cnblogs
  - git
date: 2014-05-07 09:00:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2014/05/07/git-improve.html" target="_blank">博客园</a>.</div>

<p><span>公司几乎所有的项目都是使用 git 仓库来管理代码，以前对 git 只有些肤浅的了解，每次提交代码或者上线的时候总是会提心吊胆，生怕出现一些未知的问题。经过三个月的踩坑和填坑， git 操作颇显成熟。仅以此文回忆学习 git 的历史。</span></p>
<h3>一、基本操作</h3>
<h4>1. 克隆代码</h4>
<p><strong>1.1 添加仓库</strong></p>
<p>最直接的方式：</p>

```
cd dir  # 这里不用新建一个项目名的文件夹，dir为git文件夹的父文件夹
git clone //github.com/barretlee/Micro-Share

```

<p>你也可以进入一个目录，然后初始化（init）：</p>

```
cd path/to/Project
git init
# 添加远程目录
git remote add origin //github.com/barretlee/Micro-Share

```

<p>这些都是最基本的了，上面的 remote add 是添加一个远程目录，你也可以添加多个远程目录，什么情况下会添加多个呢？比如：我想把别人的代码处理之后放到自己的 git 仓库上去,</p>

```
git remote add origin //github.com/barretlee/Micro-Share
git remote add mine http://your/path/to/git
# 拉取远程代码到 init 之后的 master 主干上
git fetch origin master
# 修改代码之后，提交到自己的仓库
git commit -am "fist"
git push -u mine master

```

<p><strong>1.2 添加文件</strong></p>
<p>在提交文件之前首先要添加文件到分支中，很多人只知道：</p>

```
git add .

```

<p>如果有文件删除，会发现这些删除的文件并没有被附加进去，肿么办？</p>

```
#方式一
git add --all .
#方式二
git add -A .

```

<ul>
<li><code>--all</code> 参数，顾名思义，添加所有文件（change|delete|add）</li>
<li><code>-A</code> 参数，添加修改过和删除过的文件（change|delete）</li>
<li>不加 参数，添加修改过和添加的文件（change|add）</li>
</ul>
<p><strong>1.3 提交文件</strong></p>

```
git commit -m "comment"

```

<p>如果没有删除过文件，可以合并添加和提交文件为一步：</p>

```
git commit -am "add and commit"

```

<p><strong>1.4 远程提交</strong></p>
<p>提交到远程仓库上：</p>

```
# 将 master 提交到 origin 上
git push origin master

```

<p>这一步操作可能会出现很多的问题，比如：</p>
<p>a) origin为一个多人开发的库，别人在你提交之前已经向 origin 上提交过一次（或者多次），那么此时你的版本是落后于远程服务器版本的，你需要先拉去线上最新的代码：</p>

```
# 拉去远程分支到 master
git pull origin master

```

<p>b) 执行 a) 之后，有可能也会有提醒：存在冲突，需要合并分支，这个在后面会提到</p>
<p>c) 如果你很自信，觉得线上的版本是存在问题，你这个版本木有问题，你可以强制提交你的代码</p>

```
git push -u origin master -f

```

<p>这里需要特别注意，加了 -f 线上之前的修改就会被删掉，请谨慎使用！</p>
<h3>二、进阶操作指南</h3>
<p>上面是最基本的几条命令，初用 git 的童鞋一般也只会接触这些东西，在一些复杂的多人开发项目中，修改代码、合并代码十分频繁，上面的命令显然是不够用了。在介绍进阶命令之前，先了解下 git 的三种状态。</p>

```
+-----------+      +-----------+       +-----------+
|           |      |           |       |           |
|  working  | -->  |   index   |  -->  |  commit   |
|           |      |           |       |           |
+-----------+      +-----------+       +-----------+
      ↓                  ↓                   ↓
   当前操作            git add            git commit

                              <Created By Barret Lee>

```
</created>
<p>你当前的操作状态下，所有文件的状态都在 work 状态，当你执行 git add 之后，文件状态变为 index，也就是在 git 中已经有过一次登记了，而 git commit 之后就被编入了分支，成为 commited 状态了。需要注意的是，这三种状态一直存在，只是会有不同的文件来对应这些状态。</p>
<h4>1. 场景切换</h4>
<blockquote>
<p>Barret 有一天敲代码，代码敲了一半，Boss 跟他说，线上出了个 bug，赶紧的，去修复！</p>
</blockquote>
<p>咋办？上面那堆代码，敲了半个上午啊，重新新建一个文件夹，然后把线上代码再克隆一次修改？这种处理的成本显然太高了！其实 git 为我们提供了很好用的命令 git stash。只要在当前目录下操作：</p>

```
git stash

```

<p>这句命令执行完毕之后，git 管理区中的 stash 会多出一条记录，这条记录保存了上一次提交到目前，你所有的修改:</p>

```
last commit ... working file now

```

<p>接着你就可以修改你的 bug 了，修改完了之后，再使用</p>

```
git stash pop

```

<p>将之前保存的修改（场景）还原回来。其内部的原理也是很简单的：</p>

```
+---------------+      +-----------+      +-----------+       +-----------+
|               |      |           |      |           |       |           |
|  last commit  | -->  |  working  | -->  |   index   |  -->  |  commit   |
|               |      |           |      |           |       |           |
+---------------+  ↑   +-----------+      +-----------+   |   +-----------+
      ↓            |         ↓                  ↓         |          ↓
   上次提交         |      当前操作            git add      |    git commit
                   |                                     s|
                   |                                     t|
                   |       +---------+                   a|
                   |       | Stash 0 |                   s|
                   |       +---------+                   h|
                   +------ | Stash 1 | <------------------+
                           +---------+
                           |  ....   |
                           +---------+
                           | Stash n |
                           +---------+
                                ↓                    <Created By Barret Lee>
                             stash堆栈

```

<p>有些童鞋可能看不太懂上面的图，git 有一个场景（stash）堆栈，这个堆栈的作用是用于保存修改的，下面举个例子：</p>

```
# 进入文件夹
$ cd test
# 初始化 git
$ it init
# 新建四个文件
$ touch f1 f2 f3 f4

```

<p>上面初始化一个 git ，然后新建了四个文件</p>

```
# 修改 f1
$ echo "1" > f1
# 将修改 push 到 stash 栈堆中
$ git stash

```

<p>上面修改了文件 f1，并保存到场景栈堆中</p>

```
# 查看 stash 栈堆
$ git stash list
  stash@{0}: WIP on master: 7f58be2 3

```

<p>查看栈堆，可以看到 stash@{0}</p>

```
# 修改 f2
$ echo "1" > f2
# 添加修改
$ git add .
# 将修改 push 到 stash 栈堆中
$ git stash

```

<p>修改文件 f2，添加之后保存到栈堆之中</p>

```
# 查看 stash 栈堆
$ git stash list
    stash@{0}: WIP on master: 7f58be2 3
    stash@{1}: WIP on master: 7f58be2 3

```

<p>栈堆中多了一个 stash@{1}，这个时候我们去修复 bug，改变其他位置的代码，完了之后：</p>

```
# pop 栈堆，还原修改
$ git stash pop

```

<p>上面我们将栈堆 pop 出来，遵循后进先出的规则</p>

```
# 查看文件状态
git status
$ Changes not staged for commit:
    changed: f2
  please commit it

```

<p>以上代码都是我手动敲出来的，不是复制控制台的代码，大概就是这个么意思吧。关于 stash 的最后一个想说明的命令是：</p>

```
git stash clear

```

<p>清空场景（stash）堆栈。</p>
<h4>2. 代码 diff</h4>
<p><strong>2.1 HEAD</strong></p>
<p>在介绍这块之前，也需要先了解几个基本的常识：</p>
<blockquote>
<p><strong>HEAD</strong>&nbsp; &nbsp; &nbsp;它表示上一次的 commit 版本</p>
<p><strong>HEAD~n</strong> 它表示第上 n 词的 commit 版本，这里的 n 是大于等于 1 的整数</p>
</blockquote>
<p>如果我们要比较上一次和这一次代码之间的差异，可以：</p>

```
git diff HEAD~1 HEAD

```

<p>比较前第三次与现在代码的差异，可以：</p>

```
git diff HEAD~3 HEAD

```

<p>获取前第n次的还有另外一种方式，如前第二次：</p>

```
HEAD^^

```

<p>前第五次：</p>

```
HEAD^^^^^

```

<p>这样写起来比较累，还是前面的方式比较顺手。</p>
<p><strong>2.2 SHA</strong></p>
<p>关于 SHA 标识的介绍，我这里就懒得打字了，可以看我之前分享的<a href="http://hi.barretlee.com/2014/04/28/git-roll-back/" target="_blank">一点东西</a>，使用</p>

```
git log

```

<p>可以看到每次 commit 的 SHA 标识。要比较两次提交之间的差异，可以直接</p>

```
git diff SHA1 SHA2

```

<p>其中 SHA1 和 SHA2 是两次提交（commit）时的标识。</p>
<p><strong>2.3 与场景的比较</strong></p>
<p>这个用的比较少，对比目前代码跟最近一次 push 的场景代码差异：</p>

```
git diff --cached

```

<p>从字面上也好理解，就是跟缓存的文件做对比嘛~</p>
<h4>3. 版本回退</h4>
<p>如果上面的 SHA，working，index，commit 几种状态和标识没有弄明白，相信这里也是十分难理解的。</p>
<p>版本回退使用的命令是：</p>

```
git reset

```

<p><strong>3.1 三种操作</strong></p>
<p>这个命令后面是要加参数的，分别为：</p>
<p><strong>a) filename</strong></p>

```
git reset HEAD filename  # 从暂存区移除文件

```

<p>如果之前有 add filename，上面的命令操作之后，filename 将处于未被 add 的状态。也就是从 index 转变成 working 状态。</p>
<p><strong>b) HEAD</strong></p>

```
git reset --hard HEAD~n

```

<p>直接回退到前第 n 个版本。</p>
<p><strong>c) SHA</strong></p>

```
git reset --hard SHA

```

<p>回到 SHA 对应的 commit 的版本。</p>
<p><strong>3.2 三种方式</strong></p>
<p>上面我们使用的是 <code>--hard</code> 来 reset 代码，这样风险是特别大的，这里有三个可选参数：</p>
<ul>
<li><code>--hard</code> 回退版本，代码也回退，忽略所有修改</li>
<li><code>--soft</code> 回退版本，代码不变，回退所有的 add 操作</li>
<li><code>--mixed</code> 回退版本，代码不变，保留 add 操作</li>
</ul>
<h4>4. 分支处理</h4>
<p><strong>4.1 查看分支</strong></p>

```
git branch

```

<p>这是最简单的查看，查看本地创建了哪些分支。</p>

```
git branch -va

```

<p>查看本地+远程分支，及其详细信息（上次提交commit信息）</p>
<p><strong>4.2 添加分支</strong></p>

```
git branch branch_name

```

<p>如果你当前所在的分支是 master，此处创建的分支会直接继承 master 的所有修改历史。</p>

```
git branch -b branchnew branchold

```

<p><code>-b</code> 是 base 的意思，如果你有两个分支 A 和 B ，目前在 A 分支上，你先新建一个分支继承 B，此刻你有两个选择：</p>

```
# 选择一
# 先切换到 B 分支上
git checkout B
git branch C

# 选择二
git branch -b C B

```

<p><strong>4.3 切换分支</strong></p>
<p><strong>a) 切换到本地分支</strong></p>

```
git checkout branch_name

```

<p><strong>b) 切换到远程分支</strong></p>

```
git checkout remotes/origin/branch_name
git checkout branch_name

```

<p>详情请看之前分享的这篇文章，<a href="http://hi.barretlee.com/2014/04/30/switch-branch-in-git/" target="_blank">git切换到远程分支</a></p>
<p><strong>4.4 删除分支</strong></p>
<p>显切换到别的分支上，然后</p>

```
git branch -d branch_name

```

<p>如果是远程分支：</p>

```
git push origin :branch_name

```

<p>在需要删除的分支前面加一个冒号OK了，push 上去之后，服务器上的分支自然就被删除了。</p>
<hr>




<p><strong><span>由于想写的内容实在太长，故打算下次再补充第二部分。</span></strong></p>
<p>下期预告：</p>
<blockquote>
<p> <strong>本节补充：</strong> 
   　　5. tag处理
   　　6. 仓库管理
  <strong>第三章 版本管理策略</strong> 
    <strong>第四章 看懂 diff</strong> 
    <strong>第五章 配置别名</strong> </p>

</blockquote>
<p>下次再做小结。</p>

