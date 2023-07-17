import DB from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET() {
    const db = new DB();
    try {
        const conexion = await db.getConnection();
        const result = await conexion.query(`
            SELECT id_equipo, nombre_equipo, tbl_equipos.id_disciplina, nombre_disciplina 
            FROM proyecto.tbl_equipos AS tbl_equipos 
            INNER JOIN proyecto.tbl_disciplinas AS tbl_disciplinas 
            ON tbl_equipos.id_disciplina = tbl_disciplinas.id_disciplina; 
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

    const { nombre_equipo, id_disciplina } = requestData;

    try {
        const db = new DB();
        const conexion = await db.getConnection();
        const result = await conexion.query('INSERT INTO proyecto.tbl_equipos (nombre_equipo, id_disciplina) VALUES (?, ?)', [nombre_equipo, id_disciplina])
        console.log(result);
        return NextResponse.json({ "message": "Equipo añadido satisfactoriamente" });
    } catch (error) {
        console.log(error);
        return NextResponse.error({ 'message': "Hubo un error al crear el Equipo" })
    }
}