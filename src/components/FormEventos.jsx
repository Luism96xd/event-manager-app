"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Searchbox from './SearchBox';
import { useRouter } from 'next/navigation';

const FormEventos = () => {
  const [lugar, setLugar] = useState(null);
  const [lugares, setLugares] = useState([]);
  const [fechaIni, setFechaIni] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [descripcion, setDescripcion] = useState("");
  const [premio, setPremio] = useState(0.0);
  const router = useRouter();

  const guardar = async (e) => {
    e.preventDefault();
    
    const datosAEnviar = {
      id_lugar: lugar.id_lugar,
      evento_descripcion: descripcion,
      evento_fecha_inicio: fechaIni,
      evento_fecha_finalizacion: fechaFin,
      premio_metalico: premio,
    }

    console.log(datosAEnviar);
    const response = await axios.post("http://localhost:3000/api/eventos", datosAEnviar);
    console.log(response);
    setFechaIni("");
    setFechaFin("");
    setPremio("");
    router.refresh();
  }

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('http://localhost:3000/api/lugares');
      setLugares(response.data)
    }
    getData()
  }, [])

  const handleOnLugarChange = (value) => {
    setLugar(value)
  }

  return (
    <form onSubmit={guardar} className='flex flex-col bg-gray-100 p-4 rounded-lg'>
      <label htmlFor="descripcion" className='flex flex-col my-2'>
        <span>Descripción:</span>
        <input
          type="text"
          name="descripcion"
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)} />
      </label>
      <label htmlFor="fecha_ini" className='flex flex-col my-2'>
        <span>Fecha de Inicio:</span>
        <input
          type="datetime-local"
          name="fecha_ini"
          id="fecha_ini"
          value={fechaIni}
          onChange={(e) => setFechaIni(e.target.value)} />
      </label>
      <label htmlFor="fecha_fin" className='flex flex-col my-2'>
        <span>Fecha de Finalización:</span>
        <input
          type="datetime-local"
          name="fecha_fin"
          id="fecha_fin"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)} />
      </label>
      <label htmlFor="premio" className='flex flex-col my-2'>
        <span>Premio Metálico:</span>
        <input
          type="text"
          name="premio"
          id="premio"
          value={premio}
          onChange={(e) => setPremio(e.target.value)} />
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

export default FormEventos;