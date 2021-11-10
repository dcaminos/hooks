import { createContext } from "react";
import { EditorStore } from "./stores/editor-store";
import { TokenStore } from "./stores/token-store";
import { UiStore } from "./stores/ui-store";
import { UserStore } from "./stores/user-store";


export const UIContext = createContext<UiStore | null>(null);
export const TokenContext = createContext<TokenStore | null>(null);
export const UserContext = createContext<UserStore | null>(null);
export const EditorContext = createContext<EditorStore | null>(null);

export const AppProviders: React.FC = ({ children }) => (
  <UIContext.Provider value={new UiStore()}>
    <TokenContext.Provider value={new TokenStore()}>
      <UserContext.Provider value={new UserStore()}>
        <EditorContext.Provider value={new EditorStore()}>
          {children}
        </EditorContext.Provider>
      </UserContext.Provider>
    </TokenContext.Provider>
  </UIContext.Provider>
);
