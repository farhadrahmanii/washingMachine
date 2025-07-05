//af
var __HOST = 'https://stayrealchat.com/';
var __SOCKET_HOST = 'wss://www.stayrealchat.com:7272';
var __UID = 32;
var __VERSION_CHAT = '1.0.2506181734';






function loadCss(url, callback) {
    window._loadedFilesW = window._loadedFilesW || {};
    if (!window._loadedFilesW[url]) {
        window._loadedFilesW[url] = true;
        let l = document.createElement('link');
        l.rel = 'stylesheet';
        l.type = 'text/css';
        l.href = url;
        document.getElementsByTagName('head')[0].appendChild(l);
        if (l.readyState) {
            // IE
            l.onreadystatechange = function () {
                if (l.readyState === 'loaded' || l.readyState === 'complete') {
                    l.onreadystatechange = null;
                    callback && callback();
                }
            };
        } else {
            l.onload = function () {
                callback && callback();
            };
        }
    } else {
        callback && callback();
    }
}

function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (typeof (callback) != "undefined") {
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function () {
                callback();
            };
        }
    }
    script.src = url;
    document.body.appendChild(script);
}


// 声音
function playSound() {
    try {
        var borswer = window.navigator.userAgent.toLowerCase();
        if (borswer.indexOf("ie") >= 0) {
            //IE内核浏览器
            var strEmbed = '<embed name="embedPlay" src="' + __HOST + 'images/chat.mp3" autostart="true" hidden="true" loop="false"></embed>';
            if ($("body").find("embed").length <= 0)
                $("body").append(strEmbed);
            var embed = document.embedPlay;
            //浏览器不支持 audion，则使用 embed 播放
            embed.volume = 100;
            //embed.play();这个不需要
        } else {
            //非IE内核浏览器
            var strAudio = '<audio id="audioPlay" src="' + __HOST + 'images/chat.mp3" hidden="true">';
            if ($("body").find("audio").length <= 0)
                $("body").append(strAudio);
            var audio = document.getElementById("audioPlay");
            //浏览器支持 audion
            audio.play();
        }
    } catch (err) {
        console.log("错误信息：" + err.message);
        array = []
    }
}

loadCss(__HOST + 'chat/css/main.css?v=' + __VERSION_CHAT, function (data) {
});
loadCss(__HOST + 'chat/css/jquery-sinaEmotion-2.1.0.min.css?v=' + __VERSION_CHAT, function (data) {
});

loadScript(__HOST + 'chat/css/iconfont/iconfont.js?v=' + __VERSION_CHAT, function (data) {
});
loadCss(__HOST + 'chat/css/iconfont/iconfont.css?v=' + __VERSION_CHAT, function (data) {
});
// loadCss('https://unpkg.com/layui@2.6.8/dist/css/layui.css', function (data) {
// });
// loadScript("https://unpkg.com/layui@2.6.8/dist/layui.js", function () {
// });
loadScript(__HOST + 'chat/js/alirtc/aliyun-webrtc-sdk.js?v=' + __VERSION_CHAT, function (data) { });
loadScript(__HOST + 'chat/js/alirtc/sha256.js?v=' + __VERSION_CHAT, function (data) { });
loadScript(__HOST + 'chat/js/alirtc/alirtc.js?v=' + __VERSION_CHAT, function (data) { });

/*!
* jQuery Sina Emotion v2.1.0
* http://www.clanfei.com/
*
* Copyright 2012-2014 Lanfei
* Released under the MIT license
*
* Date: 2014-05-19T20:10:23+0800
*/
(function ($) {
    var $target;
    var options;
    var emotions;
    var categories;
    var emotionsMap;
    var parsingArray = [];
    var defCategory = "默认";
    var initEvents = function () {
        $("body").bind({
            click: function () {
                $("#sinaEmotion").hide()
            }
        });
        $("#sinaEmotion").bind({
            click: function (event) {
                event.stopPropagation()
            }
        }).delegate(".prev", {
            click: function (event) {
                var page = $("#sinaEmotion .categories").data("page");
                showCatPage(page - 1);
                event.preventDefault()
            }
        }).delegate(".next", {
            click: function (event) {
                var page = $("#sinaEmotion .categories").data("page");
                showCatPage(page + 1);
                event.preventDefault()
            }
        }).delegate(".category", {
            click: function (event) {
                $("#sinaEmotion .categories .current").removeClass("current");
                showCategory($.trim($(this).addClass("current").text()));
                event.preventDefault()
            }
        }).delegate(".page", {
            click: function (event) {
                $("#sinaEmotion .pages .current").removeClass("current");
                var page = parseInt($(this).addClass("current").text() - 1);
                showFacePage(page);
                event.preventDefault()
            }
        }).delegate(".face", {
            click: function (event) {
                $("#sinaEmotion").hide();
                $target.insertText($(this).children("img").prop("alt"));
                event.preventDefault()
            }
        })
    };
    var loadEmotions = function (callback) {
        if (emotions) {
            callback && callback();
            return
        }
        if (!options) {
            options = $.fn.sinaEmotion.options
        }
        emotions = {};
        categories = [];
        emotionsMap = {};
        $("body").append('<div id="sinaEmotion">正在加载，请稍后...</div>');
        initEvents();
        $.getJSON("https://api.weibo.com/2/emotions.json?callback=?", {
            source: options.appKey,
            language: options.language
        }, function (json) {
            var item, category;
            var data = json.data;
            $("#sinaEmotion").html('<ul class="categories" style="display: none;"></ul><ul class="faces">');
            for (var i = 0, l = data.length; i < l; ++i) {
                item = data[i];
                category = item.category || defCategory;
                if (!emotions[category]) {
                    emotions[category] = [];
                    categories.push(category)
                }
                emotions[category].push({ icon: item.icon, phrase: item.phrase });
                emotionsMap[item.phrase] = item.icon
            }
            $(parsingArray).parseEmotion();
            parsingArray = null;
            callback && callback()
        })
    };
    var showCatPage = function (page) {
        var html = "";
        var length = categories.length;
        var maxPage = Math.ceil(length / 5);
        var $categories = $("#sinaEmotion .categories");
        var category = $categories.data("category") || defCategory;
        page = (page + maxPage) % maxPage;
        for (var i = page * 5; i < length && i < (page + 1) * 5; ++i) {
            html += '<li class="item"><a href="#" class="category' + (category == categories[i] ? " current" : "") + '">' + categories[i] + "</a></li>"
        }
        $categories.data("page", page).html(html)
    };
    var showCategory = function (category) {
        $("#sinaEmotion .categories").data("category", category);
        showFacePage(0);
        showPages()
    };
    var showFacePage = function (page) {
        var face;
        var html = "";
        var pageHtml = "";
        var rows = options.rows;
        var category = $("#sinaEmotion .categories").data("category");
        var faces = emotions[category];
        page = page || 0;
        for (var i = page * rows, l = faces.length; i < l && i < (page + 1) * rows; ++i) {
            face = faces[i];
            html += '<li class="item"><a href="#" class="face"><img class="sina-emotion" style="width: 100%;" src="' + face.icon + '" alt="' + face.phrase + '" /></a></li>'
        }
        $("#sinaEmotion .faces").html(html)
    };
    var showPages = function () {
        var html = "";
        var rows = options.rows;
        var category = $("#sinaEmotion .categories").data("category");
        var faces = emotions[category];
        var length = faces.length;
        if (length > rows) {
            for (var i = 0, l = Math.ceil(length / rows); i < l; ++i) {
                html += '<li class="item"><a href="#" class="page' + (i == 0 ? " current" : "") + '">' + (i + 1) + "</a></li>"
            }
            $("#sinaEmotion .pages").html(html).show()
        } else {
            $("#sinaEmotion .pages").hide()
        }
    };
    $.fn.sinaEmotion = function (target) {
        target = target || function () {
            return $(this).parents("form").find("textarea,input[type=text]").eq(0)
        };
        var $that = $(this).last();
        var offset = $that.offset();
        if ($that.is(":visible")) {
            if (typeof target == "function") {
                $target = target.call($that)
            } else {
                $target = $(target)
            }
            loadEmotions(function () {
                showCategory(defCategory);
                showCatPage(0)
            });
            $("#sinaEmotion").css({ right: 8, bottom: 44, "z-index": 1e7 }).show()
        }
        return this
    };
    $.fn.parseEmotion = function () {
        if (!categories) {
            parsingArray = $(this);
            loadEmotions()
        } else if (categories.length == 0) {
            parsingArray = parsingArray.add($(this))
        } else {
            $(this).each(function () {
                var $this = $(this);
                var html = $this.html();
                html = html.replace(/<.*?>/g, function ($1) {
                    $1 = $1.replace("[", "&#91;");
                    $1 = $1.replace("]", "&#93;");
                    return $1
                }).replace(/\[[^\[\]]*?\]/g, function ($1) {
                    var url = emotionsMap[$1];
                    if (url) {
                        return '<img class="sina-emotion" src="' + url + '" alt="' + $1 + '" />'
                    }
                    return $1
                });
                $this.html(html)
            })
        }
        return this
    };
    $.fn.insertText = function (text) {
        this.each(function () {
            if (this.tagName !== "INPUT" && this.tagName !== "TEXTAREA") {
                return
            }
            if (document.selection) {
                this.focus();
                var cr = document.selection.createRange();
                cr.text = text;
                cr.collapse();
                cr.select()
            } else if (this.selectionStart !== undefined) {
                var start = this.selectionStart;
                var end = this.selectionEnd;
                this.value = this.value.substring(0, start) + text + this.value.substring(end, this.value.length);
                this.selectionStart = this.selectionEnd = start + text.length
            } else {
                this.value += text
            }
        });
        return this
    };
    $.fn.sinaEmotion.options = { rows: 72, language: "cnname", appKey: "1362404091" }
})(jQuery);


