.PHONY: format-code
format-code: lint format build-typescript

.PHONY: dev
dev: check-node-version
	@npm run dev

.PHONY: clean
clean: check-node-version
	npm dedupe
	npm prune

.PHONY: lint
lint: check-node-version
	@npm run lint -- --fix

.PHONY: format
format: check-node-version
	@npm run format -- --cache --write --log-level warn

.PHONY: build-typescript
build-typescript: check-node-version
	@npx tsc --noEmit

.PHONY: check-node-version
check-node-version:
	@if [[ $$(cat .nvmrc) != $$(node -v) ]]; then \
		echo "Using wrong version of Node ($$(node --version)), project expects $$(cat .nvmrc)."; \
  		false; \
	fi
