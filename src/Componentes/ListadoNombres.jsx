import React, { useState } from "react";
import uniqid from 'uniqid';

const ListadoNombres = () => {

    const [nombre, setNombre] = useState('')

    const [listaNombres, setListaNombre] = useState([])

    const[modoEdicion, setModoEdicion] = useState(false)

    const [id,setID] =  useState('')
    //se declar el state con valor nulo (null) para luego ahcer la comprovacion 
    const [error, setError] = useState (null)

    const addNombre = (e) => {

        e.preventDefault()
            //la funcion trim evalua si el campo tiene contenido
        if(!nombre.trim()){
            setError ('el campo nombre esta vacio')
            //el returno lo sacara de la funcion y de la funcion padre, evitando que se agregue el campo vacio al listado
            return
        }

        const nuevoNombre = {
            //la funcion uniqui la utilzamos gracia a la libreria uniqid que se importo arriba
            id: uniqid(),
            tituloNombre: nombre
        }
        //se agrega el valor nuevo a la lista de nombres
        setListaNombre([...listaNombres, nuevoNombre])

        // vaciar el cuadro de texto para ingresar otro dato
        setNombre('')
        // regresamos el seError de nuevo a null para se quite la alerta de la pantalla 
        setError(null)

    }

    const deleteNombre = (id) => {

        //se declara un nuevo array donde se guararan todos lo elementos, exepto el que tenga el ID del del elemento
        //que estamos "eliminando"
        const nuevoArray = listaNombres.filter( item => item.id !==id)
        setListaNombre (nuevoArray);
    }

    const editar = (item) => {
        
        setModoEdicion(true)
        setNombre (item.tituloNombre)
        setID(item.id)

    }

    const editarNombre = (e) => {
        e.preventDefault()
        const NuevoArray = listaNombres
            .map( item => item.id === id ? {id:id, tituloNombre:nombre} : item)
        setListaNombre(NuevoArray)
    }

    return (
        <div>
            <h2>aplicacion CRUD basica</h2>
            <div className="row">

                <div className="col">
                    <h2>Listado de nombres</h2>
                    <ul className="list-group">
                        {
                            //todo lo que contenga listado de nombres se vacia en item, para imprimir el elemento que 
                            //se necesita solo se agrega punto y el nombre (ejm: item.tituloNombre, item.id, etc)
                            listaNombres.map(item =>
                                
                                //item hace referencia a cada una de las iteraciones del array, por lo tanto, dentro del 
                                //item viene canda uno de los nombres y cada nombre viene con un ID

                                <li key= {item.id} class="list-group-item">{item.tituloNombre}
                                
                                    <button 
                                        className="btn btn-danger float-right"
                                        onClick={ () => {deleteNombre(item.id)}}
                                    > 
                                        Borrar
                                    </button>

                                    <button 
                                        className="btn btn-info float-right"
                                        onClick={ () => {editar(item)}}
                                    > 
                                        Editar
                                    </button>

                                </li>)
                        }
                    </ul>
                </div>
                <div className="col">
                    <h2>Formulario para agregar nombres</h2>

                    <form onSubmit={modoEdicion ? editarNombre : addNombre} className="form-group">
                        <input 
                            onChange={(event) => { setNombre(event.target.value) }}
                            className="form-control mb-3" 
                            type="text"
                            placeholder="introduce el nombre" 
                            // vaciar el cuadro de texto para ingresar otro dato, en la funcion addnombre al final se setea el valor de nombre a vacio
                            value={nombre}/>

                        <input className="btn btn-info btn-block" 
                            type="submit" 
                            placeholder="Registrar nombre" 
                            value={modoEdicion ? 'Editar nombre' : 'Registrar nombre'}
                            />
                    </form>
                    {
                        error != null  ? (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        ):
                        (
                            <div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )

}

export default ListadoNombres;