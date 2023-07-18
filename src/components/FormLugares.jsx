"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const FormLugares = () => {
  const [nombre, setNombre] = useState("");
  const router = useRouter();

  const guardar = async (e) => {
    e.preventDefault();
    if(nombre == ""){
      return
    }
    const datosAEnviar = {
      nombre_lugar: nombre
    }
    console.log(datosAEnviar);
    const response = await axios.post("http://localhost:3000/api/lugares", datosAEnviar);
    console.log(response);
    setNombre("");
    router.refresh();
  }

  return (
    <form onSubmit={guardar} className='flex flex-col justify-evenly bg-gray-100 p-4 rounded-lg'>
      <h1 className='text-2xl font-bold'>Crear Lugares:</h1>
      <label htmlFor="nombre" className='flex flex-col my-2'>
        <span>Nombre:</span>
        <input
          className='input'
          type="text"
          name="nombre"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)} />
      </label>

      <button type="submit" className='bg-blue-500 py-2 px-4 rounded-lg text-white'>Guardar</button>
    </form>
  )
}

export default FormLugares