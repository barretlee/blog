---
title: 多 SSH Key 管理技巧与 Git 多账户登录问题
description: 对很多开发者，尤其是手握几台甚至几十台机器的同学而言，登录到远程机器处理事务应该是家常便饭。如果你也是其中一员，悄悄问一句，你平时是如何记住一堆帐号、机器地址以及一些附加登录选项的呢？或许你也是这么干的...
warning: true
mark: hot
categories:
  - 工具
  - 前端杂烩
  - 网络交互
tags:
  - SSH
  - GIT
  - 多账户登录
date: 2016-03-09 19:59:06
---


对很多开发者，尤其是手握几台甚至几十台机器的同学而言，登录到远程机器处理事务应该是家常便饭。如果你也是其中一员，悄悄问一句，你平时是如何记住一堆帐号、机器地址以及一些附加登录选项的呢？或许你也是这么干的：

<!--more-->

倘若你有一个远程服务器，地址为 `test.server.com`, 防止人为攻击，你将 ssh 的端口号从 22 改成了 8892，当你需要登录到这台机器时，需要这么做：

```bash
➜  ~ ssh YOURNAME@test.server.com -p 8892
password: *******
```

尚好。如果你先前已经将已经注册了一个公钥/私钥对，并且正确的部署到了远程机器，你可以省却输入密码这个环节（推荐学习 `ssh-copy-id` 命令）。

为了可以再懒一点，索性将这一串代码添加一个 alias：

```bash
➜  ~ alias test='ssh YOURNAME@test.server.com -p 8892'
➜  ~ test
```

一条 `test` 命令即可让你登录到服务器，对于只有一两台远程机器的你，应该算是特别便捷了。

### 多 SSH Key 的管理

SSH 连接建立之前，会在系统中寻找它的配置，一般有两个位置。

- `/etc/ssh/ssh_config` 这里是对所有用户适用的全局配置
- `~/.ssh/config` 或者 `$HOME/.ssh/config` 这是用户的个人配置，这些配置会覆盖全局配置

注意：一般来说，我们给 `~/.ssh` 文件夹赋予的权限为 `0700`。

配置格式比较简单，以下配置等同于上面我们的登录命令设置：

```
Host test
  HostName test.server.com
  User YOURNAME
  Port 8892
```

可以是 `param value` 也可以为 `param=value`，其中 param 对大小写不敏感，value 对大小写敏感。

使用 `ssh test` 即可完成登录，当我们有稍微麻烦点配置的时候，如数据库的 3306 端口对外不开放，可以开放另一个接口，然后内部跳转到 3306，使用命令行的写法是：

```bash
ssh -f -N -L 8999:127.0.0.1:3306 test@database.server.com
```

大串的命令行，过多的参数，实在是有点不好记。而在 config 文件中的配置就一目了然：

```
Host test
  HostName test.server.com
  User YOURNAME
  LocalForward 8999 127.0.0.1:3306
```

当你有多台远程终端的时候，config 文件的优势就更加明显了：

```
# serverlist 
Host list
  HostName *.serverlist.com
  User YOURNAME
  IdentityFile ~/.ssh/serverlist.com.key

# personal server  
Host personal
  HostName proxy1.barretlee.com proxy2.barretlee.com
  User barretlee
  IdentityFile ~/.ssh/proxy.barretlee.com.key

# school
HostName 222.20.74.89
  User school
  LocalForward 8999 127.0.0.1:3306
  IdentityFile ~/.ssh/school.key
# and so on.  
```

这里常用的的 param 也不是很多：

- `Host`，SSH 连接名
- `HostName`，如上所示，可以是通配符，可以是 IP，也可以是域名等
- `User`，登录的用户名
- `IdentifyFile`，version 1 协议下默认是 `~/.ssh/identify`，version 2 协议下，默认是依次匹配：`~/.ssh/id_dsa`，`~/.ssh/id_ecdsa`，`~/.ssh/id_rsa`，还有 version 2 兼容模式。
- `LocalForward` 端口的内部跳转
- `Port`，端口设置，默认 SSH 的端口是 22
- `Protocal`，协议版本号，1 或者 2

### Git 多账户登录问题

向仓库 push 代码之前，我们都会做一番设置，简单归纳为如下几步：

