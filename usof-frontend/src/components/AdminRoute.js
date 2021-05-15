import {Route, Redirect} from "react-router-dom";
import {getRole} from "../util/getRole";

const AdminRoute = ({ component: Component, token, ...rest }) => {
    const role = getRole(token);

    if (role === 'admin') {
        return <Route {...rest} render={props => <Component {...props}/>}/>
    } else {
        return <Redirect to="/login" />;
    }
}

export default AdminRoute;