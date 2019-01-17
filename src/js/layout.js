import $ from 'jquery';

export function setMobileMenuFullscreen() {
  const breakpoint = 992;
  if (window.innerWidth < breakpoint) {
    const navbarHeight = $('.c-nav').height();
    $('.c-nav__menu').css('height', window.innerHeight - navbarHeight);
  } else {
    $('.c-nav__menu').css('height', '');
  }
}

export function toggleMobileMenu() {
  $('.c-nav__menu-toggle').click(() => {
    $('.c-nav__menu').toggleClass('h-open');
    $('.c-nav__menu-toggle').toggleClass('h-open');
  });
}

export function hideMobileMenuForDesktop() {
  const breakpointDesktop = 992;
  if (window.innerWidth >= breakpointDesktop) {
    // for desktop widths reset state of mobile menu
    $('.c-nav__menu').removeClass('h-open');
    $('.c-nav__menu-toggle').removeClass('h-open');
  }
}

export function hideMobileMenuOnClick() {
  // reset state of mobile menu after clicking link from mobile menu
  $('.c-nav__menu-link').click(() => {
    $('.c-nav__menu').removeClass('h-open');
    $('.c-nav__menu-toggle').removeClass('h-open');
  });

  $('.c-nav__menu-btn').click(() => {
    $('.c-nav__menu').removeClass('h-open');
    $('.c-nav__menu-toggle').removeClass('h-open');
  });
}

export function setupBanner() {
  $('.c-banner').css('height', window.innerHeight);
}

export function hideMsgSentInfo(parentForm) {
  const msgSentElements = parentForm.find('.js-msgSent');
  msgSentElements.each((_, msgSentElement) => {
    $(msgSentElement).removeClass('show');
  });
  const msgNotSentElements = parentForm.find('.js-msgNotSent');
  msgNotSentElements.each((_, msgNotSentElement) => {
    $(msgNotSentElement).removeClass('show');
  });
}

export function raiseInputLabel() {
  const inputs = $('.js-validate');
  inputs.each((_, input) => {
    const label = $(input).siblings('.c-form__label');

    $(input).focus(() => {
      label.addClass('c-form__label--raised');
      label.css('color', 'rgb(62, 63, 58)');
      if ($(input).is('textarea')) {
        $(input).addClass('c-form__textarea--filled');
      }
    });

    $(input).focusout(() => {
      label.css('color', 'rgb(62, 63, 58)');
      if ($(input).val().length === 0) {
        label.removeClass('c-form__label--raised');
        $(input).removeClass('c-form__textarea--filled');
      }
    });
  });
}
