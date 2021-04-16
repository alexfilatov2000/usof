import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Home from "./Home";
import Login from "./components/Login";
import PasswordReset from "./PasswordReset";
import TokenPswReset from "./TokenPswReset";


function App() {
  return (
      <Router>
          <div className="App">
              <Navbar />
              <div className="content">
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
                          <TokenPswReset />
                      </Route>
                  </Switch>
              </div>
          </div>
      </Router>
  );
}

export default App;
