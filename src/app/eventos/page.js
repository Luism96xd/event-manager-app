import FormEventos from '@/components/FormEventos'
import { formatDate } from '@/lib/utils';
import axios from 'axios';
import Link from 'next/link';
import React from 'react'

export const revalidate = 5;

async function obtenerDatos() {
  const response = await axios.get('http://localhost:3000/api/eventos');
  return response.data;
}

const EventosPage = async () => {

  const datos = await obtenerDatos();
  return (
    <div className='w-full grid grid-cols-2 gap-4 p-4'>
      <div className='flex flex-col'>
      <FormEventos />
      <Link href="/eventos/equipos" className="bg-green-500 py-2 px-4 text-white rounded-lg">
        Invitar equipos
      </Link>
      </div>
      <table>
        <thead className='bg-blue-500 p-4'>
          <tr>
            <th>Evento</th>
            <th>Fecha Inicio</th>
            <th>Fecha Finalización</th>
            <th>Premio</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((evento) => {
            return (
              <tr key={evento.id_evento}>
                <td>{evento.evento_descripcion}</td>
                <td>{formatDate(evento.evento_fecha_inicio)}</td>
                <td>{formatDate(evento.evento_fecha_finalizacion)}</td>
                <td>{evento.premio_metalico}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default EventosPage;