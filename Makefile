include tasks/Makefile.*

help:  ## Print this help message
	@printf "\e[1mAvailable targets\e[0m\n\n"
	@egrep -h '\s##\s' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m  %-30s\033[0m %s\n", $$1, $$2}'

.PHONY: dev
dev: install  ## Start local development server
	@pnpm run dev

.PHONY: start
start: build  ## Serve build output
	@pnpm start

.PHONY: build
build: install  ## Build project
	@pnpm build

.PHONY: install
install: node/install  ## Install project dependencies

.PHONY: fmt
fmt: node/fmt node/lint  ## Format application code
