import { DynamoDB, Lambda } from 'aws-sdk';

interface LambdaEvent {
  path: string;
}

export const handler = async (event: LambdaEvent) => {
  console.log('Request:', JSON.stringify(event, undefined, 2));

  const dynamo = new DynamoDB();
  const lambda = new Lambda();

  await dynamo.updateItem({
    TableName: process.env.HITS_TABLE_NAME as string,
    Key: { path: { S: event.path } },
    UpdateExpression: 'ADD hits :incr',
    ExpressionAttributeValues: { ':incr': { N: '1' } }
  }).promise();

  const response = await lambda.invoke({
    FunctionName: process.env.DOWNSTREAM_FUNCTION_NAME as string,
    Payload: JSON.stringify(event)
  }).promise();

  console.log('Downstream response:', JSON.stringify(response, undefined, 2));

  return JSON.parse(response.Payload as string);
}