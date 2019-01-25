import $ from 'jquery';

export default function hideCookieInfoOnClick() {
  const cookieCodeloopAccepted = localStorage.getItem('cookieCodeloopAccepted');
  if (cookieCodeloopAccepted !== 'true') {
    $('.c-cookie-info').removeClass('d-none');
    $('.js-hideCookieInfo').click(() => {
      $('.c-cookie-info').addClass('d-none');
      localStorage.setItem('cookieCodeloopAccepted', 'true');
    });
  }
}
