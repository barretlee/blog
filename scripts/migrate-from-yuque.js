const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const moment = require('moment');
const html2markdown = require('html2markdown');
const lakeTo = require('@alipay/lake-to');

// 语雀知识库配置
const login = 'barretlee'
const books = [ 'chat', 'reading', 'thinking' ];

const targetDir = path.resolve('../blog/src/_posts/');
const sourceDir = path.resolve('../yuque/storage/');

books.map(name => {
  const bookDir = path.join(sourceDir, '.meta', login, name, 'docs');
  const files = fs.readdirSync(bookDir);
  files.map(file => {
    const filePath = path.join(bookDir, file);
    const fJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const targetFilePath = path.join(targetDir, `${moment(fJson.created_at).format('YYYY-MM-DD')}-${fJson.slug}.md`);
    let fileContentMd = lakeTo.htmlToMarkdown(fJson.body_html)
      .replace(/<br \/>/gmi, '\n')
      .replace(/---\n.?$/gmi, '');

    if (name === 'chat') fileContentMd = fileContentMd.replace(/202(0|1|2)\s?(年|-)[\w\W]{10,100}$/, '')
    const fileContentMeta = 
`---
title: ${fJson.title}
description: ${fJson.description || '小胡子哥的个人网站'}
author: 小胡子哥
from: 语雀
fromUrl: https://www.yuque.com/barretlee/${fJson.book.slug}/${fJson.slug}
tags:
  - ${fJson.book.name}
categories:
  - 观点和感想
date: ${moment(fJson.created_at).format('YYYY-MM-DD hh:mm:ss')}
---

`
    fs.writeFileSync(targetFilePath, fileContentMeta + fileContentMd);
  });
});