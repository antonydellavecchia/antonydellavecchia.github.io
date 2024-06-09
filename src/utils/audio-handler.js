import {ShaderMaterial, PlaneGeometry, Mesh, DoubleSide} from 'three'
import VertexShader from '../shaders/VertexShader.glsl'
import FragmentShader from '../shaders/DefaultFragmentShader.glsl'

export const audioMaterial = ({uniforms = null, vertexShader, fragmentShader}) => {
  return new ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    opacity: 0.5,
    side: DoubleSide
  });
}

export const audioMesh = ({
  geometry = new PlaneGeometry(10,10,10),
  uniforms = null,
  vertexShader = VertexShader,
  fragmentShader = FragmentShader
}) => {

  return new Mesh(
    geometry,
    audioMaterial({uniforms: uniforms, vertexShader, fragmentShader})
  )
}


