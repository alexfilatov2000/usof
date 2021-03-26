import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>The Usof Application</h1>
            <div className="links">
                <Link to="/">Home</Link><br/>
                <Link to="/register">register</Link><br/>
                <Link to="/login">Login</Link><br/>
                <Link to="/password-reset">password-reset</Link>
            </div>
        </nav>
    );
}

export default Navbar;