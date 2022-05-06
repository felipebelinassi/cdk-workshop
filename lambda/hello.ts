interface LambdaEvent {
  path: string;
}

export const handler = async function(event: LambdaEvent) {
  console.log("Request:", JSON.stringify(event, undefined, 2));

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Hello, CDK! You've hit ${event.path}\n`
  }
}