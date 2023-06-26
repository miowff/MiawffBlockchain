import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyEventQueryStringParameters,
  APIGatewayProxyResultV2,
} from "aws-lambda/trigger/api-gateway-proxy";
import { blockchainService } from "src/services/blockchainService";
import { queryStringParameters } from "./types";

const getWalletBalance = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const { walletAddress } =
      event.queryStringParameters as APIGatewayProxyEventQueryStringParameters;
    const balance = await blockchainService.getAddressBalance(
      walletAddress as string
    );
    return {
      body: JSON.stringify(balance),
      statusCode: 200,
    };
  } catch (err) {
    return { body: JSON.stringify(err), statusCode: 400 };
  }
};
export const handler = middy()
  .use(validator({ eventSchema: transpileSchema(queryStringParameters) }))
  .use(httpErrorHandler())
  .handler(getWalletBalance);
