import * as THREE from 'three'
import Model from './Model'
import CameraGroup from './CameraGroup'

export default class Scene {
  constructor({ width, height, models }) {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#080d09')
    this.renderer.setSize(width, height)
    this.models = models.map(model => new Model(model))
    this.cameraGroup = new CameraGroup({
      name: 'BASIC',
      focus: { x: 10, y: 1, z: 10 },
      vectorField: 'ZERO'
    }, 0)
    this.stepSize = 0.001
  }

  cameraAnimate() {
    const { x, y, z } = this.cameraGroup.getActivePosition()
    this.camera.position.set(x, y, z)
    this.camera.lookAt(this.cameraGroup.focus.x, this.cameraGroup.focus.y, this.cameraGroup.focus.z)
    this.camera.up.set(0, 0, 1)
    this.cameraGroup.flow(this.stepSize)
  }

  renderScene() {
    this.cameraAnimate()
    this.models.forEach(model => model.animate(this.stepSize))
    this.renderer.render(this.scene, this.camera)
  }

  loadMeshes(uniforms) {
    this.models.forEach(model => {
      if (model.geometry.type === 'PlaneGeometry') {
        uniforms.u_resolution = new THREE.Uniform(new THREE.Vector2(
          model.geometry.parameters.width,
          model.geometry.parameters.height
        ))
      }
      this.scene.add(model.initMesh(uniforms))
    })
  }

  handleResize(width, height) {
    this.renderer.setSize(width, height)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderScene()
  }
}
