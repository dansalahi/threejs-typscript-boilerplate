import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import States from "three/examples/jsm/libs/stats.module";

import { GUI } from "dat.gui";

/// 1- create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// 2- create a camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 3;

// TODO: explain
// camera.lookAt(new THREE.Vector3(1, 1, 1));

// 3- create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

new OrbitControls(camera, renderer.domElement);
// 4- add the renderer to the DOM
document.body.appendChild(renderer.domElement);

// geometry`
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x5439cf,
  //   wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
// present the cube in the scene
scene.add(cube);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // TODO: explain
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const states = new States();
document.body.appendChild(states.dom);

const gui = new GUI();
const cubeFolder = gui.addFolder("Cube");
cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "y", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "z", 0, Math.PI * 2);
cubeFolder.open();

const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "z", 0, 10);
cameraFolder.open();

// scene.add(new THREE.AxesHelper(5));

function animate() {
  requestAnimationFrame(animate);

  // position => rotation
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  render();
  states.update();
}
function render() {
  renderer.render(scene, camera);
}

// render()
animate();
