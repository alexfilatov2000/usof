import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Register from "./components/auth/Register";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import PasswordReset from "./components/auth/PasswordReset";
import NewPassword from "./components/auth/NewPassword";
import VerifyEmail from "./components/auth/VerifyEmail";
import GetAllUsers from "./components/users/getAllUsers";
import GetSpecifiedUser from "./components/users/getSpecifiedUser";
import {useSelector} from "react-redux";
import PublicRoute from "./components/PublicRoute";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import CreateUser from "./components/users/createUser";
import GetAllPosts from "./components/posts/getAllPosts";
import GetSpecifiedPost from "./components/posts/getSpecifiedPost";
import CreatePost from "./components/posts/createPost";
import GetAllCategories from "./components/categories/getAllCategories";
import CreateCategory from "./components/categories/createCategory";
import GetSpecifiedCategory from "./components/categories/getSpecifiedCategory";
import ChangeName from "./components/users/updateUser/changeName";
import ChangeLogin from "./components/users/updateUser/changeLogin";
import ChangePassword from "./components/users/updateUser/changePassword";


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

                          <Route exact path="/categories" component={GetAllCategories}/>
                          <Route exact path="/categories/:id" component={GetSpecifiedCategory}/>

                          <PublicRoute component={Register} exact path="/register" token={auth.token}/>
                          <PublicRoute component={Login} exact path="/login" token={auth.token}/>
                          <PublicRoute component={PasswordReset} exact path="/password-reset" token={auth.token}/>
                          <PublicRoute component={NewPassword} exact path="/password-reset/:token" token={auth.token}/>
                          <PublicRoute component={VerifyEmail} exact path="/verify-email/:token" token={auth.token}/>

                          <UserRoute component={CreatePost} exact path="/postAsk" token={auth.token}/>
                          <UserRoute component={ChangeName} exact path="/change/fullname" token={auth.token}/>
                          <UserRoute component={ChangeLogin} exact path="/change/login" token={auth.token}/>
                          <UserRoute component={ChangePassword} exact path="/change/password" token={auth.token}/>

                          <AdminRoute component={CreateUser} exact path="/userCreate" token={auth.token}/>
                          <AdminRoute component={CreateCategory} exact path="/categoryCreate" token={auth.token}/>

                      </Switch>
                  </div>
              </Navbar>
          </div>
      </Router>
  );
}

export default App;
