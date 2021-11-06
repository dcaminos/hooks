import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { UIContext, UiStore } from "./stores/ui-store";
import { initializeApp } from "firebase/app";

import "./assets/icons/remixicon.css";
import "./assets/less/yoda-theme.less";

import { ConfigProvider } from "antd";
import { Router } from "./router";
import { EditorContext, EditorStore } from "./stores/editor-store";

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
console.log(app.name)

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="loading">
      <UIContext.Provider value={new UiStore()}>
        <EditorContext.Provider value={new EditorStore()}>
          <BrowserRouter>
            <ConfigProvider>
              <Router />
            </ConfigProvider>
          </BrowserRouter>
        </EditorContext.Provider>
      </UIContext.Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
