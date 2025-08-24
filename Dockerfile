FROM denoland/deno:alpine-1.46.3

# Set working directory
WORKDIR /app

# Copy dependency files first for better caching
COPY deno.json deno.lock ./

# Cache dependencies
RUN deno cache --lock=deno.lock deno.json

# Copy source code
COPY . .

# Cache the main application
RUN deno cache main.ts

# Expose the port
EXPOSE 4040

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD deno eval "fetch('http://localhost:4040').then(r => r.ok ? Deno.exit(0) : Deno.exit(1)).catch(() => Deno.exit(1))"


# Run the application
CMD ["deno", "run","--allow-net","--allow-env", "--allow-read", "main.ts"]
