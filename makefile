# Variables
IMAGE_NAME = prueba-tecnica-inalambria-dev
CONTAINER_NAME = prueba-tecnica-inalambria-dev

# Comandos
build:
	docker-compose build

run:
	docker-compose up -d

reload: stop build run

stop:
	docker-compose down

.PHONY: build run reload stop
