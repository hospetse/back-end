// Script de inicialização do banco.
// Roda o schema.sql e o seed.sql contra o banco configurado no .env.
// Uso: npm run db:setup
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const fs   = require('fs');
const path = require('path');
const db   = require('../src/db');

async function setup() {
  try {
    console.log('Conectando ao banco...');

    const schema = fs.readFileSync(path.join(__dirname, 'init/schema.sql'), 'utf8');
    const seed   = fs.readFileSync(path.join(__dirname, 'init/seed.sql'),   'utf8');

    console.log('Criando tabelas (schema.sql)...');
    await db.query(schema);

    console.log('Inserindo dados de demonstracao (seed.sql)...');
    await db.query(seed);

    console.log('Banco configurado com sucesso.');
  } catch (err) {
    console.error('Erro ao configurar o banco:', err.message);
    process.exit(1);
  } finally {
    await db.pool.end();
    process.exit(0);
  }
}

setup();
