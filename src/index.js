
// const THREE = require('three')
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const scene = new THREE.Scene();

const rotate = .05;


const camera = new THREE.PerspectiveCamera(
  75, //field of view
  window.innerWidth/window.innerHeight, //aspect ratio
  0.1, //near plane
  1000 //far plane
)
camera.position.z = 6;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#e5e5e5");
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight); // keep the canvas the size of the window
  camera.aspect = window.innerWidth / window.innerHeight;
  
  camera.updateProjectionMatrix; 
})
camera.position.z = 20;

var geometry = new THREE.BoxGeometry( 3, 3, 3 );
var material = new THREE.MeshPhongMaterial( {color: 0xffffff} );
var cube = new THREE.Mesh( geometry, material );
cube.rotation.x = 0;
cube.rotation.y = 2;
cube.position.y = -0.5;
cube.position.x = 0;
cube.castShadow = true;
cube.receiveShadow = true;
scene.add( cube );

geometry = new THREE.CylinderGeometry( 0, 3, 4, 4 );
material = new THREE.MeshPhongMaterial( {color: 0xffffff} );
const dFour = new THREE.Mesh( geometry, material );
dFour.position.x = -6;
dFour.castShadow = true;
dFour.receiveShadow = true;
scene.add( dFour );

geometry = new THREE.SphereGeometry(3, 8, 3);
const dTwenty = new THREE.Mesh( geometry, material )
dTwenty.position.x = 6;
dTwenty.rotation.y = 4.5;
dTwenty.castShadow = true;
dTwenty.receiveShadow = true;
scene.add(dTwenty);

geometry = new THREE.SphereGeometry(2, 5, 4);
const dTen = new THREE.Mesh( geometry, material );
dTen.position.x = 11;
dTen.rotation.y = 2;
dTen.rotation.x = 2;
dTen.castShadow = true;
dTen.receiveShadow = true;
scene.add(dTen);

geometry = new THREE.PlaneGeometry(50, 50);
material = new THREE.MeshPhongMaterial( {color: 0x8585ad, shininess: 50} );
const floor = new THREE.Mesh(geometry, material);
floor.rotation.x = 4.8;
floor.position.y = -3;
floor.receiveShadow = true;
scene.add(floor);


const light = new THREE.PointLight(0xff33cc, 3, 1000);
  light.position.set(-2, 2, 1)
  light.castShadow = true;
  scene.add(light);

  const light2 = new THREE.SpotLight(0xffff66, .5);
    light2.position.set(15, 6, 9);
    light2.castShadow = true;
    light.target = dTen;
    scene.add(light2);


  var render = function() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  render();