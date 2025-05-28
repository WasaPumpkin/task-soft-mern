
# ec2_instance.tf
# Configure AWS provider
provider "aws" {
  region = "us-east-1"
}

# Define the Key Pair resource (Terraform will now create this)
resource "aws_key_pair" "deployer" {
  key_name   = "key-pair" # The name for the key pair in AWS
  # Path to your local public key file (~/.ssh/id_rsa.pub or ~/.ssh/key-pair.pem.pub)
  # Ensure this file exists and contains your public key.
  public_key = file("~/.ssh/key-pair.pem.pub") 
}

# Define the Security Group
resource "aws_security_group" "instance_sg" {
  name        = "wasai-mern-sg" # Meaningful, static name for your Security Group
  description = "Security Group for Wasai MERN EC2 instance with SSH and HTTP access"

  # Ingress rule for SSH (from your current public IP)
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["191.111.242.104/32"] # Make sure this is your current public IP
  }

  # Ingress rule for HTTP (open to the world for web access)
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Egress rule (allow all outbound traffic)
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Define the EC2 Instance
resource "aws_instance" "web" {
  # AMI ID for Ubuntu Server 24.04 LTS (x86) in us-east-1
  ami                   = "ami-0a7620d611d3ceae4" # This is the valid AMI ID you found
  instance_type         = "t3.micro" # Free tier eligible instance type

  # Attach the newly created key pair resource
  key_name = aws_key_pair.deployer.key_name

  # Attach the security group by its ID
  vpc_security_group_ids = [aws_security_group.instance_sg.id]

  # Instance tags, including its Name
  tags = {
    Name = "Wasai-MERN" # Your desired instance name
  }
}

# Output the public IP address of the instance
output "instance_ip" {
  value = aws_instance.web.public_ip
}