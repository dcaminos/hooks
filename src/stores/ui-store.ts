import { action, makeAutoObservable } from "mobx";
import { RootStore } from "./root-store";

export type ModalType =
  | "new-hook"
  | "new-token-balance"
  | "new-staking"
  | "new-yield-farming"
  | "first-profile"
  | "new-wallet"
  | "edit-wallet"
  | "publish-hook"
  | "publish-hook-success";

export class UiStore {
  theme: "light" | "dark" = "light";
  sidebarCollapsed: boolean = false;
  hideZeroBalance: boolean;

  // Modals
  isNewHookModalVisible: boolean = false;
  isNewTokenBalanceModalVisible: boolean = false;
  isNewStakingModalVisible: boolean = false;
  isNewYieldFarmingModalVisible: boolean = false;
  isNewProfileModalVisible: boolean = false;
  isNewWalletModalVisible: boolean = false;
  isPublishHookModalVisible: boolean = false;
  isPublishHookSuccessModalVisible: boolean = false;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore.uiStore = this;

    if (localStorage.getItem("tokenBalance-hideZeroBalance") === null) {
      localStorage.setItem("tokenBalance-hideZeroBalance", "true");
      this.hideZeroBalance = true;
    }
    this.hideZeroBalance =
      localStorage.getItem("tokenBalance-hideZeroBalance") === "true";
  }

  @action
  setTheme = (value: "light" | "dark") => {
    this.theme = value;
  };

  @action
  setHideZeroBalance = (value: boolean) => {
    this.hideZeroBalance = value;
    localStorage.setItem("tokenBalance-hideZeroBalance", `${value}`);
  };

  @action
  showModal = (type: ModalType) => {
    switch (type) {
      case "new-hook":
        this.isNewHookModalVisible = true;
        return;
      case "new-token-balance":
        this.isNewTokenBalanceModalVisible = true;
        return;
      case "new-staking":
        this.isNewStakingModalVisible = true;
        return;
      case "new-yield-farming":
        this.isNewYieldFarmingModalVisible = true;
        return;
      case "first-profile":
        this.isNewProfileModalVisible = true;
        return;
      case "new-wallet":
        this.isNewWalletModalVisible = true;
        return;
      case "publish-hook":
        this.isPublishHookModalVisible = true;
        return;
      case "publish-hook-success":
        this.isPublishHookSuccessModalVisible = true;
        return;
    }
  };

  @action
  hideModal = (type: ModalType) => {
    switch (type) {
      case "new-hook":
        this.isNewHookModalVisible = false;
        return;
      case "new-token-balance":
        this.isNewTokenBalanceModalVisible = false;
        return;
      case "new-staking":
        this.isNewStakingModalVisible = false;
        return;
      case "new-yield-farming":
        this.isNewYieldFarmingModalVisible = false;
        return;
      case "first-profile":
        this.isNewProfileModalVisible = false;
        return;
      case "new-wallet":
        this.isNewWalletModalVisible = false;
        return;
      case "publish-hook":
        this.isPublishHookModalVisible = false;
        return;
      case "publish-hook-success":
        this.isPublishHookSuccessModalVisible = false;
        return;
    }
  };
}
