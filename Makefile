# =========================
# LOAD ENV
# =========================
include .env.prod
export

# =========================
# CONFIG
# =========================
COMPOSE_DEV=docker compose
COMPOSE_PROD=docker compose -f docker-compose.prod.yml --env-file .env.prod

DEV_SERVER_CONTAINER=api-portfolio
PROD_SERVER_CONTAINER=portfolio-api

# =========================
# DEV — DOCKER
# =========================
up:
	$(COMPOSE_DEV) up -d --build

down:
	$(COMPOSE_DEV) down

restart:
	$(COMPOSE_DEV) down
	$(COMPOSE_DEV) up -d

logs:
	$(COMPOSE_DEV) logs -f

ps:
	$(COMPOSE_DEV) ps

# =========================
# DEV — DB
# =========================
seed:
	$(COMPOSE_DEV) exec api npm run seed

reset:
	$(COMPOSE_DEV) down -v

rebuild:
	$(COMPOSE_DEV) down
	$(COMPOSE_DEV) build --no-cache
	$(COMPOSE_DEV) up -d

# =========================
# DEV — SHELLS
# =========================
server-shell:
	$(COMPOSE_DEV) exec server sh

dashboard-shell:
	$(COMPOSE_DEV) exec dashboard sh

client-next-shell:
	$(COMPOSE_DEV) exec client-next sh

# =========================
# PROD — DOCKER
# =========================
prod-up:
	$(COMPOSE_PROD) up -d

prod-down:
	$(COMPOSE_PROD) down

prod-restart:
	make prod-down
	make prod-up

prod-build:
	$(COMPOSE_PROD) build

prod-rebuild:
	$(COMPOSE_PROD) build --no-cache

prod-logs:
	$(COMPOSE_PROD) logs -f

prod-ps:
	$(COMPOSE_PROD) ps

# =========================
# PROD — DB
# =========================
prod-seed:
	$(COMPOSE_PROD) exec api npm run seed

prod-mongo:
	$(COMPOSE_PROD) exec mongo mongosh -u $(MONGO_USER) -p $(MONGO_PASSWORD) $(MONGO_DB)