/*	SWFObject v2.2 <http://code.google.com/p/swfobject/>
is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
var swfobject = function () {
    var D = "undefined", r = "object", S = "Shockwave Flash", W = "ShockwaveFlash.ShockwaveFlash",
        q = "application/x-shockwave-flash", R = "SWFObjectExprInst", x = "onreadystatechange", O = window,
        j = document, t = navigator, T = false, U = [h], o = [], N = [], I = [], l, Q, E, B, J = false, a = false, n, G,
        m = true, M = function () {
            var aa = typeof j.getElementById != D && typeof j.getElementsByTagName != D && typeof j.createElement != D,
                ah = t.userAgent.toLowerCase(), Y = t.platform.toLowerCase(), ae = Y ? /win/.test(Y) : /win/.test(ah),
                ac = Y ? /mac/.test(Y) : /mac/.test(ah),
                af = /webkit/.test(ah) ? parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, X = !+"\v1",
                ag = [0, 0, 0], ab = null;
            if (typeof t.plugins != D && typeof t.plugins[S] == r) {
                ab = t.plugins[S].description;
                if (ab && !(typeof t.mimeTypes != D && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) {
                    T = true;
                    X = false;
                    ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10);
                    ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                    ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
                }
            } else {
                if (typeof O.ActiveXObject != D) {
                    try {
                        var ad = new ActiveXObject(W);
                        if (ad) {
                            ab = ad.GetVariable("$version");
                            if (ab) {
                                X = true;
                                ab = ab.split(" ")[1].split(",");
                                ag = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                            }
                        }
                    } catch (Z) {
                    }
                }
            }
            return { w3: aa, pv: ag, wk: af, ie: X, win: ae, mac: ac }
        }(), k = function () {
            if (!M.w3) {
                return
            }
            if (typeof j.readyState != D && j.readyState == "complete" || typeof j.readyState == D && (j.getElementsByTagName("body")[0] || j.body)) {
                f()
            }
            if (!J) {
                if (typeof j.addEventListener != D) {
                    j.addEventListener("DOMContentLoaded", f, false)
                }
                if (M.ie && M.win) {
                    j.attachEvent(x, function () {
                        if (j.readyState == "complete") {
                            j.detachEvent(x, arguments.callee);
                            f()
                        }
                    });
                    if (O == top) {
                        (function () {
                            if (J) {
                                return
                            }
                            try {
                                j.documentElement.doScroll("left")
                            } catch (X) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            f()
                        })()
                    }
                }
                if (M.wk) {
                    (function () {
                        if (J) {
                            return
                        }
                        if (!/loaded|complete/.test(j.readyState)) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        f()
                    })()
                }
                s(f)
            }
        }();

    function f() {
        if (J) {
            return
        }
        try {
            var Z = j.getElementsByTagName("body")[0].appendChild(C("span"));
            Z.parentNode.removeChild(Z)
        } catch (aa) {
            return
        }
        J = true;
        var X = U.length;
        for (var Y = 0; Y < X; Y++) {
            U[Y]()
        }
    }

    function K(X) {
        if (J) {
            X()
        } else {
            U[U.length] = X
        }
    }

    function s(Y) {
        if (typeof O.addEventListener != D) {
            O.addEventListener("load", Y, false)
        } else {
            if (typeof j.addEventListener != D) {
                j.addEventListener("load", Y, false)
            } else {
                if (typeof O.attachEvent != D) {
                    i(O, "onload", Y)
                } else {
                    if (typeof O.onload == "function") {
                        var X = O.onload;
                        O.onload = function () {
                            X();
                            Y()
                        }
                    } else {
                        O.onload = Y
                    }
                }
            }
        }
    }

    function h() {
        if (T) {
            V()
        } else {
            H()
        }
    }

    function V() {
        var X = j.getElementsByTagName("body")[0];
        var aa = C(r);
        aa.setAttribute("type", q);
        var Z = X.appendChild(aa);
        if (Z) {
            var Y = 0;
            (function () {
                if (typeof Z.GetVariable != D) {
                    var ab = Z.GetVariable("$version");
                    if (ab) {
                        ab = ab.split(" ")[1].split(",");
                        M.pv = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                    }
                } else {
                    if (Y < 10) {
                        Y++;
                        setTimeout(arguments.callee, 10);
                        return
                    }
                }
                X.removeChild(aa);
                Z = null;
                H()
            })()
        } else {
            H()
        }
    }

    function H() {
        var ag = o.length;
        if (ag > 0) {
            for (var af = 0; af < ag; af++) {
                var Y = o[af].id;
                var ab = o[af].callbackFn;
                var aa = { success: false, id: Y };
                if (M.pv[0] > 0) {
                    var ae = c(Y);
                    if (ae) {
                        if (F(o[af].swfVersion) && !(M.wk && M.wk < 312)) {
                            w(Y, true);
                            if (ab) {
                                aa.success = true;
                                aa.ref = z(Y);
                                ab(aa)
                            }
                        } else {
                            if (o[af].expressInstall && A()) {
                                var ai = {};
                                ai.data = o[af].expressInstall;
                                ai.width = ae.getAttribute("width") || "0";
                                ai.height = ae.getAttribute("height") || "0";
                                if (ae.getAttribute("class")) {
                                    ai.styleclass = ae.getAttribute("class")
                                }
                                if (ae.getAttribute("align")) {
                                    ai.align = ae.getAttribute("align")
                                }
                                var ah = {};
                                var X = ae.getElementsByTagName("param");
                                var ac = X.length;
                                for (var ad = 0; ad < ac; ad++) {
                                    if (X[ad].getAttribute("name").toLowerCase() != "movie") {
                                        ah[X[ad].getAttribute("name")] = X[ad].getAttribute("value")
                                    }
                                }
                                P(ai, ah, Y, ab)
                            } else {
                                p(ae);
                                if (ab) {
                                    ab(aa)
                                }
                            }
                        }
                    }
                } else {
                    w(Y, true);
                    if (ab) {
                        var Z = z(Y);
                        if (Z && typeof Z.SetVariable != D) {
                            aa.success = true;
                            aa.ref = Z
                        }
                        ab(aa)
                    }
                }
            }
        }
    }

    function z(aa) {
        var X = null;
        var Y = c(aa);
        if (Y && Y.nodeName == "OBJECT") {
            if (typeof Y.SetVariable != D) {
                X = Y
            } else {
                var Z = Y.getElementsByTagName(r)[0];
                if (Z) {
                    X = Z
                }
            }
        }
        return X
    }

    function A() {
        return !a && F("6.0.65") && (M.win || M.mac) && !(M.wk && M.wk < 312)
    }

    function P(aa, ab, X, Z) {
        a = true;
        E = Z || null;
        B = { success: false, id: X };
        var ae = c(X);
        if (ae) {
            if (ae.nodeName == "OBJECT") {
                l = g(ae);
                Q = null
            } else {
                l = ae;
                Q = X
            }
            aa.id = R;
            if (typeof aa.width == D || !/%$/.test(aa.width) && parseInt(aa.width, 10) < 310) {
                aa.width = "310"
            }
            if (typeof aa.height == D || !/%$/.test(aa.height) && parseInt(aa.height, 10) < 137) {
                aa.height = "137"
            }
            j.title = j.title.slice(0, 47) + " - Flash Player Installation";
            var ad = M.ie && M.win ? "ActiveX" : "PlugIn",
                ac = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + ad + "&MMdoctitle=" + j.title;
            if (typeof ab.flashvars != D) {
                ab.flashvars += "&" + ac
            } else {
                ab.flashvars = ac
            }
            if (M.ie && M.win && ae.readyState != 4) {
                var Y = C("div");
                X += "SWFObjectNew";
                Y.setAttribute("id", X);
                ae.parentNode.insertBefore(Y, ae);
                ae.style.display = "none";
                (function () {
                    if (ae.readyState == 4) {
                        ae.parentNode.removeChild(ae)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            }
            u(aa, ab, X)
        }
    }

    function p(Y) {
        if (M.ie && M.win && Y.readyState != 4) {
            var X = C("div");
            Y.parentNode.insertBefore(X, Y);
            X.parentNode.replaceChild(g(Y), X);
            Y.style.display = "none";
            (function () {
                if (Y.readyState == 4) {
                    Y.parentNode.removeChild(Y)
                } else {
                    setTimeout(arguments.callee, 10)
                }
            })()
        } else {
            Y.parentNode.replaceChild(g(Y), Y)
        }
    }

    function g(ab) {
        var aa = C("div");
        if (M.win && M.ie) {
            aa.innerHTML = ab.innerHTML
        } else {
            var Y = ab.getElementsByTagName(r)[0];
            if (Y) {
                var ad = Y.childNodes;
                if (ad) {
                    var X = ad.length;
                    for (var Z = 0; Z < X; Z++) {
                        if (!(ad[Z].nodeType == 1 && ad[Z].nodeName == "PARAM") && !(ad[Z].nodeType == 8)) {
                            aa.appendChild(ad[Z].cloneNode(true))
                        }
                    }
                }
            }
        }
        return aa
    }

    function u(ai, ag, Y) {
        var X, aa = c(Y);
        if (M.wk && M.wk < 312) {
            return X
        }
        if (aa) {
            if (typeof ai.id == D) {
                ai.id = Y
            }
            if (M.ie && M.win) {
                var ah = "";
                for (var ae in ai) {
                    if (ai[ae] != Object.prototype[ae]) {
                        if (ae.toLowerCase() == "data") {
                            ag.movie = ai[ae]
                        } else {
                            if (ae.toLowerCase() == "styleclass") {
                                ah += ' class="' + ai[ae] + '"'
                            } else {
                                if (ae.toLowerCase() != "classid") {
                                    ah += " " + ae + '="' + ai[ae] + '"'
                                }
                            }
                        }
                    }
                }
                var af = "";
                for (var ad in ag) {
                    if (ag[ad] != Object.prototype[ad]) {
                        af += '<param name="' + ad + '" value="' + ag[ad] + '" />'
                    }
                }
                aa.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + ah + ">" + af + "</object>";
                N[N.length] = ai.id;
                X = c(ai.id)
            } else {
                var Z = C(r);
                Z.setAttribute("type", q);
                for (var ac in ai) {
                    if (ai[ac] != Object.prototype[ac]) {
                        if (ac.toLowerCase() == "styleclass") {
                            Z.setAttribute("class", ai[ac])
                        } else {
                            if (ac.toLowerCase() != "classid") {
                                Z.setAttribute(ac, ai[ac])
                            }
                        }
                    }
                }
                for (var ab in ag) {
                    if (ag[ab] != Object.prototype[ab] && ab.toLowerCase() != "movie") {
                        e(Z, ab, ag[ab])
                    }
                }
                aa.parentNode.replaceChild(Z, aa);
                X = Z
            }
        }
        return X
    }

    function e(Z, X, Y) {
        var aa = C("param");
        aa.setAttribute("name", X);
        aa.setAttribute("value", Y);
        Z.appendChild(aa)
    }

    function y(Y) {
        var X = c(Y);
        if (X && X.nodeName == "OBJECT") {
            if (M.ie && M.win) {
                X.style.display = "none";
                (function () {
                    if (X.readyState == 4) {
                        b(Y)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            } else {
                X.parentNode.removeChild(X)
            }
        }
    }

    function b(Z) {
        var Y = c(Z);
        if (Y) {
            for (var X in Y) {
                if (typeof Y[X] == "function") {
                    Y[X] = null
                }
            }
            Y.parentNode.removeChild(Y)
        }
    }

    function c(Z) {
        var X = null;
        try {
            X = j.getElementById(Z)
        } catch (Y) {
        }
        return X
    }

    function C(X) {
        return j.createElement(X)
    }

    function i(Z, X, Y) {
        Z.attachEvent(X, Y);
        I[I.length] = [Z, X, Y]
    }

    function F(Z) {
        var Y = M.pv, X = Z.split(".");
        X[0] = parseInt(X[0], 10);
        X[1] = parseInt(X[1], 10) || 0;
        X[2] = parseInt(X[2], 10) || 0;
        return Y[0] > X[0] || Y[0] == X[0] && Y[1] > X[1] || Y[0] == X[0] && Y[1] == X[1] && Y[2] >= X[2] ? true : false
    }

    function v(ac, Y, ad, ab) {
        if (M.ie && M.mac) {
            return
        }
        var aa = j.getElementsByTagName("head")[0];
        if (!aa) {
            return
        }
        var X = ad && typeof ad == "string" ? ad : "screen";
        if (ab) {
            n = null;
            G = null
        }
        if (!n || G != X) {
            var Z = C("style");
            Z.setAttribute("type", "text/css");
            Z.setAttribute("media", X);
            n = aa.appendChild(Z);
            if (M.ie && M.win && typeof j.styleSheets != D && j.styleSheets.length > 0) {
                n = j.styleSheets[j.styleSheets.length - 1]
            }
            G = X
        }
        if (M.ie && M.win) {
            if (n && typeof n.addRule == r) {
                n.addRule(ac, Y)
            }
        } else {
            if (n && typeof j.createTextNode != D) {
                n.appendChild(j.createTextNode(ac + " {" + Y + "}"))
            }
        }
    }

    function w(Z, X) {
        if (!m) {
            return
        }
        var Y = X ? "visible" : "hidden";
        if (J && c(Z)) {
            c(Z).style.visibility = Y
        } else {
            v("#" + Z, "visibility:" + Y)
        }
    }

    function L(Y) {
        var Z = /[\\\"<>\.;]/;
        var X = Z.exec(Y) != null;
        return X && typeof encodeURIComponent != D ? encodeURIComponent(Y) : Y
    }

    var d = function () {
        if (M.ie && M.win) {
            window.attachEvent("onunload", function () {
                var ac = I.length;
                for (var ab = 0; ab < ac; ab++) {
                    I[ab][0].detachEvent(I[ab][1], I[ab][2])
                }
                var Z = N.length;
                for (var aa = 0; aa < Z; aa++) {
                    y(N[aa])
                }
                for (var Y in M) {
                    M[Y] = null
                }
                M = null;
                for (var X in swfobject) {
                    swfobject[X] = null
                }
                swfobject = null
            })
        }
    }();
    return {
        registerObject: function (ab, X, aa, Z) {
            if (M.w3 && ab && X) {
                var Y = {};
                Y.id = ab;
                Y.swfVersion = X;
                Y.expressInstall = aa;
                Y.callbackFn = Z;
                o[o.length] = Y;
                w(ab, false)
            } else {
                if (Z) {
                    Z({ success: false, id: ab })
                }
            }
        }, getObjectById: function (X) {
            if (M.w3) {
                return z(X)
            }
        }, embedSWF: function (ab, ah, ae, ag, Y, aa, Z, ad, af, ac) {
            var X = { success: false, id: ah };
            if (M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y) {
                w(ah, false);
                K(function () {
                    ae += "";
                    ag += "";
                    var aj = {};
                    if (af && typeof af === r) {
                        for (var al in af) {
                            aj[al] = af[al]
                        }
                    }
                    aj.data = ab;
                    aj.width = ae;
                    aj.height = ag;
                    var am = {};
                    if (ad && typeof ad === r) {
                        for (var ak in ad) {
                            am[ak] = ad[ak]
                        }
                    }
                    if (Z && typeof Z === r) {
                        for (var ai in Z) {
                            if (typeof am.flashvars != D) {
                                am.flashvars += "&" + ai + "=" + Z[ai]
                            } else {
                                am.flashvars = ai + "=" + Z[ai]
                            }
                        }
                    }
                    if (F(Y)) {
                        var an = u(aj, am, ah);
                        if (aj.id == ah) {
                            w(ah, true)
                        }
                        X.success = true;
                        X.ref = an
                    } else {
                        if (aa && A()) {
                            aj.data = aa;
                            P(aj, am, ah, ac);
                            return
                        } else {
                            w(ah, true)
                        }
                    }
                    if (ac) {
                        ac(X)
                    }
                })
            } else {
                if (ac) {
                    ac(X)
                }
            }
        }, switchOffAutoHideShow: function () {
            m = false
        }, ua: M, getFlashPlayerVersion: function () {
            return { major: M.pv[0], minor: M.pv[1], release: M.pv[2] }
        }, hasFlashPlayerVersion: F, createSWF: function (Z, Y, X) {
            if (M.w3) {
                return u(Z, Y, X)
            } else {
                return undefined
            }
        }, showExpressInstall: function (Z, aa, X, Y) {
            if (M.w3 && A()) {
                P(Z, aa, X, Y)
            }
        }, removeSWF: function (X) {
            if (M.w3) {
                y(X)
            }
        }, createCSS: function (aa, Z, Y, X) {
            if (M.w3) {
                v(aa, Z, Y, X)
            }
        }, addDomLoadEvent: K, addLoadEvent: s, getQueryParamValue: function (aa) {
            var Z = j.location.search || j.location.hash;
            if (Z) {
                if (/\?/.test(Z)) {
                    Z = Z.split("?")[1]
                }
                if (aa == null) {
                    return L(Z)
                }
                var Y = Z.split("&");
                for (var X = 0; X < Y.length; X++) {
                    if (Y[X].substring(0, Y[X].indexOf("=")) == aa) {
                        return L(Y[X].substring(Y[X].indexOf("=") + 1))
                    }
                }
            }
            return ""
        }, expressInstallCallback: function () {
            if (a) {
                var X = c(R);
                if (X && l) {
                    X.parentNode.replaceChild(l, X);
                    if (Q) {
                        w(Q, true);
                        if (M.ie && M.win) {
                            l.style.display = "block"
                        }
                    }
                    if (E) {
                        E(B)
                    }
                }
                a = false
            }
        }
    }
}();


/**
* Copyright: Hiroshi Ichikawa <http://gimite.net/en/>
* License: New BSD License
* Reference: http://dev.w3.org/html5/websockets/
* Reference: http://tools.ietf.org/html/rfc6455
*/
(function () {
    if (window.WEB_SOCKET_FORCE_FLASH) {
    } else if (window.WebSocket) {
        return
    } else if (window.MozWebSocket) {
        window.WebSocket = MozWebSocket;
        return
    }
    var logger;
    if (window.WEB_SOCKET_LOGGER) {
        logger = WEB_SOCKET_LOGGER
    } else if (window.console && window.console.log && window.console.error) {
        logger = window.console
    } else {
        logger = {
            log: function () {
            }, error: function () {
            }
        }
    }
    if (swfobject.getFlashPlayerVersion().major < 10) {
        logger.error("Flash Player >= 10.0.0 is required.");
        return
    }
    if (location.protocol == "file:") {
        logger.error("WARNING: web-socket-js doesn't work in file:///... URL " + "unless you set Flash Security Settings properly. " + "Open the page via Web server i.e. http://...")
    }
    window.WebSocket = function (url, protocols, proxyHost, proxyPort, headers) {
        var self = this;
        self.__id = WebSocket.__nextId++;
        WebSocket.__instances[self.__id] = self;
        self.readyState = WebSocket.CONNECTING;
        self.bufferedAmount = 0;
        self.__events = {};
        if (!protocols) {
            protocols = []
        } else if (typeof protocols == "string") {
            protocols = [protocols]
        }
        self.__createTask = setTimeout(function () {
            WebSocket.__addTask(function () {
                self.__createTask = null;
                WebSocket.__flash.create(self.__id, url, protocols, proxyHost || null, proxyPort || 0, headers || null)
            })
        }, 0)
    };
    WebSocket.prototype.send = function (data) {
        if (this.readyState == WebSocket.CONNECTING) {
            throw "INVALID_STATE_ERR: Web Socket connection has not been established"
        }
        var result = WebSocket.__flash.send(this.__id, encodeURIComponent(data));
        if (result < 0) {
            return true
        } else {
            this.bufferedAmount += result;
            return false
        }
    };
    WebSocket.prototype.close = function () {
        if (this.__createTask) {
            clearTimeout(this.__createTask);
            this.__createTask = null;
            this.readyState = WebSocket.CLOSED;
            return
        }
        if (this.readyState == WebSocket.CLOSED || this.readyState == WebSocket.CLOSING) {
            return
        }
        this.readyState = WebSocket.CLOSING;
        WebSocket.__flash.close(this.__id)
    };
    WebSocket.prototype.addEventListener = function (type, listener, useCapture) {
        if (!(type in this.__events)) {
            this.__events[type] = []
        }
        this.__events[type].push(listener)
    };
    WebSocket.prototype.removeEventListener = function (type, listener, useCapture) {
        if (!(type in this.__events)) return;
        var events = this.__events[type];
        for (var i = events.length - 1; i >= 0; --i) {
            if (events[i] === listener) {
                events.splice(i, 1);
                break
            }
        }
    };
    WebSocket.prototype.dispatchEvent = function (event) {
        var events = this.__events[event.type] || [];
        for (var i = 0; i < events.length; ++i) {
            events[i](event)
        }
        var handler = this["on" + event.type];
        if (handler) handler.apply(this, [event])
    };
    WebSocket.prototype.__handleEvent = function (flashEvent) {
        if ("readyState" in flashEvent) {
            this.readyState = flashEvent.readyState
        }
        if ("protocol" in flashEvent) {
            this.protocol = flashEvent.protocol
        }
        var jsEvent;
        if (flashEvent.type == "open" || flashEvent.type == "error") {
            jsEvent = this.__createSimpleEvent(flashEvent.type)
        } else if (flashEvent.type == "close") {
            jsEvent = this.__createSimpleEvent("close");
            jsEvent.wasClean = flashEvent.wasClean ? true : false;
            jsEvent.code = flashEvent.code;
            jsEvent.reason = flashEvent.reason
        } else if (flashEvent.type == "message") {
            var data = decodeURIComponent(flashEvent.message);
            jsEvent = this.__createMessageEvent("message", data)
        } else {
            throw "unknown event type: " + flashEvent.type
        }
        this.dispatchEvent(jsEvent)
    };
    WebSocket.prototype.__createSimpleEvent = function (type) {
        if (document.createEvent && window.Event) {
            var event = document.createEvent("Event");
            event.initEvent(type, false, false);
            return event
        } else {
            return { type: type, bubbles: false, cancelable: false }
        }
    };
    WebSocket.prototype.__createMessageEvent = function (type, data) {
        if (window.MessageEvent && typeof MessageEvent == "function" && !window.opera) {
            return new MessageEvent("message", { view: window, bubbles: false, cancelable: false, data: data })
        } else if (document.createEvent && window.MessageEvent && !window.opera) {
            var event = document.createEvent("MessageEvent");
            event.initMessageEvent("message", false, false, data, null, null, window, null);
            return event
        } else {
            return { type: type, data: data, bubbles: false, cancelable: false }
        }
    };
    WebSocket.CONNECTING = 0;
    WebSocket.OPEN = 1;
    WebSocket.CLOSING = 2;
    WebSocket.CLOSED = 3;
    WebSocket.__isFlashImplementation = true;
    WebSocket.__initialized = false;
    WebSocket.__flash = null;
    WebSocket.__instances = {};
    WebSocket.__tasks = [];
    WebSocket.__nextId = 0;
    WebSocket.loadFlashPolicyFile = function (url) {
        WebSocket.__addTask(function () {
            WebSocket.__flash.loadManualPolicyFile(url)
        })
    };
    WebSocket.__initialize = function () {
        if (WebSocket.__initialized) return;
        WebSocket.__initialized = true;
        if (WebSocket.__swfLocation) {
            window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation
        }
        if (!window.WEB_SOCKET_SWF_LOCATION) {
            logger.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
            return
        }
        if (!window.WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR && !WEB_SOCKET_SWF_LOCATION.match(/(^|\/)WebSocketMainInsecure\.swf(\?.*)?$/) && WEB_SOCKET_SWF_LOCATION.match(/^\w+:\/\/([^\/]+)/)) {
            var swfHost = RegExp.$1;
            if (location.host != swfHost) {
                logger.error("[WebSocket] You must host HTML and WebSocketMain.swf in the same host " + "('" + location.host + "' != '" + swfHost + "'). " + "See also 'How to host HTML file and SWF file in different domains' section " + "in README.md. If you use WebSocketMainInsecure.swf, you can suppress this message " + "by WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR = true;")
            }
        }
        var container = document.createElement("div");
        container.id = "webSocketContainer";
        container.style.position = "absolute";
        if (WebSocket.__isFlashLite()) {
            container.style.left = "0px";
            container.style.top = "0px"
        } else {
            container.style.left = "-100px";
            container.style.top = "-100px"
        }
        var holder = document.createElement("div");
        holder.id = "webSocketFlash";
        container.appendChild(holder);
        document.body.appendChild(container);
        swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION, "webSocketFlash", "1", "1", "10.0.0", null, null, {
            hasPriority: true,
            swliveconnect: true,
            allowScriptAccess: "always"
        }, null, function (e) {
            if (!e.success) {
                logger.error("[WebSocket] swfobject.embedSWF failed")
            }
        })
    };
    WebSocket.__onFlashInitialized = function () {
        setTimeout(function () {
            WebSocket.__flash = document.getElementById("webSocketFlash");
            WebSocket.__flash.setCallerUrl(location.href);
            WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
            for (var i = 0; i < WebSocket.__tasks.length; ++i) {
                WebSocket.__tasks[i]()
            }
            WebSocket.__tasks = []
        }, 0)
    };
    WebSocket.__onFlashEvent = function () {
        setTimeout(function () {
            try {
                var events = WebSocket.__flash.receiveEvents();
                for (var i = 0; i < events.length; ++i) {
                    WebSocket.__instances[events[i].webSocketId].__handleEvent(events[i])
                }
            } catch (e) {
                logger.error(e)
            }
        }, 0);
        return true
    };
    WebSocket.__log = function (message) {
        logger.log(decodeURIComponent(message))
    };
    WebSocket.__error = function (message) {
        logger.error(decodeURIComponent(message))
    };
    WebSocket.__addTask = function (task) {
        if (WebSocket.__flash) {
            task()
        } else {
            WebSocket.__tasks.push(task)
        }
    };
    WebSocket.__isFlashLite = function () {
        if (!window.navigator || !window.navigator.mimeTypes) {
            return false
        }
        var mimeType = window.navigator.mimeTypes["application/x-shockwave-flash"];
        if (!mimeType || !mimeType.enabledPlugin || !mimeType.enabledPlugin.filename) {
            return false
        }
        return mimeType.enabledPlugin.filename.match(/flashlite/i) ? true : false
    };
    if (!window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION) {
        swfobject.addDomLoadEvent(function () {
            WebSocket.__initialize()
        })
    }
})();


