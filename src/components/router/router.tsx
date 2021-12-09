import { observer } from "mobx-react-lite";
import { Account } from "pages/account/account";
import { ProfilePage } from "pages/profile/profile";
import { useContext, useEffect } from "react";
// Router
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dashboard } from "../../pages/dashboard/dashboard";
import { EditorHome } from "../../pages/editor-home/editor-home";
import { EditorIDE } from "../../pages/editor-ide/editor-ide";
// Components
//import Analytics from "../view/main/dashboard/analytics";
import { PageNotFound } from "../../pages/page-not-found/page-not-found";
import { SignIn } from "../../pages/sign-in/sign-in";
import { SingUp } from "../../pages/sing-up/sing-up";
import { UIContext } from "./contexts";
import { FixedLayout } from "../layout/fixed-layout";
import { VerticalLayout } from "../layout/vertical-layout";
import { PrivatePage } from "./private-page";
import { FaqPage } from "pages/faq/faq";

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
            <PrivatePage>
              <FixedLayout>
                <EditorHome />
              </FixedLayout>
            </PrivatePage>
          )}
        />

        {/* Editor Page */}
        <Route
          path={"/editor/:hookId"}
          render={() => (
            <PrivatePage>
              <EditorIDE />
            </PrivatePage>
          )}
        />

        {/* Home Page */}
        <Route
          exact
          path={"/"}
          render={() => (
            <PrivatePage>
              <VerticalLayout>
                <Dashboard />
              </VerticalLayout>
            </PrivatePage>
          )}
        />

        {/* Account Page */}
        <Route
          path={"/account"}
          render={() => (
            <PrivatePage>
              <VerticalLayout>
                <Account />
              </VerticalLayout>
            </PrivatePage>
          )}
        />

        {/* Profile Page */}
        <Route
          path={"/profile"}
          render={() => (
            <PrivatePage>
              <VerticalLayout>
                <ProfilePage />
              </VerticalLayout>
            </PrivatePage>
          )}
        />

        {/* Sign Up */}
        <Route exact path={"/signup"} render={() => <SingUp />} />

        {/** Sign In */}
        <Route exact path={"/signin"} render={() => <SignIn />} />

        {/** FAQ */}
        <Route exact path={"/faq"} render={() => <FaqPage />} />


        {/* NotFound */}
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
});
