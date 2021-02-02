
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

document.addEventListener('DOMContentLoaded', () => {

 

const dTwentyPath = '../dice/d-twenty.obj';
const dTenPath = '../dice/d-ten.obj';

let dataArray = null;
let ADD = .1; // variable for speed of dice
let radius = 65; // starting value for circular path radius
let theta = 0; //variable for the circular path of the dice
let yVal = 5; // variable for the y axis oscillation of the dice
const scene = new THREE.Scene();

let dTwenty = null;
let dTen = null; 
let isLit = true;
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
camera.position.z = 200;
camera.position.y = 12;



const loader = new OBJLoader();

const dTwentyClickable = document.getElementById("d-twenty-image");

const handleDTwenty = () => {
  if (dTwenty.visible){
    
    removeDTwenty();
  } else {
    addDTwenty();
  }
  
}

loader.load(
  dTenPath,
  function ( object ) {
    material = new THREE.MeshPhongMaterial( {color: "#f5cc16", shininess: 50} );
    object.traverse( function ( child ) {

      if ( child instanceof THREE.Mesh ) {
  
          child.material = material;
          child.castShadow = true
          child.receiveShadow = true
  
      }
  
  } );
  scene.add( object );
  dTen = object;
 
  }
  );

loader.load(
  dTwentyPath,
  function ( object ) {
    material = new THREE.MeshPhongMaterial( {color: "#85210b", shininess: 50} );
    object.traverse( function ( child ) {

      if ( child instanceof THREE.Mesh ) {
  
          child.material = material;
          child.castShadow = true
          child.receiveShadow = true
  
      }
  
  } );
  scene.add( object );
  dTwenty = object;
  dTwenty.position.y = 12;
  dTwenty.position.z = 0;
  }
  );

const addDTwenty = () => {
  dTwenty.visible = true;
  
}


const removeDTwenty = () => {
  dTwenty.visible = false;
}




dTwentyClickable.addEventListener('click', handleDTwenty);


geometry = new THREE.PlaneGeometry(850, 850);
material = new THREE.MeshPhongMaterial( {color: "#5e4c27", shininess: 50} );
const floor = new THREE.Mesh(geometry, material);
floor.rotation.x = 4.8;
floor.position.y = -3;
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);




const ambientLight = new THREE.AmbientLight("white", .2);
scene.add(ambientLight);

const light = new THREE.PointLight("white", 2, 30);
light.position.set(-70, 50, 80)
light.castShadow = true;
scene.add(light);

const light2 = new THREE.PointLight("white", 2, 300);
light2.position.set(70, 50, 80);
light2.castShadow = true;
scene.add(light2);

const light3 = new THREE.PointLight("white", 2.5, 300);
light3.position.set(0, 250, 0);
light3.castShadow = true;
scene.add(light3);

const light4 = new THREE.PointLight("yellow", 2.5, 300);
light4.position.set(0, 250, 0);
light4.castShadow = true;
scene.add(light4);

addLights();

function addLights() {

  
  scene.add(ambientLight);

  scene.add(light);
  light.target = dTwenty;

  scene.add(light2);
  light2.target = dTwenty;

  scene.add(light3);

}

function removeLights() {
  
  scene.remove(ambientLight);
  scene.remove(light);
  scene.remove(light2);
  scene.remove(light3);
}
  
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let analyser = audioCtx.createAnalyser(); //create analyser in ctx
let audioElement = null
let src = null;
let bufferLength = null;

  

  audioElement = document.querySelector('audio');

  src = audioCtx.createMediaElementSource(audioElement);
  src.connect(analyser);         //connect analyser node to the src
  analyser.connect(audioCtx.destination); // connect the destination 
  analyser.fftSize = 512;
  bufferLength = analyser.frequencyBinCount; // 256
  dataArray = new Uint8Array(bufferLength);
  
  audioElement.onplay = function() {
    animate();
  }

  // audioElement.addEventListener("pause", removeLights);


  // const getLowEnd = () => {
  //   const quarter = dataArray / 4;
  //   let total = 0
  //   for (let i = 0; i < quarter; i++) { // attempting to average the low end value of the audio
  //     // to  set the value of the radius of the path of the dice
  //     eleInDataArray = dataArray[i]
  //     console.log(eleInDataArray);
  //     total += eleInDataArray 
  //   }
  //   let lowEnd = total / quarter ;
  //   console.log(total)
  //   return lowEnd
  // }

  



  var render = () => {
    
    // if(dTwenty === null) return;

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
      dTen.rotation.y = 0.058;
      dTen.position.x = radius * Math.sin(theta); // these 4 lines define the circular motion
      dTen.position.z = radius * Math.cos(theta);
      dTen.position.y += yVal;
      yVal = 5;
    

      dTwenty.rotation.y += 0.08;
      dTwenty.position.x = radius * Math.sin(theta); // these 4 lines define the circular motion
      dTwenty.position.z = radius * Math.cos(theta);
      dTwenty.position.y += yVal;
    

      if (dTwenty.position.y > 40 ) { // the animation will reverse direction after hitting the limit
         yVal = -yVal;
      } else if (dTwenty.position.y < 3) {
       yVal = -yVal;
      }

      if (dTen.position.y > 36 ) { // same for D10
        yVal = -yVal;
     } else if (dTen.position.y < 3.5) {
      yVal = -yVal;
     }


      theta += ADD;
      // camera.position.z = theta;
      // setTimeout(function(){radius = dataArray[0];}, 500)
      // radius = dataArray[0];
      // console.log(getLowEnd())
    
      analyser.getByteTimeDomainData(dataArray);
      // const quarter = dataArray / 4;
      // let total = 0
      // for (let i = 0; i < quarter; i++) { // attempting to average the low end value of the audio
      //                                     // to  set the value of the radius of the path of the dice
      //   eleInDataArray = dataArray[i]
      //   console.log(eleInDataArray);
      //   total += eleInDataArray
      // }
      // let lowEnd = total / quarter ;
      // console.log(lowEnd);
      
      
      
      renderer.render(scene, camera);
    }
    
    var animate = () => {
      requestAnimationFrame(animate);
      
      let WIDTH = window.innerWidth
      var sliceWidth = WIDTH * 1.0 / bufferLength;
      var x = 0;
      // console.log(dataArray);
      // for(var i = 0; i < bufferLength; i++) {
   
      //   var plotPointAudioData = dataArray[i] / 128.0; // will check all values in dataArray
        
  
      //   if(i === 0) {
      //     radius = 65;
      //   } else {
      //     radius = plotPointAudioData;
          
      //   }
  
      //   x += sliceWidth;
      // }
      
      
      render();
    }

  })
    
   
  




  