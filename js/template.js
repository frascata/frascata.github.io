(function () {
    window.MaterialUp = angular.module("MaterialUp", ["ngResource", "ngSanitize", "ipCookie", "textFilters", "DesignService"]).config(["$httpProvider", function (t) {
        return t.defaults.headers.common.Accept = "application/json"
    }]), $(document).on("ready page:load", function () {
        return new WOW({mobile: !1}).init(), angular.bootstrap(document.body, ["MaterialUp"])
    })
}).call(this), function () {
    angular.module("DesignService", ["ngResource"]).factory("Design", ["$http", function (t) {
        return {
            vote: function (e) {
                return t({url: "/designs/" + e + "/vote", method: "PUT"})
            }
        }
    }])
}.call(this), function () {
    MaterialUp.directive("eatClick", function () {
        return {
            link: function (t, e) {
                return e.bind("click", function (t) {
                    return t.preventDefault()
                })
            }
        }
    }).directive("focusMe", ["$timeout", function (t) {
        return {
            link: function (e, r, n) {
                return e.$watch(n.focusMe, function (e) {
                    return e === !0 ? t(function () {
                        return r.val("").focus().val(r.data().content)
                    }) : void 0
                })
            }
        }
    }]).directive("twitterWidget", ["ipCookie", function (t) {
        return {
            scope: {}, link: function (e, r) {
                return $(r).find(".close").bind("click", function () {
                    return event.preventDefault(), r.addClass("bounceOut"), t("twitter_banner", "hidden")
                })
            }
        }
    }]).directive("subscriberBanner", ["ipCookie", function (t) {
        return {
            scope: {}, link: function (e, r) {
                return $(r).find(".close").bind("click", function () {
                    return event.preventDefault(), r.addClass("bounceOut"), t("subscribed", "hidden", {expires: 30})
                })
            }
        }
    }]).directive("share", function () {
        return {
            restrict: "A", scope: {url: "@"}, link: function (t, e) {
                return e.bind("click", function () {
                    var e, r, n, o, i, l;
                    return l = 575, e = 400, r = ($(window).width() - l) / 2, o = ($(window).height() - e) / 2, n = "status=1,width=" + l + ",height=" + e + ",top=" + o + ",left=" + r, i = "http://twitter.com/share?" + t.url, window.open(i, "Share", n), !1
                })
            }
        }
    }).directive("calloutWidget", ["ipCookie", function (t) {
        return {
            scope: {}, restrict: "A", link: function (e, r) {
                return $(r).find(".close").bind("click", function () {
                    return event.preventDefault(), r.addClass("bounceOut"), t("callout", "hidden")
                })
            }
        }
    }]).directive("facebookShare", function () {
        return {
            restrict: "A", scope: {url: "@"}, link: function (t, e) {
                return e.bind("click", function () {
                    var e, r, n, o, i, l;
                    return l = 700, e = 300, r = ($(window).width() - l) / 2, o = ($(window).height() - e) / 2, n = "status=1,width=" + l + ",height=" + e + ",top=" + o + ",left=" + r, i = "http://facebook.com/sharer/sharer.php?u=" + t.url, window.open(i, "Share", n), !1
                })
            }
        }
    }).directive("plusShare", function () {
        return {
            restrict: "A", scope: {url: "@"}, link: function (t, e) {
                return e.bind("click", function () {
                    var e, r, n, o, i, l;
                    return l = 700, e = 600, r = ($(window).width() - l) / 2, o = ($(window).height() - e) / 2, n = "status=1,width=" + l + ",height=" + e + ",top=" + o + ",left=" + r, i = "https://plus.google.com/share?url=" + t.url, window.open(i, "Share", n), !1
                })
            }
        }
    })
}.call(this), function () {
    angular.module("textFilters", []).filter("capitalize", function () {
        return function (t) {
            return null != t ? (t = t.toLowerCase(), t.substring(0, 1).toUpperCase() + t.substring(1)) : t
        }
    })
}.call(this), function () {
    MaterialUp.controller("DesignsController", this.DesignsController = ["$scope", "Design", function (t, e) {
        return t.init = function (e, r, n) {
            return t.design = {id: e, points: r, voted: n}
        }, t.vote = function () {
            return "true" !== t.design.voted ? (e.vote(t.design.id), t.design.points += 1, t.design.voted = "true") : void 0
        }
    }])
}.call(this), function () {
    MaterialUp.controller("PalettesController", this.PalettesController = ["$scope", function (t) {
        return t.selectedCount = 0, t.showPalette = !1, t.primaryColor = null, t.accentColor = null, t.init = function (e, r, n) {
            var o;
            return null == r && (r = null), null == n && (n = null), $(".palette").height($(window).height() - 60), $(".theme-wrapper").height($(window).height() - 60), $(window).resize(function () {
                return $(".theme-wrapper").height($(window).height() - 60), $(".palette").height($(window).height() - 60)
            }), o = new ZeroClipboard($(".theme-palette-color")), o.on("ready", function () {
                return o.on("aftercopy", function (t) {
                    return alert("Color copied to your clipboard: " + t.data["text/plain"])
                })
            }), t.colors = e, null != r ? (t.primaryColor = r, t.accentColor = n, t.select(r.key), t.select(n.key), t.showPalette = !0) : void 0
        }, t.toggleSelect = function (e) {
            return 2 === t.selectedCount && t.resetSelected(), e.selected === !0 ? (e.selected = !1, t.selectedCount--) : (e.selected = !0, t.selectedCount++), 2 === t.selectedCount ? (t.accentColor = e, t.showPalette = !0, window.innerWidth < 768 && (t.hidePaletteColors = !0, setTimeout(function () {
                return $.smoothScroll({
                    easing: "swing",
                    offset: 0,
                    scrollTarget: ".theme-wrapper",
                    speed: 500,
                    autoCoefficent: 2
                })
            }, 200))) : t.primaryColor = e, history.pushState && null != t.primaryColor & null != t.accentColor ? window.history.pushState("", "", "/" + t.primaryColor.key + "/" + t.accentColor.key) : void 0
        }, t.resetSelected = function () {
            return angular.forEach(t.colors, function (t) {
                return t.selected = !1
            }), t.selectedCount = 0
        }, t.select = function (e) {
            return angular.forEach(t.colors, function (r) {
                return r.key === e ? (r.selected = !0, t.selectedCount++) : void 0
            })
        }, t.darkPrimaryColor = function () {
            return null != t.primaryColor ? t.primaryColor.shades[700].hex : void 0
        }, t.defaultPrimaryColor = function () {
            return null != t.primaryColor ? t.primaryColor.shades[500].hex : void 0
        }, t.lightPrimaryColor = function () {
            return null != t.primaryColor ? t.primaryColor.shades[100].hex : void 0
        }, t.accentPrimaryColor = function () {
            return null != t.accentColor ? null != t.accentColor.shades.A200 && "white" === t.accentColor.shades.A200.contrast ? t.accentColor.shades.A200.hex : t.accentColor.shades[500].hex : void 0
        }, t.textPrimaryColor = function () {
            return null != t.primaryColor ? "white" === t.primaryColor.shades[500].contrast ? "#FFFFFF" : "#212121" : void 0
        }, t.defaultPrimaryColorContrast = function () {
            return null != t.primaryColor ? t.primaryColor.shades[500].contrast : void 0
        }, t.lightPrimaryColorContrast = function () {
            return null != t.primaryColor ? t.primaryColor.shades[100].contrast : void 0
        }, t.darkPrimaryColorContrast = function () {
            return null != t.primaryColor ? t.primaryColor.shades[700].contrast : void 0
        }, t.textPrimaryColorContrast = function () {
            return null != t.primaryColor ? "white" === t.primaryColor.shades[500].contrast ? "black" : "white" : void 0
        }, t.accentPrimaryColorContrast = function () {
            return null != t.accentColor ? t.accentColor.shades[500].contrast : void 0
        }
    }])
}.call(this);
