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
import {useSelector} from "react-redux";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import CreateUser from "./components/users/createUser";
import GetAllPosts from "./components/posts/getAllPosts";
import GetSpecifiedPost from "./components/posts/getSpecifiedPost";


function App() {
  const auth = useSelector(state => state.auth);

  return (
      <Router>
          <div className="App">
              <Navbar>
                  <div className="auth">
                      <Switch>

                          <Route exact path="/" component={Home}/>
                          <Route exact path="/users" component={GetAllUsers}/>
                          <Route exact path="/users/:id" component={GetSpecifiedUser}/>

                          <Route exact path="/posts" component={GetAllPosts}/>
                          <Route exact path="/posts/:id" component={GetSpecifiedPost}/>

                          <PublicRoute component={Register} exact path="/register" token={auth.token}/>
                          <PublicRoute component={Login} exact path="/login" token={auth.token}/>
                          <PublicRoute component={PasswordReset} exact path="/password-reset" token={auth.token}/>
                          <PublicRoute component={NewPassword} exact path="/password-reset/:token" token={auth.token}/>
                          <PublicRoute component={VerifyEmail} exact path="/verify-email/:token" token={auth.token}/>

                          <PrivateRoute component={CreateUser} exact path="/userCreate" token={auth.token}/>

                      </Switch>
                  </div>
              </Navbar>
          </div>
      </Router>
  );
}

export default App;
