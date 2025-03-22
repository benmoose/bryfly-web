default: dev

-include tasks/Makefile.*

.PHONY: dev
dev: node/check  ## Start local development server
	@pnpm run dev

.PHONY: fmt
fmt: node/fmt node/lint  ## Format application code

.PHONY: build
build: fmt docker/build ## Build project Docker image
	@pnpm build .

.PHONY: start
start: docker/start  ## Start project container and server traffic

help:  ## Print this help message
	@printf "\e[1mAvailable targets\e[0m\n" && \
		egrep -h '\s##\s' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m  %-20s\033[0m %s\n", $$1, $$2}'
