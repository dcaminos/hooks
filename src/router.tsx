import { useContext, useEffect } from "react";

// Router
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Components
//import Analytics from "../view/main/dashboard/analytics";
import { PageNotFound } from "./pages/page-not-found/page-not-found";
import { observer } from "mobx-react-lite";
import { Dashboard } from "./pages/dashboard/dashboard";
import { EditorIDE } from "./pages/editor-ide/editor-ide";

import { SingUp } from "./pages/sing-up/sing-up";
import { FixedLayout } from "./components/layout/fixed-layout";
import { VerticalLayout } from "./components/layout/vertical-layout";
import { SignIn } from "./pages/sign-in/sign-in";
import { UIContext } from "./contexts";
import { EditorHome } from "./pages/editor-home/editor-home";

export const Router: React.FC = observer((props) => {
  // Mobx
  const { theme } = useContext(UIContext)!;

  useEffect(() => {
    document.querySelector("body")?.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    document.querySelector("html")?.setAttribute("dir", "ltr");
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        {/*<Route
          path={"/hooks"}
          exact={true}
          render={(props) => {
            return <Suspense fallback={null}>{<Hooks />}</Suspense>;
          }}
        />*/}

        {/* Editor Page */}
        <Route
          exact
          path={"/editor"}
          render={() => (
            <FixedLayout>
              <EditorHome />
            </FixedLayout>
          )}
        />

        {/* Editor Page */}
        <Route
          path={"/editor/:hookId"}
          render={() => (
            <FixedLayout>
              <EditorIDE />
            </FixedLayout>
          )}
        />

        {/* Home Page */}
        <Route
          exact
          path={"/"}
          render={() => (
            <VerticalLayout>
              <Dashboard />
            </VerticalLayout>
          )}
        />

        {/* singup */}
        <Route exact path={"/signup"} render={() => <SingUp />} />

        {/** Login */}
        <Route exact path={"/signin"} render={() => <SignIn />} />

        {/* NotFound */}
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
});
