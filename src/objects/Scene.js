import * as THREE from  'three'
import Model from './Model'
import VectorField from './VectorField'
import CameraGroup from './CameraGroup'
              
export default class Scene {
  constructor({width, height, models}) {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#000000')
    this.renderer.setSize(width, height)
    this.models = models.map(model => new Model(model))
    this.cameraGroup = new CameraGroup({
      name: "BASIC",
      focus: {x: 10, y: 1, z: 10},
      vectorField: "ZERO"
    }, 0)
    this.stepSize = 0.001
    this.paused = true
    console.log(this.scene)
  }

  
  cameraAnimate(stepSize) {
    const {x, y, z} = this.cameraGroup.getActivePosition()
    this.camera.position.z = z
    this.camera.position.x = x
    this.camera.position.y = y
    
    this.camera.lookAt(
      this.cameraGroup.focus.x,
      this.cameraGroup.focus.y,
      this.cameraGroup.focus.z
    )

    this.camera.up.set(0, 0, 1)
    this.cameraGroup.flow(stepSize)
  }

  renderScene() {
    this.cameraAnimate()
    this.models.forEach(model => model.animate(this.stepSize))
    this.renderer.render(this.scene, this.camera)
  }

  play() {
    //this.cameraGroup.switch(3)
    //this.cameraGroup.follow(
    //  this.models[0].mesh.position,
    //  this.models[0].vectorField
    //)
  }

  pause() {
    this.paused = true
  }

  add(objects) {
    console.log('adding objects')
    objects.forEach(object => {
      this.scene.add(object)
    })
  }

  loadMeshes(uniforms) {
    this.models.forEach(model => {
      switch (model.geometry.type) {
      case "PlaneGeometry":
	uniforms.u_resolution = new THREE.Uniform(new THREE.Vector2(
	  model.geometry.parameters.width,
	  model.geometry.parameters.height
	))

      }
      console.log(model.geometry.parameters.width)
      let mesh = model.initMesh(uniforms)
      this.scene.add(mesh)
    })
  }
  
  handleResize(width, height) {
    this.renderer.setSize(width, height)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderScene()
  }
}
