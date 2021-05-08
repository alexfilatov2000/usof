import {Route, Redirect} from "react-router-dom";
import {getRole} from "../util/getRole";

const UserRoute = ({ component: Component, token, ...rest }) => {
    const role = getRole(token);

    if (role === 'admin') {
        return <Route {...rest} render={props => <Component {...props}/>}/>
    } else {
        return <Redirect to="/login" />;
    }
}

export default UserRoute;