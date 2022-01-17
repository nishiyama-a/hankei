'use strict';

var slider1 = '#slider-1';
var options1 = {
  loop: true,
  // speed: 1000,
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: true,
  autoplay: {
    delay: 3000,
    stopOnLast: false,
    disableOnInteraction: false
  },
  pagination: {
    el: slider1 + ' .swiper-pagination',
  },
  navigation: {
    nextEl: slider1 + ' .swiper-button-next',
    prevEl: slider1 + ' .swiper-button-prev'
  },
  scrollbar: {
    el: slider1 + ' .swiper-scrollbar'
  },
}


var slider2 = '#slider-2';
var options2 = {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 1.2,
  centeredSlides : true,
  navigation: {
    nextEl: slider2 + ' .swiper-button-next',
    prevEl: slider2 + ' .swiper-button-prev'
  },
  breakpoints: {
    767: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
  },

}

var swiper = () => {
  new Swiper(slider1, options1);
  new Swiper(slider2, options2);
};
swiper();