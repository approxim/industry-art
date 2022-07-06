import $ from "jquery";

export function tabs() {
  $(function () {
    const content = $(".supports__content > li");
    content.hide().filter(":first").show();

    // Клики по вкладкам.
    $(".supports__tabs a")
      .click(function () {
        content.hide();
        content.filter(this.hash).show();
        $(".supports__tabs a").removeClass("open");
        $(this).addClass("open");
        return false;
      })
      .filter(":first")
      .click();

    // Клики по якорным ссылкам.
    // $('.tabs-target').click(function(){
    //     $('#tabs .tabs-nav a[href=' + $(this).attr('href')+ ']').click();
    // });

    // Отрытие вкладки из хеша URL
    // if(window.location.hash){
    //     $('#tabs-nav a[href=' + window.location.hash + ']').click();
    //     window.scrollTo(0, $("#" . window.location.hash).offset().top);
    // }
  });

import CircleType from 'circletype';
export function init() {
  let circle = document.querySelector('.circle');
  circle.addEventListener('click', (event) => {
    const target = event.target;
    if (
      target.classList.contains('circle__word')
      // target.classList.contains('circle__icon') ||
      // target.classList.contains('circle__icon_image')
    ) {
      let wordID = target.id.split('_')[3];
      activateSection(wordID);
    }
    if (target.classList.contains('circle__icon')) {
      let iconID = target.classList[1].split('_')[3];
      activateSection(iconID);
    }
    if (target.classList.contains('circle__icon_image')) {
      let iconID = target.parentElement.classList[1].split('_')[4];
      activateSection(iconID);
    }
  });
}

activateSection(1);

function activateSection(sectionID) {
  let circle = document.querySelector('.circle');

  for (let i = 1; i < 6; i++) {
    circle.classList.remove('activate-' + i);
    document.querySelector('.circle__text_' + i).classList.remove('active');
  }
  circle.classList.add('activate-' + sectionID);
  document.querySelector('.circle__text_' + sectionID).classList.add('active');

}
