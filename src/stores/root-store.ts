import { FirebaseApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { DashboardStore } from "./dashboard-store";
import { EditorStore } from "./editor-store";
import { HookStore } from "./hook-store";
import { NetworkStore } from "./network-store";
import { TokenStore } from "./token-store";
import { UiStore } from "./ui-store";
import { UserStore } from "./user-store";

export class RootStore {
  firebaseApp: FirebaseApp;
  firestore: Firestore;

  dashboardStore?: DashboardStore;
  editorStore?: EditorStore;
  hookStore?: HookStore;
  tokenStore?: TokenStore;
  networkStore?: NetworkStore;
  uiStore?: UiStore;
  userStore?: UserStore;

  constructor(firebaseApp: FirebaseApp) {
    this.firebaseApp = firebaseApp;
    this.firestore = getFirestore(this.firebaseApp);
  }
}
