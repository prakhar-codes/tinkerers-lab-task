import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

const loader = new GLTFLoader();
var root;
loader.load('source/MCLAREN ELVA2.glb', function(glb){
    console.log(glb);
    root=glb.scene;
    scene.add(root);
}, function(xhr) {
    //console.log((xhr.loaded/xhr.total*100)+"% loaded");
}, function(error) {
    console.log('Error while loading');
});

const texture = new THREE.TextureLoader().load( "images/bg3.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );
scene.background = texture;
//scene.background = new THREE.Color(0xfcfcfc);
const light = new THREE.HemisphereLight(0xffffff,0x000000, 2);
light.position.set(2,2,3);
scene.add(light);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(2,2,2);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize( window.innerWidth, window.innerHeight );
//renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;

const controls = new OrbitControls( camera, renderer.domElement );

function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
}
animate();