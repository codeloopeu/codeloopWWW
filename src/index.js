import $ from 'jquery';
import {
  setMobileMenuFullscreen, toggleMobileMenu, hideMobileMenuForDesktop, hideMobileMenuOnClick
} from 'js/layout';
import debounce from 'js/utils';

require('css/main.scss');

window.jQuery = $; window.$ = $;
require('bootstrap');

$(document).ready(() => {
  toggleMobileMenu();
  hideMobileMenuOnClick();
  setMobileMenuFullscreen();

  $(window).on('resize', debounce(() => {
    hideMobileMenuForDesktop();
    setMobileMenuFullscreen();
  }, 50));
});
