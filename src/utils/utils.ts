import axios from "axios";
import { BigNumber } from "../lib/sdk/big-number";
import { TokensPrice } from "lib/sdk/token";
import { tokens } from "lib/config/tokens";

export function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const ret: any = {};
  keys.forEach((key) => {
    ret[key] = obj[key];
  });
  return ret;
}

export function disabledEventPropagation(e: Event) {
  if (e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true;
    }
  }
}

export const getTokensPrices = async (
  tokenIds: string[]
): Promise<TokensPrice> => {
  const ids = tokens
    .filter((t) => tokenIds.includes(t.id))
    .map((t) => t.id)
    .join(",");
  const res = await axios(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
  );
  let prices: TokensPrice = {};
  Object.keys(res.data).forEach(
    (k) => (prices[k] = BigNumber.fromReal(res.data[k].usd))
  );
  return prices;
};
