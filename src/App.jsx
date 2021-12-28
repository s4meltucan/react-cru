import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListadoNombres from './Componentes/ListadoNombres.jsx'

const data = [
  { id: 1, animal: "perro", nombre: "choki" },
  { id: 1, animal: "gato", nombre: "garfield" },
  { id: 1, animal: "raton", nombre: "jerry" },
];

function App() {
  return (
    <div className="container">
      <ListadoNombres/>
    </div>
  );

}

export default App;
