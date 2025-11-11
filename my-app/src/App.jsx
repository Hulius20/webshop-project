import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SimpleFunctionalComponent from './components/SimpleFunctionalComponent.jsx'
import SimpleClassComponents from './components/SimpleClassComponents.jsx'

const student = { id: 1, name: 'John' };

const teacher = { id2: 101, name2: 'Jane' };

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
      <SimpleClassComponents />
      <SimpleFunctionalComponent student={student} teacher={teacher} /> 
    </>
  )
}

export default App
