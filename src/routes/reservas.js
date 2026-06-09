// ROUTES — Reservas  (montado em /reservations no app.js)
const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.post('/', reservaController.postReserva); // POST /reservations
router.get('/', reservaController.getReservas);  // GET  /reservations

module.exports = router;
