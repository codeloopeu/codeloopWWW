import $ from 'jquery';
import { setMobileMenuFullscreen, toggleMobileMenu, hideMobileMenuForDesktop, hideMobileMenuOnClick, setupBanner } from 'js/layout';
import debounce from 'js/utils';
import { setActiveNavLinks, activateSlideOnClick } from 'js/slides';

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

  $(window).on('resize', debounce(() => {
    hideMobileMenuForDesktop();
    setMobileMenuFullscreen();
    setupBanner();
  }, 50));
});
