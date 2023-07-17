import DB from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const db = new DB();
        const conexion = await db.getConnection();
        
        const result = await conexion.query('SELECT * FROM proyecto.tbl_lugares;')
        console.log(result)
    
        return NextResponse.json(result);
    } catch (error) {
        console.log(error);
        return NextResponse.json([]);
    }
}

export async function POST(){
    
}