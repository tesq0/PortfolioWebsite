SHELL=/bin/sh

CD:=cd ./docker
COMPOSE_CMD:=docker-compose

up:
	${CD} && ${COMPOSE_CMD} up -d

build:
	${CD} && ${COMPOSE_CMD} build

down:
	${CD} && ${COMPOSE_CMD} down

logs:
	${CD} && ${COMPOSE_CMD} logs -f --tail=5

status:
	${CD} && ${COMPOSE_CMD} ps

shell:
	${CD} && ${COMPOSE_CMD} exec backend sh

watch:
	${CD} && ${COMPOSE_CMD} exec backend sh -c 'cd themes/mikus-blog && npm run watch'


