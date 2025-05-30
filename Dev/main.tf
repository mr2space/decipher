locals {
  repository_url = "463470946589.dkr.ecr.us-east-1.amazonaws.com/sanjeevani/backend:latest"
  env_vars = { for line in split("\n", file("./../backend/.env")) : split("=", line)[0] => split("=", line)[1] if length(trimspace(line)) > 0 && !startswith(trimspace(line), "#") }
}

provider "aws" {
  region = "us-east-1" # Replace with your desired region
}

resource "aws_ecs_cluster" "sanjeevani_cluster" {
  name = "sanjeevani_cluster"
}

resource "aws_ecs_task_definition" "app_task" {
  family                   = "app-first-task" # Name your task

  container_definitions = jsonencode([{
    name        = "app-first-task"
    image       = local.repository_url
    essential   = true
    portMappings = [
      {
        containerPort = 80
        hostPort      = 80
      },
      {
        containerPort = 5173
        hostPort      = 5173
      }
    ]
    memory      = 512
    cpu         = 256
    environment = [
      for key, value in local.env_vars : {
        name  = key
        value = value
      }
    ]
  }])

  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  memory                   = 512
  cpu                      = 256
  execution_role_arn       = aws_iam_role.ecsTaskExecutionRole.arn
}

resource "aws_iam_role" "ecsTaskExecutionRole" {
  name               = "ecsTaskExecutionRole"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
}

data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
  role       = aws_iam_role.ecsTaskExecutionRole.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_default_vpc" "default_vpc" {
}

resource "aws_default_subnet" "default_subnet" {
  availability_zone = "us-east-1a"
}

resource "aws_security_group" "ecs_task_security_group" {
  name_prefix = "ecs-task-sg"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5173
    to_port     = 5173
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_ecs_service" "sanjeevani_service" {
  name            = "sanjeevani-service"
  cluster         = aws_ecs_cluster.sanjeevani_cluster.id
  task_definition = aws_ecs_task_definition.app_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = [aws_default_subnet.default_subnet.id]
    security_groups = [aws_security_group.ecs_task_security_group.id]
    assign_public_ip = true
  }
}

