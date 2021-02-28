---
title: ubuntu下安装Apache+PHP+Mysql
categories:
  - 后端杂烩
tags:
  - tech
  - cnblogs
warning: true
date: 2013-06-08 01:41:00
---

<div class="history-article">本文为归档内容,原始地址在 <a href="http://www.cnblogs.com/hustskyking/archive/2013/06/08/apache-php-mysql.html" target="_blank">博客园</a>.</div>

<p><span>通过Apache我们可以学习php网络编程，可以用它来部署自己本地的wordpress博客，从而进一步通过网络和朋友交流。从此，你将深刻体会到网络带个我们的神奇力量，至少我是这样觉得的～～</span></p>
<p><span>步骤一，安装apache2</span></p>

```
sudo apt-get install apache2

```

<p><span>安装完成。&nbsp;</span></p>
<p>运行如下命令重启下：</p>

```
sudo /etc/init.d/apache2 restart

```

<p><span>在浏览器里输入http://localhost或者是http://127.0.0.1，如果看到了It works!，那就说明Apache就成功的安装了，Apache的默认安装，会在/var下建立一个名为www的目录，这个就是Web目录了，所有要能过浏览器访问的Web文件都要放到这个目录里。</span></p>
<p><span>步骤二 ，安装php:</span></p>

```
sudo apt-get install libapache2-mod-php5 php5

```

<p>此外，建议安装扩展php5-gd php5-mysql，安装方式同上.</p>
<p>安装完后，我们要重新启动Apache，让它加载PHP模块：</p>

```
sudo /etc/init.d/apache2 restart

```

<p><span>接下来，我们就在Web目录下面新建一个test.php文件来测试PHP是否能正常的运行，命令：</span></p>
<div>
<div id="highlighter_322963" class="syntaxhighlighter  cpp">
<div class="toolbar">

```
sudo gedit /var/www/test.php

```

<p><span>然后输入:</span></p>

```
<?php
    echo"hello,world!!";
?>

```

<p>&nbsp;<span>接着保存文件,在浏览器里输入http://127.0.0.1/test.php，如果在网页中显示hello,world!!，那就说明PHP已经正常运行了。</span></p>
</div>
</div>
</div>
<p><span>步骤三,安装mysql数据库:</span></p>

```
sudo apt-get install mysql-server mysql-client

```

<p>&nbsp;<span>apt-get程序会自动下载安装最新的mysql版本。在安装的最后，它会要求里输入root的密码，注意，这里的root密码可不是Ubuntu的root密码啊，是你要给MySQL设定的root密码。</span></p>
<p><span>步骤四,安装phpmyadmin-Mysql数据库管理</span></p>

```
sudo apt-get install phpmyadmin

```

<p><span>phpmyadmin设置：</span></p>
<p>在安装过程中会要求选择Web server：apache2或lighttpd，使用空格键选定apache2，按tab键然后确定。然后会要求输入设置的Mysql数据库密码连接密码Password of the database"s administrative user。</p>
<p>然后将phpmyadmin与apache2建立连接，以我的为例：www目录在/var/www，phpmyadmin在/usr/share /phpmyadmin目录，所以就用命令：</p>

```
sudo ln -s /usr/share/phpmyadmin /var/www

```

<p><span>建立链接。</span></p>
<p>phpmyadmin测试：在浏览器地址栏中打开http://localhost/phpmyadmin。</p>
<p>以上ALMP的基本组件就安装完毕了，下面我们再来看一些其他的设置：</p>
<p><span>步骤五，设置Ubuntu文件执行读写权限</span></p>
<p>LAMP组建安装好之后，PHP网络服务器根目录默认设置是在：/var/www。由于Linux系统的安全性原则，改目录下的文件读写权限是只允许root用户操作的，所以我们不能在www文件夹中新建php文件，也不能修改和删除，必须要先修改/var/www目录的读写权限。在界面管理器中通过右键属性不能修改文件权限，得执行root终端命令：</p>

```
sudo chmod 777 /var/www

```

<p><span>然后就可以写入html或php文件了。777是linux中的最高权限，表示可读，可写，可执行。</span></p>
<div>
<div id="highlighter_37055" class="syntaxhighlighter  cpp">
<div class="toolbar">


<p><span>转载自：<a title="http://www.comflag.com/2011/05/01/apache-web.htm" href="http://www.comflag.com/2011/05/01/apache-web.htm">http://www.comflag.com/2011/05/01/apache-web.htm</a></span></p>




</div>
</div>
</div>