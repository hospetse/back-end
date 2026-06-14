const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hospetse API',
      version: '1.0.0',
      description: 'API REST do MVP de hospedagem — UC03 Buscar Servicos + UC04 Solicitar Reserva',
    },
    servers: [
      {
        url: 'https://back-end-production-11e9.up.railway.app',
        description: 'Producao (Railway)',
      },
      {
        url: 'http://localhost:3000',
        description: 'Local',
      },
    ],
    components: {
      schemas: {
        Hotel: {
          type: 'object',
          properties: {
            id:                { type: 'integer', example: 1 },
            nome:              { type: 'string',  example: 'Hotel Pet Paraiso' },
            localizacao:       { type: 'string',  example: 'Sao Paulo, SP' },
            avaliacao:         { type: 'number',  example: 4.8, nullable: true },
            foto_url:          { type: 'string',  example: 'https://picsum.photos/seed/hotel1/400' },
            preco_a_partir_de: { type: 'number',  example: 80.00 },
          },
        },
        Servico: {
          type: 'object',
          properties: {
            id:         { type: 'integer', example: 1 },
            nome:       { type: 'string',  example: 'Diaria Quarto Standard' },
            preco:      { type: 'number',  example: 80.00 },
            unidade:    { type: 'string',  example: 'DIARIA' },
            capacidade: { type: 'integer', example: 10 },
          },
        },
        HotelDetalhe: {
          allOf: [
            { '$ref': '#/components/schemas/Hotel' },
            {
              type: 'object',
              properties: {
                servicos: {
                  type: 'array',
                  items: { '$ref': '#/components/schemas/Servico' },
                },
              },
            },
          ],
        },
        Reserva: {
          type: 'object',
          properties: {
            id:          { type: 'integer', example: 1 },
            tutor_id:    { type: 'integer', example: 1 },
            pet_id:      { type: 'integer', example: 1 },
            servico_id:  { type: 'integer', example: 1 },
            data_inicio: { type: 'string', format: 'date', example: '2026-07-10' },
            data_fim:    { type: 'string', format: 'date', example: '2026-07-15', nullable: true },
            status:      { type: 'string', example: 'PENDENTE' },
            valor_total: { type: 'number', example: 400.00, nullable: true },
            created_at:  { type: 'string', format: 'date-time' },
          },
        },
        Erro: {
          type: 'object',
          properties: {
            erro: { type: 'string', example: 'Hotel nao encontrado' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
