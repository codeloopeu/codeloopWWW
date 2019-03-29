import $ from 'jquery';
import { sendTimers, sendEvent, registerSession } from 'js/api';
import uuidv4 from 'js/uuid';

const timerById = {};
const timerInterval = 500;
const sendInterval = 5000;
let clientId;
const sessionId = uuidv4();
let tabActive = false;

function handleNewClient() {
  const urlString = window.location.href;
  const url = new URL(urlString);
  clientId = url.searchParams.get('c');
  if (clientId !== null) {
    localStorage.setItem('codeloopId', clientId);
  }
}

export function identifyClient() {
  clientId = localStorage.getItem('codeloopId');
  if (clientId === null) {
    handleNewClient();
  }
  window.history.replaceState({}, '', '/');
}

export function analyseIfTabActive() {
  if (!document.hidden) {
    tabActive = true;
  }
  $(window).blur(() => {
    tabActive = false;
  });
  $(window).focus(() => {
    tabActive = true;
  });
  $(window).hover(() => {
    tabActive = true;
  },
  () => {
    tabActive = false;
  });
}

function isTabActive() {
  return tabActive && !document.hidden;
}


export function trackElementsOnScreen() {
  $.expr[':'].onScreen = function selectVisibleElements(elem) {
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
  };
}

export function timeVisibleSections() {
  setInterval(() => {
    if (isTabActive()) {
      const visibleSections = $('section').filter(':onScreen');
      visibleSections.each((_, visibleSection) => {
        const id = $(visibleSection).attr('id');
        if (timerById[id]) {
          timerById[id] += timerInterval;
        } else {
          timerById[id] = timerInterval;
        }
      });
    }
  }, timerInterval);
}

function sendStats() {
  sendTimers(sessionId, timerById);
}

export function sendSessionData() {
  registerSession(clientId, sessionId);
}

export function sendStatsCyclically() {
  setInterval(sendStats, sendInterval);
}

export function sendTrackingDataOnClick() {
  $('.js-clickable').click((event) => {
    const eventType = 'click';
    const elementId = event.target.id;
    sendEvent(sessionId, elementId, eventType);
  });
}

export function sendTrackingDataOnFocus() {
  $('.js-focusable').focus((event) => {
    const eventType = 'focus';
    const elementId = event.target.id;
    sendEvent(sessionId, elementId, eventType);
  });
}

export function sendTrackingDataOnSlideChange(activatedSlideId) {
  const eventType = 'slideChanged';
  sendEvent(sessionId, activatedSlideId, eventType);
}
