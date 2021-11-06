import { Suspense, useContext, useEffect } from "react";

// Router
import {
    BrowserRouter,
    Route,
    Switch,
} from "react-router-dom";

// Layouts
import { DashboardLayout } from "./components/layouts/dashboard-layout";
//import HorizontalLayout from "../layout/HorizontalLayout";
//import FullLayout from "../layout/FullLayout";

// Components
//import Analytics from "../view/main/dashboard/analytics";
import Error404 from "./pages/errors/404";
import { UIContext } from "./stores/ui-store";
import { observer } from "mobx-react-lite";
import Dashboard from "./pages/dashboard/dashboard";
import { Editor } from "./pages/editor/editor";
import { EditorLayout } from "./components/layouts/editor-layout";

export const Router: React.FC = observer(props => {
    // Mobx
    const { theme, direction } = useContext(UIContext)

    useEffect(() => {
        document.querySelector("body")?.classList.add(theme)
    }, [theme])

    // RTL
    useEffect(() => {
        if (direction === "ltr") {
            document.querySelector("html")?.setAttribute("dir", "ltr");
        } else if (direction === "rtl") {
            document.querySelector("html")?.setAttribute("dir", "rtl");
        }
    }, [direction])

    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path={'/hooks'}
                    exact={true}
                    render={(props) => {
                        return (
                            <Suspense fallback={null}>
                                {/*<Hooks />*/}
                            </Suspense>
                        );
                    }}
                />

                {/* Editor Page */}
                <Route
                    exact
                    path={'/editor'}
                    render={() => (
                        <EditorLayout>
                    <Editor/>
                    </EditorLayout>)}
                />

                {/* Home Page */}
                <Route
                    exact
                    path={'/'}
                    render={() => (<DashboardLayout> 
                        <Dashboard/>
                    </DashboardLayout>)}
                    
                />

                {/* NotFound */}
                <Route path='*'>
                    <Error404 />
                </Route>
            </Switch>
        </BrowserRouter>
    );
})