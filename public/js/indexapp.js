define([
	'jquery',
	'underscore',
	'backbone',
	'models/state',
    'models/Model',
	'handlebars',
    'jquerycookie',
    'jquerystorage',
    'jqueryhelper',
    'l10n',
    'localizations',
    'blockui',
    'jquerytimeago',
    'datehelper'
], function (jquery, underscore, backbone, State, Model) {

    Router = Backbone.Router.extend({
        initialize: function () {
            _.bindAll(this, 'clearState');
        },
        routeviews: {
            "route": "views/route/routemain",
            "home": "views/home",
            "about": "views/about"
        },
        routes: {
            "*actions": "defaultRoute" //default
        },
        // and the function that parses the query string can be something like :
        parseQueryString: function (queryString) {
            var params = {};
            if (queryString) {
                _.each(
                    _.map(decodeURI(queryString).split(/&/g), function (el, i) {
                        var aux = el.split('='), o = {};
                        if (aux.length >= 1) {
                            var val = undefined;
                            if (aux.length == 2)
                                val = aux[1];
                            o[aux[0]] = val;
                        }
                        return o;
                    }),
                    function (o) {
                        _.extend(params, o);
                    }
                );
            }
            return params;
        },
        clearState: function () {
            //Delete all the cookies for the current domain
            var cookies = document.cookie.split(";");

            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                $.cookie($.trim(name), null);
            }

            if (TraklApp.State.get("headerview")) {
                TraklApp.State.get("headerview").close();
            }

            TraklApp.State.set({ "tokenid": null, "username": null, "accounttype": null, 'preference': null, 'headerview': null });

        },
        defaultRoute: function (actions) {
            if (!TraklApp.State.get("headerview")) {
                require(['views/header'], function (HeaderView) {
                    TraklApp.State.set({ "headerview": new HeaderView() });
                    TraklApp.State.get("headerview").open();
                });
            }

            if (TraklApp.State.get("openview")) {
                TraklApp.State.get("openview").close();
            }
            this.resetLayout();

            //this.verifyLogin(function () {
                $.blockUI({ message: '<h3><img src="assets/images/ajax-loader.gif" />' + " " + l('%app.loading') + '</h3>' });
                if (actions == "" || actions == null) {
                    TraklApp.Router.navigate("route", true);
                }
                else {

                    var viewurl = TraklApp.Router.routeviews[actions.toLowerCase()];

                    if (viewurl) {
                        require([viewurl], function (view) {
                            $.unblockUI();
                            TraklApp.State.set({ "openview": new view() });
                            TraklApp.State.get("openview").open();
                        });
                    }
                    else {
                        TraklApp.Router.navigate("route", true);
                    }
                }
            //});
        },
        resetLayout: function () {
            var headerH = $('.header').innerHeight();
            var footerH = $('.footer').innerHeight();
            var height_used = headerH + footerH;

            $('#main').height($(window).height() - height_used + 'px');
        }

    });

    var AppView = {
        Router: new Router,
        State: new State,
        websocket: null,
        appendJqueryLayoutCss: function () {
            if ($('link[href*="assets/css/jquery.layout.css"]').length == 0) {
                $('<link type="text/css" rel="stylesheet" href="assets/css/jquery.layout.css"/>').appendTo("head");
            }
        },

        initialize: function () {
            String.locale = 'en-GB';

            jQuery.timeago.settings.allowFuture = true;
            jQuery.timeago.settings.refreshMillis = 0;
            $.blockUI.defaults.message = '<h3><img src="assets/images/ajax-loader.gif" />' + " " + l('%app.loading') + '</h3>';

            Handlebars.registerHelper("debug", function (optionalValue) {
                console.log("Current Context");
                console.log("====================");
                console.log(this);

                if (optionalValue) {
                    console.log("Value");
                    console.log("====================");
                    console.log(optionalValue);
                }
            });
            Handlebars.registerHelper("locale", function (text) {
                return l("%" + text);
            });

            Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
                switch (operator) {
                    case '==':
                        return (v1 == v2) ? options.fn(this) : options.inverse(this);
                        break;
                    case '===':
                        return (v1 === v2) ? options.fn(this) : options.inverse(this);
                        break;
                    case '<':
                        return (v1 < v2) ? options.fn(this) : options.inverse(this);
                        break;
                    case '<=':
                        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                        break;
                    case '>':
                        return (v1 > v2) ? options.fn(this) : options.inverse(this);
                        break;
                    case '>=':
                        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                        break;
                    case '!=':
                        return (v1 != v2) ? options.fn(this) : options.inverse(this);
                        break;
                    default:
                        return options.inverse(this)
                        break;
                }
            });

            Handlebars.registerHelper("locale", function (text) {
                return l("%" + text);
            });

            Handlebars.registerHelper("locale1", function (prefix, text) {
                return l("%" + prefix + text);
            });

            Handlebars.registerHelper('unless_blank', function (item, block) {
                return (item && item.replace(/\s/g, "").length) ? block.fn(this) : block.inverse(this);
            });

            Handlebars.registerHelper('ifOr', function (v1, v2, options) {
                if (v1 || v2) {
                    return options.fn(this);
                }
                return options.inverse(this);
            });
            Handlebars.registerHelper('ifInString', function (val, str, options) {
                str = str + ""; //coerce to string
                str = str.split(",");
                val = val + ""; //coerce val
                for (i = 0; i < str.length; i++) {
                    if (str[i] == val) {
                        return options.fn(this);
                    }
                }
                return options.inverse(this);
            });
            Handlebars.registerHelper("split", function (tag, separator, indx) {
                if (tag) {
                    if (parseInt(indx) >= 0 && parseInt(indx) < tag.split(separator).length) {
                        return tag.split(separator)[indx];
                    }
                }
                return '';
            });
            
            Handlebars.registerHelper("dateFormat", function (strDate, format) {
                var date = null;
                if (strDate) {
                    date = Date.parseDate(strDate, Date.patterns.DateTimePattern3);
                    return date.dateFormat(format);
                }
                else {
                    return '';
                }

            });
            Handlebars.registerHelper("getArrayLength", function (arr) {
                return arr.length;
            });
            Handlebars.registerHelper("timeago", function (strDate) {
                var date = null;
                if (strDate) {
                    date = Date.parseDate(strDate, Date.patterns.DateTimePattern1);

                    return $.timeago(date.dateFormat('Y/m/d H:i:s'), new Date());
                }
                else
                    return '';

            });

            Handlebars.registerHelper("timeiso", function (strDate) {
                var isotime = Date.parseSQLDate(strDate);
                return isotime.toISOString();
            });

            Handlebars.registerHelper("toDecimalPlace", function (num, dp) {
                return num.toFixed(dp);
            });
            Backbone.history.start();
        }
    };

    return AppView;
});