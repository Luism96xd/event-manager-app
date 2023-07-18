"use client";
import axios from 'axios';
import React, { useState } from 'react';

const FormDisciplinas = () => {
  const [nombre, setNombre] = useState("");

  const guardar = async (e) => {
    e.preventDefault();
    if(nombre == ""){
      return
    }
    const datosAEnviar = {
      nombre_disciplina: nombre
    }
    console.log(datosAEnviar);
    const response = await axios.post("http://localhost:3000/api/disciplinas", datosAEnviar);
    console.log(response);
    setNombre("");
  }

  return (
    <form onSubmit={guardar} className='flex flex-col justify-evenly bg-gray-100 p-4 rounded-lg'>
      <h1 className='text-2xl font-bold'>Crear Disciplina:</h1>
      <label htmlFor="nombre" className='flex flex-col my-2'>
        <span>Nombre:</span>
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)} />
      </label>

      <button type="submit" className='bg-blue-500 p-4 rounded-lg'>Guardar</button>
      </form>
  )
}

export default FormDisciplinas