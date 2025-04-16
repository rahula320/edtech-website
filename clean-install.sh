#!/bin/bash

# Exit on error
set -e

echo "Starting cleanup and fresh installation..."

# Remove all node_modules directories
echo "Removing node_modules directories..."
rm -rf node_modules
rm -rf client/node_modules
rm -rf server/node_modules

# Remove all package-lock.json files
echo "Removing package-lock.json files..."
rm -f package-lock.json
rm -f client/package-lock.json
rm -f server/package-lock.json

# Install root dependencies
echo "Installing root dependencies..."
npm install

# Install client and server dependencies
echo "Installing client and server dependencies..."
npm run client:install
npm run server:install

echo "Installation completed successfully!"
echo "You can now run 'npm run dev' to start both client and server in development mode." 