import DB from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET() {
    const db = new DB();
    try {
        const conexion = await db.getConnection();
        const result = await conexion.query(`
            SELECT 
                tbl_eventos.id_evento, 
                evento_descripcion, 
                tbl_eventos.id_lugar, 
                premio_metalico,
                tbl_equipos.id_equipo,
                nombre_equipo
            FROM proyecto.tbl_eventos_equipos AS tbl_eventos_equipos
            INNER JOIN proyecto.tbl_equipos as tbl_equipos
                ON tbl_eventos_equipos.id_equipo = tbl_equipos.id_equipo
            INNER JOIN proyecto.tbl_eventos AS tbl_eventos
                ON tbl_eventos_equipos.id_evento = tbl_eventos.id_evento
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

    const { id_evento, id_equipo } = requestData;

    try {
        const db = new DB();
        const conexion = await db.getConnection();
        const result = await conexion.query('INSERT INTO proyecto.tbl_eventos_equipos (id_evento, id_equipo) VALUES (?, ?)', [id_evento, id_equipo])
        console.log(result);
        return NextResponse.json({ "message": "Equivo invitado añadido satisfactoriamente" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ 'message': error.message })
    }
}