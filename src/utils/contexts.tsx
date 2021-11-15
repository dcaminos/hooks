import { FirebaseApp } from "@firebase/app";
import { createContext } from "react";
import { EditorStore } from "../stores/editor-store";
import { HookStore } from "../stores/hook-store";
import { RootStore } from "../stores/root-store";
import { TokenStore } from "../stores/token-store";
import { UiStore } from "../stores/ui-store";
import { UserStore } from "../stores/user-store";

export const UIContext = createContext<UiStore | null>(null);
export const TokenContext = createContext<TokenStore | null>(null);
export const UserContext = createContext<UserStore | null>(null);
export const HookContext = createContext<HookStore | null>(null);
export const EditorContext = createContext<EditorStore | null>(null);



export const AppProviders: React.FC<{ firebaseApp: FirebaseApp }> = ({
  firebaseApp,
  children,
}) => {
  const rootStore = new RootStore(firebaseApp)
  
  return <UIContext.Provider value={new UiStore(rootStore)}>
    <TokenContext.Provider value={new TokenStore(rootStore)}>
      <UserContext.Provider value={new UserStore(rootStore)}>
        <HookContext.Provider value={new HookStore(rootStore)}>
          <EditorContext.Provider value={new EditorStore(rootStore)}>
            {children}
          </EditorContext.Provider>
        </HookContext.Provider>
      </UserContext.Provider>
    </TokenContext.Provider>
  </UIContext.Provider>
};
