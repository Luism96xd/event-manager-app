import FormDisciplinas from '@/components/FormDisciplinas'
import axios from 'axios';
import React from 'react'

export const revalidate = 5;

async function obtenerDatos() {
    const response = await axios.get('http://localhost:3000/api/disciplinas');
    return response.data;
}


async function PageDisciplinas() {
    const datos = await obtenerDatos();
    return (
        <div className='p-4 grid grid-cols-2 justify-center items-start w-full h-screen gap-4'>
            <FormDisciplinas />
            <table>
                <thead className='bg-blue-500 p-4'>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                {datos && <tbody>
                    {datos.map((lugar) => {
                        return (
                            <tr key={lugar.id_disciplina} className="hover:bg-gray-200">
                                <td>{lugar.id_disciplina}</td>
                                <td>{lugar.nombre_disciplina}</td>
                            </tr>
                        )
                    })}
                </tbody>
                }
            </table>
        </div>
    )
}

export default PageDisciplinas