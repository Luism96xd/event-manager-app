import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header>
        <nav>
            <ul className='bg-slate-200 p-4 flex justify-between'>
                <Link href={"/"}>Home</Link>
                <Link href={"/lugares"}>Lugares</Link>
                <Link href={"/disciplinas"}>Disciplinas</Link>
                <Link href={"/equipos"}>Equipos</Link>
                <Link href={"/eventos"}>Eventos</Link>
                <Link href={"/roles"}>Roles</Link>
                <Link href={"/usuarios"}>Usuarios</Link>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar