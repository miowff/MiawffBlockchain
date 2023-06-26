import { TransactionRequest } from "src/models/transaction";
import { SHA256 } from "crypto-js";
import { getFromPublicKey } from "src/utils/ellipticFunctions";
import { Transaction } from "src/db/schema/transaction";
import { TransactionStatus } from "src/enums/transactionsStatuses";
import { transactionsRepository } from "src/db/repositories/transactionsRepository";
import { blockchainService } from "./blockchainService";
import { sendReceivedPaymentAlerts } from "src/utils/sendPaymentReceivedAlert";

class TransactionsService {
  private isTransactionsValid = (transaction: TransactionRequest) => {
    const { fromAddress, toAddress, amount, signature } = transaction;
    if (fromAddress === null) {
      return true;
    }
    if (signature.length === 0) {
      return false;
    }
    const key = getFromPublicKey(fromAddress);
    const transactionHash = SHA256(fromAddress + toAddress + amount).toString();
    return key.verify(transactionHash, signature);
  };
  addTransactions = async (transactions: TransactionRequest[]) => {
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
      if (this.isTransactionsValid(transaction)) {
        const { fromAddress, toAddress, amount } = transaction;
        const newTransaction: Transaction = {
          amount,
          transactionDate: Date.now(),
          senderAddress: fromAddress,
          receiverAddress: toAddress,
          transactionStatus: TransactionStatus.Pending,
          blockId: null,
        };
        await transactionsRepository.addNew(newTransaction);
      }
    }
  };
  processPendingTransactions = async (transactions: Transaction[]) => {
    const blockId = await blockchainService.createBlock(transactions);
    await sendReceivedPaymentAlerts(transactions);
    const receiversAddresses = transactions.reduce(
      (receivers: string[], receiver) => {
        receivers.push(receiver.receiverAddress);
        return receivers;
      },
      []
    );
    await transactionsRepository.attachTransactionsToBlock(
      receiversAddresses,
      blockId
    );
  };
}
export const transactionService = new TransactionsService();
