const axios = require("axios");
const fs = require("fs");
//import axios from "axios";
//import * as fs from "fs";

//get coin image: https://api.coingecko.com/api/v3/coins/ethereum

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const tsTemplate = `import { TokenD } from "lib/sdk/token";

// @ts-ignore
export const tokens: TokenD[] = `;

const getTokenContracts = async () => {
  const contracts = {};
  const data = await axios(
    "https://api.coingecko.com/api/v3/coins/list?include_platform=true"
  );
  const array = Array.from(data.data);
  array.forEach((token) => {
    contracts[token.id] = token.platforms;
  });
  return contracts;
};

const getTokensData = async (tokenContracts) => {
  let tokenData = [];
  const pages = Math.ceil(Object.keys(tokenContracts).length / 250);
  for (let i = 1; i < pages; i++) {
    console.log(`Get tokens ${i}/${pages}`);
    const data = await axios(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=250&page=${i}&sparkline=false`
    );
    tokenData = [...tokenData, ...Array.from(data.data)];
    await delay(2000);
  }
  return tokenData.map((item) => {
    return {
      id: item.id,
      symbol: item.symbol,
      name: item.name,
      image: item.image,
      contracts: tokenContracts[item.id],
    };
  });
};

const writeFile = async (data) => {
  const file = fs.createWriteStream("src/lib/config/tokens.ts");
  file.write(tsTemplate + JSON.stringify(data, null, 2));
  file.close();
};

const main = async () => {
  const tokenContracts = await getTokenContracts();
  const data = await getTokensData(tokenContracts);
  writeFile(data);
};

main();