// const Config = {
//   delay: 1000,
//   position: 'left',
//   serviceName: 'Tom',
//   picture: './images/kefu.png',
//   titleBackground: '#333',
//   buttonBackground: '#ccc',
//   animationTime: 200,
//   msgList: [{
//     text: '<div class="close">X</div>',
//     delay: 1000
//   }, {
//     text: '哈哈哈',
//     delay: 3000
//   }],

// };


const VCWS = {
    ws: null,
    alirtc: null,
    name: null,
    room_id: localStorage.getItem('MID') ? localStorage.getItem('MID') : null,
    client_id: null,
    account_type: null,
    user_id: null,
    account_type_mark: 'client',
}
if (typeof console == "undefined") {
    this.console = {
        log: function (msg) {
        }
    };
}

// 如果浏览器不支持websocket，会使用这个flash自动模拟websocket协议，此过程对开发者透明
WEB_SOCKET_SWF_LOCATION = __HOST + "swf/WebSocketMain.swf";
// 开启flash的websocket debug
WEB_SOCKET_DEBUG = true;


class Wlx3_VcModel {
    constructor(config) {
        this.productList = localStorage.getItem('chatProductList') ? JSON.parse(localStorage.getItem('chatProductList')) : [];
        this.initProduct();
        this.renderElement();
        console.log('config:' + JSON.stringify(config))
        this.box = document.getElementById('vc-model');
        this.isHideVcWindow = localStorage.getItem('isHideVcWindow') ? true : false;  // 是否隐藏聊天窗口
        this.isInput = localStorage.getItem('isInput') ? true : false;
        // this.isShowSecondWelcome = localStorage.getItem('isShowSecondWelcome') ? true : false;
        this.isHideFirstWelcomeMsg = localStorage.getItem('isHideFirstWelcomeMsg') ? true : false; // 第一屏消息，默认隐藏
        this.isShowSecondWelcome = false;  // 第二屏消息是否显示
        this.secondWelcomeMsgIsClose = false; // 第二屏绿泡上的关闭按钮 是否点击
        this.isShowReply = localStorage.getItem('isShowReply') ? true : false;
        this.pcSmallWindowMode = 'img'; // PC端小窗口模式
        // this.mobileSmallWindowMode = config.mobile_small_window_mode; // 手机端小窗口模式
        this.mobileSmallWindowMode = 'img'; // 手机端小窗口模式 img / row
        this.mobileChatWindowMode = 'first'; // 手机端聊天窗口模式 first:旧版本 / bottomWidth100:底部宽度100
        this.isMoveBottomAgo = false; // 移动端 - 是否滑动到过底部
        this.currScrollHeight = 0;  // 当前滚动高度
        this.isShowClue = localStorage.getItem('isEmptyClue') ? true : false; // clue是否显示
        this.isSendSecondWelcomeMsgToChat = localStorage.getItem('isSendSecondWelcomeMsgToChat') ? true : false; // 是否发送过第二屏消息到聊天列表
        this.isClickFormChatNow = localStorage.getItem('isClickFormChatNow') ? true : false; // 是否点击邀请表单 - chat now

        this.serviceSendMsgTime = localStorage.getItem('serviceSendMsgTime') ? true : false; // 客服发消息时间

        // 用户第一次发送消息，客服16秒未回复
        this.userSendMsgTime = localStorage.getItem('userSendMsgTime') ? true : false; // 用户发消息时间
        this.isSendFirstReplyMsg = localStorage.getItem('isSendFirstReplyMsg') ? true : false; // 是否发送 默认第一条回复

        // 留下联系方式30秒未回复
        this.userSendEmailTime = localStorage.getItem('userSendEmailTime') ? true : false; // 用户发连续方式时间
        this.isSendEndReplyMsg = localStorage.getItem('isSendEndReplyMsg') ? true : false; // 是否发送 最后回复/结束提示

        this.trefer = 1; // 访客启动聊天路径,默认1

        this.lang_pack = config.lang_pack;
        this.inquire = config.inquire; // Available in the country , Inquire Now
        this.is_open_clue = config.is_open_clue;
        this.firstShowProduct = config.first_show_product;
        this.secondWelcomeMode = config.second_welcome_mode;
        this.delay = config.delay;
        this.position = config.position;
        this.serviceName = config.kfname;
        this.picture = config.kf_img;
        this.titleBackground = config.top_color;
        this.buttonBackground = config.buttonBackground;

        this.animationTime = config.animationTime;
        this.msgList = [config.msg2_first, config.msg2_sec];
        this.userName = 'Me';
        this.showFormID = 3;
        this.showtimes = 1;
        this.viewModel = config.viewmode - 1;

        this.welcomMsgList = [config.msg_first, config.msg_sec]; // 欢迎消息
        this.replyMsgFirst = [config.default_msg, config.default_msg2]; // 默认第一条回复
        this.replyMsgEnd = [config.lastmsg, config.closemsg]; // 最后回复/结束提示
        this.callStatus = config.call_status; // 通话状态
        this.callStartTime = config.call_start_time; // 通话开始时间
        this.callIsJoinChannel = false; // 是否加入频道
        this.callIsSubService = false; // 是否订阅客服
        this.wsResetConnectTime = 0;    // ws重连次数
        this.wsServerForceClose = false; // Ws服务端强制关闭

        // this.Config = {
        //   ucountry: "China",
        // }

        // this.viewModel = localStorage.getItem('stIsClickCloseNum') ? 1 : 3;
        this.MID = localStorage.getItem('MID') ? localStorage.getItem('MID') : null
        if (this.MID) {
            this.delay = 1000;
        }

        this.init();
    };



    // 邀请聊天模式
    start() {
        console.log('start - start');
        // 是否隐藏欢迎页面
        if (this.isHideFirstWelcomeMsg) {
            if (this.isMobile()) {
                this.toggleView(4);
            } else {
                this.toggleView(3);
            }
        } else {
            // 显示欢迎页面
            this.toggleView(1);
        }

        this.showView();
        // var isStShow = localStorage.getItem('isStShow') ? true : false;
        // if (isStShow != true) {
        //     var pagetitle = document.title;
        //     var pagelink = window.location.href;
        //     $.post(__HOST + 'updatesh.php', {
        //         pagetitle: pagetitle,
        //         pagelink: pagelink
        //     }, (res) => {
        //         localStorage.setItem('isStShow', true);
        //     }, 'json');
        // }
    };

