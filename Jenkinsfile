// use jenkins environmental variables to dynamically change version number
def version = "0.1.${env.BUILD_NUMBER}"
pipeline {
    agent {
        node {
            label 'deployment-server'
        }
    }

    stages {
        
         

        // stage('SonarQube analysis') {
        //     environment{
        //      scannerHome = tool 'vol-sonar-scanner'             
        //     }
        //     steps{
        //     withSonarQubeEnv('vol-sonarqube-server') {
        //         sh '''#!/bin/bash
        //             source venv/bin/activate
        //             ${scannerHome}/bin/sonar-scanner
        //             '''        
        //     }
        //     }            
        // }  

        // stage("Quality Gate"){
        //     steps{
        //         script{
        //             timeout(time: 1, unit: 'HOURS') { 
        //                 def qg = waitForQualityGate() 
        //                 if (qg.status != 'OK') {
        //                 error "Pipeline aborted due to quality gate failure: ${qg.status}"
        //                 }
        //             }
        //         }   
        //     }
        // }

        // stage('Start Web Application') {
        //     steps {
        //         script {
        //             sh '''#!/bin/bash
        //                 # Start the web application in the background
        //                 source venv/bin/activate
        //                 export FLASK_APP=main.py
        //                 nohup flask run --host=0.0.0.0 &

        //                 # Wait for the web application to start
        //                 COUNTER=0
        //                 while ! nc -z localhost 5000; do   
        //                 sleep 1
        //                 COUNTER=$((COUNTER+1))
        //                 if [ $COUNTER -ge 30 ]; then
        //                     echo "Failed to start web application on port 5000"
        //                     exit 1
        //                 fi
        //                 done
        //                 echo "Web application is running"
        //             '''
        //         }
        //     }
        // }        

        // stage('Selenium Tests') {
        //     steps {
        //         script {
        //             echo '<--------------- Selenium Tests Start --------------->'
        //             sh '''#!/bin/bash
        //             source venv/bin/activate                    
        //             # Run Selenium tests
        //             python -m unittest discover -s tests -p "test_selenium.py"
        //             '''

        //             echo '<--------------- Selenium Tests ends --------------->'
        //         }
        //     }            
        // }

        // stage('Stop Web Application') {
        //     steps {
        //         script {
        //             sh '''#!/bin/bash
        //                 # Find flask run process and kill it
        //                 pkill -f "flask run"
        //             '''
        //             echo '<--------------- Web application killed --------------->'
        //         }
        //     }
        // }       

        // stage("Deploy") {
        //     steps {                
        //         script {
        //             sh """
        //             #!/bin/bash
        //             sed -i 's/VERSION_PLACEHOLDER/${version}/g' deployment.yaml
        //             ./deploy.sh
        //             """                                 
        //         }                                
        //     }
        // } 

         stage("Hello") {
            steps {                
                echo 'Hello World'                               
            }
        }     
    }
}
