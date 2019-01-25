import $ from 'jquery';

export default function hideAlertOnClick() {
  const cookieCodeloopAccepted = localStorage.getItem('cookieCodeloopAccepted');
  if (cookieCodeloopAccepted !== 'true') {
    $('.c-alert').removeClass('d-none');
    $('.js-hideAlert').click(() => {
      $('.c-alert').addClass('d-none');
      localStorage.setItem('cookieCodeloopAccepted', 'true');
    });
  }
}
