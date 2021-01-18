SHELL=/bin/sh

CD:=cd ./docker
COMPOSE_CMD:=docker-compose

up:
	${CD} && ${COMPOSE_CMD} up -d

restart:
	${CD} && ${COMPOSE_CMD} up -d --force-recreate

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

link:
	${CD} && ${COMPOSE_CMD} exec backend sh -c 'php artisan october:mirror public'

watch:
	${CD} && ${COMPOSE_CMD} exec backend sh -c 'cd themes/mikus-blog && npm run watch'

prod:
	${CD} && ${COMPOSE_CMD} exec backend sh -c 'cd themes/mikus-blog && npm run prod'

