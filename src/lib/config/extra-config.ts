import { TokenD } from "lib/sdk/token";

export const tokens: TokenD[] = [];

export const contracts: Partial<TokenD>[] = [
  {
    id: "ethereum",
    contracts: {
      ethereum: "network-currency",
      velas: "0x85219708c49aa701871ad330a94ea0f41dff24ca",
    },
  },
  {
    id: "velas",
    contracts: {
      velas: "0xc579d1f3cf86749e05cd06f7ade17856c2ce3126",
    },
  },
  {
    id: "wagyuswap",
    contracts: {
      velas: "0x6Adaf94dbE7f14Fb94f3e900C23ea7E1045b12DE",
    },
  },
];
