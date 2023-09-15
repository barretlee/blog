const moment = require('moment');
hexo.extend.filter.register('after_render:html', function (data) {
  if (!data) return data;
  if (process.env.NODE_ENV !== 'ci') {
    // 本地环境修正图片路径，原始地址确保在 Github 下展示页正常
    return data.replace(/<img(.*?)src="(.*?)"(.*?)>/gi, function (str, p1, p2, p3) {
      if (/^\/\.\.\/blogimgs\//.test(p2)) return str.replace(p2, p2.slice(3)).replace(p3, 'loading="lazy" ' + p3);
      return str;
    });
  }
  // Github Action 的 CI 环境才执行 CDN 替换
  const cdn = this.config.assets_cdn;
  const imageCdn = this.config.image_assets_cdn;
  return data.replace(/<img(.*?)src="(.*?)"(.*?)>/gi, function (str, p1, p2, p3) {
    if (/^\/\.\.\/blogimgs\//.test(p2)) return str.replace(p2, imageCdn + p2.slice(3));
    // .replace(p3, 'loading="lazy" ' + p3);
    return str;
  }).replace(/<script(.*?)src="(.*?)"/gi, function (str, p1, p2) {
    if (/^\/public\/js\//.test(p2)) str = str.replace(p2, cdn + p2);
    return str;
  }).replace(/<link(.*?)href="(.*?)"/gi, function (str, p1, p2) {
    if (/^\/public\/css\//.test(p2)) return str.replace(p2, cdn + p2);
    return str;
  }).replace(/<a(.*?)href="(.*?)"/gi, function (str, $1, $2) {
    if (!/^https?:/.test($2)) return str;
    if (!/^https:\/\/(\w+?\.)?barretlee\.com/.test($2)) return str.replace($1, $1 + ' target="_blank" ');
    return str;
  });
});

hexo.extend.filter.register('after_render:js', function (data) {
  if (!data) return data;
  if (process.env.NODE_ENV !== 'ci') return data;
  const cdn = this.config.assets_cdn;
  return data.replace(/(['"])(\/public\/js)/gi, function (str, p1, p2) {
    return p1 + cdn + p2;
  });
});