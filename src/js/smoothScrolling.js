import $ from 'jquery';

export default function smoothScrolling() {
  $('a[href*="#"]:not([href="#"])').click(function scrollTo() {
    // eslint-disable-next-line comma-spacing
    if (window.location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && window.location.hostname === this.hostname) {
      let target = $(this.hash);
      target = target.length ? target : $(`[name=${this.hash.slice(1)}]`);
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
    return true;
  });
}
