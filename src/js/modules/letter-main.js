import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
export function letterMain() {
  const scene = new THREE.Scene();

  let objects = [];

  const color = 0xffffff;
  const intensity = 1.3;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(0, 5, 8);
  light.target.position.set(-5, 0, 0);
  scene.add(light);
  scene.add(light.target);

  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 300;

  const renderer = new THREE.WebGLRenderer({ antialias: true });

  var texture = new THREE.TextureLoader().load('../../files/Noise_texture_1.jpg');
  let backgroundTexture;
  new RGBELoader().load('../../files/background_small.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    backgroundTexture = texture;
  });

  // // renderer.setClearColor(0x666666);

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector('.promo__letter').appendChild(renderer.domElement);

  const loader = new GLTFLoader();
  loader.load(
    '../../files/Construction_letter_1_2.glb',
    function (gltf) {
      let object = gltf.scenes[0];
      object.position.y = -100;
      object.rotation.y = 0.2;
      objects.unshift(gltf.scene);
      scene.add(object);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
      console.log(error);
    }
  );

  loader.load(
    '../../files/Bubble_letter_1_3.glb',
    function (gltf) {
      let object = gltf.scenes[0];
      object.position.y = -100;
      object.rotation.y = 0.02;
      object.children[0].material = new THREE.MeshLambertMaterial({ map: texture });
      objects.push(gltf.scene);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
      console.log(error);
    }
  );

  var mramorTexture = new THREE.TextureLoader().load('../../files/texture-mramor.jpg');

  loader.load(
    '../../files/Building_like_letter_1_4.glb',
    function (gltf) {
      let object = gltf.scenes[0];
      object.position.y = -100;
      object.rotation.y = 0.02;
      object.children[0].material = new THREE.MeshLambertMaterial({ map: mramorTexture });
      objects.push(gltf.scene);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
      console.log(error);
    }
  );

  loader.load(
    '../../files/Inflatable_letter_1_4.glb',
    function (gltf) {
      let object = gltf.scenes[0];
      object.position.y = -100;
      object.rotation.y = 0.2;
      objects.push(gltf.scene);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
      console.log(error);
    }
  );

  function changeObject(id) {
    objects.forEach((object, idx) => {
      id == idx ? scene.add(object) : scene.remove(object);
    });
  }

  let intervalCounter = 1;
  setInterval(() => {
    changeObject(intervalCounter);
    if (intervalCounter == 1) {
      scene.environment = backgroundTexture;
    } else {
      scene.environment = null;
    }
    if (intervalCounter == objects.length - 1) {
      intervalCounter = 0;
    } else {
      intervalCounter++;
    }
  }, 7000);

  document.addEventListener('mousemove', mouseMoveHandler);
  var isProcessed = false;
  function mouseMoveHandler(event) {
    if (isProcessed || scene.children[2] == undefined) {
      return;
    }
    isProcessed = true;
    var object = scene.children[2];
    const mousePositionX = event.clientX;
    const mousePositionY = event.clientY;
    const windowHeidth = document.body.clientHeight;
    const windowWidth = document.body.clientWidth;

    const xTop = 5.979617434633654;
    const xBottom = 6.4343160939318965;
    const yLeft = 0;
    const yRight = 0.3;

    const xPercent = (xBottom - xTop) / 100; // Сколько пунктов надо сменить за каждый процент по вертикали
    const yPercent = (yLeft - yRight) / 100; // Сколько пунктов надо сменить за каждый процент по горизонтали

    const mousePositionXPercent = mousePositionX / (windowWidth / 100); // Смещение по горизонтали
    const mousePositionYPercent = mousePositionY / (windowHeidth / 100); // Смещение по вертикали

    const objectRotateToX = mousePositionYPercent * xPercent + xTop; //Поворот вокруг горизонтальной линии
    const objectRotateToY = yLeft - mousePositionXPercent * yPercent; //Поворот вокруг вертикальной линии

    rotateObject(object, objectRotateToX, objectRotateToY);

    isProcessed = false;
  }
  function rotateObject(object, toX, toY) {
    object.rotation.x = toX;
    object.rotation.y = toY;
  }

  window.addEventListener('resize', onWindowResize, false);
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  }

  function animate() {
    requestAnimationFrame(animate);

    render();
  }

  function render() {
    renderer.render(scene, camera);
  }

  animate();
}
