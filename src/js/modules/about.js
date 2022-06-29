import $ from 'jquery';

export function aboutJS() {
  // Переключение инфоблоков
  $('.about__info-toggle').click(function () {
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

  //   const pinkCardDiv = document.querySelector('.about__card--pink');
  //   const greenCardDiv = document.querySelector('.about__card--green');
  //   const topPosition = 50;
  //   const bottomPosition = -50;
  //   const leftPosition = 70;
  //   const rightPosition = -70;

  //   let pinkCard = { card: pinkCardDiv, currPositionX: leftPosition, currPositionY: topPosition, isActive: true };
  //   let greenCard = { card: greenCardDiv, currPositionX: rightPosition, currPositionY: bottomPosition, isActive: false };
  //   const cards = [pinkCard, greenCard];

  //   pinkCard.card.style.transform = `translate(${leftPosition}px, ${topPosition}px)`;
  //   pinkCard.card.style.zIndex = 1;
  //   greenCard.card.style.transform = `translate(${rightPosition}px, ${bottomPosition}px)`;
  //   greenCard.card.style.zIndex = 0;

  //   let activeCard = pinkCard;
  //   let otherCard = greenCard;

  //   let isAnimationActive = false;

  //   function moveCardTo(card, isActive) {
  //     if (isActive) {
  //       card.card.style.transform = `translate(${x}px, ${y}px)`;
  //     } else {
  //     }
  //   }

  //   function moveCards() {
  //     activeCard.card.style.transform = `translate(${leftPosition + 80}px, ${topPosition - 50}px)`;
  //     otherCard.card.style.transform = `translate(${rightPosition - 80}px, ${bottomPosition + 50}px)`;
  //   }

  //   function animateCards() {
  //     isAnimationActive = true;

  //     moveCards();

  //     isAnimationActive = false;
  //   }

  let animationIsActive = false;
  let activeCard = 'pink';

  function activateAnimation() {
    if (!animationIsActive && activeCard == 'pink') {
      animationIsActive = true;
      document.querySelector('.about__cards').classList.toggle('about__cards_animate');
      document.querySelectorAll('.about__card').forEach((card) => {
        card.classList.toggle('about__card_animate');
      });
      setTimeout(() => {
        document.querySelector('.about__cards').style.transform = 'rotateX(75deg) rotateZ(-180deg)';
        document.querySelectorAll('.about__card').forEach((card) => {
          card.classList.toggle('about__card_animate');
          card.style.transform = 'rotateX(-90deg) rotateY(180deg) rotateZ(0deg)';
        });
        document.querySelector('.about__cards').classList.toggle('about__cards_animate');
        animationIsActive = false;
        activeCard = 'green';
      }, 1000);
    }
  }

  function activateForwardAnimation() {
    if (!animationIsActive && activeCard == 'green') {
      animationIsActive = true;
      document.querySelector('.about__cards').classList.toggle('about__cards_animate2');
      document.querySelectorAll('.about__card').forEach((card) => {
        card.classList.toggle('about__card_animate2');
      });
      setTimeout(() => {
        document.querySelector('.about__cards').style.transform = 'rotateX(75deg) rotateZ(0deg)';
        document.querySelectorAll('.about__card').forEach((card) => {
          card.classList.toggle('about__card_animate2');
          card.style.transform = 'rotateX(-90deg) rotateY(0deg) rotateZ(0deg)';
        });
        document.querySelector('.about__cards').classList.toggle('about__cards_animate2');
        animationIsActive = false;
        activeCard = 'pink';
      }, 1000);
    }
  }

  document.querySelector('.about__card.about__card--green').addEventListener('mousemove', activateAnimation);
  document.querySelector('.about__card.about__card--pink').addEventListener('mousemove', activateForwardAnimation);
}
