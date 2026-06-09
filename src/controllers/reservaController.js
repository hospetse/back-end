// CONTROLLER — Reservas
// Importar: const reservaModel = require('../models/reservaModel');

// POST /reservations  -> cria uma reserva (UC04)
// TODO: validar body (servico_id, pet_id, data_inicio obrigatórios -> 400)
// TODO: chamar reservaModel.criarReserva(...) e responder 201
async function postReserva(req, res) {
  // TODO: implementar
}

// GET /reservations?tutor_id=1  -> lista reservas do tutor
// TODO: pegar tutor_id da query, chamar reservaModel.listarReservasPorTutor(...)
async function getReservas(req, res) {
  // TODO: implementar
}

module.exports = { postReserva, getReservas };
