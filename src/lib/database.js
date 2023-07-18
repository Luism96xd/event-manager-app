import mariadb from 'mariadb';

class DB {
    constructor() {
        const pool = mariadb.createPool({
            host: 'localhost',
            user: 'root',
            password: '123abc*',
            port: 3306,
            connectionLimit: 2,
            trace: true
        });
        this.pool = pool;
    }

    async getConnection() {
        try {
            console.log('establishing connection')
            this.connection = await this.pool.getConnection();
            console.log('established')
            return this.connection;
        } catch (error) {
            console.log(error);
            throw "No se pudo conectar a la base de datos: " + error;
        }
    }

    async query(consulta) {
        try {
            const result = await this.connection.query(consulta);
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            if (this.connection) this.connection.release();
        }
    }
}

export default DB;

/*
async function ejemplo(){
    const db = new DB();
    const conexion = await db.getConnection();

    const result = await conexion.query('SELECT NOW();')
    console.log(result)
}

ejemplo();
*/