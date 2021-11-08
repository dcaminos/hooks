import { createContext } from "react";
import { action, observable } from "mobx";

export class UiStore {
  @observable theme: "light" | "dark" = "light";
  @observable sidebarCollapsed: boolean = false;

  @action
  setTheme = (value: "light" | "dark") => {
    this.theme = value;
  };
}

export const UIContext = createContext<UiStore>(new UiStore());
