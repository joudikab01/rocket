import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Matrix3, Mesh } from 'three'
import gsap from 'gsap'
import Rocket from './physics/rocket'



const canvas = document.querySelector('canvas.webgl')
const gui = new dat.GUI();
const scene = new THREE.Scene()

const rocket = new Rocket();



const geometry = new THREE.ConeGeometry(0.2,1)
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe : false
})



rocket.mesh= new THREE.Mesh( geometry, material );

scene.add(rocket.mesh);
const axesHelper = new THREE.AxesHelper( 100 );
scene.add( axesHelper );

const Parameters = {
  
angle: Math.PI/2,

rocket_mass:123124,
fuel_mass:14143321,
drag_coeff:1341,
lift_coeff:12134,
radius:1432432,
launch_altitude:-1,
mass_flowrate:-1,
type:0,
types:{ 
   // f-1 engine refrenced by 1
  firstengine(){
    parameters.type=1;
    rocket.check_engine(parameters.type)
  }

}

}


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
//camera.position.y=rocket.mesh.position.y
camera.lookAt(rocket.mesh.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})


renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// Keyboard Controls
function setupKeyControls() {
  
    document.onkeydown = function(e) {
      switch (e.keyCode) {
        case 37:
          rocket.force_angle += 1;
          
        break;
        case 38:
      //   thrustMagnitude.v += 0.01;
        break;
        case 39:
          rocket.force_angle -= 1;
        break;
        case 40:
        //thrustMagnitude.v -= 0.01;
        break;
      }
    };
  }
 


rocket.engineType=1
rocket.force_angle=Math.PI/2;
rocket.rocketDiameter=2;
rocket.rocket_mass=200
rocket.fuel_mass=20000;
rocket.dragCoefficient=0.75
rocket.liftCoeff=1;
rocket.burnTime=210;
rocket.exhaust_Area=2;
rocket.exhaust_Pressure=9;
rocket.numberOfEngines=1
rocket.check_engine()

// Animate
const clock = new THREE.Clock()

let oldElapsedTime = 0;
const tick = () =>
{
    setupKeyControls();


     const elapsedTime = clock.getElapsedTime()
     const delteTime = elapsedTime - oldElapsedTime;    
     oldElapsedTime = elapsedTime;

      
     rocket.new_velocity(delteTime)
     rocket.new_position(delteTime)
    
     //rocket.mesh.position.add(rocket.thrust().clone().multiplyScalar(delteTime));
     
      console.log(rocket)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
export default Parameters;












