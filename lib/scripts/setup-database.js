import { executeQuery } from '../lib/db.js';

async function setupDatabase() {
  try {
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS tutors (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        subjects TEXT[],
        bio TEXT,
        hourly_rate DECIMAL(10,2),
        contact_email VARCHAR(255),
        contact_phone VARCHAR(255),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database setup complete!');
  } catch (error) {
    console.error('Database setup failed:', error);
  }
}

setupDatabase();