    // 直达模式
    start2() {
        console.log('start2 - start');
        this.isHideVcWindow = false;
        this.isHideFirstWelcomeMsg = true;
        this.toggleView(3);
        this.showView();
        var isStShow = localStorage.getItem('isStShow') ? true : false;
        if (isStShow != true) {
            var pagetitle = document.title;
            var pagelink = window.location.href;
            $.post(__HOST + 'updatesh.php', {
                pagetitle: pagetitle,
                pagelink: pagelink
            }, (res) => {
                localStorage.setItem('isStShow', true);
            }, 'json');
        }
    }

    // 邀请表单模式
    start3() {
        console.log('start3 - start');
        // 是否隐藏欢迎页面
        if (this.isHideFirstWelcomeMsg) {
            this.toggleView(3);
        } else {
            // 显示欢迎页面
            this.toggleView(1);
        }

        this.showView();
        // var isStShow = localStorage.getItem('isStShow') ? true : false;
        // if (isStShow != true) {
        //     var pagetitle = document.title;
        //     var pagelink = window.location.href;
        //     $.post(__HOST + 'updatesh.php', {
        //         pagetitle: pagetitle,
        //         pagelink: pagelink
        //     }, (res) => {
        //         localStorage.setItem('isStShow', true);
        //     }, 'json');
        // }
        setTimeout(() => {
            this.getFReply()
        }, 800);
    };

    // 手机端 - 底部模式模式
    start4() {
        this.smallIconMode2('show');
    };

    // 连接服务端
    connect() {
        var currObj = this;


        // 创建websocket
        VCWS.ws = new WebSocket(__SOCKET_HOST);

        VCWS.ws.onopen = () => {
            if (!this.MID) {
                this.getMid()
            } else {
                this.onopen()
                // this.getMid()
            }

        }
        console.log("WS connect");
        // 当有消息时根据消息类型显示不同信息
        VCWS.ws.onmessage = this.onmessage.bind(this);
        VCWS.ws.onclose = function () {
            console.log("连接关闭，定时重连");
            // 如果用户1个小时不发送消息，就不再链接
            // let userSendMsgTime = localStorage.getItem('userSendMsgTime');
            // let timestamp = Math.floor(Date.now() / 1000);

            if (currObj.wsServerForceClose) {
                console.log('WS服务端强制关闭')
                return;
            }

            // 允许重连5次
            if (currObj.wsResetConnectTime > 5) return
            currObj.wsResetConnectTime++;
            currObj.connect();
        };
        VCWS.ws.onerror = function () {
            console.log("出现错误");
        };
    }

    // 连接建立时发送登录信息
    onopen() {
        this.setModel();    // 设置模式
        this.addEvent();    // 载入事件

        // 登录 account_type:1, user_id:1, username:'zeelib'
        var login_data = {
            type: "login",
            username: '',
            user_id: this.MID,
            account_type: 1,
            uid: __UID
        };

        //console.log("websocket握手成功，发送登录数据:" + JSON.stringify(login_data));
        VCWS.ws.send(JSON.stringify(login_data));

        // setTimeout(() => {
        //     // 语音通话
        //     VCWS.alirtc = new AliRtc(__UID, this.MID, this.MID, __HOST, __UID);
        //
        // }, 2000);
    }

    // 设置模式
    setModel() {
        let that = this;
        console.log('that.delay1:' + that.delay)

        // 添加第一屏欢迎消息
        this.firstWelcomeMsg();

        // 添加第二屏欢迎消息（绿色气泡）
        this.secondWelcomeAdd();

        // 手机端 - 小程序显示在底部，滑动才出现
        // if (that.isMobile() && that.mobileSmallWindowMode == 'row') {
        if (that.isMobile()) {
            that.isHideVcWindow = true;
            that.isHideFirstWelcomeMsg = true; // 隐藏欢迎消息
            setTimeout(() => {
                if (that.isHideVcWindow) {
                    // 隐藏聊天窗口
                    that.smallIconModeMain('show')
                } else {
                    if (that.isHideFirstWelcomeMsg) {
                        if (that.isClickFormChatNow) {
                            that.toggleView(4);
                        } else {
                            // 邀请表单显示
                            that.toggleView(2);
                        }
                    } else {
                        that.toggleView(1);
                    }
                    that.showView();

                    that.smallIconModeMain('hide')
                }

            }, that.delay);

            // this.showView();
        } else {
            setTimeout(() => {
                if (that.isHideVcWindow) {
                    // 隐藏聊天窗口
                    that.smallIconModeMain('show')
                } else {
                    that.smallIconModeMain('hide')
                }
            }, that.delay);


            // 邀请聊天模式
            if (this.viewModel == 1) {
                if (!this.isHideVcWindow) {
                    setTimeout(() => {
                        this.start()
                    }, this.delay);
                } else {
                    $(".vc-title").css({
                        display: "block"
                    });
                }
            }

            // 直达模式
            if (this.viewModel == 2) {
                if (!this.isHideVcWindow) {
                    setTimeout(() => {
                        this.start2()
                    }, this.delay);
                } else {
                    $(".vc-title").css({
                        display: "block"
                    });
                }
            }


            // 邀请表单模式
            if (this.viewModel == 3) {
                if (!this.isHideVcWindow) {
                    setTimeout(() => {
                        this.start()
                    }, this.delay);
                } else {
                    $(".vc-title").css({
                        display: "block"
                    });
                }
            }
        }

        // 第二屏显示
        that.secondWelcomeChange('show', 6000);

        //localStorage.setItem('isHideVcWindow', true);
    };

    // 获取请求参数
    getPar() {
        var url = window.document.location.href.toString(); //获取的完整url
        var u = url.split("?");
        if (typeof (u[1]) == "string") {
            u = u[1].split("&");
            var get = {};
            for (var i in u) {
                var j = u[i].split("=");
                get[j[0]] = j[1];
            }
            return get;
        } else {
            return {};
        }
    }

