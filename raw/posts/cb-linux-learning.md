---
title: Linux学习笔记（上次更新时间2013/07/28）
categories:
  - Linux
tags:
  - tech
  - cnblogs
warning: true
date: 2013-06-06 11:19:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/06/06/linux-learning.html" target="_blank">博客园</a>.</div>

<p>自从上次不小心把硬盘全部格式化之后，电脑里的几个系统，以及诸多配置都咔嚓了，没办法，又得从头来过。这个总结和记录了Linux学习过程中遇到的问题，以及电脑的配置等等，为下一次手贱做好准备。。。</p>
<p>P.S: 本次系统更换为 <span>unbuntu 13.04</span></p>
<h3>关于配置</h3>
<p><strong>1. 源</strong></p>
<p>软件中心 -》 编辑 -》软件源 -》</p>
<p>　　我一般是选择，163的源，速度还不错，听说最近我们学校也弄了一个源（<a href="http://mirrors.hustunique.com">http://mirrors.hustunique.com</a>），不知道写错没有，但是在系统中没有找到这个源，就将就着速度还不错的163源吧。</p>
<p>改完之后，更新一下源：</p>

```
sudo apt-get upgrade

```

<p>这个也不错（太长了，折叠）&nbsp;</p>

```

1、首先备份Ubuntu 11.04源列表

    sudo cp /etc/apt/sources.list /etc/apt/sources.list.backup （备份下当前的源列表，有备无患嘛）

    2、修改更新源
    sudo gedit /etc/apt/sources.list （打开Ubuntu 11.04源列表文件）

    3、将下面的代码粘贴进去（\#"开头的那一行为注释，可以直接复制进文件中）

 #台湾源

deb http://tw.archive.ubuntu.com/ubuntu/ natty main universe restricted multiverse 
deb-src http://tw.archive.ubuntu.com/ubuntu/ natty main universe restricted multiverse 
deb http://tw.archive.ubuntu.com/ubuntu/ natty-security universe main multiverse restricted 
deb-src http://tw.archive.ubuntu.com/ubuntu/ natty-security universe main multiverse restricted 
deb http://tw.archive.ubuntu.com/ubuntu/ natty-updates universe main multiverse restricted 
deb-src http://tw.archive.ubuntu.com/ubuntu/ natty-updates universe main multiverse restricted

#网易 Ubuntu 11.04 源（速度很快）

deb http://mirrors.163.com/ubuntu/ natty main universe restricted multiverse 
deb-src http://mirrors.163.com/ubuntu/ natty main universe restricted multiverse 
deb http://mirrors.163.com/ubuntu/ natty-security universe main multiverse restricted 
deb-src http://mirrors.163.com/ubuntu/ natty-security universe main multiverse restricted 
deb http://mirrors.163.com/ubuntu/ natty-updates universe main multiverse restricted 
deb http://mirrors.163.com/ubuntu/ natty-proposed universe main multiverse restricted 
deb-src http://mirrors.163.com/ubuntu/ natty-proposed universe main multiverse restricted 
deb http://mirrors.163.com/ubuntu/ natty-backports universe main multiverse restricted 
deb-src http://mirrors.163.com/ubuntu/ natty-backports universe main multiverse restricted 
deb-src http://mirrors.163.com/ubuntu/ natty-updates universe main multiverse restricted

 #骨头源，骨头源是bones7456架设的一个Ubuntu源 ，提供ubuntu,deepin

deb http://ubuntu.srt.cn/ubuntu/ natty main universe restricted multiverse 
deb-src http://ubuntu.srt.cn/ubuntu/ natty main universe restricted multiverse 
deb http://ubuntu.srt.cn/ubuntu/ natty-security universe main multiverse restricted 
deb-src http://ubuntu.srt.cn/ubuntu/ natty-security universe main multiverse restricted 
deb http://ubuntu.srt.cn/ubuntu/ natty-updates universe main multiverse restricted 
deb http://ubuntu.srt.cn/ubuntu/ natty-proposed universe main multiverse restricted 
deb-src http://ubuntu.srt.cn/ubuntu/ natty-proposed universe main multiverse restricted 
deb http://ubuntu.srt.cn/ubuntu/ natty-backports universe main multiverse restricted 
deb-src http://ubuntu.srt.cn/ubuntu/ natty-backports universe main multiverse restricted 
deb-src http://ubuntu.srt.cn/ubuntu/ natty-updates universe main multiverse restricted


#大家可以自己根据自己的版本设置一下，不一定局限于ubuntu 11.04，下面列出一些校内更新源。

#电子科技大学

deb http://ubuntu.uestc.edu.cn/ubuntu/ natty main restricted universe multiverse
deb http://ubuntu.uestc.edu.cn/ubuntu/ natty-backports main restricted universe multiverse
deb http://ubuntu.uestc.edu.cn/ubuntu/ natty-proposed main restricted universe multiverse
deb http://ubuntu.uestc.edu.cn/ubuntu/ natty-security main restricted universe multiverse
deb http://ubuntu.uestc.edu.cn/ubuntu/ natty-updates main restricted universe multiverse
deb-src http://ubuntu.uestc.edu.cn/ubuntu/ natty main restricted universe multiverse
deb-src http://ubuntu.uestc.edu.cn/ubuntu/ natty-backports main restricted universe multiverse
deb-src http://ubuntu.uestc.edu.cn/ubuntu/ natty-proposed main restricted universe multiverse
deb-src http://ubuntu.uestc.edu.cn/ubuntu/ natty-security main restricted universe multiverse
deb-src http://ubuntu.uestc.edu.cn/ubuntu/ natty-updates main restricted universe multiverse

#中国科技大学

deb http://debian.ustc.edu.cn/ubuntu/ natty main restricted universe multiverse
deb http://debian.ustc.edu.cn/ubuntu/ natty-backports restricted universe multiverse
deb http://debian.ustc.edu.cn/ubuntu/ natty-proposed main restricted universe multiverse
deb http://debian.ustc.edu.cn/ubuntu/ natty-security main restricted universe multiverse
deb http://debian.ustc.edu.cn/ubuntu/ natty-updates main restricted universe multiverse
deb-src http://debian.ustc.edu.cn/ubuntu/ natty main restricted universe multiverse
deb-src http://debian.ustc.edu.cn/ubuntu/ natty-backports main restricted universe multiverse
deb-src http://debian.ustc.edu.cn/ubuntu/ natty-proposed main restricted universe multiverse
deb-src http://debian.ustc.edu.cn/ubuntu/ natty-security main restricted universe multiverse
deb-src http://debian.ustc.edu.cn/ubuntu/ natty-updates main restricted universe multiverse

#北京理工大学

deb http://mirror.bjtu.edu.cn/ubuntu/ natty main multiverse restricted universe
deb http://mirror.bjtu.edu.cn/ubuntu/ natty-backports main multiverse restricted universe
deb http://mirror.bjtu.edu.cn/ubuntu/ natty-proposed main multiverse restricted universe
deb http://mirror.bjtu.edu.cn/ubuntu/ natty-security main multiverse restricted universe
deb http://mirror.bjtu.edu.cn/ubuntu/ natty-updates main multiverse restricted universe
deb-src http://mirror.bjtu.edu.cn/ubuntu/ natty main multiverse restricted universe
deb-src http://mirror.bjtu.edu.cn/ubuntu/ natty-backports main multiverse restricted universe
deb-src http://mirror.bjtu.edu.cn/ubuntu/ natty-proposed main multiverse restricted universe
deb-src http://mirror.bjtu.edu.cn/ubuntu/ natty-security main multiverse restricted universe
deb-src http://mirror.bjtu.edu.cn/ubuntu/ natty-updates main multiverse restricted universe

#兰州大学

deb ftp://mirror.lzu.edu.cn/ubuntu/ natty main multiverse restricted universe
deb ftp://mirror.lzu.edu.cn/ubuntu/ natty-backports main multiverse restricted universe
deb ftp://mirror.lzu.edu.cn/ubuntu/ natty-proposed main multiverse restricted universe
deb ftp://mirror.lzu.edu.cn/ubuntu/ natty-security main multiverse restricted universe
deb ftp://mirror.lzu.edu.cn/ubuntu/ natty-updates main multiverse restricted universe
deb ftp://mirror.lzu.edu.cn/ubuntu-cn/ natty main multiverse restricted universe

#上海交通大学

deb http://ftp.sjtu.edu.cn/ubuntu/ natty main multiverse restricted universe
deb http://ftp.sjtu.edu.cn/ubuntu/ natty-backports main multiverse restricted universe
deb http://ftp.sjtu.edu.cn/ubuntu/ natty-proposed main multiverse restricted universe
deb http://ftp.sjtu.edu.cn/ubuntu/ natty-security main multiverse restricted universe
deb http://ftp.sjtu.edu.cn/ubuntu/ natty-updates main multiverse restricted universe
deb http://ftp.sjtu.edu.cn/ubuntu-cn/ natty main multiverse restricted universe
deb-src http://ftp.sjtu.edu.cn/ubuntu/ natty main multiverse restricted universe
deb-src http://ftp.sjtu.edu.cn/ubuntu/ natty-backports main multiverse restricted universe
deb-src http://ftp.sjtu.edu.cn/ubuntu/ natty-proposed main multiverse restricted universe
deb-src http://ftp.sjtu.edu.cn/ubuntu/ natty-security main multiverse restricted universe
deb-src http://ftp.sjtu.edu.cn/ubuntu/ natty-updates main multiverse restricted universe

View Code 
```



