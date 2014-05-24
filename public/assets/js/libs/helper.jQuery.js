jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
            validLabels = /^(data|css):/,
            attr = {
                method: matchParams[0].match(validLabels) ?
                            matchParams[0].split(':')[0] : 'attr',
                property: matchParams.shift().replace(validLabels, '')
            },
            regexFlags = 'ig',
            regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g, ''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}

jQuery.cookie = function(key, value, options) {

    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = jQuery.extend({}, options);

        if (value === null) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function(s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

jQuery.fn.fixedCenter = function(){
	return this.each(function(){
		var element = jQuery(this);
		centerElement();
		jQuery(window).bind('scroll resize',function(){
			centerElement();
		});

		jQuery(element).bind('resize', function() {
		    centerElement();
		});
			
		function centerElement(){
			var elementWidth = jQuery(element).outerWidth();
			var elementHeight = jQuery(element).outerHeight();
			var windowWidth = jQuery(window).width();
			var windowHeight = jQuery(window).height();	
			
			var X2 = windowWidth/2 - elementWidth/2;
			var Y2 = jQuery(window).scrollTop() + (windowHeight - elementHeight) / 2;
	 
			jQuery(element).css({
				'left':X2,
				'top':Y2,
				'position':'absolute'
			});						
		} //end of centerElement function
					
	}); //end of return this.each
}

jQuery.fn.showCenter = function() {
    return this.each(function() {
        var element = $(this);

        var docW = $(window).width();
        var docH = $(window).height();
        var popupW = element.width();
        var popupH = element.height();
        var vleft = (docW - popupW) / 2 - 10 + 'px';
        var vtop = $(window).scrollTop() + ((docH - popupH) / 2) - 10 + 'px';
        element.css("left", vleft);
        element.css("top", vtop);
        //element.css('border','1px solid red')
        element.show();
    })
}
    