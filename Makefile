build:
	docker compose up -d --build 

.PHONY: build

backend:
	yarn
	yarn build
	docker-compose -f docker-compose-backend.yaml up -d --build

.PHONY: backend

up:
	docker compose up -d 

.PHONY: up

down: 
	docker-compose down

.PHONY: down

logs:
	docker logs mysql -f

.PHONY: logs
