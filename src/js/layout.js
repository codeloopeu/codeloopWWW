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

function setBannerHeight() {
  const windowHeight = window.innerHeight;
  const windowWidth = $('.container-fluid').innerWidth();
  const heroHeight = $('.c-banner__hero').outerHeight();
  const bannerHeightMin = heroHeight * 1.4 + 80 < 568 ? 568 : heroHeight * 1.4 + 80;
  const bannerHeightMax = 1440;
  let bannerHeight;

  if (windowHeight < 0.55 * windowWidth) {
    bannerHeight = 0.55 * windowWidth;
  } else if (windowHeight > 2 * windowWidth) {
    bannerHeight = 2 * windowWidth;
  } else {
    bannerHeight = windowHeight;
  }

  if (bannerHeight > bannerHeightMax) {
    bannerHeight = bannerHeightMax;
  } else if (bannerHeight < bannerHeightMin) {
    bannerHeight = bannerHeightMin;
  }

  $('.c-banner').css('height', bannerHeight);
  return bannerHeight;
}

function setDotsPosition(bannerHeight) {
  const heroHeight = $('.c-banner__hero').outerHeight();
  const dotsPosition1 = 0.72 * bannerHeight > (0.08 + 0.05) * bannerHeight + heroHeight
    ? 0.72 * bannerHeight : (0.08 + 0.05) * bannerHeight + heroHeight;
  $('.js-dots-1').css('bottom', dotsPosition1);

  const loopHeight = $('.c-loop-banner').outerHeight();
  const dotsPosition2 = 0.45 * bannerHeight < (0.6 - 0.35) * loopHeight + 0.2 * bannerHeight
    ? 0.45 * bannerHeight : (0.6 - 0.35) * loopHeight + 0.2 * bannerHeight;

  $('.js-dots-2').css('top', dotsPosition2);
}

export function setupBanner() {
  const bannerHeight = setBannerHeight();
  setDotsPosition(bannerHeight);
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
