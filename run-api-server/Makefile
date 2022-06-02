NAME := run_api

.PHONY: *

default: run

run-dev:
	docker-compose build
	docker-compose up

load:
	mysql -urun -prun -h127.0.0.1 run < run.sql

login:
	aws ecr get-login-password | docker login --username AWS --password-stdin 403796006866.dkr.ecr.us-east-1.amazonaws.com

build-nginx:
	@echo Building Production Nginx Container
	$(eval ECR := $(shell aws ecr describe-repositories --query "repositories[?repositoryName=='${NAME}_nginx'].repositoryUri" --output text))
	docker build -t ${ECR}:$(environment)  --platform linux/x86_64 -f Dockerfile.nginx .

build-api:
	@echo Building Production API Container
	$(eval ECR := $(shell aws ecr describe-repositories --query "repositories[?repositoryName=='${NAME}'].repositoryUri" --output text))
	docker build -t ${ECR}:$(environment) --platform linux/x86_64 .
push: login build-nginx build-api
	@echo Pushing Containers
	docker push ${ECR}:$(environment)
	docker push ${ECR}_nginx:$(environment)

rotate:
	@echo Stopping Task
	$(eval task := $(shell aws ecs list-tasks --cluster run_api --service-name $(environment) --query taskArns[0]))
	aws ecs stop-task --cluster run_api --task ${task} > /dev/null
