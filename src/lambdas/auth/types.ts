import { JSONSchema7 } from "json-schema";
export const signUpUserBody: JSONSchema7 = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        steamId: {
          type: "string",
        },
        matchHistoryAuthCode: {
          type: "string",
        },
        latestMatchCode: {
          type: "string",
        },
      },
      required: ["steamId", "matchHistoryAuthCode", "latestMatchCode"],
    },
  },
};
export const signInBody: JSONSchema7 = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        steamId: {
          type: "string",
        },
        password: {
          type: "string",
        }
      },
      required: ["steamId", "password"],
    },
  },
};
