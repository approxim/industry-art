import { isMobile } from 'mobile-device-detect';

let isMoved = false;
export function init() {
  let slider = document.querySelector('#team .team__content');
  slider.addEventListener('pointerdown', () => {
    isMoved = false;
  });
  slider.addEventListener('pointerup', (event) => {
    if (!isMoved) {
      event.target.closest('.team__slider-wrap').classList.toggle('active');
    }
  });
  slider.addEventListener('pointermove', () => {
    isMoved = true;
  });
  if (!isMobile) {
    slider.addEventListener('mouseover', (event) => {
      event.target.closest('.team__slider-wrap').classList.add('active');
    });

    slider.addEventListener('mouseout', (event) => {
      event.target.closest('.team__slider-wrap').classList.remove('active');
    });
  }
}
