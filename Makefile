.PHONY: test test-bash test-ts install lint help

help:
	@echo "Bufo Makefile"
	@echo ""
	@echo "Commands:"
	@echo "  make test        Run all tests (bash + TypeScript)"
	@echo "  make test-bash   Run bash unit tests only"
	@echo "  make test-ts     Run TypeScript unit tests only"
	@echo "  make install     Install bufo to /usr/local/bin"
	@echo "  make lint        Run shellcheck"
	@echo ""
	@echo "Releasing:"
	@echo "  gh workflow run release.yml -f version=x.y.z"
	@echo ""

test: test-bash test-ts

test-bash:
	@chmod +x tests/run.sh
	@./tests/run.sh

test-ts:
	@npm test --workspace=packages/core --workspace=packages/cli

install:
	@chmod +x src/bufo
	@mkdir -p /usr/local/bin/lib
	@cp src/bufo /usr/local/bin/bufo
	@cp -r src/lib/* /usr/local/bin/lib/
	@echo "Installed bufo to /usr/local/bin/"

lint:
	@command -v shellcheck &>/dev/null || { echo "Error: shellcheck not installed. Run: brew install shellcheck"; exit 1; }
	@shellcheck src/bufo src/lib/*.sh
	@echo "Lint passed"
