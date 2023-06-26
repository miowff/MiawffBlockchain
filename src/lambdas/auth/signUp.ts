import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { transpileSchema } from "@middy/validator/transpile";
import httpErrorHandler from "@middy/http-error-handler";
import { signUpUserBody } from "./types";
import { UserSignUpModel } from "src/models/user";
import { usersService } from "src/services/usersService";
const signUp = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const payload = event.body as unknown as UserSignUpModel;
    const user = await usersService.createUser(payload);
    return {
      body: JSON.stringify(user),
      statusCode: 200,
    };
  } catch (err) {
    return { body: JSON.stringify(err), statusCode: 400 };
  }
};

export const handler = middy()
  .use(jsonBodyParser())
  .use(validator({ eventSchema: transpileSchema(signUpUserBody) }))
  .use(httpErrorHandler())
  .handler(signUp);
