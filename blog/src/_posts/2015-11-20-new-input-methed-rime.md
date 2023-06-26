---
title: 换新的输入法，Rime
description: '使用 Mac 快两年时间了，码字错误率提高了 200%。国内两款输入法 百度／搜狗，其实都挺好用的，但是有几个毛病：1. 不流畅，有的时候感觉跟不上我的速度; 2. 在部分软件内输入存在问题，卡死或者 CPU 飙高; 3. 半角全角不好控制.'
warning: true
categories:
  - 工具
tags:
  - Rime
  - 鼠须管
mark: hot
date: 2015-11-20 18:25:21
---


使用 Mac 快两年时间了，码字错误率提高了 200%。国内两款输入法 百度／搜狗，其实都挺好用的，但是有几个毛病：

- 不流畅，有的时候感觉跟不上我的速度
- 在部分软件内输入存在问题，卡死或者 CPU 飙高
- 半角全角不好控制

<!--more-->

因为百度输入法在 xx 编辑软件内会 loading 甚至死掉，而且联想功能和自动纠错功能太弱，我换成了搜狗，最近搜狗输入法一个 bug 把我郁闷死了：

[![搜狗输入法bug - 微博](/blogimgs/2015/11/20/20151105_5356dbce.jpg)](http://weibo.com/1812166904/D4hGckyzd)

反馈给他们的技术人员，但是目前也没看到新版本更新，恰巧看到同事使用一款从来没见过的输入法，网上搜索了一番，感觉挺不错。

这块输入法的名字叫做 Rime，中文名为：鼠须管（它有好几个名字，Windows 下叫做小狼毫），我用的是 Mac，就没有去研究 windows/Linux 下的 Rime 了，你能想到的输入法，它都支持，兼顾 windows/Linux/Mac 三大系统。

![鼠须管](/blogimgs/2015/11/20/20151105_0f27f553.png)

### 关于 Rime

网上搜索最先看到的时两篇文章，一篇是 [爱范儿](http://www.ifanr.com/156409) 对它的介绍，另一篇是 [BYVoid](//www.byvoid.com/blog/recommend-rime/) 对它的赞扬，称之为「神级输入法」。

这个输入法是“佛振”开发的，我不了解这个人，但是从 Github 上可以看到他的[一些项目](//github.com/rime)，应该是个低调的大牛。

Rime 的官网地址：<http://rime.im/>。听同事说，他使用 Rime 的时候还没有官网，之前是在 google code 上下载安装的。官网几个大字屹立：“聪明的输入法懂我的心意”。作者的编程思想是：

- 技巧加蛮力
- 慢工出细活
- 创造艺术和美
- 登峰造极之作

很有雅韵，不过「慢工出细活」这句话估计也是无奈之语，因为这东西的开发人力投入并不多，一两个人搞，还得兼顾这么多平台，自然就慢。很多人评论说 Rime 流畅、丝滑，怎么说呢，Rime 的词库不多，它的哲学也不提倡导入太多的词库，期望用户根据自己的输入习惯自然形成个性化的词库。这是它快的原因之一，不像搜狗输入法，安装的时候就给用户安装、导入一堆东西，检索的时候自然也就慢了。

### 安装和使用

如果你是一位 Mac 用户，电脑上应该已经安装了 [Homebrew](http://brew.sh) 了吧，如果已经安装了 Homebrew，不妨再安装一个 [Homebrew Cask](http://caskroom.io/)，它打包了很多软件，可以一个命令完成一个软件的安装和配置，比如安装 Rime：

```bash
$ brew cask install squirrel
```

我建议你把墙打开，我试过，不翻过墙，安装的速度是 0. 安装好了之后，你只需要关注一个目录：`~/Library/Rime`，这个目录下容纳了很多东西，包括接下来你需要配置的。

如果你没有安装 Homebrew，请移步 [这里](http://rime.im/download/)，或者自行 [google](//www.google.com.hk/search?q=Rime+%E5%AE%89%E8%A3%85)。

当你完成上述操作之后，我建议你先进入 `系统偏好设置->键盘->输入源`，把 鼠须管 和 默认ABC 之外的输入法先删除，因为你已经不需要它了，就像我这样：

![删除其他输入法](/blogimgs/2015/11/20/20151105_76b01a35.png)

在我们上面提到的目录中，有很多东西，看着会有点头晕：

![Rime 目录](/blogimgs/2015/11/20/20151105_121a1bdb.png)

但是可以清晰的看到有好几组，分别是 cangjie5（仓颉拼音）、double_pinyin_flypy（双拼）、luna_pinyin（朙月拼音）、luna_pinyin_simp（朙月拼音简体）等等。大多数人需要关注的是 `squirrel.custom.yaml`（输入法皮肤配置） 以及 `default.custom.yaml`（输入法引擎配置）这两个文件。

我觉得你没太多必要了解这些配置的细节内容，将下面代码复制进去，然后部署下。

```
# default.custom.yaml, 全局生效
patch:
    menu/page_size: 9      #这是之前增加的候选词数量。
    schema_list:           #“输入选单”中激活的输入方案定义。
     #  - schema: terra_pinyin
        - schema: luna_pinyin
        - schema: emoji
     #  - schema: luna_pinyin_fluency
     #  - schema: double_pinyin_mspy
        - schema: luna_pinyin_simp
     #  - schema: bopomofo
     #  - schema: double_pinyin_flypy
#下面定义“输入选单”的切换控
    switcher:
        abbreviate_options: true
        caption: "〔切换输入方案〕"          #把默认的“方案選單”修改为了“切换”。
        fold_options: true
        hotkeys:
            - "Control+grave"       #默认方案
            - "Control+Shift+grave"   #默认方案
            - "Control+s"             #新增方案
        option_list_separator: "／"   #以下都为默认custom.yaml文件的默认配置，copy过来就可以。
        save_options:
            - full_shape
            - ascii_punct
            - simplification
            - extended_charset
```

```
# 适用于【鼠须管】0.9.13+
# 位置：~/Library/Rime/squirrel.custom.yaml
# 用法：想要哪项生效，就删去该行行首的 "#" 字符，但注意保留用于缩进的空格

patch:
#  us_keyboard_layout: true                 # 键盘选项：应用美式键盘布局
# 状态通知，适当，也可设为全开（always）全关（never）
#  show_notifications_when: appropriate
#
 style/color_scheme: lost_temple                    # 选择配色方案
 style/horizontal: true                     # 候选窗横向显示
 style/inline_preedit: false                # 关闭内嵌编码，这样就可以显示首行的拼音
#  style/corner_radius: 10                  # 窗口圆角半径
#  style/border_height: 0                   # 窗口边界高度，大于圆角半径才有效果
#  style/border_width: 0                    # 窗口边界宽度，大于圆角半径才有效果
#  style/line_spacing: 1                    # 候选词的行间距
#  style/spacing: 5                         # 在非内嵌编码模式下，预编辑和候选词之间的间距
#  style/font_face: "Hiragino Sans GB W3"   # 字体名称
 style/font_point: 28                       # 字号

# 注：预设的配色方案及代码（指定为 style/color_scheme ）
#   碧水 - aqua
#   青天 - azure
#   明月 - luna
#   墨池 - ink
#   孤寺 - lost_temple
#   暗堂 - dark_temple
#   星际我争霸 - starcraft
#   谷歌 - google
#   晒经石 - solarized_rock
#   简约白 - clean_white
```

yaml 配置简洁易懂，而且还有注释说明，相信聪明的你可以自己尝试微调。以上修改完成之后，需要部署（相当于修改了配置之后需要重新编译一次）。

部署有两种方式：在顶部 toolbar 中找到输入法按钮点开后的「重新部署」选项；或者按下 `Ctrl + alt +  ~` 组合键。

如果你需要输入 emoji 或者刚开始安装切换到简体输入法（安装后默认为繁体），你需要按下组合键 `Ctrl + ~`，这里需要注意的是 Sublime Text 的快捷键跟切换输入引擎组合键冲突了，建议 focus 到其他窗口再按组合键，不过在我们上面部署完了之后会解决这个问题，因为我们在 `default.custom.yaml` 配置了其他的 HotKeys，可以通过 `Ctrl + s` 和 `Ctrl + Shift + ~` 进行切换操作。

**小 Tip** 

如果你期望快速输入 emoji，比如输入 `cry` 就会出现哭的表情，可以这么干：

在你目前使用的输入法对应的自定义配置项中配置如下内容（我用的是简体输入，对应的是 `luna_pinyin_simp.custom.yaml`）

```
#  luna_pinyin_simp.custom.yaml
patch:
    engine/translators:
        - punct_translator
        - r10n_translator
        - reverse_lookup_translator
    recognizer/patterns/reverse_lookup: "`[a-z]*$"
    schema/dependencies:
        - emoji
    abc_segmentor/extra_tags:
        - reverse_lookup
    reverse_lookup:
        dictionary: emoji
        enable_completion: false
        prefix: "`"
        tips: 〔表情〕
```

它的作用是，当你按下 "\`" 这个符号的时候，会进入 emoji 的输入模式，或者平时随意输入的时候也会偶尔出现 emoji。我把这个配置项删掉了，原因是，当我输入一个字符，比如 "l" 的时候，我期望第一个出现的是 "了"，然而它确实 emoji，而且整排选项都是，如下图：

![emoji](/blogimgs/2015/11/20/20151106_3b4722c1.png)

### 小结

如果你是一个资深爱折腾玩家，建议阅读这两篇文章：

- [安装及配置 Mac 上的 Rime 输入法——鼠鬚管 (Squirrel)](http://www.dreamxu.com/install-config-squirrel/)
- [Rime输入法—鼠须管(Squirrel)词库添加及配置](http://www.jianshu.com/p/cffc0ea094a7)

当然，可以直奔官网的说明：<http://github.com/rime/home/wiki>。

我用了两天，感觉很棒。我的皮肤设置（`squirrel.custom.yaml`）为：

```
# squirrel.custom.yaml
patch:
  # us_keyboard_layout: true         # 键盘选项：应用美式键盘布局
  # show_notifications_when: growl_is_running  # 狀態通知，默認裝有Growl時顯示，也可設爲全開（always）全關（never）
    style/color_scheme: demo         # 选择配色方案
    style/horizontal: true           # 候选窗横向显示
  # style/inline_preedit: false   # 关闭内嵌编码，这样就可以显示首行的拼音（MAC下不建议开启）
    style/corner_radius: 3           # 窗口圆角半径
    style/border_height: 4           # 窗口边界高度，大于圆角半径才有效果
    tyle/border_width: 4             # 窗口边界宽度，大于圆角半径才有效果
  # style/line_spacing: 1         # 候选词的行间距
  # style/spacing: 5              # 在非内嵌编码模式下，预编辑和候选词之间的间距
    style/font_face: "Lantinghei TC Extralight"  # 预选栏文字字体，使用中文字体：兰亭黑-纤黑
    style/font_point: 17             #预选栏文字字号
    style/label_font_face: "Myriad Pro Light"  # 预选栏编号字体，使用西文字体：Myriad Pro Light
    style/label_font_point: 17       #预选栏编号字号
     #上述是候选栏的基本设置，确定了文字的大小和候选栏的外观样式。
     #下面是“demo”样式文件的配置，主要确定候选栏颜色配置。
    preset_color_schemes:
    demo:        #样式名称，就是上述“style/color_scheme: demo”
    author: "Barret Lee <barret.china@gmail.com>"        #作者
    name: "小胡子哥"                      #作者名字
    label_color: 0xf2a45a                    #预选栏编号颜色
    back_color: 0x333333                    #背景颜色
    candidate_text_color: 0xb9b9b9          #非第一后选项文字颜色
    comment_text_color: 0xa5a5a5            #注解文字颜色
    hilited_candidate_back_color: 0x333333    #第一后选项背景颜色
    hilited_candidate_text_color: 0xff7d00    #第一后选项文字颜色
    hilited_comment_text_color: 0x00a5ea      #注解文字高亮
    hilited_text_color: 0x7fffff              #拼音串高亮（需要开启内嵌编码）
    text_color: 0xa5a5a5                      #拼音串颜色（需要开启内嵌编码）
```

效果是这样：

![Rime 配置效果](/blogimgs/2015/11/20/20151105_a9e4fc48.png)

好吧，希望你能玩的愉快。

P.S: 这篇文章我没有复查，应该没太多错别字 ；）
