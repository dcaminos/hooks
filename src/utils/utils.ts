import axios from "axios";
import { BigNumber } from "bignumber.js";
import { TokensPrice } from "lib/sdk/token";
import { tokens } from "lib/config/tokens";

export function uniq(array: Array<any>): Array<any> {
  return array.reduce(function (a: Array<any>[], b: any) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
  }, []);
}
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
    (k) => (prices[k] = new BigNumber(res.data[k].usd))
  );
  return prices;
};
