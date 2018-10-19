---
title: 细说 CA 和证书
description: 看了不少文章，对 CA 和证书相关的知识做了一些总结，可能不全面，也可能存在表述错误或者知识性错误，欢迎拍砖！
warning: true
categories:
  - 网络交互
  - 网络安全
tags:
  - Catificate Authority
date: 2016-04-24 00:56:47
---

CA，Catificate Authority，它的作用就是提供证书（即服务器证书，由域名、公司信息、序列号和签名信息组成）加强服务端和客户端之间信息交互的安全性，以及证书运维相关服务。任何个体/组织都可以扮演 CA 的角色，只不过难以得到客户端的信任，能够受浏览器默认信任的 CA 大厂商有很多，其中 TOP5 是 Symantec、Comodo、Godaddy、GolbalSign 和 Digicert。

<!--more-->

### 服务器证书分类

可以通过两个维度来分类，一个是商业角度，一个是业务角度。

<style>.cert-eg th,.cert-eg td {text-align:center;}.cert-eg .align-left{text-align:left;}.cert-eg br{display: block;}</style>
<table class='cert-eg'>
  <tr>
    <th></th>
    <th>单域名</th>
    <th>多域名</th>
    <th>泛域名</th>
    <th>多泛域名</th>
  </tr>
  <tr>
    <th>DV</th>
    <td colspan="2">支持</td>
    <td colspan="2">不支持</td>
  </tr>
  <tr>
    <th>OV</th>
    <td colspan="4">支持</td>
  </tr>
  <tr>
    <th>EV</th>
    <td colspan="2">支持</td>
    <td colspan="2">不支持</td>
  </tr>
  <tr>
    <th>举例</th>
    <td>www.barretlee.com</td>
    <td class="align-left">www.barretlee.com<br>www.xiaohuzige.com<br>www.barret.cc</td>
    <td>\*.barretlee.com</td>
    <td class="align-left">\*.barretlee.com<br>\*.xiaohuzige.com<br>\*.barret.cc</td>
  </tr>
</table>

__需要强调的是，不论是 DV、OV 还是 EV 证书，其加密效果都是一样的！__ 它们的区别在于：

- DV（Domain Validation），面向个体用户，安全体系相对较弱，验证方式就是向 whois 信息中的邮箱发送邮件，按照邮件内容进行验证即可通过；
- OV（Organization Validation），面向企业用户，证书在 DV 证书验证的基础上，还需要公司的授权，CA 通过拨打信息库中公司的电话来确认；
- EV（Extended Validation），打开 Github 的网页，你会看到 URL 地址栏展示了注册公司的信息，这会让用户产生更大的信任，这类证书的申请除了以上两个确认外，还需要公司提供金融机构的开户许可证，要求十分严格。

OV 和 EV 证书相当昂贵，使用方可以为这些颁发出来的证书买保险，一旦 CA 提供的证书出现问题，一张证书的赔偿金可以达到 100w 刀以上。

### CA 的作用

