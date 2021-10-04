import { ComprehendClient, DetectSentimentCommand } from "@aws-sdk/client-comprehend";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const client = new ComprehendClient({ region: "eu-central-1" });

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const parsedBody = event.body ? JSON.parse(event.body) : {};
    if(!parsedBody.text) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'required text param'
        })
      }
    }
    
    const command = new DetectSentimentCommand({
        LanguageCode: 'en',
        Text: parsedBody.text
    });

    try {
        const data = await client.send(command);
         return {
            statusCode: 200,
            body: JSON.stringify(data.SentimentScore)
        }
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({})
      }
}