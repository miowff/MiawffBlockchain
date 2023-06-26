import { JSONSchema7 } from "json-schema";
export const addTransactionsBody: JSONSchema7 = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        transactions: {
          type: "array",
        },
      },
      required: ["transactions"],
    },
  },
};