前文 [HTTPS证书生成原理和部署细节](http://www.barretlee.com/blog/2015/10/05/how-to-build-a-https-server/) 提到如果本地生成公/私钥对和对应未签证的证书，如果使用的证书没有签证，或者未在浏览器受信的 CA 签证，你会看到下图的问题：

![net:ERR_CERT_AUTHORITY_INVALID](/blogimgs/2016/04/24/6c0378f8gw1f36o0231kaj20fh0dd0ti.jpg)<!--<source src="//ww1.sinaimg.cn/large/6c0378f8gw1f36o0231kaj20fh0dd0ti.jpg">-->

上图出现的错误是 `net:ERR_CERT_AUTHORITY_INVALID`，我们生成证书和公/私钥对的流程都是正确的，但是浏览器不认这张证书，并且提示证书授权不通过；如果通过其他与 Common Name 不同的域名去访问，如我注册的时候使用的 `localhost`，但是访问的时候用的 `127.0.0.1`，还会报出这样的错误：

![net:ERR_CERT_COMMON_NAME_INVALID](/blogimgs/2016/04/24/6c0378f8gw1f36o3s81yfj20lk0dw75v.jpg)<!--<source src="//ww1.sinaimg.cn/large/6c0378f8gw1f36o3s81yfj20lk0dw75v.jpg">-->

错误码为 `net:ERR_CERT_COMMON_NAME_INVALID`，意思是 Common Name 不匹配，具体校验流程可以在浏览器的 DevTools 中看到：

![DevTools](/blogimgs/2016/04/24/6c0378f8gw1f36o5lmwxdj20og0cmdhb.jpg)<!--<source src="//ww1.sinaimg.cn/large/6c0378f8gw1f36o5lmwxdj20og0cmdhb.jpg">-->

从上面几张图，可以大致了解 CA 和证书会做哪些事情，证书由域名、公司信息、序列号和签名信息组成，当我们通过 HTTPS 访问页面时，浏览器会主动验证证书信息是否匹配，也会验证证书是否有效。

CA 有权给所有的域名签发证书，如它可以私自给我的网站签发一张 `www.barretlee.com` 的证书，并且可以拿着新证书拦截网页流量（当然，前提是这个 CA 是浏览器认证的权威 CA），那我的网站可能就很不安全了，对拥新证书的人来说，我的网站等同于在 HTTP 下进行通讯。

### 评估 CA 供应商

CA 供应商很多，提供服务的侧重点可能也存在一些差异，比如很多 CA 都没有提供证书吊销的服务，这一点对于安全性要求很高的企业来说是完全不能接受的，那么对 CA 供应商的评估需要注意写什么呢？

__1. 内置根__

所谓内置根，就是 CA 的根证书内置到各种通用的系统/浏览器中，只有根证书的兼容性够强，它所能覆盖的浏览器才会越多。

__2. 安全体系__

两个指标可以判断 CA 供应商是否靠谱，一是看价格，价格高自然有它的理由，必然提供了全套的安全保障体系；二是看黑历史，该 CA 供应商有没有爆出过什么漏洞，比如之前的 DigiNotar，被伊朗入侵，签发了 500 多张未授权的证书，结果直接被各系统/浏览器将其根拉入黑名单，毫无疑问公司直接倒闭。

__3. 核心功能和扩展功能__

这就需要从业务上考虑了，不同的规模的企业、不同的业务对证书的要求不一样，比如证书是否会考虑无 SNI 支持的浏览器问题，是否支持在 reissue 的时候添加域名，是否支持 CAA，是否支持短周期证书等等。

__4. 价格__

企业完全没必要购买 Github 那样的 EV 证书，太昂贵，而且一般的企业也未必能够申请到这样的证书。供应商很大，价格可以好好评估下，不一定要最贵，最适合的就行。

### 自建 Root CA


OpenSSL 是一个免费开源的库，它提供了构建数字证书的命令行工具，其中一些可以用来自建 Root CA。

很多网站都希望用户知道他们建立的网络通道是安全的，所以会想 CA 机构购买证书来验证 domain，所以我们也可以在很多 HTTPS 的网页地址栏看到一把小绿锁。

然而在一些情况下，我们没必要去 CA 机构购买证书，比如在内网的测试环境中，为了验证 HTTPS 下的一些问题，我们不需要部署昂贵的证书，这个时候自建 Root CA，给自己颁发证书就显得很有价值了。

本节内容较多，主要是代码演示生成证书和验证的过程，可以跳过看下一节，直接看 [这里](//github.com/barretlee/autocreate-ca/README.md)：

- `git clone //github.com/barretlee/autocreate-ca.git`
- 依次执行 `install-rootCA.sh`、`install-intermediateCA.sh` 和 `install-websiteConfig.sh`

首先找到一个放置证书的文件夹，比如 `/root/ca` 下，下方的测试也在改目录下，如果你要更换其他目录，记得替换下文中的目录地址。

#### 创建 root pair

扮演 CA 角色，就意味着要管理大量的 pair 对，而原始的一对 pair 对叫做 root pair，它包含了 root key（`ca.key.pen`）和 root certificate（`ca.cert.pem`）。通常情况下，root CA 不会直接为服务器或者客户端签证，它们会先为自己生成几个中间 CA（intermediate CAs），这几个中间 CA 作为 root CA 的代表为服务器和客户端签证。

__注意：一定要在绝对安全的环境下创建 root pair，可以断开网络、拔掉网线和网卡，当然，如果是测试玩一玩就不用这么认真了。__

设定文件夹结构，并且配置好 openssl 设置：

```bash
$ cd /root/ca
$ mkdir certs crl newcerts private
$ chmod 700 private
$ touch index.txt
$ echo 1000 > serial
$ wget -O /root/ca/openssl.cnf \ 
    //raw.githubusercontent.com/barretlee/autocreate-ca/master/cnf/root-ca
```

创建 root key，密码可为空，设定权限为只可读：

```bash
$ cd /root/ca
$ openssl genrsa -aes256 -out private/ca.key.pem 4096

Enter pass phrase for ca.key.pem: secretpassword
Verifying - Enter pass phrase for ca.key.pem: secretpassword

$ chmod 400 private/ca.key.pem
```

创建 root cert，权限设置为可读：

```bash
$ cd /root/ca
$ openssl req -config openssl.cnf \
      -key private/ca.key.pem \
      -new -x509 -days 7300 -sha256 -extensions v3_ca \
      -out certs/ca.cert.pem

Enter pass phrase for ca.key.pem: secretpassword
You are about to be asked to enter information that will be incorporated
into your certificate request.
-----
Country Name (2 letter code) [XX]:CN
State or Province Name []:Zhejiang
Locality Name []:
Organization Name []:Barret Lee
Organizational Unit Name []:Barret Lee Certificate Authority
Common Name []:Barret Lee Root CA
Email Address []:

$ chmod 444 certs/ca.cert.pem
```

验证证书：

```bash
$ openssl x509 -noout -text -in certs/ca.cert.pem
```

正确的输出应该是这样的：

```
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            87:e8:c0:a0:4b:e2:12:5d
        Signature Algorithm: sha256WithRSAEncryption
        Issuer: C=CN, ST=Zhejiang, O=Barret Lee, OU=Barret Lee Certificate Authority, CN=Barret Lee Root CA
        Validity
            Not Before: Apr 23 05:46:36 2016 GMT
            Not After : Apr 18 05:46:36 2036 GMT
        Subject: C=CN, ST=Zhejiang, O=Barret Lee, OU=Barret Lee Certificate Authority, CN=Barret Lee Root CA
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
            RSA Public Key: (4096 bit)
                Modulus (4096 bit):
                    // ...
                Exponent: 65537 (0x10001)
        X509v3 extensions:
            X509v3 Subject Key Identifier:
                E5:2D:B8:2B:DC:88:FE:CE:DA:93:D8:6F:2E:74:04:D2:39:E7:C8:03
            X509v3 Authority Key Identifier:
                keyid:E5:2D:B8:2B:DC:88:FE:CE:DA:93:D8:6F:2E:74:04:D2:39:E7:C8:03

            X509v3 Basic Constraints: critical
                CA:TRUE
            X509v3 Key Usage: critical
                Digital Signature, Certificate Sign, CRL Sign
    Signature Algorithm: sha256WithRSAEncryption
        // ...
```

包含：

- 数字签名（Signature Algorithm）
- 有效时间（Validity）
- 主体（Issuer）
- 公钥（Public Key）
- X509v3 扩展，openssl config 中配置了 v3_ca，所以会生成此项

#### 创建 intermediate pair

目前我们已经拥有了 Root Pair，事实上已经可以用于证书的发放了，但是由于根证书很干净，特别容易被污染，所以我们需要创建中间 pair 作为 root pair 的代理，生成过程同上，只是细节略微不一样。

生成目录结构和 openssl 的配置，这里的配置是针对 intermediate pair 的：

```bash
$ mkdir /root/ca/intermediate
$ cd /root/ca/intermediate
$ mkdir certs crl csr newcerts private
$ chmod 700 private
$ touch index.txt
$ echo 1000 > serial
$ echo 1000 > /root/ca/intermediate/crlnumber
$ wget -O /root/ca/openssl.cnf \
    //raw.githubusercontent.com/barretlee/autocreate-ca/master/cnf/intermediate-ca
```

创建 intermediate key，密码可为空，设定权限为只可读：

```bash
$ cd /root/ca
$ openssl genrsa -aes256 \
      -out intermediate/private/intermediate.key.pem 4096

Enter pass phrase for intermediate.key.pem: secretpassword
Verifying - Enter pass phrase for intermediate.key.pem: secretpassword

$ chmod 400 intermediate/private/intermediate.key.pem
```

创建 intermediate cert，设定权限为只可读，这里需要特别注意的一点是 __Common Name 不要与 root pair 的一样__ ：

```bash
$ cd /root/ca
$ openssl req -config intermediate/openssl.cnf -new -sha256 \
      -key intermediate/private/intermediate.key.pem \
      -out intermediate/csr/intermediate.csr.pem

Enter pass phrase for intermediate.key.pem: secretpassword
You are about to be asked to enter information that will be incorporated
into your certificate request.
-----
Country Name (2 letter code) [XX]:CN
State or Province Name []:Zhejiang
Locality Name []:
Organization Name []:Barret Lee
Organizational Unit Name []:Barret Lee Certificate Authority
Common Name []:Barret Lee Intermediate CA
Email Address []:
```

使用 `v3_intermediate_ca` 扩展签名，密码可为空，中间 pair 的有效时间一定要为 root pair 的子集：

```bash
$ cd /root/ca
$ openssl ca -config openssl.cnf -extensions v3_intermediate_ca \
      -days 3650 -notext -md sha256 \
      -in intermediate/csr/intermediate.csr.pem \
      -out intermediate/certs/intermediate.cert.pem

Enter pass phrase for ca.key.pem: secretpassword
Sign the certificate? [y/n]: y

$ chmod 444 intermediate/certs/intermediate.cert.pem
```

此时 root 的 `index.txt` 中将会多出这么一条记录：

```bash
V 260421055318Z   1000  unknown .../CN=Barret Lee Intermediate CA
```

验证中间 pair 的正确性：

```bash
$ openssl x509 -noout -text \
      -in intermediate/certs/intermediate.cert.pem
$ openssl verify -CAfile certs/ca.cert.pem \
      intermediate/certs/intermediate.cert.pem

intermediate.cert.pem: OK
```

浏览器在验证中间证书的时候，同时也会去验证它的上一级证书是否靠谱，创建证书链，将 root cert 和 intermediate cert 合并到一起，可以让浏览器一并验证：

```bash
$ cat intermediate/certs/intermediate.cert.pem \
      certs/ca.cert.pem > intermediate/certs/ca-chain.cert.pem
$ chmod 444 intermediate/certs/ca-chain.cert.pem
```

#### 创建服务器/客户端证书

终于到了这一步，生成我们服务器上需要部署的内容，上面已经解释了为啥需要创建中间证书。root pair 和 intermediate pair 使用的都是 4096 位的加密方式，一般情况下服务器/客户端证书的过期时间为一年，所以可以安全地使用 2048 位的加密方式。

```bash
$ cd /root/ca
$ openssl genrsa -aes256 \
      -out intermediate/private/www.barretlee.com.key.pem 2048
$ chmod 400 intermediate/private/www.barretlee.com.key.pem
```

创建 `www.barretlee.com` 的证书：

```bash
$ cd /root/ca
$ openssl req -config intermediate/openssl.cnf \
      -key intermediate/private/www.barretlee.com.key.pem \
      -new -sha256 -out intermediate/csr/www.barretlee.com.csr.pem

Enter pass phrase for www.barretlee.com.key.pem: secretpassword
You are about to be asked to enter information that will be incorporated
into your certificate request.
-----
Country Name (2 letter code) [XX]:CN
State or Province Name []:Zhejiang
Locality Name []:Hangzhou
Organization Name []:Barret Lee
Organizational Unit Name []:Barret Lee's Personal Website
Common Name []:www.barretlee.com
Email Address []:barret.china@gmail.com
```

使用 intermediate pair 签证上面证书：

```bash
$ cd /root/ca
$ openssl ca -config intermediate/openssl.cnf \
      -extensions server_cert -days 375 -notext -md sha256 \
      -in intermediate/csr/www.barretlee.com.csr.pem \
      -out intermediate/certs/www.barretlee.com.cert.pem
$ chmod 444 intermediate/certs/www.barretlee.com.cert.pem
```

可以看到 `/root/ca/intermediate/index.txt` 中多了一条记录：

```bash
V 170503055941Z   1000  unknown .../emailAddress=barret.china@gmail.com
```

验证证书：

```bash
$ openssl x509 -noout -text \
      -in intermediate/certs/www.barretlee.com.cert.pem
$ openssl verify -CAfile intermediate/certs/ca-chain.cert.pem \
      intermediate/certs/www.barretlee.com.cert.pem

www.barretlee.com.cert.pem: OK      
```

此时我们已经拿到了几个用于部署的文件：

- `ca-chain.cert.pem`
- `www.barretlee.com.key.pem`
- `www.barretlee.com.cert.pem`

### 添加信任 CA 和证书的调试

双击 `/root/ca/intermediate/certs/ca-chain.cert.pem` 将证书安装到系统中，目的是让本机信任这个 CA，将其当作一个权威 CA，安装 `root pem` 或者 `intermediate chain pem` 都是可以的，它们都具备验证能力。如果不执行这一步，浏览器依然会提示 `net:ERR_CERT_AUTHORITY_INVALID`。

上面申请测试证书时，我设置的 Common Name 为 `www.barretlee.com`，由于不在线上机器测试，可以将其添加到 hosts：

```
127.0.0.1 www.barretlee.com
```

执行下方测试代码：

```javascript
// https-server.js
var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('/root/ca/intermediate/private/www.barretlee.com.key.pem'),
  cert: fs.readFileSync('/root/ca/intermediate/certs/www.barretlee.com.cert.pem'),
  passphrase: 'passoword' // 如果生成证书的时候设置了密码，请添加改参数和密码
};

https.createServer(options, function(req, res) {
  res.writeHead(200);
  res.end('hello world');
}).listen(8000, function(){
  console.log('Open URL: //www.barretlee.com:8000');
});
```

可以看到这样的效果：

![小绿锁出来了](/blogimgs/2016/04/24/6c0378f8gw1f373ltah7zj20oc09aaan.jpg)<!--<source src="//ww1.sinaimg.cn/large/6c0378f8gw1f373ltah7zj20oc09aaan.jpg">-->

查看证书的详细信息：

![证书的详细信息](/blogimgs/2016/04/24/6c0378f8gw1f373mf9bpfj20qw0u6n3d.jpg)<!--<source src="//ww1.sinaimg.cn/large/6c0378f8gw1f373mf9bpfj20qw0u6n3d.jpg">-->

回到最初的问题：

> 然而在一些情况下，我们没必要去 CA 机构购买证书，比如在内网的测试环境中，为了验证 HTTPS 下的一些问题，我们不需要部署昂贵的证书，这个时候自建 Root CA，给自己颁发证书就显得很有价值了。

一般公司内网的电脑都会强制安装一些安全证书，此时就可以把我们自建自签名的证书导入/引导安装到用户的电脑中啦~

### 无 SNI 支持问题

很多公司由于业务众多，域名也是相当多的，为了方便运维，会让很多域名指向同样的 ip，然后统一将流量/请求分发到后端，此时就会面临一个问题：由于 TLS/SSL 在 HTTP 层之下，客户端和服务器握手的时候还拿不到 origin 字段，所以服务器不知道这个请求是从哪个域名过来的，而服务器这边每个域名都对应着一个证书，服务器就不知道该返回哪个证书啦。

SNI 就是用来解决这个问题的，官方解释是

> SNI（Server Name Indication）是为了解决一个服务器使用多个域名和证书的SSL/TLS扩展。一句话简述它的工作原理就是，在连接到服务器建立SSL链接之前先发送要访问站点的域名（Hostname），这样服务器根据这个域名返回一个合适的证书。

然后有将近 25% 的浏览器不支持该字段的扩展，这个问题有两个通用解决方案：

- 使用 VIP 服务器，每个域名对应一个 VIP，然后 VIP 与统一接入服务对接，通过 ip 来分发证书，不过运维成本很高，可能也需要大量的 VIP 服务器
- 采用多泛域名，将多个泛域名证书打包进一个证书，可以看看 [淘宝](//www.taobao.com) 页面的证书
![taobao cert](/blogimgs/2016/04/24/6c0378f8gw1f3740ay3glj210g15kqcf.jpg)<!--<source src="//ww1.sinaimg.cn/large/6c0378f8gw1f3740ay3glj210g15kqcf.jpg">-->
它的缺点是每次添加域名都需要更新证书。

### 几个细节知识点

__1. 证书选择__

证书有多张加密方式，不同的加密方式对 CPU 计算的损耗不同，安全级别也不同。TLS 在进行第一次握手的时候，客户端会向服务器端 `say hello`，这个时候会告诉服务器，它支持哪些算法，此时服务器可以将最适合的证书发给客户端。

__2. 证书的吊销__

CA 证书的吊销存在两种机制，一种是在线检查，client 端向 CA 机构发送请求检查 server 公钥的靠谱性；第二种是 client 端储存一份 CA 提供的证书吊销列表，定期更新。前者要求查询服务器具备良好性能，后者要求每次更新提供下次更新的时间，一般时差在几天。安全性要求高的网站建议采用第一种方案。

大部分 CA 并不会提供吊销机制（CRL/OCSP），靠谱的方案是为根证书提供中间证书，一旦中间证书的私钥泄漏或者证书过期，可以直接吊销中间证书并给用户颁发新的证书。中间证书的签证原理于上上条提到的原理一样，中间证书还可以产生下一级中间证书，多级证书可以减少根证书的管理负担。

很多 CA 的 OCSP Server 在国外，在线验证时间比较长，如果可以联系 CA 供应商将 Server 转移到国内，效率可以提升 10 倍左右。

__3. PKI 体系__

比较主流的两种方案是 HPKP 和 Certificate Transparency：

- HPKP 就是用户第一次访问的时候记下 sign 信息，以后不匹配则拒绝访问，这存在很大的隐患，比如 Server 更新了证书，或者用户第一次访问的时候就被人给黑了
- Certificate Transparency 意思就是让 CA 供应商透明化 CA 服务日志，防止 CA 供应商偷偷签证

### 小结

看了不少文章，对 CA 和证书相关的知识做了一些总结，可能不全面，也可能存在表述错误或者知识性错误，欢迎拍砖！

### 拓展阅读

- http://jamielinux.com/docs/openssl-certificate-authority/index.html
- http://www.ert7.com/service/knowledge/3999.html
