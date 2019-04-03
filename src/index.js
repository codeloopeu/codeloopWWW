import $ from 'jquery';
import { setMobileMenuFullscreen, toggleMobileMenu, hideMobileMenuForDesktop, hideMobileMenuOnClick, setupBanner, raiseInputLabel, loadLazyImgs } from 'js/layout';
import debounce from 'js/debounce';
import { setActiveNavLinks, activateSlideOnClick, sendTrackingDataOnServiceSlideChange, sendTrackingDataOnTestimonySlideChange } from 'js/slides';
import { sendMessage } from 'js/api';
import smoothScrolling from 'js/smoothScrolling';
import hideCookieInfoOnClick from 'js/cookieInfo';
import dotsMovement from 'js/movingDots';
import { startAnalytics } from 'js/analitics';

require('css/main.scss');

window.jQuery = $; window.$ = $;
require('bootstrap');

$(window).ready(() => {
  startAnalytics();
  toggleMobileMenu();
  hideMobileMenuOnClick();
  setMobileMenuFullscreen();
  setActiveNavLinks();
  activateSlideOnClick();
  sendMessage();
  raiseInputLabel();
  smoothScrolling();
  hideCookieInfoOnClick();
  setupBanner();
  dotsMovement();
  sendTrackingDataOnServiceSlideChange();
  sendTrackingDataOnTestimonySlideChange();
  loadLazyImgs();

  $(window).on('resize', debounce(() => {
    hideMobileMenuForDesktop();
    setMobileMenuFullscreen();
    setupBanner();
  }, 50));
});
