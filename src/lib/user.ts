export type UserWallet = {
  name: string;
  address: string;
  type: "defi" | "binance";
};

export type UserProfile = {
  active: boolean;
  wallets: UserWallet[];
};

export type UserD = {
  id: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  profiles: UserProfile[];
  tokenIds: string[];
  hookIds: string[];
  createdAt: Date;
};

export class User {
  public id: string;
  public email: string | null;
  public displayName: string | null;
  public photoURL: string | null;
  public emailVerified: boolean;
  public profiles: UserProfile[];
  public tokenIds: string[];
  public hookIds: string[];
  public createdAt: Date;

  constructor(userD: UserD) {
    this.id = userD.id;
    this.email = userD.email;
    this.displayName = userD.displayName;
    this.photoURL = userD.photoURL;
    this.emailVerified = userD.emailVerified;
    this.profiles = userD.profiles;
    this.tokenIds = userD.tokenIds;
    this.hookIds = userD.hookIds;
    this.createdAt = userD.createdAt;
  }
}
