// app/db/index.js - JavaScript version for Next.js compatibility
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

const DATABASE_FILE = './app/db/database.sqlite';
const SCHEMA_FILE = './app/db/schema.sql';

let cachedDb = null;

export async function connect() {
    if (cachedDb) {
        return cachedDb;
    }

    // Ensure database directory exists
    const dbDir = path.dirname(DATABASE_FILE);
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
    }

    const db = await open({
        filename: DATABASE_FILE,
        driver: sqlite3.Database
    });

    // Initialize schema if it doesn't exist
    await initializeSchema(db);
    
    cachedDb = db;
    return db;
}

async function initializeSchema(db) {
    try {
        // Check if tables exist
        const tables = await db.all(
            "SELECT name FROM sqlite_master WHERE type='table' AND name IN ('users', 'jobs')"
        );
        
        if (tables.length < 2) {
            console.log('Initializing database schema...');
            const schema = fs.readFileSync(SCHEMA_FILE, 'utf8');
            await db.exec(schema);
            console.log('Database schema initialized successfully');
        }
    } catch (error) {
        console.error('Error initializing schema:', error);
        throw error;
    }
}

export async function executeQuery(query, params = []) {
    const db = await connect();
    const result = await db.all(query, params);
    return result;
}

export async function executeUpdate(query, params = []) {
    const db = await connect();
    const result = await db.run(query, params);
    return result;
}

export async function executeGet(query, params = []) {
    const db = await connect();
    const result = await db.get(query, params);
    return result;
}

// User operations
export const userDb = {
    async create(userData) {
        const result = await executeUpdate(
            'INSERT INTO users (email, password, name, userType) VALUES (?, ?, ?, ?)',
            [userData.email, userData.password, userData.name, userData.userType]
        );
        return { id: result.lastID, ...userData };
    },

    async findByEmail(email) {
        return await executeGet('SELECT * FROM users WHERE email = ?', [email]);
    },

    async findById(id) {
        return await executeGet('SELECT * FROM users WHERE id = ?', [id]);
    }
};

// Job operations
export const jobDb = {
    async create(jobData) {
        const skillsJson = jobData.skills ? JSON.stringify(jobData.skills) : null;
        const result = await executeUpdate(
            'INSERT INTO jobs (title, description, budget, category, skills, duration, clientId) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [jobData.title, jobData.description, jobData.budget, jobData.category, skillsJson, jobData.duration, jobData.clientId]
        );
        return { id: result.lastID, ...jobData, skills: jobData.skills };
    },

    async findAll(filters = {}) {
        let query = `
            SELECT j.*, u.name as userName 
            FROM jobs j 
            LEFT JOIN users u ON j.clientId = u.id 
            WHERE 1=1
        `;
        const params = [];

        if (filters.category && filters.category !== 'all') {
            query += ' AND j.category = ?';
            params.push(filters.category);
        }

        if (filters.search) {
            query += ' AND (j.title LIKE ? OR j.description LIKE ?)';
            params.push(`%${filters.search}%`, `%${filters.search}%`);
        }

        query += ' ORDER BY j.createdAt DESC';

        const jobs = await executeQuery(query, params);
        return jobs.map((job) => ({
            ...job,
            skills: job.skills ? JSON.parse(job.skills) : [],
            user: job.userName ? { name: job.userName } : null
        }));
    },

    async findByUserId(userId) {
        const jobs = await executeQuery(
            'SELECT * FROM jobs WHERE clientId = ? ORDER BY createdAt DESC',
            [userId]
        );
        return jobs.map((job) => ({
            ...job,
            skills: job.skills ? JSON.parse(job.skills) : []
        }));
    }
};