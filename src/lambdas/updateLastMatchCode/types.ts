import { JSONSchema7 } from "json-schema";
export const updateLastMatchCodeBody: JSONSchema7 = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        steamId: {
          type: "string",
        },
        matchCode: {
          type: "string",
        },
      },
      required: ["steamId", "matchCode"],
    },
  },
};
