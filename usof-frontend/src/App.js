import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Register from "./components/auth/Register";
import Home from "./Home";
import Login from "./components/auth/Login";
import PasswordReset from "./components/auth/PasswordReset";
import NewPassword from "./components/auth/NewPassword";
import VerifyEmail from "./components/auth/VerifyEmail";
import GetAllUsers from "./components/users/getAllUsers";
import GetSpecifiedUser from "./components/users/getSpecifiedUser";


function App() {
  return (
      <Router>
          <div className="App">
              <Navbar>
                  <div className="auth">
                      <Switch>
                          <Route exact path="/">
                              <Home />
                          </Route>
                          <Route path="/register">
                              <Register />
                          </Route>
                          <Route path="/login">
                              <Login />
                          </Route>
                          <Route exact path="/password-reset">
                              <PasswordReset />
                          </Route>
                          <Route path="/password-reset/:token">
                              <NewPassword />
                          </Route>
                          <Route path="/verify-email/:token">
                              <VerifyEmail />
                          </Route>
                          <Route exact path="/users">
                              <GetAllUsers />
                          </Route>
                          <Route path="/users/:id">
                              <GetSpecifiedUser />
                          </Route>
                      </Switch>
                  </div>
              </Navbar>
          </div>
      </Router>
  );
}

export default App;
