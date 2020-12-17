import * as THREE from "../node_modules/three/build/three.module.js";
import {PointerLockControls} from "../node_modules/three/examples/jsm/controls/PointerLockControls.js"

const scene = new THREE.Scene();
const camera =new THREE.PerspectiveCamera(90,window.innerWidth/window.innerHeight,0.1,1000);
const renderer= new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);




  class FpsCamera {
camera(){
const controls = new PointerLockControls( camera, document.body );

const blocker = document.getElementById( 'blocker' );
				const instructions = document.getElementById( 'instructions' );

				instructions.addEventListener( 'click', function () {

					controls.lock();

				}, false );

				controls.addEventListener( 'lock', function () {

					instructions.style.display = 'none';
					blocker.style.display = 'none';

				} );

				controls.addEventListener( 'unlock', function () {

					blocker.style.display = 'block';
					instructions.style.display = '';

                } );
                
                let moveForward = false;
			let moveBackward = false;
			let moveLeft = false;
            let moveRight = false;
            
            let prevTime = performance.now();
			const velocity = new THREE.Vector3();
			const direction = new THREE.Vector3();

                const onKeyDown = function ( event ) {
                   
					switch ( event.keyCode ) {

						case 38: // up
						case 87: // w
							moveForward = true;
							break;

						case 37: // left
						case 65: // a
							moveLeft = true;
							break;

						case 40: // down
						case 83: // s
							moveBackward = true;
							break;

						case 39: // right
						case 68: // d
							moveRight = true;
							break;

						case 13: // space
							removeEverthing();
							break;

					}

				};

				const onKeyUp = function ( event ) {
                              
					switch ( event.keyCode ) {

						case 38: // up
						case 87: // w
							moveForward = false;
							break;

						case 37: // left
						case 65: // a
							moveLeft = false;
							break;

						case 40: // down
						case 83: // s
							moveBackward = false;
							break;

						case 39: // right
						case 68: // d
							moveRight = false;
							break;

					}

				};

				document.addEventListener( 'keydown', onKeyDown, false );
				document.addEventListener( 'keyup', onKeyUp, false );




 const time =performance.now();

 if ( controls.isLocked === true ) {

  const delta =(time - prevTime)/1000;
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    direction.z = Number( moveForward ) - Number( moveBackward );
    direction.x = Number( moveRight ) - Number( moveLeft );
    direction.normalize(); // this ensures consistent movements in all directions

    if ( moveForward || moveBackward ) velocity.z -= direction.z * 15.0 * delta;
    if ( moveLeft || moveRight ) velocity.x -= direction.x * 15.0 * delta;

    
    controls.moveRight( - velocity.x * delta );
    controls.moveForward( - velocity.z * delta );

    

}
  prevTime=time;
}

 }