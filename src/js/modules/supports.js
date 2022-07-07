export function init() {
  let supportSection = document.querySelector('#supports');
  let circle = document.querySelector('.circle');
  circle.addEventListener('click', (event) => {
    console.log(1);
    const target = event.target;
    if (target.classList.contains('circle__word')) {
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
  supportSection.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('menu-circle__item')) {
      let menuItemID = target.classList[1].split('_')[3];
      document.querySelector('.menu-circle__menu').classList.remove('active');
      document.querySelector('.menu-circle__choice').classList.toggle('opened');
      activateSection(menuItemID);
    }
    if (target.classList.contains('menu-circle__choice')) {
      document.querySelector('.menu-circle__menu').classList.toggle('active');
      document.querySelector('.menu-circle__choice').classList.toggle('opened');
      activateSection(menuItemID);
    }
  });
}

activateSection(1);

function activateSection(sectionID) {
  let circle = document.querySelector('.circle');

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
  document.querySelector('.menu-circle__choice').innerText = document.querySelector(
    '.menu-circle__item_' + sectionID
  ).innerText;
}

document.querySelector('.menu-circle').addEventListener('click', (event) => {
  let target = event.target;
  let menu = target.closest('.menu-circle');
  if (!menu.classList.contains('opened')) {
    menu.classList.add('opened');
  } else {
    menu.classList.remove('opened');
  }
});
