---
title: 简述 OAuth 2.0 的运作流程
description: 本文将以用户使用 github 登录网站留言为例，简述 OAuth 2.0 的运作流程。
warning: true
categories:
  - 网络交互
tags:
  - OAuth2
date: 2016-01-10 23:56:33
---


本文将以用户使用 github 登录网站留言为例，简述 OAuth 2.0 的运作流程。

<!--more-->

假如我有一个网站，你是我网站上的访客，看了文章想留言表示「朕已阅」，留言时发现有这个网站的帐号才能够留言，此时给了你两个选择：一个是在我的网站上注册拥有一个新账户，然后用注册的用户名来留言；一个是使用 github 帐号登录，使用你的 github 用户名来留言。前者你觉得过于繁琐，于是惯性地点击了 github 登录按钮，此时 OAuth 认证流程就开始了。

需要明确的是，即使用户刚登录过 github，我的网站也不可能向 github 发一个什么请求便能够拿到访客信息，这显然是不安全的。就算用户允许你获取他在 github 上的信息，github 为了保障用户信息安全，也不会让你随意获取。所以操作之前，我的网站与 github 之间需要要有一个协商。

#### 1. 网站和 Github 之间的协商

Github 会对用户的权限做分类，比如读取仓库信息的权限、写入仓库的权限、读取用户信息的权限、修改用户信息的权限等等。如果我想获取用户的信息，Github 会要求我，先在它的平台上注册一个应用，在申请的时候标明需要获取用户信息的哪些权限，用多少就申请多少，并且在申请的时候填写你的网站域名，Github 只允许在这个域名中获取用户信息。

此时我的网站已经和 Github 之间达成了共识，Github 也给我发了两张门票，一张门票叫做 Client Id，另一张门票叫做 Client Secret。

#### 2. 用户和 Github 之间的协商

用户进入我的网站，点击 github 登录按钮的时候，我的网站会把上面拿到的 Client Id 交给用户，让他进入到 Github 的授权页面，Github 看到了用户手中的门票，就知道这是我的网站让他过来的，于是它就把我的网站想要获取的权限摆出来，并询问用户是否允许我获取这些权限。

```
// 用户登录 github，协商
GET //github.com/login/oauth/authorize

// 协商凭证
params = {
  client_id: "xxxx",
  redirect_uri: "http://my-website.com"
}
```

如果用户觉得我的网站要的权限太多，或者压根就不想我知道他这些信息，选择了拒绝的话，整个 OAuth 2.0 的认证就结束了，认证也以失败告终。如果用户觉得 OK，在授权页面点击了确认授权后，页面会跳转到我预先设定的 `redirect_uri` 并附带一个盖了章的门票 code。

```
// 协商成功后带着盖了章的 code
Location: http://my-website.com?code=xxx
```

这个时候，用户和 Github 之间的协商就已经完成，Github 也会在自己的系统中记录这次协商，表示该用户已经允许在我的网站访问上直接操作和使用他的部分资源。

#### 3. 告诉 Github 我的网站要来拜访了

第二步中，我们已经拿到了盖过章的门票 code，但这个 code 只能表明，用户允许我的网站从 github 上获取该用户的数据，如果我直接拿这个 code 去 github 访问数据一定会被拒绝，因为任何人都可以持有 code，github 并不知道 code 持有方就是我本人。

还记得之前申请应用的时候 github 给我的两张门票么，Client Id 在上一步中已经用过了，接下来轮到另一张门票 Client Secret。

```
// 网站和 github 之间的协商
POST //github.com/login/oauth/access_token

// 协商凭证包括 github 给用户盖的章和 github 发给我的门票
params = {
  code: "xxx",
  client_id: "xxx",
  client_secret: "xxx",
  redirect_uri: "http://my-website.com"
}
```

拿着用户盖过章的 code 和能够标识个人身份的 client_id、client_secret 去拜访 github，拿到最后的绿卡 access_token。

```
// 拿到最后的绿卡
response = {
  access_token: "e72e16c7e42f292c6912e7710c838347ae178b4a"
  scope: "user,gist"
  token_type: "bearer",
  refresh_token: "xxxx"
}
```

#### 4. 用户开始使用 github 帐号在我的页面上留言

```
// 访问用户数据
GET //api.github.com/user?access_token=e72e16c7e42f292c6912e7710c838347ae178b4a
```

上一步 github 已经把最后的绿卡 access_token 给我了，通过 github 提供的 API 加绿卡就能够访问用户的信息了，能获取用户的哪些权限在 response 中也给了明确的说明，scope 为 user 和 gist，也就是只能获取 user 组和 gist 组两个小组的权限，user 组中就包含了用户的名字和邮箱等信息了。

```
// 告诉我用户的名字和邮箱
response = {
  username: "barretlee",
  email: "barret.china@gmail.com"
}
```

整个 OAuth2 流程在这里也基本完成了，文章中的表述很粗糙，比如 access_token 这个绿卡是有过期时间的，如果过期了需要使用 refresh_token 重新签证。重点是让读者理解整个流程，细节部分可以阅读 [RFC6749 文档](http://www.rfcreader.com/#rfc6749)。

希望对你理解 OAuth 2.0 有帮助。（本文完）

