import axios from "axios";
import { Transaction } from "src/db/schema/transaction";

const baseUrl = " https://ptbpuz76mj.execute-api.us-east-1.amazonaws.com";
export const sendReceivedPaymentAlerts = async (
  completedTransactions: Transaction[]
) => {
  await axios.post(`${baseUrl}/receivedPaymentAlerts`, {
    completedTransactions,
  });
};
