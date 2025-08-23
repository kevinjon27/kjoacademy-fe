.PHONY: dev analyze

dev:
	@if [ -f .env.local ]; then \
		export $$(grep -E "^(APP_HOST|APP_PORT)=" .env.local | xargs) && \
		pnpm run dev --hostname $${APP_HOST:-localhost} --port $${APP_PORT:-3000}; \
	else \
		echo "Warning: .env.local file not found, using default host (localhost) and port (3000)"; \
		pnpm run dev --hostname localhost --port 3000; \
	fi

analyze:
	@pnpm run build:analyze
