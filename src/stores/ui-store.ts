import { action, makeAutoObservable } from "mobx";

export type ModalType = "new-hook";

export class UiStore {
  theme: "light" | "dark" = "light";
  sidebarCollapsed: boolean = false;

  // Modals
  isNewHookModalVisible: boolean = false;

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
    }
  };

  @action
  hideModal = (type: ModalType) => {
    switch (type) {
      case "new-hook":
        this.isNewHookModalVisible = false;
    }
  };
}
