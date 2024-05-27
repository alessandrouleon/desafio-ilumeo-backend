build:
	docker compose up -d --build 

.PHONY: build

backend:
	docker-compose -f docker-compose-backend.yaml up -d

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

