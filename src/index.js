import $ from 'jquery';
import { setMobileMenuFullscreen, toggleMobileMenu, hideMobileMenuForDesktop, hideMobileMenuOnClick, setupBanner, raiseInputLabel } from 'js/layout';
import debounce from 'js/utils';
import { setActiveNavLinks, activateSlideOnClick } from 'js/slides';
import { sendMessage } from 'js/msgs';
import smoothScrolling from 'js/smoothScrolling';
import hideCookieInfoOnClick from 'js/cookieInfo';
import dotsMovement from 'js/movingDots';
import { identifySession, trackElementsOnScreen, timeVisibleSections, sendStatsCyclically } from 'js/analyseScreen';

require('css/main.scss');

window.jQuery = $; window.$ = $;
require('bootstrap');

$(window).ready(() => {
  identifySession();
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

  $(window).on('resize', debounce(() => {
    hideMobileMenuForDesktop();
    setMobileMenuFullscreen();
    setupBanner();
  }, 50));
});
