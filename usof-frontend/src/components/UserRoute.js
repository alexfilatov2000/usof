import {Route, Redirect} from "react-router-dom";

const UserRoute = ({ component: Component, token, ...rest }) => {
    if (token) {
        return <Route {...rest} render={props => <Component {...props}/>}/>
    } else {
        return <Redirect to="/login" />;
    }
}

export default UserRoute;