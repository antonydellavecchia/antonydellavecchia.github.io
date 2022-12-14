import React, { useRef, useEffect, useState, useContext, useReducer } from 'react'
import {SphereBufferGeometry, PlaneGeometry} from 'three'
import { useActions } from './actions'
import Scene from './objects/Scene'

const initialState = {
  loading: true
}

const reducer = (state, action) => {
  switch (action.type) {
  case "SET_LOADING":
    return {
      ...state,
      loading: action.payload
    }
  }
}

const Container = (props) => {
  const mount = useRef(null)
  const [isAnimating, setAnimating] = useState(true)
  const controls = useRef(null)
  const {backgroundShader} = props
  
  useEffect(() => {
    let scene = initScene(mount, backgroundShader)
    let frameId
    
    const handleResize = () => {
      scene.handleResize(mount.current.clientWidth, mount.current.clientHeight)
    }
    
    const animate = () => {
      scene.renderScene()
      frameId = window.requestAnimationFrame(animate)
    }

    const start = () => {
      if (!frameId) {
        scene.play()
        frameId = requestAnimationFrame(animate)
      }
    }

    const stop = () => {
      cancelAnimationFrame(frameId)
      frameId = null
    }

    mount.current.appendChild(scene.renderer.domElement)
    window.addEventListener('resize', handleResize)

    controls.current = { start, stop }
      
    return () => {
      stop()
      window.removeEventListener('resize', handleResize)
      //mount.current.removeChild(renderer.domElement)

      //scene.remove(cube)
      //geometry.dispose()
      //material.dispose()
    }
  }, [])

  useEffect(() => {
    try {
      if (isAnimating) {
        controls.current.start()
      } else {
        controls.current.stop()
      }
    }

    catch(e){
      console.log(e)
    }
  }, [isAnimating])
  
  return <div className="three-container" ref={mount} onClick={() => setAnimating(!isAnimating)} />
}

const initScene = (mount, backgroundShader) => {
  // initate scene
  let width = mount.current.clientWidth
  let height = mount.current.clientHeight
  let models = []

  let backgroundModel = {
    geometry: new SphereBufferGeometry(100, 102, 160),
    name: "background",
    fragmentShader: backgroundShader,
    position: {x: 0, y:0, z: 0}
  }

  models.push(backgroundModel)
  
  let scene = new Scene({
    width,
    height,
    models
  })
  
  scene.loadMeshes({u_time: {value: 0}})
  
  return scene
}
export default Container
