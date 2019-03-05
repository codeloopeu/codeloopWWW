import $ from 'jquery';
import { sendEvents } from 'js/msgs';
import uuidv4 from 'js/uuid';

// przenieść do analyseScreen.js
let clientId;
let sessionId;

function sendTrackingDataOnClick() {
  $('.js-clickable').click((event) => {
    const eventType = 'click';
    const elementId = event.target.id;
    sendEvents(clientId, sessionId, elementId, eventType)
  });
}

function sendTrackingDataOnFocus() {
  $('.js-focusable').focus((event) => {
    const eventType = 'focus';
    const elementId = event.target.id;
    sendEvents(clientId, sessionId, elementId, eventType)
  });
}