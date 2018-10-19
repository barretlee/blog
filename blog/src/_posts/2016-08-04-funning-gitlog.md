---
title: 有意思的 git-log
description: 之前写过几篇 git 相关的文章，内容很基础，但发现最近被搜索引擎检索的量还比较大，最近正好在阅读 git 相关的资料，准备将不错的几个点，详细地说一说，记录下来写出来分享给大家。今天要说的便是常用的 `git log` 命令。
warning: true
categories:
  - 工具
  - 前端杂烩
tags:
  - git
date: 2016-08-04 22:54:09
---


之前写过几篇 git 相关的文章，内容很基础，

- [git版本回退操作](//www.barretlee.com/blog/2014/04/28/git-roll-back/)
- [git切换到远程分支](//www.barretlee.com/blog/2014/04/30/switch-branch-in-git/)
- [git版本管理策略及相关技巧(A)](//www.barretlee.com/blog/2014/05/07/cb-git-improve/)

但发现最近被搜索引擎检索的量还比较大，最近正好在阅读 git 相关的资料，准备将不错的几个点，详细地说一说，记录下来写出来分享给大家。今天要说的便是常用的 `git log` 命令。

<!--more-->

### 先看几个栗子

以 React-Native 代码为例，演示几个有意思的 git-log 命令。

- 普通查看：`git log`
```
commit f84120a1669cd3a6c8db5e830a96565fa07d3ba8
Author: Justin McPherson <justin.mcpherson@canonical.com>
Date:   Thu Aug 4 18:09:50 2016 +1000

    Update README

    - Correct URL of git repo.
    - Mention supported Ubuntu variants.

commit cf3ade3eff98baf710d9f4134aa9ddde2ad96920
Merge: 25a5a12 d47218e
Author: Justin McPherson <justin.mcpherson@canonical.com>
Date:   Thu Aug 4 17:57:25 2016 +1000

    Merge pull request #1 from RodrigoHahn/patch-1

    Rename README.ubuntu to README-ubuntu.md
```

- 简略形式：`git log --oneline`
```
f84120a Update README
cf3ade3 Merge pull request #1 from RodrigoHahn/patch-1
d47218e Rename README.ubuntu to README-ubuntu.md
25a5a12 react: Don't throw exceptions on error
4ced394 Cleanup
c1bd457 Improve Image support
7d0fa11 Improve timer handling
88b7cef Move tmp directory into the ubuntu root
f240917 Update for README
e19c816 Refinements+fixes to running and packaging.
8302160 Don't specify current directory for generic node executable.
135ecc5 Executor and Packaging update.
dafb051 Copy assets to phone on run
e6aec7a Fix packaging step for assets
```

- 查看详细修改：`git log -p -2`，只看最近两条
```
commit f84120a1669cd3a6c8db5e830a96565fa07d3ba8
Author: Justin McPherson <justin.mcpherson@canonical.com>
Date:   Thu Aug 4 18:09:50 2016 +1000

    Update README

diff --git a/README-ubuntu.md b/README-ubuntu.md
index ad3574f..0a732f8 100644
--- a/README-ubuntu.md
+++ b/README-ubuntu.md
@@ -3,6 +3,10 @@
+### Platforms
+
+There is support for applications on both Desktop Ubuntu and Ubuntu Touch.
+
 You should have an Ubuntu 16.04 (Xenial Xerus) installation.
@@ -32,7 +36,7 @@ ubuntu need to be published to a local package repository.
 Download the port for Ubuntu.

 ~$ mkdir src; cd src
-~/src$ git clone https://git.launchpad.net/reactnative-ubuntu -b ubuntu
+~/src$ git clone https://github.com/CanonicalLtd/react-native -b ubuntu

 And then follow the instruction in ~/src/reactnative-ubuntu/react-native-cli/README.md
```

- 展示文件修改的量：`git log --shortstat`
```
commit cf3ade3eff98baf710d9f4134aa9ddde2ad96920
Merge: 25a5a12 d47218e
Author: Justin McPherson <justin.mcpherson@canonical.com>
Date:   Thu Aug 4 17:57:25 2016 +1000

    Merge pull request #1 from RodrigoHahn/patch-1

 1 files changed, 22 insertions(+), 12 deletions(-)

commit d47218e08cffb1479c1e3511031ae377023b01c2
Author: RodrigoHahn <rodrigo.rmh@gmail.com>
Date:   Wed Aug 3 10:16:59 2016 -0300

    Rename README.ubuntu to README-ubuntu.md

 2 files changed, 226 insertions(+), 226 deletions(-)
```

- 简略展示，加分支情况：`git log --pretty=format:"%h %s" --graph`
```
* b36abb0 Initial support for ImageLoader
*   9cf8f2a Merge branch 'master' of https://github.com/facebook/react-native into ubuntu
|\
| * d363b1f Update Jest APIs on fbsource
| * 192ab66 Fix 302 ImageLoader caching problem on iOS
| * 6a26037 Fix build break of react native exopackage apps
| * 50d8d46 Add ability to expose sync hooks from Java to JS
| * 171c723 Simplify message passing in JSC-executor
| * fb76154 handle null args array in proxy invocation handler
| * 131970d Android Support Repository -> Local Maven repository for Support Libr…
* | 3cf6e03 Update measure function to match master
* |   2fb11b3 Merge branch 'master' into ubuntu
|\ \
| |/
| * 8295d27 Fix usage of react-native cli inside package.json scripts
| * b5d9bf0 merge InteractionManager stuff back into PanResponder
| * dad39eb Move `Number` polyfills into the `/polyfills/` directory
```

- 查看单个文件被修改的情况：`git log -p React/Base/RCTAssert.m`
```
commit 34d5fa2695971ba9c9b2271578ade4b700061066
Author: Nick Lockwood <nicklockwood@fb.com>
Date:   Thu Jan 21 07:49:45 2016 -0800

    RCTUtils Obj-C nullability annotations

diff --git a/React/Base/RCTAssert.m b/React/Base/RCTAssert.m
index 4742cb3..d0006e2 100644
--- a/React/Base/RCTAssert.m
+++ b/React/Base/RCTAssert.m
@@ -119,7 +119,7 @@ void _RCTAssertFormat(

 void RCTFatal(NSError *error)
 {
-  _RCTLogNativeInternal(RCTLogLevelFatal, NULL, 0, @"%@", [error localizedDescription]);
+  _RCTLogNativeInternal(RCTLogLevelFatal, NULL, 0, @"%@", error.localizedDescription);

   RCTFatalHandler fatalHandler = RCTGetFatalHandler();
   if (fatalHandler) {
```

- 查看 Brent Vatne 修改过的 md 文件：`git log --author='Brent Vatne' \*.md`
```
commit 2ed199fa2bd7b68546a0c688437657653e7dad03
Author: Brent Vatne <brentvatne@gmail.com>
Date:   Tue Jan 12 12:02:48 2016 -0800

    Update KnownIssues.md

commit 33d6293c607340836372201b0e7b26d7bddba0c8
Author: Brent Vatne <brentvatne@gmail.com>
Date:   Mon Dec 28 17:51:30 2015 -0800

    Update KnownIssues.md
```

- 查看 James Ide 在 2016 年 2 月内的所有动态：`git log --author='James Ide' --since='2016-02-01' --before='2016-03-01'`
```
commit b051d07b819be7ff01ac54106ca7f0f0289d1bd0
Author: James Ide <ide+github@jameside.com>
Date:   Wed Feb 10 12:46:26 2016 -0800

    Update CONTRIBUTING.md

commit 0e0f20c80683723a4f279910bd9d5a4c088fe039
Merge: 82b0df9 e59efc1
Author: James Ide <ide+github@jameside.com>
Date:   Wed Feb 3 17:27:44 2016 -0800

    Merge pull request #5744 from LoadDOCs/loaddocs
```

- 查看包含 'Fix bug' 的日志，一行展示：`git log --grep='Fix bug' --oneline`
```
d637621 Fix bug #5604 - Unrecognised signal for touchable no longer on the screen
5f4390b Fix bug related to removeClippedSubviews and view collapsing.
041fb59 Fix bug with calculating Y offset in RecyclerViewBackedScrollView.
64a78ed Fix bug in Android elevation implementation
3a92f20 Fix buggy behavior of setBackgroundColor in react View.
f4c7bb1 [react-packager] Fix bug on Bundles Layout algorithm
```

- 查看某次修改的内容：`git show 3a92f20`
```
commit 3a92f2017fc2e51c2a915f0e535397cb3937d412
Author: Krzysztof Magiera <krzysztof@fb.com>
Date:   Mon Oct 26 14:21:12 2015 -0700

    Fix buggy behavior of setBackgroundColor in react View.

diff --git a/ReactAndroid/src/main/java/com/facebook/react/views/view/ReactViewGroup.java b/ReactAndroid/src/main/java/com/facebook/react/views/view/ReactViewGroup.java
index b583eeb..6131f00 100644
--- a/ReactAndroid/src/main/java/com/facebook/react/views/view/ReactViewGroup.java
+++ b/ReactAndroid/src/main/java/com/facebook/react/views/view/ReactViewGroup.java
@@ -118,18 +118,8 @@ public class ReactViewGroup extends ViewGroup implements
-      Drawable backgroundDrawble = getBackground();
-      if (mReactBackgroundDrawable != null && (backgroundDrawble instanceof LayerDrawable)) {
-        // extract translucent background portion from layerdrawable
```

### 理解 git log

git log 详细记录了所有开发者在项目中的贡献情况，包括作者的信息、提交的内容（与上一次的差异对比 patch），还添加了一些额外的诸如时间、id（commit sha1）等内容。

它就像是一个数据库，提供了很多很多参数可以被重新梳理、查询。

效果 | SQL | git 命令
----|-----|---
查询前两条 | `SELECT * FROM git-log LIMIT 0,2` | `git log -p -2`
查询5-8条 | `SELECT * FROM git-log LIMIT 5,3` | `git log -p --skip=5 -3`
关键词查询 | `SELECT commitMsg FROM git-log WHERE commitMsg LIKE '%Fix bug%'` | `git log --oneline --grep='Fix bug'`
个人日志  | `SELECT * FROM git-log WHERE DATE(ct) BETWEEN '2016-02-01' AND '2016-03-01` AND author='James Ide' | `git log --author='James Ide' --since='2016-02-01' --before='2016-03-01'`

git-log 提供的命令相当多，可以通过 `git help log` 查看，基本上可以满足我们日常查询需求。

最后列一条十分给力的查看 git-log 全貌命令，可以通过 alias 写到 `.bashrc/.zshrc` 中：

```
alias gitlog="git log --all --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative"
```

效果图（点击可放大）：

![git log](/blogimgs/2016/08/04/6c0378f8gw1f6imxm25vtj21kw16p7wh.jpg)<!--<source src="//ww4.sinaimg.cn/large/6c0378f8gw1f6imxm25vtj21kw16p7wh.jpg">-->

本文完。
