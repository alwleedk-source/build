#!/bin/bash
# Run database setup once inside Railway deployment

echo "🚀 Running database setup..."
pnpm db:setup

echo "✅ Setup complete! Now starting the server..."
pnpm start
