import * as THREE from 'three';
import Factory from './components/factory';
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/addons/renderers/CSS2DRenderer.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

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
const ceil = factory.generateLine(points, 0x0000ff);
scene.add(ceil);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
// labelRenderer.domElement.style.backgroundColor = 'red';
document.body.appendChild(labelRenderer.domElement);
const labelDiv = document.createElement('div');
labelDiv.className = 'label';
labelDiv.textContent = 'Hello there!';
labelDiv.style.color = 'white';
labelDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
labelDiv.style.padding = '4px';
labelDiv.style.borderRadius = '5px';
const label = new CSS2DObject(labelDiv);
// label.position.set(0, 0, 0);
scene.add(label);

const loader = new FontLoader();
loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
  const textGeometry = new TextGeometry('Hello Three.js!', {
    font: font,
    size: 1,
    depth: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  const textMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
  const text = new THREE.Mesh(textGeometry, textMaterial);

  text.position.set(-4, 2, 10);
  scene.add(text);
});

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
