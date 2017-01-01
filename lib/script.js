'use strict';

var renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('profile'), alpha: true, antislias: true });
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
var scene = new THREE.Scene();

var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
var light1 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light1);

var geometry = new THREE.CircleBufferGeometry(200, 200);
var material = new THREE.MeshLambertMaterial({
  color: 0xF3FFE2,
  side: THREE.DoubleSide,
  map: new THREE.TextureLoader().load('profile.jpg')
});
var mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, -1000);
scene.add(mesh);
//mesh.rotation.y -=0.7853982;
function render(e) {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", function () {
    var y = 2 * Math.PI / 360 * event.gamma;
    if (y < 0.785 && y > -0.785) {
      mesh.rotation.y = -y;
    }
  }, true);
}
document.addEventListener('mousemove', function (e) {
  var x = window.innerWidth / 2 - e.screenX;
  mesh.rotation.y = -0.7853982 * x / window.innerWidth;
  var y = window.innerHeight / 2 - e.screenY;
  mesh.rotation.x = -0.7853982 * y / window.innerHeight;
});