- 注册获取用户名 barretlee
- 创建仓库 `barretlee/test.git`
- 创建密钥，`ssh-keygen -t rsa -C "barret.china@gmail.com"`
- 将公钥 id_rsa.pub 填到 Git Server 上（如果没有可视化界面，还需要登录到 Server 命令行操作推送）
- 本地通过 ssh-agent 将密钥添加到 session 中，`ssh-add id_rsa`，部分终端中还需要手动开启 ssh-agent
- 然后测试连接，如 github 中， `ssh -T git@git.github.com`
- 看到了 'welcome barretlee...' 的提示，开始 push 你的代码

突然有一天，你又注册了一个帐号 xiaohuzige，也走了一遍上面的流程，发现死活也连接不上，服务器总是提示：`You have no permission to access this repo`，这是怎么回事呢？

这个时候，你可以输入这个命令，看看是哪个环节出了问题：

```bash
➜  ~ ssh -vT git@github.com
OpenSSH_6.9p1, LibreSSL 2.1.7
debug1: Reading configuration data /Users/barretlee/.ssh/config
debug1: /Users/barretlee/.ssh/config line 2: Applying options for *
debug1: Reading configuration data /etc/ssh/ssh_config
debug1: /etc/ssh/ssh_config line 20: Applying options for *
debug1: /etc/ssh/ssh_config line 102: Applying options for *
debug1: Connecting to github.com [192.30.252.128] port 22.
debug1: Connection established.
debug1: key_load_public: No such file or directory
debug1: identity file /Users/barretlee/.ssh/id_rsa type -1
debug1: key_load_public: No such file or directory
debug1: identity file /Users/barretlee/.ssh/id_rsa-cert type -1
debug1: key_load_public: No such file or directory
debug1: identity file /Users/barretlee/.ssh/id_dsa type -1
debug1: key_load_public: No such file or directory
debug1: identity file /Users/barretlee/.ssh/id_dsa-cert type -1
debug1: key_load_public: No such file or directory
debug1: identity file /Users/barretlee/.ssh/id_ecdsa type -1
debug1: key_load_public: No such file or directory
debug1: identity file /Users/barretlee/.ssh/id_ecdsa-cert type -1
debug1: key_load_public: No such file or directory
debug1: identity file /Users/barretlee/.ssh/id_ed25519 type -1
debug1: key_load_public: No such file or directory
debug1: identity file /Users/barretlee/.ssh/id_ed25519-cert type -1
debug1: Enabling compatibility mode for protocol 2.0
debug1: Local version string SSH-2.0-OpenSSH_6.9
debug1: Remote protocol version 2.0, remote software version libssh-0.7.0
debug1: no match: libssh-0.7.0
debug1: Authenticating to github.com:22 as 'git'
debug1: SSH2_MSG_KEXINIT sent
debug1: SSH2_MSG_KEXINIT received
debug1: kex: server->client chacha20-poly1305@openssh.com <implicit> none
debug1: kex: client->server chacha20-poly1305@openssh.com <implicit> none
debug1: expecting SSH2_MSG_KEX_ECDH_REPLY
debug1: Server host key: ssh-rsa SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8
debug1: Host 'github.com' is known and matches the RSA host key.
debug1: Found key in /Users/barretlee/.ssh/known_hosts:4
Warning: Permanently added the RSA host key for IP address '192.30.252.128' to the list of known hosts.
debug1: SSH2_MSG_NEWKEYS sent
debug1: expecting SSH2_MSG_NEWKEYS
debug1: SSH2_MSG_NEWKEYS received
debug1: Roaming not allowed by server
debug1: SSH2_MSG_SERVICE_REQUEST sent
debug1: SSH2_MSG_SERVICE_ACCEPT received
debug1: Authentications that can continue: publickey
debug1: Next authentication method: publickey
debug1: Trying private key: /Users/barretlee/.ssh/id_rsa
debug1: Trying private key: /Users/barretlee/.ssh/id_dsa
debug1: Trying private key: /Users/barretlee/.ssh/id_ecdsa
debug1: Trying private key: /Users/barretlee/.ssh/id_ed25519
debug1: No more authentication methods to try.
Permission denied (publickey).
```

不加 v 参数，输出的内容很简洁：

```bash
➜  ~ ssh -T git@github.com
Warning: Permanently added the RSA host key for IP address '192.30.252.129' to the list of known hosts.
Permission denied (publickey).
```

好吧，我知道你看不懂上面一长串的内容，也没心情看下去，但是你可以把焦点落到重复的那几段：