<p><strong>&nbsp;2. 字体</strong></p>
<p>ubuntu自带的字体文泉字体，边缘很粗糙，不好看 ，我还是比较喜欢微软雅黑。</p>
<p>网上随便搜的一个，有兴趣的可以看看：</p>

```

用Ubuntu 系统自带的文泉字体  边缘太模糊  ，所以就上网找了一些更换字体的方法  。跟着做了半天都没成功，后来  发现有个人写了一篇日志  ，编译好了，只需要 按着输入命令就行了  ，下面把方法贴出来
http://www.idyj.net/blog/read.php?5

支持在Ubuntu8.10、Ubuntu9.04系统上自动安装微软雅黑、monaco-linux、lucida-console等字体。
而且可以设置LED、CRT两种不同的显示器的渲染效果，无需手工配置，实现自动化安装。
使用方法如下：
打开命令控制台，然后运行下面的脚本（可以通过复制下面的内容到命令控制台来执行脚本）：
wget -O get-fonts.sh.zip http://files.cnblogs.com/DengYangjun/get-fonts.sh.zip
unzip -o get-fonts.sh.zip 1>/dev/null
chmod a+x get-fonts.sh
./get-fonts.sh

删除下载的字体安装脚本文件：
rm get-fonts.sh get-fonts.sh.zip 2>/dev/null

注销生效

如果觉得不爽，想恢复以前的字体设置：
cd /etc/fonts/conf.avail
sudo mv 51-local.conf.old 51-local.conf 2>/dev/null
sudo mv 69-language-selector-zh-cn.conf.old 69-language-selector-zh-cn.conf 2>/dev/null
sudo rm -f -r /usr/share/fonts/truetype/myfonts 2>/dev/null
cd -

修正记录：
#1.添加了最新的Windows 7的微软雅黑字体。（附件大小限制，未实现）
2.修正了CRT渲染的配置文件的链接错误。
3.添加字体：Agency FB
4.添加字体设置恢复功能。

附注：所有字体文件和安装脚本都通过网络下载，安装速度快慢由你的网络状况决定。

View Code 
```



