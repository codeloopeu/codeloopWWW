import $ from 'jquery';
import Swiper from 'swiper';
import { sendTrackingDataOnSlideChange } from 'js/analyseScreen';

const linkClassArray = ['js-service', 'js-testimony'];
const activeLinkClass = 'c-slide-nav__link--active';
const grayImgUrlArray = ['img/apps-gray.jpg', 'img/product-gray.jpg', 'img/integration-gray.jpg', 'img/team-gray.jpg'];
const colorImgUrlArray = ['img/apps-col.jpg', 'img/product-col.jpg', 'img/integration-col.jpg', 'img/team-col.jpg'];
const slideNavImgClass = '.c-slide-nav__icon-img';
const serviceSlideIds = ['service-apps', 'service-product', 'service-migration', 'service-team'];
const testimonySlideIds = ['testimony-aurator', 'testimony-viacom', 'testimony-jz'];


const swiperServices = new Swiper('.swiper-services', {
  speed: 800,
  spaceBetween: 10,
  resistanceRatio: 0,
  scrollbar: {
    el: '.swiper-scrollbar'
  }
});

// eslint-disable-next-line
const swiperTestimony = new Swiper('.swiper-testimony', {
  initialSlide: 1,
  speed: 800,
  spaceBetween: 10,
  loop: true,
  slidesPerView: 'auto',
  centeredSlides: true,
  slideToClickedSlide: true,
  resistanceRatio: 0,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: true
  },
  breakpointsInverse: true,
  breakpoints: {
    768: {
      autoplay: false
    }
  }
});

function activateSlide(linkClass, swiperVar) {
  $(`.${linkClass}`).each((_, link) => {
    const linkedSlideId = $(link).attr('data-slide');
    $(link).click(() => {
      swiperVar.slideTo(linkedSlideId);
    });
  });
}

export function activateSlideOnClick() {
  activateSlide(linkClassArray[0], swiperServices);
}

function setActiveNavLink(linkClass, swiperVar) {
  $(`.${linkClass}`).each((_, link) => {
    const linkedSlideId = parseInt($(link).attr('data-slide'), 10);
    const activeSlideId = parseInt(swiperVar.activeIndex, 10);
    if (linkedSlideId === activeSlideId) {
      const colorImgSrc = colorImgUrlArray[linkedSlideId];
      $(link).addClass(activeLinkClass);
      $(link).find(slideNavImgClass).attr('src', colorImgSrc);
    } else {
      const grayImgSrc = grayImgUrlArray[linkedSlideId];
      $(link).removeClass(activeLinkClass);
      $(link).find(slideNavImgClass).attr('src', grayImgSrc);
    }
  });
}

export function setActiveNavLinks() {
  setActiveNavLink(linkClassArray[0], swiperServices);

  swiperServices.on('slideChange', () => {
    setActiveNavLink(linkClassArray[0], swiperServices);
  });
}

function activeSlideIdName(swiperVar, slideIdArray) {
  const swiperId = swiperVar.realIndex;
  return slideIdArray[swiperId];
}

export function sendTrackingDataOnServiceSlideChange() {
  swiperServices.on('slideChange', () => {
    const activatedSlideId = activeSlideIdName(swiperServices, serviceSlideIds);
    sendTrackingDataOnSlideChange(activatedSlideId);
  });
}

export function sendTrackingDataOnTestimonySlideChange() {
  swiperTestimony.on('slideChange', () => {
    const activatedSlideId = activeSlideIdName(swiperTestimony, testimonySlideIds);
    sendTrackingDataOnSlideChange(activatedSlideId);
  });
}
