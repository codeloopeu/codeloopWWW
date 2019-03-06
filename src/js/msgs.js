import $ from 'jquery';
import { validateForm, resetInputsValidation, showMsgSentInfo, showMsgNotSentInfo } from './formValidation';
import { hideMsgSentInfo } from './layout';
import { prepareTrackingData, prepareEventData } from './dataPreparation';

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
          url: 'https://www.codeloop.eu/mail.php',
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

export function sendTimers(clientId, session, timerById) {
  const jsonObject = prepareTrackingData(clientId, session, timerById);

  $.ajax({
    type: 'POST',
    url: 'https://www.codeloop.eu/t.php',
    data: JSON.stringify(jsonObject)
  });
}

export function sendEvent(clientId, session, elementId, eventType) {
  const jsonObject = prepareEventData(clientId, session, elementId, eventType);

  $.ajax({
    type: 'POST',
    url: 'https://www.codeloop.eu/e.php',
    data: JSON.stringify(jsonObject)
  });
}
