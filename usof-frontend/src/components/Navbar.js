import { Link } from "react-router-dom";
import {connect} from "react-redux";
import LogOut from "./LogOut";

const Navbar = ({userData}) => {
    console.log(userData.token)
    return (
        <nav className="navbar">
            <h1>The Usof Application</h1>

            <div className="links">
                <Link to="/">Home</Link><br/>
                {userData.token && <LogOut/>}
                {!userData.token &&
                <div>
                    <Link to="/register">register</Link><br/>
                    <Link to="/login">Login</Link><br/>
                    <Link to="/password-reset">password-reset</Link>
                </div>
                }

            </div>
        </nav>
    );
}

const mapStateToProps = state => {
    return {
        userData: state.user_login
    }
}

export default connect(mapStateToProps, null)(Navbar);