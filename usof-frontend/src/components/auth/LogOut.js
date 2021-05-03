import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLogOut } from "../../redux/auth";

const LogOut = () => {
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(fetchLogOut())
    }

    return (
        <div>
            <Link to="/" onClick={handleSubmit}>Log out</Link>
        </div>
    );
}

export default LogOut;
