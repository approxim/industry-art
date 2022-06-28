let wheelCounter = 0;
setInterval(() => console.log(wheelCounter), 0.3);
export function init() {
  document.body.style.overflow = 'hidden';
  document.addEventListener('wheel', (event) => {
    const scrollDelta = event.deltaY;
    scrollDelta > 0 ? wheelCounter++ : wheelCounter--;
    if (wheelCounter < 0) {
      wheelCounter = 0;
    }
  });
}
