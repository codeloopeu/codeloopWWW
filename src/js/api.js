import $ from 'jquery';
import { validateForm, resetInputsValidation, showMsgSentInfo, showMsgNotSentInfo } from 'js/formValidation';
import { hideMsgSentInfo } from 'js/layout';
import { prepareTrackingData, prepareEventData, prepareSessionData } from 'js/trackingData';

export function sendMessage() {
  $('.js-sendMsg').each((_, btn) => {
    $(btn).click(() => {
      const form = $(btn).parents('form');
      hideMsgSentInfo(form);

      if (validateForm(form) === true) {
        const name = $('#contact-form-name').val();
        const email = $('#contact-form-email').val();
        const msg = $('#contact-form-message').val();
        const jsonObject = { name, email, body: msg };

        $.ajax({
          type: 'POST',
          url: 'https://www.codeloop.eu/api/mail.php',
          data: JSON.stringify(jsonObject)
        }).done(() => {
          showMsgSentInfo(form);
          resetInputsValidation(form);
        }).fail(() => {
          showMsgNotSentInfo(form);
        });
      }
    });
  });
}

export function sendTimers(sectionsStats) {
  const jsonObject = prepareTrackingData(sectionsStats);

  $.ajax({
    type: 'POST',
    url: 'https://www.codeloop.eu/api/t.php',
    data: JSON.stringify(jsonObject)
  });
}

export function sendEvent(elementId, eventType) {
  const jsonObject = prepareEventData(elementId, eventType);

  $.ajax({
    type: 'POST',
    url: 'https://www.codeloop.eu/api/e.php',
    data: JSON.stringify(jsonObject)
  });
}

export function registerSession(userData) {
  const jsonObjectPromise = prepareSessionData(userData);

  jsonObjectPromise.done((jsonObject) => $.ajax({
    type: 'POST',
    url: 'https://www.codeloop.eu/api/s.php',
    data: JSON.stringify(jsonObject)
  }));
}
