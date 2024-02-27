/**
 * Route: POST /food
 */

import moment from "moment";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import * as util from "./util.mjs";

//
const ddbClient = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

const tableName = process.env.PRODUCE_TABLE;

//lambda handler
export const handler = async (event) => {
  try {
    const item = JSON.parse(event.body);
    item.id = uuidv4();
    item.foodName = util.getFoodName(event.headers);
    item.category = util.getCategory(event.headers);
    item.expires = moment().add(60, "days").unix();

    const putCmd = new PutCommand({
      TableName: tableName,
      Item: item,
    });

    const data = await ddbDocClient.send(putCmd);
    console.log(`PutCommand response: ${JSON.stringify(data, null, 2)}`);

    return {
      statusCode: 200,
      headers: util.getResponseHeaders(),
      body: JSON.stringify(item),
    };
  } catch (err) {
    console.log(`Error : ${err}`);

    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      headers: util.getResponseHeaders(),
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
};