<p><strong>3. 输入法</strong></p>
<p>这里为什么要说打字法。相比linux使用者都有一个很大的感触，智能提示太弱，一个原因是没有足够的本地词库，但如果词库加的太多会导致索引速度很慢，显得很卡。</p>
<p>如果你是在网页中打字的话，我建议你使用<strong>搜狗云输入法</strong>或者<strong>QQ云输入法，</strong>很赞哦~</p>
<p>在这里强调输入法的另外一个原因是，wineQQ和ibus输入法有一些兼容性问题，所以，可能你需要另外安装一个输入法。曾经我用的是谷歌输入法，还是不太好用。</p>


<p><strong>4. 翻围墙</strong></p>
<p>经常跟google打交道，所以用他的东西也是理所当然的啦，<a title="百度goagent" href="http://www.baidu.com/s?wd=goagent" target="_blank"><span>goAgent</span></a>，网上搜搜这个关键词吧，你肯定行的，步骤有些繁琐，但是一旦弄好了，你一定会爽到爆的！！！</p>
<p>多说几句，goAgent的包里面已经包含了&nbsp;SwitchySharp的配置文件，<span>/local/SwitchyOptions.bak</span></p>
<p>弄玩之后记得把证书导入进入，否则你会很蛋疼的～ 证书位置：<span> /local/CA.crt</span></p>
<p>&nbsp;好吧，你不要告诉我，你全部弄好了，但是你不会运行。。</p>

