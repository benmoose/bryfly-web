.PHONY: format-all
format-all: install prettier lint

.PHONY: dev
dev: install
	@pnpm run dev

.PHONY: start
start: build
	@pnpm start

.PHONY: build
build: install
	@pnpm run build

.PHONY: clean
clean: check-node-version
	-rm -r node_modules/ .next

.PHONY: install
install: check-node-version
	@pnpm install --fix-lockfile --silent

.PHONY: prettier
prettier: check-node-version
	@pnpm --stream exec \
		prettier . --cache --ignore-unknown --log-level warn --write

.PHONY: lint
lint: check-node-version
	@pnpm run lint --error-on-unmatched-pattern --fix --quiet

.PHONY: check-node-version
check-node-version: corepack
	@pnpx check-node-version --package

.PHONY: corepack
corepack:
	@corepack enable pnpm
