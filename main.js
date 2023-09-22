import * as THREE from './node_modules/three';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';


const loader = new GLTFLoader();
let model, model2, model3, model4;
let initialY = 0;
let targetY = 0.8;
let ascending = true;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.background = new THREE.Color(0xffffff);
const ambientLight = new THREE.AmbientLight(0x404040);
ambientLight.intensity = 60;
scene.add(ambientLight);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const edges = new THREE.EdgesGeometry(geometry);
const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
const cube = new THREE.LineSegments(edges, material);
cube.position.set(0, 0, 0);
const whitePlaneGeometry = new THREE.PlaneGeometry(10, 10);
const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const whitePlane = new THREE.Mesh(whitePlaneGeometry, whiteMaterial);
whitePlane.rotation.x = -Math.PI / 2;
whitePlane.position.set(0, -2, 0);
scene.add(whitePlane);
loader.load('Sunflower_1.glb', (gltf) => {

  model = gltf.scene;
  model.position.set(0, 1, 0);
  scene.add(model);

  model2 = model.clone();
  model2.position.set(-1, initialY, 0);
  scene.add(model2);

  model3 = model.clone();
  model3.position.set(0, initialY, 1);
  scene.add(model3);

  model4 = model.clone();
  model4.position.set(1, initialY, 0);
  scene.add(model4);

  animateModel();
});
camera.position.z = 5;
camera.position.y = 5;
const controls = new OrbitControls(camera, renderer.domElement);
camera.fov = 45;
camera.updateProjectionMatrix();

function animateModel() {
  // Actualiza la rotación del modelo en cada cuadro
  if (model) {

    if (ascending) {
      // El modelo está subiendo
      model.position.y += 0.003;
      model2.position.y += 0.003;
      model3.position.y += 0.003;
      model4.position.y += 0.003;
      if (model.position.y >= targetY) {
        ascending = false;
      }
    } else {
      // El modelo está bajando
      model.position.y -= 0.002;
      model2.position.y -= 0.002;
      model3.position.y -= 0.002;
      model4.position.y -= 0.002;
      if (model.position.y <= initialY) {
        ascending = true;
      }
    }
    model4.rotation.y = 1
    model2.rotation.y = -1
  }

  // Realiza el renderizado de la escena
  renderer.render(scene, camera);

  // Solicita el próximo cuadro de animación
  requestAnimationFrame(animateModel);
}

animateModel();