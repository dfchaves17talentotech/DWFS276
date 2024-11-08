import 'dotenv/config';
import {Pool} from "pg";

const pool: Pool = new Pool({
    host: process.env.LOCAL_DB_HOST,
    user: process.env.LOCAL_DB_USER,
    password: process.env.LOCAL_DB_PASSWORD,
    database: process.env.LOCAL_DB_DATABASE,
    port: parseInt(`${process.env.LOCAL_DB_PORT}`),
    idleTimeoutMillis: 3000,
});

export default pool;