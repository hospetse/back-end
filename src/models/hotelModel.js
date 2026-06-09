// MODEL — acesso ao banco para "hotéis".
// No nosso DER, um "hotel" é um prestador que oferece serviço de HOSPEDAGEM.
const db = require('../db');

// Lista hotéis (prestadores com serviço de hospedagem ativo).
async function listarHoteis() {
  const sql = `
    SELECT
      p.id,
      p.nome,
      p.localizacao,
      p.avaliacao,
      p.foto_url,
      MIN(s.preco) AS preco_a_partir_de
    FROM prestador p
    JOIN servico s ON s.prestador_id = p.id
    WHERE s.tipo_servico = 'HOSPEDAGEM' AND s.ativo = true
    GROUP BY p.id
    ORDER BY p.avaliacao DESC NULLS LAST;
  `;
  const { rows } = await db.query(sql);
  return rows;
}

// Detalhe de um hotel + seus serviços de hospedagem.
async function buscarHotelPorId(id) {
  const hotelSql = `SELECT id, nome, localizacao, avaliacao, foto_url FROM prestador WHERE id = $1;`;
  const { rows: hotelRows } = await db.query(hotelSql, [id]);
  if (hotelRows.length === 0) return null;

  const servicosSql = `
    SELECT id, nome, preco, unidade, capacidade
    FROM servico
    WHERE prestador_id = $1 AND tipo_servico = 'HOSPEDAGEM' AND ativo = true;
  `;
  const { rows: servicos } = await db.query(servicosSql, [id]);

  return { ...hotelRows[0], servicos };
}

module.exports = { listarHoteis, buscarHotelPorId };
