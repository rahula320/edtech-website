#!/bin/bash

# Exit on error
set -e

echo "Starting deployment process..."

# Step 1: Update code from repository
echo "Updating code from repository..."
git pull

# Step 2: Install dependencies
echo "Installing dependencies..."
npm run install-all

# Step 3: Build client
echo "Building client..."
npm run client:build

# Step 4: Set environment to production
export NODE_ENV=production

# Step 5: Restart the server (using PM2 if available)
if command -v pm2 &> /dev/null; then
    echo "Restarting server with PM2..."
    pm2 restart server/server.js || pm2 start server/server.js --name="acmyx-website"
else
    echo "PM2 not found. Starting server with Node..."
    echo "Note: For production, consider using PM2 for process management."
    cd server && npm start
fi

echo "Deployment completed successfully!" 