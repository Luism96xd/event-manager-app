import DB from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET() {
    const db = new DB();
    try {
        const conexion = await db.getConnection();
        const result = await conexion.query(`
            SELECT id_evento, evento_descripcion, evento_fecha_inicio, evento_fecha_finalizacion, tbl_eventos.id_lugar, premio_metalico
            FROM proyecto.tbl_eventos AS tbl_eventos
            INNER JOIN proyecto.tbl_lugares AS tbl_lugares
            ON tbl_eventos.id_lugar = tbl_lugares.id_lugar
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

    const { evento_descripcion, evento_fecha_inicio, evento_fecha_finalizacion, premio_metalico, id_lugar } = requestData;

    try {
        const db = new DB();
        const conexion = await db.getConnection();
        const result = await conexion.query('INSERT INTO proyecto.tbl_eventos (evento_descripcion, evento_fecha_inicio, evento_fecha_finalizacion, premio_metalico, id_lugar) VALUES (?, ?, ?, ?, ?)', [evento_descripcion, evento_fecha_inicio, evento_fecha_finalizacion, premio_metalico, id_lugar])
        console.log(result);
        return NextResponse.json({ "message": "Evento añadido satisfactoriamente" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ 'message': error.message })
    }
}