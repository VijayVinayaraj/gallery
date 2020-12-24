import * as THREE from "./node_modules/three/build/three.module.js";
// var camera       // camera
var cameraPos0   // initial camera position
var cameraUp0    // initial camera up
var cameraZoom   // camera zoom
var iniQ         // initial quaternion
var endQ         // target quaternion
var curQ         // temp quaternion during slerp
var vec3         // generic vector object
var tweenValue   // tweenable value 

// init camera
console.log("from cmaerjs")
function setup()
{
   
    camera.position = new THREE.Vector3(0, 0, 80)
    cameraPos0 = camera.position.clone()
    cameraUp0 = camera.up.clone()
    cameraZoom = camera.position.z
}

// set a new target for the camera
function moveCamera(euler, zoom)
{
    // reset everything
    endQ = new THREE.Quaternion()
    iniQ = new THREE.Quaternion().copy(camera.quaternion)
    curQ = new THREE.Quaternion()
    vec3 = new THREE.Vector3()
    tweenValue = 0

    endQ.setFromEuler(euler)
    gsap.to(this, 5, { tweenValue:1, cameraZoom:zoom, onUpdate:onSlerpUpdate })
}

// on every update of the tween
function onSlerpUpdate()
{
    // interpolate quaternions with the current tween value
    THREE.Quaternion.slerp(iniQ, endQ, curQ, tweenObj.value)

    // apply new quaternion to camera position
    vec3.x = cameraPos0.x
    vec3.y = cameraPos0.y
    vec3.z = cameraZoom
    vec3.applyQuaternion(curQ)
    camera.position.copy(vec3)

    // apply new quaternion to camera up
    vec3 = cameraUp0.clone()
    vec3.applyQuaternion(curQ)
    camera.up.copy(vec3)
}

function turnCameratoFaceObject(destRotation,rotValue){

    var qm = new THREE.Quaternion();
    gsap.to(this, 5, { rotValue:1, cameraZoom:zoom, onUpdate:onSlerpUpdate })
    THREE.Quaternion.slerp(camera.quaternion, destRotation, qm, rotvalue);
    camera.quaternion = qm;
    camera.quaternion.normalize();
    }
    function turnCameratoFaceObject(destRotation,rot){

        var qm = new THREE.Quaternion();
        var qa=new THREE.Quaternion().copy(camera.quaternion)
        console.log(destRotation)
        console.log(qa)
        
        
        let rotValue ={val:0}
        gsap.to(rotValue, 1, { val:rot,onUpdate:updateCamera,onUpdateParams:[{self}]})
        function updateCamera (tween){
          //console.log(rotValue.val)
          THREE.Quaternion.slerp(qa, destRotation, qm, rotValue.val);
          camera.applyQuaternion(qm);
          camera.quaternion.normalize();
        }
        }