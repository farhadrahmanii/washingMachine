$('document').ready(function () {
    var docCookies = {
    getItem: function (sKey) {
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
      var sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + vEnd.toUTCString();
            break;
        }
      }
      document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
      return true;
    },
    removeItem: function (sKey, sPath, sDomain) {
      if (!sKey || !this.hasItem(sKey)) { return false; }
      document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
      return true;
    },
    hasItem: function (sKey) {
      return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: /* optional method: you can safely remove it! */ function () {
      var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
      for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
      return aKeys;
    }
  };

    var config = {
        title: "Our site use cookies",
        content: "We use cookies and similar tools to provide our services. If you don\'t want to accept all cookies, click Personalize cookies.",
        saveText: "SAVE",
        leftText: "Personalize cookies",
        rightText: "Accept",
        cookiePolicy: {
            title: 'Personalize cookies',
            content: [{
                title: 'Essential cookies (Required)',
                content: 'These cookies are strictly necessary to enable access and use of our Platform. They provide necessary functionality to ensure the proper performance, security and functionality of our Platform. These cookies cannot be disabled.',
                disable: true
            }, {
                title: 'Analytical cookies',
                content: 'These cookies help us determine and understand how users interact with and use our Platform.',
                name: 'Analytics cookies'
            }, {
                title: 'Personalization cookies',
                content: 'We use these cookies to make advertising messages more relevant to you. These cookies also perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.',
                name: 'Personalization cookies'
            }, {
                title: 'Marketing cookies',
                content: 'These cookies help us to provide you with more targeted and relevant marketing and evaluate the effectiveness of our marketing communications by monitoring open rate and conversions.',
                name: 'Marketing cookies'
            }, {
                title: 'Social networking cookies',
                content: 'We use these cookies to enable you to share pages and content that you find interesting on our Platform through third-party social networks and other websites.',
                name: 'Social networking cookies'
            }]
        }
    };
    var EXPIRES = 15552000;
    var CLOSE_EXPIRES = 604800;
    var HAS_POLICY = 'hasPolicy';
    var CLOSE_POLICY = 'closePolicy';
    var TRUE_VAL = 'Y';
    var hasShowPolicy = docCookies.getItem(HAS_POLICY) === TRUE_VAL;
    var DenyPolicy = docCookies.getItem(HAS_POLICY) === 'N';
    var closePolicy = docCookies.getItem(CLOSE_POLICY) === TRUE_VAL;

    if (!hasShowPolicy && !closePolicy && !DenyPolicy) {
        renderDetail();
        addDetailEvents();
    }

    function renderDetail() {
        $('body').append('<link rel="stylesheet" type="text/css" href="https://www.service-analytics.com/cookie-policy/cookie-policy.css"><div id="cookie-policy__card">\n<section class="cookie-policy">\n<div class="cookie-policy__desc">We use cookies and similar tools to provide our services. If you don\'t want to accept all cookies, click Personalize cookies.</div>\n<svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class="cookie-policy__close-icon">\n<path d="M867.434667 148.053333a32 32 0 0 1 2.197333 42.816l-2.197333 2.432L552.981333 507.733333l314.453334 314.453334 2.197333 2.432a32 32 0 0 1-47.445333 42.816L507.733333 552.981333 193.28 867.434667a32 32 0 0 1-47.445333-42.816l2.197333-2.432L462.506667 507.733333 148.032 193.28l-2.197333-2.410667a32 32 0 0 1 47.466666-42.837333L507.733333 462.506667l314.453334-314.453334a32 32 0 0 1 45.248 0z">\n</path>\n</svg>\n<div class="cookie-policy__buttons">\n<button type="button" class="cookie-policy__personalize-button">\n<span>Personalize cookies</span>\n</button>\n<button type="button" class="cookie-policy__accept-button">\n<span>Accept</span>\n</button>\n<button type="button" class="cookie-policy__deny-button">\n<span>Deny</span>\n</button>\n</div>\n</section>\n</div>');
    }

    function addDetailEvents() {
        $('.cookie-policy__deny-button').click(function() {
            config.cookiePolicy.content.filter(function (item) {
                return !!item.name;
            }).forEach(function (item) {
                docCookies.setItem(encodeURIComponent(item.name), TRUE_VAL, EXPIRES);
            });
            docCookies.setItem(HAS_POLICY, "N", EXPIRES);
            $('#cookie-policy__card').remove();
        });
        $('.cookie-policy__accept-button').click(function() {
            config.cookiePolicy.content.filter(function (item) {
                return !!item.name;
            }).forEach(function (item) {
                docCookies.setItem(encodeURIComponent(item.name), TRUE_VAL, EXPIRES);
            });
            docCookies.setItem(HAS_POLICY, TRUE_VAL, EXPIRES);
            $('#cookie-policy__card').remove();
        });

        $('.cookie-policy__close-icon').click(function() {
            docCookies.setItem(CLOSE_POLICY, TRUE_VAL, CLOSE_EXPIRES);
            $('#cookie-policy__card').remove();
        });

        $('.cookie-policy__personalize-button').click(function() {
            renderDialog();
            addDialogEvents();
        });
        
    }

    function renderDialog() {
        $('body').append('\n    <div id="cookie-policy__dialog">\n        <div class="cookie-policy__modal-mask"></div>\n        <div tabindex="-1" class="cookie-policy__modal-wrap">\n            <div class="cookie-policy__modal" style="width: 768px;">\n                <div tabindex="0" aria-hidden="true" style="width: 0px; height: 0px; overflow: hidden; outline: none;"></div>\n                <button type="button" aria-label="Close" class="cookie-policy__modal-close">\n                    <span class="cookie-policy__modal-close-icon">\n                        <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" aria-hidden="false" focusable="false">\n                            <path d="M181.088 135.936l1.536 1.44L512 466.741333l329.376-329.365333a32 32 0 0 1 46.688 43.712l-1.44 1.536L557.258667 512l329.365333 329.376a32 32 0 0 1-43.712 46.688l-1.536-1.44L512 557.258667 182.624 886.624a32 32 0 0 1-46.688-43.712l1.44-1.536L466.741333 512 137.376 182.624a32 32 0 0 1 43.712-46.688z">\n                            </path>\n                        </svg>\n                    </span>\n                </button>\n                <div class="cookie-policy__modal-content">\n                    <div class="cookie-policy__modal-body">\n                        <section class="cookie-policy__settings">\n                            <h2 class="cookie-policy__settings-title">Personalize cookies</h2>\n                            <section>\n                                <section class="cookie-policy__setting-item-top">\n                                    <h2 class="cookie-policy__setting-subtitle">\n                                        Essential cookies (Required)\n                                    </h2>\n                                </section>\n                                <section class="cookie-policy__setting-detail">\n                                    These cookies are strictly necessary to enable access and use of\n                                    our Platform. They provide necessary functionality to ensure the proper performance,\n                                    security and functionality of our Platform. These cookies cannot be disabled.\n                                </section>\n                            </section>\n                            <section>\n                                <section class="cookie-policy__setting-item-top">\n                                    <h2 class="cookie-policy__setting-subtitle">\n                                        Analytical cookies\n                                    </h2>\n                                    <section>\n                                        <button type="button" role="switch" data-id="Analytical cookies" class="cookie-policy__setting-swith-btn">\n                                            <div class="cookie-policy__setting-swith-handle"></div>\n                                        </button>\n                                    </section>\n                                </section>\n                                <section class="cookie-policy__setting-detail">\n                                    These cookies help us determine and understand how users\n                                    interact with and use our Platform.\n                                </section>\n                            </section>\n                            <section>\n                                <section class="cookie-policy__setting-item-top">\n                                    <h2 class="cookie-policy__setting-subtitle">Personalization cookies</h2>\n                                    <section>\n                                        <button type="button" role="switch" data-id="Personalization cookies" class="cookie-policy__setting-swith-btn">\n                                            <div class="cookie-policy__setting-swith-handle">\n                                            </div>\n                                        </button>\n                                    </section>\n                                </section>\n                                <section class="cookie-policy__setting-detail">We use these cookies to make advertising messages more relevant\n                                    to you. These cookies also perform functions like preventing the same ad from\n                                    continuously reappearing, ensuring that ads are properly displayed for advertisers,\n                                    and in some cases selecting advertisements that are based on your interests.\n                                </section>\n                            </section>\n                            <section>\n                                <section class="cookie-policy__setting-item-top">\n                                    <h2 class="cookie-policy__setting-subtitle">Marketing cookies</h2>\n                                    <section>\n                                        <button type="button" role="switch" data-id="Marketing cookies" class="cookie-policy__setting-swith-btn">\n                                            <div class="cookie-policy__setting-swith-handle"></div>\n                                        </button>\n                                    </section>\n                                </section>\n                                <section class="cookie-policy__setting-detail">These cookies help us to provide you with more targeted and\n                                    relevant marketing and evaluate the effectiveness of our marketing communications by\n                                    monitoring open rate and conversions.</section>\n                            </section>\n                            <section>\n                                <section class="cookie-policy__setting-item-top">\n                                    <h2 class="cookie-policy__setting-subtitle">Social networking cookies</h2>\n                                    <section>\n                                        <button type="button" role="switch" data-id="Social networking cookies" class="cookie-policy__setting-swith-btn">\n                                            <div class="cookie-policy__setting-swith-handle"></div>\n                                        </button>\n                                    </section>\n                                </section>\n                                <section class="cookie-policy__setting-detail">We use these cookies to enable you to share pages and content\n                                    that you find interesting on our Platform through third-party social networks and\n                                    other websites.\n                                </section>\n                            </section>\n                        </section>\n                    </div>\n                    <div class="cookie-policy__modal-footer">\n                        <button type="button" class="cookie-policy__modal-save-btn">\n                            <span>Save</span>\n                        </button>\n                    </div>\n                </div>\n                <div tabindex="0" aria-hidden="true" style="width: 0px; height: 0px; overflow: hidden; outline: none;">\n                </div>\n            </div>\n        </div>\n    </div>');
    }

    function addDialogEvents() {
        $('.cookie-policy__modal-close').click(function () {
            docCookies.setItem(CLOSE_POLICY, TRUE_VAL, CLOSE_EXPIRES);
            $('#cookie-policy__dialog').remove();
        });

        $('.cookie-policy__modal-close').click(function () {
            if (!docCookies.getItem(CLOSE_POLICY)) {
                docCookies.setItem(CLOSE_POLICY, TRUE_VAL, CLOSE_EXPIRES);
            }
            $('#cookie-policy__dialog').remove();
        });

        $('.cookie-policy__setting-swith-btn').click(function () {
            var id = $(this).attr('data-id');
            $(this).toggleClass('setting-swith-checked');
            if ($(this).hasClass('setting-swith-checked')) {
                docCookies.setItem(encodeURIComponent(id), TRUE_VAL, EXPIRES)
            } else {
                docCookies.removeItem(encodeURIComponent(id));
            }
            docCookies.setItem(HAS_POLICY, TRUE_VAL, EXPIRES);
        });

        $('.cookie-policy__modal-save-btn').click(function () {
            docCookies.setItem(HAS_POLICY, TRUE_VAL, EXPIRES);
            $('#cookie-policy__dialog').remove();
            $('#cookie-policy__card').remove();
        });
    }
});