import React from 'react';
import FormLugares from '@/components/FormLugares';
import axios from 'axios';

export const revalidate = 5;

async function obtenerDatos() {
    const response = await axios.get('http://localhost:3000/api/lugares');
    return response.data;
}

async function EventosPage() {
    const datos = await obtenerDatos();
    return (
        <div className='w-full p-4 grid grid-cols-2 gap-4'>
            <FormLugares />
            <table>
                <thead className='bg-blue-500 p-4'>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((lugar) => {
                        return (
                            <tr key={lugar.id_lugar}>
                                <td>{lugar.id_lugar}</td>
                                <td>{lugar.nombre_lugar}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default EventosPage;