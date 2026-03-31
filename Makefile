.PHONY: test install lint help

help:
	@echo "Bufo Makefile"
	@echo ""
	@echo "Commands:"
	@echo "  make test        Run unit tests"
	@echo "  make install     Install bufo to /usr/local/bin"
	@echo "  make lint        Run shellcheck"
	@echo ""
	@echo "Releasing:"
	@echo "  gh workflow run release.yml -f version=x.y.z"
	@echo ""

test:
	@chmod +x tests/run.sh
	@./tests/run.sh

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
