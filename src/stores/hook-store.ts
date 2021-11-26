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
import { hookConverter } from "../lib/converters/hook-converter";
import { Hook } from "../lib/hook";
import { RootStore } from "./root-store";

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
