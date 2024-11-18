document.addEventListener("DOMContentLoaded", function () {
  let cookieConsentBanner = document.getElementById("cookie-consent-banner");
  let acceptCookieConsent = document.getElementById("accept-cookie-consent");

  if (!getCookie("cookie_consent")) {
    cookieConsentBanner.style.display = "block";
  }

  acceptCookieConsent.onclick = function () {
    setCookie("cookie-consent", "accepted", 7);
    cookieConsentBanner.style.display = "none";
  };

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    let cookieString =
      name + "=" + (value || "") + expires + "; path=/; SameSite=None; Secure";
    document.cookie = cookieString;
  }

  function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
});
