require('dotenv').config(); // Load environment variables from .env
const { Client } = require("pg");

// SQL to create and populate the messages table
const SQL = `
DROP TABLE IF EXISTS messages;
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,            -- Auto-incrementing primary key
  text VARCHAR(255) NOT NULL,       -- Message text
  "user" VARCHAR(50) NOT NULL,      -- User who added the message (quoted to avoid conflict with reserved keyword)
  added TIMESTAMP DEFAULT NOW()     -- Timestamp when the message was added
);

INSERT INTO messages (text, "user") 
VALUES
    ('Hello, World!', 'Alice'),
    ('Welcome to the message board.', 'Bob'),
    ('PostgreSQL rocks!', 'Charlie')
ON CONFLICT DO NOTHING;             -- Avoid duplicate entries if this script is run multiple times
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
