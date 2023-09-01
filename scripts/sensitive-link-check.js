'use strict';

const fs = require('fs');
const path = require('path');
const exexSync = require('child_process').execSync;
const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");

const { WHITELIST_DOMAINS, CONTENT_PATH } = process.env;

let whiteListDomains = require('./domain/whitelist');
whiteListDomains = whiteListDomains.concat(...(WHITELIST_DOMAINS || '').split(',')).filter(Boolean);
const base = path.join(__dirname, "../", CONTENT_PATH || "blog/src/_posts/");

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
  const browser = await puppeteer.launch({
    headless: process.env.NODE_ENV === 'ci' ? 'new' : false,
  });
  const page = await browser.newPage();
  for (const [index, domain] of allDomains.entries()) {
    try {
      console.log(`Checking(${index + 1}/${allDomains.length}): ${domain}`);
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
  return sensitiveDomains;
}

async function sendEmail(sensitiveDomains) {
  const { EMAIL_USER: user, EMAIL_PASS: pass, EMAIL_TO: to } = process.env;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
  const mailOptions = {
    from: `Notify <${user}>`,
    to: to ? to.split(',') : user,
    subject: 'Content Sensitive Notification',
    text: `We have detected some suspected pornographic external links on your blog. Please check them and fix them in a timely manner, including: ${sensitiveDomains.join(', ')}
    
    If there are any false positives, you can add the whitelist domains (whiteListDomains) in the CI script.`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


(async () => {
  const allDomains = getLinks();
  const sensitiveWords = getSensitiveWord();
  const sensitiveDomains = await checkSensitivePage(allDomains, sensitiveWords);
  console.log('sensitiveDomains: ', sensitiveDomains);
  if (sensitiveDomains.length) {
    await sendEmail(sensitiveDomains);
  }
})()