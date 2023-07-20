import DB from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET(){
    const db = new DB();
    try{
        const conexion = await db.getConnection();
        const result = await conexion.query('SELECT * FROM proyecto.tbl_usuarios;')
        return NextResponse.json(result);
    }catch(error){
        console.log(error)
        return NextResponse.json([]);
    }
}

export async function POST(request){
    const requestData = await request.json();
    
    const {email, password} = requestData;

    try{
        const db = new DB();
        const conexion = await db.getConnection();
        const result = await conexion.query('INSERT INTO proyecto.tbl_usuarios (email, password) VALUES (?)', [email, password])
        console.log(result);
        return NextResponse.json({"message": "Usuario añadido satisfactoriamente"});
    }catch(error){
        console.log(error);
        return NextResponse.error({'message': "Hubo un error al crear el Usuario"})
    }
}