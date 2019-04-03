import $ from 'jquery';
import { sendTimers, sendEvent, registerSession } from 'js/api';
import uuidv4 from 'js/uuid';

function getClientIdFromUrl() {
  const urlString = window.location.href;
  const url = new URL(urlString);
  return url.searchParams.get('c');
}

function getOrSetClientId() {
  const codeloopId = 'codeloopId';
  const clientIdValueFromLocalStorage = localStorage.getItem(codeloopId);
  const clientIdValue = clientIdValueFromLocalStorage === null
    ? getClientIdFromUrl()
    : clientIdValueFromLocalStorage;
  if (clientIdValue !== null) {
    localStorage.setItem(codeloopId, clientIdValue);
  }
  return clientIdValue;
}

function identifyClientAndCleanUrl() {
  const clientIdValue = getOrSetClientId();
  window.history.replaceState({}, '', '/');
  return clientIdValue;
}

function getOrGenerateAndSaveBrowserId() {
  const codeloopBrowserId = 'codeloopBrowserId';
  let browserIdValue = localStorage.getItem(codeloopBrowserId);
  if (browserIdValue === null) {
    browserIdValue = uuidv4();
    localStorage.setItem(codeloopBrowserId, browserIdValue);
  }
  return browserIdValue;
}

const clientId = identifyClientAndCleanUrl();
const browserId = getOrGenerateAndSaveBrowserId();
const sessionId = uuidv4();

const timerById = {};
const timerInterval = 500;
const sendInterval = 5000;
let tabActive = false;

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
  registerSession(clientId, browserId, sessionId);
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
