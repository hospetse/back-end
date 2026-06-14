// CONTROLLER — Hoteis
// Recebe req/res, valida entrada e chama o model. Responde JSON.
const hotelModel = require('../models/hotelModel');

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

module.exports = { getHoteis, getHotelPorId };
