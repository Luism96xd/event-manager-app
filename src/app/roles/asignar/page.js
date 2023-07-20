import React from 'react';
import axios from 'axios';
import FormRolesAsignar from '@/components/FormRolesAsignar';
import { formatDate } from '@/lib/utils';

export const revalidate = 5;

async function obtenerDatos() {
    const response = await axios.get('http://localhost:3000/api/roles/asignar');
    return response.data;
}

async function RolesAsignarPage() {
    const datos = await obtenerDatos();
    return (
        <div className='w-full p-4 grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-4'>
                <FormRolesAsignar />
            </div>
            <table>
                <thead className='bg-blue-500 p-4'>
                    <tr>
                        <th>Usuario</th>
                        <th>Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((item) => {
                        return (
                            <tr key={item.id_usuario_rol} className="hover:bg-gray-200">
                                <td>{item.email}</td>
                                <td>{item.nombre_rol}</td>
                           </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RolesAsignarPage;