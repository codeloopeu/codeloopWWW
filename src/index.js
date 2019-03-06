import $ from 'jquery';
import { setMobileMenuFullscreen, toggleMobileMenu, hideMobileMenuForDesktop, hideMobileMenuOnClick, setupBanner, raiseInputLabel } from 'js/layout';
import debounce from 'js/debounce';
import { setActiveNavLinks, activateSlideOnClick, sendTrackingDataOnServiceSlideChange, sendTrackingDataOnTestimonySlideChange } from 'js/slides';
import { sendMessage } from 'js/msgs';
import smoothScrolling from 'js/smoothScrolling';
import hideCookieInfoOnClick from 'js/cookieInfo';
import dotsMovement from 'js/movingDots';
import { identifyClient, trackElementsOnScreen, timeVisibleSections, sendStatsCyclically, sendTrackingDataOnClick, sendTrackingDataOnFocus } from 'js/analyseScreen';

require('css/main.scss');

window.jQuery = $; window.$ = $;
require('bootstrap');

$(window).ready(() => {
  sendTrackingDataOnClick();
  sendTrackingDataOnFocus();
  identifyClient();
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

  $(window).on('resize', debounce(() => {
    hideMobileMenuForDesktop();
    setMobileMenuFullscreen();
    setupBanner();
  }, 50));
});
