"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Searchbox from './SearchBox';
import { useRouter } from 'next/navigation';

const FormRolesAsignar = () => {
  //Usuario seleccionado
  const [usuario, setUsuario] = useState(null);
  //Lista de usuarios
  const [usuarios, setUsuarios] = useState([]);
  //Rol seleccionado
  const [rol, setRol] = useState(null);
  //Lista de roles
  const [roles, setRoles] = useState([]);

  const router = useRouter();

  const guardar = async (e) => {
    e.preventDefault();
    if(usuario == null || rol == null){
      return
    }
    const datosAEnviar = {
      id_usuario: usuario.id_usuario,
      id_rol: rol.id_rol
    }
    console.log(datosAEnviar);
    const response = await axios.post("http://localhost:3000/api/roles/asignar", datosAEnviar);
    console.log(response);
    setRol(null);
    setUsuario(null);
    router.refresh();
  }

  useEffect(() => {
    const getData = async () => {
      const usuariosData = await axios.get('http://localhost:3000/api/usuarios');
      const rolesData = await axios.get('http://localhost:3000/api/roles');
      setUsuarios(usuariosData.data)
      setRoles(rolesData.data)
    }
    getData()
  }, [])

  const handleOnUsuarioChange = (value) => {
    setUsuario(value)
  }
  const handleOnRolChange = (value) => {
    setRol(value)
  }

  return (
    <form onSubmit={guardar} className='flex flex-col bg-gray-100 p-4 rounded-lg'>
      <h1 className='text-2xl font-bold'>Asignar roles:</h1>
      <div className='w-full p-4'>
        <Searchbox
          onChange={handleOnUsuarioChange}
          label={"Usuario"}
          value={usuario && usuario.email}
          list={usuarios}
          identifier={"id_usuario"}
          accessor={"email"}
        />
      </div>
      <div className='w-full p-4'>
        <Searchbox
          onChange={handleOnRolChange}
          label={"Rol"}
          value={rol && rol.nombre_rol}
          list={roles}
          identifier={"id_rol"}
          accessor={"nombre_rol"}
        />
      </div>

      <button type="submit" className='bg-blue-500 p-4 rounded-lg'>Guardar</button>
    </form>
  )
}

export default FormRolesAsignar;