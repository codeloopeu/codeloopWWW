import $ from 'jquery';
import getUserInfo from 'session';

function getUserLocation() {
  return $.ajax({
    type: 'GET',
    url: 'https://api.userinfo.io/userinfos',
    timeout: 3000
  });
}

function generateStandardUserInfo() {
  const screen = window.screen ? window.screen : {};
  const history = window.history ? window.history : {};
  const location = window.location ? window.location : {};
  return {
    locale: {
      lang: navigator.language
    },
    current_session: {
      url: location.href,
      path: location.pathname,
      referrer: document.referrer
    },
    browser: {
      browser: navigator.userAgent,
      version: navigator.appVersion,
      os: navigator.platform
    },
    time: {
      tz_offset: -(new Date().getTimezoneOffset()) / 60
    },
    device: {
      screen: {
        width: screen.width,
        height: screen.height
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    },
    extra: {
      previousSites: history.length,
      browserName: navigator.appName,
      browserEngine: navigator.product,
      browserOnline: navigator.onLine,
      dataCookiesEnabled: navigator.cookieEnabled,
      sizeDocW: document.width,
      sizeDocH: document.height,
      sizeAvailW: screen.availWidth,
      sizeAvailH: screen.availHeight,
      scrColorDepth: screen.colorDepth,
      scrPixelDepth: screen.pixelDepth
    }
  };
}

export default function getAllUserInfo() {
  const userInfoDfd = $.Deferred();
  const locationDfd = $.Deferred();

  getUserInfo(window, document, navigator, userInfoDfd.resolve);
  getUserLocation().done(locationDfd.resolve);
  setTimeout(() => {
    userInfoDfd.resolve({});
    locationDfd.resolve(null);
  }, 1000);

  return $.when(userInfoDfd, locationDfd).then((userInfoData, location) => Object.assign(
    {},
    { locationUserInfo: location },
    generateStandardUserInfo(),
    userInfoData
  ));
}
