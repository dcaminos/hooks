export type NetworkId =
  | "ethereum"
  | "binance-smart-chain"
  | "polygon-pos"
  | "solana"
  | "moonriver";

export type NetworkD = {
  id: NetworkId;
  name: string;
  url: string;
  tokenId: string;
  image: string;
  blockTime: number;
};

export class Network {
  private _id: NetworkId;
  private _name: string;
  private _url: string;
  private _tokenId: string;
  private _image: string;
  private _blockTime: number;

  constructor(network: NetworkD) {
    this._id = network.id;
    this._name = network.name;
    this._url = network.url;
    this._tokenId = network.tokenId;
    this._image = network.image;
    this._blockTime = network.blockTime;
  }

  public get id() {
    return this._id;
  }
  public get name() {
    return this._name;
  }
  public get url() {
    return this._url;
  }
  public get tokenId() {
    return this._tokenId;
  }
  public get image() {
    return this._image;
  }
  public get blockTime() {
    return this._blockTime;
  }
}
