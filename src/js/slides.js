import $ from 'jquery';
import Swiper from 'swiper';

const linkClassArray = ['js-service', 'js-testimony'];
const activeLinkClass = 'c-slide-nav__link--active';
const grayImgUrlArray = ['img/apps-gray.jpg', 'img/product-gray.jpg', 'img/integration-gray.jpg', 'img/team-gray.jpg'];
const colorImgUrlArray = ['img/apps-col.jpg', 'img/product-col.jpg', 'img/integration-col.jpg', 'img/team-col.jpg'];
const slideNavImgClass = '.c-slide-nav__icon-img';

const swiperServices = new Swiper('.swiper-container', {
  speed: 800,
  spaceBetween: 10,
  scrollbar: {
    el: '.swiper-scrollbar'
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
