export type UserWallet = {
  name: string;
  address: string;
  type: "defi" | "binance";
};

export type UserProfile = {
  active: boolean;
  hookIds: string[];
  tokenIds: string[];
  wallets: UserWallet[];
};

export class User {
  constructor(
    public id: string,
    public email: string | null,
    public displayName: string | null,
    public photoURL: string | null,
    public emailVerified: boolean,
    public profiles: UserProfile[],
    public createdHookIds: string[],
    public createdAt: Date
  ) {}
}
