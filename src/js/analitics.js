import $ from 'jquery';
import { sendTimers, sendEvent, registerSession } from 'js/api';
import { getSectionsStats, isTabActive } from 'js/sectionsTracking';
import extractUserDataAndCleanUrl from 'js/userData';

function sendSessionData() {
  const userData = extractUserDataAndCleanUrl();
  registerSession(userData);
}

function sendSectionsStatsCyclically() {
  setInterval(() => {
    if (isTabActive()) {
      sendTimers(getSectionsStats());
    }
  }, 5000);
  setInterval(() => {
    if (!isTabActive()) {
      sendTimers(getSectionsStats());
    }
  }, 300000);
}

function sendTrackingDataOnClick() {
  $('.js-clickable').click((event) => {
    const eventType = 'click';
    const elementId = event.target.id;
    sendEvent(elementId, eventType);
  });
}

function sendTrackingDataOnFocus() {
  $('.js-focusable').focus((event) => {
    const eventType = 'focus';
    const elementId = event.target.id;
    sendEvent(elementId, eventType);
  });
}

export function sendTrackingDataOnSlideChange(activatedSlideId) {
  const eventType = 'slideChanged';
  sendEvent(activatedSlideId, eventType);
}

export function startAnalytics() {
  sendSessionData();
  sendSectionsStatsCyclically();
  sendTrackingDataOnClick();
  sendTrackingDataOnFocus();
}
