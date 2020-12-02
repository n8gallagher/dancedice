
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

// import * as webAudio from 'web-audio-api';
// var AudioContext = require('web-audio-api').AudioContext;

// const audioContext = new AudioContext;
// const audioElement = document.querySelector("audio");
// const track = audioContext.createMediaElementSource(audioElement);

// track.connect(audioContext.destination);

const scene = new THREE.Scene();

let dTwenty = null; // {"rotation": 0, 'y': 0};
let geometry = null;
let material = null;


const camera = new THREE.PerspectiveCamera(
  75, //field of view
  window.innerWidth/window.innerHeight, //aspect ratio
  0.1, //near plane
  1000 //far plane
)
camera.position.z = 6;


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("black");
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight); // keep the canvas the size of the window
  camera.aspect = window.innerWidth / window.innerHeight;
  
  camera.updateProjectionMatrix; 
})
camera.position.z = 60;
camera.position.y = 8;



const loader = new OBJLoader();

loader.load(
	'../dice/d-twenty.obj',
	function ( object ) {

		scene.add( object );
    dTwenty = object;
	}

);

geometry = new THREE.PlaneGeometry(850, 850);
material = new THREE.MeshPhongMaterial( {color: "#5e4c27", shininess: 50} );
const floor = new THREE.Mesh(geometry, material);
floor.rotation.x = 4.8;
floor.position.y = -3;
floor.receiveShadow = true;
scene.add(floor);


const light = new THREE.PointLight("white", 2.5, 100);
  light.position.set(20, 20, 40)
  light.castShadow = true;
  scene.add(light);
  light.target = dTwenty;

  const light2 = new THREE.PointLight("white", 4.5, 100);
    light2.position.set(-100, 20, 10);
    light2.castShadow = true;
    scene.add(light2);
    light2.target = dTwenty;

  var render = () => {
    if (dTwenty) {
      dTwenty.position.y = 17;
      dTwenty.rotation.y += 0.08;
      dTwenty.rotation.x += 0.03;
    }
    
    renderer.render(scene, camera);
  }

  var animate = () => {
    requestAnimationFrame(animate);
    render();
  }

  animate();


  