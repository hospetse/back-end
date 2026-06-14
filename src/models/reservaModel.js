// MODEL — Reservas
const db = require('../db');

async function criarReserva({ tutor_id, pet_id, servico_id, data_inicio, data_fim, valor_total }) {
  // 1. Checa capacidade do serviço
  const capacidadeQuery = await db.query('SELECT capacidade FROM servico WHERE id = $1', [servico_id]);
  if (capacidadeQuery.rows.length === 0) {
    throw new Error('Serviço não encontrado');
  }
  const capacidade = capacidadeQuery.rows[0].capacidade;

  // 2. Valida concorrência (overlaps de datas)
  if (capacidade > 0) {
    // Conta quantas reservas "overlapam" o novo período para este serviço
    // Uma reserva overlap ocorre se: nova_data_inicio <= velha_data_fim E nova_data_fim >= velha_data_inicio
    const overlapQuery = await db.query(`
      SELECT count(*) as qtd 
      FROM reserva 
      WHERE servico_id = $1 
        AND status != 'CANCELADO'
        AND (data_inicio <= $3 AND (data_fim IS NULL OR data_fim >= $2))
    `, [servico_id, data_inicio, data_fim]);
    
    const reservasAtivas = parseInt(overlapQuery.rows[0].qtd, 10);
    
    if (reservasAtivas >= capacidade) {
      const err = new Error('Capacidade máxima atingida para este período');
      err.tipo = 'CONFLITO';
      throw err;
    }
  }

  // 3. Insere a nova reserva
  const insertQuery = `
    INSERT INTO reserva (tutor_id, pet_id, servico_id, data_inicio, data_fim, valor_total)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const { rows } = await db.query(insertQuery, [tutor_id, pet_id, servico_id, data_inicio, data_fim, valor_total]);
  return rows[0];
}

async function listarReservasPorTutor(tutorId) {
  const sql = `
    SELECT 
      r.id, r.status, r.data_inicio, r.data_fim, r.valor_total,
      p.id as pet_id, p.nome as pet_nome, p.especie as pet_especie,
      s.id as servico_id, s.nome as servico_nome, s.tipo_servico as servico_tipo,
      pr.id as prestador_id, pr.nome as prestador_nome
    FROM reserva r
    JOIN pet p ON r.pet_id = p.id
    JOIN servico s ON r.servico_id = s.id
    JOIN prestador pr ON s.prestador_id = pr.id
    WHERE r.tutor_id = $1
    ORDER BY r.data_inicio DESC;
  `;
  const { rows } = await db.query(sql, [tutorId]);
  
  // Mapeia a resposta achatada do SQL para objetos aninhados (conforme contrato visual do Front)
  return rows.map(r => ({
    id: r.id,
    status: r.status,
    data_inicio: r.data_inicio,
    data_fim: r.data_fim,
    valor_total: r.valor_total,
    pet: {
      id: r.pet_id,
      nome: r.pet_nome,
      especie: r.pet_especie
    },
    servico: {
      id: r.servico_id,
      nome: r.servico_nome,
      tipo_servico: r.servico_tipo
    },
    prestador: {
      id: r.prestador_id,
      nome: r.prestador_nome
    }
  }));
}

module.exports = {
  criarReserva,
  listarReservasPorTutor,
};
