const COLORS = ['#4F4B98', '#2AA89A', '#D6338A', '#F0E400'];
let colorInUse = '';

function getRandomColor() {
  let randomNumber = Math.random() * COLORS.length;
  let randomNaturalNumber = Math.floor(randomNumber);
  return COLORS[randomNaturalNumber];
}

function activateNavItem(item) {
  let color = getRandomColor();
  while (color == colorInUse) {
    color = getRandomColor();
  }
  colorInUse = color;
  item.querySelector('a').style.color = color;
}

export function init() {
  let navItems = document.querySelectorAll('.nav-main__item');
  const navList = document.querySelector('.nav-main__list');

  navList.addEventListener('click', (event) => {
    let navItem = event.target.closest('.nav-main__item');
    if (navItem) {
      navItems.forEach((item) => (item.querySelector('a').style.color = ''));
      activateNavItem(navItem);
    }
  });
}
