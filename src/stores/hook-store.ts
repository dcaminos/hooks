import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "@firebase/firestore";
import { where } from "firebase/firestore";
import {
  Hook,
  hookConverter,
  StakingData,
  TokenBalanceData,
  YieldFarmingData,
} from "lib/hook";
import { NetworkId } from "lib/sdk/network";
import { run } from "lib/sdk/sdk";
import { StakingRequest } from "lib/sdk/staking/staking-request";
import { Token } from "lib/sdk/token";
import { TokenBalanceRequest } from "lib/sdk/token-balance/token-balance-request";
import { YieldFarmingRequest } from "lib/sdk/yield-farming/yield-farming-request";
import { action, makeAutoObservable, runInAction } from "mobx";
import moment from "moment";
import { RootStore } from "./root-store";

export class HookStore {
  hooks: Hook[] = [];
  action: "creating" | "fetching" | "updating" | undefined;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore.hookStore = this;
    this.fetchHooks();
  }

  @action
  createHook = async (hook: Hook) => {
    this.action = "creating";
    const hookReference = await addDoc(
      collection(this.rootStore.firestore, "hooks"),
      hookConverter.toFirestore(hook)
    );
    runInAction(() => (this.action = undefined));
    return hookReference.id;
  };

  fetchHook = async (hookId: string): Promise<Hook | undefined> => {
    this.action = "fetching";
    const hookRef = doc(this.rootStore.firestore, "hooks", hookId);
    const hookDoc = await getDoc(hookRef.withConverter(hookConverter));
    if (!hookDoc.exists()) {
      return undefined;
    }
    runInAction(() => (this.action = undefined));
    return hookDoc.data();
  };

  updateHook = async (hook: Hook): Promise<void> => {
    if (!hook.id) {
      throw Error("Hook id is missing");
    }
    this.action = "updating";
    const hookRef = doc(this.rootStore.firestore, "hooks", hook.id);
    await setDoc(hookRef.withConverter(hookConverter), hook);
    runInAction(() => (this.action = undefined));
  };

  fetchHooks = async () => {
    this.action = "fetching";
    const hooksCol = collection(this.rootStore.firestore, "hooks");
    const q = query(hooksCol, where("isPublic", "==", true)).withConverter(
      hookConverter
    );
    const r = await getDocs(q);
    runInAction(() => {
      this.hooks = [
        ...r.docs.map((doc) => doc.data()),
        ...this.createSinteticHooks(),
      ];
      this.action = undefined;
    });
  };

  createSinteticHooks = (): Hook[] => {
    const networkIds = this.rootStore.networkStore!.networks.map((n) => n.id);
    return this.rootStore
      .tokenStore!.tokens.filter((t) =>
        Object.keys(t.contracts).some((id) =>
          networkIds.includes(id as NetworkId)
        )
      )
      .map(this.createSinteticHook);
  };

  createSinteticHook = (token: Token): Hook => ({
    id: `sintetic-token-balance${token.id}`,
    type: "token-balance",
    owner: "hooks.finance",
    title: `Token balance: ${token.name} (${token.symbol.toUpperCase()})`,
    data: {
      tokenId: token.id,
    } as TokenBalanceData,
    isPublic: true,
    code: `import { TokenBalanceRequest, TokenBalanceResponse, BigNumber, Token, NetworkId } from 'file:///hooks-sdk'

    async function runHook(request: TokenBalanceRequest): Promise<TokenBalanceResponse> {
        const token: Token = request.token
        const balances: Map<NetworkId,BigNumber> = await token.balancesOf(request.walletAddress)
        return new TokenBalanceResponse({token, balances})
    }`,
    createdAt: moment(),
    updatedAt: moment(),
    versions: [
      {
        active: true,
        version: 1,
        releaseDate: moment(),
        ts: ``,
        js: `async function runHook(request) {
          const token = request.token;
          const balances = await token.balancesOf(request.walletAddress);
          return new TokenBalanceResponse({ token, balances });
      }
      
       runHook`,
        notes: "Sintetic Hook",
      },
    ],
  });

  getHookRequest = async (hook: Hook, walletAddress: string) => {
    switch (hook.type) {
      case "token-balance":
        const [token] = await this.rootStore.tokenStore!.getTokensWithPrice([
          (hook.data as TokenBalanceData).tokenId,
        ]);
        if (!token) {
          return;
        }
        return new TokenBalanceRequest({ walletAddress, token });
      case "staking":
        const sNetwork = this.rootStore.networkStore?.getNetwork(
          (hook.data as StakingData).networkId
        );
        const [sStakedToken, sRewardsToken] =
          await this.rootStore.tokenStore!.getTokensWithPrice([
            (hook.data as StakingData).stakedTokenId,
            (hook.data as StakingData).rewardsTokenId,
          ]);
        if (!sNetwork || !sStakedToken || !sRewardsToken) {
          return;
        }
        return new StakingRequest({
          walletAddress,
          network: sNetwork,
          stakedToken: sStakedToken,
          rewardsToken: sRewardsToken,
        });
      case "yield-farming":
        const yfNetwork = this.rootStore.networkStore?.getNetwork(
          (hook.data as YieldFarmingData).networkId
        );
        const [yfStakedToken0, yfStakedToken1, yfRewardsToken] =
          await this.rootStore.tokenStore!.getTokensWithPrice([
            (hook.data as YieldFarmingData).stakedTokenId0,
            (hook.data as YieldFarmingData).stakedTokenId1,
            (hook.data as YieldFarmingData).rewardsTokenId,
          ]);
        if (
          !yfNetwork ||
          !yfStakedToken0 ||
          !yfStakedToken1 ||
          !yfRewardsToken
        ) {
          return;
        }
        return new YieldFarmingRequest({
          walletAddress,
          network: yfNetwork,
          stakedToken0: yfStakedToken0,
          stakedToken1: yfStakedToken1,
          rewardsToken: yfRewardsToken,
        });
      default:
        return undefined;
    }
  };

  @action
  runHook = async (hook: Hook, walletAddress: string) => {
    const currentVersion = hook.versions.find((v) => v.active);
    const request = await this.getHookRequest(hook, walletAddress);
    if (!hook.isPublic || !currentVersion || !request) {
      return;
    }

    const response = await run(currentVersion.js, request);
    return response;
  };
}
