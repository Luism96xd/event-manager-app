import DB from "@/lib/database";
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(request) {
    const requestData = await request.json();

    const { email, id_evento, evento_titulo } = requestData;

    try {
        const db = new DB();
        const conexion = await db.getConnection();
        const evento = await conexion.query(`
            SELECT 
                id_evento,
                evento_descripcion,
                evento_fecha_inicio,
                evento_fecha_finalizacion,
                premio_metalico,
                tbl_lugares.id_lugar,
                nombre_lugar,
                id_equipo
            FROM tbl_eventos 
            INNER JOIN tbl_eventos_equipos 
                ON tbl_eventos.id_evento = tbl_eventos_equipos.id_evento
            INNER JOIN tbl_lugares 
                ON tbl_eventos.id_lugar = tbl_lugares.id_lugar
            WHERE tbl_eventos.id_evento = ?
        `, [id_evento])

        console.log(evento);

        const plantilla = `Usted ha sido invitado al evento ${evento.nombre_evento}
        Fecha de inicio: ${evento.evento_fecha_inicio}. Fecha Finalización: ${evento.evento_fecha_finalizacion}
        Lugar: ${evento.nombre_lugar}. Premio Metálico: ${evento.premio_metálico}`;

        console.log(plantilla)

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hello@example.com',
                pass: 'generated password'
            }
        });

        const mailOptions = {
            from: 'hello@example.com',
            to: email,
            subject: evento_titulo,
            text: plantilla
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
                // do something useful
            }
        });


        return NextResponse.json({ "message": "Equivo invitado añadido satisfactoriamente" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ 'message': error.message })
    }
}