```
python ./path/local/proxy.py

```

<p>为了方便下次使用，写个文件放到桌面，下次双击打开就好。</p>

```
cd ~/desktop
vim proxy.sh

//写入
python ./path/local/proxy.py

//存盘
:wq

```



<p><strong>5. 备份</strong></p>


<p><strong>6. 右键打开终端</strong></p>
<p>1）方法一：</p>

```
sudo apt-get install nautilus-open-terminal

```

<p>上面的方法比较直接，安装一个软件辅助就行，但是安装好了之后，需要注销之后才生效，应该可以在命令行里敲个什么代码，刷新当前状态之类的，这个我不是很清楚。</p>
<p>2）方法二：</p>

```
cd ~/.gnome2/nautilus-scriptssudo gedit open-terminal //此处可以任意命名

```

<p>将下面代码拷贝进去，ctrl + s保存。</p>

```

#!/bin/bash
#
# This script opens a gnome-terminal in the directory you select.
#
# Distributed under the terms of GNU GPL version 2 or later
#
# Install in ~/.gnome2/nautilus-scripts or ~/Nautilus/scripts
# You need to be running Nautilus 1.0.3+ to use scripts.

# When a directory is selected, go there. Otherwise go to current
# directory. If more than one directory is selected, show error.
if [ -n "$NAUTILUS_SCRIPT_SELECTED_FILE_PATHS" ]; then
set $NAUTILUS_SCRIPT_SELECTED_FILE_PATHS
if [ $# -eq 1 ]; then
destination="$1"
# Go to file's directory if it's a file
if [ ! -d "$destination" ]; then
destination="`dirname "$destination"`"
fi
else
zenity --error --title="Error - Open terminal here" \
--text="You can only select one directory."
exit 1
fi
else
destination="`echo "$NAUTILUS_SCRIPT_CURRENT_URI" | sed 's/^file:\/\///'`"
fi

# It's only possible to go to local directories
if [ -n "`echo "$destination" | grep '^[a-zA-Z0-9]\+:'`" ]; then
zenity --error --title="Error - Open terminal here" \
--text="Only local directories can be used."
exit 1
fi

cd "$destination"
exec x-terminal-emulator

右键菜单代码
```

<p>然后修改下这段代码的权限</p>

```
chmod +x  ./open-terminal

```



<p><strong>7. 开机自启</strong></p>
<p>联网什么的最麻烦里，就希望一劳永逸，配置一次，以后不管里。</p>

