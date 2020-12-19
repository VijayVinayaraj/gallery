import * as THREE from "./node_modules/three/build/three.module.js";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "./node_modules/three/examples/jsm/loaders/GLTFLoader.js";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const gltfloader = new GLTFLoader().setPath("3d_object/gallery2/");
scene.background = new THREE.Color(0xffffff);
let new_camera = { x: 0, y: 0, z: 0 };
let objectClickable=true;
let backButtonClickable=false;
let selectCameraAnimation;
let loader = new THREE.TextureLoader();
let rolexImage=['./img/brits_rolex/rolex1.jpg',
                './img/brits_rolex/rolex2.jpg',
                './img/brits_rolex/rolex3.jpg',
                './img/brits_rolex/rolex4.jpg']
var imageNumber=0;
var targetList = [];

var imgNavAnimateTimeline= gsap.timeline()
gltfloader.load("scene.gltf", function (gltf) {
  gltf.scene.position.set(0, 0, 0);
 scene.add(gltf.scene);
});
camera.position.set(0, 0,0.1);



const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom=false
controls.update();

const geometry1 = new THREE.PlaneBufferGeometry(1.5, 1.5, 1);
const material1 = new THREE.MeshLambertMaterial({
  color: 0xffff00,
  transparent: false,
  opacity: 0.5,
});
const plane = new THREE.Mesh(geometry1, material1);
scene.add(plane);
plane.position.set(0, 0.3, -4.01);

const geometry = new THREE.SphereBufferGeometry(0.1);
const material = new THREE.MeshPhongMaterial({ color: 0x00ffff,transparent: true });
const backButton = new THREE.Mesh(geometry, material);

const light = new THREE.PointLight({ color: 0xffffff, intensity: 2 });
scene.add(light);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();






const animate = function () {
  requestAnimationFrame(animate);
  render();
};

function onMouseMove(event) {
  
 mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

// renderer.gammaOutput = true;
// renderer.gammaFactor = 2.2;

function render() {
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children);

  for (let i = 0; i < intersects.length; i++) {
    new_camera = intersects[i].object.position;
  }

  renderer.render(scene, camera);
}

function turnCameratoFaceObject(onCompleteFunc){
  var obj={x:0,y:0,z:0}
  gsap.to(obj,1,{x:new_camera.x,y:new_camera.y,z:new_camera.z,onUpdate:updateCamera,onComplete:onCompleteFunc})
 function updateCamera(){
  camera.lookAt(obj.x,obj.y,obj.z)
 }
}



function showImagewithButtonToNavigate(image){
  var canvasGeometry = new THREE.PlaneBufferGeometry();
  var canvastexture = new THREE.TextureLoader().load( image );
  var canvasMaterial = new THREE.MeshLambertMaterial( { map: canvastexture } );
  var canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
  var buttonGeo=new THREE.PlaneBufferGeometry(0.2,0.2);
  var buttonMaterial= new THREE.MeshPhongMaterial({color:0xffffff})
  var rightButton= new THREE.Mesh(buttonGeo,buttonMaterial)
  var leftButton = new THREE.Mesh(buttonGeo,buttonMaterial)
  plane.add(canvas)
  canvas.add(rightButton);
  canvas.add(leftButton);
  rightButton.position.z=-0.001
  leftButton.position.z=-0.001
  imgNavAnimateTimeline
  .to(canvas.position,1,{z:+0.1})
  .to(rightButton.position,0.5,{x:+0.7})
  .to(leftButton.position,0.5,{x:-0.7})
}

function addTexture(imageTobeAdded,material,number){
  
  loader.load(imageTobeAdded[number], function(tex) {
        material.map = tex;
    
   });

}

// domEvents.addEventListener(leftButton,"click",(event)=>{
//    addTexture(rolexImage,canvasMaterial,number)
//    number--
// })

// domEvents.addEventListener(rightButton,"click",(event)=>{
//   if(imageNumber)
//   imageNumber++
//   addTexture(rolexImage,canvasMaterial,imageNumber)
// })



function addEventListenertoPlane(clickablePlane){
 
  objectClickable=false
  backButtonClickable=true
  targetList.push(backButton)
    console.log("clicked")
   turnCameratoFaceObject(start)
 //showImagewithButtonToNavigate('./img/brits_rolex/rolex2.jpg')
 function start(){
   selectCameraAnimation=gsap.to(camera.position,{duration: 0.5,x:new_camera.x,y:new_camera.y,z:new_camera.z+1,onComplete:onCompleteClickablePlane })
   
 }
}



function onCompleteClickablePlane(){
  scene.add(backButton)
  backButton.material.opacity=1
  controls.enabled=false;
   camera.lookAt(new_camera.x, new_camera.y, new_camera.z);
   backButton.position.set(new_camera.x-0.75,new_camera.y-0.3,new_camera.z+.3)
   gsap.from(backButton.material,{duration:1,opacity:0});   
   //addEventListenertoBackbutton(backButton)  
 
 
}

function addBackButton(button){

}

function addEventListenertoBackbutton(button){
   objectClickable=true;
   backButtonClickable=false
    console.log("back button clicked")
    gsap.to(button.material,{duration:0.5,opacity:0})
    selectCameraAnimation.reverse();
    controls.enabled=true
    scene.remove()  
   
  
}




targetList.push(plane)

function onDocumentMouseDown( event ) 
{
	// the following line would stop any other event handler from firing
	// (such as the mouse's TrackballControls)
	// event.preventDefault();
	
	console.log("Click......");
	
	// update the mouse variable
	onMouseMove(event)
	
	// find intersections

	// create a Ray with origin at the mouse position
	//   and direction into the scene (camera direction)
	raycaster.setFromCamera(mouse,camera)

	// create an array containing all objects in the scene with which the ray intersects
  var intersects = raycaster.intersectObjects( targetList );
  console.log(intersects)
	// if there is one (or more) intersections
	if ( intersects.length > 0 )
	{
    if(intersects[0].object==plane &&objectClickable==true) addEventListenertoPlane(plane);
    if(intersects[0].object==backButton && backButtonClickable==true) addEventListenertoBackbutton(backButton)
	}

}

animate();
window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("resize", onWindowResize, false);
renderer.domElement.addEventListener( "pointerdown", onDocumentMouseDown, false );
