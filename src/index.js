import $ from 'jquery';
import { setMobileMenuFullscreen, toggleMobileMenu, hideMobileMenuForDesktop, hideMobileMenuOnClick, setupBanner, raiseInputLabel, smoothScrolling } from 'js/layout';
import debounce from 'js/utils';
import { setActiveNavLinks, activateSlideOnClick } from 'js/slides';
import sendMessage from 'js/msgs';

require('css/main.scss');

window.jQuery = $; window.$ = $;
require('bootstrap');

$(document).ready(() => {
  toggleMobileMenu();
  hideMobileMenuOnClick();
  setMobileMenuFullscreen();
  setupBanner();
  setActiveNavLinks();
  activateSlideOnClick();
  sendMessage();
  raiseInputLabel();
  smoothScrolling();

  $(window).on('resize', debounce(() => {
    hideMobileMenuForDesktop();
    setMobileMenuFullscreen();
    setupBanner();
  }, 50));
});
