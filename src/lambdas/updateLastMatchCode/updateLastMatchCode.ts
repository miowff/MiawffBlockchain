import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { UpdateLastMatchCode } from "src/models/user";
import { usersService } from "src/services/usersService";
import { updateLastMatchCodeBody } from "./types";

const updateLastMatchCode = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const payload = event.body as unknown as UpdateLastMatchCode;
    await usersService.updateLastMatchCode(payload);
    return {
      statusCode: 200,
    };
  } catch (err) {
    return { body: JSON.stringify(err), statusCode: 400 };
  }
};
export const handler = middy()
  .use(jsonBodyParser())
  .use(validator({ eventSchema: transpileSchema(updateLastMatchCodeBody) }))
  .use(httpErrorHandler())
  .handler(updateLastMatchCode);
