// CONTROLLER — Hoteis
// Recebe req/res, valida entrada e chama o model. Responde JSON.
const hotelModel = require('../models/hotelModel');

// Helper para converter data de DD/MM/YYYY para YYYY-MM-DD
function converteDataISO(dataPTBR) {
  if (!dataPTBR) return null;
  const [dia, mes, ano] = dataPTBR.split('/');
  return `${ano}-${mes}-${dia}`;
}

// GET /hotels
async function getHoteis(req, res) {
  try {
    const hoteis = await hotelModel.listarHoteis();
    res.json(hoteis);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar hoteis', detalhe: err.message });
  }
}

// GET /hotels/:id
async function getHotelPorId(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ erro: 'ID invalido' });
    }

    const hotel = await hotelModel.buscarHotelPorId(id);
    if (!hotel) {
      return res.status(404).json({ erro: 'Hotel nao encontrado' });
    }

    res.json(hotel);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar hotel', detalhe: err.message });
  }
}

// GET /hotels/:id/availability?data_inicio=DD/MM/YYYY&data_fim=DD/MM/YYYY
async function getDisponibilidadeHotel(req, res) {
  try {
    const prestadorId = parseInt(req.params.id, 10);
    const { data_inicio, data_fim } = req.query;

    if (isNaN(prestadorId)) {
      return res.status(400).json({ erro: 'ID de hotel invalido' });
    }
    if (!data_inicio || !data_fim) {
      return res.status(400).json({ erro: 'data_inicio e data_fim sao obrigatorios na query (formato DD/MM/YYYY)' });
    }

    const dataInicioISO = converteDataISO(data_inicio);
    const dataFimISO = converteDataISO(data_fim);

    const disponibilidade = await hotelModel.verificarDisponibilidade(prestadorId, dataInicioISO, dataFimISO);
    
    res.json(disponibilidade);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao verificar disponibilidade do hotel', detalhe: err.message });
  }
}

module.exports = { getHoteis, getHotelPorId, getDisponibilidadeHotel };
