#!/bin/bash

# Colors for better output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== ACMYX Website Vercel Deployment Script ===${NC}\n"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Vercel CLI is not installed. Installing globally...${NC}"
    npm install -g vercel
fi

# Verify login status
echo -e "${YELLOW}Please login to Vercel if prompted...${NC}"
vercel whoami &> /dev/null || (echo -e "${YELLOW}You need to login to Vercel:${NC}" && vercel login)

echo -e "\n${GREEN}=== Setting up environment variables ===${NC}"
echo -e "${YELLOW}Your Appwrite credentials will be set as environment variables in Vercel${NC}"

# Deploy with environment variables
echo -e "\n${GREEN}=== Deploying to Vercel ===${NC}"
echo -e "${YELLOW}Starting deployment process. Follow the prompts from Vercel CLI.${NC}"
echo -e "${YELLOW}Make sure to select the following options when prompted:${NC}"
echo -e "  - Set up and deploy? ${GREEN}Yes${NC}"
echo -e "  - Which scope (if asked)? ${GREEN}Select your personal or team account${NC}"
echo -e "  - Link to existing project? ${GREEN}No${NC} (unless you've deployed this before)"
echo -e "  - What's your project name? ${GREEN}acmyx${NC} (or whatever you prefer)"
echo -e "  - In which directory is your code located? ${GREEN}./${NC} (root directory)"
echo -e "  - Want to override settings? ${GREEN}Yes${NC}"
echo -e "  - Build command: ${GREEN}npm run build${NC}"
echo -e "  - Output directory: ${GREEN}client/build${NC}"
echo -e "  - Development command: ${GREEN}npm run dev${NC}"
echo -e "  - Want to modify these settings? ${GREEN}No${NC}"

# Run deployment command
vercel deploy --prod

# Check if deployment was successful
if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}=== Deployment completed! ===${NC}"
    echo -e "${YELLOW}Your application is now live.${NC}"
    echo -e "${YELLOW}You can access your admin dashboard at: https://[your-vercel-domain]/admin${NC}"
    echo -e "${YELLOW}Login with: admin@acmyx.com / admin123${NC}"
else
    echo -e "\n${RED}=== Deployment failed! ===${NC}"
    echo -e "${YELLOW}Please check the error messages above and try again.${NC}"
fi

echo -e "\n${GREEN}=== Additional steps ===${NC}"
echo -e "1. ${YELLOW}Ensure your Appwrite collections are set up properly${NC}"
echo -e "2. ${YELLOW}Update DNS settings if you're using a custom domain${NC}"
echo -e "3. ${YELLOW}Test your application thoroughly after deployment${NC}" 