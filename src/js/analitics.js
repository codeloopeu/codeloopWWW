import $ from 'jquery';
import { sendTimers, sendEvent, registerSession } from 'js/api';
import { getSectionsStats, isTabActive } from 'js/sectionsTracking';
import extractUserDataAndCleanUrl from 'js/userData';

function sendSessionData() {
  const userData = extractUserDataAndCleanUrl();
  registerSession(userData);
}

function sendSectionsStatsCyclically() {
  const sendInterval = isTabActive() ? 5000 : 300000;
  setTimeout(() => {
    sendTimers(getSectionsStats());
    sendSectionsStatsCyclically();
  }, sendInterval);
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
