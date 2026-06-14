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

// Verifica a disponibilidade calculando (Capacidade Total - Overlaps de Reservas)
async function verificarDisponibilidade(prestadorId, dataInicio, dataFim) {
  const sql = `
    SELECT 
      s.id AS servico_id,
      s.nome AS servico_nome,
      s.capacidade AS capacidade_total,
      COALESCE((
        SELECT count(*)::int
        FROM reserva r
        WHERE r.servico_id = s.id
          AND r.status != 'CANCELADO'
          AND (r.data_inicio <= $3 AND (r.data_fim IS NULL OR r.data_fim >= $2))
      ), 0) AS qtd_reservada
    FROM servico s
    WHERE s.prestador_id = $1 AND s.tipo_servico = 'HOSPEDAGEM' AND s.ativo = true;
  `;
  const { rows } = await db.query(sql, [prestadorId, dataInicio, dataFim]);
  
  // Mapeia adicionando a propriedade de "saldo" ou "disponivel" matemática
  return rows.map(row => {
    const disponivel = row.capacidade_total - row.qtd_reservada;
    return {
      servico_id: row.servico_id,
      servico_nome: row.servico_nome,
      capacidade_total: row.capacidade_total,
      qtd_reservada: row.qtd_reservada,
      vagas_disponiveis: disponivel > 0 ? disponivel : 0
    };
  });
}

module.exports = { listarHoteis, buscarHotelPorId, verificarDisponibilidade };