```
sudo gedit /etc/rc.local

```


```
//然后开始你的胡作非为
mentohust //我们学校最近好像禁用里mentohust，颇为蛋疼

//于是就只能用锐捷了
./path/rujie.sh -uusername -ppassword -neth0 - sinternet -d0 -S1<start sofeware-name

```

<p>在打开的文件中添加命令就行。</p>




<h3>关于软件</h3>
<p><strong>1. 浏览器</strong></p>
<p>我比较喜欢用的是chrome，在liunx下叫做<strong>chromium</strong>，这个东西和google帐号绑定，很多东西转移电脑也能够直接拿到。</p>
<p>我不知道chrome在发什么神经，安装好了之后，不停的刷新google首页，键入任何页面都自动reload到google首页。不能忍了！！！！　　</p>
<p>刚把chrome卸载，却有发现了解决方案，我次奥！！！所以说，遇到问题还是先到网上搜搜，没准儿能解决！</p>
<p>上面问题<strong>解决方案</strong>：</p>
<blockquote>
<p>a. 针对13.04版本下Chromium不断刷新网页问题，你在浏览器设置里面<strong>禁用掉"启用即搜即得\</strong>即可完美解决</p>
<p>b. 把网络关掉（自然就不能一直刷新了：），然后打开设置，点开自己的账户，把搜索里的即使搜索关掉就没事了。</p>
</blockquote>
<p>推荐几款chrome下开发工具：</p>
<p>　　1）<span> xmarks 从windows到linux</span>，很多收藏的网址就靠这个同步啦～</p>
<p>　　2） <span>coloZilla</span>，一款与firefox的rainbow类似的颜色吸取工具，搞前端必备啊！</p>
<p>　　3）&nbsp;<span><span>SwitchySharp</span>， 翻墙靠你了！！！</span></p>
<p><span>　　4）<span>&nbsp;</span><span><span>Quick Note</span>， 轻松作笔记</span></span></p>
<p><span><span>　　5）&nbsp;<span><span>Mobile Tester</span>， 当你弄移动端开发的时候，他可以被成为神器。</span></span></span></p>
<p><span><span><span>　　6） <span><span>FVD Video Downloader</span>，</span>&nbsp;神马？网页视频音频弄不下来，这个家伙帮你下载！</span></span></span></p>


<p><strong>2. 编辑器</strong></p>
<p>　　1）<span> Vim</span>， &nbsp;看一些朋友，这软件那真是玩的出神入化啊，他们不是在打字，是在高频弹指啊，尼玛，太快鸟！！！着玩意儿要多配置几个插件~</p>
<p>　　2）<span> Emacs</span>， 这个也很不错，不过我没用过，下次尝试着用它吧～</p>
<p>　　3） &nbsp;<span>Qt</span>， 搞C/C++开发的同学，推荐你用这家伙，集成度高，很给力。</p>
<p>　　4） <span>sublime text</span>， 个人最喜欢的一款软件，相当喜欢的说！！！无论是windows环境还是linux环境，都大爱sublime，现在都版本3了吧～</p>
<p>　　　　<a href="http://www.tuicool.com/topics/10100104">http://www.tuicool.com/topics/10100104</a></p>


<p><strong>3. 图形处理工具</strong></p>
<p><span>GIMP</span>，你懂的。等同于windows下的ps，当然界面略丑陋。</p>


<p><strong>4. QQ</strong></p>
<p>&nbsp;<span>wineQQ</span> ，现在版本是2012 beta3版，还行。（兼容性不好）</p>
<p><strong>P.S:</strong> <a href="http://www.cnblogs.com/hustskyking/archive/2013/06/06/linux-learning.html#2702894">@LovelyOu&nbsp;</a>说pidgin-lwqq不错，当然如果你对聊天界面没啥要求的话，这个也是个不错的插件~ 只是截图比较麻烦。</p>
<p>安装方式：</p>

