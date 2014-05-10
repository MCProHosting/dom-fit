var domFit = (function (jQuery, fit) {
    'use strict';

    var options = {};

    function boot () {
        $('[data-fit], .js-fit').each(function () {
            var attributes = this.attributes;

            options = {watch: true};

            for (var i = 0, l = attributes.length; i < l; i++) {
                var matches = attributes[i].name.match(/data-fit-([a-z]+)/);
                if (matches) {
                    options[matches[1].replace('align', 'Align')] = attributes[i].value;
                }
            }

            var target = options.to || $(this).parent()[0],
                method = options.with ? eval(options.with) : position;

            fit(this, target, options, method);
        });
    }

    function correctScale (transform, element) {
        if (transform.scale === false) {
            return transform;
        }
        
        var opts = jQuery.extend(options, fit.defaults),
            dY   = (transform.height - transform.height / transform.scale),
            dX   = (transform.width - transform.width / transform.scale);

        transform.ty = opts.vAlign == fit.CENTER ? dY / 2 : opts.vAlign == BOTTOM ? dY : 0;
        transform.tx = opts.hAlign == fit.CENTER ? dX / 2 : opts.vAlign == RIGHT ? dX : 0;
        transform.scale = false;

        return transform;
    }

    function position (transform, element) {
        transform = correctScale(transform);

        var style = window.getComputedStyle(element),
            left = parseFloat(style.left) || 0,
            top = parseFloat(style.top) || 0;

        if (style.position === 'static') {
            element.style.position = 'relative';
        }

        element.style.left = left + transform.tx + 'px';
        element.style.top = top + transform.ty + 'px';
    }

    function vertical (transform, element) {
        transform = correctScale(transform);
        transform.tx = 0;

        position(transform, element);
    }

    function horizontal (transform, element) {
        transform = correctScale(transform);
        transform.ty = 0;

        position(transform, element);
    }

    return {
        'position'  : position,
        'vertical'  : vertical,
        'horizontal': horizontal,

        'boot': boot,
    }

})(window.jQuery, window.fit);
