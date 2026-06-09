-- =========================================================
--  HOSPETSE — Schema do MVP (UC03 Buscar Serviços + UC04 Solicitar Reserva)
--  Roda automaticamente na primeira subida do container Docker.
-- =========================================================

CREATE TABLE IF NOT EXISTS usuario (
  id          SERIAL PRIMARY KEY,
  email       VARCHAR(255) NOT NULL UNIQUE,
  senha_hash  VARCHAR(255) NOT NULL,
  tipo_conta  VARCHAR(20)  NOT NULL,            -- TUTOR | PRESTADOR
  created_at  TIMESTAMP    NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tutor (
  id          SERIAL PRIMARY KEY,
  usuario_id  INT NOT NULL REFERENCES usuario(id),
  nome        VARCHAR(255) NOT NULL,
  telefone    VARCHAR(20),
  cpf         VARCHAR(14)
);

CREATE TABLE IF NOT EXISTS pet (
  id          SERIAL PRIMARY KEY,
  tutor_id    INT NOT NULL REFERENCES tutor(id),
  nome        VARCHAR(120) NOT NULL,
  especie     VARCHAR(50),
  porte       VARCHAR(20)                       -- PEQUENO | MEDIO | GRANDE
);

CREATE TABLE IF NOT EXISTS prestador (
  id            SERIAL PRIMARY KEY,
  usuario_id    INT NOT NULL REFERENCES usuario(id),
  tipo_pessoa   VARCHAR(2)  NOT NULL,           -- PF | PJ
  nome          VARCHAR(255) NOT NULL,
  cpf_cnpj      VARCHAR(18),
  localizacao   VARCHAR(255),
  avaliacao     DECIMAL(2,1),                   -- NULL quando ainda sem notas
  foto_url      VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS servico (
  id            SERIAL PRIMARY KEY,
  prestador_id  INT NOT NULL REFERENCES prestador(id),
  tipo_servico  VARCHAR(20) NOT NULL,           -- HOSPEDAGEM | PASSEIO | PET_SITTER
  nome          VARCHAR(255) NOT NULL,
  preco         DECIMAL(10,2) NOT NULL,
  unidade       VARCHAR(20),                    -- DIARIA | HORA | PASSEIO
  capacidade    INT,
  ativo         BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS reserva (
  id            SERIAL PRIMARY KEY,
  tutor_id      INT NOT NULL REFERENCES tutor(id),
  pet_id        INT NOT NULL REFERENCES pet(id),
  servico_id    INT NOT NULL REFERENCES servico(id),
  data_inicio   DATE NOT NULL,
  data_fim      DATE,
  status        VARCHAR(20) NOT NULL DEFAULT 'PENDENTE',
  valor_total   DECIMAL(10,2),
  created_at    TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT chk_datas CHECK (data_fim IS NULL OR data_fim >= data_inicio)
);

CREATE TABLE IF NOT EXISTS transacao (
  id                SERIAL PRIMARY KEY,
  reserva_id        INT NOT NULL REFERENCES reserva(id),
  valor             DECIMAL(10,2) NOT NULL,
  metodo_pagamento  VARCHAR(30),
  status            VARCHAR(20) NOT NULL DEFAULT 'PENDENTE',
  created_at        TIMESTAMP NOT NULL DEFAULT now()
);

-- Índices nas FKs da tabela quente (reserva) — acelera as buscas.
CREATE INDEX IF NOT EXISTS idx_reserva_tutor   ON reserva(tutor_id);
CREATE INDEX IF NOT EXISTS idx_reserva_servico ON reserva(servico_id);
CREATE INDEX IF NOT EXISTS idx_servico_prestador ON servico(prestador_id);
