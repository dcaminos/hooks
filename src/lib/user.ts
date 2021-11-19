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

export type UserD = {
  id: string,
  email: string | null,
  displayName: string | null,
  photoURL: string | null,
  emailVerified: boolean,
  profiles: UserProfile[],
  hookIds: string[],
  createdAt: Date
}

export class User {
  public id: string
  public email: string | null
  public displayName: string | null
  public photoURL: string | null
  public emailVerified: boolean
  public profiles: UserProfile[]
  public hookIds: string[]
  public createdAt: Date

  constructor(userD: UserD) {
    this.id = userD.id
    this.email = userD.email
    this.displayName = userD.displayName
    this.photoURL = userD.photoURL
    this.emailVerified = userD.emailVerified
    this.profiles = userD.profiles
    this.hookIds = userD.hookIds
    this.createdAt = userD.createdAt
  }
}
