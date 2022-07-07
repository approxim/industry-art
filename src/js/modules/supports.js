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
        if (target.closest('.circle__word').classList.contains('circle__word')) {
          let wordID = target.closest('.circle__word').id.split('_')[3];
          activateSection(wordID);
        }
      }

      if (target.classList.contains("circle__icon")) {
        let iconID = target.classList[1].split("_")[3];
        activateSection(iconID);
      }
      if (target.classList.contains('circle__icon_image')) {
        let iconID = target.parentElement.classList[1].split('_')[4];
        activateSection(iconID);
      }
    });

    supportSection.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('menu-circle__item')) {
        let menuItemID = target.classList[1].split('_')[3];
        document.querySelector('.menu-circle__menu').classList.remove('active');
        document.querySelector('.menu-circle__choice').classList.remove('opened');
        activateSection(menuItemID);
      }
      if (target.classList.contains('menu-circle__choice')) {
        if (document.querySelector('.menu-circle__choice').classList.contains('opened')) {
          document.querySelector('.menu-circle__choice').classList.remove('opened');
          document.querySelector('.menu-circle__menu').classList.remove('active');
        } else {
          document.querySelector('.menu-circle__choice').classList.add('opened');
          document.querySelector('.menu-circle__menu').classList.add('active');
        }
      }
    });
  }
}

activateSection(1);

function activateSection(sectionID) {
  let circle = document.querySelector('.circle');
  if (circle) {
    for (let i = 1; i < 6; i++) {
      circle.classList.remove('activate-' + i);
      document.querySelector('.circle__text_' + i).classList.remove('active');
      setTimeout(() => {
        document.querySelector('.menu-circle__item_' + i).classList.remove('active');
      }, 500);
    }
    circle.classList.add('activate-' + sectionID);
    document.querySelector('.circle__text_' + sectionID).classList.add('active');
    setTimeout(() => {
      document.querySelector('.menu-circle__item_' + sectionID).classList.add('active');
    }, 500);
    document.querySelector(".menu-circle__choice").innerText =
      document.querySelector(".menu-circle__item_" + sectionID).innerText;

    document.querySelector(".circle__circle-words").classList.add("hidden");
    setTimeout(() => {
      document
        .querySelector(".circle__circle-words")
        .classList.remove("hidden");
    }, 1300);
    
    circle.classList.add('activate-' + sectionID);
    document.querySelector('.circle__text_' + sectionID).classList.add('active');

    let color = getRandomColor();
    document
      .querySelector('.circle__text_' + sectionID)
      .querySelectorAll('li')
      .forEach((li) => {
        li.style.textShadow = `0px 0px 10px ${color}, 0px 0px 10px ${color}, 0px 0px 10px ${color}, 0px 0px 10px ${color}`;
      });
    setTimeout(() => {
      document
        .querySelector(".menu-circle__item_" + sectionID)
        .classList.add("active");
    }, 500);
    document.querySelector(".menu-circle__choice").innerText =
      document.querySelector(".menu-circle__item_" + sectionID).innerText;
  }
}
