import $ from 'jquery';
import { setMobileMenuFullscreen, toggleMobileMenu, hideMobileMenuForDesktop, hideMobileMenuOnClick, setupBanner, raiseInputLabel } from 'js/layout';
import debounce from 'js/utils';
import { setActiveNavLinks, activateSlideOnClick } from 'js/slides';
import sendMessage from 'js/msgs';
import smoothScrolling from 'js/smoothScrolling';
import hideAlertOnClick from 'js/alert';

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
  hideAlertOnClick();

  $(window).on('resize', debounce(() => {
    hideMobileMenuForDesktop();
    setMobileMenuFullscreen();
    setupBanner();
  }, 50));
});
