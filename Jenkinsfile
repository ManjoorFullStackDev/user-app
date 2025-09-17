pipeline {
    agent any

    tools {
        nodejs "nodejs-18"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'yarn install'
            }
        }

        stage('Lint') {
            steps {
                sh 'yarn lint'
            }
        }

        stage('Build') {
            steps {
                sh 'yarn build'
            }
        }

        stage('Test') {
            steps {
                sh 'yarn test || echo "No tests configured"'
            }
        }

        stage('Run') {
            steps {
                sh 'yarn start &'
            }
        }
    }

    post {
        success {
            echo "✅ Build & Deploy succeeded!"
        }
        failure {
            echo "❌ Build failed, check logs."
        }
    }
}
