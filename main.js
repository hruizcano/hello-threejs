import * as THREE from 'three';
import Factory from './components/factory';

const factory = new Factory();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);
camera.position.z = 30;

const cube = factory.generateCube(3, 0x00ff00);
scene.add(cube);

const points = [
  { x: -10, y: 0, z: 0 },
  { x: 0, y: 10, z: 0 },
  { x: 10, y: 0, z: 0 },
];
const line = factory.generateLine(points, 0x0000ff);
scene.add(line);

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
