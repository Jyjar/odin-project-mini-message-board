require('dotenv').config(); // Load environment variables from .env
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY, -- SERIAL is shorthand for auto-increment
  message VARCHAR(255) NOT NULL
);

INSERT INTO messages (message) 
VALUES
    ('Hello, World!'),
    ('Welcome to the message board.'),
    ('PostgreSQL rocks!');
`;

async function main() {
  console.log("Seeding the database...");

  const client = new Client({
    connectionString: process.env.DATABASE_URL, // Use DATABASE_URL from Railway
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // Enable SSL for production
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await client.end();
  }
}

main();