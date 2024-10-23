/// <reference types="vite-plugin-svgr/client" />

import './App.css'
import Select from './components/DataTable';
import Suomi from './assets/suomi.svg?react'

function App() {
  
  return (
    <>
     <h1>Vieraskielisten päiväkotilaisten määrä on kasvanut - Katso paikkakuntasi tilastot</h1>
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Nam alias id aperiam itaque quaerat enim illo tempore dolorem dolore repellendus placeat eum maxime possimus fuga, qui quidem molestias vitae corrupti.</p>
      <Suomi width={'400px'} height={'400px'}/>
      <Select/>
    </>
  )
}

export default App
