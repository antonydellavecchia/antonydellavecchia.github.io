import React from 'react';
import './App.css';
import ThreeContainer from './container'
import 'bulma/css/bulma.css'

import RayMarching from './shaders/ray-marching.glsl'

function App() {
  return (
    <div>
      <div className="content">
      <section className="hero">
        <div className="hero-body">
          <p className="title">
            Antony Della Vecchia
          </p>
          <p className="subtitle">
            <a href="https://github.com/antonydellavecchia">github</a>
          </p>
        </div>
        
      </section>

      <section className="section ">
        <h1 className="title">Section</h1>
        <h2 className="subtitle">
          A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading.
        </h2>
         </section>
      </div>
      <ThreeContainer backgroundShader={RayMarching}/>
    </div>
  )
}

export default App;
