---
title: Git 约定式提交规范实践
description: 小胡子哥的个人网站
warning: false
author: 小胡子哥
tags:
  - commit
  - git
categories:
  - 随笔
  - 工具
  - 前端杂谈
date: 2019-10-28 15:14:00
---

[约定式提交规范](https://www.conventionalcommits.org/en/v1.0.0/) 提供了一个轻量级的提交历史编写规则，它的内容十分简单：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

举个简单的例子：

```
feat(config): 允许 config 对象直接从其他 config 继承

BREAKING CHANGE: 在 config 对象中增加 `extends` 字段，用于从其他继承 config

close issue #23
```

在 git commit 时，如果你想进行多行 commit 编辑，可以通过 `git commit -a` 进入编辑界面；如果是单行，可以直接 `git commit -a -m 'COMMIT MESSAGE'` 完成提交。

### 更多的约定

约定式规范与 [SemVer](http://semver.org/) 的设计是相吻合的，

```
PATCH -> type(fix)
MINOR -> type(feat)
MAJOR -> BREAKING CHNAGE
```

大部分的提交中，我们都会使用 fix 和 feat 来描述本次修改的类型，当然也包含其他类型，如 `chore/docs/reflector/improvement/perf/test/style`，值得注意的是：

- 一般不用写 `body` 部分的内容，除非存在 `BREAKING CHANGE`
- `description` 的内容要相当简明扼要，用简单的语句把修改点直接说出来
- 一般不建议将多次修改放在一次提交中，尤其是一次半（第二个修改只完成了一部分）的情况
- `scope` 可以是一个文件的地址，如 `/lib/utils`；也可以是某个功能点 `parser`，不建议超过两个单词

### 一些技巧

**合并多次提交**

如果你上次修改的内容存在 bug 或未完成，本次提交的内容与上次几乎一样，建议使用 `git rebase -i` 进行提交的合并，如

```
git rebase -i HEAD~3 # 展示最近 3 次修改
```

输出如下：

```
pick 0291959 chore(blog): 清理无关项
pick 1ef8f31 chore(blog): 清理无关项
pick 36a91db fix(post): 格式化 post 的 meta 数据格式,增加 --- 开始符
```

可以将第二行的 `pick` 修改为 `squash`，表示保留 commit 但将本次修改合并到上次，相关的操作可以看 [这篇文章](https://www.barretlee.com/blog/2018/11/26/git-%E5%B8%B8%E7%94%A8%E6%8A%80%E5%B7%A7/)。

**关闭 ISSUE**

在 github/gitlab 中，如果 commit message 中带有 `Fix #23` 诸如此类的信息，当 commit 被 push 到 repo 后，会自动关闭编号为 23 的 issue。

**自动生成 CHANGELOG**

在写日报或者周报，或者在项目发版时，我们可以很轻松地从提交日志中看到自己或者团队干了些什么事情：

```bash
alias git-changelog='git log --oneline --decorate';
```

当然也可以使用开源的工程自动生成结构化更强的 CHANGELOG 日志，如 [auto-changelog](https://github.com/CookPete/auto-changelog)，它提供了可自定义的 CHANGELOG 模板。

### 项目配置

约定如果没有工具来辅助和约束，大概率就成了一纸空文，毫无意义。在项目实战中，我们可以做如下配置让项目成员强制进行约定式提交。

**1. 安装工具**

推荐使用 `@commitlint/cli` 进行检测，安装方式：

```
npm install @commitlint/cli --save-dev
```

**2. 配置约定**

在 `@commitlint` 工具包中有一个规则比较强的检测规范：`@commitlint/config-conventional`，也安装到项目中：

```
npm install @commitlint/config-conventional --save-dev
```

安装完成后，需要显式地配置，在项目中增加 `commitlint.config.js`：

```js
module.exports = { 
  extends: [
    '@commitlint/config-conventional'
  ] 
};
```

`config-conventional` 中允许类型有 `build/chore/ci/docs/feat/fix/perf/refactor/revert/style/test`。

**3. 提交时执行检查**

推荐使用 `husky` 这个工具，它会帮助我们自动配置 commit hooks，只需在项目中添加 `.huskyrc.json` 文件：

```json
{
  "hooks": {
    "pre-commit": "node ./node_modules/@commitlint/cli/lib/cli.js -E HUSKY_GIT_PARAMS"
  }
}
```

当然也可以直接在 package.json 中配置 `husky` 字段，具体可以查看 [文档](https://github.com/typicode/husky)。

### 小结

整洁的提交记录并不仅仅意味着开发者自动生成 CHANGELOG，遵守约定可以给项目沉淀一个结构化的提交历史，再加上一些 emoji，生成出来的文档简直就是一篇生动的项目发展史，它有助于我们向公众传达变化的性质，同时对继续集成也会带来一定的好处，比如我们可以根据 type 触发不同的构建和部署流程。
