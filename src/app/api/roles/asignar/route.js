import DB from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET() {
    const db = new DB();
    try {
        const conexion = await db.getConnection();
        const result = await conexion.query(`
            SELECT 
                tbl_roles.id_rol, 
                nombre_rol, 
                tbl_usuarios.id_usuario, 
                email
            FROM proyecto.tbl_usuarios_roles AS tbl_usuarios_roles
            INNER JOIN proyecto.tbl_usuarios as tbl_usuarios
                ON tbl_usuarios_roles.id_usuario = tbl_usuarios.id_usuario
            INNER JOIN proyecto.tbl_roles AS tbl_roles
                ON tbl_usuarios_roles.id_rol = tbl_roles.id_rol
        `)
        console.log(result)
        return NextResponse.json(result);
    } catch (error) {
        console.log(error)
        return NextResponse.json([]);
    }
}
export async function POST(request) {
    const requestData = await request.json();

    const { id_usuario, id_rol } = requestData;

    try {
        const db = new DB();
        const conexion = await db.getConnection();
        const result = await conexion.query('INSERT INTO proyecto.tbl_usuarios_roles (id_usuario, id_rol) VALUES (?, ?)', [id_usuario, id_rol])
        console.log(result);
        return NextResponse.json({ "message": "Rol asignado satisfactoriamente" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ 'message': error.message })
    }
}