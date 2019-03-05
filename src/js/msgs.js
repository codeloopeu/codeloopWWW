import $ from 'jquery';
import { validateForm, resetInputsValidation, showMsgSentInfo, showMsgNotSentInfo } from './formValidation';
import { hideMsgSentInfo } from './layout';

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

export function sendTimers(clientId, sessionId, timerById) {
  const ref = clientId;
  const session = sessionId;
  const datetimeNow = new Date();
  const datetime = datetimeNow.toISOString();
  const visible = [];
  const keys = Object.keys(timerById);
  const values = Object.values(timerById);
  for (let i = 0; i < keys.length; i += 1) {
    visible[i] = {
      id: keys[i],
      time: values[i]
    };
  }
  let jsonObject;
  if (ref === null) {
    jsonObject = { session, datetime, visible };
  } else {
    jsonObject = { ref, session, datetime, visible };
  }

  $.ajax({
    type: 'POST',
    url: 'https://www.codeloop.eu/t.php',
    data: JSON.stringify(jsonObject)
  });
}
