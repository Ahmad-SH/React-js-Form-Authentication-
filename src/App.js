import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthProvider from "./authenticationContext/AuthContext";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          {/* <PrivateRoute exact path="/">
            <Dashboard />
          </PrivateRoute> */}
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/forgot_password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
