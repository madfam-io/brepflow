#!/bin/bash
# BrepFlow Docker Development Environment
# Complete local development setup with all services

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔═══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   BrepFlow Docker Development Setup     ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════╝${NC}"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}✗ Error: Docker is not running${NC}"
    echo "  Please start Docker Desktop and try again"
    exit 1
fi

echo -e "${GREEN}✓ Docker is running${NC}"

# Check if docker-compose exists
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}⚠ docker-compose not found, trying 'docker compose'${NC}"
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

# Parse command line arguments
COMMAND="${1:-up}"
SERVICES="${2:-}"

case "$COMMAND" in
    up)
        echo -e "${BLUE}🚀 Starting all services...${NC}"
        $DOCKER_COMPOSE up -d $SERVICES
        echo ""
        echo -e "${GREEN}✓ Services started successfully!${NC}"
        echo ""
        echo -e "${BLUE}📱 Access points:${NC}"
        echo "   Studio:         http://localhost:5173"
        echo "   Marketing:      http://localhost:3000"
        echo "   Collaboration:  ws://localhost:8080"
        echo "   PostgreSQL:     localhost:5432"
        echo "   Redis:          localhost:6379"
        echo ""
        echo -e "${YELLOW}💡 Tip: Run './scripts/docker-dev.sh logs' to view logs${NC}"
        ;;

    down)
        echo -e "${BLUE}🛑 Stopping all services...${NC}"
        $DOCKER_COMPOSE down
        echo -e "${GREEN}✓ All services stopped${NC}"
        ;;

    restart)
        echo -e "${BLUE}🔄 Restarting services...${NC}"
        $DOCKER_COMPOSE restart $SERVICES
        echo -e "${GREEN}✓ Services restarted${NC}"
        ;;

    logs)
        echo -e "${BLUE}📋 Showing logs...${NC}"
        $DOCKER_COMPOSE logs -f $SERVICES
        ;;

    ps)
        echo -e "${BLUE}📊 Service status:${NC}"
        $DOCKER_COMPOSE ps
        ;;

    build)
        echo -e "${BLUE}🔨 Building services...${NC}"
        $DOCKER_COMPOSE build $SERVICES
        echo -e "${GREEN}✓ Build complete${NC}"
        ;;

    clean)
        echo -e "${YELLOW}⚠️  This will remove all containers, volumes, and cached data${NC}"
        read -p "Are you sure? (y/N) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo -e "${BLUE}🧹 Cleaning up...${NC}"
            $DOCKER_COMPOSE down -v --remove-orphans
            docker system prune -f
            echo -e "${GREEN}✓ Cleanup complete${NC}"
        else
            echo "Cancelled"
        fi
        ;;

    test)
        echo -e "${BLUE}🧪 Running tests in Docker...${NC}"
        $DOCKER_COMPOSE run --rm studio pnpm run test
        ;;

    shell)
        SERVICE="${2:-studio}"
        echo -e "${BLUE}🐚 Opening shell in $SERVICE...${NC}"
        $DOCKER_COMPOSE exec $SERVICE /bin/bash
        ;;

    *)
        echo -e "${RED}Unknown command: $COMMAND${NC}"
        echo ""
        echo "Usage: $0 [command] [services]"
        echo ""
        echo "Commands:"
        echo "  up      - Start all services (default)"
        echo "  down    - Stop all services"
        echo "  restart - Restart services"
        echo "  logs    - Show service logs"
        echo "  ps      - Show service status"
        echo "  build   - Build Docker images"
        echo "  clean   - Remove all containers and volumes"
        echo "  test    - Run tests in Docker"
        echo "  shell   - Open shell in container"
        echo ""
        echo "Examples:"
        echo "  $0 up                    # Start all services"
        echo "  $0 up studio             # Start only studio"
        echo "  $0 logs studio           # Show studio logs"
        echo "  $0 restart collaboration # Restart collaboration server"
        exit 1
        ;;
esac
