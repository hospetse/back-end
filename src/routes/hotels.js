// ROUTES — Hoteis  (montado em /hotels no app.js)
const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

/**
 * @swagger
 * /hotels:
 *   get:
 *     summary: Lista hoteis disponiveis
 *     description: Retorna todos os prestadores com servico de hospedagem ativo, ordenados por avaliacao.
 *     tags: [Hoteis]
 *     responses:
 *       200:
 *         description: Lista de hoteis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hotel'
 *       500:
 *         description: Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get('/', hotelController.getHoteis);

/**
 * @swagger
 * /hotels/{id}:
 *   get:
 *     summary: Detalhe de um hotel
 *     description: Retorna dados completos do hotel e seus servicos de hospedagem.
 *     tags: [Hoteis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do hotel (prestador)
 *     responses:
 *       200:
 *         description: Hotel encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HotelDetalhe'
 *       400:
 *         description: ID invalido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       404:
 *         description: Hotel nao encontrado
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
router.get('/:id', hotelController.getHotelPorId);

module.exports = router;
