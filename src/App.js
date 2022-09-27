import React from 'react';
import './App.css';
import ThreeContainer from './container'
import 'bulma/css/bulma.css'

import RayMarching from './shaders/ray-marching.glsl'

function App() {
  return (
    <div>
      <div className="content ">
        <section className="hero">
          <div className="hero-body">
            <p className="title has-text-light">
              Antony Della Vecchia
            </p>
            <p className="subtitle has-text-light">
              <a href="https://github.com/antonydellavecchia">github</a>
            </p>
            <p className="subtitle has-text-light">
              Office: Strasse des 17. Juni 136, Room 626
            </p>
            <p className="subtitle has-text-light">
              Email: vecchia@math.tu-berlin.de
            </p>

          </div>
          
        </section>

        <section className="section">
          <h2 className="title has-text-light">About Me</h2>
          <p className="subtitle has-text-light">
            I am a member of <a href="https://www.math.tu-berlin.de/fachgebiete_ag_diskalg/fg_diskrete_mathematik_geometrie/v-menue/diskrete_mathematik_geometrie/">
                               The Discrete Geometry Group </a>
            of <a href="https://page.math.tu-berlin.de/~joswig/"> Michael Joswig </a> at the <a href="https://www.math.tu-berlin.de/menue/home/">  Institute of Mathematics of the Technical University in Berlin</a>.
            I am currently an employee of <a href="https://www.mardi4nfdi.de/about/mission">MaRDI</a> working on serialization and databases for computer algebra.
          </p>
          <p className="subtitle has-text-light">I received my MSc from <a href="https://www.mcgill.ca/">McGill University</a> under the supervision of <a href="https://www.math.mcgill.ca/~wise/">Daniel T. Wise</a>. During my MSc I developped software for checking if certain CW complexes whose fundamentals groups have a single defining relation have nonpositive sectional curvature. </p>
          <p className="subtitle has-text-light">
            I am interested in computational algebra and geometry including it's applications.
          </p>
        </section>
        <section className="section">
          <h2 className="title has-text-light">Software</h2>
          <p className="subtitle has-text-light"> I am currently contributing to the following software libraries</p>
          <ul className="has-text-light">
            <li><a href="https://oscar-system.github.io/Oscar.jl/stable/">OSCAR</a></li>
            <li><a href="https://polymake.org/doku.php">polymake</a></li>
          </ul>
        </section>
      </div>
      <ThreeContainer backgroundShader={RayMarching}/>
    </div>
  )
}

export default App;
