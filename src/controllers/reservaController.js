// CONTROLLER — Reservas
const reservaModel = require('../models/reservaModel');

// Helper para converter data de DD/MM/YYYY para YYYY-MM-DD
function converteDataISO(dataPTBR) {
  if (!dataPTBR) return null;
  const [dia, mes, ano] = dataPTBR.split('/');
  return `${ano}-${mes}-${dia}`;
}

// POST /reservations  -> cria uma reserva (UC04)
async function postReserva(req, res) {
  try {
    const { tutor_id, pet_id, servico_id, data_inicio, data_fim, valor_total } = req.body;

    // Validação obrigatória
    if (!tutor_id || !pet_id || !servico_id || !data_inicio) {
      return res.status(400).json({ erro: 'Campos obrigatórios ausentes' });
    }

    // Conversão de datas
    const dataInicioISO = converteDataISO(data_inicio);
    const dataFimISO = converteDataISO(data_fim);

    const novaReserva = await reservaModel.criarReserva({
      tutor_id,
      pet_id,
      servico_id,
      data_inicio: dataInicioISO,
      data_fim: dataFimISO,
      valor_total
    });

    res.status(201).json(novaReserva);
  } catch (err) {
    if (err.tipo === 'CONFLITO') {
      return res.status(409).json({ erro: err.message });
    }
    res.status(500).json({ erro: 'Erro ao criar reserva', detalhe: err.message });
  }
}

// GET /reservations?tutor_id=1  -> lista reservas do tutor
async function getReservas(req, res) {
  try {
    const tutor_id = parseInt(req.query.tutor_id, 10);
    if (isNaN(tutor_id)) {
      return res.status(400).json({ erro: 'tutor_id inválido ou ausente' });
    }

    const reservas = await reservaModel.listarReservasPorTutor(tutor_id);
    res.status(200).json(reservas);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar reservas do tutor', detalhe: err.message });
  }
}

module.exports = { postReserva, getReservas };
