
pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    environment {
        COMPOSE_FILE = 'docker-compose.yml:docker-compose.ci.yml'
        COMPOSE_PROJECT_NAME = "ecommerce-ci-${BUILD_NUMBER}"
        AWS_REGION = 'ap-south-1'
        ECR_REGISTRY = '950177940911.dkr.ecr.ap-south-1.amazonaws.com'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out application source code'
                checkout scm

                sh '''
                    set -eu
                    echo "Branch: $(git branch --show-current)"
                    echo "Commit: $(git rev-parse --short HEAD)"
                    test -f docker-compose.yml
                    test -f docker-compose.ci.yml
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    set -eu

                    cleanup() {
                        docker compose down \
                            --volumes \
                            --remove-orphans
                    }

                    trap cleanup EXIT

                    docker compose up -d db

                    echo "Waiting for PostgreSQL to become healthy..."
                    for i in $(seq 1 60); do
                        if docker compose exec -T db \
                            pg_isready -U ecommerce_user -d ecommerce_db
                        then
                            break
                        fi

                        if [ "$i" -eq 60 ]; then
                            echo "PostgreSQL did not become ready"
                            docker compose logs db
                            exit 1
                        fi

                        sleep 2
                    done

                    docker compose run --rm --no-deps backend \
                        python -m pytest -v
                '''
            }
        }

        stage('Build Images') {
            steps {
                sh '''
                    set -eu
                    docker compose build backend client admin
                '''
            }
        }

        stage('Push to ECR') {
            steps {
                sh '''
                    set -eu

                    GIT_SHA="$(git rev-parse HEAD)"
                    REGISTRY="$ECR_REGISTRY"
                    TEMP_DOCKER_CONFIG="$(mktemp -d)"

                    export DOCKER_CONFIG="$TEMP_DOCKER_CONFIG"
                    trap 'rm -rf "$TEMP_DOCKER_CONFIG"' EXIT

                    echo "Authenticating with Amazon ECR..."
                    /usr/local/bin/aws ecr get-login-password \
                        --region "$AWS_REGION" |
                        docker login \
                            --username AWS \
                            --password-stdin "$REGISTRY"

                    echo "Tagging images with commit: $GIT_SHA"

                    docker tag \
                        "${COMPOSE_PROJECT_NAME}-backend:latest" \
                        "$REGISTRY/ecommerce-neww-backend:$GIT_SHA"

                    docker tag \
                        "${COMPOSE_PROJECT_NAME}-client:latest" \
                        "$REGISTRY/ecommerce-neww-client:$GIT_SHA"

                    docker tag \
                        "${COMPOSE_PROJECT_NAME}-admin:latest" \
                        "$REGISTRY/ecommerce-neww-admin:$GIT_SHA"

                    echo "Pushing backend image..."
                    docker push \
                        "$REGISTRY/ecommerce-neww-backend:$GIT_SHA"

                    echo "Pushing client image..."
                    docker push \
                        "$REGISTRY/ecommerce-neww-client:$GIT_SHA"

                    echo "Pushing admin image..."
                    docker push \
                        "$REGISTRY/ecommerce-neww-admin:$GIT_SHA"

                    echo "All three images pushed successfully."
                    echo "Image tag: $GIT_SHA"
                '''
            }
        }
    }

    post {
        always {
            sh '''
                docker compose down \
                    --volumes \
                    --remove-orphans || true
            '''
            echo 'Pipeline cleanup finished'
        }

        success {
            echo 'CI/CD BUILD PASSED: tests, builds, and ECR publishing completed.'
        }

        failure {
            echo 'PIPELINE FAILED: inspect Console Output for the failing stage.'
        }
    }
}
