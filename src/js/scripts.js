$(document).ready(function() {
	var swiper = new Swiper('.ferramentas-solucoes__swiper .swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 10,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '#ferramentas-solucoes .btn-next',
        prevEl: '#ferramentas-solucoes .btn-prev',
      },
    });
});
