import DB from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET(){
    const db = new DB();
    try{
        const conexion = await db.getConnection();
        const result = await conexion.query('SELECT * FROM proyecto.tbl_lugares;')
        return NextResponse.json(result);
    }catch(error){
        console.log(error)
        return NextResponse.json([]);
    }
}

export async function POST(request){
    const requestData = await request.json();
    
    const {nombre_lugar} = requestData;

    try{
        const db = new DB();
        const conexion = await db.getConnection();
        const result = await conexion.query('INSERT INTO proyecto.tbl_lugares (nombre_lugar) VALUES (?)', [nombre_lugar])
        console.log(result);
        return NextResponse.json({"message": "Lugar añadido satisfactoriamente"});
    }catch(error){
        console.log(error);
        return NextResponse.error({'message': "Hubo un error al crear el lugar"})
    }
}