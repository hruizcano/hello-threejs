import * as THREE from 'three';

export default class Factory {
  constructor() {}

  generateCube(side, color) {
    const cubeGeometry = new THREE.BoxGeometry(side, side, side);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: color });
    return new THREE.Mesh(cubeGeometry, cubeMaterial);
  }

  generateLine(points, color) {
    const linePoints = [];
    for (let point of points) {
      linePoints.push(new THREE.Vector3(point.x, point.y, point.z));
    }
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lineMaterial = new THREE.LineBasicMaterial({ color: color });
    return new THREE.Line(lineGeometry, lineMaterial);
  }
}
