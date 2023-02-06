import { TokenState } from "../types";

export type SwapTokensFormData = {
  tokenToTrade: TokenState;
  tokenToReceive: TokenState;
  slippage: number;
  transactionDeadline: number;
};

export interface SwapTokensState {
  tokenToTrade: TokenState;
  tokenToReceive: TokenState;
  slippage: number | undefined;
  transactionDeadline: number | undefined;
}

export interface Token {
  amount: number;
  displayAmount: string;
  balance: number | undefined;
  poolLiquidity: number | undefined;
  symbol: string | undefined;
  tokenName: string | undefined;
  totalSupply: Long | null;
  maxSupply: Long | null;
  tokenMeta: {
    pairAccountId: string | undefined;
    tokenId: string | undefined;
  };
}

export interface TokenPair {
  tokenA: Token;
  tokenB: Token;
  pairToken: {
    symbol: string | undefined;
    pairLpAccountId: string | undefined;
    totalSupply?: Long | null;
    decimals: number;
  };
}