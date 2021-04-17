import { Link } from "react-router-dom";
import LogOut from "./LogOut";
import { useSelector } from "react-redux";

const Navbar = () => {
    const user = useSelector(state => state.users)
    return (
        <nav className="navbar">
            <h1>The Usof Application</h1>

            <div className="links">
                <Link to="/">Home</Link><br/>
                {user.token && <LogOut/>}
                {!user.token &&
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

export default Navbar;