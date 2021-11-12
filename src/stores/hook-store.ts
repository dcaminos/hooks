import {
  Firestore,
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  arrayUnion,
  Timestamp,
  getDoc,
} from "@firebase/firestore";
import { FirebaseApp } from "firebase/app";
import { action, makeAutoObservable } from "mobx";
import { networks } from "../lib/config/networks";
import { tokens } from "../lib/config/tokens";
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
      }'`;
    });

    const hookReference = await addDoc(collection(this.firestore, "hooks"), {
      owner: userId,
      title,
      networkId,
      tokenIds,
      tjs: network.hookTemplate.replace("TOKENS_ADDRESSES", tokensText),
      js: "",
      createdAt: Timestamp.fromDate(new Date()),
    });

    const userRef = doc(this.firestore, "users", userId);
    // Atomically add a new region to the "regions" array field.
    await updateDoc(userRef, {
      hooks: arrayUnion(hookReference),
    });

    return hookReference.id;
  };

  fetchHook = async (hookId: string): Promise<Hook | undefined> => {
    const hookRef = doc(this.firestore, "hooks", hookId);
    const hookDoc = await getDoc(hookRef);
    if (!hookDoc.exists()) {
      return undefined;
    }

    const data = hookDoc.data();
    return new Hook(
      hookDoc.id,
      data.owner.id,
      data.title,
      data.networkId,
      data.tokenIds,
      data.isPublic,
      data.ts,
      data.js
    );
  };

  fetchHooks = async () => {
    const hooksCol = collection(this.firestore, "hooks");
    const hookSnapshot = await getDocs(hooksCol);
    this.hooks = hookSnapshot.docs.map((doc) => {
      const data = doc.data();
      return new Hook(
        doc.id,
        data.owner.id,
        data.title,
        data.networkId,
        data.tokenIds,
        data.isPublic,
        data.ts,
        data.js
      );
    });
  };
}
