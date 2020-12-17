import * as THREE from './node_modules/three/build/three.module.js'
import {OrbitControls} from './node_modules/three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';


                const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 10000 );

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
            const loader = new GLTFLoader().setPath( '3d_object/gallery/' );
            scene.background = new THREE.Color( 0xffffff );

			const helper = new THREE.CameraHelper( camera );
			scene.add( helper );

         loader.load('scene.gltf', function (gltf){
            scene.add(gltf.scene)
         })

        
			const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

		 //camera.position.set(3000,1000,0)

			
			const animate = function () {
				requestAnimationFrame( animate );

			
                render()

            }

			const raycaster = new THREE.Raycaster();
                  const mouse = new THREE.Vector2();

                   function onMouseMove( event ) {

					event.preventDefault();
	         // calculate mouse position in normalized device coordinates
                   	// (-1 to +1) for both components
 
           	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
         	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}
			

				const controls = new OrbitControls( camera, renderer.domElement );
				//controls.addEventListener( 'change', render ); // use if there is no animation loop
				controls.minDistance = 0;
				controls.maxDistance = 500;
				controls.target.set(3000,1000,0);
				controls.update();

				window.addEventListener( 'resize', onWindowResize, false );

				const gridHelper = new THREE.GridHelper( 10000, 100);
				scene.add( gridHelper );

				const axesHelper = new THREE.AxesHelper( 10000 );
                   scene.add( axesHelper );
			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				render();

			}
			const geometry1 = new THREE.PlaneBufferGeometry( 600,700, 32 );
			const material1 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
			const plane = new THREE.Mesh( geometry1, material1 );
			scene.add( plane );
		
		plane.position.set(2850,1300,-800)
            // renderer.gammaOutput = true;
            // renderer.gammaFactor = 2.2;
			function render() {
				raycaster.setFromCamera( mouse, camera );

				// calculate objects intersecting the picking ray
				const intersects = raycaster.intersectObjects( scene.children );
				
				for ( let i = 0; i < intersects.length; i ++ ) {
						
					intersects[ i ].object.material.color.set( 0x0000ff );
			
				}
				renderer.render( scene, camera );

			}

 
			window.addEventListener( 'mousemove', onMouseMove, false );

			animate();