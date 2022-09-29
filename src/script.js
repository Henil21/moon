import "./style.css"
// const { Color } = require("three")
import * as THREE from "three"
import { Mesh } from "three"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
// import { HotUpdateChunk } from "webpack"
const textureloader= new THREE.TextureLoader()

const text=textureloader.load('textures/door/lroc_color_poles_1k.jpg')




const canvas=document.querySelector('canvas.webgl')
const coursor={
    x: 0,
    y: 0
}

window.addEventListener('mousemove',(event)=>{
    coursor.x=event.clientX/size.width-0.5
    coursor.y= -(event.clientY/size.height-0.5)    
    
})


const scene = new THREE.Scene()

const group = new THREE.Group();

const geo = new THREE.SphereBufferGeometry(5,100,100)  // creating  geometry of object

const mat= new THREE.MeshStandardMaterial({
   map :text,
  //  wireframe:true
 
}
   ) //details of object (material)
const moon =new THREE.Mesh(geo,mat) //combining geometry and material as one
group.add(moon) 



scene.add(group)



const alight= new THREE.AmbientLight(0xffffff,0.5)
scene.add(alight)


const size={
    width:window.innerWidth,
    height : window.innerHeight
}
window.addEventListener('resize',()=>{
    size.width = window.innerWidth,
    size.height = window.innerHeight
    camera.aspect=size.width/size.height
    camera.updateProjectionMatrix()
   // updating renderer
    renderer.setSize(size.width,size.height)

})
//double click to go full screen
window.addEventListener('dblclick',()=>{
  if(!document.fullscreenElement){
    canvas.requestFullscreen()
  }
  else{
    document.exitFullscreen()
  }
})


const camera = new THREE.PerspectiveCamera(75, size.width / size.height)


scene.add(camera)
camera.position.x=0
camera.position.y=1
camera.position.z=10

//controls
const controls=new OrbitControls(camera,canvas)
controls.enableDamping=true


const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(size.width,size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))//will render between devicepixel and 2
renderer.render(scene,camera)

const clock=new THREE.Clock()

const  tick= () =>
{
    const elap=clock.getElapsedTime()

   
    moon.rotation.y=elap/2


    renderer.render(scene,camera)

    console.log(camera.position.z)


    window.requestAnimationFrame(tick)//call function at each point
}
tick()
