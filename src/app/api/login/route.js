import DB from "@/lib/database";
import { NextResponse } from "next/server";
import { compare, genSalt, hash } from 'bcrypt';
const saltRounds = 10

export async function GET() {
    const db = new DB();
    const conexion = await db.getConnection();

    const result = await conexion.query('SELECT * FROM proyecto.tbl_users;')
    console.log(result)

    return NextResponse.json(result);
}

export async function POST(request) {
    const requestData = await request.json();

    const { email, password } = requestData;
    const salt = await genSalt(saltRounds);
    const encryptedPass = await hash(password, salt);
    console.log(encryptedPass)
    try {
        const db = new DB();
        const conexion = await db.getConnection();
        const rows = await conexion.query('SELECT * FROM proyecto.tbl_users WHERE email = ?', [email]);
        if(rows.length < 0){
            return NextResponse.json({"message": "User not found"});
        }
        const user = await compare(password, rows[0].password);

        if(!user){
            return NextResponse.json({"message": "Invalid user or password"});
        }
        return NextResponse.json({id: rows[0].id_usuario, isAuth: true})
    } catch (error) {
        console.log(error)
        return NextResponse.json({})
    }

}