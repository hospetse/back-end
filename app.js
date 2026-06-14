require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var swaggerUi = require('swagger-ui-express');
var swaggerSpec = require('./src/docs/swagger');

var app = express();

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger — documentacao da API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas da API
app.use('/hotels',       require('./src/routes/hotels'));
app.use('/reservations', require('./src/routes/reservas'));

// Health check
app.get('/', (req, res) => res.json({ status: 'ok', app: 'Hospetse API' }));

// 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler — responde JSON (é API, não site)
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    erro: err.message,
    detalhe: req.app.get('env') === 'development' ? err.stack : undefined,
  });
});

module.exports = app;
