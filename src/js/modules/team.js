import { isMobile } from 'mobile-device-detect';

let isMoved = false;
export function init() {
  let slider = document.querySelector('#team .team__content');
  slider.addEventListener('pointerdown', () => {
    isMoved = false;
  });
  slider.addEventListener('pointerup', (event) => {
    if (!isMoved) {
      let target = event.target.closest('.team__slider-wrap');
      if (target) {
        target.classList.toggle('active');
      }
    }
  });
  slider.addEventListener('pointermove', () => {
    isMoved = true;
  });
  if (!isMobile) {
    slider.addEventListener('mouseover', (event) => {
      let target = event.target.closest('.team__slider-wrap');
      if (target) {
        target.classList.add('active');
      }
    });

    slider.addEventListener('mouseout', (event) => {
      let target = event.target.closest('.team__slider-wrap');
      if (target) {
        target.classList.remove('active');
      }
    });
  }
}
