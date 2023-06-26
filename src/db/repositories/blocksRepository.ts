import {  sql } from "drizzle-orm";
import { blocks } from "../schema/block";
import { BaseRepository } from "./baseRepository";

class BlocksRepository extends BaseRepository {
  getPreviousBlock = async () => {
    const result = await this.db
      .select()
      .from(blocks)
      .orderBy(sql`${blocks.createdDate} desc `)
      .limit(1);
    return result[0];
  };
}

export const blocksRepository = new BlocksRepository(blocks);