```bash
debug1: ...
debug1: xxx, No such file or directory
debug1: ...
debug1: Trying private key: /Users/barretlee/.ssh/xxx
debug1: ...
```

之前我们提到了 Protocal Version 1 和 Version 2，不同的版本号，默认的私钥地址不一样，所以程序会不断去尝试寻找默认的地址，如果没找到，最后会提示，授权失败，禁止访问。

我们可以在 push 代码之前，使用 ssh-agent 来管理私钥的 session，如：

```bash
➜  ~ ssh-add .ssh/coding_barretlee
Identity added: ~/.ssh/coding_barretlee (coding_barretlee)
➜  ~ ssh-add .ssh/github_barretlee
Identity added: ~/.ssh/github_barretlee (github_barretlee)
```

那么当程序寻找私钥的时候，就会优先到 ssh-agent 添加的 session 中寻找。session 的生命周期不是很长，当你重启电脑之后它就没了。如果你有遇到了 `Permission Denied` 的提示，请重新执行 ssh-add 命令。

当你在某个 Git 服务器上有多个帐号的时候，可能某个帐号总是提示：`Permission Denied`。拿 `coding.net` 上来说，我有两个账户，一个是 barretlee，另一个是 taobaofed，由于先前我一直用的 barretlee 账户，后来者 taobaofed 的代码死活推不上去。反反复复地检查配置，反反复复地检查上传的公钥，反反复复地使用 `ssh -T git@git.coding.net` 测试，没看到哪里不对，然而 taobaofed 的代码就是推不上去，这是怎么回事呢？

当然，上面 SSH 介绍了那么多，其简明易懂的配置在这里也是可以用上的：

```bash
### default for all ##
Host *
     ForwardAgent no
     ForwardX11 no
     ForwardX11Trusted yes
     User nixcraft
     Port 22
     Protocol 2
     ServerAliveInterval 60
     ServerAliveCountMax 30

## barretlee coding ##
Host coding-barretlee
     HostName git.coding.net
     User barretlee
     IdentityFile ~/.ssh/coding_barretlee

## taobaofed coding ##
Host coding-taobaofed
     HostName git.coding.net
     User taobaofed
     IdentityFile ~/.ssh/coding_taobaofed
```

使用这种配置，我们可以避免使用 ssh-agent 添加 session 操作。可是，我就是按照上面的方式配置的呀，依然不行！

这里的问题在于，我们的 User 项不正确，每次推送代码的时候，git 会读取上次的的 User 配置，而我的配置是 barretlee，那么下次提交代码的时候虽然 IdentityFile 用对了，但是 User 不是 taobaofed，所以死活也推不动代码。

解决的方案很简单，如果在下载代码之前就已经设置好了两个帐号，你可以通过如下命令克隆代码：

```bash
➜  ~ git clone git@coding-taobaofed:taobaofed/blog.git
```

如果是在已有的仓库中，其默认 origin 配置会是：`//git.coding.net/taobaofed/blog.git` 或者 `git@git.coding.net:taobaofed/blog.git`，你可以将仓库下的 `.git/config` 文件修改下：

```
[remote "origin"]
  url = git@coding-taobaofed:taobaofed/blog.git
  fetch = +refs/heads/*:refs/remotes/origin/*
```

防止克隆其他仓库代码也出现问题，我们可以将 `~/.ssh/config` 稍加修改：

```
## barretlee coding ##
Host git.coding.net coding-barretlee
     HostName git.coding.net
     User barretlee
     IdentityFile ~/.ssh/coding_barretlee

## taobaofed coding ##
Host coding-taobaofed
     HostName git.coding.net
     User taobaofed
     IdentityFile ~/.ssh/coding_taobaofed
```

那么，通过正常的 clone（如`git clone git@git.coding.net:barretlee/blog.git`）就不会出现 `Permission Denied` 的提示了。

**需要引起注意的一点：在寻找配置的时候，ssh 会优先查看 ssh-agent session 中的配置，然后才是 config 文件，如果你 ssh-add 添加过 key，建议执行如下操作：**

```bash
➜  ~ ssh-add -D # 删除所有的 session
```

### 最后

撰写本文之前，我已经踩坑三小时，花了三个小时，摸索出来这么些东西，感觉以后妈妈再也不用担心我的 Git/SSH 的配置问题了。

最主要的手段依然是通过 `ssh -vT` 查看 SSH 交互过程中出现了什么障碍，debug 信息还是很有考究价值的！


