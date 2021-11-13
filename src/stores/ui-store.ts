import { action, makeAutoObservable } from "mobx";

export type ModalType = "new-hook" | "new-profile";

export class UiStore {
  theme: "light" | "dark" = "light";
  sidebarCollapsed: boolean = false;

  // Modals
  isNewHookModalVisible: boolean = false;
  isNewProfileModalVisible: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setTheme = (value: "light" | "dark") => {
    this.theme = value;
  };

  @action
  showModal = (type: ModalType) => {
    switch (type) {
      case "new-hook":
        this.isNewHookModalVisible = true;
        return;
      case "new-profile":
        this.isNewProfileModalVisible = true;
        return;
    }
  };

  @action
  hideModal = (type: ModalType) => {
    switch (type) {
      case "new-hook":
        this.isNewHookModalVisible = false;
        return;
      case "new-profile":
        this.isNewProfileModalVisible = false;
        return;
    }
  };
}
