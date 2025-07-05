
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        wait_for_update: 500,
        region: [
            'CA', 'US-CA',
            'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB'
        ],
    });
    gtag('set', 'url_passthrough', true);
    gtag('set', 'ads_data_redaction', true);


    if (localStorage['gtag.consent.option'] !== undefined) {
        const option = JSON.parse(localStorage['gtag.consent.option']);
        gtag('consent', 'update', option);
    }



    document.addEventListener('click', function (e) {
        const btnAcceptCookie = e.target.closest('[class="cookie-policy__accept-button"]');
        if (btnAcceptCookie === null) return;
        const option = {
            'analytics_storage': 'granted',
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted'
        };
        gtag('consent', 'update', option);
        localStorage['gtag.consent.option'] = JSON.stringify(option);
    });


    document.addEventListener('click', function (e) {
        const btnRejectCookie = e.target.closest('[class="cookie-policy__deny-button"]');
        if (btnRejectCookie === null) return;
        const option = {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
        };
        gtag('consent', 'update', option);
        localStorage.removeItem('gtag.consent.option');
    });
