---
title: git/ssh捋不清的几个问题
categories:
  - 前端杂烩
  - 网络交互
tags:
  - tech
  - cnblogs
  - git
warning: true
date: 2014-03-11 11:09:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2014/03/11/problems-in-git-when-ssh.html" target="_blank">博客园</a>.</div>

<p>主要是 windows 用户会遇到很多纠结的问题，linux/unix 用户属于这方面的高端用户，应该有能力处理此类问题，而且网络上也有很多解决方案，本文的授众是 windows 用户。由于今天配置了一下午，虽说配置过程基本搞清楚，懒得重新配置一遍，所以文中皆以文字形式叙述，没有截图。</p>
<p>本文地址：<a href="http://www.cnblogs.com/hustskyking/p/problems-in-git-when-ssh.html">http://www.cnblogs.com/hustskyking/p/problems-in-git-when-ssh.html</a>，转载请注明源地址。</p>
<h3>一、概念的解释</h3>
<h4>1. rsa 与 rsa.pub</h4>
<p>网上很容易搜到的东西我就不说了，我们知道，通过：</p>

```
ssh-keygen -t rsa -C "something"

```

<p>可以生成两个文件，这两个文件的命名默认是 id_rsa 和 id_rsa.pub，如果你在键入上述命令回车之后，重新输入了命名，那此时生成的两个文件就是 <code>[命名]</code> 和 <code>[命名].pub</code>，这个好理解。</p>
<p>主要是解释下生成了两个什么东西。id_rsa 可以称之为私有密钥，id_rsa.pub 可以称之为公有密钥。我们会把公有密钥交给服务端，当需要从服务端请求内容的时候，要带上私有密钥。此时，服务器会通过一定的算法计算私有密钥，并判断计算的结果是否与公有密钥一样，如果不一样则响应请求失败。</p>

```
+-----------+                           +-----------+
|           |                           |           |
|           |    enc(rsa) == rsa.pub    |           |
|  client   | ------------------------> |   server  |
|           |             ?             |           |
|           |                           |           |
+-----------+                           +-----------+

```

<p>rsa.pub 里面是个什么东西，其实很简单：</p>

```
ssh-rsa base64(加密内容) "something"

```

<p>而 rsa 中是：</p>

```
-----BEGIN RSA PRIVATE KEY-----
base64(私有密钥的一些处理)
-----END RSA PRIVATE KEY-----

```

<h4>2. 验证程序</h4>
<p>在使用 git 命令与服务端进行交互之前，我们可以先验证下服务器和客户端是否握手成功了。</p>

```
ssh -T git@xxx.com

```

<p>如果是 github，就可以直接写 git@github.com, 如果是 aaa.bbb.com，就可以写 git@aaa.bbb.com。 如果成功，你会看到 success 之类的字眼。</p>
<h4>3. known_hosts 文件</h4>
<p>这是个什么文件呢？一般情况下 windows 下不会产生这个文件，先说说他是干什么的。当我们成功与服务端进行连接时，ssh 会记录服务端的 Host、IP 以及 rsa 文件，当连接过程中出现：</p>
<pre><code>Permanently added '10.0.0.0' (RSA) to the list of known hosts.
</code></pre>
<p>如果你选择 Yes，那这个 known_hosts 文件中就会多出一条记录。windows 是不会自动产生这个文件的，也可能是程序产生了，但是没权限写入，所以我们没有在 .ssh/ 目录下看到这个文件。但如果我们创建了这个文件，会发现里面的内容会随着我们的验证慢慢增加。</p>
<p>搞清楚了这些概念，我们再说说会遇到的问题。</p>
<h3>二、常见问题</h3>
<h4>1. git@xxx.com 输入密钥</h4>
<p>当你键入 <code>ssh -T git@xxx.com</code> 这条命令之后，程序提示要你输入 git@xxx.com 的密码，那不用想了，程序没找到你的私有密钥。在哪些情况下会这样呢？</p>
<p>我们在生成这两个密钥的时候，程序可能没有帮我们在根目录下(C:/Users/yourName)新建一个 .ssh/ 文件夹，而他在建立连接的时候会默认寻找 <code>~/.ssh/id_rsa</code>，如果没有新建一个这样的文件夹很显然是找不到的。你可以在根目录下通过命令行来新建一个文件夹</p>

