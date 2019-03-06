import $ from 'jquery';

function validateName(name) {
  const minLength = 2;
  const maxLength = 50;

  return (name.length >= minLength) && (name.length <= maxLength);
}

function validateEmail(email) {
  const reEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  return reEmail.test(email);
}

function validateMsg(msg) {
  const maxLength = 10000;

  return (msg.length <= maxLength);
}

function validateCheckbox(checkbox) {
  return checkbox.is(':checked');
}

function typeValidation(inputToValidate) {
  const validationType = $(inputToValidate).data('validation');
  const input = $(inputToValidate);
  const inputValue = input.val();
  let inputValid = false;

  switch (validationType) {
    case 'name':
      inputValid = validateName(inputValue);
      break;
    case 'email':
      inputValid = validateEmail(inputValue);
      break;
    case 'msg':
      inputValid = validateMsg(inputValue);
      break;
    case 'checkbox':
      inputValid = validateCheckbox(input);
      break;
    default:
      inputValid = false;
      break;
  }

  return inputValid;
}

function validateInput(inputToValidate) {
  if (typeValidation(inputToValidate) === true) {
    $(inputToValidate).addClass('js-valid');
    $(inputToValidate).removeClass('js-invalid');
    $(inputToValidate).siblings('.invalid-feedback').removeClass('show');
  } else {
    $(inputToValidate).removeClass('js-valid');
    $(inputToValidate).addClass('js-invalid');
    $(inputToValidate).siblings('.invalid-feedback').addClass('show');
  }
  $(inputToValidate).removeClass('js-validate');
}

function validateInputOnEvent(inputToValidate) {
  $(inputToValidate).on('keyup blur change', () => {
    validateInput(inputToValidate);
  });
}

export function showMsgSentInfo(form) {
  const msgSentInfos = form.find('.js-msgSent');
  msgSentInfos.each((_, msgSentInfo) => {
    $(msgSentInfo).addClass('show');
  });
}

export function showMsgNotSentInfo(form) {
  const msgNotSentInfos = form.find('.js-msgNotSent');
  msgNotSentInfos.each((_, msgNotSentInfo) => {
    $(msgNotSentInfo).addClass('show');
  });
}

export function resetInputsValidation(form) {
  const inputElements = form.find('.js-valid');
  inputElements.each((_, inputElement) => {
    $(inputElement).addClass('js-validate');
    $(inputElement).removeClass('js-valid');
    $(inputElement).removeClass('js-invalid');
    $(inputElement).off('keyup blur change');
    $(inputElement).val('');
    $(inputElement).removeClass('c-form__label--raised');
    $(inputElement).removeClass('c-form__textarea--filled');
  });
}

export function validateForm(form) {
  const inputsToValidate = form.find('.js-validate');
  inputsToValidate.each((_, inputToValidate) => {
    validateInput(inputToValidate);
    validateInputOnEvent(inputToValidate);
  });

  const invalidInputs = form.find('.js-invalid');
  return invalidInputs.length === 0;
}
