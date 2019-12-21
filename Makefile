CMD = docker-compose
CURRENT_DIR = $(shell pwd | sed -e "s/\/cygdrive//g")
API = api
FRONT = front

up:
	$(CMD) up -d

down:
	$(CMD) down

exec api:
	$(CMD) exec api /bin/sh

exec front:
	$(CMD) exec front /bin/sh

.PHONY: restart
ifeq (restart,$(firstword $(MAKECMDGOALS)))
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(RUN_ARGS):;@:)
endif
restart:
	$(CMD) up -d $(RUN_ARGS)
