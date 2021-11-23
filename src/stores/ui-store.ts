import { action, makeAutoObservable } from "mobx";
import { RootStore } from "./root-store";

export type ModalType =
  | "new-hook"
  | "first-profile"
  | "new-wallet"
  | "edit-wallet";

export class UiStore {
  theme: "light" | "dark" = "light";
  sidebarCollapsed: boolean = false;

  // Modals
  isNewHookModalVisible: boolean = false;
  isNewProfileModalVisible: boolean = false;
  isNewWalletModalVisible: boolean = false;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore.uiStore = this;
  }

  @action
  setTheme = (value: "light" | "dark") => {
    this.theme = value;
  };

  @action
  showModal = (type: ModalType) => {
    console.log(this);
    switch (type) {
      case "new-hook":
        this.isNewHookModalVisible = true;
        return;
      case "first-profile":
        this.isNewProfileModalVisible = true;
        return;
      case "new-wallet":
        this.isNewWalletModalVisible = true;
        return;
    }
  };

  @action
  hideModal = (type: ModalType) => {
    switch (type) {
      case "new-hook":
        this.isNewHookModalVisible = false;
        return;
      case "first-profile":
        this.isNewProfileModalVisible = false;
        return;
      case "new-wallet":
        this.isNewWalletModalVisible = false;
        return;
    }
  };
}
