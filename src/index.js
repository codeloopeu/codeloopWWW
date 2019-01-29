import $ from 'jquery';
import { setMobileMenuFullscreen, toggleMobileMenu, hideMobileMenuForDesktop, hideMobileMenuOnClick, setupBanner, raiseInputLabel } from 'js/layout';
import debounce from 'js/utils';
import { setActiveNavLinks, activateSlideOnClick } from 'js/slides';
import sendMessage from 'js/msgs';
import smoothScrolling from 'js/smoothScrolling';
import hideCookieInfoOnClick from 'js/cookieInfo';

require('css/main.scss');

window.jQuery = $; window.$ = $;
require('bootstrap');

$(window).ready(() => {
  toggleMobileMenu();
  hideMobileMenuOnClick();
  setMobileMenuFullscreen();
  setActiveNavLinks();
  activateSlideOnClick();
  sendMessage();
  raiseInputLabel();
  smoothScrolling();
  hideCookieInfoOnClick();
  $('.c-loop-banner').load(() => {
    setupBanner();
  });

  $(window).on('resize', debounce(() => {
    hideMobileMenuForDesktop();
    setMobileMenuFullscreen();
    setupBanner();
  }, 50));
});
