#!/bin/bash

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}ACMYX Website Deployment Script${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo -e "${RED}Vercel CLI is not installed. Please install it with: npm install -g vercel${NC}"
    exit 1
fi

# Verify that we're in the project root
if [ ! -f "vercel.json" ]; then
    echo -e "${RED}Error: vercel.json not found. Make sure you're running this script from the project root.${NC}"
    exit 1
fi

echo -e "${YELLOW}Your Neon PostgreSQL credentials will be set as environment variables in Vercel${NC}"
echo -e "${YELLOW}Make sure you have created a project in Neon PostgreSQL first.${NC}"
echo ""

# Check if .env file exists
if [ -f ".env" ]; then
    echo -e "${GREEN}Found .env file. Using environment variables from this file.${NC}"
    # Load environment variables from .env
    export $(grep -v '^#' .env | xargs)
else
    echo -e "${YELLOW}No .env file found. You'll need to provide environment variables during deployment.${NC}"
fi

# Build the client app
echo -e "${BLUE}Building client application...${NC}"
cd client && npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}Client build failed. Aborting deployment.${NC}"
    exit 1
fi
cd ..

echo -e "${GREEN}Client build successful!${NC}"
echo ""

# Execute vercel deployment
echo -e "${BLUE}Starting Vercel deployment...${NC}"
vercel --prod

# Check if deployment was successful
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}======================================${NC}"
    echo -e "${GREEN}Deployment completed successfully!${NC}"
    echo -e "${GREEN}======================================${NC}"
    echo ""
    echo -e "Your site should now be live on Vercel!"
    echo ""
    echo -e "${YELLOW}Post-Deployment Checklist:${NC}"
    echo -e "1. ${YELLOW}Ensure your Neon PostgreSQL database is properly configured${NC}"
    echo -e "2. ${YELLOW}Check that your environment variables are set correctly in Vercel${NC}"
    echo -e "3. ${YELLOW}Test the application to ensure everything works as expected${NC}"
    echo ""
    echo -e "For more information, refer to the DEPLOYMENT.md document."
else
    echo ""
    echo -e "${RED}======================================${NC}"
    echo -e "${RED}Deployment encountered issues.${NC}"
    echo -e "${RED}======================================${NC}"
    echo ""
    echo -e "Please check the error messages above and refer to DEPLOYMENT.md for troubleshooting."
fi 