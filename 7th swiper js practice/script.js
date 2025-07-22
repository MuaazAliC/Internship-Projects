const swiper = new Swiper('.swiper', {
   
  loop: true,

      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
   slidesPerView: 1,
  spaceBetween: 10,
  
  breakpoints: {
    
    320: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    
    480: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    
    640: {
      slidesPerView: 4,
      spaceBetween: 30
    }
  },
   autoplay: {
   delay: 1300,
 },
});

