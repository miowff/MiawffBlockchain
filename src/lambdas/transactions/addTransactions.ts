import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResultV2,
} from "aws-lambda/trigger/api-gateway-proxy";
import { AddTransactionsRequest } from "src/models/transaction";
import { transactionService } from "src/services/transactionsService";
import { addTransactionsBody } from "./types";

const addTransactions = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const { transactions } = event.body as unknown as AddTransactionsRequest;
    await transactionService.addTransactions(transactions);
    return {
      statusCode: 200,
    };
  } catch (err) {
    return { body: JSON.stringify(err), statusCode: 400 };
  }
};
export const handler = middy()
  .use(jsonBodyParser())
  .use(validator({ eventSchema: transpileSchema(addTransactionsBody) }))
  .use(httpErrorHandler())
  .handler(addTransactions);
