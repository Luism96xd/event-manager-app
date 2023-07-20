import FormEventosEquipos from '@/components/FormEventosEquipos';
import { formatDate } from '@/lib/utils';
import axios from 'axios';
import Link from 'next/link';
import React from 'react'

export const revalidate = 5;

async function obtenerDatos() {
  const response = await axios.get('http://localhost:3000/api/eventos/equipos');
  return response.data;
}

const EventosPage = async () => {

  const datos = await obtenerDatos();
  return (
    <div className='w-full grid grid-cols-2 gap-4 p-4'>
      <div className='flex flex-col'>
      <FormEventosEquipos />
      </div>
      <table>
        <thead className='bg-blue-500 p-4'>
          <tr>
            <th>Evento</th>
            <th>Equipo</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item) => {
            return (
              <tr key={item.id_evento_equipo}>
                <td>{item.evento_descripcion}</td>
                <td>{item.nombre_equipo}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default EventosPage;