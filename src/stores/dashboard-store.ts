import {
  Hook,
  HookRequest,
  HookResult,
  StakingData,
  TokenBalanceData,
  YieldFarmingData,
} from "lib/hook";
import { run } from "lib/sdk/sdk";
import { StakingFactory } from "lib/sdk/staking/factory";
import { Token } from "lib/sdk/token";
import { TokenBalanceFactory } from "lib/sdk/token-balance/factory";
import { YieldFarmingFactory } from "lib/sdk/yield-farming/factory";
import { UserWallet } from "lib/user";
import { computed, makeAutoObservable, runInAction } from "mobx";
import { uniq } from "utils/utils";
import { RootStore } from "./root-store";

export class DashboardStore {
  results: HookResult[] = [];
  action: "fetchingPrices" | "runningHooks" | undefined;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore.dashboardStore = this;
  }

  @computed
  get tokenBalanceResults() {
    return this.results.filter((r) => r.hook.type === "token-balance");
  }

  runHooks = async () => {
    if (this.action !== undefined) {
      return;
    }

    if (!this.rootStore.userStore!.user) {
      throw new Error("No user logged in");
    }

    const wallets = this.rootStore.userStore!.user.profiles[0].wallets ?? [];
    const hookIds = this.rootStore.userStore!.user.profiles[0].hookIds ?? [];
    if (hookIds.length === 0) {
      throw new Error("No Hooks to run");
    }

    const hooks = this.rootStore.hookStore!.hooks.filter((h) =>
      hookIds.includes(h.id)
    );

    this.action = "fetchingPrices";
    const tokenIds = uniq(
      hooks
        .map((h) => {
          switch (h.type) {
            case "token-balance":
              return [(h.data as TokenBalanceData).tokenId];
            case "staking":
              return [
                (h.data as StakingData).stakedTokenId,
                (h.data as StakingData).rewardsTokenId,
              ];
            case "yield-farming":
              return [
                (h.data as YieldFarmingData).stakedTokenId0,
                (h.data as YieldFarmingData).stakedTokenId1,
                (h.data as StakingData).rewardsTokenId,
              ];
            default:
              return [];
          }
        })
        .flat()
    ) as string[];
    const tokens = await this.rootStore.tokenStore!.getTokensWithPrice(
      tokenIds
    );

    runInAction(() => (this.action = "runningHooks"));
    console.time("DashboardHooksRun");
    const resultsPromises: Promise<HookResult>[] = [];
    wallets.forEach((wallet) => {
      hooks.forEach((hook) => {
        const request = this.getHookRequest(hook, tokens, wallet.address);
        resultsPromises.push(this.runWithWallet(hook, request, wallet));
      });
    });
    const results = await Promise.all(resultsPromises);
    console.timeEnd("DashboardHooksRun");

    runInAction(() => {
      this.results = results.filter((r) => r.response !== undefined);
      this.action = undefined;
    });
  };

  runWithWallet = async (
    hook: Hook,
    request: HookRequest,
    wallet: UserWallet
  ): Promise<HookResult> => {
    return {
      hook,
      wallet,
      request,
      response: await run(hook.versions[0].js, request),
    };
  };

  getHookRequest = (hook: Hook, tokens: Token[], walletAddress: string) => {
    const networks = this.rootStore.networkStore!.networks;
    switch (hook.type) {
      case "token-balance":
        return TokenBalanceFactory.fromDashboard(hook, tokens, walletAddress);
      case "staking":
        return StakingFactory.fromDashboard(
          hook,
          networks,
          tokens,
          walletAddress
        );
      case "yield-farming":
        return YieldFarmingFactory.fromDashboard(
          hook,
          networks,
          tokens,
          walletAddress
        );
    }
    throw new Error("No request created");
  };
}
