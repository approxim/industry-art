import $ from "jquery";

export function headerJS() {
  // burger-menu
  $(".header__burger, .header__overlay").click(function () {
    $(".header__burger").toggleClass("open");
    $(".header__overlay").toggleClass("open");
    $(".nav-secondary").toggleClass("open");
  });

  $(".nav-secondary__item a").click(function () {
    $(".header__burger").toggleClass("open");
    $(".header__overlay").toggleClass("open");
    $(".nav-secondary").toggleClass("open");
  });

  //   скролл до нужного элемента при клике на пункт меню
  $("[data-scroll]").on("click", function (event) {
    event.preventDefault();
    let elementId = $(this).data("scroll");
    let elementOffset = $(elementId).offset().top;

    // nav.removeClass("open");

    $("html, body").animate(

      {
        scrollTop:
          elementOffset -
          65 /*65 это отступ(смещение) для уточнения позиционирования при скролле документа*/,
      },
      700
    );
  });
}
