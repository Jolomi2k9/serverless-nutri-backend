// use jenkins environmental variables to dynamically change version number
def version = "0.1.${env.BUILD_NUMBER}"
pipeline {
    agent {
        node {
            label 'deployment-server'
        }
    }
    stages {
        // stage('Setup Node.js') {
        //     steps {
        //         // Source NVM and install Node.js
        //         sh '''
        //         export NVM_DIR="$HOME/.nvm"
        //         [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
        //         nvm install 16
        //         nvm use 16
        //         node --version
        //         npm --version
        //         '''
        //     }
        // }
        // stage('Install Serverless CLI') {
        //     steps {
        //         // Source NVM and install Serverless Framework CLI
        //         sh '''
        //         export NVM_DIR="$HOME/.nvm"
        //         [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
        //         npm install -g serverless
        //         serverless --version
        //         '''
        //     }
        // }
        stage('Install Serverless CLI') { 
            steps { 
                sh ''' 
                    export NVM_DIR="$HOME/.nvm" 
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    nvm install 16
                    nvm use 16
                    npm install -g serverless 
                ''' 
            } 
        } 

        stage('Deploy Serverless Application') { 
            steps {
                // Option 1: Using the full path
                // sh '/your/path/to/npm/global/bin/serverless deploy --debug'  
            
                // Option 2: Debugging the PATH 
                sh ''' 
                    export NVM_DIR="$HOME/.nvm" 
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    nvm use 16
                    echo $PATH 
                    serverless deploy --debug 
                ''' 
            } 
        }

        // stage('Deploy Serverless Application') {
        //     steps {
        //         // Source NVM and deploy using serverless command
        //         sh '''
        //         export NVM_DIR="$HOME/.nvm"
        //         [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
        //         nvm use 16
        //         serverless deploy --debug
        //     '''
        //     }
        // }
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
