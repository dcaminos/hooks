import {
  Firestore,
  getFirestore,
  collection,
  getDocs,
} from "@firebase/firestore";
import { FirebaseApp } from "firebase/app";
import { action, makeAutoObservable } from "mobx";
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
    title: string,
    networkId: NetworkId,
    tokenIds: string[]
  ) => {
    //test
    console.log("PASO");
    this.fetchHooks();
  };

  fetchHooks = async () => {
    const hooksCol = collection(this.firestore, "hooks");
    const hookSnapshot = await getDocs(hooksCol);
    this.hooks = hookSnapshot.docs.map((doc) => {
      const data = doc.data();
      return new Hook(
        doc.id,
        data.owner.id,
        data.name,
        data.networkId,
        data.ts,
        data.js
      );
    });
  };
}