    // 获取mid
    getMid() {
        //const uid = this.getPar()['uid'] ? this.getPar()['uid'] : 3
        $.ajax({
            url: __HOST + 'livechat_v2.php',
            method: 'POST',
            async: false,
            data: {
                "act": "fsub",
                "uid": __UID,
                "pagetitle": document.title,
                "pagelink": window.location.href,
                "message": "",
                "showtimes": 1
            },
            success: (data) => {
                data = JSON.parse(data);
                localStorage.setItem('MID', data.mid);
                this.MID = data.mid;
                VCWS.room_id = data.mid
                this.onopen()
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    // 服务端发来消息时
    onmessage(e) {
        var that = this;
        var param = JSON.parse(e.data);
        // console.log('onmessage', param);
        var data = param['data'];
        var code = param['code'];
        var type = param['type'];
        // console.log('code:' + code)
        if (code != 0) {
            //alert(param['message'])
            //console.log('onMessage Err:' + param['message']);
            return false;
        }
        switch (type) {
            // 服务端ping客户端
            case 'ping':
                VCWS.ws.send('{"type":"pong"}');
                break;

            // 登录成功
            case 'loginSuccess':
                //console.log('登录成功');

                // 加入房间
                VCWS.ws.send(JSON.stringify({
                    type: 'join_room',
                    room_id: VCWS.room_id,
                    uid: __UID,
                }));
                VCWS.account_type_mark = data['account_type']
                break;

            // 加入房间成功
            case 'joinRoomSuccess':
                //console.log(data);
                //this.userName = data.chat[0].username
                data.chat.forEach((val, index) => {
                    if (val.account_type == 'client' && val.username != 'YOU') {
                        this.userName = val.username;
                    }
                    var msg_type = val.msg_type ? val.msg_type : 'TEXT';
                    this.say('', val.username, val.content, val.addtime, val.account_type, msg_type, val.id);

                    // 通话中，重新链接
                    if (msg_type == 'CALL' && val.content.status == 'IN_CALL' && this.callStatus == 'IN_CALL') {
                        setTimeout(() => {
                            VCWS.alirtc.init(() => {
                                let serverId = val.content.service_id;
                                // VCWS.alirtc.receivePublishManual(serverId).then(re => {
                                //     console.log("callUpdateSuc 订阅成功");
                                //     this.callIsSubService = true; // 订阅客服
                                // });
                                // 发送消息
                                VCWS.ws.send(JSON.stringify({
                                    type: 'call_update',
                                    content: { status: 'IN_CALL', msg_id: val.id }
                                }));
                                this.callStatus = 'IN_CALL';
                                this.callIsJoinChannel = true;
                            })
                        }, 2000);
                    }
                });

                this.sendChatWelcomeMsg();

                break;


            // 收到信息
            case 'newMsg':
                //{"type":"say","from_client_id":xxx,"to_client_id":"all/client_id","content":"xxx","time":"xxx"}
                if (data.account_type == 'client' && data.username != 'YOU') {
                    this.userName = data.username;
                }
                var msg_type = data.msg_type ? data.msg_type : 'TEXT';
                this.say('', data.username, data.content, data.addtime, data.account_type, msg_type, data.id);
                $(".chat-history").animate({ scrollTop: 100000 }, 100);
                if (data.account_type == 'manager') {
                    playSound();
                }

                // 收到消息自动弹出窗口
                if (data.type != 4) {
                    this.isHideFirstWelcomeMsg = true;
                    // this.secondWelcomeMsgIsClose = true;

                    let toggleViewMode = 3;
                    if (this.isMobile()) toggleViewMode = 4;
                    this.toggleView(toggleViewMode);
                    this.showView();
                    this.smallIconModeMain('hide');

                    localStorage.removeItem('isHideVcWindow');   // 收到消息移除显示控制
                    this.isHideVcWindow = false;
                }

                // 客服发消息时间
                if (data.account_type !== VCWS.account_type_mark) {
                    let timestamp = Math.floor(Date.now() / 1000);
                    localStorage.setItem('serviceSendMsgTime', timestamp);
                }

                // 请求通话
                if (msg_type == 'CALL') {
                    let callStatus = data.content ? data.content.status : '';
                    // 是否加入频道
                    // if (!this.callIsJoinChannel && (callStatus == 'INITIATING' || callStatus == 'IN_CALL')) {
                    //     this.callIsJoinChannel = true;
                    // }
                }

                break;

            case 'inputText':
                $(".chat-input-text").show().delay(6000).hide(0);
                break;

            // 用户退出 更新用户列表
            case 'logout':
                //{"type":"logout","client_id":xxx,"time":"xxx"}
                delete client_list[data['from_client_id']];
                flush_client_list();
                break;

            // 更新通话消息ID
            case 'callUpdateSuc':
                console.log('callUpdateSuc', data);
                this.initAliRtc();
                let callStatus = data.content.status ?? '';
                let serverId = data.content.service_id ?? ''; // 客服ID
                let content = this.createMsgHtml(data.content, data.msg_type, data.id);
                $("#msg-content-" + data.id).html(content);

                // 是否订阅客服
                // if (!this.callIsSubService && callStatus == 'IN_CALL') {
                if (callStatus == 'IN_CALL') {
                    VCWS.alirtc.receivePublishManual(serverId).then(re => {
                        console.log("callUpdateSuc 订阅成功");
                        this.callIsSubService = true; // 订阅客服
                    });
                } else if (callStatus == 'END') {
                    VCWS.alirtc.cancelPublishManual(serverId).then(re => {
                        console.log("callUpdateSuc 取消订阅");
                        this.callIsSubService = false; // 订阅客服
                        this.callIsJoinChannel = false;
                        this.callStatus = '';
                    });
                }
                break;

            // 强制关闭
            case 'forceClose':
                that.wsServerForceClose = true;
                console.log('forceClose', that.wsServerForceClose)
        }
    }

    // 发言
    say(from_client_id, from_client_name, content, time, accountType, msgType, msgId) {
        // console.log('account_type:' + account_type + ' - accountType:' + accountType)
        var position = VCWS.account_type_mark == accountType ? 'msg_right' : 'msg_left';
        // console.log(content);
        // this.serviceName = from_client_name
        // $("#vc-Name").text(this.serviceName);
        position == 'msg_left' ? this.addReplyMsg(content, msgType, msgId) : this.addUserMsg(content, msgType, msgId)

        if (msgType == 'VIDEO') {
            console.log('VIDEOxxx');
            this.listenerVideo(msgId);
        }
    }

    // 发送 第一屏欢迎语
    sendChatWelcomeMsg() {
        // 当显示聊天窗口时就发送
        let chat_welcome_msg = localStorage.getItem('chat_welcome_msg');
        if (chat_welcome_msg) return;
        //VCWS.ws.send(JSON.stringify({type: 'welcome_msg', mark: 'welcomeFirst', room_id: VCWS.room_id, uid: __UID}));

        $.ajax({
            url: __HOST + 'livechat_v2.php',
            method: 'POST',
            async: false,
            data: {
                "act": "send_welcome_first",
                "uid": __UID,
                "mid": VCWS.room_id,
                "msg_first": this.welcomMsgList[0],
                "msg_sec": this.welcomMsgList[1],
            },
            success: (data) => {

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
        localStorage.setItem('chat_welcome_msg', true);
    }


    // 第一屏欢迎页 - 创建第一屏HTML代码，隐藏、显示第一屏
    firstWelcomeMsg(type) {
        console.log('firstWelcomeMsg show start');

        // if (this.mobileSmallWindowMode == 'row') return;

        // 隐藏
        // 邀请表单模式点击chat later不能进入聊天界面
        if (type == 'hide') {
            // 邀请表单模式点击chat later不能进入聊天界面
            if (this.viewModel == 3 && !this.isClickFormChatNow) {
                console.log('model 4 未填写邀请表单不能进入聊天');
                return;
            }
            console.log('firstWelcomeMsg hide ......');
            this.isHideFirstWelcomeMsg = true;
            localStorage.setItem('isHideFirstWelcomeMsg', true);
            return;
        }

        // 显示第一屏欢迎消息
        // if (type == 'show')
        // 1为邀请模式
        if (this.viewModel == 2 || this.isHideFirstWelcomeMsg) return;
        console.log('firstWelcomeMsg show ......');
        this.toggleView(1);
        // this.showView();
        // this.isHideFirstWelcomeMsg = true;
        // localStorage.setItem('isHideFirstWelcomeMsg', true);

        var proId = $("#st_pid").val(), proImg = $("#st_pic").val(), proTitle = $("#st_title").val();

        // 显示产品信息时，移除第二条
        if (proTitle && this.firstShowProduct == 'on') {
            this.welcomMsgList.splice(1);
        }

        this.welcomMsgList.forEach((ele, index) => {
            let div = document.createElement('div')
            div.className = 'welcome_msg'
            div.style.animationDelay = `${index + 1}s`
            div.innerHTML = `<span class="msg">${ele}</span>`
            setTimeout(() => {
                $('#chat-messages-inner').append(div)
            }, 2000 * (index * 2 + 1));
        })

        // 显示产品信息
        if (proTitle && this.firstShowProduct == 'on') {
            let div = document.createElement('div')
            div.className = 'welcome_msg'
            div.style = 'display: flex; align-items: center;';
            div.style.animationDelay = `1s`
            div.innerHTML = `<div><img src="${proImg}" style="width: 60px;padding-right: 5px;" / ></div>
    <div class="msg">Are you looking for ${proTitle}?</div>`
            setTimeout(() => {
                $('#chat-messages-inner').append(div)
            }, 6000);
        }
    };

    // 切换第二屏欢迎消息的显示与隐藏（绿色气泡）
    secondWelcomeChange(type, delayTime) {
        console.log('Start secondWelcomeChange 绿色气泡 - isShowSecondWelcome:'
            + this.isShowSecondWelcome + ', secondWelcomeMsgIsClose:'
            + this.secondWelcomeMsgIsClose + ', mobileSmallWindowMode:'
            + this.mobileSmallWindowMode + ', isHideVcWindow:'
            + this.isHideVcWindow
            + ', isHideFirstWelcomeMsg:' + this.isHideFirstWelcomeMsg);

        // if (this.isShowSecondWelcome) return; // 第二屏消息显示，不在显示
        if (this.secondWelcomeMsgIsClose) {
            console.log('secondWelcomeChange - secondWelcomeMsgIsClose');
            return;
        } // 点了关闭，不在显示

        if (this.mobileSmallWindowMode == 'row' && this.isMobile()) {
            console.log('secondWelcomeChange - mobileSmallWindowMode:row, isMobile:true');
            return;
        } // 手机端 - 小图标行模式，不在显示

        if (!this.isHideVcWindow) {
            console.log('secondWelcomeChange - isHideVcWindow');
            return;
        } // 有聊天窗口就不显示

        let leftLength = $('.vc-chat-second-welcome .move-text').length;

        // 如果已经插入元素
        if (leftLength > 0) {
            let isShowSecondWelcome = false;
            if (type == 'show') {
                // 邀请模式并且没显示过第一屏，第二屏不能显示
                if (this.viewModel == 1 && !this.isHideFirstWelcomeMsg && !this.isMobile()) {
                    console.log('secondWelcomeChange - viewModel：1，isHideFirstWelcomeMsg：false');
                    return
                };

                // clue开启，并且clue未显示时，不显示第二屏
                // if (this.is_open_clue == 'on' && !this.isShowClue) {
                //     console.log('secondWelcomeChange - is_open_clue：on，isShowClue：false');
                //     return
                // };

                console.log('Start secondWelcomeChange show ......')

                isShowSecondWelcome = true;
                $('.vc-chat-second-welcome').show();
                for (var i = 0; i < leftLength; i++) {
                    (function (j, jDelayTime) {
                        setTimeout(function timer() {
                            $(`.vc-chat-second-welcome .move-text:eq(${j})`).show(1);
                        }, j * 2 * 1000 + jDelayTime);
                    })(i, delayTime);
                }
            } else {
                console.log('Start secondWelcomeChange hide ......')

                $('.vc-chat-second-welcome').hide();
                $('.vc-chat-second-welcome .move-text').hide();
            }

            this.isShowSecondWelcome = isShowSecondWelcome;
            // localStorage.setItem('isShowSecondWelcome', isShowSecondWelcome);
            this.showtimes = 2;
        }
    }

    // 增加第二屏欢迎语HTML代码 - 增加绿色气泡
    secondWelcomeAdd() {
        console.log('Start secondWelcomeAdd');

        let insertCount = 0,
            leftLength = $('.vc-chat-second-welcome .move-text').length;

        // 如果已经插入元素
        if (leftLength > 0) return;

        var proId = $("#st_pid").val(), proImg = $("#st_pic").val(), proTitle = $("#st_title").val();

        // 显示产品信息时，移除第二条
        if (proTitle && this.secondWelcomeMode == 'product') {
            let div = document.createElement('div');
            div.className = 'move-text';
            div.style = 'display:none;';
            div.innerHTML = `<div style="display: flex; align-items: center;"><div><img src="${proImg}" style="width: 60px;padding-right: 5px;" / ></div><div class="msg">${proTitle}</div></div> <div class="close chat-second-welcome-close">X</div>`
            // div.style.animationDelay = `0s`;
            $('.vc-chat-second-welcome').append(div);
            // $('.vc-chat-second-welcome').css({display:'block'});
            insertCount++;
        }


        this.msgList.forEach((ele, index) => {
            if (!ele) return;
            if (insertCount == 0) {
                ele += '<div class="close chat-second-welcome-close">X</div>';
            }
            let div = document.createElement('div');
            div.className = 'move-text';
            div.style = 'display:none';
            div.innerHTML = ele;
            // div.style.animationDelay = `0.1s`;
            $('.vc-chat-second-welcome').append(div);
            // $('.vc-chat-second-welcome').css({display:'block'});
            insertCount++;
        });
        // localStorage.setItem('isShowSecondWelcome', true);
    };

    // 发送第二屏消息 - 发送绿色气泡中的消息内容
    sendSecondWelcomeMsgToChat() {
        console.log('isSendSecondWelcomeMsgToChat:' + this.isSendSecondWelcomeMsgToChat);
        if (this.isSendSecondWelcomeMsgToChat) return;
        console.log('isSendSecondWelcomeMsgToChat ......');
        let proId = $("#st_pid").val(), proImg = $("#st_pic").val(), proTitle = $("#st_title").val();
        let data = [];
        // {content: this.msgList[0], interval: 3, msgType: 'TEXT'},
        // {content: product, interval: 5, msgType: 'PRODUCT'},
        // {content: this.msgList[1], interval: 5, msgType: 'TEXT'},
        // if (this.msgList[0]) data.push({content: this.msgList[0], interval: 3, msgType: 'TEXT'});
        // if (proTitle) data.push({content: {name: 'Are you looking for ' + proTitle + '?', img: proImg}, interval: 5, msgType: 'PRODUCT'});
        // if (this.msgList[1]) data.push({content: this.msgList[1], interval: 10, msgType: 'TEXT'});

        // VCWS.ws.send(JSON.stringify({
        //     type: 'welcome_msg',
        //     mark:'SendSecondWelcomeMsgToChat',
        //     room_id: VCWS.room_id,
        //     uid: __UID,
        //     data:data
        // }));
        $.ajax({
            url: __HOST + 'livechat_v2.php',
            method: 'POST',
            async: false,
            data: {
                "act": "send_welcome_second",
                "uid": __UID,
                "mid": VCWS.room_id,
                "msg2_first": this.msgList[0],
                "msg2_sec": this.msgList[1],
            },
            success: (data) => {

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })

        localStorage.setItem('isSendSecondWelcomeMsgToChat', true);
        this.isSendSecondWelcomeMsgToChat = true;
    };


    addEvent() {
        var that = this;
        let clickTitle = (mode = 3) => {
            console.log('mode:' + mode);
            if ($(event.target).hasClass('close')) {
                // $('.vc-chat-second-welcome .move-text').remove();
                $('.vc-chat-second-welcome .move-text').hide();
                return;
            }
            // that.toggleView(that.viewModel ? that.viewModel : that.isHideVcWindow ? 2 : 1);
            // if (that.viewModel == 1) {
            //   that.toggleView(3);
            // }

            // 表单邀请模式
            //console.log('xxxxx:' + that.viewModel, that.isHideFirstWelcomeMsg)
            if (that.viewModel == 3 && !that.isHideFirstWelcomeMsg) {
                mode = 2;
            }

            that.toggleView(mode);
            that.showView();
            setTimeout(() => {
                that.getFReply()
            }, 800);

            that.smallIconModeMain('hide');
            that.isHideVcWindow = false;
        };

        // $("#vc-model .vc-title .right").on('click', clickTitle);
        $(document).on("click", ".vc-chat-popup-mini-mode1", function (event) {
            if (that.isMobile()) {
                // 欢迎界面
                if (!that.isHideFirstWelcomeMsg && (that.viewModel == 1 || that.viewModel == 3)) {
                    clickTitle(1);
                    return;
                }
                // 邀请表单界面 - 没填信息不能进入聊天
                if (!that.isClickFormChatNow && that.viewModel == 3) {
                    // 如果邀请表单未提交，就显示
                    clickTitle(2)
                    return;
                }
                // 聊天界面
                clickTitle(4)
                return;
            } else {
                clickTitle(4)
            }
        });
        $(document).on("click", ".vc-chat-popup-mini-mode2", function (event) {
            clickTitle(4)
        });
        $(document).on("click", ".vc-chat-second-welcome", function (event) {
            if (that.isMobile()) {
                // 欢迎界面
                if (!that.isHideFirstWelcomeMsg && (that.viewModel == 1 || that.viewModel == 3)) {
                    clickTitle(1);
                    return;
                }
                // 邀请表单界面
                if (!that.isClickFormChatNow && that.viewModel == 3) {
                    // 如果邀请表单未提交，就显示
                    clickTitle(2)
                    return;
                }
                // 聊天界面
                clickTitle(4)
                return;
            } else {
                clickTitle(3)
            }
        });
        // $(".vc-chat-popup-mini-mode1").on('click', clickTitle(3));
        // $(".vc-chat-popup-mini-mode2").on('click', clickTitle(3));
        // $(".vc-chat-second-welcome").on('click', clickTitle(3));

        // 点击第二屏绿泡上的 关闭按钮
        $(document).on("click", ".chat-second-welcome-close", function (event) {
            // localStorage.setItem('isShowSecondWelcome', true);
            that.secondWelcomeMsgIsClose = true;
            that.secondWelcomeChange('hide');
            console.log('secondWelcomeMsgIsClose:' + that.secondWelcomeMsgIsClose)
        });

        // 点击聊天关闭图标
        $("#vc-model .close").on('click', () => {
            that.firstWelcomeMsg('hide');

            if ($('#vc-model').hasClass('active-two')) {
                // $('.vc-chat-second-welcome').html('');    // 移除第二屏
                $('.vc-chat-second-welcome .move-text').hide();
            }

            // 发送第二屏消息 - 关闭聊天窗口是触发
            that.sendSecondWelcomeMsgToChat()

            localStorage.setItem('isHideVcWindow', true); // 点击关闭图标，不显示窗口
            that.isHideVcWindow = true;
            that.hideView();

            // 点击关闭图标后，再次启用第二屏消息
            console.log('secondWelcomeMsgIsClose:' + that.secondWelcomeMsgIsClose)
            that.isShowSecondWelcome = false;
            // localStorage.removeItem('isShowSecondWelcome');
            that.secondWelcomeChange('show', 6000)

            // 弹窗
            $("#vc-model > .vc-content-main").removeClass('vc-model-dialog-content-main');
            // 增加左边的宽度
            $("#vc-model > .vc-content-main > .vc-content .chat-box").removeClass('vc-model-dialog-chat-box-width');
            // 隐藏左边的关闭图标
            $("#vc-model > .vc-content-main > .vc-content > .chat-box > .chat-title > .close").removeClass('vc-model-dialog-close');
            // 聊天与产品之间的竖线
            $("#vc-model > .vc-content-main > .vc-content .chat-content2").removeClass('vc-model-dialog-border');
            // 右侧产品
            $("#vc-model > .vc-content-main > .vc-content > .chat-product-main").css({ display: 'none' });

            // 显示小窗口模式
            that.smallIconModeMain('show');


            // let stIsClickCloseNum = localStorage.getItem('stIsClickCloseNum');
            // stIsClickCloseNum = stIsClickCloseNum ? stIsClickCloseNum : 0;
            // console.log('stIsClickCloseNum:'+stIsClickCloseNum)
            // 记录点击关闭
            let proId = $("#st_pid").val(), proImg = $("#st_pic").val(), proTitle = $("#st_title").val();
            let pageTitle = proTitle ? proTitle : document.title;
            let pageLink = window.location.href;
            let pageImg = proImg ? proImg : '';
            $.post(__HOST + 'update.php?act=close', {
                uid: __UID,
                mid: this.MID,
                pageTitle: pageTitle,
                pageLink: pageLink,
                pageImg: pageImg,
            }, (res) => {
                // localStorage.setItem('stIsClickCloseNum', stIsClickCloseNum+1);
            }, 'json');
        });

        // chat now
        $('#vc-model .btn1').on('click', () => {
            if (that.viewModel == 3 && !this.isClickFormChatNow) {
                that.firstWelcomeMsg('hide');

                // 未提交 - 显示提交表单页面
                this.toggleView(2);
                // setTimeout(() => {
                //     that.getFReply()
                // }, 800);
                return;
            }
            that.firstWelcomeMsg('hide');
            if (that.isMobile()) {
                that.toggleView(4);
            } else {
                that.toggleView(3);
            }
            $('#vc-model').css({ height: '580px !important' });

            // 记录触发点击
            let stIsClickChatNow = localStorage.getItem('stIsClickChatNow') ? true : false;
            if (!stIsClickChatNow) {
                let proId = $("#st_pid").val(), proImg = $("#st_pic").val(), proTitle = $("#st_title").val();
                let pageTitle = proTitle ? proTitle : document.title;
                let pageLink = window.location.href;
                let pageImg = proImg ? proImg : '';
                $.post(__HOST + 'update.php?act=chatNow', {
                    uid: __UID,
                    mid: this.MID,
                    pageTitle: pageTitle,
                    pageLink: pageLink,
                    pageImg: pageImg,
                }, (res) => {
                    console.log(res)
                    localStorage.setItem('stIsClickChatNow', true);
                }, 'json');
            }
        });

        // chat later
        $('#vc-model .btn2').on('click', () => {
            that.isHideVcWindow = true;
            that.firstWelcomeMsg('hide');
            that.secondWelcomeChange('show', 6000)
            that.hideView();
            that.smallIconModeMain('show');
            $('#vc-model').css({ height: '580px !important' });
        });

        // 邀请聊天 - 提交表单
        $(document).on("click", "#vc-model .chat-now-form-btn", function (event) {
            let name = $("#wlx3_name").val(),
                email = $("#wlx3_email").val(),
                tel = $("#wlx3_tel").val(),
                company = $("#wlx3_company").val(),
                inquiry = $("#wlx3_message").val();
            if (name == '' || email == '' || tel == '') { alert('Username and email and phone can not be empty!'); return false; }
            let contentList = [
                { key: 'Name', val: name },
                { key: 'E-mail', val: email },
                { key: 'Phone', val: tel },
                { key: 'Company', val: company },
                { key: 'Inquiry', val: inquiry },
            ];
            var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (!myreg.test(email)) {
                alert('Email error, please check and re-enter!');
                return false;
            }
            let content = '';
            contentList.forEach((val, key) => {
                if (val.val) {
                    content += ` ${val.key}:${val.val},`;
                }
            })
            content = content.replace(/,$/gi, "");
            VCWS.ws.send(JSON.stringify({
                type: 'say',
                content: content,
                msg_type: 'TEXT',
            }));

            if (that.isMobile()) {
                that.toggleView(4);
            } else {
                that.toggleView(3);
            }

            $('#vc-model').css({ height: '580px !important' });
            that.isClickFormChatNow = true;
            localStorage.setItem('isClickFormChatNow', true);

            that.isHideFirstWelcomeMsg = true;
            localStorage.setItem('isHideFirstWelcomeMsg', true);
        });

        // 点击通话
        $(document).on("click", "#call-btn", function (event) {
            console.log('click call-btn');

            if ((that.callStatus).length === 0) {
                that.initAliRtc();// 通话初始化
            } else {
                alert('Please hold the line during the call request');
            }
        })

        // 发送消息
        $("#send-btn").on('click', e => {
            if ($('#replyForm').length != 0 || $('#replyFormTel').length != 0) {
                $('#message-to-send').addClass('active');
                $('#message-to-send').attr('placeholder', 'Please enter the form information to continue');
                $("#message-to-send").val('');
                return;
            } else {
                $('#message-to-send').removeClass('active')
            }
            var isStUpRefer = localStorage.getItem('isUpRefer') ? true : false;
            if (isStUpRefer != true) { localStorage.setItem('isUpRefer', true); }
            let text = $("#message-to-send").val();
            if (!text) return;
            $("#message-to-send").val('');
            var data = {
                type: 'say',
                content: text,
                msg_type: 'TEXT'
            };
            VCWS.ws.send(JSON.stringify(data));
            // this.addUserMsg(text);

            // 记录用户发送消息的时间
            var timestamp = Math.floor(Date.now() / 1000);
            localStorage.setItem('userSendMsgTime', timestamp)

            // 用户留了联系方式30秒未回复处理
            var re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (re.test(text)) {
                localStorage.setItem('userSendEmailTime', timestamp);
            }

            if (!that.isShowReply && (that.viewModel == 2 || that.viewModel == 3)) {
                var pagetitle = document.title;
                var pagelink = window.location.href;
                $.post(__HOST + 'livechat_v2.php', {
                    act: 'fsub',
                    pagetitle: pagetitle,
                    pagelink: pagelink,
                    message: text,
                    showtimes: this.showtimes
                }, (res) => {
                    if (res.code == 200) {
                        $('#wlx3_mid').val(res.mid);
                    } else {
                        alert(res.msg);
                        return false;
                    }
                }, 'json');

                localStorage.setItem('isShowReply', true);
                that.isShowReply = true;

                return;
            }
            //this.getReply(text);
        });

        // 回车发送消息
        $("#message-to-send").on('keydown', e => {
            if (e.keyCode == 13) {
                $("#send-btn").click();
                $("#message-to-send").val('');
                return false;
            }
        });

        // 聊天中间弹框
        $('.st-chat-product-dialog').on('click', () => {
            console.log('聊天中间弹框')
            var isMobile = that.isMobile();


            that.firstWelcomeMsg('hide');  // 中间弹窗，不显示欢迎页
            that.smallIconModeMain('hide'); // 小窗口隐藏

            if (that.viewModel == 1) {
                that.start();
            } else if (that.viewModel == 2) {
                that.start2();
            } else if (that.viewModel == 3) {
                that.start3();
            }

            var isStUpRefer = localStorage.getItem('isUpRefer') ? true : false;
            if (isStUpRefer != true) {
                this.trefer = 2;
                if (!this.MID) { this.getMid(); }
                $.post(__HOST + 'updaterefer.php', {
                    uid: __UID,
                    mid: this.MID,
                    refer: this.trefer
                }, (res) => {
                    localStorage.setItem('isUpRefer', true);
                }, 'json');
            }

            // 检查clue是否提交
            let clueSubMsg = localStorage.getItem('chatClueSubmitMsg');
            if (clueSubMsg) {
                console.log('clueSubMsg:' + clueSubMsg);
                clueSubMsg = JSON.parse(clueSubMsg);
                if (!clueSubMsg) clueSubMsg = [];
                let email = clueSubMsg.email ? clueSubMsg.email : '',
                    phone = clueSubMsg.phone ? clueSubMsg.phone : '',
                    fullname = clueSubMsg.fullname ? clueSubMsg.fullname : '';
                if (email) {
                    let contentList = [{ key: 'Full Name', val: fullname }, { key: 'Email', val: email }, { key: 'Phone', val: phone }];
                    let content = '';
                    contentList.forEach((val, key) => {
                        if (val.val) content += ` ${val.key}:${val.val},`;
                    })
                    content = content.replace(/,$/gi, "");
                    VCWS.ws.send(JSON.stringify({
                        type: 'say',
                        content: content,
                        msg_type: 'TEXT',
                        platform: 'CLUE',
                    }));

                    // 获取产品信息
                    var proTitle = $("#st_title").val();
                    if (proTitle) {
                        VCWS.ws.send(JSON.stringify({
                            type: 'get_product',
                            content: 'Do you need the ' + proTitle + '?',
                            room_id: VCWS.room_id,
                            uid: __UID,
                        }));
                    }

                    localStorage.removeItem('chatClueSubmitMsg');
                    that.isShowClue = true;
                    // that.secondWelcomeChange('show', 6000);
                }
            }
        });

        // 点击clue关闭按钮
        $(document).on('click', '.vs_close', function (event) {
            that.isShowClue = true;
            that.secondWelcomeChange('show', 6000); // 显示第二屏
        })

        // 发送产品
        $(document).on("click", ".chat-product-send-btn", function (event) {
            var goodsName = $(this).attr('data-title');
            var goodsImg = $(this).attr('data-img');
            console.log($(this).data('title'));
            console.log($(this).attr('data-title'))
            console.log($(this).attr('class'))

            if ($(this).is(':checked')) {
                VCWS.ws.send(JSON.stringify({
                    type: 'say',
                    content: { name: goodsName, img: goodsImg },
                    msg_type: 'PRODUCT',
                }));
            }

        });

        // 滚动事件
        $(window).scroll(function () {
            let windowHeight = $(this).height(),    // 窗口高度
                scrollTop = $(this).scrollTop(),    // 滚动高度
                documentHeight = $(document).height(),  // 文档高度
                moveDirection = '', // 移动方向
                isMoveBottom = false;

            let currScrollHeight = that.currScrollHeight;
            let str = 'scrollTop:' + scrollTop + ', currScrollHeight:' + currScrollHeight + ', windowHeight:' + windowHeight + ', documentHeight:' + documentHeight;
            // $(".test").html(str);

            if (currScrollHeight > 0) {
                if (scrollTop < currScrollHeight) {
                    moveDirection = 'toTop';
                } else if (scrollTop > currScrollHeight) {
                    moveDirection = 'toBottom';
                }
            }
            that.currScrollHeight = scrollTop;

            if ((scrollTop + windowHeight) >= (documentHeight - 20)) {
                console.log('到底部了');
                console.log(str);
                isMoveBottom = true;
                that.isMoveBottomAgo = true;
                moveDirection = 'toTop';
                // $("#vc-model").attr('style', 'position: static')
                // if (that.viewModel == 1) {
                //     that.start();
                // } else if (that.viewModel == 2) {
                //     that.start2();
                // } else if (that.viewModel == 3) {
                //     that.start3();
                // }
            }

            // console.log('that.isMoveBottomAgo:'+that.isMoveBottomAgo)
            // 到底部 并且 向上滑动：显示
            // if (that.isMoveBottomAgo ) {
            if (moveDirection == 'toTop') {
                that.isMoveBottomAgo = true;
                that.smallIconMode2('show')
            } else if (moveDirection == 'toBottom') {
                that.smallIconMode2('hide')
            }
            // }
        })


        // 监听输入框
        function listenInput() {
            var content = $('#message-to-send').val();
            content = content.trim();
            // console.log('content.length:', content.length)
            var userInputContent = localStorage.getItem('userInputContent');
            // 如果内容没改变也不执行
            if (content.length > 0 && content !== userInputContent) {
                VCWS.ws.send(JSON.stringify({ type: 'input_text', content: content }));
                localStorage.setItem('userInputContent', content);
            }
        }


        // 监听视频
        function listenerVideo() {
            document.getElementsByClassName()
            var elevideo = document.getElementsByClassName('type-video');
            // console.log(elevideo);
            // var elevideo = document.getElementById("video");
            elevideo.addEventListener('loadedmetadata', function () { //加载数据
                //视频的总长度
                console.log(elevideo.duration);
            });
        };
        // listenerVideo();

        // var startx, starty;
        //
        // //获得角度
        // function getAngle(angx, angy) {
        //     return Math.atan2(angy, angx) * 180 / Math.PI;
        // };
        //
        // //根据起点终点返回方向 1向上滑动 2向下滑动 3向左滑动 4向右滑动 0点击事件
        // function getDirection(startx, starty, endx, endy) {
        //     var angx = endx - startx;
        //     var angy = endy - starty;
        //     var result = 0;
        //
        //     //如果滑动距离太短
        //     if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
        //         return result;
        //     }
        //
        //     var angle = getAngle(angx, angy);
        //     if (angle >= -135 && angle <= -45) {
        //         result = 1;
        //     } else if (angle > 45 && angle < 135) {
        //         result = 2;
        //     } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        //         result = 3;
        //     } else if (angle >= -45 && angle <= 45) {
        //         result = 4;
        //     }
        //     return result;
        // }
        //
        // //手指接触屏幕
        // document.addEventListener("touchstart", function(e){
        //     startx = e.touches[0].pageX;
        //     starty = e.touches[0].pageY;
        // }, false);
        //
        //
        // //手指离开屏幕
        // document.addEventListener("touchend", function(e) {
        //     let endx, endy;
        //     endx = e.changedTouches[0].pageX;
        //     endy = e.changedTouches[0].pageY;
        //     let moveDirection = '';
        //     let direction = getDirection(startx, starty, endx, endy);
        //     switch (direction) {
        //         case 0:
        //             // alert("点击！");
        //             break;
        //         case 1:
        //             // alert("向上！");
        //             moveDirection = 'toTop';
        //             break;
        //         case 2:
        //             // alert("向下！");
        //             moveDirection = 'toBottom';
        //             break;
        //         case 3:
        //             // alert("向左！");
        //             moveDirection = 'toLeft';
        //             break;
        //         case 4:
        //             // alert("向右！");
        //             moveDirection = 'toRight';
        //             break;
        //         default:
        //             // alert("点击！");
        //             break;
        //     }
        //
        //     console.log('moveDirection:'+moveDirection)
        //
        //     // 判断是否都底部
        //     var windowheight = $(window).height(),
        //         documentHeight = $(document).height(),
        //         scrolltop = document.documentElement.scrollTop || document.body.scrollTop,  // 滚动高度
        //         isMoveBottom = false,   // 是否移到都底部了
        //         style = $('body').attr('style'),
        //         isAddPosition = false; //
        //     if (style != undefined && style.indexOf('position') != -1) {
        //         isAddPosition = true;
        //     }
        //     let str = 'scrolltop:'+scrolltop+', windowheight:'+windowheight+', documentHeight:'+documentHeight;
        //     console.log(str)
        //     $(".test").html(str);
        //     if ((scrolltop + windowheight >= documentHeight - 20) && !isAddPosition) {
        //         console.log('style typeof :' + typeof(style));
        //         console.log('style:' + style);
        //         console.log('isAddPosition:' + isAddPosition);
        //         console.log('touchmove - 到达底部啦');
        //         isMoveBottom = true;
        //         that.isMoveBottomAgo = true;
        //     }
        //
        //     console.log('that.isMoveBottomAgo:'+that.isMoveBottomAgo)
        //     // 到底部 并且 向上滑动：显示
        //     if (that.isMoveBottomAgo ) {
        //         if (moveDirection == 'toTop'){
        //             that.smallIconMode2('show')
        //         } else if (moveDirection == 'toBottom') {
        //             that.smallIconMode2('hide')
        //         }
        //     }
        //
        // }, false);



        // // 手机端 - touch开始
        // var startX = 0, startY = 0;
        // $("body").on("touchstart", function(e) {
        //     e.preventDefault();
        //     startX = e.originalEvent.changedTouches[0].pageX,
        //         startY = e.originalEvent.changedTouches[0].pageY;
        // });
        //
        //
        // // 移动端滑动到底部
        // $('body').bind("touchmove", function (e) {
        //     e.preventDefault();
        //     var moveEndX = e.originalEvent.changedTouches[0].pageX,
        //         moveEndY = e.originalEvent.changedTouches[0].pageY,
        //         X = moveEndX - startX,
        //         Y = moveEndY - startY,
        //         moveDirection = ''; // 屏幕滑动方向
        //
        //     if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
        //         // alert("left 2 right");
        //         moveDirection = 'toRight';
        //     }
        //     else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
        //         // alert("right 2 left");
        //         moveDirection = 'toLeft';
        //     }
        //     else if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
        //         // alert("top 2 bottom");
        //         moveDirection = 'toBottom';
        //     }
        //     else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
        //         // alert("bottom 2 top");
        //         moveDirection = 'toTop';
        //     }
        //     else{
        //         // alert("just touch");
        //     }
        //     console.log('moveDirection:'+moveDirection)
        //
        //     // 判断是否都底部
        //     var windowheight = $(window).height(),
        //         documentHeight = $(document).height(),
        //         scrolltop = document.documentElement.scrollTop || document.body.scrollTop,  // 滚动高度
        //         isMoveBottom = false,   // 是否移到都底部了
        //         style = $('#vc-model').attr('style'),
        //         isAddPosition = false; //
        //     if (style != undefined && style.indexOf('position') != -1) {
        //         isAddPosition = true;
        //     }
        //
        //     if ((scrolltop + windowheight >= documentHeight - 20) && !isAddPosition) {
        //         console.log('style typeof :' + typeof(style));
        //         console.log('style:' + style);
        //         console.log('isAddPosition:' + isAddPosition);
        //         console.log('touchmove - 到达底部啦');
        //         isMoveBottom = true;
        //         that.isMoveBottomAgo = true;
        //
        //         // $("#vc-model").attr('style', 'position:static');
        //         // $("#vc-model").css({
        //         //     'position': 'static',
        //         //     'padding-top': '20px',
        //         // });
        //         // $("#vc-model > .vc-content-main > .vc-content").css({
        //         //     'width': "100%",
        //         // });
        //         //
        //         // $("#vc-model > .vc-content-main > .vc-content .chat-box").css({
        //         //     'width': "100%",
        //         // });
        //         //
        //         // $("#vc-model > .vc-content-main > .vc-content .close").hide();
        //         //
        //         // if (that.viewModel == 1) {
        //         //     that.start();
        //         // } else if (that.viewModel == 2) {
        //         //     that.start2();
        //         // } else if (that.viewModel == 3) {
        //         //     that.start3();
        //         // }
        //     }
        //
        //     console.log('that.isMoveBottomAgo:'+that.isMoveBottomAgo)
        //
        //     // 到底部 并且 向上滑动：显示
        //     if (that.isMoveBottomAgo ) {
        //         if (moveDirection == 'toTop'){
        //             that.smallIconMode2('show')
        //         } else if (moveDirection == 'toBottom') {
        //             that.smallIconMode2('hide')
        //         }
        //     }
        //
        // })

        // 监听用户发送消息的时间是否超过16秒，如果超过就发送第一条回复
        function listenUserSendMsgTime() {
            // console.log('监听用户发送消息');
            let userSendMsgTime = localStorage.getItem('userSendMsgTime'); // 用户发消息时间
            let serviceSendMsgTime = localStorage.getItem('serviceSendMsgTime'); // 客服发消息时间
            let isSendFirstReplyMsg = localStorage.getItem('isSendFirstReplyMsg'); // 是否发送 第一条回复
            let timestamp = Math.floor(Date.now() / 1000);

            // 发送了第一条回复 或者 用户发消息时间为空时 不继续执行
            if (isSendFirstReplyMsg || !userSendMsgTime || userSendMsgTime.length === 0) {
                // console.log('监听用户发送消息的时间 返回 false 1')
                return false;
            }

            // 客服发送时间 > 用户发送时间
            if (serviceSendMsgTime > userSendMsgTime) {
                // console.log('监听用户发送消息的时间 - 客服发送时间 > 用户发送时间')
                return false;
            }

            let diffTime = timestamp - userSendMsgTime
            if (diffTime < 16) {
                // console.log('监听用户发送消息的时间 - 时间差值', diffTime)
                return false;
            }

            // 发送 第一条回复
            $.ajax({
                url: __HOST + 'livechat_v2.php',
                method: 'POST',
                async: false,
                data: {
                    "act": "send_first_reply_msg",
                    "uid": __UID,
                    "mid": VCWS.room_id,
                    "default_msg": that.replyMsgFirst[0],
                    "default_msg2": that.replyMsgFirst[1],
                },
                success: (data) => {

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            })

            localStorage.setItem('isSendFirstReplyMsg', true);
        }


        // 监听用户留下联系方式30秒未回复，如果超过就发送 最后回复/结束提示
        function listenUserSendEmailMsgTime() {
            // console.log('监听用户留下联系方式');
            let userSendEmailTime = localStorage.getItem('userSendEmailTime'); // 留下联系方式时间
            let serviceSendMsgTime = localStorage.getItem('serviceSendMsgTime'); // 客服发消息时间
            let isSendEndReplyMsg = localStorage.getItem('isSendEndReplyMsg'); // 是否发送 最后回复/结束提示
            let timestamp = Math.floor(Date.now() / 1000);

            // 发送了第一条回复 或者 用户发消息时间为空时 不继续执行
            if (isSendEndReplyMsg || !userSendEmailTime || userSendEmailTime.length === 0) {
                // console.log('监听用户留下联系方式 返回 false 1')
                return false;
            }

            // 客服发送时间 > 用户发送时间
            if (serviceSendMsgTime > userSendEmailTime) {
                // console.log('监听用户发送消息的时间 - 客服发送时间 > 用户发送时间')
                return false;
            }

            let diffTime = timestamp - userSendEmailTime
            if (diffTime < 30) {
                // console.log('监听用户留下联系方式 - 时间差值', diffTime)
                return false;
            }

            // 发送 第一条回复
            $.ajax({
                url: __HOST + 'livechat_v2.php',
                method: 'POST',
                async: false,
                data: {
                    "act": "send_end_reply_msg",
                    "uid": __UID,
                    "mid": VCWS.room_id,
                    "lastmsg": that.replyMsgEnd[0],
                    // "closemsg": that.replyMsgEnd[1],
                },
                success: (data) => {

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            })

            localStorage.setItem('isSendEndReplyMsg', true);
        }

        // 需要定时的方法
        function intervalFunction() {
            listenInput();
            listenUserSendMsgTime();
            listenUserSendEmailMsgTime();
        }

        setInterval(intervalFunction, 2000);
    };

    getFReply(text) {
        $.post(__HOST + 'livechat_v2.php', {
            act: 'defaultmsg',
        }, (res) => {
            if (res.code == 200) {
                setTimeout(() => {
                    this.addReplyMsg(res.reply);
                }, res.rt);
                $('#wlx3_num').val(1);
            } else {
                this.addReplyMsg(res.msg);
            }
        }, 'json');
    }

    getReply(text) {
        var mid = $('#wlx3_mid').val();
        var mnum = $('#wlx3_num').val();
        var uname = $('#wlx3_uname').val();
        $.post(__HOST + 'livechat_v2.php', {
            act: 'livechat',
            mid: mid,
            uname: uname,
            num: mnum,
            message: text
        }, (res) => {
            if (res.code == 200) {
                $('#wlx3_mid').val(res.mid);
                $('#wlx3_num').val(1);
                setTimeout(() => {
                    this.addReplyMsg(res.reply);
                }, res.rt);
            } else {
                this.addReplyMsg(res.msg);
            }
        }, 'json');
    };

    // 增加用户聊天内容
    addUserMsg(msg, msgType, msgId) {
        if (!msg) return;
        let msgHtml = this.createMsgHtml(msg, msgType, msgId);
        let li = document.createElement('li');
        li.className = 'clearfix';
        li.innerHTML = `
    <div class="message-data align-right">
        <span class="message-data-time" >${this.getCurrentTime()}, Today</span> &nbsp; &nbsp;
        <span class="message-data-name" >${this.userName}</span> <i class="me"></i>
    </div>
    <div class="message other-message float-right" id="msg-content-${msgId}">
        ${msgHtml}
    </div>`;
        $("#chat-list").append(li).parseEmotion();
        $('.chat-history').scrollTop(3000);
    };

    // 增加客服聊天内容
    addReplyMsg(msg, msgType, msgId) {
        if (!msg) return;
        let msgHtml = this.createMsgHtml(msg, msgType, msgId);
        let li = document.createElement('li');
        li.innerHTML = `
    <div class="message-data">
                <span class="message-data-name">
                    <i class="online"></i> ${this.serviceName}
                </span>
        <span class="message-data-time">${this.getCurrentTime()}, Today</span>
    </div>
    <div class="message my-message" id="msg-content-${msgId}">
        ${msgHtml}
    </div>`;
        $("#chat-list").append(li).parseEmotion();
        $('.chat-history').scrollTop(3000);
    };

    // 创建聊天内容
    createMsgHtml(msg, msgType, msgId) {
        var msgHtml = `<div>${msg}</div>`;
        if (msgType == 'PRODUCT') {
            var msgImg = (msg && msg.img) ? msg.img : '';
            var msgName = (msg && msg.name) ? msg.name : '';
            msgHtml = `<div><img class="type-product" src="${msgImg}"/></div> <div>${msgName}</div>`;
        } else if (msgType == 'IMAGE') {
            var msgUrl = (msg && msg.url) ? msg.url : '';
            var msgName = (msg && msg.name) ? msg.name : '';
            msgHtml = `<div><img class="type-image" src="${msgUrl}"/></div> <div></div>`;
        } else if (msgType == 'VIDEO') {
            var msgUrl = (msg && msg.url) ? msg.url : '';
            var msgName = (msg && msg.name) ? msg.name : '';
            msgHtml = `
    <video id="video_${msgId}" class="type-video" controls="controls"  >
        <source type="video/mp4" src="${msgUrl}">
    </video>
    `;
        } else if (msgType == 'CALL') {
            // 通话请求中；通话中；通话结束，通话时长12分钟 'INITIATING','IN_CALL','END'
            var callStatus = (msg && msg.status) ? msg.status : '';
            var msgContent = this.getCallStatus(callStatus);

            msgHtml = `
    <div>Call ${msgContent}</div>
    `;
        }
        return msgHtml;
    }

    // 通话初始化
    initAliRtc(status = 'INITIATING') {
        let that = this;
        if (!that.callIsJoinChannel) {
            VCWS.alirtc.init(function () {
                // 发送消息
                VCWS.ws.send(JSON.stringify({
                    type: 'say',
                    msg_type: 'CALL',
                    content: { status: 'INITIATING' }
                }));
                that.callStatus = 'INITIATING';
                that.callIsJoinChannel = true;
                console.log('that.callStatus', that.callStatus)
            })
        }
    }

    addReplyInput(formTag, eventFun) {
        let li = document.createElement('li');
        li.innerHTML = `<div class="message-data">
					<span class="message-data-name">
						<i class="online"></i> ${this.serviceName}
					</span>
    <span class="message-data-time">${this.getCurrentTime()}, Today</span>
</div>
    <div class="message my-message replyInput animateForm">${formTag}</div>`;
        $("#chat-list").append(li);
        $('.chat-history').scrollTop(3000);
        eventFun();
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    };

    // 控制css
    toggleView(num) {
        this.clearClass();
        let cls = this.box.className;
        switch (num) {
            case 1:
                // 显示第一屏欢迎消息
                this.box.className = cls + ' active-one';
                break;
            case 2:
                // 显示邀请表单
                this.box.className = cls + ' active-two';
                break;
            case 3:
                // 显示聊天窗口
                this.box.className = cls + ' active-three';
                break;
            case 4:
                // 手机端 - 聊天窗口底部100%
                this.box.className = cls + ' active-four';
                break;
        }

        // if (num == 3) {
        //     this.sendChatWelcomeMsg();
        // }

        console.log('isMobile:' + this.isMobile());
        var height = 580; // PC
        if (!this.isHideFirstWelcomeMsg) {
            height = 515;
        } else {

        }
        if (this.isMobile()) {
            // height = 460;
            // height = 0; // 不能设置，否则会挡住页面，导致点击不了，显示时再设置高度
            height = 'auto'
        }
        // $('#vc-model').height($(".vc-warp").outerHeight() + $('#vc-model .chat-title').outerHeight());
        // var height = $(window).height();
        $('#vc-model').height(height);
        // $('#vc-model>.vc-content-main>.vc-content').height(690);

    };

    clearClass() {
        $('#vc-model').removeClass('active-one');
        $('#vc-model').removeClass('active-two');
        $('#vc-model').removeClass('active-three');
    };

    hideView() {
        //$('.vc-chat-second-welcome .move-text').remove();
        $('.vc-chat-second-welcome .move-text').hide();
        $(".vc-warp").hide(this.animationTime);
        $(".vc-title").animate({
            opacity: "show",
            display: "block"
        });
        $(".vc-content").hide(this.animationTime);

        $(".vc-content .chat-title").hide(this.animationTime);
        $('#vc-model').height('auto');
        this.clearClass();
        //localStorage.setItem('isHideVcWindow', true);
    };

    showView() {
        $(".vc-warp").show(this.animationTime);
        $(".vc-title").css({
            display: "none"
        });
        $(".vc-content").css({
            display: "flex"
        });

        $(".vc-content .chat-title").css({
            display: "flex"
        });
        $(".vc-content .chat-title").show(this.animationTime);
    };


    // 小窗口模式
    smallIconModeMain(type) {
        console.log('this.smallIconMode:' + this.smallIconMode)
        if (this.isMobile()) {
            if (this.mobileSmallWindowMode == 'img') {
                this.smallIconMode1(type)
            } else if (this.mobileSmallWindowMode == 'row') {
                this.smallIconMode2(type);
            }
        } else {
            if (this.pcSmallWindowMode == 'img') {
                this.smallIconMode1(type)
            } else if (this.pcSmallWindowMode == 'row') {
                this.smallIconMode2(type);
            }
        }

        if (type == 'show') {
            this.secondWelcomeChange('show', 6000);
        } else {
            this.secondWelcomeChange('hide', 0);
        }
    };


    // 小窗口模式1 - 图片
    smallIconMode1(type) {
        var isMobile = this.isMobile();
        console.log('smallIconMode1-type:' + type)

        // 有聊天窗口，必须隐藏
        if (this.isHideVcWindow == false) {
            $(".vc-chat-popup-mini-mode1").hide();
            return;
        }


        if (type == 'show') {
            $(".vc-chat-popup-mini-mode1").show();
        } else if (type == 'hide') {
            $(".vc-chat-popup-mini-mode1").hide();
        }
    };


    // 小窗口模式2 - 固定在底部
    smallIconMode2(type) {
        console.log('smallIconMode2 Start - mobileSmallWindowMode:' + this.mobileSmallWindowMode
            + ', isMoveBottomAgo:' + this.isMoveBottomAgo + ', isHideVcWindow:' + this.isHideVcWindow
        );
        if (this.mobileSmallWindowMode != 'row' || !this.isMoveBottomAgo) { // 滑动时小窗口才出现在底部
            // if (this.mobileSmallWindowMode != 'row') { // 小窗口常驻在底部
            return;
        }
        if (!this.isMobile()) return;

        // 有聊天窗口，必须隐藏
        if (this.isHideVcWindow == false) {
            $(".vc-chat-popup-mini-mode2")
                .addClass('vc-chat-popup-mini-mode2-hide')
                .removeClass('vc-chat-popup-mini-mode2-show');
            return;
        }

        if (type == 'show') {
            $(".vc-chat-popup-mini-mode2")
                .addClass('vc-chat-popup-mini-mode2-show')
                .removeClass('vc-chat-popup-mini-mode2-hide');
        } else if (type == 'hide') {
            $(".vc-chat-popup-mini-mode2")
                .addClass('vc-chat-popup-mini-mode2-hide')
                .removeClass('vc-chat-popup-mini-mode2-show');
        }
    };


    //
    renderElement() {
        // 第二屏欢迎
        let secondWelcome = `<div class="vc-chat-second-welcome" style="display: none"></div>`;
        $('body').append(secondWelcome);

        // 小窗口模式1
        let smallIconMode1 = `
    <div class="vc-chat-popup-mini-mode1" style="display: none">
        <div class="vc-chat-popup-mini">
            <img src="${__HOST}images/kefu.png" alt="online">
            <span class="chat-msg-numbers">3</span>
            <div class="online"><em></em><em></em><em></em></div>
        </div>
    </div>
    `;
        $('body').append(smallIconMode1);

        // 小窗口模式2
        let smallIconMode2 = `
    <div class="vc-chat-popup-mini-mode2" style="display: none">
        <div class="vc-chat-popup-mini">
            <div class="vc-chat-popup-mini-left">
                <img src="${__HOST}images/kefu.png" alt=" online">
                <span class="chat-msg-numbers">3</span>
            </div>

            <div class="vc-chat-popup-mini-center">We can help you find it quickly and provide you with our catalog and price list.</div>

            <div class="vc-chat-popup-mini-right">
                <div class=""><button class="vc-chat-cus-btn vc-chat-now-btn" type="submit">Chat Now</button></div>
                <div class=""><button class="vc-chat-cus-btn vc-chat-price-btn" type="submit">Get Price</button></div>
            </div>
        </div>
    </div>
    `;
        $('body').append(smallIconMode2);


        // 添加产品
        var div = document.createElement("div");
        div.id = 'vc-model';
        var productHtml = '';
        console.log('this.productList:' + this.productList)
        if (this.productList) {
            this.productList.forEach((val, index) => {
                productHtml += `
    <div class="chat-product-list">
        <div class="chat-product-list-left"><img src="${val.img}"/></div>
        <div class="chat-product-list-content">${val.title}</div>
        <div class="chat-product-list-btn">
            <input type="checkbox" class="chat-product-send-btn" data-title="${val.title}" data-img="${val.img}"  />
            <!--<button type="button" class="chat-product-send-btn" data-title="${val.title}" data-img="${val.img}" >Send</button>-->
        </div>
    </div>
    `;
            });
        }

        if (!productHtml) {
            productHtml = '';
        }

        var nowdate = new Date();
        var h = nowdate.getHours();
        var m = nowdate.getMinutes();
        if (h < 10) h = '0' + h;
        if (m < 10) m = '0' + m;
        var ftime = h + ':' + m;
        var htmlStr = `
    <div class="vc-title">
        <div class="toggle-head">
            <div class="left" style="display: none;">
            </div>

        </div>
    </div>

    <div class="vc-content-main">
        <div class="vc-content"  style="display: none;">
            <div class="chat-box">
                <div class="chat-title">
                    <div class="tit">
                        <img id="vc-head" src="` + __HOST + `images/kefu.png" />
                        <div class="t">
                            <h5 id="vc-Name"></h5>
                            <!--<span>Online ( Not Robot )</span>-->
                            <span>Online</span>
                        </div>
                    </div>
                    <a class="close" href="javascript:void(0)"><img src="` + __HOST + `images/close.png" /></a>
                </div>
                <div class="vc-warp chat-box">
                    <div class="vc-inner chat-content">
                        <div id="chat-messages">
                            <h6>` + ftime + `</h6>
                            <div id="chat-messages-inner">

                            </div>
                        </div>
                        <div class="btns">
                            <button class="btn1 chat-now-btn" type="submit">Chat Now</button>
                            <button class="btn2 chat-later-btn" type="submit">Chat Later</button>
                        </div>
                        <p><a onclick='window.open("` + __HOST + `privacy.html","_blank","height=400,width=600,top=100,left=100,scrollbars=no");'>Privacy Policy</a></p>
                    </div>

                    <div class="vc-inner chat-content" style="height:445px;">
                        <form method="post" action="" id="oneForm" class="form-chat">
                            <div>
                                <div class="input-box">
                                    <input type="text" id="wlx3_name" name="wlx3_name" required class="nickName" placeholder="Name *" />
                                </div>
                                <div class="input-box">
                                    <input type="email" id="wlx3_email" name="wlx3_email" maxlength="50" class="c_email" placeholder="E-mail *" />
                                </div>

                                <div class="input-box">
                                    <input type="text" id="wlx3_tel" name="wlx3_tel" class="c_tel" maxlength="20" placeholder="Phone *" />
                                </div>

                                <!--<div class="input-box">
                                  <input type="text" id="wlx3_company" name="wlx3_company" class="c_tel" maxlength="200" placeholder="Company" />
                                </div>-->
                                <!--
                                <div class="input-box">
                                  <textarea id="wlx3_message" name="wlx3_message" maxlength="300" rows="3" class="c_cnt" placeholder="Your Inquiry"></textarea>
                                </div>
                                -->
                            </div>
                            <button class="submit chat-now-form-btn" type="button">Chat Now</button>
                        </form>
                    </div>
                    <div class="vc-inner">
                        <div class="chat-content2">
                            <div class="chat-history">
                                <ul id="chat-list">
                                </ul>
                            </div>
                        </div>
                        <div class="chat-message-form">
                            <input type="hidden" id="wlx3_uname" name="wlx3_uname" value="">
                            <input type="hidden" id="wlx3_mid" name="wlx3_mid" value="">
                            <input type="hidden" id="wlx3_num" name="wlx3_num" value="0">
                            <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                            <div class="text-right">
                                <!--<button id="product-btn" class="chat-product send-btn" style="padding-right: 20px">PRODUCT</button>-->

                                <!--<button id="face-btn" class="chat-face send-btn" style="padding-right: 20px">FACE</button>-->

                                <!--<button id="call-btn" class="send-btn" style="padding-right: 20px">CALL</button>-->

                                <button id="send-btn" class="send-btn" type="submit">SEND</button>
                            </div>
                        </div>
                        <div class="chat-input-text">
                            <div class="chat-input-text-child">
                                Entering<span class="chat-input-text-loading">...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="chat-product-main" style="display: none;">
                <div class="chat-product-head">
                    <div class="close"><a class="close" href="javascript:void(0)"><img src="${__HOST}images/close.png"></a></div>
                </div>


                ${productHtml}

                <!--
                <div class="chat-product-list">
                    <div class="chat-product-list-left"><img src="` + __HOST + `images/kefu.png"/></div>
                    <div class="chat-product-list-right">
                        <div class="chat-product-list-right-content">According to your needs, our team will give you targeted</div>
                        <div class="chat-product-list-right-btn"><button type="button" class="chat-product-send-btn">Send</button></div>
                    </div>
                </div>
                -->


            </div>
        </div>
    </div>

    <div class="video-container1"></div>
    `;

        div.innerHTML = htmlStr;
        $('body').append(div);

        // 表情
        $(document).on("click", ".chat-face", function (event) {
            $(this).sinaEmotion($("#message-to-send"));
            event.stopPropagation();
        });



        // 产品信息
        // $(document).on('click', '#product-btn', function (event) {
        //     if ($("#chat-product-main").length <= 0) {
        //         $('body').append('<div id="chat-product-main">正在加载，请稍后...</div>');
        //     }
        //
        //     var productHtml = `
        //         <div class="close"><a href="javascript:void(0)"><img src="` + __HOST + `images/close.png" /></a></div>
        //         <div class="chat-product-title">
        //             <div class="tit">
        //                 <img id="vc-head" src="` + __HOST + `images/kefu2.jpg" />
        //                 <div class="t">
        //                     <h5 id="vc-Name">YELANGU YLG0103D F4 Limit Follow Focus with Adjustable Gear Ring Belt for Canon / Nikon / Video Cameras / DSLR Cameras</h5>
        //                 </div>
        //             </div>
        //         </div>
        //         <div class="chat-product-footer">
        //             <button id="chat-product-send-btn" class="chat-product send-btn">Send</button>
        //         </div>
        //     `;
        //     $('#chat-product-main').html(productHtml);
        // })


    };

    eventFunc() {

    };

    // 初始化产品
    initProduct() {
        var productStr = localStorage.getItem('chatProductList');
        var productList = JSON.parse(productStr);
        if (!productList) productList = [];
        // console.log('productList:' + productList)

        var proId = $("#st_pid").val(), proImg = $("#st_pic").val(), proTitle = $("#st_title").val();
        var isInsert = false;
        if (!proId || !proImg || !proTitle) {
            return false;
        }

        productList.forEach((val, index) => {
            if (val.id == proId) {
                isInsert = true;
            }
        });
        if (!isInsert) {
            productList.unshift({ id: proId, title: proTitle, img: proImg });
        }
        // 最多展示6个
        if (productList.length > 6) {
            productList.pop();
        }

        console.log('productList-2:' + productList)
        this.productList = productList;
        localStorage.setItem('chatProductList', JSON.stringify(productList));
    };

    // 是否手机端
    isMobile() {
        var mobile_flag = false;
        var screen_width = window.screen.width;
        var screen_height = window.screen.height;
        if (screen_width < 500 && screen_height < 860) {
            // mobile_flag = true;
            return true;
        }
        // return mobile_flag;

        var system = {
            win: false,
            mac: false,
            xll: false,
            ipad: false
        };
        //检测平台
        var p = navigator.platform;
        system.win = p.indexOf("Win") == 0;
        system.mac = p.indexOf("Mac") == 0;
        system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
        system.ipad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;
        //跳转语句，如果是手机访问就自动跳转到wap.baidu.com页面
        if (system.win || system.mac || system.xll || system.ipad) {
            return false;
        } else {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                //alert("微信浏览器");
            } else {
                //alert("手机");
            }
            //window.location.href = "http://www.jdpatro.com/3g/";
            return true;
        }
    };

    // 是否滚动到页面底部
    isScrollBottom() {

    };

    // 监听视频
    listenerVideo(msgId) {
        var elevideo = document.getElementById('video_' + msgId);
        // console.log('duration - ' + document.getElementById('type-video').duration);

        console.log(elevideo);
        elevideo.addEventListener('loadedmetadata', function () { //加载数据
            //视频的总长度
            console.log('视频的总长度' + elevideo.duration);
        });

        elevideo.addEventListener('play', function () { //播放开始执行的函数
            console.log("开始播放");
        });

        elevideo.addEventListener('playing', function () { //播放中
            console.log("播放中");
        });
    };

    // 通话状态
    getCallStatus(callStatus) {
        var msgContent = '';
        if (callStatus == 'INITIATING') {
            msgContent = '( Call by request )';
        } else if (callStatus == 'IN_CALL') {
            msgContent = '( The line is busy )';
        } else if (callStatus == 'END') {
            msgContent = '( Call ended )';
        }
        return msgContent;
    };
}







var liuyanMid = localStorage.getItem('MID');
if (Number(liuyanMid) < 14316886) { liuyanMid = null; localStorage.clear(); }

$.ajax({
    url: __HOST + 'analytics.php?act=config&uid=' + __UID + '&mid=' + liuyanMid,
    async: false,
    method: 'GET',
    success: data => {
        data = JSON.parse(data)
        const config = data.data
        let vcModel = new Wlx3_VcModel(config);
        let inquiryImg = '';
        if (config.ucountry_code) {
            inquiryImg = `<img src="https://flagsapi.com/${config.ucountry_code}/shiny/32.png" />`;
        }

        $("body").append('<div style="display: none;" class="st-chat-product-dialog"></div>');
        $(".st-chat-product-dialog").html(`
    <span>${config.inquire}</span>
    <span><button class="" type="submit">${config.chat_now_btn}</button></span>
    `);

        if (config.is_open_clue == 'on') {
            loadScript(`${__HOST}clue/code.php?v=${__VERSION_CHAT}&uid=${__UID}&clue_version=${config.clue_version}`, function () { });
        }
    }
});

let Wdlx3_timerId = setInterval(() => {
    //console.log('Cookie key is:');
    var wlx3_matomo_key = localStorage.getItem('sformmid') ? localStorage.getItem('sformmid') : '';
    if (typeof _paq !== 'undefined') {
        _paq.push([function () {
            wlx3_matomo_key = this.getVisitorId();
        }]);
        localStorage.setItem('sformmid', wlx3_matomo_key);
    }
    //console.log(wlx3_matomo_key);
    var wlx3_submited_mkey = localStorage.getItem('issmkey') ? localStorage.getItem('issmkey') : null;
    if (wlx3_submited_mkey) { clearInterval(Wdlx3_timerId); }
    var liuyanMid = localStorage.getItem('MID');
    //console.log(liuyanMid);
    if (wlx3_matomo_key && liuyanMid) {
        localStorage.setItem('issmkey', true);
        $.get(__HOST + 'analytics.php?act=updatemkey&uid=' + __UID + '&mid=' + liuyanMid + '&mkey=' + wlx3_matomo_key, {}, function (rr) { });
        console.log('Cleart timer');
        clearInterval(Wdlx3_timerId);
    }
}, 1000); // 每1秒执行一次

