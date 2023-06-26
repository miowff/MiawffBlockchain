import { randomUUID } from "crypto";
import { SHA256 } from "crypto-js";
import { blocksRepository } from "src/db/repositories/blocksRepository";
import { transactionsRepository } from "src/db/repositories/transactionsRepository";
import { Block } from "src/db/schema/block";
import { Transaction } from "src/db/schema/transaction";

class BlockchainService {
  private createBlockHash = (
    previousBlockHash: string | null,
    transactionData: Transaction[]
  ): string => {
    return SHA256(
      JSON.stringify(transactionData) + previousBlockHash
    ).toString();
  };
  createBlock = async (transactions: Transaction[]) => {
    let previousBlockHash = null;
    const previousBlock = await blocksRepository.getPreviousBlock();
    if (previousBlock) {
      previousBlockHash = previousBlock.blockHash;
    }
    const blockHash = this.createBlockHash(previousBlockHash, transactions);
    const blockId = randomUUID();
    const block: Block = {
      id: blockId,
      previousBlockHash,
      blockHash,
      createdDate: Date.now(),
    };

    await blocksRepository.addNew(block);
    return blockId;
  };
  getAddressBalance = async (address: string) => {
    const balance = await transactionsRepository.getAddressBalance(address);
    if (!balance) {
      return 0;
    }
    return balance;
  };
}

export const blockchainService = new BlockchainService();
