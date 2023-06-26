import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { SignInModel } from "src/models/user";
import { usersService } from "src/services/usersService";
import { signInBody } from "./types";

const isUserCredValid = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const payload = event.body as unknown as SignInModel;
    const isUserCredValid = await usersService.isUserCredValid(payload);
    return {
      body: JSON.stringify(isUserCredValid),
      statusCode: 200,
    };
  } catch (err) {
    return { body: JSON.stringify(err), statusCode: 400 };
  }
};

export const handler = middy()
  .use(jsonBodyParser())
  .use(validator({ eventSchema: transpileSchema(signInBody) }))
  .use(httpErrorHandler())
  .handler(isUserCredValid);
