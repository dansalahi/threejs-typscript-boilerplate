import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/// 1- create a scene
const scene = new THREE.Scene();


// 2- create a camera

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 2;

// 3- create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);



new OrbitControls(camera, renderer.domElement);
// 4- add the renderer to the DOM
document.body.appendChild(renderer.domElement);


// geometry
// TODO: explain
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x5439CF, wireframe: true });

// TODO: explain
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

window.addEventListener('resize', onWindowResize,false );
function onWindowResize () {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix(); // TODO: explain
		renderer.setSize(window.innerWidth, window.innerHeight);
		render()
}
function animate() {
	requestAnimationFrame(animate);

	// position => rotation
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	render();
}
function render() {
	renderer.render(scene, camera);
}


// render()
animate();
