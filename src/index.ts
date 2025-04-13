// write a function to create a users table in your database.
 
import { Client } from "pg";

const client = new Client({
  connectionString: "postgresql://postgres:admin123@localhost/postgres",
});

client.connect();

async function createUsersTable() {
  try {
    const result = await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Users table created successfully:", result);
  } catch (err) {
    console.error("Error creating users table:", err);
  } finally {
    await client.end();
  }
}

createUsersTable();
