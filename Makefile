.PHONY:all
fmt: check-node-version eslint prettier tsc-check

eslint = $(npm pkg get devDependencies.eslint)

## Lint matching files with eslint.
.PHONY: eslint
eslint:
	@echo "Running eslint..."
	@npm run lint -- --quiet

## Format matching files with prettier.
.PHONY: prettier
prettier:
	@echo "Running prettier..."
	@npm run fmt -- --log-level warn

## Check Typescript compiles successfully.
.PHONY:tsc-check
tsc-check:
	@echo "Compiling Typescript..."
	@npx tsc --noEmit

## Start local development server.
.PHONY:dev d
d: dev
dev: check-node-version
	@npm run dev

# Check node version matches project version
.PHONY:check-node-version
check-node-version:
	@if [[ $$(cat .nvmrc) != $$(node -v) ]]; then \
		echo "Bad Node version, expected $$(cat .nvmrc)."; \
  		false; \
	fi
