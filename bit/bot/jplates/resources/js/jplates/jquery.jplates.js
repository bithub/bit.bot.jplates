/*jslint debug: true, maxerr: 50, indent: 4 */
(function ($) {
    "use strict";
    var templates = {};

    $.extend({jplates: function (options, cb) {
        var i, urls, counter, loadTemplates, get_template, url, req, success, complete;
        urls = {};
        counter = 0;
        get_template = function (th, t) {
            return $(th).is('.template#' + t);
        };
        loadTemplates = function (tids, html) {
            var t, tt, temphtml, thtml;
            for (i = 0; i < options.length; i += 1) {
                tt = tids[i];
                t = tids[tt];
                if (!$.template[t]) {
                    temphtml = $(html).filter(get_template(this, t));
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
                        console.log('template not found: ' + t);
                    }
                }
            }
        };
        success =  function (msg) {
            templates[this.url] = msg;
            loadTemplates(options[this.url], msg);
        };
        complete = function () {
            counter -= 1;
            if (counter === 0) {
                if (cb) {
                    cb();
                }
            }
        };
        for (i = 0; i < options.length; i += 1) {
            url = options[i];
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
             });
}(jQuery));


