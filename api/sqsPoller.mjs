
const AWS = require('aws-sdk');
const stepfunctions = new AWS.StepFunctions();

exports.handler = async (event) => {
  for (const record of event.Records) {
    const messageBody = JSON.parse(record.body);

    // Extract information needed to trigger the Step Function
    const foodId = messageBody.foodId; 

    try {
      // Start Step Function execution 
      await stepfunctions.startExecution({
        stateMachineArn: process.env.STATE_MACHINE_ARN,
        input: JSON.stringify({ foodId }) 
      }).promise();
      
    } catch (err) {
      console.error("Error Step Function :", err);
    }
  }
};

