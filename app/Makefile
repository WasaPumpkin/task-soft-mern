# ===== PROJECT SETTINGS =====
DOCKER_COMPOSE := docker-compose.yml
CLIENT_DIR := ./client
SERVER_DIR := ./server

# ===== DOCKER COMPOSE =====
.PHONY: up
up:  ## Start all services in detached mode
	docker-compose -f $(DOCKER_COMPOSE) up -d

.PHONY: down
down:  ## Stop and remove all containers
	docker-compose -f $(DOCKER_COMPOSE) down

# ===== BUILD COMMANDS =====
.PHONY: build
build: build-client build-server  ## Build all containers

.PHONY: build-client
build-client:  ## Build client container
	docker build -t task-soft-client $(CLIENT_DIR)

.PHONY: build-server
build-server:  ## Build server container
	docker build -t task-soft-server $(SERVER_DIR)

# ===== DEVELOPMENT =====
.PHONY: dev
dev:  ## Start development mode (client + server)
	@echo "Use 'make dev-client' or 'make dev-server'"

.PHONY: dev-client
dev-client:  ## Run client in development mode
	cd $(CLIENT_DIR) && npm start

.PHONY: dev-server
dev-server:  ## Run server in development mode
	cd $(SERVER_DIR) && npm run dev

# ===== UTILITIES =====
.PHONY: clean
clean:  ## Remove node_modules and build artifacts
	rm -rf $(CLIENT_DIR)/node_modules
	rm -rf $(SERVER_DIR)/node_modules

.PHONY: help
help:  ## Show this help menu
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)