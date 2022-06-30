import $ from "jquery";

export function slickInit() {
  $(".team__slider-init").slick({
    mobileFirst: true,
    dots: false,
    infinite: false,
    arrows: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: true,
        },
      },
    ],
  });

  // сдвиг слайдера при долистывании до конца в мобильной и планшетной версии
  $(".team__slider-init").on("afterChange", function (event, slider, slide) {
    if (slide == slider.$slides.length - 1) {
      $(this).addClass("left");
    } else if (slide == 0) {
      $(this).removeClass("left");
    }
  });

  $(".about__infopanel-slider").slick({
    dots: true,
    infinite: false,
    arrows: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  });
}
