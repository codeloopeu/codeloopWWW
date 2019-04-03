import $ from 'jquery';

function startScreenTracking() {
  let tabActive = false;

  $(window).blur(() => {
    tabActive = false;
  });
  $(window).focus(() => {
    tabActive = true;
  });
  $(window).hover(() => {
    tabActive = true;
  }, () => {
    tabActive = false;
  });

  return () => tabActive && !document.hidden;
}
const isTabActive = startScreenTracking();

function isVisible(elem) {
  const $window = $(window);
  const navbarHeight = $('.c-nav').height();
  const viewportTop = $window.scrollTop() + navbarHeight;
  const viewportHeight = $window.height() - navbarHeight;
  const viewportBottom = viewportTop + viewportHeight;
  const $elem = $(elem);
  const top = $elem.offset().top; // eslint-disable-line prefer-destructuring
  const height = $elem.height();
  const bottom = top + height;

  return (top >= viewportTop && top < viewportBottom)
  || (bottom > viewportTop && bottom <= viewportBottom)
  || (height > viewportHeight && top <= viewportTop && bottom >= viewportBottom);
}

function startSectionsTracking() {
  const resolution = 500;
  const timerById = {};
  setInterval(() => {
    if (isTabActive()) {
      const visibleSections = $('section').toArray().filter(isVisible);
      visibleSections.forEach((visibleSection) => {
        const id = $(visibleSection).attr('id');
        if (timerById[id]) {
          timerById[id] += resolution;
        } else {
          timerById[id] = resolution;
        }
      });
    }
  }, resolution);
  return () => timerById;
}

const getSectionsStatsHolder = startSectionsTracking();

export default function getSectionsStats() {
  return getSectionsStatsHolder();
}
