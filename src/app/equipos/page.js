import FormEquipos from '@/components/FormEquipos'
import React from 'react';
import axios from 'axios';

export const revalidate = 5;

async function obtenerDatos() {
  const response = await axios.get('http://localhost:3000/api/equipos');
  return response.data;
}

const EquiposPage = async () => {
  const datos = await obtenerDatos();
  return (
    <div className='p-4 grid grid-cols-2 justify-center items-start w-full h-screen gap-4'>
      <FormEquipos />
      <table>
        <thead className='bg-blue-500 p-4'>
          <tr>
            <th>N°</th>
            <th>Nombre del Equipo</th>
            <th>Disciplina</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((equipo, index) => {
            return (
              <tr key={equipo.id_equipo} className='hover:bg-gray-200'>
                <td className='text-center'>{index + 1}</td>
                <td className='text-center'>{equipo.nombre_equipo}</td>
                <td className='text-center'>{equipo.nombre_disciplina}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default EquiposPage