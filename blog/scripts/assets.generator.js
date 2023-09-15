const moment = require('moment');
const hexoFs = require('hexo-fs');

hexo.extend.generator.register('js_asset', async function (locals) {
  // placeholder
  return;

  const key = 'themes/hexo-theme-moustache/source/public/js/main.js';
  const data = (await hexoFs.readFileSync(key)).toString();
  return {
    path: `public/js/main-${moment(new Date()).format('YYYYMMDDhh')}.js`,
    data,
  };
});