import * as THREE from './node_modules/three';


// Configuración básica de la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear una representación simplificada de una flor
const flowerGroup = new THREE.Group();

// Tallo de la flor (un cilindro verde)
const stemGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 32);
const stemTexture = new THREE.TextureLoader().load('ruta_a_la_textura_del_tallo.jpg');
const stemMaterial = new THREE.MeshBasicMaterial({ map: stemTexture });
const stem = new THREE.Mesh(stemGeometry, stemMaterial);
flowerGroup.add(stem);

// Pétalos de la flor (geométricamente más complejos)
const petalGeometry = new THREE.PlaneGeometry(0.4, 0.4);
const petalTexture = new THREE.TextureLoader().load('ruta_a_la_textura_de_los_petalos.jpg');
const petalMaterial = new THREE.MeshBasicMaterial({ map: petalTexture, transparent: true, side: THREE.DoubleSide });
for (let i = 0; i < 6; i++) {
    const petal = new THREE.Mesh(petalGeometry, petalMaterial);
    petal.rotation.x = Math.PI / 2;
    petal.position.set(Math.cos((i / 6) * Math.PI * 2) * 0.3, 0.7, Math.sin((i / 6) * Math.PI * 2) * 0.3);
    flowerGroup.add(petal);
}

scene.add(flowerGroup);

// Fondo blanco
renderer.setClearColor(0xffffff);

// Posición de la cámara
camera.position.z = 2;

// Función de animación
const animate = () => {
    requestAnimationFrame(animate);

    // Rotación de la flor
    flowerGroup.rotation.y += 0.005;

    // Renderiza la escena
    renderer.render(scene, camera);
};

// Llama a la función de animación
animate();