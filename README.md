# Hospetse — Back-end API

API REST do projeto Hospetse. Marketplace de serviços para pets (hospedagem, passeio, pet sitter).

Épico principal: [HOS-83 — MVP Mobile de Hospedagem](https://escola-ti.atlassian.net/browse/HOS-83)

---

## Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Banco de dados**: PostgreSQL 16
- **Driver**: node-postgres (`pg`)
- **Local**: Docker Compose

---

## Estrutura de pastas

```
back-end/
├── app.js                      ← config da API (middlewares + rotas)
├── bin/www                     ← inicializa o servidor (porta 3000)
├── .env.example                ← variáveis de ambiente (copie para .env)
│
├── db/
│   └── init/
│       ├── schema.sql          ← cria as tabelas (roda no primeiro up)
│       └── seed.sql            ← dados de demonstração
│
├── src/
│   ├── db/
│   │   └── index.js            ← conexão com o PostgreSQL
│   ├── models/                 ← acesso ao banco (queries SQL)
│   │   ├── hotelModel.js
│   │   └── reservaModel.js
│   ├── controllers/            ← recebe req/res, chama models
│   │   ├── hotelController.js
│   │   └── reservaController.js
│   └── routes/                 ← define as URLs
│       ├── hotels.js
│       └── reservas.js
│
└── docs/
    ├── der-mvp.puml            ← DER versão MVP (PlantUML)
    ├── der-prod.puml           ← DER versão produção completa
    └── classes-mvp.puml        ← Diagrama de classes MVP
```

### Fluxo de uma requisição

```
routes/ → controllers/ → models/ → banco
          (valida)        (query)
```

---

## Como rodar localmente

### 1. Pré-requisitos

- [Node.js 20+](https://nodejs.org)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

### 4. Subir o banco com Docker

```bash
docker compose up -d
```

O PostgreSQL sobe na porta `5432`. O `schema.sql` e `seed.sql` rodam automaticamente na primeira subida.

### 5. Iniciar a API

```bash
npm start
```

API disponível em `http://localhost:3000`.

---

## Endpoints

| Método | Rota | Descrição | Card |
|--------|------|-----------|------|
| GET | `/` | Health check | — |
| GET | `/hotels` | Lista hotéis disponíveis | HOS-93 |
| GET | `/hotels/:id` | Detalhe de um hotel | HOS-93 |
| POST | `/reservations` | Cria uma reserva | HOS-85 |
| GET | `/reservations` | Lista reservas do tutor | HOS-85 |

---

## Tarefas Jira

### Sprint 7 (01/06–14/06)

| Card | Tarefa | Responsável |
|------|--------|-------------|
| HOS-89 | Preparar ambiente técnico | Lucas |
| HOS-90 | Modelar banco de dados | Lucas |
| HOS-91 | Preparar dados de demonstração | Lucas |
| HOS-93 | `GET /hotels` e `GET /hotels/:id` | Lucas |
| HOS-85 | `POST /reservations` | Raul |
| HOS-99 | Persistir reserva no PostgreSQL | Lucas |

### Backlog

| Card | Tarefa |
|------|--------|
| HOS-103 | Documentar API |

---

## Documentação do banco

Os diagramas ficam em `docs/`:

- **`der-mvp.puml`** — DER enxuto do MVP
- **`der-prod.puml`** — DER completo pensando em produção
- **`classes-mvp.puml`** — Diagrama de classes

Cole o conteúdo em [plantuml.com](https://www.plantuml.com/plantuml/uml) para visualizar.

---

## Time Backend

- **Lucas Neo** — Backend, Banco, Deploy
- **Raul Lopes Jorge** — Backend, Infra, Banco
