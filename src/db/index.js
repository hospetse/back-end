// Conexão com o PostgreSQL usando node-postgres (pg).
// A connection string vem do .env (local: Docker | prod: Railway).
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Railway exige SSL em produção; local (Docker) não.
  ssl: process.env.DATABASE_URL?.includes('railway')
    ? { rejectUnauthorized: false }
    : false,
});

// Helper para rodar queries em qualquer lugar do projeto.
// Ex: const { rows } = await db.query('SELECT * FROM prestador');
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
