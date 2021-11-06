import { createContext } from "react";
import { action, observable } from "mobx";

export class EditorStore {
  @observable theme: "light" | "dark" = "light";
  @observable sidebarCollapsed: boolean = false;

  @action
  setTheme = (value: "light" | "dark") => {
    this.theme = value;
  };
}

export const EditorContext = createContext<EditorStore>(new EditorStore());
