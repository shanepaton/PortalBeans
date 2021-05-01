import * as THREE from './js/three.module.js';
import {OrbitControls} from "./js/OrbitControls.js";
import {GLTFLoader} from './js/GLTFLoader.js';
var scene, renderer;
var camera;
var mesh;

let darkTheme = 1;
let rotating = 0;

function changeTheme() {


    if (darkTheme === 0) {
        darkTheme = 1;
        console.log('🌙 Theme was changed to Dark Mode.')
        document.getElementById('themebtn').innerHTML = "☀️"
    } else {
        darkTheme = 0
        console.log('☀️ Theme was changed to Light Mode.')
        document.getElementById('themebtn').innerHTML = "🌙"
    }
}

function rotateCan() {
    if (rotating === 0) {
        rotating = 1;
        console.log('🔄 Display mode was enabled.')
        document.getElementById('rotatebtn').innerHTML = "🚫"
    } else {
        rotating = 0
        console.log('🚫 Display mode was disabled.')
        document.getElementById('rotatebtn').innerHTML = "🔄"
    }
}
document.getElementById('themebtn').addEventListener('click', changeTheme, true);
document.getElementById('rotatebtn').addEventListener('click', rotateCan, true);

var isMouseDown = false;

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25;
    camera.position.y = 15;

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0xffffff, 1);

    renderer.outputEncoding = THREE.sRGBEncoding;

    let controls = new OrbitControls(camera, renderer.domElement);

    var light = new THREE.DirectionalLight("#c1582d", 1);
    var ambient = new THREE.AmbientLight("#85b2cd");
    light.position.set(0, -70, 100).normalize();
    scene.add(light);
    scene.add(ambient);

    var texture = new THREE.Texture();
    var loader = new GLTFLoader();

    // const size = 75;
    // const divisions = 20;

    // const gridHelper = new THREE.GridHelper( size, divisions );
    // scene.add( gridHelper );

    loader.load('./models/beans.gltf', function (gltf) {
        mesh = gltf.scene;
        mesh.scale.set(1, 1, 1);
        scene.add(mesh);
    }, );

    render();
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    if (darkTheme == 1) {
        renderer.setClearColor(0x121212, 1);
    }
    if (darkTheme == 0) {
        renderer.setClearColor(0xffffff, 1);
    }
    if (mesh) {
        if (rotating == 1) {
            mesh.rotation.z += 0.01
            mesh.rotation.y -= 0.01
            mesh.rotation.x -= 0.01
        }
        if (rotating == 0) {
            mesh.rotation.z = 0;
            mesh.rotation.y = 0;
            mesh.rotation.x = 0;
        }
    }

}


window.addEventListener('DOMContentLoaded', init);

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}
