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
}