```
sudo add-apt-repository ppa:lainme/pidgin-lwqq sudo apt-get update sudo apt-get install libpurple0 pidgin-lwqq

```

<p><span>&nbsp;</span></p>
<p><strong>5. 影音</strong></p>
<p>&nbsp;<span>VLC media player</span>，这玩意儿不错，但是有两个烦人的点，<span>一是，中文乱码，二是，没有字幕</span>。（下次说解决方案）</p>


<p><strong>6. 截屏</strong></p>
<p>通常我用的是<span>shutter</span>，截图功能比较强大。</p>


<p><strong>7. Flashplayer</strong></p>
<p>这个在软件中心顺便弄上，chrome看视频，省得麻烦。</p>


<h3>一些问题</h3>
<p><strong>1. 多个软件同时安装</strong></p>
<blockquote>
<p>E: 无法获得锁 /var/lib/dpkg/lock - open (11: 资源暂时不可用)E: 无法锁定管理目录(/var/lib/dpkg/)，是否有其他进程正占用它？</p>

</blockquote>
<p>&nbsp;比如你的软件中心在安装软件或者更新源，结果你又在命令行里键入sudo apt-get install vim 之类的命令，此时系统是不会响应你的请求的，于是就有了上面这样的报错。</p>


<p><strong>2. 权限问题</strong></p>
<p>&nbsp;有的童鞋在网上搜罗里一些软件，结果安装的时候，发现出问题里，安装不了？不要着急，很多情况都是因为权限问题。</p>

```
chmod +x /path/filename //+x的意思就是让他可以运行
//权限这一块不懂的可以去网速看看，这里不赘述。

```



<p><strong>3.ubuntu-E:Encountered a section with no Package: header的解决办法</strong></p>

```
终端中输入以下两条命令：
sudo rm /var/lib/apt/lists/* -vf
sudo apt-get update
执行完了命令之后，软件更新器应该会自动要求更新的，搞定。

```



<h3>github</h3>
<p>网上看了不少文章，觉得这两篇还算不错。</p>
<p>配置：<a href="http://blog.csdn.net/lalor/article/details/7830895">http://blog.csdn.net/lalor/article/details/7830895</a></p>
<p>使用：<a href="http://blog.csdn.net/wfdtxz/article/details/7973608">http://blog.csdn.net/wfdtxz/article/details/7973608</a></p>
<p>推荐：<a href="http://my.oschina.net/shipley/blog/98477" target="_blank">http://my.oschina.net/shipley/blog/98477</a></p>






<h3>前端这一块</h3>
<p><strong>1. wamp环境配置，应该是lamp</strong>，呵呵。<a title="ubuntu下安装Apache+PHP+Mysql" href="http://www.cnblogs.com/hustskyking/articles/apache-php-mysql.html" target="_blank">戳我</a></p>
<p>转载的文章，感觉比较不错，放在自己家里。</p>


<p><strong>2. nodeJS</strong></p>

```
sudo apt-get install nodejs
sudo apt-get install npm

```

<p>比较不喜欢找源码，然后这样做</p>

```
./configure
make
sudo make install

```

<p>apt-get真心方便~</p>
<p>然后尽兴添加你想要的组建</p>

```
npm install express

```

<p>当然，安装好了之后测试下</p>

```
nodejs --version

```

<p>有输出说明是正确的。下面给一串代码，让乃测试</p>

```

var http = require("http");
function onRequest(request, response) {
    console.log("Request received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}
http.createServer(onRequest).listen(8888);
console.log("Server has started.");

 测试代码
```



<p><span>&nbsp;</span></p>
<h3>笔者感言</h3>
<p><strong>1.</strong> 建议新手还是玩<strong>稳定版本</strong>，10.04&nbsp; 12.04这些算是经典版本了。</p>






<p><span><em>以上基本都是没有补充完善，先把几个记得比较清楚的点列出来，下次有时间，慢慢说～</em></span></p>



