
const fs = require('hexo-fs');
const UglifyJS = require('uglify-js');
const lazyLoadPath = __dirname + '/simple-lazyload.js';

module.exports.addScript = function(htmlContent){
    let injectExtraScript = function () {
        if (!fs.exists(lazyLoadPath)) throw new TypeError(lazyLoadPath + ' not found!');
        let lazyLoadSourceCode = fs.readFileSync(lazyLoadPath, { escape: true });
        return '<script>' + UglifyJS.minify(lazyLoadSourceCode).code + '</script>';
    };
    if (/<\/body>/gi.test(htmlContent)) {
        let lastIndex = htmlContent.lastIndexOf('</body>');
        htmlContent = htmlContent.substring(0, lastIndex) + injectExtraScript() + htmlContent.substring(lastIndex, htmlContent.length);
    }
    return htmlContent;
};