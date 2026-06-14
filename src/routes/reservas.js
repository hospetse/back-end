// ROUTES — Reservas  (montado em /reservations no app.js)
const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Cria uma reserva
 *     description: Registra uma nova solicitacao de reserva com status inicial PENDENTE (UC04).
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [tutor_id, pet_id, servico_id, data_inicio]
 *             properties:
 *               tutor_id:    { type: integer, example: 1 }
 *               pet_id:      { type: integer, example: 1 }
 *               servico_id:  { type: integer, example: 1 }
 *               data_inicio: { type: string, format: date, example: '2026-07-10' }
 *               data_fim:    { type: string, format: date, example: '2026-07-15' }
 *               valor_total: { type: number, example: 400.00 }
 *     responses:
 *       201:
 *         description: Reserva criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       400:
 *         description: Campos obrigatorios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       500:
 *         description: Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.post('/', reservaController.postReserva);

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Lista reservas de um tutor
 *     description: Retorna todas as reservas do tutor com dados do pet, servico e hotel.
 *     tags: [Reservas]
 *     parameters:
 *       - in: query
 *         name: tutor_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tutor
 *     responses:
 *       200:
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reserva'
 *       400:
 *         description: tutor_id ausente ou invalido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       500:
 *         description: Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get('/', reservaController.getReservas);

module.exports = router;
