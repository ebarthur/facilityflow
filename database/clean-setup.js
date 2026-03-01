const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const pool = require('../config/database');

async function cleanSetupDatabase() {
    try {
        console.log('Setting up fresh database...');

        console.log('Dropping existing tables (if any)...');

        await pool.query(`
            DROP TABLE IF EXISTS bookings CASCADE;
            DROP TABLE IF EXISTS facilities CASCADE;
            DROP TABLE IF EXISTS users CASCADE;
        `);

        console.log('Old tables removed successfully.');

        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        await pool.query(schema);

        console.log('Database schema created successfully!');

        const adminPassword = await bcrypt.hash('admin123', 12);

        await pool.query(
            `
            INSERT INTO users (name, email, password, role)
            VALUES ($1, $2, $3, $4)
            `,
            ['Admin User', 'admin@unispace.local', adminPassword, 'admin']
        );

        await pool.query(`
            INSERT INTO facilities (name, location, capacity) VALUES
                ('Computer Lab 101', 'Building A, Floor 1', 30),
                ('Study Room 202', 'Library, Floor 2', 15),
                ('Conference Hall 301', 'Building B, Floor 3', 50),
                ('Lecture Hall 401', 'Building C, Floor 1', 100),
                ('Science Lab 501', 'Science Building, Floor 2', 25),
                ('Art Studio 601', 'Arts Building, Floor 1', 20)
        `);

        console.log('\n=== Initial Setup Complete ===');
        console.log('Admin: admin@unispace.local (password: admin123)');
        console.log('Registration is now open for all users.');

    } catch (error) {
        console.error('Database setup failed:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

// Run setup if executed directly
if (require.main === module) {
    cleanSetupDatabase();
}

module.exports = cleanSetupDatabase;