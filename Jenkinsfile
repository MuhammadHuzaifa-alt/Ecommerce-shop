
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
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out application source code'
                checkout scm
                sh '''
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
            echo 'CI PASSED: tests and Docker image builds completed.'
        }

        failure {
            echo 'CI FAILED: inspect Console Output for the failing stage.'
        }
    }
}
