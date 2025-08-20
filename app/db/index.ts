import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';

const DATABASE_FILE = './db/database.sqlite';

export async function connect() {
    const db = await open({
        filename: DATABASE_FILE,
        driver: sqlite3.Database
    });
    return db;
}

export async function executeQuery(query: string, params: any[] = []) {
    const db = await connect();
    const result = await db.all(query, params);
    await db.close();
    return result;
}

export async function executeUpdate(query: string, params: any[] = []) {
    const db = await connect();
    const result = await db.run(query, params);
    await db.close();
    return result;
}