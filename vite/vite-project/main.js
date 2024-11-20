import * as THREE from 'three'

import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
const  canvas=document.getElementById('canvas')

//
const scene=new THREE.Scene()
scene.background=new THREE.Color('#f0f0f0')

const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z=5

const geomrtry=new THREE.DodecahedronGeometry()
const metarail=new THREE.MeshLambertMaterial({color:'#418585',emissive:'#418585'})
const dedomesh=new THREE.Mesh(geomrtry,metarail)

const boxgeomtry=new THREE.BoxGeometry(2,0.1,2)
const boxmetarail=new THREE.MeshBasicMaterial({color:'#B4b4b3'})
const box= new THREE.Mesh(boxgeomtry,boxmetarail)
box.position.y=-1.5

scene.add(dedomesh)
scene.add(box)

const light=new THREE.SpotLight(0x006769,100)
light.position.set(1,1,1)
scene.add(light)

const renderer= new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)


//6 controller orbit
const controlls=new OrbitControls(camera,renderer.domElement)
controlls.enableDamping =true
controlls.dampingFactor =0.05
controlls.enableRotate=true
controlls.enablePan=true


//add animation
function animate(){
  requestAnimationFrame(animate)
  dedomesh.rotation.x+=0.01
  dedomesh.rotation.y+=0.01

  box.rotation.y+=0.05
  controlls.update()
  renderer.render(scene,camera)
}


//8th resize handling 
window.addEventListener('resize',()=>{
 camera.aspect=window.innerWidth/window.innerHeight
 camera.updateProjectionMatrix()
 renderer.setSize(window.innerWidth/window.innerHeight)
})

animate()