import $ from "jquery";

export function slickInit() {
  $('.team__slider-init').slick({
    mobileFirst: true,
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ]
  });
}
