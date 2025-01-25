.PHONY: format-app-code
format-code: format lint

.PHONY: format
format: check-node-version
	@pnpm run --silent format --cache --log-level warn --write

.PHONY: lint
lint: check-node-version
	@pnpm run --silent lint --fix

.PHONY: dev
dev: check-node-version
	@pnpm run dev

.PHONY: clean
clean: check-node-version
	@pnpm prune

.PHONY: check-node-version
check-node-version: enable-corepack
	@pnpx check-node-version --package

.PHONY: enable-corepack
enable-corepack:
	@corepack enable
