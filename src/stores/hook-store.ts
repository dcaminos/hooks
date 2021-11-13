import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { FirebaseApp } from "firebase/app";
import { action, makeAutoObservable } from "mobx";
import { networks } from "../lib/config/networks";
import { tokens } from "../lib/config/tokens";
import { hookConverter } from "../lib/converters/hook-converter";
import { Hook } from "../lib/hook";
import { NetworkId } from "../lib/network";

export class HookStore {
  hooks: Hook[] = [];
  firebaseApp: FirebaseApp;
  firestore: Firestore;

  constructor(firebaseApp: FirebaseApp) {
    makeAutoObservable(this);
    this.firebaseApp = firebaseApp;
    this.firestore = getFirestore(this.firebaseApp);
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
      collection(this.firestore, "hooks"),
      hookConverter.toFirestore(hook)
    );
    const userRef = doc(this.firestore, "users", userId);

    await updateDoc(userRef, {
      createdHookIds: arrayUnion(hookReference.id),
    });

    return hookReference.id;
  };

  fetchHook = async (hookId: string): Promise<Hook | undefined> => {
    const hookRef = doc(this.firestore, "hooks", hookId);
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
    const hookRef = doc(this.firestore, "hooks", hook.id);
    await setDoc(hookRef.withConverter(hookConverter), hook);
  };

  fetchHooks = async () => {
    const hooksCol = collection(this.firestore, "hooks");
    const hookSnapshot = await getDocs(hooksCol.withConverter(hookConverter));
    this.hooks = hookSnapshot.docs.map((doc) => doc.data());
  };
}
