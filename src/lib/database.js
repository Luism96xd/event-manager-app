import mariadb from 'mariadb';

class DB{
    constructor(){
        try{
            const pool = mariadb.createPool({
                host: 'localhost', 
                user:'root', 
                password: '123abc*',
                port: 3306,
                connectionLimit: 5,
                timeout: 60000
            });
            this.pool = pool;
        }catch(error){
            console.log(error)
        }
    }

    async getConnection() {
        try {
            this.connection = await this.pool.getConnection();
        } catch (error) {
            console.log(error);
            throw "No se pudo conectar a la base de datos: " + error;
        }
        return this.connection;
    }
    
    async query(consulta){
        const result = await this.connection.query(consulta);
        this.connection.end();
        return result;
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