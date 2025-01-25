.PHONY: format-code
format-code: format lint

.PHONY: dev
dev: check-node-version
	@pnpm run dev

.PHONY: clean
clean: check-node-version
	pnpm prune

.PHONY: check-node-version
check-node-version:
	@if [[ $$(cat .nvmrc) != $$(node -v) ]]; then \
		echo "Using wrong version of Node ($$(node --version)), project expects $$(cat .nvmrc)."; \
  		false; \
	fi

.PHONY: format
format: check-node-version
	@pnpm run --silent format --cache --log-level warn --write

.PHONY: lint
lint: check-node-version
	@pnpm run --silent lint --fix
