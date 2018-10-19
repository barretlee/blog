'use strict';

const fs = require('hexo-fs');

function lazyProcess(htmlContent) {
    const sourceImgKey = 'data-original';
    const imgRegExp = /<img(\s*?)src="(.*?)"(.*?)>/gi;
    let defaultImagePath = __dirname + '/default-image.json';
    let loadingImage = this.config.lazyload.loadingImg;
    let imgCDN = this.config.imgCDN || '';

    if (!loadingImage) {
        loadingImage = JSON.parse(fs.readFileSync(defaultImagePath)).default;
    }

    return htmlContent.replace(/<img(\s*?)src="(.*?)"(.*?)>/gi, function (str, p1, p2) {
        // might be duplicate
        if(/data-original/gi.test(str)){
            return str.replace(/data-original="\/blogimgs/gim, function () {
                return 'data-original="' + imgCDN + '/blogimgs';
            });
        }
        return str.replace(p2, loadingImage + '" data-original="' + p2)
                .replace(/data-original="\/blogimgs/gim, function () {
                    return 'data-original="' + imgCDN + '/blogimgs';
                });
    });
}
module.exports.processPost = function (data) {
    data.content = lazyProcess.call(this, data.content);
    return data;
};
module.exports.processSite = function (htmlContent) {
    return lazyProcess.call(this, htmlContent);
};

