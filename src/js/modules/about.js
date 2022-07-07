import $ from "jquery";

export function aboutJS() {
  // Переключение инфоблоков
  $(".about__info-toggle").click(function () {
    const pinkBlock = $(".about__info--pink template").html();
    const greenBlock = $(".about__info--green template").html();

    $(".about__info--pink").toggleClass("open", "switch");
    $(".about__info--green").toggleClass("open", "switch");
    $(this).toggleClass("about__info-toggle--green", "switch");

    $(this).text((idx, oldText) => {
      if (oldText == pinkBlock) {
        return greenBlock;
      }
      return pinkBlock;
    });
  });

  let animationIsActive = false;
  let activeCard = "pink";
  const cards = document.querySelector(".about__cards");

  function activateAnimation() {
    let screenResolution = parseInt(window.innerWidth);
    if (!animationIsActive && activeCard == "pink" && screenResolution > 1439) {
      animationIsActive = true;
      cards.classList.add("about__cards_animate");
      document.querySelectorAll(".about__card").forEach((card) => {
        card.classList.add("about__card_animate");
      });
      setTimeout(() => {
        cards.style.transform = "rotateX(75deg) rotateZ(-180deg)";
        document.querySelectorAll(".about__card").forEach((card) => {
          card.classList.remove("about__card_animate");
          card.style.transform =
            "rotateX(-90deg) rotateY(180deg) rotateZ(0deg)";
        });
        cards.classList.remove("about__cards_animate");
        animationIsActive = false;
        activeCard = "green";
      }, 1000);
    }
  }

  function activateForwardAnimation() {
    let screenResolution = parseInt(window.innerWidth);
    if (
      !animationIsActive &&
      activeCard == "green" &&
      screenResolution > 1439
    ) {
      animationIsActive = true;
      cards.classList.add("about__cards_animate2");
      document.querySelectorAll(".about__card").forEach((card) => {
        card.classList.add("about__card_animate2");
      });
      setTimeout(() => {
        cards.style.transform = "rotateX(75deg) rotateZ(0deg)";
        document.querySelectorAll(".about__card").forEach((card) => {
          card.classList.remove("about__card_animate2");
          card.style.transform = "rotateX(-90deg) rotateY(0deg) rotateZ(0deg)";
        });
        cards.classList.remove("about__cards_animate2");
        animationIsActive = false;
        activeCard = "pink";
      }, 1000);
    }
  }

  document
    .querySelector(".about__card.about__card--green")
    .addEventListener("mousemove", activateAnimation);
  document
    .querySelector(".about__card.about__card--pink")
    .addEventListener("mousemove", activateForwardAnimation);
}

// function rotateCard() {
let mouseMoved = false;
if (
  document.querySelector(".about__cards") &&
  document.querySelector(".about__card-wrapper")
) {
  document.querySelector(".about__cards").addEventListener("mousemove", () => {
    mouseMoved = true;
  });
  document
    .querySelector(".about__cards")
    .addEventListener("mousedown", (event) => {
      mouseMoved = false;
    });
  document
    .querySelector(".about__cards")
    .addEventListener("mouseup", (event) => {
      if (event.target.tagName == "BUTTON" || mouseMoved) {
        return;
      }
      let card = event.target.closest(".about__card-wrapper");
      card.classList.toggle("flipped");
    });
}

// }
