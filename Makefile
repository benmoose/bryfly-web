.PHONY:fmt
fmt: eslint prettier tsc-check

.PHONY:eslint
eslint: ## Lint matching files with eslint
	@echo "Linting... "
	@npx next lint --fix --quiet

.PHONY:prettier
prettier: ## Format matching files with prettier
	@echo "Formating... "
	@npx prettier . --write --cache --ignore-unknown --log-level warn

.PHONY:tsc-check
tsc-check: ## Check Typescript compiles successfully
	@echo "Compiling Typescript... "
	@npx tsc --noEmit

.PHONY:dev
dev: ## Start development server
	npm run dev
