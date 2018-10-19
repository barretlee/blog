(function (window) {
    var images = Array.prototype.slice.call(document.querySelectorAll('[data-original]'));

    function elementInViewport(el) {
        var rect = el.getBoundingClientRect();
        var W = window.innerWidth || document.documentElement.clientWidth;
        var H = window.innerHeight || document.documentElement.clientHeight;
        return (
            (rect.top >= 0 || rect.left >= 0
                || rect.top < 0 && (rect.top + rect.height) >= 0
                || rect.left < 0 && (rect.left + rect.width >= 0))
                && rect.top <= H && rect.left <= W
        );
    }
    function loadImage(el, fn) {
        var src = el.getAttribute('data-original');
        var inited = el.getAttribute('data-init');
        if (inited === 'yes') return;
        var isBg = el.getAttribute('data-isbg');
        src = src.replace(/^https?:/, '');
        if (isBg) {
            el.style.backgroundImage = src;
        } else {
            el.setAttribute('src', src);
        }
        el.setAttribute('data-init', 'yes');
        fn ? fn() : null;
    }

    function processImages() {
        for (var i = 0; i < images.length; i++) {
            !function(i) {
                if (elementInViewport(images[i])) {
                    loadImage(images[i], function () {
                        images.splice(i, 1);
                    });
                }
            }(i);
        };
    }

    processImages();
    window.addEventListener('scroll', processImages);

})(this);