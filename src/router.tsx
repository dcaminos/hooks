import { useContext, useEffect } from "react";

// Router
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Components
//import Analytics from "../view/main/dashboard/analytics";
import { PageNotFound } from "./pages/page-not-found/page-not-found";
import { UIContext } from "./stores/ui-store";
import { observer } from "mobx-react-lite";
import { Dashboard } from "./pages/dashboard/dashboard";
import { Editor } from "./pages/editor/editor";

import { SingUp } from "./pages/sing-up/sing-up";
import { FixedLayout } from "./components/layout/fixed-layout";
import { VerticalLayout } from "./components/layout/vertical-layout";

export const Router: React.FC = observer((props) => {
  // Mobx
  const { theme } = useContext(UIContext);

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
              <Editor />
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
        <Route exact path={"/singup"} render={() => <SingUp />} />

        {/* NotFound */}
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
});
