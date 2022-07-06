const COLORS = ["#4F4B98", "#2AA89A", "#D6338A", "#F0E400"];
let colorInUse = "";

const sections = document.querySelectorAll("section");
const clicksToScroll = 5;
const maxScroll = clicksToScroll * sections.length - 1;

let wheelCounter = 0;
let currentSection = 0;

function getRandomColor() {
  let randomNumber = Math.random() * COLORS.length;
  let randomNaturalNumber = Math.floor(randomNumber);
  return COLORS[randomNaturalNumber];
}

function activateSection(sectionID) {
  let section = sections[sectionID];
  sections.forEach((sectionToRemove) => {
    sectionToRemove.classList.remove("open");
    setTimeout(() => {
      sectionToRemove.style.display = "none";
      section.style.display = "";
      setTimeout(() => {
        section.classList.add("open");
      }, 50);
    }, 500);
  });

  currentSection = sectionID;
}

function activateNavItem(item, navItems) {
  navItems.forEach((item) => {
    item.classList.remove("open");
    item.querySelector("a").style.color = "";
  });
  let color = getRandomColor();
  while (color == colorInUse) {
    color = getRandomColor();
  }
  colorInUse = color;
  item.classList.add("open");
  item.querySelector("a").style.color = color;
}

export function init() {
  let navItems = document.querySelectorAll(".nav-main__item");
  const navList = document.querySelector(".nav-main__list");

  activateSection(0);
  activateNavItem(navItems[0], navItems);

  navList.addEventListener("click", (event) => {
    let navItem = event.target.closest(".nav-main__item");
    if (navItem) {
      activateNavItem(navItem, navItems);

      let sectionToScroll;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].id == navItem.dataset.scroll) {
          sectionToScroll = i;
        }
      }
      wheelCounter = sectionToScroll * 5;
      activateSection(sectionToScroll);
    }
  });

  document.body.style.overflow = "hidden";
  document.addEventListener("wheel", (event) => {
    const scrollDelta = event.deltaY;
    scrollDelta > 0 ? wheelCounter++ : wheelCounter--;
    if (wheelCounter < 0) {
      wheelCounter = 0;
    } else if (wheelCounter > maxScroll) {
      wheelCounter = maxScroll;
    }

    let section = Math.floor(wheelCounter / 5);
    if (section == currentSection) {
      return;
    } else {
      activateSection(section);
      activateNavItem(navItems[section], navItems);
    }
  });
}
