export interface TransactionRequest {
  fromAddress: string | null;
  toAddress: string;
  amount: number;
  signature: string;
}
export interface AddTransactionsRequest {
  transactions: TransactionRequest[];
}
export interface RewardRequest {
  steamId: string;
  coins: number;
}

