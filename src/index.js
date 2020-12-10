
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

let dataArray = null;
let ADD = .1; // variable for speed of dice
let radius = 65; // starting value for circular path radius
let theta = 0; //variable for the circular path of the dice
let yVal = 5; // variable for the y axis oscillation of the dice
const scene = new THREE.Scene();

let dTwenty = null; // {"rotation": 0, 'y': 0};
let geometry = null;
let material = null;


const camera = new THREE.PerspectiveCamera(
  90, //field of view
  window.innerWidth/window.innerHeight, //aspect ratio
  0.1, //near plane
  2000 //far plane
)



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
camera.position.z = 100;
camera.position.y = 12;



const loader = new OBJLoader();

loader.load(
	'../dice/d-twenty.obj',
	function ( object ) {
    material = new THREE.MeshPhongMaterial( {color: "#85210b", shininess: 50} );
    object.traverse( function ( child ) {

      if ( child instanceof THREE.Mesh ) {
  
          child.material = material;
          child.castShadow = true
          child.receiveShadow = true
  
      }
  
  } );
  // object.children[0].castShadow = true;
  // object.children[0].receiveShadow = true;
  // console.log(object.children[0].castShadow);
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
floor.castShadow = true;
scene.add(floor);




const ambientLight = new THREE.AmbientLight("white", .2);

const light = new THREE.PointLight("white", 2, 30);
light.position.set(-70, 50, 80)
light.castShadow = true;

const light2 = new THREE.PointLight("white", 2, 300);
light2.position.set(70, 50, 80);
light2.castShadow = true;

const light3 = new THREE.PointLight("white", 2.5, 300);
light3.position.set(0, 250, 0);
light3.castShadow = true;

const addLights = () => {

  
  scene.add(ambientLight);
  
  scene.add(light);
  light.target = dTwenty;

  scene.add(light2);
  light2.target = dTwenty;

  scene.add(light3);
}

const removeLights = () => {
  scene.remove(ambientLight);
  scene.remove(light);
  scene.remove(light2);
  scene.remove(light3);
  // animate();
}
  
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let analyser = audioCtx.createAnalyser(); //create analyser in ctx
let audioElement = null
let src = null;
let bufferLength = null;
window.onload = function() {

  audioElement = document.querySelector('audio');
  // console.log('Audio Context State is ' + audioCtx.state);
  // console.log(floor.castShadow);
  src = audioCtx.createMediaElementSource(audioElement);
  src.connect(analyser);         //connect analyser node to the src
  analyser.connect(audioCtx.destination); // connect the destination 
  analyser.fftSize = 512;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
  dTwenty.position.y = 12;
  dTwenty.position.z = 0;
  // console.log(dTwenty);
  // console.log(dTwenty.scale.x);
  
  audioElement.onplay = function() {
    addLights();
  }

  audioElement.addEventListener("pause", removeLights);

  audioElement.onpause = function() {
    removeLights();
  }



  var render = () => {

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    
      dTwenty.rotation.y += 0.08;
      dTwenty.position.x = radius * Math.sin(theta);
      dTwenty.position.z = radius * Math.cos(theta);
      dTwenty.position.y += yVal;

      if (dTwenty.position.y > 40 ) {
         yVal = -yVal;
      } else if (dTwenty.position.y < 3) {
       yVal = -yVal;
      }


      theta += ADD;
    
    
      analyser.getByteTimeDomainData(dataArray);
      console.log(dataArray);
      renderer.render(scene, camera);
    }
  
    var animate = () => {
      requestAnimationFrame(animate);
      render();
    }
    
    animate();
  }




  