.PHONY: r d b h n i c p run backup deploy help new mkfile init clear goroot pull

ROOT = ~/work/blogsys/
DRAFTS = ${ROOT}blog/src/_drafts/
POSTS = ${ROOT}blog/src/_posts/
POSTS_IMG = ${ROOT}blog/src/blogimgs/
BACKUPPOSTS = ${ROOT}blogsources/backup/posts/
BACKUPDRAFTS = ${ROOT}blogsources/backup/drafts/
BACKUPPOSTS_BAC = ${ROOT}databackup/posts/
BACKUPDRAFTS_BAC = ${ROOT}databackup/drafts/

BUILD = ${ROOT}blog/src/build/
DEPLOY_GIT = ${ROOT}blog/src/.deploy*/

LOCAL = http://0.0.0.0:4000/entry/
WEB = http://www.barretlee.com/entry/
WRITER = http://0.0.0.0:4001
GOOGLE_DRIVER_BLOG = ~/GoogleDriver/blog/
GOOGLE_DRIVER_BLOG_IMG = ~/GoogleDriver/blogImg/


i: goroot init
r: goroot mkfile run
d: goroot mkfile deploy
b: goroot mkfile backup
n: goroot mkfile new
c: clear
h: help
p: pull

# 拉取远程代码
pull:
	git pull coding master;

# 回到根文件夹
goroot:
	cd ${ROOT};

# 新建两个备份文件夹
mkfile:
	@[ -d ${BACKUPPOSTS} ] || mkdir -p ${BACKUPPOSTS};
	@[ -d ${BACKUPDRAFTS} ] || mkdir -p ${BACKUPDRAFTS};
	@[ -d ${BACKUPPOSTS_BAC} ] || mkdir -p ${BACKUPPOSTS_BAC};
	@[ -d ${BACKUPDRAFTS_BAC} ] || mkdir -p ${BACKUPDRAFTS_BAC};

# 初始化,执行 cnpm install
init:
	cd blog; cnpm i;
	cd write; cnpm i;
	git remote add origin https://github.com/barretlee/blog.git;
	git remote add coding https://git.coding.net/barretlee/myblog.git;

# 清理工作
clear:
	rm -rf ${DRAFTS}*;
	rm -rf ${BACKUPDRAFTS_BAC}*;

# 打开 hexo 本地服务
run:
	cd blog; \
	hexo g; \
	open ${LOCAL}; \
	hexo s;

# 备份文件,部署到 gitcafe 和 github
deploy:
	cd blog; \
	rm -rf ${BUILD}; \
	rm -rf ${DEPLOY_GIT}; \
	rm db.json; \
	hexo g; \
	hexo d; \
	open ${WEB};
	git add --all; \
	git commit -am "backup"; \
	git push coding master; \
	git push origin master;

# 备份内容
backup:
	# 备份 posts
	- cp -f ${POSTS}* ${BACKUPPOSTS};
	# 二次备份 posts
	- cp -f ${POSTS}* ${BACKUPPOSTS_BAC};
	# 备份 drafts
	- cp -f ${DRAFTS}* ${BACKUPDRAFTS};
	# 二次备份 drafts
	- cp -f ${DRAFTS}* ${BACKUPDRAFTS_BAC};
	# 备份到 google driver
	- cp -f ${POSTS} ${GOOGLE_DRIVER_BLOG};
	- cp -rf ${POSTS_IMG} ${GOOGLE_DRIVER_BLOG_IMG};
ifneq (${P},)
	# 参数中包含 push, 推到仓库中去备份
	git add --all; \
	git commit -am "backup"; \
	git push coding master; \
	git push origin master;
endif

# 创建一个新文件
new:
ifneq (${P},)
	cd blog; \
	rm src/_post/*-${N}.md; \
	cp -f ${DRAFTS}* ${BACKUPDRAFTS_BAC}; \
	rm src/_dratfs/{N}.md; \
	hexo publish ${N};
ifeq (${P}, run)
	make run;
endif
else
ifneq (${N},)
	touch ${DRAFTS}${N}.md; \
	open ${WRITER}; \
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
