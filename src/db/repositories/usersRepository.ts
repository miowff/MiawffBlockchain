import { eq } from "drizzle-orm";
import { User, users } from "../schema/user";
import { BaseRepository } from "./baseRepository";

class UsersRepository extends BaseRepository {
  getBySteamId64 = async (steamId64: string): Promise<User> => {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.steamId64, steamId64));
    return result[0];
  };
  updateLastMatchCode = async (steamId64: string, latestMatchCode: string) => {
    await this.db
      .update(users)
      .set({ latestMatchCode: latestMatchCode })
      .where(eq(users.steamId64, steamId64));
  };
}

export const usersRepository = new UsersRepository(users);
