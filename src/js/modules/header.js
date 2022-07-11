import $ from 'jquery';

export function headerJS() {
  // burger-menu
  $('.header__burger, .header__overlay').click(function () {
    $('.header__burger').toggleClass('open');
    $('.header__overlay').toggleClass('open');
    $('.nav-secondary').toggleClass('open');
  });

  $('.nav-secondary__item a').click(function () {
    $('.header__burger').toggleClass('open');
    $('.header__overlay').toggleClass('open');
    $('.nav-secondary').toggleClass('open');
  });

  //   скролл до нужного элемента при клике на пункт меню
}
