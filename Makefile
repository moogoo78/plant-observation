THIS_FILE := $(lastword $(MAKEFILE_LIST))

DOCKER_COMPOSE := docker compose

COMPOSE_DEFAULT := docker-compose.yml

#files += "-f" 

.PHONY: help start up down ps logs prod
#.PHONY: help build up start down destroy stop restart logs logs-api ps login-timesca
#        make -pRrq  -f $(THIS_FILE) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'
help:
	echo "help"


start: ## default read: docker-compose.yml, docker-compose.override.yml
	$(DOCKER_COMPOSE) up

up:
	$(DOCKER_COMPOSE) up -d

down:
	$(DOCKER_COMPOSE) down

ps:
	$(DOCKER_COMPOSE) ps

config:
	$(DOCKER_COMPOSE) config

logs:
	$(DOCKER_COMPOSE) logs -f

prod:
	$(DOCKER_COMPOSE) -f docker-compose.yml -f docker-compose.prod.yml --build up -d

foo:
	echo ${files}
