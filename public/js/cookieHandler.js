document.addEventListener("DOMContentLoaded", function() {
    var cookieConsentBanner = document.getElementById("cookie-consent-banner");
    var acceptCookieConsent = document.getElementById("accept-cookie-consent");

    if (!getCookie("cookie_consent")) {
        cookieConsentBanner.style.display = "block";
    }

    acceptCookieConsent.onclick = function() {
        setCookie("cookie-consent", "accepted", 7);
        cookieConsentBanner.style.display = "none";
    };

    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        var cookieString = name + "=" + (value || "") + expires + "; path=/; SameSite=None; Secure";
        document.cookie = cookieString;
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

});