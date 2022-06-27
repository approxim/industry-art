export function letterMain () {
  window.onload = function () {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 10000);
  
    var render = new THREE.WebGLRenderer({ antialias: true });
    render.setSize(window.innerWidth, window.innerHeight);
    // render.setClearColor(0x2a2525);
    document.querySelector('.promo__letter').appendChild(render.domElement);
  
    //размер буквы
    camera.position.z = 360;
  
    var light = new THREE.DirectionalLight(0xfff7e8, 1);
    scene.add(light);
  
    var amColor = '#faffe3';
    var amLight = new THREE.AmbientLight(amColor);
    scene.add(amLight);
  
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('../files/bub.mtl', function (materials) {
      materials.preload();
  
      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load('../files/bub.obj', function (object) {
        object.scale.x *= -1;
        object.position.y = -80;
        object.rotation.y = 10;
        scene.add(object);
      });
    });
  
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
      const xBottom = 7;
      const yLeft = 15.471150286814033;
      const yRight = 15.8733352628387184;
  
      const xPercent = (xBottom - xTop) / 100; // Сколько пунктов надо сменить за каждый процент по вертикали
      const yPercent = (yLeft - yRight) / 100; // Сколько пунктов надо сменить за каждый процент по горизонтали
      // console.log(xPercent, yPercent);
  
      const mousePositionXPercent = mousePositionX / (windowWidth / 100); // Смещение по горизонтали
      const mousePositionYPercent = mousePositionY / (windowHeidth / 100); // Смещение по вертикали
  
      const objectRotateToX = mousePositionYPercent * xPercent + xTop; //Поворот вокруг горизонтальной линии
      const objectRotateToY = yLeft - mousePositionXPercent * yPercent; //Поворот вокруг вертикальной линии
  
      rotateObject(object, objectRotateToX, objectRotateToY);
  
      // console.log(mousePositionXPercent, mousePositionYPercent);
      // console.log(objectRotateToX, objectRotateToY);
  
      isProcessed = false;
    }
    function rotateObject(object, toX, toY) {
      // while (object.rotation.x < toX || object.rotation.y < toY) {}
      object.rotation.x = toX;
      object.rotation.y = toY;
    }
  
    // var controls = new THREE.TrackballControls(camera);
  
    var rendering = function () {
      requestAnimationFrame(rendering);
      // controls.update();
      render.render(scene, camera);
    };
  
    rendering();
  };
  
  
}
