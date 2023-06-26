import { MySql2Database } from "drizzle-orm/mysql2";
import { database } from "../dbConnection";
import { Block, BlocksTable } from "../schema/block";
import { Transaction, TransactionsTable } from "../schema/transaction";
import { User, UsersTable } from "../schema/user";

export abstract class BaseRepository {
  protected table: UsersTable | BlocksTable | TransactionsTable;
  protected db: MySql2Database;
  constructor(table: UsersTable | BlocksTable | TransactionsTable) {
    this.table = table;
    this.db = database;
  }
  addNew = async (entity: User | Block | Transaction) => {
    await this.db.insert(this.table).values(entity);
  };
}
