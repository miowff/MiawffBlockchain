import { InferModel } from "drizzle-orm";
import { bigint,  mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const blocks = mysqlTable("Blocks", {
  id: varchar("BlockId", { length: 80 }).notNull().primaryKey(),
  previousBlockHash: varchar("PreviousBlockHash", { length: 256 }),
  blockHash: varchar("BlockHash", { length: 256 }).notNull(),
  createdDate: bigint("CreatedDate", { mode: "number" }).notNull(),
});

export type Block = InferModel<typeof blocks, "insert">;
export type BlocksTable = typeof blocks;
