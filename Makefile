.PHONY:all
fmt: eslint prettier tsc-check

## Clean up project dependencies
.PHONY:clean
clean: check-node-version
	npm dedupe
	npm prune

## Lint matching files with eslint.
.PHONY: eslint
eslint: check-node-version
	@echo "Running eslint..."
	@npm run lint -- --quiet --fix

## Format matching files with prettier.
.PHONY: prettier
prettier: check-node-version
	@echo "Running prettier..."
	@npm run fmt -- --cache --log-level warn --write

## Check Typescript compiles successfully.
.PHONY:tsc-check
tsc-check: check-node-version
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
