import $ from 'jquery';

export default function dotsMovement() {
  $(document).on('mousemove', (event) => {
    $('.l-dot').each((i, dot) => {
      const dotsNumber = $('.l-dot').length;
      let modifier;
      if (i % 2) {
        modifier = i;
      } else {
        modifier = 3 * (0.5 * dotsNumber - i);
      }
      const mouseX = event.pageX;
      const mouseY = event.pageY - $(window).scrollTop();
      const centerX = 0.5 * window.innerWidth;
      const centerY = 0.5 * window.innerHeight;
      const dX = 0.003 * window.innerWidth + modifier;
      const dY = 0.003 * window.innerHeight + modifier;
      const ratioX = (centerX - mouseX) / centerX;
      const ratioY = (centerY - mouseY) / centerY;
      $(dot).css({ transform: `translate( ${dX * ratioX}px, ${dY * ratioY}px)` });
    });
  });
}
