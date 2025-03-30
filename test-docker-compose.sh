#!/bin/bash

# Colors for better output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Testing Docker Compose Setup${NC}"
echo "=================================="

# Step 1: Check if Docker and Docker Compose are installed
echo -e "\n${YELLOW}Step 1: Checking Docker installation${NC}"
if command -v docker &> /dev/null; then
    echo -e "${GREEN}✓ Docker is installed${NC}"
    docker --version
else
    echo -e "${RED}✗ Docker is not installed${NC}"
    echo "Please install Docker first: https://docs.docker.com/get-docker/"
    exit 1
fi

if docker compose version &> /dev/null; then
    echo -e "${GREEN}✓ Docker Compose is installed${NC}"
    docker compose version
else
    echo -e "${RED}✗ Docker Compose is not installed or not in PATH${NC}"
    echo "Please install Docker Compose: https://docs.docker.com/compose/install/"
    exit 1
fi

# Step 2: Clean up existing containers (optional)
echo -e "\n${YELLOW}Step 2: Cleaning up existing containers${NC}"
echo "Do you want to remove existing containers, networks, and volumes? (y/n)"
read -r cleanup
if [[ "$cleanup" == "y" || "$cleanup" == "Y" ]]; then
    echo "Stopping and removing containers..."
    docker compose down -v
    echo -e "${GREEN}✓ Cleanup completed${NC}"
else
    echo "Skipping cleanup"
fi

# Step 3: Build and start the containers
echo -e "\n${YELLOW}Step 3: Building and starting containers${NC}"
docker compose up --build -d

# Check if containers are running
echo -e "\n${YELLOW}Step 4: Checking container status${NC}"
sleep 5 # Give containers time to start

# Check MongoDB
if docker ps | grep -q "jobapp-mongodb"; then
    echo -e "${GREEN}✓ MongoDB container is running${NC}"
else
    echo -e "${RED}✗ MongoDB container is not running${NC}"
    docker compose logs mongodb
fi

# Check Backend
if docker ps | grep -q "jobapp-backend"; then
    echo -e "${GREEN}✓ Backend container is running${NC}"
else
    echo -e "${RED}✗ Backend container is not running${NC}"
    docker compose logs backend
fi

# Check Frontend
if docker ps | grep -q "jobapp-frontend"; then
    echo -e "${GREEN}✓ Frontend container is running${NC}"
else
    echo -e "${RED}✗ Frontend container is not running${NC}"
    docker compose logs frontend
fi

# Step 5: Test connectivity
echo -e "\n${YELLOW}Step 5: Testing connectivity${NC}"

# Wait a bit for services to be fully up
echo "Waiting for services to start completely (20 seconds)..."
sleep 20

# Test MongoDB connection from Backend
echo "Testing Backend to MongoDB connection..."
docker exec jobapp-backend wget -q --spider http://mongodb:27017 || echo "MongoDB is not responding to HTTP but might still be working"

# Test Backend API
echo "Testing Backend API..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/v1 | grep -q "200\|404"; then
    echo -e "${GREEN}✓ Backend API is responding${NC}"
else
    echo -e "${RED}✗ Backend API is not responding${NC}"
    docker compose logs backend
fi

# Test Frontend
echo "Testing Frontend..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:5173 | grep -q "200"; then
    echo -e "${GREEN}✓ Frontend is responding${NC}"
else
    echo -e "${RED}✗ Frontend is not responding${NC}"
    docker compose logs frontend
fi

echo -e "\n${YELLOW}Container logs summary:${NC}"
echo "=================================="
echo -e "\n${YELLOW}MongoDB logs:${NC}"
docker compose logs --tail=20 mongodb

echo -e "\n${YELLOW}Backend logs:${NC}"
docker compose logs --tail=20 backend

echo -e "\n${YELLOW}Frontend logs:${NC}"
docker compose logs --tail=20 frontend

echo -e "\n${GREEN}Test completed!${NC}"
echo "You can access your application at:"
echo -e "${GREEN}Frontend:${NC} http://localhost:5173"
echo -e "${GREEN}Backend API:${NC} http://localhost:3000/api/v1"
echo -e "${GREEN}MongoDB:${NC} mongodb://localhost:27017"

echo -e "\n${YELLOW}Troubleshooting tips:${NC}"
echo "1. To see logs: docker compose logs -f"
echo "2. To restart containers: docker compose restart"
echo "3. To rebuild and restart: docker compose up -d --build"
echo "4. To stop all containers: docker compose down"
echo "5. If MongoDB connection fails, check the MONGODB_URI in backend service"
echo "6. If Frontend can't connect to Backend, make sure you're using the correct API URL"