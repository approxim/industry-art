import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { TweenMax, Linear } from 'gsap';
import { EffectComposer } from './three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from './three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from './three/examples/jsm/postprocessing/ShaderPass.js';
export function letterMain() {
  const scene = new THREE.Scene();

  let objects = [];

  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-300, 400, 500);
  // light.position.set(-14, 68, 27);
  light.target.position.set(0, 300, 0);
  // light.target.position.set(0, 0, 0);

  scene.add(light);
  scene.add(light.target);

  // const light2 = new THREE.SpotLight(color, intensity);
  // light2.position.set(0, 5000, -3000);
  // const temp = new THREE.DirectionalLightHelper(light2);
  // scene.add(temp);
  // light2.castShadow = true;
  // light2.shadow.camera.near = 1;
  // light2.shadow.camera.far = 100;
  // light2.shadow.camera.visible = true;

  // light2.shadow.mapSize.Width = 1024;
  // light2.shadow.mapSize.Height = 1024;

  // // light2.intensity = 15;
  // scene.add(light2);

  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 300;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  var texture = new THREE.TextureLoader().load(
    '../../files/Noise_texture_1.jpg'
  );
  let backgroundTexture;
  new RGBELoader().load('../../files/background_small.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    backgroundTexture = texture;
  });

  var farmTexture = new THREE.TextureLoader().load(
    '../../files/Texture Bake.png'
  );
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector('.promo__letter').appendChild(renderer.domElement);

  const loader = new GLTFLoader();
  loader.load(
    '../../files/Ферма, Фикс плашки.glb',
    function (gltf) {
      let object = gltf.scenes[0];
      object.position.y = -100;
      object.position.x = -15;
      object.rotation.y = 0.2;
      // object.children[0].material = new THREE.MeshLambertMaterial({
      //   map: farmTexture,
      // });
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
      object.position.x = -15;
      object.rotation.y = 0.02;
      object.children[0].material = new THREE.MeshLambertMaterial({
        map: texture,
      });
      objects.push(gltf.scene);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
      console.log(error);
    }
  );

  var mramorTexture = new THREE.TextureLoader().load(
    '../../files/texture-mramor.jpg'
  );

  loader.load(
    '../../files/Building_like_letter_1_4.glb',
    function (gltf) {
      let object = gltf.scenes[0];
      object.position.y = -100;
      object.rotation.y = 0.02;
      object.children[0].material = new THREE.MeshLambertMaterial({
        map: mramorTexture,
      });
      objects.push(gltf.scene);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
      console.log(error);
    }
  );

  // var mramorTexture = new THREE.TextureLoader().load(
  //   '../../files/texture-mramor.jpg'
  // );

  // loader.load(
  //   '../../files/Building_like_letter_1_4.glb',
  //   function (gltf) {
  //     let object = gltf.scenes[0];
  //     object.position.y = -90;
  //     object.position.x = -40;
  //     object.rotation.y = 0.02;

  //     objects.push(gltf.scene);
  //   },
  //   (xhr) => {
  //     console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  //   },
  //   (error) => {
  //     console.log(error);
  //   }
  // );

  loader.load(
    '../../files/green_letter.glb',
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

  let changeObjectTimer = 7000;
  let intervalCounter = 1;
  setInterval(() => {
    changeObject(intervalCounter);

    if (intervalCounter == objects.length - 1) {
      intervalCounter = 0;
    } else {
      intervalCounter++;
    }
  }, changeObjectTimer);

  document.addEventListener('mousemove', mouseMoveHandler);
  var isProcessed = false;
  function mouseMoveHandler(event) {
    if (isProcessed || scene.children[3] == undefined) {
      return;
    }
    isProcessed = true;
    var object = scene.children[3];
    const mousePositionX = event.clientX;
    const mousePositionY = event.clientY;
    const windowHeidth = document.body.clientHeight;
    const windowWidth = document.body.clientWidth;

    const xTop = 6.15555;
    const xBottom = 6.4343160939318965;
    const yLeft = -0.3;
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

  // =====================================================================================

  let materialCylinder;
  const fullCircle = 2 * Math.PI;
  const timing = 30;

  let cylinderContainer = new THREE.Object3D();

  const geometry = new THREE.CylinderBufferGeometry(150, 150, 50, 32, 1, true);
  materialCylinder = new THREE.MeshPhongMaterial({
    color: '#39ff14',
    specular: '#ff0000',
    shininess: 400,
    transparent: true,
    side: THREE.DoubleSide,
    alphaTest: 0.1,
  });

  let tex = document.createElement('canvas');
  let context = tex.getContext('2d', { alpha: false });

  tex.width = 4096;
  tex.height = 512;
  context.font = '150px Geometria';
  context.textBaseline = 'top';
  context.fillStyle = '#fff';
  context.strokeStyle = '#ff0000';
  // context.filter = 'sepia(100%) hue-rotate(180deg)';
  // 'drop-shadow(-5px 5px 2px #f81) drop-shadow(-2px 2px 2px #f81) ';
  context.fillText(
    'ИНДУСТРИЯ      ИНДУСТРИЯ      ИНДУСТРИЯ      ИНДУСТРИЯ      ИНДУСТРИЯ      ИНДУСТРИЯ      ИНДУСТРИЯ      ИНДУСТРИЯ      ',
    0,
    240,
    4096
  );

  var textTexture = new THREE.Texture(tex);
  textTexture.needsUpdate = true;

  materialCylinder.alphaMap = textTexture;
  materialCylinder.alphaMap.magFilter = THREE.NearestFilter;
  materialCylinder.alphaMap.wrapT = THREE.RepeatWrapping;
  materialCylinder.alphaMap.repeat.y = 1;

  let cylinder = new THREE.Mesh(geometry, materialCylinder);
  cylinderContainer.add(cylinder);

  cylinder.position.y = 0;
  cylinderContainer.position.z = 0;
  cylinderContainer.position.x = 0;
  cylinderContainer.position.y = 300;
  cylinderContainer.rotation.x = Math.PI / 12;
  // cylinderContainer.rotation.z = Math.PI / 6;
  cylinderContainer.scale.set(1, 1, 1);

  const tween = TweenMax.fromTo(
    [cylinder.rotation],
    timing,
    {
      y: 0,
    },
    {
      y: -fullCircle,
      repeat: -1,
      // yoyo: true,
      ease: Linear.easeNone,
    }
  );

  const renderScene = new RenderPass(scene, camera);

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
  );
  bloomPass.threshold = 0;
  bloomPass.strength = 0.8;
  bloomPass.radius = 0;

  let composer = new EffectComposer(renderer);
  composer.renderToScreen = true;
  composer.addPass(renderScene);
  composer.addPass(bloomPass);
  scene.add(cylinderContainer);

  const finalPass = new ShaderPass(
    new THREE.ShaderMaterial({
      uniforms: {
        baseTexture: { value: null },
        bloomTexture: { value: composer.renderTarget2.texture },
      },
      defines: {},
    }),
    'baseTexture'
  );
  finalPass.needsSwap = true;

  const finalComposer = new EffectComposer(renderer);
  finalComposer.addPass(renderScene);
  finalComposer.addPass(finalPass);

  // ========================================================================
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
  renderer.autoClear = false;
  function render() {
    if (intervalCounter == 3) {
      //   renderer.render(scene, camera);
      //   composer.render();
      light.intensity = 0.5;
    } else {
      light.intensity = 1;
    }
    renderer.render(scene, camera);

    scene.environment = backgroundTexture;
  }

  animate();

  function debug() {
    changeObjectTimer = 500000;
    document.addEventListener('keyup', (event) => {
      if (event.key == 'ArrowRight') {
        changeObject(intervalCounter);
        if (intervalCounter == objects.length - 1) {
          intervalCounter = 0;
        } else {
          intervalCounter++;
        }
      } else if (event.key == 'ArrowLeft') {
        changeObject(intervalCounter);

        if (intervalCounter == 0) {
          intervalCounter = objects.length - 1;
        } else {
          intervalCounter--;
        }
      }
    });
  }
}
