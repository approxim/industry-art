import $ from "jquery";

const COLORS = ["#4F4B98", "#2AA89A", "#D6338A", "#F0E400"];
let colorInUse = "";

let isFunctionalActive = true;

const sections = document.querySelectorAll("section");
console.log(sections);
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
  if (isFunctionalActive) {
    let section = sections[sectionID];
    wheelCounter = sectionID * clicksToScroll;
    sections.forEach((sectionToRemove) => {
      sectionToRemove.classList.remove("open");
      setTimeout(() => {
        sectionToRemove.style.display = "none";

        section.style.display = "";
        $(".team__slider-init")
          .slick("unslick")
          .slick({
            mobileFirst: true,
            dots: false,
            infinite: false,
            arrows: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  arrows: true,
                },
              },
              {
                breakpoint: 1365,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  arrows: true,
                },
              },
            ],
          });
        $(".about__infopanel-slider").slick("unslick").slick({
          dots: true,
          infinite: false,
          arrows: false,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
        });

        setTimeout(() => {
          section.classList.add("open");
        }, 50);
      }, 500);
    });

    currentSection = sectionID;
  }
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

  overflowChanger();
  window.addEventListener("resize", overflowChanger);
  let anchor = window.location.hash;
  if (anchor == "#promo") {
    activateSection(0);
    activateNavItem(navItems[0], navItems);
  } else if (anchor == "#about") {
    activateSection(1);
    activateNavItem(navItems[1], navItems);
  } else if (anchor == "#supports") {
    activateSection(2);
    activateNavItem(navItems[2], navItems);
  } else if (anchor == "#team") {
    activateSection(3);
    activateNavItem(navItems[3], navItems);
  } else if (anchor == "#footer") {
    activateSection(4);
    activateNavItem(navItems[4], navItems);
  } else {
    activateSection(0);
    activateNavItem(navItems[0], navItems);
  }

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

function overflowChanger() {
  if (parseInt(window.innerWidth) > 767) {
    document.body.style.overflow = "hidden";
    activateSection(0);
    activateNavItem(
      document.querySelectorAll(".nav-main__item")[0],
      document.querySelectorAll(".nav-main__item")
    );
    isFunctionalActive = true;
  } else {
    document.body.style.overflow = "";
    sections.forEach((section) => {
      section.style.display = "";
    });
    isFunctionalActive = false;
  }
}
