import $ from "jquery";

export function aboutJS() {

    // Переключение инфоблоков
    $('.about__info-toggle').click(function(){
        const pinkBlock = $('.about__info--pink template').html();
        const greenBlock = $('.about__info--green template').html();

        $('.about__info--pink').toggleClass('open', 'switch');
        $('.about__info--green').toggleClass('open', 'switch'); 
        $(this).toggleClass('about__info-toggle--green', 'switch');

        $(this).text((idx, oldText) => {
            if (oldText == pinkBlock) {
                return greenBlock;
            }
            return pinkBlock;
        });
    });    
}


