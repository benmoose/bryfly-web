.PHONY: format
format: prettier lint

.PHONY: build
build: install
	@pnpm run build

.PHONY: clean
clean: check-node-version
	@rm -r node_modules/ .next

.PHONY: dev
dev: check-node-version
	@pnpm run dev

.PHONY: install
install: check-node-version
	@pnpm install --fix-lockfile

.PHONY: prettier
prettier: check-node-version
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
