import { TokenState } from "./types";

export const TransactionDeadline = {
  Max: 3,
  Min: 0,
};

export const InitialSlippage = 0.5;
export const InitialTransactionDeadline = 3;

export const InitialTokenState: TokenState = {
  symbol: undefined,
  amount: 0,
  displayAmount: "",
  balance: undefined,
  poolLiquidity: undefined,
  tokenName: undefined,
  totalSupply: null,
  maxSupply: null,
  tokenMeta: {
    pairAccountId: undefined,
    tokenId: undefined,
  },
};