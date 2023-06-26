import { JSONSchema7 } from "json-schema";
export const queryStringParameters: JSONSchema7 = {
  type: "object",
  properties: {
    queryStringParameters: {
      type: "object",
      properties: {
        walletAddress: { type: "string" },
      },
      required: ["walletAddress"],
    },
  },
};
