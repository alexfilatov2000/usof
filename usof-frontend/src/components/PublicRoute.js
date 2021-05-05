import {Route, Redirect} from "react-router-dom";

const PublicRoute = ({ component: Component, token, ...rest }) => {

    if (!token) {
        return <Route {...rest} render={props => <Component {...props}/>}/>
    } else {
        return <Redirect to="/" />;
    }
}

export default PublicRoute;