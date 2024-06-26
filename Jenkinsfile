// use jenkins environmental variables to dynamically change version number
def version = "0.1.${env.BUILD_NUMBER}"

pipeline {
    agent {
        node {
            label 'deployment-server'
        }
    }
    stages {
        stage('Install Serverless CLI') { 
            steps { 
                script {
                    // Setting up Node.js and installing Serverless Framework CLI
                    sh ''' 
                        export NVM_DIR="$HOME/.nvm" 
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm install 16
                        nvm use 16
                        npm install -g serverless 
                    ''' 
                }
            } 
        }
        stage('Install Dependencies') {
            steps {
                script {
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use 16
                        npm install
                    '''
                }
            }
        }
        // stage('Remove Serverless Application') { 
        //     steps {               
        //         // Inject AWS credentials securely
        //         withCredentials([
        //             [$class: 'StringBinding', credentialsId: 'aws-access-key-id', variable: 'AWS_ACCESS_KEY_ID'],
        //             [$class: 'StringBinding', credentialsId: 'aws-secret-access-key', variable: 'AWS_SECRET_ACCESS_KEY'],
        //             [$class: 'StringBinding', credentialsId: 'aws-session-token-id', variable: 'AWS_SESSION_TOKEN']
        //         ]) {
        //             // Eexecute deployment with Serverless Framework and pass in aws login credentials 
        //             sh ''' 
        //                 export NVM_DIR="$HOME/.nvm" 
        //                 [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
        //                 nvm use 16
                        
        //                 export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
        //                 export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
        //                 export AWS_SESSION_TOKEN=${AWS_SESSION_TOKEN}
        //                 serverless remove  
        //             ''' 
        //         }
        //     } 
        // }
        stage('Deploy Serverless Application') { 
            steps {               
                // Inject AWS credentials securely
                withCredentials([
                    [$class: 'StringBinding', credentialsId: 'aws-access-key-id', variable: 'AWS_ACCESS_KEY_ID'],
                    [$class: 'StringBinding', credentialsId: 'aws-secret-access-key', variable: 'AWS_SECRET_ACCESS_KEY'],
                    [$class: 'StringBinding', credentialsId: 'aws-session-token-id', variable: 'AWS_SESSION_TOKEN']
                ]) {
                    // Eexecute deployment with Serverless Framework and pass in aws login credentials 
                    sh ''' 
                        export NVM_DIR="$HOME/.nvm" 
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use 16
                        
                        export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
                        export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
                        export AWS_SESSION_TOKEN=${AWS_SESSION_TOKEN}
                        serverless deploy  
                    ''' 
                }
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

