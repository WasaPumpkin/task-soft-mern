# C:\Users\Andrey Desktop\Task-Soft-Mern\deploy.sh
#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status

echo "--- Starting MERN Stack Deployment on EC2 ---"

# Ensure Docker is running (if not already handled by user data)
sudo systemctl start docker || true # Start docker, ignore error if already running
sudo systemctl enable docker || true # Enable docker at boot

# Navigate to the deployment directory
# CodePipeline's EC2 Deploy Action will put your artifact here
DEPLOY_DIR="/home/ec2-user/task-soft-mern" # This matches the Target Directory in CodePipeline
cd "$DEPLOY_DIR"

echo "Stopping and removing existing Docker containers..."
# Stop and remove any existing containers managed by this docker-compose.yml
# Use --timeout 0 to avoid waiting for graceful shutdown if issues
docker compose down --volumes --timeout 0 || true

echo "Logging in to ECR..."
# You need to ensure your EC2 Instance Role has ECR pull permissions.
# This command is typically handled by `aws ecr get-login-password`
# and pipelining it to `docker login`. We'll rely on the EC2 role's permissions
# and assuming the AWS CLI is available and configured on the instance.
# This needs to be configured in your EC2 User Data or manually if not present.
# For simple cases, `docker compose pull` can often authenticate via the EC2 instance profile directly.

echo "Pulling latest Docker images from ECR..."
# This command will pull the images defined in your docker-compose.yml from ECR.
# Ensure image names in docker-compose.yml match ECR repo URIs (e.g., YOUR_ACCOUNT_ID.dkr.ecr.YOUR_REGION.amazonaws.com/task-soft-mern-backend:latest)
docker compose pull

echo "Starting Docker containers in detached mode..."
# Start the containers. -d runs them in detached mode (background).
docker compose up -d

echo "--- MERN Stack Deployment Complete ---"