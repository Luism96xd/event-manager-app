"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Searchbox from './SearchBox';
import { useRouter } from 'next/navigation';

const FormEquipos = () => {
  const [nombre, setNombre] = useState("");
  const [disciplina, setDisciplina] = useState(null);
  const [disciplinas, setDisciplinas] = useState([]);

  const router = useRouter();

  const guardar = async (e) => {
    e.preventDefault();
    const datosAEnviar = {
      nombre_equipo: nombre,
      id_disciplina: disciplina.id_disciplina
    }
    console.log(datosAEnviar);
    const response = await axios.post("http://localhost:3000/api/equipos", datosAEnviar);
    console.log(response);
    setNombre("");
    setDisciplina(null);
    router.refresh();
  }

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('http://localhost:3000/api/disciplinas')
      console.log(response.data)
      setDisciplinas(response.data)
    }
    getData()
  }, [])

  const handleOnDisciplinaChange = (value) => {
    setDisciplina(value)
  }

  return (
    <form onSubmit={guardar} className='flex flex-col bg-gray-100 p-4 rounded-lg'>
      <h1 className='text-2xl font-bold'>Crear Equipo:</h1>
      <label htmlFor="nombre" className='flex flex-col my-2'>
        <span>Nombre:</span>
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)} />
      </label>
      <div className='w-full p-4'>
        <Searchbox
          onChange={handleOnDisciplinaChange}
          label={"Disciplina"}
          value={disciplina && disciplina.nombre_disciplina}
          list={disciplinas}
          identifier={"id_disciplina"}
          accessor={"nombre_disciplina"}
        />
      </div>

      <button type="submit" className='bg-blue-500 p-4 rounded-lg'>Guardar</button>
    </form>
  )
}

export default FormEquipos;