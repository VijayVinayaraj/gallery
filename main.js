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

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const loader = new GLTFLoader().setPath("3d_object/gallery2/");
scene.background = new THREE.Color(0xffffff);

var domEvents = new THREEx.DomEvents(camera, renderer.domElement);
let new_camera = { x: 0, y: 0, z: 0 };
let camera_x, camera_y, camera_z;

loader.load("scene.gltf", function (gltf) {
  gltf.scene.position.set(0, 0, 0);
  scene.add(gltf.scene);
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxDistance = 1;
controls.update();




const geometry = new THREE.SphereBufferGeometry(0.1);
const material = new THREE.MeshPhongMaterial({ color: 0x00ffff,transparent: true });
const backButton = new THREE.Mesh(geometry, material);


camera.position.set(0, 0, -0.5);


const animate = function () {
  requestAnimationFrame(animate);
  render();
};

const light = new THREE.PointLight({ color: 0xffffff, intensity: 2 });
scene.add(light);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}
const geometry1 = new THREE.PlaneBufferGeometry(1.5, 1.5, 1);
const material1 = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  transparent: false,
  opacity: 0.5,
});
const plane = new THREE.Mesh(geometry1, material1);
scene.add(plane);
plane.position.set(0, 0.3, -4.01);

// renderer.gammaOutput = true;
// renderer.gammaFactor = 2.2;



function render() 
{

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children);
  //console.log(intersects)
  for (let i = 0; i < intersects.length; i++) {
    new_camera = intersects[i].object.position;
  }

  renderer.render(scene, camera);

}

window.addEventListener("mousemove", onMouseMove, false);

animate();
let selectCameraAnimation;
domEvents.addEventListener(plane, "click", (event) =>
 {
  console.log(new_camera.x, new_camera.y, new_camera.z);
  selectCameraAnimation=gsap.to(camera.position,{duration: 1,x:new_camera.x,y:new_camera.y,z:new_camera.z+1,onComplete:()=>{
    plane.add(backButton)
    backButton.position.set(-0.75,0,0.3)
    gsap.timeline()
    .from(backButton.material,{duration:1.5,opacity:0})
    .to(backButton.rotation,{duration:0.1,z:0.1,repeat:-1});      
  }})
  camera.lookAt(new_camera.x, new_camera.y, new_camera.z);
});

domEvents.addEventListener(backButton,"click",(event)=>{
  gsap.to(backButton.material,{duration:0.5,opacity:0})
  selectCameraAnimation.reverse();
  plane.remove(backButton)
})