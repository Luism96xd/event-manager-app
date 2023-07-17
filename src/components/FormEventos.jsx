"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Searchbox from './SearchBox';

const FormEventos = () => {
  const [lugar, setLugar] = useState(null);
  const [lugares, setLugares] = useState([]);
  const [fechaIni, setFechaIni] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [premio, setPremio] = useState(0.0);

  const guardar = async (e) => {
    e.preventDefault();
    
    const datosAEnviar = {
      id_lugar: lugar.id_lugar,
      premio_metalico: premio,
    }

    console.log(datosAEnviar);
    const response = await axios.post("http://localhost:3000/api/eventos", datosAEnviar);
    console.log(response);
    setNombre("");
  }

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/api/lugares')
      setLugares(response.data)
    }
    getData()
  }, [])

  const handleOnLugarChange = (value) => {
    setLugar(value)
  }

  return (
    <form onSubmit={guardar} className='flex flex-col bg-gray-100 p-4 rounded-lg'>
      <label htmlFor="premio" className='flex flex-col mb-2'>
        <span>Premio Metálico:</span>
        <input
          type="text"
          name="premio"
          id="premio"
          value={premio}
          onChange={(e) => setNombre(e.target.value)} />
      </label>
      <div className="w-full p-4">
        <Searchbox
          onChange={handleOnLugarChange}
          value={(lugar && lugar.nombre_lugar) ?? ""}
          label={"Lugar"}
          list={lugares}
          accessor={'nombre_lugar'}
          identifier={'id_lugar'}
        />
      </div>
      <button type="submit" className='bg-blue-500 p-4 rounded-lg'>Guardar</button>
    </form>
  )
}

export default FormEventos