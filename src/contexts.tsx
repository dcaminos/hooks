import { createContext } from "react";
import { EditorStore } from "./stores/editor-store";
import { TokenStore } from "./stores/token-store";
import { UiStore } from "./stores/ui-store";

export const UIContext = createContext<UiStore | null>(null);
export const TokenContext = createContext<TokenStore | null>(null);
export const EditorContext = createContext<EditorStore | null>(null);

export const AppProviders: React.FC = ({ children }) => (
  <UIContext.Provider value={new UiStore()}>
    <TokenContext.Provider value={new TokenStore()}>
      <EditorContext.Provider value={new EditorStore()}>
        {children}
      </EditorContext.Provider>
    </TokenContext.Provider>
  </UIContext.Provider>
);
