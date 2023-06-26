import { JSONSchema7 } from "json-schema";
export const isSteamAccExistsBody: JSONSchema7 = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        steamId: {
          type: "string",
        },
      },
      required: ["steamId"],
    },
  },
};
