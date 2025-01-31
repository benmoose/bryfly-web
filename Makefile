.PHONY: format-code
format-code: format lint

.PHONY: build
build: check-node-version
	@pnpm run build

.PHONY: clean
clean: check-node-version
	@pnpm prune

.PHONY: dev
dev: check-node-version
	@pnpm run dev

.PHONY: format
format: check-node-version
	@pnpm run --silent format --cache --log-level warn --write

.PHONY: lint
lint: check-node-version
	@pnpm run --silent lint --fix

.PHONY: check-node-version
check-node-version: enable-corepack
	@pnpx check-node-version --package

.PHONY: enable-corepack
enable-corepack:
	@corepack enable
