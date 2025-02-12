PROJ_NODE := $(shell cat .nvmrc)

.PHONY: format-all
format-all: install prettier lint

.PHONY: dev
dev: install
	@pnpm run dev

.PHONY: start
start: build
	@pnpm start

.PHONY: build
build: install check-dependencies
	@pnpm build

.PHONY: clean
clean: check-node-version
	-rm -rf node_modules .next

.PHONY: install
install: check-node-version
	@pnpm install --fix-lockfile --silent

.PHONY: prettier
prettier: check-node-version
	@pnpm --stream exec prettier . \
		--cache --ignore-unknown --log-level warn --no-editorconfig --write

.PHONY: lint
lint: check-node-version
	@pnpm --stream run lint . \
 		--error-on-unmatched-pattern --fix --quiet

.PHONY: check-dependencies
check-dependencies: check-node-version
	@pnpm --stream dedupe
	@pnpm --stream audit --fix

.PHONY: check-node-version
check-node-version: corepack
	@pnpx check-node-version --node $(PROJ_NODE)

.PHONY: update-node
update-node: corepack
	@./scripts/update-node.sh --write

.PHONY: corepack
corepack:
	@corepack enable pnpm
