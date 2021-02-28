---
title: Wordpress 本地调试
warning: true
categories:
  - 网络交互
tags:
  - Wordpress
date: 2017-05-01 23:25:00
description: 最近准备把博客迁移到 Wordpress 上，在主机上部署好了 Wordpress 后，遇到了一个头疼的问题，我期望将线上的环境同步一份到本地，本地代码与服务器保持同步，本地修改后可以及时预览。
---


最近准备把博客迁移到 Wordpress 上，在主机上部署好了 Wordpress 后，遇到了一个头疼的问题，我期望将线上的环境同步一份到本地，本地代码与服务器保持同步，本地修改后可以及时预览。

<!--more-->

看起来是个很简单的需求，但遇到了两个问题，下面说的比较详细，供小白参考。

### 资源引用

Wordpress 在设置完站点 URL 和主页 URL 后，所有的资源引用都指向线上地址，比如我线上地址是 `112.18.3.7:3333`，进入后台管理页，会直接跳转到 `http://112.18.3.7:3333/wp-admin/`，根本不会进入我本地的 `http://localhost:8888/wp-admin`，原因很简单，WP 会从数据库读取这些配置信息，可以将 `/wp-includes/option.php` 中的 `get_option` 函数做一下修改：

```php
function get_option( $option, $default = false ) {

  $BLOG_DEBUG = $_COOKIE["blog_debug"];　
  
  if ( $BLOG_DEBUG && preg_match("/^https?:\/\/[\w-_.:]+$/", $BLOG_DEBUG)
    && ($option == 'siteurl' || $option == 'home') ) {
    return $BLOG_DEBUG;
  }

  // ...
}
```

上面代码的意思是，如果访问站点时，找到了名叫 `blog_debug` 的 cookie，则将数据库取出来的 `siteurl` 和 `home` 两个值提换成 `blog_debug` 对一个的 cookie。那么，我们只需要在本地打开的 `http://localhost:8888/` 页面中写上：

```javascript
document.cookie = 'blog_debug=http://localhost:8888';
```

如上，就可以完成本地调试了。

### 远程访问数据库

Linux 上安装数据库，默认只允许在 `127.0.0.1` 下访问，外部是访问不了的，比如通过 `112.18.3.7:3306`，设置比较简单：

```bash
# vim /etc/mysql/mysql.conf.d/mysqld.cnf
# 注释下面这行
# binding-adress = 127.0.0.1
```

然后重启 mysql 就好了：

```bash
sudo /etc/init.d/mysql restart
```

当然，记得把 `wp-config.php` 中的 Mysql 主机地址修改下：

```php
define('DB_HOST', '112.18.3.7');
```

### 小结

使用 hexo 构建和 Github pages 部署博客有快两年时间了，博客文件多了之后，构建效率特别低，也不方便修改错别字。得尽快把博客迁移到服务器上~

P.S. 本地和服务器的代码同步，我使用的是 VSCode 的一个插件（ftp-sync）。