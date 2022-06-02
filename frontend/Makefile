AWS := AWS_PROFILE=prod-run-ops aws

load-dependencies:
	yarn

bundle-dev:
	yarn build:dev

bundle-developer:
	yarn build:developer

bundle-staging:
	yarn build:staging

bundle-prod:
	yarn build:prod

sync-dev:
	aws s3 sync build/ s3://dev.designedtorun.com --delete && \
	aws cloudfront create-invalidation --distribution-id E2UFL84TYFFNFO --paths "/*"

sync-developer:
	aws s3 sync build/ s3://$(developer).designedtorun.com --delete && \
	aws cloudfront create-invalidation --distribution-id $(distribution) --paths "/*"

sync-staging:
	aws s3 sync build/ s3://staging.designedtorun.com --delete && \
	aws cloudfront create-invalidation --distribution-id E177COLIKJUM1I --paths "/*"

sync-prod:
	aws s3 sync build/ s3://designedtorun.com --delete && \
	aws cloudfront create-invalidation --distribution-id E3UE2ZX0ZOFS47 --paths "/*"

dev: load-dependencies bundle-dev sync-dev

developer: load-dependencies bundle-developer sync-developer

staging: load-dependencies bundle-staging sync-staging

production: load-dependencies bundle-prod sync-prod
