(function ($) {
    "use strict";
    var templates = {};
    $.extend({
	jplates: function (options, cb) {
            var i, urls, counter, loadTemplates, get_template, url, req, success, complete;
            urls = {};
            counter = 0;
            get_template = function (html, t) {
		return $(html).filter(function () {
		    return $(this).is('.template#' + t);
		})		    
	    };
            loadTemplates = function (tids, html) {
		var t, tt, temphtml, thtml;
		console.log('jplates: loadTemplates',  tids)
		for (tt in tids) {
		    if (tids.hasOwnProperty(tt)) {
			t = tids[tt];
			if (!$.template[t]) {
			    temphtml = get_template(html, t);
			    if (temphtml.length !== 0) {
				// this is wrong but works for now
				if (t === 'jtk-table-row') {
				    temphtml = temphtml.find('tbody');
				}
				if (t === 'jtk-table-cell') {
				    temphtml = temphtml.find('tr');
				}
				thtml = (String(temphtml.html())).replace(/href_="/g, 'href="');
				thtml = thtml.replace(/src_="/g, 'src="');
				$.template(t, thtml);
			    } else {
				console.error('template not found: ' + t);
			    }
			}
		    }
		}
            };
            success =  function (msg) {
		console.log('jplates: success ',  this.url)
		templates[this.url] = msg;
		loadTemplates(options[this.url], msg);
            };
            complete = function () {
		counter -= 1;
		if (counter === 0) {
		    console.log('jplates: complete')
                    if (cb) {
			cb();
                    }
		}
            };
            for (url in options) {
		if (options.hasOwnProperty(url)) {
		    if (templates[url]) {
			loadTemplates(options[url], templates[url]);
		    } else {
			counter += 1;
			req = $.ajax({
			    url: url,
			    type: "GET",
			    processData: false,
			    dataType: 'html',
			    success: success
			});
			req.done(complete);
			req.fail(complete);
		    }
		    if (counter === 0) {
			if (cb) {
			    cb();
			}
		    }
		}
	    }
	}
    });
}(jQuery));


