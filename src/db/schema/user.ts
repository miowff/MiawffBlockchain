import { InferModel } from "drizzle-orm";
import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("Users", {
  steamId64: varchar("SteamID64", { length: 70 }).notNull().primaryKey(),
  passwordHash: varchar("PasswordHash", { length: 256 }).notNull(),
  matchHistoryAuthCode: varchar("MatchHistoryAuthCode", {
    length: 64,
  }).notNull(),
  latestMatchCode: varchar("LatestMatchCode", { length: 64 }).notNull(),
});

export type User = InferModel<typeof users, "insert">;
export type SignInResult = Omit<User, "id" | "passwordHash" | "steamId32">;
export type UsersTable = typeof users;
