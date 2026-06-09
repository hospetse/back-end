// ROUTES — Hotéis  (montado em /hotels no app.js)
const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

router.get('/', hotelController.getHoteis);        // GET /hotels
router.get('/:id', hotelController.getHotelPorId); // GET /hotels/:id

module.exports = router;
