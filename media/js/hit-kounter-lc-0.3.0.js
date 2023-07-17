! function(e) {
    function t(r) { if (n[r]) return n[r].exports; var a = n[r] = { exports: {}, id: r, loaded: !1 }; return e[r].call(a.exports, a, a.exports, t), a.loaded = !0, a.exports }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, n) {
    /** @preserve
     * Hit Kounter Help script v0.3.0
     * Home: https://github.com/zry656565/Hit-Kounter
     * Author: Jerry Zou
     * Email: jerry.zry@outlook.com
     */
    "use strict";

    function r(e) { return e && e.__esModule ? e : { "default": e } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var a = n(1),
        o = r(a),
        i = n(4),
        u = r(i),
        s = n(3);
    n(5);
    var l = { TOP_AREA: n(9) },
        c = {
            elements: {},
            scan: function() {
                var e = this.elements,
                    t = document.querySelectorAll("[data-hk-page]");
                e.current = document.querySelectorAll("[data-hk-page=current]"), e.topArea = document.querySelectorAll("[data-hk-top-pages]"), e.siteView = document.querySelectorAll("[data-hk-site]"), e.pages = {};
                for (var n = 0; n < t.length; ++n) {
                    var r = t[n].attributes["data-hk-page"].value,
                        a = e.pages[r];
                    "current" != r && (a ? a.push(t[n]) : e.pages[r] = [t[n]])
                }
            },
            increment: function() {
                var e = this.elements;
                o["default"].request({ api: "hk.page.increment", v: "1.0", success: function(t) { for (var n = 0; n < e.current.length; ++n) e.current[n].innerText = s.formatNumber(t.count) }, failure: function(e, t) { console.log(e, t) } })
            },
            getPages: function() {
                var e = this.elements,
                    t = [];
                for (var n in e.pages) e.pages.hasOwnProperty(n) && t.push({ url: n });
                o["default"].request({
                    api: "hk.page.get",
                    v: "1.0",
                    data: { pages: t },
                    success: function(t) {
                        for (var n = 0; n < t.length; ++n)
                            for (var r = e.pages[t[n].url], a = 0; a < r.length; ++a) r[a].innerText = s.formatNumber(t[n].count)
                    },
                    failure: function(e, t) { console.log(e, t) }
                })
            },
            getSiteView: function() {
                var e = this.elements;
                o["default"].request({ api: "hk.site.totalView", v: "1.0", success: function(t) { for (var n = 0; n < e.siteView.length; ++n) e.siteView[n].innerText = s.formatNumber(t) }, failure: function(e, t) { console.log(e, t) } })
            },
            getTop: function() {
                var e = this.elements,
                    t = e.topArea[0].attributes["data-hk-top-pages"].value;
                o["default"].request({ api: "hk.page.getTop", v: "1.0", data: { num: t }, success: function(n) { for (var r = l.TOP_AREA({ pages: n, num: t }), a = 0; a < e.topArea.length; ++a) e.topArea[a].innerHTML = r }, failure: function(e, t) { console.log(e, t) } })
            }
        };
    u["default"](function() {
        var e = c,
            t = e.elements;
        e.scan(), e.increment(), s.isEmpty(t.pages) || e.getPages(), t.siteView.length && e.getSiteView(), t.topArea.length && e.getTop()
    }), window.HitKounter = c, t["default"] = c
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { "default": e } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var a = n(2),
        o = r(a),
        i = {
            APP_ID: "yzbpXQpXf1rWVRfAAM8Durgh-gzGzoHsz",
            APP_KEY: "020bjTvbiVinVQ21YtWAJ9t8",
            request: function() {
                function e(e) { u(e.code, e) }

                function t() { u(401, { code: 401, message: "Unsupported API." }) }
                var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { api: "" },
                    r = this.APP_ID,
                    a = this.APP_KEY,
                    i = n.success,
                    u = n.failure,
                    s = n.data;
                i = i || function() {}, u = u || function() {}, s = s || {}, n.api || u(400, { code: 400, message: "Please set the api name." });
                var l = location.href.replace(/#.*$/, "").replace(/\?.*$/, ""),
                    c = location.origin || location.protocol + "//" + location.host;
                AVS = AV;
                AV.init({ appId: r, appKey: a, serverURLs: '' });
                var f = AV.Object.extend("Page"),
                    p = new AV.Query("Page");
                if (p.equalTo("domain", c), n.api.match(/^hk\.page\.get/)) ! function() {
                    s.pages = s.pages || [{ url: l }];
                    for (var r = 0, a = s.pages.length; a > r; r++) s.pages[r].count = 0;
                    var u = function(e) {
                            switch (n.api) {
                                case "hk.page.get":
                                    for (var r = {}, a = 0, o = e.length; o > a; a++) r[e[a].url] = e[a];
                                    for (var u = [], l = 0, c = s.pages.length; c > l; l++) {
                                        var f = r[s.pages[l].url];
                                        f ? u.push(f) : u.push(s.pages[l])
                                    }
                                    i(u);
                                    break;
                                case "hk.page.getByDomain":
                                    i(e);
                                    break;
                                case "hk.page.getTop":
                                    e.sort(function(e, t) { return t.count - e.count }), i(e.slice(0, s.num));
                                    break;
                                default:
                                    t()
                            }
                        },
                        c = o["default"].get("Icarus.pages");
                    c ? u(c) : p.find().then(function(e) { e = e.map(function(e) { return e.attributes }), o["default"].set("Icarus.pages", e), u(e) }, e)
                }();
                else if (n.api.match(/^hk\.site/)) {
                    var d = new AV.Query("Site");
                    switch (d.equalTo("domain", c), n.api) {
                        case "hk.site.totalView":
                            d.first().then(function(e) { return i(e.get("count")) });
                            break;
                        default:
                            t()
                    }
                } else switch (n.api) {
                    case "hk.page.increment":
                        s.url = s.url || l, s.title = s.title || document.title, p.equalTo("url", s.url), p.find()["try"](function(e) { return e.length <= 0 ? (new f).save({ domain: c, url: s.url, title: s.title, count: 0 }) : AV.Promise.as(e[0]) })["try"](function(e) { return e.increment("count"), e.save() })["try"](function(e) {
                            e = e.attributes;
                            var t = o["default"].get("Icarus.pages");
                            if (t) {
                                for (var n = 0, r = t.length; r > n; n++)
                                    if (t[n].url === e.url) { t[n].count = e.count; break }
                                n === r && t.push(e), o["default"].set("Icarus.pages", t, !1)
                            }
                            i(e)
                        })["catch"](e);
                        break;
                    default:
                        t()
                }
            },
            clearLocalhost: function(e, t) {
                var n = this.APP_ID,
                    r = this.APP_KEY;
                AV.initialize(n, r);
                var a = new AV.Query("Page");
                a.startsWith("domain", "http://localhost"), a.destroyAll().then(function() { console.log("Clear localhost DONE."), e() }, t)
            },
            importData: function(e, t) {
                var n = this.APP_ID,
                    r = this.APP_KEY;
                AV.initialize(n, r);
                for (var a = AV.Object.extend("Page"), o = [], i = 0, u = t.length; u > i; i++) {
                    var s = new a;
                    s.set("domain", e), s.set("url", t[i].url), s.set("title", t[i].title), s.set("count", t[i].count), o.push(s.save())
                }
                AV.Promise.when.apply(AV.Promise, o)["try"](function() {})["catch"](function(e) { console.log(e) })
            }
        };
    window.Icarus = i, t["default"] = i
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(3),
        a = { EXPIRE_TIME: 300, isSupported: function() { return "false" === r.urlParams.storage ? !1 : !!localStorage }(), has: function(e) { if (!this.isSupported) return !1; var t = localStorage[e + "__created_time"]; return t && parseFloat(t) + 1e3 * this.EXPIRE_TIME > Date.now() }, get: function(e) { return this.isSupported ? this.has(e) ? JSON.parse(localStorage[e]) : void 0 : !1 }, set: function(e, t) { var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !0; return this.isSupported ? (localStorage[e] = JSON.stringify(t), void(n && (localStorage[e + "__created_time"] = Date.now()))) : !1 }, remove: function(e) { return this.isSupported ? localStorage.removeItem(e) : !1 }, clear: function() { return this.isSupported ? localStorage.clear() : !1 } };
    t["default"] = a
}, function(e, t) {
    "use strict";

    function n(e) {
        for (var t in e)
            if (e.hasOwnProperty(t)) return !1;
        return !0
    }

    function r(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3,
            n = e.toString();
        return [].reduce.call(n, function(e, r, a) { var o = (n.length - a - 1) % t === 0 && a !== n.length - 1; return e + r + (o ? "," : "") }, "")
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var a = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                o = void 0;
            try { for (var i, u = e[Symbol.iterator](); !(r = (i = u.next()).done) && (n.push(i.value), !t || n.length !== t); r = !0); } catch (s) { a = !0, o = s } finally { try {!r && u["return"] && u["return"]() } finally { if (a) throw o } }
            return n
        }
        return function(t, n) { if (Array.isArray(t)) return t; if (Symbol.iterator in Object(t)) return e(t, n); throw new TypeError("Invalid attempt to destructure non-iterable instance") }
    }();
    t.isEmpty = n, t.formatNumber = r;
    var o = (t.urlParams = {}, location.href),
        i = o.search(/\?/),
        u = void 0;
    if (-1 != i) {
        o = o.substr(i + 1), u = o.split("&");
        for (var s = 0; s < u.length; ++s) {
            var l = u[s].split("="),
                c = a(l, 2),
                f = c[0],
                p = c[1];
            utils.urlParams[f] = p
        }
    }
}, function(e, t) {
    "use strict";

    function n(e) { i ? e() : o.push(e) }

    function r() { i = !0, o.forEach(function(e) { e() }) }

    function a() { document.removeEventListener("DOMContentLoaded", a), window.removeEventListener("load", a), r() }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o = [],
        i = !1;
    ! function() { "complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll ? setTimeout(r, 0) : (document.addEventListener("DOMContentLoaded", a), window.addEventListener("load", a)) }(), t["default"] = n
}, function(e, t, n) {
    var r = n(6);
    "string" == typeof r && (r = [
        [e.id, r, ""]
    ]);
    n(8)(r, {});
    r.locals && (e.exports = r.locals)
}, function(e, t, n) { t = e.exports = n(7)(), t.push([e.id, "[data-hk-top-pages]{color:#333}.hit-kounter-top-title{padding:5px;margin:.3em 0 .4em;font-size:16px}.hit-kounter-top-table{width:100%;border-collapse:collapse;font-size:16px}.hit-kounter-top-table td{padding:10px 5px}.hit-kounter-top-table td:last-child{text-align:right}.hit-kounter-top-table tr{border-top:1px solid #aaa}.hit-kounter-top-table a{color:#5890ad;text-decoration:none}", ""]) }, function(e, t) {
    e.exports = function() {
        var e = [];
        return e.toString = function() {
            for (var e = [], t = 0; t < this.length; t++) {
                var n = this[t];
                n[2] ? e.push("@media " + n[2] + "{" + n[1] + "}") : e.push(n[1])
            }
            return e.join("")
        }, e.i = function(t, n) {
            "string" == typeof t && (t = [
                [null, t, ""]
            ]);
            for (var r = {}, a = 0; a < this.length; a++) { var o = this[a][0]; "number" == typeof o && (r[o] = !0) }
            for (a = 0; a < t.length; a++) { var i = t[a]; "number" == typeof i[0] && r[i[0]] || (n && !i[2] ? i[2] = n : n && (i[2] = "(" + i[2] + ") and (" + n + ")"), e.push(i)) }
        }, e
    }
}, function(e, t, n) {
    function r(e, t) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n],
                a = d[r.id];
            if (a) { a.refs++; for (var o = 0; o < a.parts.length; o++) a.parts[o](r.parts[o]); for (; o < r.parts.length; o++) a.parts.push(l(r.parts[o], t)) } else {
                for (var i = [], o = 0; o < r.parts.length; o++) i.push(l(r.parts[o], t));
                d[r.id] = { id: r.id, refs: 1, parts: i }
            }
        }
    }

    function a(e) {
        for (var t = [], n = {}, r = 0; r < e.length; r++) {
            var a = e[r],
                o = a[0],
                i = a[1],
                u = a[2],
                s = a[3],
                l = { css: i, media: u, sourceMap: s };
            n[o] ? n[o].parts.push(l) : t.push(n[o] = { id: o, parts: [l] })
        }
        return t
    }

    function o(e, t) {
        var n = v(),
            r = b[b.length - 1];
        if ("top" === e.insertAt) r ? r.nextSibling ? n.insertBefore(t, r.nextSibling) : n.appendChild(t) : n.insertBefore(t, n.firstChild), b.push(t);
        else {
            if ("bottom" !== e.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
            n.appendChild(t)
        }
    }

    function i(e) {
        e.parentNode.removeChild(e);
        var t = b.indexOf(e);
        t >= 0 && b.splice(t, 1)
    }

    function u(e) { var t = document.createElement("style"); return t.type = "text/css", o(e, t), t }

    function s(e) { var t = document.createElement("link"); return t.rel = "stylesheet", o(e, t), t }

    function l(e, t) {
        var n, r, a;
        if (t.singleton) {
            var o = y++;
            n = m || (m = u(t)), r = c.bind(null, n, o, !1), a = c.bind(null, n, o, !0)
        } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = s(t), r = p.bind(null, n), a = function() { i(n), n.href && URL.revokeObjectURL(n.href) }) : (n = u(t), r = f.bind(null, n), a = function() { i(n) });
        return r(e),
            function(t) {
                if (t) {
                    if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                    r(e = t)
                } else a()
            }
    }

    function c(e, t, n, r) {
        var a = n ? "" : r.css;
        if (e.styleSheet) e.styleSheet.cssText = w(t, a);
        else {
            var o = document.createTextNode(a),
                i = e.childNodes;
            i[t] && e.removeChild(i[t]), i.length ? e.insertBefore(o, i[t]) : e.appendChild(o)
        }
    }

    function f(e, t) {
        var n = t.css,
            r = t.media;
        if (r && e.setAttribute("media", r), e.styleSheet) e.styleSheet.cssText = n;
        else {
            for (; e.firstChild;) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(n))
        }
    }

    function p(e, t) {
        var n = t.css,
            r = t.sourceMap;
        r && (n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */");
        var a = new Blob([n], { type: "text/css" }),
            o = e.href;
        e.href = URL.createObjectURL(a), o && URL.revokeObjectURL(o)
    }
    var d = {},
        h = function(e) { var t; return function() { return "undefined" == typeof t && (t = e.apply(this, arguments)), t } },
        g = h(function() { return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase()) }),
        v = h(function() { return document.head || document.getElementsByTagName("head")[0] }),
        m = null,
        y = 0,
        b = [];
    e.exports = function(e, t) {
        t = t || {}, "undefined" == typeof t.singleton && (t.singleton = g()), "undefined" == typeof t.insertAt && (t.insertAt = "bottom");
        var n = a(e);
        return r(n, t),
            function(e) {
                for (var o = [], i = 0; i < n.length; i++) {
                    var u = n[i],
                        s = d[u.id];
                    s.refs--, o.push(s)
                }
                if (e) {
                    var l = a(e);
                    r(l, t)
                }
                for (var i = 0; i < o.length; i++) {
                    var s = o[i];
                    if (0 === s.refs) {
                        for (var c = 0; c < s.parts.length; c++) s.parts[c]();
                        delete d[s.id]
                    }
                }
            }
    };
    var w = function() { var e = []; return function(t, n) { return e[t] = n, e.filter(Boolean).join("\n") } }()
}, function(e, t, n) {
    var r = n(10);
    e.exports = function(e) {
        var t, n = [],
            a = e || {};
        return function(e, a, o) {
            n.push('<h3 class="hit-kounter-top-title">本站访问量 Top ' + r.escape(null == (t = e) ? "" : t) + '</h3><table class="hit-kounter-top-table">'),
                function() {
                    var e = a;
                    if ("number" == typeof e.length)
                        for (var o = 0, i = e.length; i > o; o++) {
                            var u = e[o];
                            n.push("<tr><td><a" + r.attr("href", u.url, !0, !0) + ">" + r.escape(null == (t = u.title) ? "" : t) + "</a></td><td>" + r.escape(null == (t = u.count) ? "" : t) + "</td></tr>")
                        } else {
                            var i = 0;
                            for (var o in e) {
                                i++;
                                var u = e[o];
                                n.push("<tr><td><a" + r.attr("href", u.url, !0, !0) + ">" + r.escape(null == (t = u.title) ? "" : t) + "</a></td><td>" + r.escape(null == (t = u.count) ? "" : t) + "</td></tr>")
                            }
                        }
                }.call(this), n.push("</table>")
        }.call(this, "num" in a ? a.num : "undefined" != typeof num ? num : void 0, "pages" in a ? a.pages : "undefined" != typeof pages ? pages : void 0, "undefined" in a ? a.undefined : void 0), n.join("")
    }
}, function(e, t, n) {
    "use strict";

    function r(e) { return null != e && "" !== e }

    function a(e) { return (Array.isArray(e) ? e.map(a) : e && "object" == typeof e ? Object.keys(e).filter(function(t) { return e[t] }) : [e]).filter(r).join(" ") }

    function o(e) { return u[e] || e }

    function i(e) { var t = String(e).replace(s, o); return t === "" + e ? e : t }
    t.merge = function l(e, t) {
        if (1 === arguments.length) { for (var n = e[0], a = 1; a < e.length; a++) n = l(n, e[a]); return n }
        var o = e["class"],
            i = t["class"];
        (o || i) && (o = o || [], i = i || [], Array.isArray(o) || (o = [o]), Array.isArray(i) || (i = [i]), e["class"] = o.concat(i).filter(r));
        for (var u in t) "class" != u && (e[u] = t[u]);
        return e
    }, t.joinClasses = a, t.cls = function(e, n) { for (var r = [], o = 0; o < e.length; o++) n && n[o] ? r.push(t.escape(a([e[o]]))) : r.push(a(e[o])); var i = a(r); return i.length ? ' class="' + i + '"' : "" }, t.style = function(e) { return e && "object" == typeof e ? Object.keys(e).map(function(t) { return t + ":" + e[t] }).join(";") : e }, t.attr = function(e, n, r, a) { return "style" === e && (n = t.style(n)), "boolean" == typeof n || null == n ? n ? " " + (a ? e : e + '="' + e + '"') : "" : 0 == e.indexOf("data") && "string" != typeof n ? (-1 !== JSON.stringify(n).indexOf("&") && console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"), n && "function" == typeof n.toISOString && console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0"), " " + e + "='" + JSON.stringify(n).replace(/'/g, "&apos;") + "'") : r ? (n && "function" == typeof n.toISOString && console.warn("Jade will stringify dates in ISO form after 2.0.0"), " " + e + '="' + t.escape(n) + '"') : (n && "function" == typeof n.toISOString && console.warn("Jade will stringify dates in ISO form after 2.0.0"), " " + e + '="' + n + '"') }, t.attrs = function(e, n) {
        var r = [],
            o = Object.keys(e);
        if (o.length)
            for (var i = 0; i < o.length; ++i) {
                var u = o[i],
                    s = e[u];
                "class" == u ? (s = a(s)) && r.push(" " + u + '="' + s + '"') : r.push(t.attr(u, s, !1, n))
            }
        return r.join("")
    };
    var u = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" },
        s = /[&<>"]/g;
    t.escape = i, t.rethrow = function c(e, t, r, a) {
        if (!(e instanceof Error)) throw e;
        if (!("undefined" == typeof window && t || a)) throw e.message += " on line " + r, e;
        try { a = a || n(11).readFileSync(t, "utf8") } catch (o) { c(e, null, r) }
        var i = 3,
            u = a.split("\n"),
            s = Math.max(r - i, 0),
            l = Math.min(u.length, r + i),
            i = u.slice(s, l).map(function(e, t) { var n = t + s + 1; return (n == r ? "  > " : "    ") + n + "| " + e }).join("\n");
        throw e.path = t, e.message = (t || "Jade") + ":" + r + "\n" + i + "\n\n" + e.message, e
    }, t.DebugItem = function(e, t) { this.lineno = e, this.filename = t }
}, function(e, t) {}]);