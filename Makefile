CMD = docker-compose
CURRENT_DIR = $(shell pwd | sed -e "s/\/cygdrive//g")
API = api
FRONT = front

up:
	$(CMD) up -d
	open http://localhost:3000

down:
	$(CMD) down

.PHONY: restart
ifeq (restart,$(firstword $(MAKECMDGOALS)))
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(RUN_ARGS):;@:)
endif
restart:
	$(CMD) up -d $(RUN_ARGS)

.PHONY: logs
ifeq (logs,$(firstword $(MAKECMDGOALS)))
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(RUN_ARGS):;@:)
endif
logs:
	$(CMD) logs -f $(RUN_ARGS)

start:
	docker-compose up -d --build
	open http://localhost:3000
