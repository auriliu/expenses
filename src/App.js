//
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom/cjs/react-router-dom.min";
//
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar";

import { ThemeProvider } from "./context/ThemeContext";

import { useAuthContext } from "./hooks/useAuthContext";
// import user
// import redirect
function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <ThemeProvider>
      <div className="App">
        {/* authIsReady && */}
        {authIsReady && (
          <BrowserRouter>
            <Navbar />

            <Switch>
              <Route exact path="/">
                {/* comes to home page: do we have a user? */}
                {user ? <Home /> : <Redirect to="/login" />}
              </Route>
              <Route path="/login">
                {user ? <Redirect to="/" /> : <Login />}
              </Route>
              <Route path="/signup">
                {user ? <Redirect to="/" /> : <Signup />}
              </Route>
            </Switch>
          </BrowserRouter>
        )}
        {/* {!authIsReady && <></>} */}
      </div>
    </ThemeProvider>
  );
}

export default App;
