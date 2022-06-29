export function init() {
  const config = {
    crossSize: 10,
    crossMargin: 25,
    crossMass: 0.03,
    crossColor: 'rgba(200, 200, 200, 0.9)',
    circleSize: 600,
    bombSize: 300,
    bombMass: 2,
    mouseSize: 100,
    mouseWeight: 0.05,
    blurСoefficient: 3,
    smooth: 0.6,
  };

  let canvas = document.querySelector('#bg');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.backgroundColor = 'black';

  let c = canvas.getContext('2d');

  let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };

  let crosses = [];
  let bombs = [];

  class Cross {
    constructor(x, y, color, mass) {
      this.size = config.crossSize;
      this.mass = mass || config.crossMass;
      this.color = color || config.crossColor;
      this.startPos = { x: x, y: y };
      this.currPos = { x: x, y: y };
      this.vel = { x: 0, y: 0 };
    }

    draw() {
      if (isNaN(this.vel.x) || isNaN(this.vel.x)) {
        this.vel.x = 0;
        this.vel.y = 0;
        this.currPos.x = Math.random() * 4500;
        this.currPos.y = Math.random() * 4500;
      }
      this.currPos.x = this.currPos.x + this.vel.x;
      this.currPos.y = this.currPos.y + this.vel.y;
      drawCross(this.currPos.x, this.currPos.y, this.color, this.size);
    }
  }

  function drawCross(left, top, color, size) {
    size = size ?? config.crossSize;
    c.beginPath();

    c.moveTo(left, top - size / 2);
    c.lineTo(left, top + size / 2);
    c.moveTo(left - size / 2, top);
    c.lineTo(left + size / 2, top);
    c.strokeStyle = color ?? config.crossColor;
    c.stroke();
  }
  function updateCrosses() {
    for (let i = 1; i < crosses.length; i++) {
      let acc = { x: 0, y: 0 };

      let a = crosses[i];
      let b = crosses[0];
      let delta = { x: a.startPos.x - a.currPos.x, y: a.startPos.y - a.currPos.y };
      let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
      let force = dist * a.mass;

      let deltaToMouse = { x: a.currPos.x - b.currPos.x, y: a.currPos.y - b.currPos.y };
      let distToMouse = Math.sqrt(deltaToMouse.x * deltaToMouse.x + deltaToMouse.y * deltaToMouse.y) || 1;
      let forceToMouse = 0;

      let forceToStaticBomb = 0;
      let distToStaticBomb = 0;
      let deltaToStaticBomb = { x: 0, y: 0 };
      if (staticBomb) {
        deltaToStaticBomb = { x: a.currPos.x - staticBomb.currPos.x, y: a.currPos.y - staticBomb.currPos.y };
        distToStaticBomb =
          Math.sqrt(deltaToStaticBomb.x * deltaToStaticBomb.x + deltaToStaticBomb.y * deltaToStaticBomb.y) || 1;
      }
      if (distToStaticBomb < config.circleSize && staticBomb) {
        forceToStaticBomb = (distToStaticBomb - config.circleSize) * 0.03;
      }
      if (distToMouse < config.mouseSize) {
        forceToMouse = (distToMouse - config.mouseSize) * b.mass;
      }
      for (let j = 0; j < bombs.length; j++) {
        let bomb = bombs[j];
        let deltaToBomb = { x: a.currPos.x - bomb.currPos.x, y: a.currPos.y - bomb.currPos.y };
        let distToBomb = Math.sqrt(deltaToBomb.x * deltaToBomb.x + deltaToBomb.y * deltaToBomb.y);
        let forceToBomb = 0;
        distToBomb < config.bombSize ? (forceToBomb = (distToBomb - config.bombSize) * bomb.mass) : (forceToBomb = 0);
        acc.x += deltaToBomb.x * forceToBomb;
        acc.y += deltaToBomb.y * forceToBomb;
      }
      acc.x += delta.x * force - deltaToMouse.x * forceToMouse - deltaToStaticBomb.x * forceToStaticBomb;
      acc.y += delta.y * force - deltaToMouse.y * forceToMouse - deltaToStaticBomb.y * forceToStaticBomb;

      let alpha = (config.mouseSize / distToMouse) * config.blurСoefficient;
      a.color = `rgba(200,200,200,${alpha})`;

      crosses[i].vel.x = crosses[i].vel.x * config.smooth + acc.x * crosses[i].mass;
      crosses[i].vel.y = crosses[i].vel.y * config.smooth + acc.y * crosses[i].mass;
    }
    crosses.map((e) => e.draw());
    bombs.map((e) => e.draw());
  }

  function loop() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    updateCrosses();

    window.requestAnimationFrame(loop);
  }

  crosses.push(new Cross(mouse.x, mouse.y, 'rgba(0,0,0,0)', config.mouseWeight));

  function setPos({ layerX, layerY }) {
    [mouse.x, mouse.y] = [layerX, layerY];
    let cross = crosses[0];
    [cross.currPos.x, cross.currPos.y] = [mouse.x, mouse.y];
  }

  loop();
  function fearCrosses(e) {
    let cross = new Cross(e.clientX, e.clientY, 'rgb(255,0,0)', config.bombMass);
    bombs.push(cross);
    setTimeout(() => bombs.pop(), 50);
  }
  window.addEventListener('resize', () => {
    crosses = [];
    fillCanvas();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  canvas.addEventListener('mousemove', setPos);
  canvas.addEventListener('mousedown', fearCrosses);
  function fillCanvas() {
    for (
      let i = config.crossMargin + config.crossSize / 2;
      i < canvas.width;
      i += config.crossSize + config.crossMargin
    ) {
      for (
        let j = config.crossMargin + config.crossSize / 2;
        j < canvas.height;
        j += config.crossSize + config.crossMargin
      ) {
        let cross = new Cross(i, j);
        cross.draw();
        crosses.push(cross);
      }
    }
  }

  fillCanvas();

  let staticBomb;
  const debugButton = document.querySelector('#debug');
  debugButton.addEventListener('click', () => {
    if (staticBomb) {
      staticBomb = undefined;
    } else {
      let cross = new Cross(canvas.width / 2, canvas.height / 2, 'rgba(255,0,0,0)', 60);
      staticBomb = cross;
    }
  });
}
