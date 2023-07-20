import DB from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET(){
    const db = new DB();
    try{
        const conexion = await db.getConnection();
        const result = await conexion.query('SELECT * FROM proyecto.tbl_roles;')
        return NextResponse.json(result);
    }catch(error){
        console.log(error)
        return NextResponse.json([]);
    }
}

export async function POST(request){
    const requestData = await request.json();
    
    const {nombre_rol} = requestData;

    try{
        const db = new DB();
        const conexion = await db.getConnection();
        const result = await conexion.query('INSERT INTO proyecto.tbl_roles (nombre_rol) VALUES (?)', [nombre_rol])
        console.log(result);
        return NextResponse.json({"message": "Rol añadido satisfactoriamente"});
    }catch(error){
        console.log(error);
        return NextResponse.error({'message': "Hubo un error al crear el rol"})
    }
}