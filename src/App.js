import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRoutes } from "./routes";
import { privateRoutes } from "./routes";
import { AdminLayouts } from "./Layouts";
import { Fragment } from "react";
import { isAuthenticated } from "./pages/Admin/Auth/checkAuth";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;

            let Layout = AdminLayouts;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = AdminLayouts;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = null;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  route.private ? (
                    isLoggedIn  ? (
                      <Layout>
                        <Page />
                      </Layout>
                    ) : (
                      <Navigate to="/login" />
                    )
                  ) : (
                    <Layout>
                      <Page />
                    </Layout>
                  )
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
