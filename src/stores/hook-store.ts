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
import { action, makeAutoObservable, runInAction } from "mobx";
import { Hook, hookConverter, TokenBalanceData } from "lib/hook";
import { RootStore } from "./root-store";
import { TokenBalanceRequest } from "lib/sdk/token-balance/token-balance-request";
import { run } from "lib/sdk/sdk";

export class HookStore {
  hooks: Hook[] = [];
  action: "creating" | "fetching" | "updating" | undefined;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore.hookStore = this;
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
    const q = query(hooksCol, where("isPublic", "==", false)).withConverter(
      hookConverter
    );
    const r = await getDocs(q);
    runInAction(() => {
      this.hooks = r.docs.map((doc) => doc.data());
      this.action = undefined;
    });
  };

  getHookRequest = (hook: Hook, walletAddress: string) => {
    switch (hook.type) {
      case "token-balance":
        const token = this.rootStore.tokenStore?.getToken(
          (hook.data as TokenBalanceData).tokenId
        );
        if (!token) {
          return;
        }
        return new TokenBalanceRequest({ walletAddress, token });
      default:
        return undefined;
    }
  };

  @action
  runHook = async (hook: Hook, walletAddress: string) => {
    const currentVersion = hook.versions.find((v) => v.active);
    const request = this.getHookRequest(hook, walletAddress);
    if (!hook.isPublic || !currentVersion || !request) {
      return;
    }

    const response = await run(currentVersion.js, request);
    return response;
  };
}

// JS
/*
async function runHook(request) {
    const balances = await request.token.balancesOf(request.walletAdress);
    return new TokenBalanceResponse(balances);
}

 runHook
 */

// TS
/*
import { TokenBalanceRequest, TokenBalanceResponse, BigNumber, NetworkId } from 'file:///hooks-sdk'

async function runHook(request: TokenBalanceRequest): Promise<TokenBalanceResponse> {
    const balances: Map<NetworkId,BigNumber> = await request.token.balancesOf(request.walletAdress)
    return new TokenBalanceResponse(balances)
}
 */
