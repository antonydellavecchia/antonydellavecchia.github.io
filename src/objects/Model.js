import { Mesh, ShaderMaterial, DoubleSide } from 'three'
import VertexShader from '../shaders/VertexShader.glsl'
import VectorField from './VectorField'

export default class Model {
  constructor({ geometry, name, position = {x: 0, y: 0, z: 0}, vertexShader = VertexShader, fragmentShader, vectorFieldConfig }) {
    this.geometry = geometry
    this.name = name
    this.position = position
    this.vertexShader = vertexShader
    this.fragmentShader = fragmentShader
    this.vectorField = new VectorField(vectorFieldConfig)
  }

  initMesh(uniforms) {
    const material = new ShaderMaterial({
      uniforms,
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
      transparent: true,
      opacity: 0.5,
      side: DoubleSide
    })
    const mesh = new Mesh(this.geometry, material)
    mesh.name = this.name
    mesh.position.set(this.position.x, this.position.y, this.position.z)
    this.mesh = mesh
    return mesh
  }

  animate(stepSize) {
    const curr = this.mesh.position
    const next = this.vectorField.flow({ position: curr, stepSize })
    if (this.mesh.material.uniforms != null) {
      this.mesh.material.uniforms.u_time.value += stepSize
    }
    this.mesh.position.set(next.x, next.y, next.z)
  }
}
