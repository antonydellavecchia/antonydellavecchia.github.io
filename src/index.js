import './style.css'
import { SphereGeometry } from 'three'
import RayMarching from './shaders/ray-marching.glsl'
import Scene from './objects/Scene'
import { renderPublications } from './publications'

renderPublications()

const mount = document.getElementById('three-container')

const scene = new Scene({
  width: window.innerWidth,
  height: window.innerHeight,
  models: [{
    geometry: new SphereGeometry(100, 102, 160),
    name: 'background',
    fragmentShader: RayMarching,
    position: { x: 0, y: 0, z: 0 }
  }]
})

scene.renderer.setPixelRatio(window.devicePixelRatio)
scene.loadMeshes({ u_time: { value: 0 } })
mount.appendChild(scene.renderer.domElement)

let frameId

const animate = () => {
  scene.renderScene()
  frameId = requestAnimationFrame(animate)
}

window.addEventListener('resize', () => {
  scene.handleResize(window.innerWidth, window.innerHeight)
})

mount.addEventListener('click', () => {
  if (frameId) {
    cancelAnimationFrame(frameId)
    frameId = null
  } else {
    animate()
  }
})

animate()
