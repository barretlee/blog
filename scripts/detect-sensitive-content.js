'use strict';

const fs = require('fs');
const path = require('path');
const puppeteer = require("puppeteer");
const exexSync = require('child_process').execSync;

const whiteListDomains = require('./domain/whitelist');
const base = path.join(__dirname, "../blog/src/_posts/");

function travelDir(filePath, handler) {
  fs.readdirSync(filePath).forEach(function (file) {
    var file = path.join(filePath, file);
    if (fs.statSync(file).isDirectory()) {
      exports.travel(file, handler);
    } else {
      handler(file);
    }
  });
}

function getLinks() {
  const map = {};
  travelDir(base, function (file) {
    const content = fs.readFileSync(file).toString();
    // link format
    //   1. <a href="{LINK}" />
    //   2. [](LINK), not start with !
    const LINK_REG = /<a[\s\S]+?href=(['"])([\s\S]+?)\1[\s\S]+?>/gim;
    const LINK_REG_IN_MD = /([\s\S])\[([^\]]+?)?\]\(([\s\S]+?)\)/gim;

    const links = [];
    content.replace(LINK_REG, ($0, $1, $2) => {
      links.push($2);
      return $0;
    }).replace(LINK_REG_IN_MD, ($0, $1, $2, $3) => {
      if ($1 !== '!') links.push($3);
      return $0;
    });

    const domain = [];
    links.forEach(link => {
      if (!link || !link.startsWith('http')) return;
      const d = link.split('/')[2];
      if (d && !domain.includes(d)) domain.push(d);
    });

    if (domain.length) map[file] = domain;
  });

  // console.log(map);
  let allDomains = new Set(Object.keys(map).reduce((pre, cur) => [...pre, ...map[cur]], []));
  return Array.from(allDomains).filter(d => !whiteListDomains.includes(d));
}

function getSensitiveWord() {
  return JSON.parse(
    Buffer.from(
      fs.readFileSync(path.join(__dirname, 'domain/1.txt')).toString(),
      'base64'
    ).toString('utf8')
  );
}


async function checkSensitivePage(allDomains, sensitiveWords) {
  const sensitiveDomains = [];
  const browser = await puppeteer.launch({ headless: false, });
  const page = await browser.newPage();
  for (const domain of allDomains) {
    try {
      console.log('Checking: ' + domain);
      try {
        await page.goto('http://' + domain, {
          timeout: 3 * 1000,
          waitUntil: 'networkidle0'
        });
      } catch (e) { }
      await new Promise(r => setTimeout(r, 200));
      const content = await page.content();
      // console.log(content);
      sensitiveWords.forEach(word => {
        const hasWord = content.indexOf(word) > -1;
        if (hasWord) console.log('  Attention: ' + domain, 'contains', word);
        if (hasWord && !sensitiveDomains.includes(domain)) {
          sensitiveDomains.push(domain);
        }
      });
    } catch (e) { }
  }
  await browser.close();
  console.log(sensitiveDomains);
  return sensitiveDomains;
}

const allDomains = getLinks();
const sensitiveWords = getSensitiveWord();
checkSensitivePage(allDomains, sensitiveWords);