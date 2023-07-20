"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Searchbox from './SearchBox';
import { useRouter } from 'next/navigation';

const FormEventosEquipos = () => {
  //Evento seleccionado
  const [evento, setEvento] = useState(null);
  //Equipo seleccionado
  const [equipo, setEquipo] = useState(null);
  //Lista de equipos
  const [equipos, setEquipos] = useState([]);
  //Lista de eventos
  const [eventos, setEventos] = useState([]);

  const router = useRouter();

  const guardar = async (e) => {
    e.preventDefault();
    if(equipo == null || evento == null){
      return
    }
    const datosAEnviar = {
      id_equipo: equipo.id_equipo,
      id_evento: evento.id_evento
    }
    console.log(datosAEnviar);
    const response = await axios.post("http://localhost:3000/api/eventos/equipos", datosAEnviar);
    console.log(response);
    setEquipo(null);
    setEvento(null);
    router.refresh();
  }

  useEffect(() => {
    const getData = async () => {
      const equiposData = await axios.get('http://localhost:3000/api/equipos');
      const eventosData = await axios.get('http://localhost:3000/api/eventos');
      setEquipos(equiposData.data)
      setEventos(eventosData.data)
    }
    getData()
  }, [])

  const handleOnEventoChange = (value) => {
    setEvento(value)
  }
  const handleOnEquipoChange = (value) => {
    setEquipo(value)
  }

  return (
    <form onSubmit={guardar} className='flex flex-col bg-gray-100 p-4 rounded-lg'>
      <h1 className='text-2xl font-bold'>Equipos participantes:</h1>
      <div className='w-full p-4'>
        <Searchbox
          onChange={handleOnEventoChange}
          label={"Evento"}
          value={evento && evento.evento_descripcion}
          list={eventos}
          identifier={"id_evento"}
          accessor={"evento_descripcion"}
        />
      </div>
      <div className='w-full p-4'>
        <Searchbox
          onChange={handleOnEquipoChange}
          label={"Disciplina"}
          value={equipo && equipo.nombre_equipo}
          list={equipos}
          identifier={"id_equipo"}
          accessor={"nombre_equipo"}
        />
      </div>

      <button type="submit" className='bg-blue-500 p-4 rounded-lg'>Guardar</button>
    </form>
  )
}

export default FormEventosEquipos;