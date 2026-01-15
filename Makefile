# =========================
# CONFIG
# =========================
COMPOSE=docker compose
SERVER_CONTAINER=api-portfolio

# =========================
# DOCKER
# =========================
up:
	$(COMPOSE) up -d --build

down:
	$(COMPOSE) down

restart:
	$(COMPOSE) down
	$(COMPOSE) up -d

logs:
	$(COMPOSE) logs -f

ps:
	$(COMPOSE) ps

# =========================
# SEED / DB
# =========================
seed:
	$(COMPOSE) exec server npm run seed

# ⚠️ remove containers + volumes (DB!)
reset:
	$(COMPOSE) down -v

rebuild:
	$(COMPOSE) down
	$(COMPOSE) build --no-cache
	$(COMPOSE) up -d

# =========================
# DEV SHORTCUTS
# =========================
server-shell:
	$(COMPOSE) exec server sh

dashboard-shell:
	$(COMPOSE) exec dashboard sh

client-next-shell:
	$(COMPOSE) exec client-next sh