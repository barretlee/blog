---
title: 用对 gitignore
description: 使用 git 做代码管理工具时，设置 gitignore 是必不可少的流程，一些系统或者 IDE 会在目录下生成与项目不相关的文件，而这些文件我们不期望被提交到仓库之中。理解 gitignore 的 parrern 规则十分重要。
warning: true
categories:
  - 工具
  - 前端杂烩
tags:
  - git
  - gitignore
date: 2015-09-06 11:33:54
---


使用 git 做代码管理工具时，设置 gitignore 是必不可少的流程，一些系统或者 IDE 会在目录下生成与项目不相关的文件，而这些文件我们不期望被提交到仓库之中。理解 gitignore 的 pattern 规则十分重要。

<!-- more -->

### Pattern 规则

关于 Pattern 规则，可以查看 git 的相关文档：<http://git-scm.com/docs/gitignore>，大致有以下几点：

1. 空行不匹配任何内容，所以可以作为块分隔符；
2. `#` 开头表示注释，如果相匹配 `#`，可以在前面加一个反斜杠，即 `\#`；
3. 除非加了反斜杠，否则一连串的空格会被忽略；
4. 如果在匹配的内容前面加上 `!`，则这些匹配过的部分将被移出，如果要匹配以 `!` 开头的内容，需要加上反斜杠，如 `\!important.txt`；
5. 如果一个匹配 pattern 后面有一个斜杠，如 `foo/`，则默认会匹配所有（包含父子文件夹）中的 foo 文件夹内容，并且它不会匹配单个的文件；
6. 如果一个匹配 pattern 不包含斜杠，如 `foo`，Git 会将其作为一个 shell 的查找命令匹配内容。

需要注意的 `**`：

- 如果一个 pattern 以 `**` 开头，如 `**/foo`，最后会匹配所有文件夹下的 foo 文件(夹)；
- 如果一个 pattern 以 `/**` 开头，如 `abc/**`，则表示匹配 abc 目录下的所有内容；
- 如果一个 pattern 中间包含 `**`，如 `a/**/b`，则会匹配 `a/b`、`a/x/b`、`a/x/y/b` 以及所有类似的内容。

### gitignore 相关的问题

#### 匹配示例

如果我们要匹配 'foo' 目录下除去 'foo/bar/' 的内容，可以这样做：

```
foo/
!foo/bar/
```

如果要匹配所有目录下的 node_modules 文件夹，只需要这样做：

```
node_modules/
```

如果要匹配所有的 json 文件，可以这样做：

```
*.json
```

#### git 操作中，add 之后再加入 gitignore

Git 操作中经常会出现这样的问题，当我们 `git add` 之后，突然想起来要添加一个 gitignore 文件，但是一些诸如 node_modules/, cache/ 等文件已经被 add 进去了，这些文件不会被 ignore 掉，怎么办？

最直接的方式是：

```bash
# 这一步的操作相当于回到 git add 上一步
git rm -r --cached .
# 然后重新 add
git add --all .
```

#### git 添加空文件夹

Git 默认是不添加空文件夹的，如果一定要加入这个文件夹，有以下方案：

1）在文件夹添加文件，然后删除

2）在文件夹中添加一个 `.gitkeep` 文件

#### 让 git 不要添加 gitignore 文件

如果在 .gitignore 文件中添加

```
.gitignore
```

你会发现，并没有起作用， .gitignore 文件依然被加到了 git 中，为什么会有这个需求呢？有些人在本地开发的时候有一些其他的文件夹名不愿意让别人看到，虽然在 gitignore 中被忽略了，但是 .gitignore 文件中依然可以看到这些文件夹名字。

其实没有什么好的办法处理这个问题，.gitignore 做多人协作开发的时候可以直接根据同一份 gitignore 过滤文件，如果一定要做，可以从 add 中在 remove 掉：

```
git rm --cached .gitignore
```

Git 操作涉及的命令巨多，但是日常开发中用到的就那么几个，把原理搞清楚，用起来得心应手。