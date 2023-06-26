import { APIGatewayProxyResultV2 } from "aws-lambda/trigger/api-gateway-proxy";
import { transactionsRepository } from "src/db/repositories/transactionsRepository";
import { transactionService } from "src/services/transactionsService";

export const handler = async (): Promise<APIGatewayProxyResultV2> => {
  try {
    const transactions = await transactionsRepository.getPendingTransactions();
    if (transactions.length === 0) {
      return {
        statusCode: 200,
      };
    }
    await transactionService.processPendingTransactions(transactions);
    return {
      statusCode: 200,
    };
  } catch (err) {
    return { body: JSON.stringify(err), statusCode: 400 };
  }
};
