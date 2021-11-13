import { HotKeys } from "react-hotkeys";
import { ConfigProvider } from "antd";
import { FirebaseApp, initializeApp } from "firebase/app";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./assets/icons/remixicon.css";
import "./assets/less/yoda-theme.less";
import { AppProviders } from "./utils/contexts";
import { Router } from "./components/router/router";

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
const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

const keyMap = {
  SAVE_HOOK: "command",
};
const handlers = {
  SAVE_HOOK: () => console.log("PASO 1"),
};

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="loading">
      <AppProviders firebaseApp={firebaseApp}>
        <BrowserRouter>
          <ConfigProvider>
            <HotKeys keyMap={keyMap} handlers={handlers}>
              <Router />
            </HotKeys>
          </ConfigProvider>
        </BrowserRouter>
      </AppProviders>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
