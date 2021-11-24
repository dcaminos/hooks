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
import { networks } from "../lib/config/networks";
import { tokens } from "../lib/config/tokens";
import { hookConverter } from "../lib/converters/hook-converter";
import { Hook } from "../lib/hook";
import { NetworkId } from "../lib/network";
import { RootStore } from "./root-store";

export class HookStore {
  hooks: Hook[] = [];

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore.hookStore = this;
  }

  @action
  createNewHook = async (
    userId: string,
    title: string,
    networkId: NetworkId,
    tokenIds: string[]
  ) => {
    const network = networks.find((n) => n.id === networkId);
    if (!network) {
      return;
    }

    let tokensText = "";
    tokenIds.forEach((tokenId) => {
      const token = tokens.find((t) => t.id === tokenId);
      if (!token) {
        return;
      }

      tokensText += `const address${token.symbol.toUpperCase()} = '${
        token.contracts[networkId]
      }'\n`;
    });

    const hook = new Hook(
      "",
      userId,
      title,
      networkId,
      tokenIds,
      false,
      network.hookTemplate.replace("TOKENS_ADDRESSES", tokensText),
      new Date(),
      new Date()
    );

    const hookReference = await addDoc(
      collection(this.rootStore.firestore, "hooks"),
      hookConverter.toFirestore(hook)
    );

    return hookReference.id;
  };

  fetchHook = async (hookId: string): Promise<Hook | undefined> => {
    const hookRef = doc(this.rootStore.firestore, "hooks", hookId);
    const hookDoc = await getDoc(hookRef.withConverter(hookConverter));
    if (!hookDoc.exists()) {
      return undefined;
    }
    return hookDoc.data();
  };

  updateHook = async (hook: Hook): Promise<void> => {
    if (!hook.id) {
      throw Error("Hook id is missing");
    }
    const hookRef = doc(this.rootStore.firestore, "hooks", hook.id);
    await setDoc(hookRef.withConverter(hookConverter), hook);
  };

  fetchHooks = async () => {
    const hooksCol = collection(this.rootStore.firestore, "hooks");
    const q = query(hooksCol, where("isPublic", "==", true)).withConverter(
      hookConverter
    );
    const r = await getDocs(q);
    runInAction(() => {
      this.hooks = r.docs.map((doc) => doc.data());
    });
  };
}
