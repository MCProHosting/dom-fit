var domFit = function (_jquery, _fit) {
    'use strict';

    var jQuery  = _jquery || window.jQuery,
        fit     = _fit || window.fit,
        options = {};

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
        var opts = jQuery.extend(options, fit.defaults),
            dY   = (transform.height - transform.height / transform.scale),
            dX   = (transform.width - transform.width / transform.scale);

        transform.ty = options.vAlign == fit.CENTER ? dY / 2 : options.vAlign == BOTTOM ? dY : 0;
        transform.tx = options.hAlign == fit.CENTER ? dX / 2 : options.vAlign == RIGHT ? dX : 0;
        transform.scale = 0;

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


    jQuery(window).load(boot);

    return {
        'position'  : position,
        'vertical'  : vertical,
        'horizontal': horizontal,

        'boot': boot,
    }
};

if (typeof window.define === "function" && window.define.amd) {
    window.define('domFit', ['jquery', 'fit'], function($, fit) {
        return window.domFit($, fit);
    });
} else {
    window.domFit = window.domFit();
}