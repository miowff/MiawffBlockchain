import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { GetBySteamId } from "src/models/user";
import { usersService } from "src/services/usersService";
import { isSteamAccExistsBody } from "./types";

const isSteamAccExists = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const { steamId } = event.body as unknown as GetBySteamId;
    const isExists = await usersService.isUserWithSteamIdExists(steamId);
    return {
      body: JSON.stringify(isExists),
      statusCode: 200,
    };
  } catch (err) {
    return { body: JSON.stringify(err), statusCode: 400 };
  }
};
export const handler = middy()
  .use(jsonBodyParser())
  .use(validator({ eventSchema: transpileSchema(isSteamAccExistsBody) }))
  .use(httpErrorHandler())
  .handler(isSteamAccExists);
