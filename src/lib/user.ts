import { Wallet } from "./wallet";

export type User = {
  id: string;
  wallets: Wallet[];
  tokens: string[];
  integrations: string[];
};
