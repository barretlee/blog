// after_post_render
// after_render:html
hexo.extend.filter.register('after_render:html', function (data) {
  if (!data) return data;
  // Github Action 的 CI 环境才执行替换，本地无需替换
  if (process.env.NODE_ENV !== 'ci') return data;
  const cdn = this.config.assets_cdn;
  return data.replace(/<img(.*?)src="(.*?)"(.*?)>/gi, function (str, p1, p2) {
    if (/^\/blogimgs\//.test(p2)) return str.replace(p2, cdn + p2);
    return str;
  }).replace(/<script src="(.*?)"/gi, function(str, p1) {
    if (/^\/public\/js\//.test(p1)) return str.replace(p1, cdn + p1);
    return str;
  }).replace(/<link rel="stylesheet" href="(.*?)"/gi, function(str, p1) {
    if (/^\/public\/css\//.test(p1)) return str.replace(p1, cdn + p1);
    return str;
  });
});