export type UserWallet = {
  name: string;
  address: string;
  type: "defi" | "binance";
};

export type UserProfile = {
  active: boolean;
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
    public hookIds: string[],
    public tokenIds: string[],
    public createdHookIds: string[],
    public createdAt: Date
  ) {}
}
