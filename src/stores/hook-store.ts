import {
  addDoc,
  arrayUnion,
  collection,
  doc, getDoc,
  getDocs, setDoc,
  updateDoc
} from "@firebase/firestore";
import { action, makeAutoObservable } from "mobx";
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
    this.rootStore.hookStore = this
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
      new Date()
    );

    const hookReference = await addDoc(
      collection(this.rootStore.firestore, "hooks"),
      hookConverter.toFirestore(hook)
    );
    const userRef = doc(this.rootStore.firestore, "users", userId);

    await updateDoc(userRef, {
      createdHookIds: arrayUnion(hookReference.id),
    });

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
    const hookSnapshot = await getDocs(hooksCol.withConverter(hookConverter));
    this.hooks = hookSnapshot.docs.map((doc) => doc.data());
  };
}
