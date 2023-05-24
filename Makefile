.PHONY: r d b h n i c p run backup deploy help new init clear goroot pull

ROOT = $(CURDIR)/
DRAFTS = ${ROOT}blog/src/_drafts/
POSTS = ${ROOT}blog/src/_posts/
POSTS_IMG = ${ROOT}blog/src/blogimgs/

BUILD = ${ROOT}blog/src/build/
DEPLOY_GIT = ${ROOT}blog/src/.deploy*/

LOCAL = http://0.0.0.0:4000/entry/
WEB = https://www.barretlee.com/entry/
GOOGLE_DRIVER_BLOG = ~/GoogleDriver/blog/
GOOGLE_DRIVER_BLOG_IMG = ~/GoogleDriver/blogImg/


i: goroot init
r: goroot run
d: goroot deploy
b: goroot backup
n: goroot new
c: clear
h: help
p: pull

# 拉取远程代码
pull:
	git pull origin master;

# 回到根文件夹
goroot:
	cd ${ROOT};

# 初始化,执行 npm install
init:
	cd blog; npm install --registry=https://registry.npmmirror.com
	git remote add origin git@github.com:barretlee/blog.git;
	git remote add ecoding git@e.coding.net:barretlee/blog.git
	# git remote add coding https://git.coding.net/barretlee/myblog.git;

# 清理工作
clear:
	rm -rf ${DRAFTS}*;

# 打开 hexo 本地服务
run:
	sed -i '' '125s/true/false/' blog/_config.yml;
ifneq (${F},)
	cd blog; \
	rm -rf ${DEPLOY_GIT}; \
	hexo clean;
	hexo g;
endif
	git pull origin master; \
	cd blog; \
	open ${LOCAL}; \
	hexo s -d --debug;

# 备份文件,部署到 coding 和 github
deploy:
ifneq (${F},)
	cd blog; \
	rm -rf ${DEPLOY_GIT}; \
	hexo clean;
	hexo g;
endif
	cd blog; \
	hexo d; \
	open ${WEB};
	git add --all; \
	git commit -am "backup"; \
	git push ecoding master; \
	git push origin master;

# 备份内容
backup:
	# 备份到 google driver
	- cp -f ${POSTS}* ${GOOGLE_DRIVER_BLOG};
	- cp -rf ${POSTS_IMG} ${GOOGLE_DRIVER_BLOG_IMG};
ifneq (${P},)
	# 参数中包含 push, 推到仓库中去备份
	git add --all; \
	git commit -am "backup"; \
	git push ecoding master; \
	git push origin master;
endif

# 创建一个新文件
new:
ifneq (${P},)
	cd blog; \
	rm src/_post/*-${N}.md; \
	rm src/_dratfs/{N}.md; \
	hexo publish ${N};
ifeq (${P}, run)
	make run;
endif
else
ifneq (${N},)
	touch ${DRAFTS}${N}.md; \
	node bin/startblog.js ${N};
endif
endif

# 帮助命令
help:
	@echo "====================A common Makefilefor blog system========================";
	@echo "Copyright (C) 2015 barret.china@gmail.com";
	@echo "The following targets are support:";
	@echo;
	@echo " i --init             - init, run npm install";
	@echo " r --run              - start local serve at http://0.0.0.0:4000";
	@echo " d --deploy           - deploy project to coding & github";
	@echo " p --pull             - pull code from coding.net";
	@echo " b --backup (P=)      - backup dates, push to git";
	@echo "                         make backup P=1; P->PUSH";
	@echo " h --help             - show help info";
	@echo " n --new (N=|P=)      - init new post";
	@echo "                         make new N=postname; N->NEW";
	@echo "                         make new N=postname P=1; P->PUBLISH";
	@echo;
	@echo "To make a target, do make [target], short for make [t]";
	@echo "============================== Version0.1 =================================="
