import $ from 'jquery';
import CircleType from 'circletype';

const COLORS = ['#4F4B98', '#2AA89A', '#D6338A', '#F0E400'];
let colorInUse = '';

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export function init() {
  let supportSection = document.querySelector('#supports');
  let circle = document.querySelector('.circle');

  if (circle && supportSection) {
    circle.addEventListener('click', (event) => {
      const target = event.target;
      if (target.closest('.circle__word') != null) {
        if (
          target.closest('.circle__word').classList.contains('circle__word')
        ) {
          let wordID = target.closest('.circle__word').id.split('_')[3];
          activateSection(wordID);
        }
      }

      if (target.classList.contains('circle__icon')) {
        let iconID = target.classList[1].split('_')[3];
        activateSection(iconID);
      }
      let icon = target.closest('.circle__icon_image');
      if (icon) {
        if (icon.classList.contains('circle__icon_image')) {
          let iconID = icon.parentElement.classList[1].split('_')[4];
          activateSection(iconID);
        }
      }
    });

    supportSection.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('menu-circle__item')) {
        let menuItemID = target.classList[1].split('_')[3];
        document.querySelector('.menu-circle__menu').classList.remove('active');
        document
          .querySelector('.menu-circle__choice')
          .classList.remove('opened');
        activateSection(menuItemID);
      }
      if (target.classList.contains('menu-circle__choice')) {
        if (
          document
            .querySelector('.menu-circle__choice')
            .classList.contains('opened')
        ) {
          document
            .querySelector('.menu-circle__choice')
            .classList.remove('opened');
          document
            .querySelector('.menu-circle__menu')
            .classList.remove('active');
        } else {
          document
            .querySelector('.menu-circle__choice')
            .classList.add('opened');
          document.querySelector('.menu-circle__menu').classList.add('active');
        }
      }
    });
  }

  circle.addEventListener('mouseover', (event) => {
    let word = event.target.closest('.circle__word');
    if (word) {
      circle.classList.add('hover-' + word.id.split('_')[3]);
    }
    let icon = event.target.closest('.circle__icon_wrapper');
    if (icon) {
      circle.classList.add('hover-' + icon.classList[1].split('_')[4]);
    }
  });
  circle.addEventListener('mouseout', (event) => {
    let word = event.target.closest('.circle__word');
    if (word) {
      circle.classList.remove('hover-' + word.id.split('_')[3]);
    }
    let icon = event.target.closest('.circle__icon_wrapper');
    if (icon) {
      circle.classList.remove('hover-' + icon.classList[1].split('_')[4]);
    }
  });
}

activateSection(1);

function activateSection(sectionID) {
  let circle = document.querySelector('.circle');
  if (circle) {
    if (+circle.classList[1].split('-')[1] == sectionID) {
      return;
    }
    for (let i = 1; i < 6; i++) {
      circle.classList.remove('activate-' + i);
      document.querySelector('.circle__text_' + i).classList.remove('active');
      setTimeout(() => {
        document
          .querySelector('.menu-circle__item_' + i)
          .classList.remove('active');
      }, 500);
    }
    circle.classList.add('activate-' + sectionID);
    document
      .querySelector('.circle__text_' + sectionID)
      .classList.add('active');
    setTimeout(() => {
      document
        .querySelector('.menu-circle__item_' + sectionID)
        .classList.add('active');
    }, 500);
    document.querySelector('.menu-circle__choice').innerText =
      document.querySelector('.menu-circle__item_' + sectionID).innerText;

    document.querySelector('.circle__circle-words').classList.add('hidden');
    setTimeout(() => {
      document
        .querySelector('.circle__circle-words')
        .classList.remove('hidden');
    }, 1300);

    circle.classList.add('activate-' + sectionID);
    document
      .querySelector('.circle__text_' + sectionID)
      .classList.add('active');

    let color = getRandomColor();
    document
      .querySelector('.circle__text_' + sectionID)
      .querySelectorAll('li')
      .forEach((li) => {
        li.style.textShadow = `0px 0px 10px ${color}, 0px 0px 10px ${color}, 0px 0px 10px ${color}, 0px 0px 10px ${color}`;
      });
    setTimeout(() => {
      document
        .querySelector('.menu-circle__item_' + sectionID)
        .classList.add('active');
    }, 500);
    document.querySelector('.menu-circle__choice').innerText =
      document.querySelector('.menu-circle__item_' + sectionID).innerText;
  }
}

// let icons = document.querySelectorAll('.circle__icon_wrapper');
// let labels = document.querySelectorAll('.circle__word');

// for(let i = 1; i <= icons.length; i++) {

// }
