import axios from "axios";
import { BigNumber } from "../lib/big-number";
import { tokens } from "../lib/config/tokens";
import { TokensInfo } from "../lib/token";

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

export const getTokensInfo = async (
  tokenIds: string[]
): Promise<TokensInfo> => {
  const ids = tokens
    .filter((t) => tokenIds.includes(t.id))
    .map((t) => t.id)
    .join(",");
  const res = await axios(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
  );
  let prices: TokensInfo = {};
  Object.keys(res.data).forEach((k) => {
    prices[k] = {
      price: BigNumber.from(
        Math.round(
          (((res.data[k] as any).usd as number) + Number.EPSILON) * 100
        )
      ).div(BigNumber.from(100)),
    };
  });

  return prices;
};
