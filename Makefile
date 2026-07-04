default: help

-include tasks/Makefile.*

.PHONY: all
all: node/update fmt build

.PHONY: dev
dev: node/check  ## Start a local development server
	pnpm dev

.PHONY: deps
deps: node/update node_modules  ## Update project dependencies
	pnpm update

.PHONY: start
start: docker/start  ## Start project in production mode

.PHONY: build
build: docker/build  ## Build project Docker image
	pnpm build .

.PHONY: clean
clean: node/clean docker/clean  ## Remove Docker containers and Node build artifacts

.PHONY: fmt
fmt: node/fmt node/lint  ## Format and lint application code

.PHONY: help
help:  ## Print this help message
	@printf "Available targets:\n" && \
		egrep -h '\s##\s' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[1;34m\t%-20s\033[0m %s\n", $$1, $$2}'
