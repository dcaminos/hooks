import { NetworkId } from "./network";

export type Hook = {
  id: string;
  name: string;
  networkId: NetworkId;
  ts: string;
  js: string;
};
