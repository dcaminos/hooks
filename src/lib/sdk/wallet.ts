export type WalletType = "defi" | "binance";

export type WalletD = {
  id: string;
  name: string;
  address: string;
  key?: string;
  type: WalletType;
};

export class Wallet {
  private _id: string;
  private _name: string;
  private _address: string;
  private _key?: string;
  private _type: WalletType;

  constructor(wallet: WalletD) {
    this._id = wallet.id;
    this._name = wallet.name;
    this._address = wallet.address;
    this._key = wallet.key;
    this._type = wallet.type;
  }

  public get id() {
    return this._id;
  }
  public get name() {
    return this._name;
  }
  public get address() {
    return this._address;
  }
  public get key() {
    return this._key;
  }
  public get type() {
    return this._type;
  }
}
