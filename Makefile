default: dev

-include tasks/Makefile.*

.PHONY: all
all: node/update fmt build

.PHONY: dev
dev: node/check  ## Start local development server
	@pnpm dev

.PHONY: deps
deps: node_modules  ## Update project dependencies
	@pnpm update

.PHONY: start
start: docker/start  ## Start project in production mode

.PHONY: build
build: docker/build  ## Build project Docker image
	@pnpm build .

.PHONY: fmt
fmt: node/fmt node/lint  ## Format and lint application code

.PHONY: help
help:  ## Print this help message
	@printf "Available targets:\n" && \
		egrep -h '\s##\s' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m\t%-20s\033[0m %s\n", $$1, $$2}'
