import { eq, sql, and, inArray } from "drizzle-orm";
import { TransactionStatus } from "src/enums/transactionsStatuses";
import {  transactions } from "../schema/transaction";

import { BaseRepository } from "./baseRepository";

class TransactionsRepository extends BaseRepository {
  getAddressBalance = async (address: string) => {
    const addressIncome = await this.db
      .select({
        balance: sql<number>`sum(${transactions.amount})`.mapWith(Number),
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.receiverAddress, address),
          eq(transactions.transactionStatus, TransactionStatus.Completed)
        )
      );
    const addressOutcome = await this.db
      .select({
        balance: sql<number>`sum(${transactions.amount})`.mapWith(Number),
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.senderAddress, address),
          eq(transactions.transactionStatus, TransactionStatus.Completed)
        )
      );
    return addressIncome[0].balance - addressOutcome[0].balance;
  };
  getPendingTransactions = async () => {
    const result = await this.db
      .select()
      .from(transactions)
      .where(eq(transactions.transactionStatus, TransactionStatus.Pending));
    return result;
  };
  attachTransactionsToBlock = async (
    receiversArray: string[],
    blockId: string
  ) => {
    await this.db
      .update(transactions)
      .set({
        transactionStatus: TransactionStatus.Completed,
        blockId: blockId,
      })
      .where(
        and(
          inArray(transactions.receiverAddress, receiversArray),
          eq(transactions.transactionStatus, TransactionStatus.Pending)
        )
      );
  };
}

export const transactionsRepository = new TransactionsRepository(transactions);
