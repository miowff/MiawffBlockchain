import { InferModel } from "drizzle-orm";
import { bigint, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { blocks } from "./block";

export const transactions = mysqlTable("Transactions", {
  transactionDate: bigint("TransactionDate", { mode: "number" }).notNull(),
  senderAddress: varchar("SenderAddress", { length: 256 }),
  receiverAddress: varchar("ReceiverAddress", { length: 256 }).notNull(),
  amount: int("Amount").notNull(),
  transactionStatus: varchar("TransactionStatus", { length: 32 }).notNull(),
  blockId: varchar("BlockId", { length: 80 }).references(() => blocks.id),
});

export type Transaction = InferModel<typeof transactions, "select">;
export type TransactionsTable = typeof transactions;
