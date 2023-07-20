import React from 'react';
import axios from 'axios';
import FormRoles from '@/components/FormRoles';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export const revalidate = 5;

async function obtenerDatos() {
    const response = await axios.get('http://localhost:3000/api/roles');
    return response.data;
}

async function RolesPage() {
    const datos = await obtenerDatos();
    return (
        <div className='w-full p-4 grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-4'>
                <FormRoles />
                <div>
                    <Link href={"/roles/asignar"} className='bg-green-500 rounded-lg py-2 px-4 text-white'>
                        Asignar roles
                    </Link>
                </div>
            </div>
            <table>
                <thead className='bg-blue-500 p-4'>
                    <tr>
                        <th>Nombre</th>
                        <th>Fecha creación</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((rol) => {
                        return (
                            <tr key={rol.id_rol} className="hover:bg-gray-200">
                                <td>{rol.nombre_rol}</td>
                                <td>{formatDate(rol.fecha_creacion)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RolesPage;