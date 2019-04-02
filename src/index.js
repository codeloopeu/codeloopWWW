import $ from 'jquery';
import { setMobileMenuFullscreen, toggleMobileMenu, hideMobileMenuForDesktop, hideMobileMenuOnClick, setupBanner, raiseInputLabel, loadLazyImgs } from 'js/layout';
import debounce from 'js/debounce';
import { setActiveNavLinks, activateSlideOnClick, sendTrackingDataOnServiceSlideChange, sendTrackingDataOnTestimonySlideChange } from 'js/slides';
import { sendMessage } from 'js/api';
import smoothScrolling from 'js/smoothScrolling';
import hideCookieInfoOnClick from 'js/cookieInfo';
import dotsMovement from 'js/movingDots';
import { analyseIfTabActive, trackElementsOnScreen, timeVisibleSections, sendStatsCyclically, sendTrackingDataOnClick, sendTrackingDataOnFocus, sendSessionData } from 'js/analyseScreen';

require('css/main.scss');

window.jQuery = $; window.$ = $;
require('bootstrap');

$(window).ready(() => {
  analyseIfTabActive();
  sendSessionData();
  sendTrackingDataOnClick();
  sendTrackingDataOnFocus();
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
  trackElementsOnScreen();
  timeVisibleSections();
  sendStatsCyclically();
  sendTrackingDataOnServiceSlideChange();
  sendTrackingDataOnTestimonySlideChange();
  loadLazyImgs();

  $(window).on('resize', debounce(() => {
    hideMobileMenuForDesktop();
    setMobileMenuFullscreen();
    setupBanner();
  }, 50));
});
