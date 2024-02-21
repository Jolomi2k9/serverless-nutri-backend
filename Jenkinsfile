// use jenkins environmental variables to dynamically change version number
def version = "0.1.${env.BUILD_NUMBER}"
pipeline {
    agent {
        node {
            label 'deployment-server'
        }
    }

    stages {
        stage('Setup Node.js') {
            steps {
                // Use Node Version Manager (nvm) to install Node.js if it's not already available
                sh '''
                if [ ! -d "$HOME/.nvm" ]; then
                    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
                fi
                export NVM_DIR="$HOME/.nvm"
                [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                nvm install 16
                nvm use 16
                '''
                // Check node version
                sh 'node --version'
                // Check npm version
                sh 'npm --version'
            }
        }
        stage('Install Serverless CLI') {
            steps {
                // Install Serverless Framework CLI
                sh 'npm install -g serverless'
            }
        }
        stage('Deploy Serverless Application') {
            steps {
                // Deploy using serverless command
                sh 'serverless deploy -v'
            }
        }
    }
    post {
        success {
            echo 'Deployment complete!'
        }
        failure {
            echo 'Deployment failed. Check the logs for errors.'
        }
    }
}
