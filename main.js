import * as THREE from 'three'; 
import { Controls } from 'controls';
import { default as Stats } from 'stats';
import { SVGLoader } from 'svg';
import { Node } from 'nodes';

const clickable = [];

let width = window.innerWidth;
let height = window.innerHeight;
const stats = new Stats();
stats.domElement.style.position = "fixed";
document.body.appendChild( stats.domElement );

// Create a renderer and add it to the DOM.
let renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
// Create the scene 
let scene = new THREE.Scene();
// Create a camera
let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.z = 50;

scene.add(camera);

let node = new Node(new THREE.Vector3(0,0,0));
scene.add(node.model);
clickable.push(node.model);

let node2 = new Node(new THREE.Vector3(10,0,0));
scene.add(node2.model);
clickable.push(node.model);

// Create a light, set its position, and add it to the scene.
const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.position.set(0,0,5);
scene.add(pointLight);

const ambLight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( ambLight );

// Add OrbitControls so that we can pan around with the mouse.
var controls = new Controls(camera, renderer.domElement, clickable);

resize();
animate();
window.addEventListener('resize',resize);

function resize(){
  let w = window.innerWidth;
  let h = window.innerHeight;
  
  renderer.setSize(w,h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

const gui = new lil.GUI()
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 10, 50)
cameraFolder.open()

// Renders the scene
function animate() {

  renderer.render( scene, camera );
  controls.update();
  stats.update();
  requestAnimationFrame( animate );
}