```
mkdir .ssh

```

<p>之所以要用命令行是因为有时候浏览器不让你在文件夹名第一位放点号。</p>
<p>当然也有可能是因为你没有把创建的两个密钥放到 .ssh/ 目录下，而是直接扔在根目录下。</p>
<h4>2. Host key verification failed</h4>
<p>"Host key verification failed." 相信你也撞到了这个问题，主机的密钥验证失败，主机就是你的机器，密钥验证失败有两个原因，一个是 RSA 做了更改，另一个原因是在 known_hosts 中存在一个缓存的记录，如果确认了 RSA 没有错误，那你就应该去 known_hosts 中删掉对应的那个记录（这个记录可以当做是缓存，是对验证做了一次缓存，缓存的作用是减少验证次数，不需要每次都验证，读取缓存就行了）。</p>
<p>当然，你也可以直接删除这个 known_hosts 文件。</p>
<h4>3. Permission denied (publickey)</h4>
<p>"Permission denied (publickey)." 这个问题其实和上面的 2 差不多，当你出现过 "Host key verification failed."，然后继续执行程序，如执行 <code>ssh -T git@xxx.com</code> 的时候就会出现这个问题提醒。说到底就是没有找到你的 rsa 私有密钥，或者 rsa 密钥匹配出错。</p>
<h3>三、windows 下让人纠结的问题</h3>
<h4>1. 找不到根目录</h4>
<p>生成密钥默认放在 "~/.ssh/" 下，但是在 cmd 下操作会找不到 "~/" 这个根目录，因为这是 windows 不是 linux/unix，有些童鞋可能装了 cygwin，在这个环境下操作可以 "cd ~"，git bash 下当然也是可以的。</p>
<p>如果不知道有这个问题的存在，你会碰到上述问题一，程序直接让你输入密码，但不过你输入什么密码都是错误的。输入三次之后状态为 <code>Permission denied</code>，这里的原因就是没找到 <code>~/.ssh/id_rsa</code> ，cmd 下她根本就不认识 "~/" 这个目录。</p>
<h4>2. 多个服务端的维护</h4>
<p>很常见的问题。上面我们说到了，程序会默认寻找 <code>~/.ssh/id_rsa</code> 这个文件，同一目录下显然不能有两个重名文件，也就是说当我们去认证 github 和另外一个 git 服务器的时候，我们需要把两个 rsa 私有密钥的名字换来换去，想用谁就把谁改成 id_rsa。特别麻烦，那肿么办？</p>
<p>之前在网上看到说是对 ssh_config 进行配置，配置内容是：</p>

```
Host github.com
    User boy-a
    IdentifyFile ~/.ssh/github
Host xxx.com
    User boy-b
    IdentifyFile ~/.ssh/xxx

```

<p>这里的 "~/.ssh/github" 和 "~/.ssh/xxx" 都是 rsa 文件，文件的命令可以直接改，也可以在开始生成的时候设定，命名对内容没有任何影响。项目的几行代码应该也是十分清晰的，针对不同的 git 服务器，使用不用的 IdentifyFile。</p>
<p>但是你会发现，你的设置毫无用处，因为你把文件名搞错了！在 linux/unix 下可能是使用 ssh_config 这个文件名，但是在 windows 下是使用 config 作为文件名放在 ~/.ssh/ 目录中！</p>
<h3>四、小结</h3>
<p>这东西我纠结了一个下午，花了将近三个多小时才解决问题，真心快吐血了！说到底就是一个 config 的配置问题，遇到这种问题最快捷的方式并不是在网上疯狂的搜索答案，而是静下心来看看 rsa | git | ssh 的基础知识，了解每个参数及其用途，对症下药！</p>




<p><strong>补充：</strong></p>
<p>　　1）\ssh-add -l" 报错 \Could not open a connection to your authentication agent."</p>
<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <strong>操作：ssh-agent bash -login -i</strong></p>
<p><strong>　　</strong>2）\Are you sure you want to continue connecting (yes/no)?" 选择 yes ，否则会报错\fatal: Could not read from remote repository."</p>
<p>　　3） config 文件貌似没啥用，IdentifyFile path/to/rsa 这个地方报错。</p>

