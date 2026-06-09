// CONTROLLER — Hotéis
// Recebe req/res, valida entrada e chama o model. Responde JSON.
// Importar: const hotelModel = require('../models/hotelModel');

// GET /hotels  -> lista hotéis (UC03)
// TODO: chamar hotelModel.listarHoteis() e responder res.json(...)
async function getHoteis(req, res) {
  // TODO: implementar
}

// GET /hotels/:id  -> detalhe de um hotel
// TODO: pegar req.params.id, chamar hotelModel.buscarHotelPorId(id)
// TODO: se null -> 404; senão res.json(...)
async function getHotelPorId(req, res) {
  // TODO: implementar
}

module.exports = { getHoteis, getHotelPorId };
