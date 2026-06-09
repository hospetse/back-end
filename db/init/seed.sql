-- =========================================================
--  HOSPETSE — Dados de demonstração (HOS-91)
--  Roda após o schema.sql na primeira subida do container.
-- =========================================================

-- Usuários prestadores (hotéis)
INSERT INTO usuario (email, senha_hash, tipo_conta) VALUES
  ('hotelpet@demo.com',  '$2b$10$demohash', 'PRESTADOR'),
  ('patas@demo.com',     '$2b$10$demohash', 'PRESTADOR'),
  ('aurora@demo.com',    '$2b$10$demohash', 'PRESTADOR');

-- Usuário tutor (pra testar reserva)
INSERT INTO usuario (email, senha_hash, tipo_conta) VALUES
  ('joao@demo.com', '$2b$10$demohash', 'TUTOR');

-- Prestadores (hotéis)
INSERT INTO prestador (usuario_id, tipo_pessoa, nome, cpf_cnpj, localizacao, avaliacao, foto_url) VALUES
  (1, 'PJ', 'Hotel Pet Paraíso',  '11.111.111/0001-11', 'São Paulo, SP',    4.8, 'https://picsum.photos/seed/hotel1/400'),
  (2, 'PJ', 'Patas Felizes',      '22.222.222/0001-22', 'Campinas, SP',     4.5, 'https://picsum.photos/seed/hotel2/400'),
  (3, 'PF', 'Aurora Hospedagem',  '333.333.333-33',     'Rio de Janeiro, RJ', NULL, 'https://picsum.photos/seed/hotel3/400');

-- Serviços de hospedagem de cada hotel
INSERT INTO servico (prestador_id, tipo_servico, nome, preco, unidade, capacidade) VALUES
  (1, 'HOSPEDAGEM', 'Diária Quarto Standard', 80.00,  'DIARIA', 10),
  (1, 'HOSPEDAGEM', 'Diária Suíte Premium',   150.00, 'DIARIA', 5),
  (2, 'HOSPEDAGEM', 'Diária Padrão',          70.00,  'DIARIA', 8),
  (3, 'HOSPEDAGEM', 'Diária Conforto',        95.00,  'DIARIA', 6);

-- Tutor + pet de teste
INSERT INTO tutor (usuario_id, nome, telefone, cpf) VALUES
  (4, 'João Silva', '11999990000', '123.456.789-00');

INSERT INTO pet (tutor_id, nome, especie, porte) VALUES
  (1, 'Rex', 'Cão', 'MEDIO');
