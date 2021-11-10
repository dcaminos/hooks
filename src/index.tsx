import React, { createContext, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { UiStore } from "./stores/ui-store";
import { initializeApp } from "firebase/app";

import "./assets/icons/remixicon.css";
import "./assets/less/yoda-theme.less";

import { ConfigProvider } from "antd";
import { Router } from "./router";
import { EditorStore } from "./stores/editor-store";
import { UserStore } from "./stores/user-store";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa3KqIx4uzI9N5DuF4HCNvHheUpVv3MFU",
  authDomain: "smart-hooks-cb261.firebaseapp.com",
  projectId: "smart-hooks-cb261",
  storageBucket: "smart-hooks-cb261.appspot.com",
  messagingSenderId: "481033899335",
  appId: "1:481033899335:web:4394b83f53c1dc79a45062",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app.name);

const userStore = new UserStore();
export const UserContext = createContext<UserStore>(userStore);

const uiStore = new UiStore(); 
export const UIContext = createContext<UiStore>(uiStore);

const editorStore = new EditorStore();
export const EditorContext = createContext<EditorStore>(editorStore);

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="loading">
      <UIContext.Provider value={uiStore}>
        <UserContext.Provider value={userStore}>
          <EditorContext.Provider value={editorStore}>
            <BrowserRouter>
              <ConfigProvider>
                <Router />
              </ConfigProvider>
            </BrowserRouter>
          </EditorContext.Provider>
        </UserContext.Provider>
      </UIContext.Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
