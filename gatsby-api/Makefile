NAME := run_gatsby

.PHONY: *

login:
	aws ecr get-login-password | docker login --username AWS --password-stdin 403796006866.dkr.ecr.us-east-1.amazonaws.com

build-varnish:
	@echo Building Varnish Container
	$(eval ECR := $(shell aws ecr describe-repositories --query "repositories[?repositoryName=='${NAME}'].repositoryUri" --output text))
	docker build -t ${ECR}:$(environment) .

build-nginx:
	@echo Building Nginx Container
	$(eval ECR := $(shell aws ecr describe-repositories --query "repositories[?repositoryName=='${NAME}_nginx'].repositoryUri" --output text))
	docker build -t ${ECR}:$(environment) -f Dockerfile.nginx .

push: login build-nginx build-varnish
	@echo Pushing Containers
	docker push ${ECR}:$(environment)
	docker push ${ECR}_nginx:$(environment)

rotate:
	@echo Stopping Task
	$(eval task := $(shell aws ecs list-tasks --cluster run_gatsby --service-name $(environment) --query taskArns[0]))
	aws ecs stop-task --cluster run_gatsby --task ${task} > /dev/null
